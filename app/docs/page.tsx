"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Book, FileText, Layout, Table as TableIcon, FileSearch, GraduationCap } from "lucide-react"

// 💡 知识库分类数据：等接了接口后，这里可以从后端获取
const docCategories = [
    {
        title: "基础理论",
        icon: <Book className="h-6 w-6 text-blue-500" />,
        items: [
            { name: "服装结构设计原理", type: "Markdown", slug: "basic-theory-1" },
            { name: "15年经验：人体工学弧线公式", type: "Formula", slug: "ergonomic-formulas" }
        ]
    },
    {
        title: "工业样板",
        icon: <Layout className="h-6 w-6 text-purple-500" />,
        items: [
            { name: "羽绒服放量标准手册", type: "PDF", slug: "down-jacket-standards" },
            { name: "特殊面料缩水率对照表", type: "Table", slug: "shrinkage-table" }
        ]
    },
    {
        title: "工艺笔记",
        icon: <FileText className="h-6 w-6 text-emerald-500" />,
        items: [
            { name: "高定西服手工针法图解", type: "Image-Text", slug: "sewing-notes" },
            { name: "自动打版算法逻辑推导", type: "Markdown", slug: "algo-logic" }
        ]
    }
]

export default function DocsPage() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">

            {/* 顶部 Slogan */}
            <div className="mb-16 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                    <GraduationCap size={14} /> 知识中心
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">方圆之间·百科全书</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                    这里存放着从 15 年实战中提炼出的工业级制版智慧。从基础结构到高阶算法逻辑，所有的“干货”都在这里。
                </p>
            </div>

            {/* 分类网格 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {docCategories.map((category, idx) => (
                    <div key={idx} className="space-y-6">
                        <div className="flex items-center gap-3 px-2">
                            <div className="p-2 rounded-lg bg-muted/50">
                                {category.icon}
                            </div>
                            <h2 className="text-xl font-bold">{category.title}</h2>
                        </div>

                        <div className="space-y-3">
                            {category.items.map((item, i) => (
                                <Link key={i} href={`/docs/${item.slug}`}>
                                    <Card className="group border-border/40 bg-background/40 backdrop-blur-sm hover:border-primary/40 hover:bg-muted/10 transition-all duration-300">
                                        <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
                                            <div className="space-y-1">
                                                <CardTitle className="text-[15px] font-medium leading-none group-hover:text-primary transition-colors">
                                                    {item.name}
                                                </CardTitle>
                                            </div>
                                            <Badge variant="outline" className="text-[10px] font-normal opacity-60">
                                                {item.type}
                                            </Badge>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* 底部搜索引导 */}
            <div className="mt-20 flex flex-col items-center justify-center p-12 rounded-[2.5rem] bg-muted/20 border border-dashed border-border/60">
                <FileSearch className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">没找到需要的笔记？试试问问右下角的 AI 助手</p>
            </div>
        </div>
    )
}