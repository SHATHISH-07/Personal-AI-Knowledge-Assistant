import { useAskStore } from "@/store/chat.store";
import AskInput from "@/components/chat/AskInput";
import MessageList from "@/components/chat/MessageList";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

const Ask = () => {
  const { loadRecent } = useAskStore();

  const { user } = useAuth();

  useEffect(() => {
    if (user?._id) {
      loadRecent(user._id);
    }
  }, [user, loadRecent]);

  return (
    <div className="flex flex-col h-dvh md:h-screen w-full overflow-hidden relative">
      {/* 3. MessageList takes all available space (flex-1) and handles its OWN scrolling */}
      <div className="flex-1 overflow-y-auto w-full">
        <MessageList />
      </div>

      {/* 4. Input sits naturally at the bottom, no sticky/fixed needed */}
      <div className="w-full shrink-0 pb-2 md:pb-4 bg-zinc-50 dark:bg-[#121212]">
        <AskInput />
      </div>
    </div>
  );
};

export default Ask;
