import type { ReactNode } from "react";
import AppSidebar from "./Sidebar";
import Topbar from "./Topbar";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <AppSidebar />

      {/* Right content */}
      <div className="flex flex-1 flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#212121]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
