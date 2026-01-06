import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import ThemeToggle from "@/components/helpers/ThemeToggle";

const Topbar = () => {
  const { user, logoutUser } = useAuth();

  return (
    <header className="h-16 w-full bg-[#212121]">
      <div className="mx-auto h-full max-w-330 border-b border-white/5 px-6 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-normal text-white">OpenLuma</span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" onClick={logoutUser}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
