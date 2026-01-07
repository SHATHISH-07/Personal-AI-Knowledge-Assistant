import { useAskStore } from "@/store/chat.store";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Bot, User } from "lucide-react";
import { useEffect, useRef } from "react";

const MessageList = () => {
  const { messages } = useAskStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-2 md:p-6 space-y-6 md:space-y-8 scroll-smooth custom-scrollbar">
      {messages.map((msg, i) => {
        const isAi = msg.role === "assistant";

        return (
          <div
            key={i}
            className={clsx(
              "flex w-full max-w-4xl mx-auto gap-2 md:gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
              isAi ? "justify-start" : "justify-end"
            )}
          >
            {/* AI Avatar */}
            {isAi && (
              <div
                className="hidden md:flex w-8 h-8 rounded-lg border items-center justify-center shrink-0 mt-1 shadow-sm
                bg-white border-zinc-200 dark:bg-[#292929] dark:border-white/5"
              >
                <Bot className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={clsx(
                "relative px-4 py-3 md:px-5 md:py-3.5 rounded-2xl shadow-sm border",
                "max-w-[90%] md:max-w-[75%]",
                isAi
                  ? "bg-white border-zinc-100 text-zinc-800 dark:bg-[#292929] dark:border-transparent dark:text-zinc-200 rounded-tl-none"
                  : "bg-zinc-50 border-zinc-200 text-zinc-900 dark:bg-[#2f2f2f] dark:border-white/5 dark:text-zinc-100 rounded-tr-none"
              )}
            >
              {isAi ? (
                <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none wrap-break-word text-left leading-relaxed">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                  >
                    {String(msg.content || "")}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap text-sm md:text-base font-medium leading-relaxed">
                  {msg.content}
                </p>
              )}
            </div>

            {/* User Avatar */}
            {!isAi && (
              <div
                className="hidden md:flex w-8 h-8 rounded-full border items-center justify-center shrink-0 mt-1
                 bg-zinc-100 border-zinc-200 dark:bg-[#2f2f2f] dark:border-transparent"
              >
                <User className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
              </div>
            )}
          </div>
        );
      })}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
