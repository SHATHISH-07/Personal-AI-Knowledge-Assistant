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
    <div className="flex flex-col  w-full overflow-hidden relative">
      <div className="flex-1 overflow-y-auto w-full">
        <MessageList />
      </div>

      <div className="w-full shrink-0 pb-2 md:pb-4">
        <AskInput />
      </div>
    </div>
  );
};

export default Ask;
