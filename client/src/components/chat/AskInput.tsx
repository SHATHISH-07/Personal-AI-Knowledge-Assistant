import { useState, useRef, useEffect } from "react";
import { useAskStore } from "@/store/chat.store";
import { Button } from "@/components/ui/button";
import { ArrowUp, Loader2 } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const AskInput = () => {
  const [value, setValue] = useState("");
  const { ask, loading, inputPrompt, setInputPrompt } = useAskStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [value]);

  useEffect(() => {
    if (inputPrompt) {
      const t = setTimeout(() => {
        setValue(inputPrompt);

        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.style.height = "auto";
          textareaRef.current.style.height = `${Math.min(
            textareaRef.current.scrollHeight,
            200
          )}px`;
        }

        setInputPrompt("");
      }, 0);

      return () => clearTimeout(t);
    }
  }, [inputPrompt, setInputPrompt]);

  const submit = async () => {
    if (!value.trim() || loading || !user?._id) {
      return toast.error(
        "Please enter a question, or wait for the previous question to finish processing."
      );
    }
    const temp = value;
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "24px";
    await ask(user._id, temp.trim());
  };

  return (
    <div className="w-full px-4">
      <div className="mx-auto max-w-3xl relative ">
        <div
          className={clsx(
            "relative flex items-center gap-2 rounded-xl p-3 shadow-sm transition-all border",
            "bg-gray-500/10 border-zinc-200 dark:bg-[#181818] dark:border-white/10",
            "focus-within:ring-2 focus-within:ring-zinc-900/10 dark:focus-within:ring-zinc-600/50",
            loading && "opacity-80 cursor-not-allowed"
          )}
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            disabled={loading}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask anything..."
            className={clsx(
              "min-h-12 max-h-50 w-full resize-none border-0 outline-none p-0 px-2 py-1 text-base scrollbar-hide bg-transparent",
              "text-zinc-900 placeholder:text-zinc-400 dark:text-zinc-200 dark:placeholder:text-zinc-500"
            )}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
          />

          <Button
            size="icon"
            onClick={submit}
            disabled={(!value.trim() && !loading) || loading}
            className={clsx(
              "h-8 w-8 shrink-0 rounded-lg transition-all",
              value.trim() || loading
                ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                : "bg-zinc-100 text-zinc-300 dark:bg-zinc-700 dark:text-zinc-400 cursor-not-allowed"
            )}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowUp className="h-5 w-5" />
            )}
          </Button>
        </div>

        <p className="mt-2 text-center text-xs text-zinc-400 dark:text-zinc-500">
          AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
};

export default AskInput;
