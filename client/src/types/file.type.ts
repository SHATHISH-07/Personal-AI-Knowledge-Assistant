export type FileType = "code" | "text";

export interface FileItem {
    _id: string;
    userId: string;
    fileName: string;
    fileType: FileType;
    language?: string;
    size: number;
    isArchived: boolean;
    uploadedAt: string;
}

export interface FileUploadResponse {
    message: string;
    fileId: string;
}
