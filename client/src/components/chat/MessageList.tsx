import { useAskStore } from "@/store/chat.store"; // Import ChatMessage type
import { useDashboardStore } from "@/store/dashboard.store";
import { useAuth } from "@/hooks/useAuth";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Bot, User, Upload } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { ChatMessage } from "@/types/chat.type";

const MessageList = () => {
  const { user } = useAuth();
  const { messages, loadRecent } = useAskStore();
  const { summary, fetchSummary } = useDashboardStore();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user?._id) {
      loadRecent(user._id);
    }
    fetchSummary();
  }, [user?._id, loadRecent, fetchSummary]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (summary && summary.totalFiles === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500">
        <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
          Knowledge Base Empty
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed mb-8">
          You haven't uploaded any documents yet. Please add your knowledge base
          files to start asking questions.
        </p>
        <button
          onClick={() => navigate("/upload")}
          className="flex items-center gap-2 text-sm font-medium px-6 py-2.5 rounded-full bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 transition-colors"
        >
          <Upload className="w-4 h-4" />
          Upload Documents
        </button>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500">
        <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
          Ready to Assist
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
          Your knowledge base is active. Ask any question below to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full overflow-y-auto p-2 md:p-6 space-y-6 md:space-y-8 scroll-smooth custom-scrollbar">
      {messages.map((msg: ChatMessage, i: number) => {
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
