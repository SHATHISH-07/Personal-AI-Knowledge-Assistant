export type FileType = "code" | "text";

export interface FileItem {
    _id: string;
    userId: string;
    fileName: string;
    fileType: FileType;
    size: number;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface FileUploadResponse {
    message: string;
    fileId: string;
}
