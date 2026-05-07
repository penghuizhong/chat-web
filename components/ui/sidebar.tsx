"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useAuth } from "@/lib/auth";
import { usePathname } from "next/navigation"; // 👉 1. 引入路由钩子
import {
    Plus, Monitor, Folder, Settings, History,
    ArrowUpCircle, Bell, PanelLeftClose, PanelLeftOpen,
    Sun, Moon, LogOut, UserCircle
} from "lucide-react";

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const { user, isAuthenticated, logout, login } = useAuth();

    // 👉 2. 必须在顶层调用路由 Hook
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleUserAreaClick = () => {
        if (!isAuthenticated) {
            login();
        } else {
            setShowUserMenu(!showUserMenu);
        }
    };

    // 👉 3. 拦截渲染：如果当前是需要隐藏侧边栏的页面，直接返回 null
    const hideSidebarRoutes = ['/courses', '/tools', '/docs'];
    const shouldHide = hideSidebarRoutes.some(route => pathname?.startsWith(route));
    if (shouldHide) {
        return null; // 彻底不渲染，不占空间
    }

    return (
        <aside
            className={`hidden md:flex relative flex flex-col h-screen bg-background text-zinc-300 border-r border-zinc-800 transition-all duration-300 ease-in-out z-50 ${isCollapsed ? "w-[72px]" : "w-64"
                }`}
        >
            {/* 顶部区域：Logo 与折叠按钮 */}
            <div className="flex items-center justify-between p-4 h-16">
                {!isCollapsed && (
                    <div className="flex items-center gap-2 font-semibold text-white text-lg tracking-wider">
                        <span>方圆之间</span>
                    </div>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors ${isCollapsed ? "mx-auto" : ""
                        }`}
                >
                    {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
                </button>
            </div>

            {/* 新建按钮 */}
            <div className="px-3 mb-4">
                <button
                    className={`flex items-center justify-center w-full gap-2 p-2.5 rounded-md bg-background hover:bg-zinc-800 border border-zinc-700/50 text-white transition-colors ${isCollapsed ? "px-0" : "px-3"
                        }`}
                >
                    <Plus size={18} />
                    {!isCollapsed && <span className="font-medium text-sm">新建对话</span>}
                </button>
            </div>

            {/* 中部导航菜单 */}
            <nav className="flex-1 overflow-y-auto px-3 space-y-1 scrollbar-hide">
                <NavItem icon={<Monitor size={18} />} label="工具" isCollapsed={isCollapsed} />
                <NavItem icon={<Folder size={18} />} label="课程" isCollapsed={isCollapsed} />
                <div className="pt-4 pb-2">
                    {!isCollapsed && <p className="text-xs font-medium text-zinc-500 px-2 mb-1">历史</p>}
                    <NavItem icon={<History size={18} />} label="历史记录" isCollapsed={isCollapsed} />
                </div>
            </nav>

            {/* 底部功能区 */}
            <div className="p-3 border-t border-zinc-800 flex flex-col gap-2 relative">

                {/* 动态用户退出菜单 */}
                {showUserMenu && !isCollapsed && isAuthenticated && (
                    <div className="absolute bottom-[calc(100%+8px)] left-3 w-[calc(100%-24px)] bg-[#262626] border border-white/10 rounded-xl p-1 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                        <div className="px-3 py-2 border-b border-white/5 mb-1 text-xs text-zinc-500 uppercase tracking-wider font-bold">
                            账户管理
                        </div>
                        <button
                            onClick={() => {
                                logout();
                                setShowUserMenu(false);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                        >
                            <LogOut size={16} /> 退出登录
                        </button>
                    </div>
                )}

                <button
                    className={`flex items-center gap-2 p-2 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors ${isCollapsed ? "justify-center" : ""
                        }`}
                >
                    <ArrowUpCircle size={18} />
                    {!isCollapsed && <span className="text-sm">升级计划</span>}
                </button>

                {/* 用户信息展示区 */}
                <div className={`flex items-center mt-2 ${isCollapsed ? "justify-center flex-col gap-3" : "justify-between gap-2"
                    }`}>

                    <button
                        onClick={handleUserAreaClick}
                        className="flex items-center gap-2 hover:bg-zinc-800 p-1 -ml-1 rounded-lg transition-colors group text-left max-w-[120px]"
                    >
                        <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm transition-all ${isAuthenticated ? "bg-blue-600 group-hover:bg-blue-500" : "bg-zinc-700 group-hover:bg-zinc-600"
                            }`}>
                            {isAuthenticated ? (user?.name?.charAt(0)?.toUpperCase() || "方") : <UserCircle size={18} />}
                        </div>
                        {!isCollapsed && (
                            <span className="text-sm text-zinc-300 font-medium truncate">
                                {isAuthenticated ? (user?.name || "未知用户") : "点击登录"}
                            </span>
                        )}
                    </button>

                    {/* 右侧操作图标组 */}
                    <div className={`flex items-center gap-1 ${isCollapsed ? "flex-col" : ""}`}>
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                        >
                            {mounted && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
                        </button>
                        <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors">
                            <Bell size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}

function NavItem({ icon, label, isCollapsed }: { icon: React.ReactNode; label: string; isCollapsed: boolean }) {
    return (
        <div
            className={`flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800/80 text-zinc-400 hover:text-zinc-100 cursor-pointer transition-colors ${isCollapsed ? "justify-center" : ""
                }`}
            title={isCollapsed ? label : ""}
        >
            {icon}
            {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
        </div>
    );
}