// components/chat/global-chat-shell.tsx
"use client"

import { useRef, useEffect } from "react"
import { ChatInput } from "./chat-input"
import { ScrollArea } from "@/components/ui/scroll-area"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { X, MessageCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

// 👉 引入我们刚刚封装的业务引擎
import { useChat } from "@/hooks/use-chat"

export function GlobalChatShell() {
    const pathname = usePathname()
    const scrollRef = useRef<HTMLDivElement>(null)

    // 👉 核心：一句话召唤聊天引擎！获取所有需要的数据和方法
    const { messages, input, setInput, isStreaming, handleSend, clearMessages } = useChat()

    // UI 特有的逻辑（比如滚动到底部），依然留在 UI 组件里
    useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages])

    const isChatMode = pathname === '/';
    if (!isChatMode) {
        return (
            <Link href="/" passHref>
                <button className="fixed bottom-8 right-8 p-4 bg-primary text-primary-foreground rounded-full shadow-2xl hover:scale-110 transition-all z-50 group">
                    <MessageCircle size={28} className="group-hover:animate-pulse" />
                </button>
            </Link>
        );
    }

    return (
        <>
            {messages.length > 0 && (
                <div className="absolute inset-0 z-30 bg-background/60 backdrop-blur-md px-4 pt-24 pb-40 animate-in fade-in duration-300">
                    {/* 👉 直接调用 clearMessages */}
                    <button onClick={clearMessages} className="absolute top-8 right-8 p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-all z-50">
                        <X size={22} />
                    </button>

                    <ScrollArea className="h-full max-w-3xl mx-auto">
                        <div className="flex flex-col gap-6">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.type === 'human' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`p-4 px-6 rounded-[2rem] max-w-[85%] prose dark:prose-invert shadow-sm ${msg.type === 'human' ? 'bg-secondary' : 'bg-card'}`}>
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                                    </div>
                                </div>
                            ))}
                            <div ref={scrollRef} />
                        </div>
                    </ScrollArea>
                </div>
            )}

            <div className="absolute bottom-8 left-0 right-0 w-full max-w-3xl mx-auto px-4 z-40">
                {/* 👉 直接把引擎里拿到的状态传给输入框 */}
                <ChatInput value={input} onChange={setInput} onSend={handleSend} isStreaming={isStreaming} />
            </div>
        </>
    )
}