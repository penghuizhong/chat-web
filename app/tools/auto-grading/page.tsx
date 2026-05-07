"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calculator, Settings2, Sparkles, Activity, CheckCircle2 } from "lucide-react"

export default function AutoGradingPage() {
    const [isCalculating, setIsCalculating] = useState(false)
    const [showResults, setShowResults] = useState(false)

    // 模拟调用方圆智版 AI 引擎的计算过程
    const handleCalculate = () => {
        setIsCalculating(true)
        setShowResults(false)
        // 模拟 2 秒的 AI 推演时间
        setTimeout(() => {
            setIsCalculating(false)
            setShowResults(true)
        }, 2000)
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">

            {/* 🚀 头部区：控制台标题 */}
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary mb-3">
                        <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                        方圆智版 AI 驱动
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                        智能放量计算引擎
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        输入基础基型参数，毫秒级推导全尺码工业样板数据。
                    </p>
                </div>
            </div>

            {/* 🍱 主体工作区：左栏输入，右栏输出 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* 🎛️ 左侧：参数输入面板 (占据 4 列) */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="bg-background/50 backdrop-blur-sm border-border/50 shadow-xl">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Settings2 className="h-5 w-5 text-primary" />
                                基型参数设置
                            </CardTitle>
                            <CardDescription>设定您的 M 码（基码）部位尺寸</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">半胸围 (cm)</label>
                                <Input type="number" placeholder="例如: 52.5" className="bg-background/50 h-10" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">后中长 (cm)</label>
                                <Input type="number" placeholder="例如: 68.0" className="bg-background/50 h-10" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">面料缩水/弹力补偿 (%)</label>
                                <Input type="number" placeholder="例如: -2 或 +1.5" className="bg-background/50 h-10" />
                            </div>

                            <div className="pt-4 border-t border-border/50">
                                <Button
                                    onClick={handleCalculate}
                                    disabled={isCalculating}
                                    className="w-full h-11 rounded-xl shadow-lg transition-all"
                                >
                                    {isCalculating ? (
                                        <><Activity className="mr-2 h-4 w-4 animate-spin" /> 引擎推演中...</>
                                    ) : (
                                        <><Calculator className="mr-2 h-4 w-4" /> 生成放量方案</>
                                    )}
                                </Button>
                            </div>

                        </CardContent>
                    </Card>
                </div>

                {/* 📊 右侧：结果输出面板 (占据 8 列) */}
                <div className="lg:col-span-8">
                    <Card className="h-full bg-background/50 backdrop-blur-sm border-border/50 shadow-xl min-h-[500px] flex flex-col relative overflow-hidden">

                        {!showResults && !isCalculating && (
                            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
                                <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                                    <Calculator className="h-8 w-8 text-muted-foreground/50" />
                                </div>
                                <p className="text-lg font-medium text-foreground mb-1">等待参数输入</p>
                                <p className="text-sm max-w-[300px]">左侧设定基础数据后，AI 算法将自动进行档差计算与结构推导。</p>
                            </div>
                        )}

                        {isCalculating && (
                            <div className="flex-1 flex flex-col items-center justify-center text-primary p-8 text-center animate-in zoom-in duration-300">
                                <Activity className="h-12 w-12 animate-pulse mb-4" />
                                <p className="text-lg font-medium text-foreground mb-2">正在链接推板逻辑库...</p>
                                <div className="flex gap-2">
                                    <Badge variant="outline" className="animate-pulse delay-100">解析部位档差</Badge>
                                    <Badge variant="outline" className="animate-pulse delay-200">应用面料补偿</Badge>
                                    <Badge variant="outline" className="animate-pulse delay-300">生成坐标矩阵</Badge>
                                </div>
                            </div>
                        )}

                        {showResults && (
                            <div className="flex-1 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center justify-between mb-6">
                                    <CardTitle className="text-xl flex items-center gap-2 text-foreground">
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        计算完成：工业全尺码表
                                    </CardTitle>
                                    <Button variant="outline" size="sm" className="h-8 rounded-lg">导出 Excel</Button>
                                </div>

                                {/* 模拟的工业数据表格 */}
                                <div className="rounded-xl border border-border/50 overflow-hidden bg-background">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-muted/50 text-muted-foreground">
                                            <tr>
                                                <th className="px-6 py-3 font-medium">测量部位</th>
                                                <th className="px-6 py-3 font-medium">档差 (Δ)</th>
                                                <th className="px-6 py-3 font-medium">S</th>
                                                <th className="px-6 py-3 font-medium text-primary">M (基码)</th>
                                                <th className="px-6 py-3 font-medium">L</th>
                                                <th className="px-6 py-3 font-medium">XL</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/50 text-foreground/80">
                                            <tr className="hover:bg-muted/30 transition-colors">
                                                <td className="px-6 py-4 font-medium text-foreground">半胸围</td>
                                                <td className="px-6 py-4 text-muted-foreground">2.0</td>
                                                <td className="px-6 py-4">50.5</td>
                                                <td className="px-6 py-4 font-bold text-primary">52.5</td>
                                                <td className="px-6 py-4">54.5</td>
                                                <td className="px-6 py-4">56.5</td>
                                            </tr>
                                            <tr className="hover:bg-muted/30 transition-colors">
                                                <td className="px-6 py-4 font-medium text-foreground">后中长</td>
                                                <td className="px-6 py-4 text-muted-foreground">1.5</td>
                                                <td className="px-6 py-4">66.5</td>
                                                <td className="px-6 py-4 font-bold text-primary">68.0</td>
                                                <td className="px-6 py-4">69.5</td>
                                                <td className="px-6 py-4">71.0</td>
                                            </tr>
                                            <tr className="hover:bg-muted/30 transition-colors">
                                                <td className="px-6 py-4 font-medium text-foreground">肩宽</td>
                                                <td className="px-6 py-4 text-muted-foreground">1.2</td>
                                                <td className="px-6 py-4">43.8</td>
                                                <td className="px-6 py-4 font-bold text-primary">45.0</td>
                                                <td className="px-6 py-4">46.2</td>
                                                <td className="px-6 py-4">47.4</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500/90 text-sm flex items-start gap-3">
                                    <Sparkles className="h-5 w-5 shrink-0 mt-0.5" />
                                    <p>AI 提示：检测到您输入了负数缩水率（-2%），系统已自动对纵向尺寸（后中长）进行了反向补偿，以确保大货生产后的成衣尺寸达标。</p>
                                </div>
                            </div>
                        )}

                    </Card>
                </div>
            </div>
        </div>
    )
}