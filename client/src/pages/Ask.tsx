// src/pages/Ask.tsx
import { useAskStore } from "@/store/chat.store";
import AskInput from "@/components/chat/AskInput";
import MessageList from "@/components/chat/MessageList";
import { useEffect } from "react";

const Ask = () => {
  const { loadRecent } = useAskStore();

  useEffect(() => {
    loadRecent();
  }, [loadRecent]);

  return (
    <div className="flex h-full flex-col">
      <MessageList />
      <AskInput />
    </div>
  );
};

export default Ask;
