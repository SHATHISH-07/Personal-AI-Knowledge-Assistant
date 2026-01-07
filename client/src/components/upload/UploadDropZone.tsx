import { useState, useCallback, useRef } from "react";
import { uploadFile } from "@/api/files.api";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UploadCloud, FileIcon } from "lucide-react";
import type { UploadItem, UploadStatus } from "@/types/upload.type";
import UploadRow from "./UploadRow";

const UploadDropZone = () => {
  const [items, setItems] = useState<UploadItem[]>([]);
  const [busy, setBusy] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Handlers ---
  const onFilesSelected = (files: FileList | null) => {
    if (!files) return;

    const next: UploadItem[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      file,
      status: "QUEUED",
    }));

    setItems((prev) => [...prev, ...next]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (id: string) => {
    if (busy) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const removeAll = () => {
    if (busy) return;
    setItems([]);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    onFilesSelected(e.dataTransfer.files);
  }, []);

  const updateStatus = (id: string, status: UploadStatus, error?: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status, error } : item))
    );
  };

  const startUpload = async () => {
    if (busy) return;
    setBusy(true);

    for (const item of items) {
      if (item.status !== "QUEUED") continue;

      updateStatus(item.id, "UPLOADING");

      try {
        await uploadFile(item.file);
        updateStatus(item.id, "COMPLETED");
      } catch (err) {
        updateStatus(item.id, "FAILED", "Upload failed");
      }
    }

    setBusy(false);
  };

  const hasQueuedFiles = items.some((i) => i.status === "QUEUED");
  const hasItems = items.length > 0;

  return (
    <div className="w-full space-y-6">
      {/* Dropzone Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-10 md:py-16 text-center transition-all duration-200 cursor-pointer bg-white dark:bg-[#181818]",
          isDragging
            ? "border-[#212121] bg-gray-50 scale-[1.01]"
            : "border-gray-200 hover:border-[#212121]/50 hover:bg-gray-50/50",
          busy && "pointer-events-none opacity-50"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => onFilesSelected(e.target.files)}
        />

        {/* Icon Circle */}
        <div
          className={cn(
            "rounded-full p-4 transition-colors",
            isDragging
              ? "bg-[#212121] text-white"
              : "bg-gray-100 text-[#212121]"
          )}
        >
          <UploadCloud className="h-8 w-8" />
        </div>

        <div className="mt-4 max-w-[90%] md:max-w-xs space-y-1 mx-auto">
          <h3 className="font-semibold text-black dark:text-white">
            Click to upload or drag and drop
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Support for code files (.js, .ts, .py) and text documents.
          </p>
        </div>
      </div>

      {/* File List */}
      {hasItems && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <h4 className="text-sm font-medium text-[#212121] dark:text-gray-300">
              Selected Files ({items.length})
            </h4>
            {!busy && (
              <button
                onClick={removeAll}
                className="text-xs font-medium text-gray-600 dark:text-gray-200 hover:text-red-600 cursor-pointer transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="grid gap-3 max-h-80 overflow-y-auto pr-2">
            {items.map((item) => (
              <UploadRow key={item.id} item={item} onRemove={removeFile} />
            ))}
          </div>

          {/* Actions Footer */}
          {hasQueuedFiles && (
            <div className="flex justify-end pt-2">
              <Button
                onClick={startUpload}
                disabled={busy}
                className={cn(
                  "w-full md:w-auto min-w-35 text-white dark:text-black",
                  "dark:bg-zinc-200 bg-[#181818] cursor-pointer"
                )}
              >
                {busy ? (
                  <>
                    <FileIcon className="mr-2 h-4 w-4 animate-pulse" />
                    Uploading...
                  </>
                ) : (
                  <>Start Upload</>
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadDropZone;
