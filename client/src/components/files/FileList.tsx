import type { FileItem } from "@/types/file.type";
import FileRow from "./FileRow";

interface Props {
  files: FileItem[];
}

const FileList = ({ files }: Props) => {
  const active = files.filter((f) => !f.isArchived);
  const archived = files.filter((f) => f.isArchived);

  if (files.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center text-gray-700 dark:text-gray-400">
        No files uploaded yet
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full">
      {/* Active Files */}
      <section>
        <h2 className="mb-3 text-sm font-semibold text-start">
          ACTIVE FILES - {active.length}
        </h2>

        {/* Responsive Grid: 1 col on mobile, 2 cols on md+ screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {active.map((file) => (
            <FileRow key={file._id} file={file} />
          ))}
        </div>
      </section>

      {/* Archived Files */}
      {archived.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground text-start">
            ARCHIVED FILES - {archived.length}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 opacity-70 hover:opacity-100 transition-opacity">
            {archived.map((file) => (
              <FileRow key={file._id} file={file} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default FileList;
