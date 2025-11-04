import { useCallback, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvatarUploadProps {
  value?: File;
  onChange: (file: File | undefined) => void;
  className?: string;
}

export const AvatarUpload = ({ onChange, className }: AvatarUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onChange(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(undefined);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
  };

  return (
    <div className={cn("flex justify-center", className)}>
      <div
        {...getRootProps()}
        ref={dropzoneRef}
        className="relative cursor-pointer"
      >
        <input {...getInputProps()} />
        
        <motion.div
          className={cn(
            "group",
            isDragActive && "scale-105"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Avatar className="w-24 h-24 border-4 border-white dark:border-slate-800 shadow-2xl">
            {preview ? (
              <AvatarImage src={preview} alt="Avatar preview" />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-emerald-500 text-white text-2xl">
                <User className="w-8 h-8" />
              </AvatarFallback>
            )}
          </Avatar>

          {/* Overlay de drag & drop */}
          {isDragActive && (
            <motion.div
              className="absolute inset-0 bg-blue-500/20 rounded-full border-2 border-dashed border-blue-500 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Upload className="w-6 h-6 text-blue-500" />
            </motion.div>
          )}

          {/* Bouton d'upload */}
          <motion.div
            className={cn(
              "absolute -bottom-2 -right-2 p-2 rounded-full shadow-lg transition-all duration-300",
              preview 
                ? "bg-emerald-500 text-white hover:bg-emerald-600" 
                : "bg-blue-500 text-white hover:bg-blue-600"
            )}
            whileHover={{ scale: 1.1 }}
            onClick={preview ? handleRemove : undefined}
          >
            {preview ? (
              <X className="w-4 h-4" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
          </motion.div>

          {/* Indicateur de drag */}
          <motion.div
            className={cn(
              "absolute -top-1 -left-1 w-3 h-3 rounded-full transition-colors duration-300",
              isDragActive ? "bg-green-400" : "bg-slate-400"
            )}
            animate={{ scale: isDragActive ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 1, repeat: isDragActive ? Infinity : 0 }}
          />
        </motion.div>
      </div>
    </div>
  );
};