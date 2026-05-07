"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useAuth } from "@/lib/auth"
import {
    Menu, Plus, Monitor, Folder, History,
    ArrowUpCircle, Sun, Moon, LogOut, UserCircle, Bell, Home, FileText
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

export function Header() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const { user, isAuthenticated, login, logout } = useAuth()

    const mainNavItems = [
        { icon: <Home size={18} />, label: "首页", href: "/" },
        { icon: <Folder size={18} />, label: "课程", href: "/courses" },
        { icon: <FileText size={18} />, label: "文档", href: "/docs" },
        { icon: <Monitor size={18} />, label: "工具", href: "/tools" },
    ]

    const sidebarNavItems = [
        { icon: <History size={18} />, label: "历史记录", href: "#" },
    ]

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/"
        return pathname?.startsWith(href)
    }

    return (
        // 调整了外层容器，给手机端留了一点点边距 (px-4)
        <div className="absolute top-4 md:top-8 left-0 right-0 flex flex-col items-center z-40 pointer-events-none px-4 md:px-0">

            <div className="md:hidden pointer-events-auto self-start">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <button
                            className="flex items-center justify-center w-11 h-11 rounded-full bg-background/60 backdrop-blur-2xl border border-border/50 shadow-xl shadow-black/5 dark:shadow-black/20 text-foreground hover:bg-muted/50 transition-colors"
                            aria-label="打开导航菜单"
                        >
                            <Menu size={20} />
                        </button>
                    </SheetTrigger>

                    <SheetContent side="left" className="w-[280px] sm:max-w-[280px] bg-background border-r border-border/50 p-0">
                        <SheetTitle className="sr-only">导航菜单</SheetTitle>
                        <SheetDescription className="sr-only">网站导航和功能菜单</SheetDescription>

                        <div className="flex items-center gap-2 px-4 h-16 border-b border-border/50">
                            <span className="font-semibold text-foreground text-lg tracking-wider">方圆之间</span>
                        </div>

                        <div className="px-3 pt-4 pb-2">
                            <button
                                className="flex items-center justify-center w-full gap-2 p-2.5 rounded-md bg-background hover:bg-muted/50 border border-border/50 text-foreground transition-colors"
                                onClick={() => setOpen(false)}
                            >
                                <Plus size={18} />
                                <span className="font-medium text-sm">新建对话</span>
                            </button>
                        </div>

                        <nav className="px-3 space-y-1">
                            <p className="text-xs font-medium text-muted-foreground px-2 mb-1">导航</p>
                            {mainNavItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 p-2 rounded-md transition-colors cursor-pointer",
                                        isActive(item.href)
                                            ? "bg-muted text-foreground"
                                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                    )}
                                >
                                    {item.icon}
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            ))}
                        </nav>

                        <nav className="px-3 mt-4 space-y-1">
                            <p className="text-xs font-medium text-muted-foreground px-2 mb-1">历史</p>
                            {sidebarNavItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-3 p-2 rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors cursor-pointer"
                                >
                                    {item.icon}
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            ))}
                        </nav>

                        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border/50">
                            <button
                                className="flex items-center gap-2 p-2 w-full rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
                                onClick={() => setOpen(false)}
                            >
                                <ArrowUpCircle size={18} />
                                <span className="text-sm">升级计划</span>
                            </button>

                            <div className="flex items-center justify-between mt-2">
                                <button
                                    onClick={() => {
                                        if (!isAuthenticated) {
                                            login()
                                        }
                                        setOpen(false)
                                    }}
                                    className="flex items-center gap-2 hover:bg-muted/50 p-1 rounded-lg transition-colors"
                                >
                                    <div className={cn(
                                        "w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm transition-all",
                                        isAuthenticated
                                            ? "bg-blue-600 hover:bg-blue-500"
                                            : "bg-muted hover:bg-muted/80 text-muted-foreground"
                                    )}>
                                        {isAuthenticated ? (user?.name?.charAt(0)?.toUpperCase() || "方") : <UserCircle size={18} />}
                                    </div>
                                    <span className="text-sm text-foreground font-medium truncate max-w-[100px]">
                                        {isAuthenticated ? (user?.name || "未知用户") : "点击登录"}
                                    </span>
                                </button>

                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                                        aria-label="切换主题"
                                    >
                                        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                                    </button>
                                    <button
                                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                                        aria-label="通知"
                                    >
                                        <Bell size={18} />
                                    </button>
                                </div>
                            </div>

                            {isAuthenticated && (
                                <button
                                    onClick={() => {
                                        logout()
                                        setOpen(false)
                                    }}
                                    className="flex items-center gap-2 p-2 w-full mt-1 rounded-md text-red-400 hover:bg-red-500/10 transition-colors"
                                >
                                    <LogOut size={16} />
                                    <span className="text-sm">退出登录</span>
                                </button>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* 💻 桌面端：苹果风悬浮灵动岛 (手机端 hidden 隐藏) */}
            <div className="hidden md:flex pointer-events-auto items-center justify-center px-8 py-2 rounded-full bg-background/60 backdrop-blur-2xl border border-border/50 shadow-xl shadow-black/5 dark:shadow-black/20 animate-in fade-in slide-in-from-top-4 duration-700 ease-out">
                <NavigationMenu>
                    <NavigationMenuList className="space-x-4">

                        <NavigationMenuItem>
                            {/* 🌟 核心修改：NavigationMenuLink 在外加上 asChild，Link 在内去掉了老旧属性 */}
                            <NavigationMenuLink asChild className={cn(
                                navigationMenuTriggerStyle(),
                                "bg-transparent hover:bg-muted/50 text-base tracking-wide rounded-full px-6 transition-all cursor-pointer"
                            )}>
                                <Link href="/">首页</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={cn(
                                navigationMenuTriggerStyle(),
                                "bg-transparent hover:bg-muted/50 text-base tracking-wide rounded-full px-6 transition-all text-muted-foreground hover:text-foreground cursor-pointer"
                            )}>
                                <Link href="/courses">课程</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>


                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={cn(
                                navigationMenuTriggerStyle(),
                                "bg-transparent hover:bg-muted/50 text-base tracking-wide rounded-full px-6 transition-all text-muted-foreground hover:text-foreground cursor-pointer"
                            )}>
                                <Link href="/docs">文档</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={cn(
                                navigationMenuTriggerStyle(),
                                "bg-transparent hover:bg-muted/50 text-base tracking-wide rounded-full px-6 transition-all text-muted-foreground hover:text-foreground cursor-pointer"
                            )}>
                                <Link href="/tools">工具</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    )
}