"use client"
import React, { useCallback, useState } from 'react';
import { Upload, FileText, Image, Video, Music, Archive, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface FileItem {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'ready' | 'converting' | 'completed' | 'error';
}

export const FileUploadZone = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-6 h-6" />;
    if (type.startsWith('video/')) return <Video className="w-6 h-6" />;
    if (type.startsWith('audio/')) return <Music className="w-6 h-6" />;
    if (type.includes('zip') || type.includes('rar')) return <Archive className="w-6 h-6" />;
    return <FileText className="w-6 h-6" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      addFiles(selectedFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    const fileItems: FileItem[] = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: 'uploading'
    }));

    setFiles(prev => [...prev, ...fileItems]);

    // Simulate upload progress
    fileItems.forEach((fileItem) => {
      const interval = setInterval(() => {
        setFiles(prev => prev.map(f => {
          if (f.id === fileItem.id) {
            const newProgress = f.progress + Math.random() * 20;
            if (newProgress >= 100) {
              clearInterval(interval);
              return { ...f, progress: 100, status: 'ready' };
            }
            return { ...f, progress: newProgress };
          }
          return f;
        }));
      }, 200);
    });
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const convertFile = (id: string) => {
    setFiles(prev => prev.map(f => 
      f.id === id ? { ...f, status: 'converting', progress: 0 } : f
    ));

    // Simulate conversion
    const interval = setInterval(() => {
      setFiles(prev => prev.map(f => {
        if (f.id === id && f.status === 'converting') {
          const newProgress = f.progress + Math.random() * 15;
          if (newProgress >= 100) {
            clearInterval(interval);
            return { ...f, progress: 100, status: 'completed' };
          }
          return { ...f, progress: newProgress };
        }
        return f;
      }));
    }, 300);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Upload Zone */}
      <div
        className={`upload-zone p-12 text-center min-h-[300px] flex flex-col items-center justify-center ${
          isDragOver ? 'dragover' : ''
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setIsDragOver(true)}
        onDragLeave={() => setIsDragOver(false)}
      >
        <div className="animate-float mb-6">
          <Upload className="w-16 h-16 text-primary mx-auto mb-4" />
        </div>
        
        <h3 className="text-2xl font-bold mb-2 gradient-primary bg-clip-text text-transparent">
          Drop files here to convert
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          Support for images, videos, documents, and audio files. 
          Drag & drop or click to select files.
        </p>
        
        <div className="space-x-4">
          <Button 
            variant="default" 
            size="lg"
            className="gradient-primary hover:opacity-90 transition-smooth glow-primary"
            onClick={() => document.getElementById('file-input')?.click()}
          >
            Select Files
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="glass hover:bg-primary/10 transition-smooth"
          >
            Browse Formats
          </Button>
        </div>
        
        <input
          id="file-input"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
          accept="*/*"
        />
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Your Files</h4>
          <div className="space-y-3">
            {files.map((fileItem) => (
              <div key={fileItem.id} className="glass rounded-xl p-4 animate-slide-up">
                <div className="flex items-center gap-4">
                  <div className="text-primary">
                    {getFileIcon(fileItem.file.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium truncate">
                        {fileItem.file.name}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {formatFileSize(fileItem.file.size)}
                      </span>
                    </div>
                    
                    {fileItem.status !== 'ready' && fileItem.status !== 'completed' && (
                      <div className="w-full">
                        <Progress value={fileItem.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1 capitalize">
                          {fileItem.status}... {Math.round(fileItem.progress)}%
                        </p>
                      </div>
                    )}
                    
                    {fileItem.status === 'completed' && (
                      <div className="flex items-center gap-2 text-success text-sm">
                        <Check className="w-4 h-4" />
                        Conversion completed
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {fileItem.status === 'ready' && (
                      <Button
                        size="sm"
                        className="gradient-accent"
                        onClick={() => convertFile(fileItem.id)}
                      >
                        Convert
                      </Button>
                    )}
                    
                    {fileItem.status === 'completed' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-success border-success hover:bg-success/10"
                      >
                        Download
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => removeFile(fileItem.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};