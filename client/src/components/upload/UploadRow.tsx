import type { FC } from "react";
import { Loader2, FileText, CheckCircle2, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UploadItem } from "@/types/upload.type";

interface Props {
  item: UploadItem;
  onRemove: (id: string) => void;
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const UploadRow: FC<Props> = ({ item, onRemove }) => {
  const isPending = item.status === "QUEUED";
  const isUploading = item.status === "UPLOADING";
  const isCompleted = item.status === "COMPLETED";
  const isFailed = item.status === "FAILED";

  return (
    <div
      className={cn(
        "group relative flex items-center justify-between rounded-lg border bg-gray-100 dark:bg-[#181818] p-3 transition-all gap-3",
        isFailed
          ? "border-red-200 bg-red-50/10"
          : "border-gray-200 hover:border-gray-300"
      )}
    >
      <div className="flex items-center gap-3 overflow-hidden flex-1 min-w-0">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border",
            isCompleted && "border-green-200 bg-green-50 text-green-600",
            isFailed && "border-red-200 bg-red-50 text-red-600",
            (isPending || isUploading) &&
              "border-gray-100 bg-gray-50 text-[#212121]"
          )}
        >
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : isFailed ? (
            <AlertCircle className="h-5 w-5" />
          ) : (
            <FileText className="h-5 w-5" />
          )}
        </div>

        <div className="flex flex-col min-w-0 flex-1">
          <span className="truncate text-sm font-medium text-gray-700 dark:text-gray-200 block">
            {item.file.name}
          </span>
          <span className="text-xs text-gray-600 dark:text-gray-400 truncate block">
            {formatBytes(item.file.size)} &bull;
            <span
              className={cn(
                "ml-1 font-medium",
                isUploading && "text-[#212121] dark:text-white",
                isCompleted && "text-green-600",
                isFailed && "text-red-600",
                isPending && "text-gray-700 dark:text-gray-400"
              )}
            >
              {item.status.toLowerCase()}
            </span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {isUploading && (
          <Loader2 className="h-4 w-4 animate-spin text-[#212121]" />
        )}

        {(isPending || isFailed) && (
          <Button
            size="icon"
            className="h-8 w-8 cursor-pointer text-gray-600 dark:text-gray-200 hover:text-red-400 bg-white dark:bg-[#181818] hover:bg-zinc-300 dark:hover:bg-[#212121]"
            onClick={() => onRemove(item.id)}
            title="Remove file"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default UploadRow;
