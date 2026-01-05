import { useEffect } from "react";
import { useFileStore } from "@/store/file.store";

export const useFiles = () => {
    const {
        files,
        loading,
        fetchFiles,
        upload,
        archive,
        unarchive,
    } = useFileStore();

    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]);

    return {
        files,
        loading,
        upload,
        archive,
        unarchive,
    };
};
