import { create } from "zustand";
import type { FileItem } from "@/types/file.type";
import { archiveFile, getFiles, unarchiveFile, uploadFile } from "@/api/files.api";

interface FileState {
    files: FileItem[];
    loading: boolean;

    fetchFiles: () => Promise<void>;
    upload: (file: File) => Promise<void>;
    archive: (fileId: string) => Promise<void>;
    unarchive: (fileId: string) => Promise<void>;
}

export const useFileStore = create<FileState>((set, get) => ({
    files: [],
    loading: false,

    fetchFiles: async () => {
        set({ loading: true });
        const res = await getFiles();
        set({ files: res.data, loading: false });
    },

    upload: async (file) => {
        await uploadFile(file);
        await get().fetchFiles();
    },

    archive: async (fileId) => {
        await archiveFile(fileId);
        await get().fetchFiles();
    },

    unarchive: async (fileId) => {
        await unarchiveFile(fileId);
        await get().fetchFiles();
    },
}));
