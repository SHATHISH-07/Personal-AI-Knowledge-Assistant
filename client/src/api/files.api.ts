import type { FileItem } from "@/types/file.type";
import api from "./axios";

export const getFiles = () => {
    return api.get<FileItem[]>("/files");
};

export const getFileById = (fileId: string) => {
    return api.get<FileItem>(`/files/${fileId}`);
};

export const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return api.post("/files/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const archiveFile = (fileId: string) => {
    return api.patch(`/files/${fileId}/archive`);
};

export const unarchiveFile = (fileId: string) => {
    return api.patch(`/files/${fileId}/unarchive`);
};
