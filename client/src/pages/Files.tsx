import { useEffect, useState } from "react";
import { useFileStore } from "@/store/file.store";
import FileList from "@/components/files/FileList";
import { Spinner } from "@/components/ui/spinner";
import { Search, X } from "lucide-react";

const Files = () => {
  const { files, loading, fetchFiles } = useFileStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const filteredFiles = files.filter((file) =>
    file.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex min-h-[50vh] w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6 text-start w-full">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Header Text */}
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Your Files
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Manage your knowledge base assets
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-zinc-400" />
          </div>
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              block w-full rounded-xl border border-zinc-200 bg-white py-2 pl-10 pr-8 text-sm outline-none transition-all 
              placeholder:text-zinc-400 
              focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200/50 
              dark:bg-[#212121] dark:border-white/10 dark:text-zinc-200 dark:focus:border-zinc-600
            "
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {filteredFiles.length > 0 ? (
        <FileList files={filteredFiles} />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
          <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-3">
            <Search className="h-6 w-6 text-zinc-400" />
          </div>
          <p className="text-zinc-900 dark:text-zinc-100 font-medium">
            No files found
          </p>
          <p className="text-sm text-zinc-500">
            No files match "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
};

export default Files;
