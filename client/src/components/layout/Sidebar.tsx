import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, Upload, MessageSquare } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/files", label: "Files", icon: FileText },
  { to: "/upload", label: "Upload", icon: Upload },
  { to: "/ask", label: "Ask AI", icon: MessageSquare },
];

const Sidebar = () => {
  return (
    <aside className="w-64 border-r bg-card px-4 py-6">
      {/* Logo */}
      <div className="mb-8 text-xl font-semibold">OpenLuma</div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition
               ${
                 isActive
                   ? "bg-accent text-accent-foreground"
                   : "text-muted-foreground hover:bg-accent/50"
               }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
