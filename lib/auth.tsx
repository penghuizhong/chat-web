"use client"

import { SessionProvider, useSession, signIn, signOut } from "next-auth/react"
import type { Session } from "next-auth"
import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { apiClient, setUnauthorizedHandler } from "@/lib/api" // 替换为您实际的路径
import { toast } from "sonner"

interface AuthContextType {
  user: Session["user"] | null
  isAuthenticated: boolean
  isLoading: boolean
  login: () => Promise<void>
  logout: () => Promise<void>
  isAuthModalOpen: boolean
  showAuthModal: () => void
  hideAuthModal: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function AuthProviderContent({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const showAuthModal = () => setIsAuthModalOpen(true)
  const hideAuthModal = () => setIsAuthModalOpen(false)

  // 👉 优化点 1：安全地向 ApiClient 单例注入 Token
  useEffect(() => {
    // 只有状态明确为 authenticated 时才注入，防止 loading 态清空 Token
    if (status === "authenticated" && session?.accessToken) {
      apiClient.setToken(session.accessToken)
    } else if (status === "unauthenticated") {
      apiClient.clearToken()
    }
  }, [session?.accessToken, status])

  // 👉 优化点 2：完善 401 拦截逻辑
  useEffect(() => {
    setUnauthorizedHandler(() => {
      console.warn("[Auth] 触发了 401 拦截，清空凭证并唤起登录")
      apiClient.clearToken()
      toast.error("登录状态已过期，请重新登录")
      showAuthModal()
    })

    // 清理函数，防止组件卸载时内存泄漏
    return () => setUnauthorizedHandler(null)
  }, []) // 空依赖数组，因为 setIsAuthModalOpen 是稳定的

  const isLoading = status === "loading"
  const isAuthenticated = status === "authenticated"
  const user = session?.user ?? null

  const login = async () => {
    // 👉 优化点 3：记录当前路径，登录后无缝跳回（极大提升 UX）
    const callbackUrl = typeof window !== "undefined" ? window.location.pathname + window.location.search : "/"
    await signIn("casdoor", { redirectTo: callbackUrl }) // v5 推荐使用 redirectTo 代替 callbackUrl 参数
  }

  const logout = async () => {
    apiClient.clearToken()
    await signOut({ redirectTo: "/" })
  }

  return (
    <AuthContext.Provider value={{
      user, isAuthenticated, isLoading, login, logout,
      isAuthModalOpen, showAuthModal, hideAuthModal
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function AuthProvider({ children, session }: { children: ReactNode; session: Session | null }) {
  return (
    // 接收服务端传来的 session 初始值，避免客户端初次加载时的闪烁
    <SessionProvider session={session}>
      <AuthProviderContent>{children}</AuthProviderContent>
    </SessionProvider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth 必须包裹在 AuthProvider 内部使用")
  }
  return context
}