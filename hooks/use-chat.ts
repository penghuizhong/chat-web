// hooks/use-chat.ts
import { useState } from "react"
import { apiClient, ChatMessage } from "@/lib/api"
import { useAuth } from "@/lib/auth"

// 这是一个纯粹的逻辑引擎，不包含任何 HTML 标签 (div, button 等)
export function useChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [input, setInput] = useState("")
    const [isStreaming, setIsStreaming] = useState(false)

    // Hook 内部完全可以调用其他的 Hook！
    const { isAuthenticated, showAuthModal } = useAuth()

    const handleSend = async () => {
        if (!isAuthenticated) {
            showAuthModal()
            return
        }

        if (!input.trim() || isStreaming) return
        const userMsg = input;
        setInput("")
        setIsStreaming(true)

        setMessages(prev => [...prev, { type: 'human', content: userMsg }, { type: 'ai', content: '' }])

        try {
            const stream = apiClient.stream({ message: userMsg, stream_tokens: true }, "rag-assistant")
            let fullAIContent = ""
            for await (const event of stream) {
                if (event.type === 'token') {
                    fullAIContent += event.content
                    setMessages(prev => {
                        const newMsgs = [...prev]
                        newMsgs[newMsgs.length - 1].content = fullAIContent
                        return newMsgs
                    })
                }
            }
        } catch (error) {
            console.error("对话失败", error)
        } finally {
            setIsStreaming(false)
        }
    }

    const clearMessages = () => setMessages([])

    // 把外部 UI 需要用到的“数据”和“开关”暴露出去
    return {
        messages,
        input,
        setInput,
        isStreaming,
        handleSend,
        clearMessages
    }
}