"use client"

import { useRef, useEffect, useState } from "react"
import { ChatInput } from "./chat-input"
import { ScrollArea } from "@/components/ui/scroll-area"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { MessageCircle, ChevronDown, Trash2, Sparkles } from "lucide-react"

import { useChat } from "@/hooks/use-chat"

export function GlobalChatShell() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const { messages, input, setInput, isStreaming, handleSend, clearMessages } = useChat()
    const hasMessages = messages.length > 0

    // 核心开关状态
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages])

    return (
        <>
            {/* 🚀 核心动画引擎：纯 CSS 编排，彻底解决 Tailwind 布局覆盖冲突 */}
            <style dangerouslySetInnerHTML={{
                __html: `
                /* 气泡按钮底座 */
                .chat-bubble-btn {
                    position: fixed;
                    z-index: 50;
                    bottom: 1.5rem;
                    right: 1.5rem;
                    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                @media (min-width: 768px) {
                    .chat-bubble-btn { bottom: 2rem; right: 2rem; }
                }
                /* 气泡隐藏状态：缩小并变透明 */
                .chat-bubble-btn.hidden-bubble {
                    opacity: 0;
                    transform: scale(0.5);
                    pointer-events: none;
                }

                /* 苹果风浮动面板基类 */
                .chat-float-panel {
                    position: fixed;
                    z-index: 50;
                    bottom: 1.5rem;
                    right: 1.5rem;
                    background: hsl(var(--background) / 0.85);
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border: 1px solid hsl(var(--border) / 0.5);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255,255,255,0.05);
                    /* 极其关键：以右下角为原点进行展开 */
                    transform-origin: bottom right; 
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }
                @media (min-width: 768px) {
                    .chat-float-panel { bottom: 2rem; right: 2rem; }
                }

                /* ❌ 关闭状态（浓缩成气泡大小） */
                .chat-float-panel.closed {
                    width: 3.5rem;  /* 56px */
                    height: 3.5rem; /* 56px */
                    border-radius: 50%;
                    opacity: 0;
                    pointer-events: none;
                    /* 收起动画：先缩高度，再缩宽度，回归气泡 */
                    transition:
                        height 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) 0s,
                        width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) 0.25s,
                        border-radius 0.3s ease 0.25s,
                        opacity 0.2s ease 0.4s;
                }

                /* ✅ 展开状态（完整聊天框） */
                .chat-float-panel.open {
                    width: calc(100vw - 3rem); /* 手机端宽度 */
                    height: 80vh;              /* 手机端高度 */
                    border-radius: 1.5rem;
                    opacity: 1;
                    pointer-events: auto;
                    /* 🌟 展开动画：水平先展开，最后往上延伸！ */
                    transition:
                        opacity 0.1s ease 0s,
                        width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) 0s,
                        height 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) 0.25s,
                        border-radius 0.3s ease 0s;
                }

                /* 电脑端独立宽高限制 */
                @media (min-width: 768px) {
                    .chat-float-panel.open {
                        width: 400px;
                        height: 650px;
                        max-height: calc(100vh - 5rem);
                        border-radius: 2rem;
                    }
                }

                /* 内容延迟显现：防止展开过程中文字拥挤换行 */
                .chat-content-fade {
                    opacity: 0;
                    transition: opacity 0.3s ease 0s;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    width: 100%;
                }
                .chat-float-panel.open .chat-content-fade {
                    opacity: 1;
                    transition-delay: 0.35s; /* 等框长高后再显示文字 */
                }
            `}} />

            {/* 📍 悬浮气泡按钮 */}
            <button
                onClick={() => setIsOpen(true)}
                className={`chat-bubble-btn p-3.5 bg-background/90 backdrop-blur-md text-foreground rounded-full shadow-2xl border border-border/50 hover:bg-muted group ${isOpen ? 'hidden-bubble' : ''}`}
                aria-label="唤醒 AI 助手"
            >
                <MessageCircle size={26} className="group-hover:text-primary transition-colors duration-300" />
            </button>

            {/* 💬 苹果风聊天浮窗 */}
            <div className={`chat-float-panel ${isOpen ? 'open' : 'closed'}`}>
                <div className="chat-content-fade">

                    {/* 头部导航：极简苹果风 */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-border/30 bg-muted/20 shrink-0">
                        <div className="flex items-center gap-2 text-sm font-semibold tracking-wide">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                            方圆智版 AI
                        </div>
                        <div className="flex items-center gap-1">
                            {hasMessages && (
                                <button onClick={clearMessages} className="p-2 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors" title="清空记录">
                                    <Trash2 size={16} />
                                </button>
                            )}
                            <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors" title="收起面板">
                                <ChevronDown size={18} />
                            </button>
                        </div>
                    </div>

                    {/* 聊天记录滚动区 */}
                    <ScrollArea className="flex-1 p-4 md:p-5">
                        {!hasMessages && (
                            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                                <div className="w-14 h-14 rounded-3xl bg-muted/50 flex items-center justify-center mb-4 border border-border/50">
                                    <Sparkles className="w-6 h-6 text-primary" />
                                </div>
                                <p className="font-medium text-foreground mb-1">随身制版顾问</p>
                                <p className="text-sm opacity-80 leading-relaxed max-w-[200px]">
                                    左侧看文档，右侧聊细节。有任何版型问题随时问我。
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col gap-5">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.type === 'human' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`
                                        p-3 sm:px-4 max-w-[88%] text-[14px] leading-relaxed shadow-sm
                                        prose dark:prose-invert prose-p:leading-relaxed prose-pre:bg-muted/50
                                        ${msg.type === 'human'
                                            ? 'bg-foreground text-background rounded-2xl rounded-br-sm'
                                            : 'bg-muted/30 border border-border/50 rounded-2xl rounded-bl-sm'
                                        }
                                    `}>
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                                    </div>
                                </div>
                            ))}
                            <div ref={scrollRef} className="h-4" />
                        </div>
                    </ScrollArea>

                    {/* 底部输入框 */}
                    <div className="p-3 bg-background/50 shrink-0 pb-safe border-t border-border/30">
                        <ChatInput value={input} onChange={setInput} onSend={handleSend} isStreaming={isStreaming} />
                    </div>

                </div>
            </div>
        </>
    )
}