import type { FileItem } from "@/types/file.type";
import { useFileStore } from "@/store/file.store";
import { FileText, Code, Archive, ArchiveRestore } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  file: FileItem;
}

const FileRow = ({ file }: Props) => {
  const { archive, unarchive } = useFileStore();

  const Icon = file.fileType === "code" ? Code : FileText;

  return (
    <div className="group flex items-center justify-between rounded-lg border p-3 bg-transparent shadow-md dark:bg-[#181818] gap-3 transition-all hover:shadow-sm">
      {/* Left Side: Icon & Text */}
      {/* min-w-0 ensures the flex child can shrink below its content size (critical for truncation) */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-gray-100 dark:bg-[#212121]">
          <Icon className="h-5 w-5" />
        </div>

        <div className="text-start min-w-0 flex-1">
          {/* truncate adds '...' if text is too long */}
          <p className="text-sm font-medium truncate pr-2">{file.fileName}</p>
          <p className="text-xs opacity-70">{file.fileType.toUpperCase()}</p>
        </div>
      </div>

      {/* Right Side: Action Button */}
      {/* shrink-0 prevents button from being squashed */}
      <div className="shrink-0">
        {file.isArchived ? (
          <Button
            size="icon"
            onClick={() => unarchive(file._id)}
            title="Unarchive"
            className="h-9 w-9"
          >
            <ArchiveRestore className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            size="icon"
            onClick={() => archive(file._id)}
            title="Archive"
            className="h-9 w-9"
          >
            <Archive className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FileRow;
