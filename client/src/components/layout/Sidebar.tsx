import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Upload,
  MessageSquare,
  PanelLeft,
} from "lucide-react";
import favicon from "/assets/favicon.ico";
import { useState } from "react";
import clsx from "clsx";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/files", label: "Files", icon: FileText },
  { to: "/upload", label: "Upload", icon: Upload },
  { to: "/ask", label: "Ask AI", icon: MessageSquare },
];

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={clsx(
        "h-screen border-r border-white/5 transition-all duration-300 flex flex-col",
        // Background color and width logic
        collapsed ? "w-16 bg-[#212121]" : "w-65 bg-[#181818]"
      )}
    >
      {/* HEADER */}
      <div
        className={clsx(
          "h-16 flex items-center px-4",
          collapsed ? "justify-center" : "justify-between"
        )}
      >
        {collapsed ? (
          // CLOSED STATE: Group hover effect
          <button
            onClick={() => setCollapsed(false)}
            className="group relative flex items-center justify-center w-10 h-10 rounded-md hover:bg-white/10 transition-colors cursor-w-resize"
            aria-label="Expand sidebar"
          >
            {/* Favicon: Visible initially, fades out on hover */}
            <img
              src={favicon}
              alt="OL"
              className="w-6 h-6 transition-opacity duration-200 group-hover:opacity-0"
            />

            {/* Trigger Icon: Hidden initially, fades in on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <PanelLeft className="w-5 h-5 text-white" />
            </div>
          </button>
        ) : (
          // OPEN STATE
          <>
            <div className="flex items-center gap-3">
              <img src={favicon} alt="OpenLuma" className="w-6 h-6" />
            </div>
            <button
              onClick={() => setCollapsed(true)}
              className="text-zinc-400 hover:text-white hover:bg-white/10 cursor-w-resize p-2 rounded-md transition-colors"
              aria-label="Collapse sidebar"
            >
              <PanelLeft className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* NAV */}
      <nav
        className={clsx(
          "flex flex-col px-2 gap-2",
          collapsed ? "items-center pt-2" : "mt-2"
        )}
      >
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            title={collapsed ? label : undefined}
            className={() =>
              clsx(
                "flex items-center rounded-lg transition-colors duration-200 hover:bg-white/10",
                collapsed ? "justify-center h-10 w-10" : "gap-2 h-10 px-3" // Adjusted heights for smaller icons
              )
            }
          >
            {/* Reduced icon size to w-5 h-5 (20px) */}
            <Icon className="w-5 h-5 shrink-0" />

            {!collapsed && (
              <span className="text-md font-medium truncate">{label}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AppSidebar;
