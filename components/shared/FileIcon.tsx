import {
  Image,
  Video,
  Music,
  Archive,
  FileText,
  FileCode,
  FileSpreadsheet,
  FileType,
  FileJson
} from "lucide-react";

export const getFileIcon = (type: string) => {
  if (type.startsWith("image/")) return <Image className="w-6 h-6" />;
  if (type.startsWith("video/")) return <Video className="w-6 h-6" />;
  if (type.startsWith("audio/")) return <Music className="w-6 h-6" />;
  if (type.includes("zip") || type.includes("rar")) return <Archive className="w-6 h-6" />;

  if (type.includes("pdf")) return <FileText className="w-6 h-6" />;
  if (type.includes("json")) return <FileJson className="w-6 h-6" />;
  if (type.includes("csv") || type.includes("excel") || type.includes("sheet"))
    return <FileSpreadsheet className="w-6 h-6" />;
  if (type.includes("word")) return <FileText className="w-6 h-6" />;
  if (type.includes("code") || type.includes("javascript") || type.includes("html") || type.includes("css"))
    return <FileCode className="w-6 h-6" />;

  return <FileType className="w-6 h-6" />;
};
