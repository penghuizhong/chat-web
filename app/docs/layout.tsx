"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Book, Layout as LayoutIcon, Menu } from "lucide-react"

import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const sidebarNav = [
        {
            title: "基础理论",
            icon: <Book className="w-4 h-4 mr-2" />,
            items: [
                { title: "服装结构设计原理", href: "/docs/basic-theory-1" },
                { title: "人体工学弧线公式", href: "/docs/ergonomic-formulas" },
            ]
        },
        {
            title: "工业样板",
            icon: <LayoutIcon className="w-4 h-4 mr-2" />,
            items: [
                { title: "羽绒服放量标准", href: "/docs/down-jacket-standards" },
                { title: "特殊面料缩水率", href: "/docs/shrinkage-table" },
            ]
        }
    ]

    const NavContent = () => (
        <div className="space-y-8">
            {sidebarNav.map((group, index) => (
                <div key={index} className="space-y-3">
                    <h4 className="font-semibold text-sm flex items-center text-foreground tracking-wider">
                        {group.icon} {group.title}
                    </h4>
                    <div className="flex flex-col space-y-1 pl-6 border-l border-border/50 ml-2">
                        {group.items.map((item, i) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={i}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`relative px-3 py-2 text-sm rounded-md transition-all duration-200 ${isActive
                                        ? "bg-muted text-foreground font-medium shadow-sm"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                        }`}
                                >
                                    {isActive && (
                                        <div className="absolute left-[-17px] top-1/2 -translate-y-1/2 w-[2px] h-4 bg-primary rounded-r-full" />
                                    )}
                                    {item.title}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )

    return (
        <div className="flex min-h-screen bg-background pt-16 relative">

            {/* 💻 桌面端：保持原来的左侧固定目录 */}
            <aside className="hidden lg:block w-72 fixed inset-y-0 left-0 pt-20 pb-10 border-r border-border/40 bg-background/50 backdrop-blur-xl overflow-y-auto z-40">
                <div className="px-6">
                    <NavContent />
                </div>
            </aside>

            {/* 📖 内容主区 */}
            <main className="flex-1 lg:pl-72 w-full">
                {children}
            </main>

            {/* 📱 移动端专属：右上角极简透明汉堡菜单 */}
            <div className="lg:hidden fixed top-[72px] left-4 z-50">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-10 h-10 rounded-full bg-transparent hover:bg-muted/50 text-foreground transition-all active:scale-90"
                        >
                            <Menu className="h-6 w-6 stroke-[1.5]" />
                            <span className="sr-only">打开目录</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-72 pt-16 border-l-border/40">
                        <SheetTitle className="sr-only">文档目录</SheetTitle>
                        <SheetDescription className="sr-only">
                            用于切换方圆智版的文档和笔记目录
                        </SheetDescription>
                        <div className="overflow-y-auto h-full pr-2">
                            <NavContent />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

        </div>
    )
}