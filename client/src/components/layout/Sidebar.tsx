import { NavLink } from "react-router-dom";
import {
  FileText,
  Upload,
  MessageSquare,
  PanelLeft,
  X,
  ChevronsUpDown,
  LogOut,
  LayoutGrid,
} from "lucide-react";
import favicon from "/assets/favicon.ico";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { useAuth } from "@/hooks/useAuth";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useTheme } from "../theme/useTheme";
import { useAskStore } from "@/store/chat.store";

const navItems = [
  { to: "/ask", label: "Ask AI", icon: MessageSquare },
  { to: "/files", label: "Files", icon: FileText },
  { to: "/upload", label: "Upload", icon: Upload },
  { to: "/overview", label: "Overview", icon: LayoutGrid },
];

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const AppSidebar = ({ mobileOpen, setMobileOpen }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logoutUser } = useAuth();

  const { setTheme } = useTheme();

  const { recentQuestions, setInputPrompt } = useAskStore();

  useEffect(() => {
    if (mobileOpen) {
      setCollapsed(false);
    }
  }, [mobileOpen]);

  return (
    <>
      {/* MOBILE BACKDROP */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside
        className={clsx(
          "fixed md:sticky top-0 left-0 z-50 h-screen transition-all duration-300 ease-in-out border-r flex flex-col",
          collapsed
            ? "w-20 bg-zinc-50 dark:bg-[#212121]"
            : "w-64 bg-zinc-50 dark:bg-[#181818]",
          mobileOpen
            ? "translate-x-0 w-64"
            : "-translate-x-full md:translate-x-0"
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
            // === COLLAPSED STATE (Desktop Only) ===
            <button
              onClick={() => setCollapsed(false)}
              className="hidden md:flex relative group items-center justify-center w-10 h-10 rounded-md hover:bg-zinc-200/50 dark:hover:bg-white/10 transition-colors  cursor-w-resize"
            >
              <img
                src={favicon}
                alt="OL"
                className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 shrink-0 transition-opacity duration-200 group-hover:opacity-0"
              />
              <PanelLeft className="w-5 h-5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white absolute opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </button>
          ) : (
            // === EXPANDED STATE ===
            <>
              <div className="flex items-center gap-3 overflow-hidden">
                <img
                  src={favicon}
                  alt="OL"
                  className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 shrink-0"
                />
              </div>

              {/* Desktop Collapse Toggle */}
              <button
                onClick={() => setCollapsed(true)}
                className={clsx(
                  "hidden md:flex p-1.5 rounded-md transition-colors cursor-w-resize",
                  "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/50",
                  "dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10"
                )}
              >
                <PanelLeft className="w-5 h-5" />
              </button>

              {/* Mobile Close Button */}
              <button
                onClick={() => setMobileOpen(false)}
                className="md:hidden p-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* NAV */}
        <nav className="flex-1 flex flex-col p-3 overflow-y-auto overflow-x-hidden">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              title={collapsed ? label : undefined}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                clsx(
                  "flex items-center rounded-lg transition-all duration-200 group relative",
                  collapsed
                    ? "justify-center h-12 w-12 mx-auto"
                    : "h-11 px-3 gap-3",
                  isActive
                    ? " text-gray-800 dark:text-gray-200 font-medium"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-zinc-100"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={clsx(
                      "shrink-0 transition-colors",
                      collapsed ? "w-5 h-5" : "w-5 h-5",
                      isActive
                        ? "text-gray-600 dark:text-gray-200"
                        : "text-zinc-500 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-100"
                    )}
                  />

                  {!collapsed && <span className="truncate">{label}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* RECENT QUESTIONS */}
        {!collapsed && recentQuestions.length > 0 && (
          <div className="px-3 pb-3">
            <p className="mb-2 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
              Recent Questions
            </p>

            <div className="space-y-1">
              {recentQuestions.map((q, i) => (
                <NavLink
                  key={i}
                  to="/ask"
                  onClick={() => {
                    setMobileOpen(false);
                    setInputPrompt(q);
                  }}
                  className="block truncate rounded-md px-2 py-1.5 text-xs
                     text-zinc-600 hover:bg-zinc-200/50 hover:text-zinc-900
                     dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-100"
                  title={q}
                >
                  {q}
                </NavLink>
              ))}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="p-4 ">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                className={clsx(
                  "group flex items-center w-full rounded-lg p-2 transition-colors outline-none",
                  "hover:bg-zinc-200/50 dark:hover:bg-white/10",
                  collapsed ? "justify-center" : "justify-between"
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-sm font-semibold shrink-0 overflow-hidden border border-zinc-200 dark:border-white/10">
                    {user?.profilePictureUrl ? (
                      <img
                        src={user.profilePictureUrl}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user?.name?.charAt(0).toUpperCase()
                    )}
                  </div>

                  {/* Text Info */}
                  {!collapsed && (
                    <div className="flex flex-col text-left min-w-0">
                      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                        {user?.name ?? "User"}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider truncate">
                        OPERATOR
                      </span>
                    </div>
                  )}
                </div>

                {/* Chevron */}
                {!collapsed && (
                  <ChevronsUpDown className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300" />
                )}
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="w-56 rounded-xl border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-[#1e1e1e] z-50 animate-in fade-in zoom-in-95 duration-200 mb-2"
                side="top"
                align="start"
                sideOffset={8}
              >
                <DropdownMenu.Label className="px-2 py-1.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  My Account
                </DropdownMenu.Label>

                <DropdownMenu.Separator className="my-1 h-px bg-zinc-100 dark:bg-zinc-800" />

                <div className="px-2 py-1.5">
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Signed in as
                  </p>
                  <p className="truncate text-xs font-medium text-zinc-900 dark:text-zinc-200">
                    {user?.email}
                  </p>
                </div>

                <DropdownMenu.Separator className="my-1 h-px bg-zinc-100 dark:bg-zinc-800" />

                <DropdownMenu.Label className="px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  Theme
                </DropdownMenu.Label>

                <DropdownMenu.Item
                  onSelect={() => setTheme("light")}
                  className="
    flex items-center gap-2 cursor-pointer rounded-md px-2 py-1.5 text-sm
    text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900
    dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white
    focus:bg-zinc-100 dark:focus:bg-zinc-800
  "
                >
                  Light
                </DropdownMenu.Item>

                <DropdownMenu.Item
                  onSelect={() => setTheme("dark")}
                  className="
    flex items-center gap-2 cursor-pointer rounded-md px-2 py-1.5 text-sm
    text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900
    dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white
    focus:bg-zinc-100 dark:focus:bg-zinc-800
  "
                >
                  Dark
                </DropdownMenu.Item>

                <DropdownMenu.Item
                  onSelect={() => setTheme("system")}
                  className="
    flex items-center gap-2 cursor-pointer rounded-md px-2 py-1.5 text-sm
    text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900
    dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white
    focus:bg-zinc-100 dark:focus:bg-zinc-800
  "
                >
                  System
                </DropdownMenu.Item>

                <DropdownMenu.Separator className="my-1 h-px bg-zinc-100 dark:bg-zinc-800" />

                <DropdownMenu.Item
                  onClick={logoutUser}
                  className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-red-50 text-red-600 hover:text-red-700 dark:hover:bg-red-900/20 dark:text-red-400"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;
