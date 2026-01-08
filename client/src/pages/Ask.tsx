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
    <div className="flex h-full flex-col">
      <MessageList />
      <AskInput />
    </div>
  );
};

export default Ask;
