import { useEffect } from "react";
import { useDashboardStore } from "@/store/dashboard.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Upload,
  MessageSquare,
  Archive,
  ArrowUpRight,
  Database,
  Clock,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import clsx from "clsx";

const Dashboard = () => {
  const { summary, loading, fetchSummary } = useDashboardStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  if (loading || !summary) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-8 w-full  mx-auto px-4 md:px-0">
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Overview
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          A summary of your knowledge base and recent activity.
        </p>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Knowledge"
          value={summary.totalFiles}
          label="Files Uploaded"
          icon={FileText}
          color="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
        />
        <StatCard
          title="Vector Data"
          value={summary.totalChunks}
          label="Processed Chunks"
          icon={Database}
          color="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
        />
        <StatCard
          title="Archive"
          value={summary.archivedFiles}
          label="Archived Items"
          icon={Archive}
          color="bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
        />
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start h-full">
        {/* LEFT COLUMN: RECENT FILES (Takes up 2/3 space) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="h-full border-zinc-200 shadow-sm dark:border-white/10 dark:bg-[#181818] flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-zinc-100 dark:border-white/5">
              <div className="space-y-1">
                <CardTitle className="text-lg font-semibold">
                  Recent Uploads
                </CardTitle>
                <p className="text-xs text-zinc-500">
                  Your latest knowledge assets
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                onClick={() => navigate("/files")}
              >
                View All <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </CardHeader>

            <CardContent className="p-0">
              {summary.recentFiles.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-75 text-center">
                  <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-3">
                    <Upload className="h-6 w-6 text-zinc-400" />
                  </div>
                  <p className="text-zinc-500 text-sm">
                    No files uploaded yet.
                  </p>
                </div>
              ) : (
                // FIX 2: Fixed height + Overflow Y + Custom Scrollbar
                <div className="h-95 overflow-y-auto custom-scrollbar divide-y divide-zinc-100 dark:divide-white/5">
                  {summary.recentFiles.map((file) => (
                    <div
                      key={file._id}
                      className="group flex items-center justify-between p-4 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors"
                    >
                      {/* FIX 3: flex-1 and min-w-0 ensures truncation works */}
                      <div className="flex items-center gap-4 flex-1 min-w-0 pr-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col text-left min-w-0 flex-1">
                          <span className="font-medium text-sm truncate text-zinc-900 dark:text-zinc-200 block">
                            {file.fileName}
                          </span>
                          <span className="text-xs text-zinc-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" /> Recently added
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="inline-block rounded-full bg-zinc-100 px-2.5 py-0.5 text-[10px] md:text-xs font-medium text-zinc-600 dark:bg-white/10 dark:text-zinc-300 uppercase tracking-wide">
                          {file.fileType}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: QUICK ACTIONS (Takes up 1/3 space) */}
        <div className="w-full">
          <Card className="border-zinc-200 shadow-sm dark:border-white/10 dark:bg-[#181818]">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button
                size="lg"
                className="w-full justify-start gap-3 h-14 text-sm md:text-base"
                onClick={() => navigate("/upload")}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded bg-primary-foreground/20">
                  <Plus className="h-5 w-5" />
                </div>
                Upload New File
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full justify-start gap-3 h-14 text-sm md:text-base border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/5"
                onClick={() => navigate("/ask")}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                  <MessageSquare className="h-4 w-4" />
                </div>
                Ask AI Assistant
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full justify-start gap-3 h-14 text-sm md:text-base border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/5"
                onClick={() => navigate("/files")}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                  <Database className="h-4 w-4" />
                </div>
                Manage Database
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

interface StatCardProps {
  title: string;
  value: number;
  label: string;
  icon: any;
  color: string;
}

const StatCard = ({
  title,
  value,
  label,
  icon: Icon,
  color,
}: StatCardProps) => (
  <Card className="border-zinc-200 shadow-sm dark:border-white/10 dark:bg-[#181818]">
    <CardContent className="p-6">
      <div className="flex items-center gap-4">
        <div
          className={clsx(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
            color
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="space-y-1 min-w-0">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 truncate">
            {title}
          </p>
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {value}
            </h3>
            <span className="text-xs text-zinc-500 font-normal truncate">
              {label}
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
