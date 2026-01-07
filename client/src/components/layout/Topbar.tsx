import { PanelLeft, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Assuming you have shadcn button

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
  return (
    <header className="sticky top-0 z-30 h-16 w-full bg-zinc-50 dark:bg-[#212121] transition-colors">
      <div className="flex items-center justify-between h-full px-4 md:px-6 mx-auto ">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 -ml-2 rounded-md text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors"
          >
            <PanelLeft className="w-6 h-6" />
          </button>

          {/* App Title */}
          <span className="text-lg md:text-2xl font-normal tracking-tight text-zinc-600 dark:text-zinc-100">
            OpenLuma
          </span>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2">
          {/* Upload Button */}
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-white/10 gap-2"
          >
            <Link to="/upload">
              <Upload className="w-5 h-5" />
              <span className="hidden sm:inline font-medium text-lg">
                Upload
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
