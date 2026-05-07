// app/layout.tsx
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import type { Viewport } from 'next';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/ui/sidebar";
import { Header } from "@/components/layout/header";
import { GlobalChatShell } from "@/components/chat/global-chat-shell";
import { AuthProvider } from "@/lib/auth"
import { AuthModal } from "@/components/auth/auth-modal";
import { auth } from "@/auth";

import { Toaster } from "sonner";

// 👉 移动端视口配置：支持刘海屏安全区域
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
};

// 👉 新增：将 RootLayout 变为 async 函数
export default async function RootLayout({ children }: { children: React.ReactNode }) {
    // 👉 新增：在服务端直接获取当前用户的 session
    const session = await auth();

    return (
        <html lang="zh-CN" suppressHydrationWarning>
            <body suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable} antialiased flex h-dvh overflow-hidden`}>
                {/* 👉 新增：将拿到的 session 喂给前端的 AuthProvider，消除前端水瀑布请求 */}
                <AuthProvider session={session}>
                    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                        {/* 1. 左侧固定侧边栏 */}
                        <Sidebar />

                        <div className="flex-1 flex flex-col relative bg-background overflow-hidden">

                            <Header />

                            <main className="flex-1 overflow-y-auto pt-20 md:pt-24 pb-32">
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