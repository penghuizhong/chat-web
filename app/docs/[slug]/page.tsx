import Link from "next/link"
import { ChevronRight, Calendar, Clock, ArrowLeft } from "lucide-react"

// 💡 架构师注：这里模拟根据 URL 参数 (slug) 从数据库获取对应的文档内容
// 等您的 FastAPI 准备好后，这里换成 await fetch(api_url) 即可
function getDocContent(slug: string) {
    // 模拟数据映射
    const mockDB: Record<string, any> = {
        "basic-theory-1": {
            title: "服装结构设计原理与底层逻辑",
            category: "基础理论",
            date: "2026-05-01",
            readTime: "12 分钟阅读",
            content: "制版的本质并非死记硬背公式，而是理解人体三维空间向二维平面展开的几何映射关系..."
        },
        "ergonomic-formulas": {
            title: "15年经验：人体工学弧线公式推导",
            category: "基础理论",
            date: "2026-05-05",
            readTime: "8 分钟阅读",
            content: "袖笼弧线的顺滑度决定了成衣的舒适性。传统的经验打版往往依赖手感，而在方圆智版的体系中，我们将它量化为贝塞尔曲线的控制点..."
        }
    }

    // 如果找不到对应的 slug，就返回一个默认的演示文档
    return mockDB[slug] || {
        title: "方圆智版·未命名文档",
        category: "工艺笔记",
        date: "2026-05-07",
        readTime: "5 分钟阅读",
        content: "正在加载来自方圆智版云端的专业数据..."
    }
}

// 🚀 这里的 { params } 就是 Next.js 自动捕获的 URL 动态参数
export default function DocDetailPage({ params }: { params: { slug: string } }) {
    // 获取当前 URL 对应的文档数据
    const doc = getDocContent(params.slug)

    return (
        <article className="max-w-4xl mx-auto px-6 py-12 md:py-20 animate-in fade-in duration-700">

            {/* 🧭 面包屑导航：苹果风的极致细节 */}
            <nav className="flex items-center text-sm text-muted-foreground mb-12">
                <Link href="/docs" className="flex items-center hover:text-foreground transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    知识库
                </Link>
                <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
                <span className="hover:text-foreground cursor-pointer transition-colors">
                    {doc.category}
                </span>
            </nav>

            {/* 📝 文章头部：巨型标题与元数据 */}
            <header className="mb-14">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15] mb-6">
                    {doc.title}
                </h1>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {doc.date}
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {doc.readTime}
                    </div>
                </div>
            </header>

            {/* 📖 正文内容区：排版引擎 
          (未来这里会替换成 react-markdown 来渲染真实的 MD/公式 数据) */}
            <div className="prose prose-zinc dark:prose-invert max-w-none">

                {/* 模拟的 Markdown 渲染效果：首段 */}
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {doc.content}
                </p>

                {/* 模拟的 Markdown 渲染效果：标题与段落 */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6 border-b border-border/50 pb-2">
                    一、平面与立体的转化
                </h2>
                <p className="leading-relaxed mb-6">
                    很多新手制版师在处理胸省（Dart）时，容易将其理解为单纯的“裁掉一块布”。事实上，省道是利用平面面料塑造立体空间的核心纽带。当面料的经纬纱线由于省道的闭合而发生强制位移时，服装的立体隆起便自然形成。
                </p>

                {/* 模拟的 Markdown 渲染效果：高亮引用 */}
                <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 bg-muted/20 rounded-r-lg italic text-muted-foreground">
                    “优秀的工业样板，不是在纸上画出漂亮的线条，而是能在工厂的流水线上，以最低的误差率被缝制成完美的立体形状。” —— 钟总
                </blockquote>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6 border-b border-border/50 pb-2">
                    二、放量算法的核心变量
                </h2>
                <p className="leading-relaxed mb-6">
                    在方圆智版的自动推板逻辑中，我们引入了三个核心变量矩阵：<strong>基础档差矩阵、面料弹力补偿系数、以及人体骨骼生长规律函数</strong>。这使得我们的放量不再是简单的线性加减，而是三维动态演进。
                </p>

            </div>

            {/* 🔚 底部导航：看完本篇后引导阅读 */}
            <footer className="mt-24 pt-8 border-t border-border/40 flex items-center justify-between">
                <Link href="/docs/basic-theory-1" className="group flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">上一篇</span>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">服装结构设计原理</span>
                </Link>
                <Link href="/docs/ergonomic-formulas" className="group flex flex-col gap-1 text-right">
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">下一篇</span>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">人体工学弧线公式</span>
                </Link>
            </footer>

        </article>
    )
}