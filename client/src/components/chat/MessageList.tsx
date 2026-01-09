import { useAskStore } from "@/store/chat.store";
import { useDashboardStore } from "@/store/dashboard.store";
import { useAuth } from "@/hooks/useAuth";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Bot, Upload, Copy, Check } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { ChatMessage } from "@/types/chat.type";

const extractText = (node: ReactNode): string => {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && node !== null && "props" in node) {
    return extractText(
      (node as { props: { children: ReactNode } }).props.children
    );
  }
  return "";
};

const CodeBlock = ({
  language,
  children,
  className,
}: {
  language: string;
  children: ReactNode;
  className?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = extractText(children);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 w-full rounded-md border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 border-b border-zinc-200 dark:border-zinc-800">
        <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 lowercase">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[10px] text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
        >
          {copied ? (
            <Check size={12} className="text-emerald-500" />
          ) : (
            <Copy size={12} />
          )}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      {/* Inner Content - Distinct Background */}
      <div className="overflow-x-auto p-3 bg-zinc-50 dark:bg-[#0c0c0c]">
        <pre className="m-0 p-0 font-mono text-[13px] leading-6 text-zinc-800 dark:text-zinc-300">
          <code
            className={clsx(className, "bg-transparent p-0 block min-w-full")}
          >
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
};

const MessageList = () => {
  const { user } = useAuth();
  const { messages, loadRecent } = useAskStore();
  const { summary, fetchSummary } = useDashboardStore();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user?._id) loadRecent(user._id);
    fetchSummary();
  }, [user?._id, loadRecent, fetchSummary]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (summary && summary.totalFiles === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800/50">
          <Upload className="h-7 w-7 text-zinc-400" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Knowledge Base Empty
        </h3>
        <p className="mb-6 max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
          Upload documents to get started.
        </p>
        <button
          onClick={() => navigate("/upload")}
          className="flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          <Upload className="h-4 w-4" />
          Upload Documents
        </button>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800/50">
          <Bot className="h-6 w-6 text-zinc-400" />
        </div>
        <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
          How can I help you today?
        </h3>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 py-6 pb-32 scroll-smooth custom-scrollbar">
      <div className="mx-auto flex flex-col gap-6 max-w-3xl w-full">
        {messages.map((msg: ChatMessage, i: number) => {
          const isAi = msg.role === "assistant";

          return (
            <div
              key={i}
              className={clsx(
                "flex w-full gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
                isAi ? "justify-start" : "justify-end"
              )}
            >
              {/* Avatar - Hidden on mobile to save space */}
              {isAi && (
                <div className="hidden sm:flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-800 mt-0.5">
                  <Bot className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
                </div>
              )}

              {/* Message Bubble Wrapper */}
              <div
                className={clsx(
                  "relative min-w-0 max-w-full",
                  isAi ? "w-full" : "max-w-[90%] sm:max-w-[80%]"
                )}
              >
                {isAi ? (
                  // --- BOT MESSAGE ---
                  <div className="prose prose-zinc dark:prose-invert max-w-none w-full break-words text-[15px] leading-7">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                      components={{
                        pre: ({ children }) => <>{children}</>,
                        // Code Block Handler
                        code: ({ className, children, ...props }) => {
                          const match = /language-(\w+)/.exec(className || "");
                          const isInline = !match;

                          if (isInline) {
                            return (
                              <code
                                className="rounded bg-zinc-100 px-1.5 py-0.5 text-[13px] font-mono text-pink-600 dark:bg-zinc-800 dark:text-pink-400 break-all border border-zinc-200 dark:border-zinc-700/50"
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          }

                          return (
                            <CodeBlock
                              language={match ? match[1] : "text"}
                              className={className}
                            >
                              {children}
                            </CodeBlock>
                          );
                        },
                        a: ({ ...props }) => (
                          <a
                            {...props}
                            className="font-medium text-blue-600 no-underline hover:underline dark:text-blue-400 break-all"
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        ),
                        ul: ({ children }) => (
                          <ul className="my-3 list-disc pl-4 space-y-1">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="my-3 list-decimal pl-4 space-y-1">
                            {children}
                          </ol>
                        ),
                        // Table wrapper for horizontal scrolling on mobile
                        table: ({ children }) => (
                          <div className="my-4 w-full overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
                            <table className="min-w-full divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
                              {children}
                            </table>
                          </div>
                        ),
                        th: ({ children }) => (
                          <th className="bg-zinc-50 px-3 py-2 text-left font-semibold dark:bg-zinc-900 whitespace-nowrap">
                            {children}
                          </th>
                        ),
                        td: ({ children }) => (
                          <td className="border-t border-zinc-100 px-3 py-2 dark:border-zinc-800">
                            {children}
                          </td>
                        ),
                      }}
                    >
                      {String(msg.content || "")}
                    </ReactMarkdown>
                  </div>
                ) : (
                  // --- USER MESSAGE ---
                  <div className="inline-block rounded-2xl rounded-tr-sm bg-zinc-100 px-5 py-2.5 text-[15px] font-medium text-zinc-900 shadow-sm dark:bg-[#2f2f2f] dark:text-zinc-100 break-words">
                    {msg.content}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
