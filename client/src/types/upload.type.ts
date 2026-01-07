export type UploadStatus =
    | "QUEUED"
    | "UPLOADING"
    | "PROCESSING"
    | "COMPLETED"
    | "FAILED";

export interface UploadItem {
    id: string;
    file: File;
    status: UploadStatus;
    error?: string;
}