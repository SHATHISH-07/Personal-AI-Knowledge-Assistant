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
    <div className="flex flex-col w-full overflow-hidden relative">
      <div className="flex-1 overflow-y-auto w-full">
        <MessageList />
      </div>

      <div
        className="
    fixed bottom-0 left-0 z-20 pb-4
    w-full
    md:left-(--sidebar-width)
    md:w-[calc(100%-var(--sidebar-width))]
  "
      >
        <div className="mx-auto max-w-4xl px-4">
          <AskInput />
        </div>
      </div>
    </div>
  );
};

export default Ask;
