"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Sidebar from "@/components/ui/sidebar"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

export function Header() {
    return (
        // 调整了外层容器，给手机端留了一点点边距 (px-4)
        <div className="absolute top-4 md:top-8 left-0 right-0 flex flex-col items-center z-40 pointer-events-none px-4 md:px-0">

            {/* 💻 桌面端：苹果风悬浮灵动岛 (手机端 hidden 隐藏) */}
            <div className="flex md:flex pointer-events-auto items-center justify-center px-8 py-2 rounded-full bg-background/60 backdrop-blur-2xl border border-border/50 shadow-xl shadow-black/5 dark:shadow-black/20 animate-in fade-in slide-in-from-top-4 duration-700 ease-out">
                <NavigationMenu>
                    <NavigationMenuList className="space-x-4">

                        <NavigationMenuItem>
                            {/* 🌟 核心修改：NavigationMenuLink 在外加上 asChild，Link 在内去掉了老旧属性 */}
                            <NavigationMenuLink asChild className={cn(
                                navigationMenuTriggerStyle(),
                                "bg-transparent hover:bg-muted/50 text-[16px] tracking-wide rounded-full px-6 transition-all cursor-pointer"
                            )}>
                                <Link href="/">首页</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={cn(
                                navigationMenuTriggerStyle(),
                                "bg-transparent hover:bg-muted/50 text-[16px] tracking-wide rounded-full px-6 transition-all text-muted-foreground hover:text-foreground cursor-pointer"
                            )}>
                                <Link href="/courses">课程</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={cn(
                                navigationMenuTriggerStyle(),
                                "bg-transparent hover:bg-muted/50 text-[16px] tracking-wide rounded-full px-6 transition-all text-muted-foreground hover:text-foreground cursor-pointer"
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