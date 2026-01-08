import { Button } from "@/components/ui/button";
import { FileQuestion, MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-zinc-50 px-4 text-center dark:bg-[#181818]">
      <div className="flex flex-col items-center space-y-6 max-w-md">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-sm ring-1 ring-zinc-200 dark:bg-[#212121] dark:ring-white/5">
          <FileQuestion className="h-10 w-10 text-zinc-400 dark:text-zinc-500" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Page not found
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            The page you are looking for doesn't exist or has been removed.
          </p>
        </div>

        <Button
          size="lg"
          onClick={() => navigate(-1)}
          className="min-w-40 gap-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-all"
        >
          <MoveLeft className="h-4 w-4" />
          Go Back
        </Button>
      </div>

      <div className="absolute bottom-8 text-[10px] font-mono uppercase tracking-widest text-zinc-300 dark:text-zinc-700">
        404 Error
      </div>
    </div>
  );
};

export default NotFound;
