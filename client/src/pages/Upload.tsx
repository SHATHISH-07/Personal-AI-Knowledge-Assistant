import UploadDropZone from "@/components/upload/UploadDropZone";

const Upload = () => {
  return (
    <div className=" w-full p-4 md:p-12 custom-scrollbar">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#212121] dark:text-white">
            Upload Knowledge
          </h1>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-200">
            Add documents and code files to your private knowledge base. We'll
            process them for AI indexing.
          </p>
        </div>

        <UploadDropZone />
      </div>
    </div>
  );
};

export default Upload;
