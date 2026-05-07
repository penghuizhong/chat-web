"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, BookOpen, Clock, Star, ArrowRight } from "lucide-react"

// 💡 架构师提示：这里先定义好数据结构，等 FastAPI 好了直接替换这个数组
const courses = [
    {
        id: 1,
        title: "15年实战：工业级羽绒服结构全解析",
        description: "深入拆解极寒环境下羽绒服的充绒量计算、防钻绒工艺及 3D 动态放量逻辑。",
        duration: "12 课时",
        level: "进阶",
        rating: 4.9,
        students: 1280,
        category: "结构设计",
        image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop" // 干净的高级质感图
    },
    {
        id: 2,
        title: "方圆智版 AI：自动化放量算法实战",
        description: "学习如何利用 AI 模型辅助推板，通过毫米级参数输入，一键生成全尺码工业样板。",
        duration: "8 课时",
        level: "高阶",
        rating: 5.0,
        students: 850,
        category: "AI 工具",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "零基础到精通：现代男装西服制版",
        description: "从量体开始，掌握经典西装的胸衬结构、驳头弧度及袖笼贴合度的底层逻辑。",
        duration: "24 课时",
        level: "入门",
        rating: 4.8,
        students: 2100,
        category: "基础理论",
        image: "https://images.unsplash.com/photo-1594932224826-94b27247279e?q=80&w=800&auto=format&fit=crop"
    }
]

export default function CoursesPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* 🚀 头部标题区：沉浸感 */}
            <div className="mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                    进阶实战课程
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                    打碎 15 年制版经验，为您提炼出最具工业价值的知识体系。从基础结构到 AI 辅助算法，助力每一位制版师完成技术跃迁。
                </p>
            </div>

            {/* 🍱 课程网格布局 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                    <Card key={course.id} className="group overflow-hidden bg-background/50 backdrop-blur-sm border-border/40 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer">

                        {/* 封面图：带缩放效果 */}
                        <div className="relative aspect-video overflow-hidden">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <Button size="sm" className="rounded-full shadow-lg">
                                    <Play className="mr-2 h-4 w-4 fill-current" /> 立即试看
                                </Button>
                            </div>
                            <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-foreground border-none hover:bg-background/90">
                                {course.category}
                            </Badge>
                        </div>

                        <CardHeader className="space-y-3 pb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-amber-500 text-sm">
                                    <Star className="h-4 w-4 fill-current mr-1" />
                                    {course.rating}
                                </div>
                                <div className="text-muted-foreground text-xs flex items-center">
                                    <Clock className="h-3 w-3 mr-1" /> {course.duration}
                                </div>
                            </div>
                            <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                                {course.title}
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                                {course.description}
                            </p>
                        </CardContent>

                        <CardFooter className="pt-4 border-t border-border/30 flex items-center justify-between">
                            <span className="text-xs font-medium text-muted-foreground">
                                <span className="text-foreground font-bold">{course.students}</span> 名学员已加入
                            </span>
                            <Button variant="ghost" size="sm" className="group/btn hover:bg-transparent p-0">
                                开始学习 <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}