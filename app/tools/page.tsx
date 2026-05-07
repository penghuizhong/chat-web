"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Calculator,
    Ruler,
    Layers,
    Zap,
    ArrowRight,
    Scaling,
    Maximize2,
    ChevronRight
} from "lucide-react"

// 🛠️ 工具集定义：这里浓缩了制版师最核心的业务场景
const tools = [
    {
        title: "自动放量引擎",
        description: "基于工业级算法，毫秒级推导全尺码档差。支持面料弹力补偿与特殊结构关联。",
        icon: <Scaling className="h-8 w-8 text-blue-500" />,
        href: "/tools/auto-grading",
        status: "主力",
        color: "from-blue-500/20 to-transparent",
        tags: ["AI 驱动", "毫米精度"]
    },
    {
        title: "缩水率/弹力补偿器",
        description: "针对羽绒服、高弹面料。输入水洗测试数据，自动修正样板所有关键部位尺寸。",
        icon: <Maximize2 className="h-8 w-8 text-emerald-500" />,
        href: "/tools/shrinkage",
        status: "Beta",
        color: "from-emerald-500/20 to-transparent",
        tags: ["面料工艺", "智能修正"]
    },
    {
        title: "排料用料专家",
        description: "快速核算单件及大货用料。输入门幅与样板面积，精准预测损耗，优化生产成本。",
        icon: <Layers className="h-8 w-8 text-orange-500" />,
        href: "/tools/marker-expert",
        status: "预研",
        color: "from-orange-500/20 to-transparent",
        tags: ["成本控制", "排料优化"]
    },
    {
        title: "结构逻辑自检",
        description: "AI 自动检查领口、袖笼等弧线连接是否顺滑，逻辑是否符合人体工学运动量。",
        icon: <Zap className="h-8 w-8 text-purple-500" />,
        href: "/tools/logic-check",
        status: "Pro",
        color: "from-purple-500/20 to-transparent",
        tags: ["结构自检", "3D 模拟"]
    }
]

export default function ToolsPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 animate-in fade-in duration-1000">

            {/* 🌟 头部：极简大厂风 */}
            <div className="mb-20 text-center space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                    智能制版工具集
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                    将 15 年的打版秘籍固化为生产力。每一个工具都为您节省 80% 的重复计算时间，让设计回归纯粹的结构美学。
                </p>
            </div>

            {/* 🍱 Bento Grid：工具入口 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {tools.map((tool, index) => (
                    <Link key={index} href={tool.href} className="group">
                        <Card className="relative h-full overflow-hidden bg-background/40 backdrop-blur-xl border-border/40 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">

                            {/* 背景渐变微光 */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <CardHeader className="relative z-10 space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="p-3 rounded-2xl bg-muted/50 text-foreground shadow-inner group-hover:scale-110 transition-transform duration-500">
                                        {tool.icon}
                                    </div>
                                    <div className="flex gap-2">
                                        {tool.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="bg-muted/50 text-[10px] font-normal uppercase tracking-wider">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <CardTitle className="text-2xl font-bold tracking-tight">
                                            {tool.title}
                                        </CardTitle>
                                        <Badge className="bg-primary/20 text-primary border-none text-[10px]">
                                            {tool.status}
                                        </Badge>
                                    </div>
                                    <CardDescription className="text-[15px] leading-relaxed text-muted-foreground/80">
                                        {tool.description}
                                    </CardDescription>
                                </div>
                            </CardHeader>

                            <CardContent className="relative z-10 flex items-center justify-between pt-4">
                                <span className="text-sm font-semibold text-primary inline-flex items-center group-hover:underline decoration-2 underline-offset-4">
                                    立即启动 <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </span>
                                <div className="h-10 w-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-500">
                                    <ArrowRight size={18} />
                                </div>
                            </CardContent>

                        </Card>
                    </Link>
                ))}
            </div>

            {/* 💡 底部小贴士：增加专业感 */}
            <div className="mt-20 p-8 rounded-3xl border border-dashed border-border/60 bg-muted/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <div className="space-y-1">
                    <h3 className="font-bold text-lg text-foreground">没有找到需要的工具？</h3>
                    <p className="text-sm text-muted-foreground">没关系，您可以直接告诉 AI 您的打版逻辑，它会为您即时推导公式。</p>
                </div>
                <Button variant="outline" className="rounded-full px-8 h-12 bg-background/50 hover:bg-background transition-all">
                    定制私有工具
                </Button>
            </div>

        </div>
    )
}