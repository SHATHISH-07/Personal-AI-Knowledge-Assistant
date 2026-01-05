import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import ThemeToggle from "@/components/helpers/ThemeToggle";

const Topbar = () => {
  const { user, logoutUser } = useAuth();

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-6">
      <div className="text-sm text-muted-foreground">{user?.email}</div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="sm" onClick={logoutUser}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
