import { useState } from "react";
import type { ReactNode } from "react";
import Topbar from "./Topbar";
import AppSidebar from "./Sidebar";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-[#212121]">
      <AppSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex flex-1 flex-col">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 text-center overflow-y-auto p-10 ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
