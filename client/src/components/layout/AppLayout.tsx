import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Topbar from "./Topbar";
import AppSidebar from "./Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useAskStore } from "@/store/chat.store";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(0);

  const { user } = useAuth();
  const { loadRecent } = useAskStore();

  useEffect(() => {
    if (user?._id) {
      loadRecent(user._id);
    }
  }, [user, loadRecent]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-zinc-50 dark:bg-[#212121]">
      <AppSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onWidthChange={setSidebarWidth}
      />

      <div className="flex flex-1 flex-col min-w-0">
        <Topbar onMenuClick={() => setMobileOpen(true)} />

        <main
          className="
            flex-1
            overflow-y-auto
            p-5
            max-[400px]:px-3
            min-w-0
            md:[--sidebar-width:0px]
          "
          style={
            window.innerWidth >= 768
              ? { ["--sidebar-width" as string]: `${sidebarWidth}px` }
              : undefined
          }
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
