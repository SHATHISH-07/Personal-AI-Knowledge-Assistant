export interface DashboardSummary {
    totalFiles: number;
    totalChunks: number;
    archivedFiles: number;
    recentFiles: {
        _id: string;
        fileName: string;
        fileType: "code" | "text";
        createdAt: string;
    }[];
}