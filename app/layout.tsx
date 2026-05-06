// app/layout.tsx
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/ui/sidebar";
import { Header } from "@/components/layout/header";
import { GlobalChatShell } from "@/components/chat/global-chat-shell";
import { AuthProvider } from "@/lib/auth"
import { AuthModal } from "@/components/auth/auth-modal"
import { Toaster } from "sonner";
import { auth } from "@/auth"; // 👉 新增：从根目录的 auth.ts 引入服务端 auth 方法
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

// 👉 新增：将 RootLayout 变为 async 函数
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // 👉 新增：在服务端直接获取当前用户的 session
  const session = await auth();

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable} antialiased flex h-screen overflow-hidden`}>
        {/* 👉 新增：将拿到的 session 喂给前端的 AuthProvider，消除前端水瀑布请求 */}
        <AuthProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {/* 1. 左侧固定侧边栏 */}
            <Sidebar />

            <div className="flex-1 flex flex-col relative bg-background overflow-hidden">

              {/* 📱 手机端专属顶部栏 (md:hidden 表示在电脑上隐藏) */}
              <div className="md:hidden flex items-center justify-between p-3 border-b border-zinc-800 bg-[#1c1c1c]">
                <Sheet>
                  <SheetTrigger className="p-2 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-md transition-colors outline-none">
                    <Menu size={24} />
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0 w-64 bg-[#1c1c1c] border-zinc-800">
                    {/* 在手机抽屉里再渲染一个 Sidebar，强制它显示 */}
                    <div className="flex w-full [&>aside]:flex [&>aside]:w-full">
                      <Sidebar />
                    </div>
                  </SheetContent>
                </Sheet>
                <span className="font-bold text-white tracking-wider">方圆之间</span>
                <div className="w-10"></div> {/* 占位，保持文字居中 */}
              </div>

              <Header />

              <main className="flex-1 overflow-y-auto pt-4 md:pt-24 pb-32">
                {children}
              </main>
              <AuthModal />
              <Toaster position="top-right" richColors />
              <GlobalChatShell />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}