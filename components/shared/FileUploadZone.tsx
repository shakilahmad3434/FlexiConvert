'use client'

import { AlertCircle, BadgeCheckIcon, Download, FileText, MoveRight, RefreshCcw, Settings, Upload, X } from "lucide-react";
import { Button } from "../ui/button";
import React, { useCallback, useState } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { formatBytes, useFileConversion } from "@/lib/file-utils";
import { getFileIcon } from "./FileIcon";
import { getConversionFormats } from "@/lib/file-format";
import FormatSelector from "./FormatSelector";


const maxSize = parseInt(process.env.NEXT_PUBLIC_MAX_SIZE!)
const maxFiles = parseInt(process.env.NEXT_PUBLIC_MAX_FILES!)
const accept = {
    'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'audio/*': ['.mp3', '.wav', '.flac', '.aac', '.ogg'],
    'video/*': ['.mp4', '.avi', '.mov', '.wmv', '.mkv'],
  }

const FileUploadZone = () => {
    const [isDragActive, setIsDragActive] = useState(false);
    const { files, addFiles, removeFile, updateFileStatus, clearHistory } = useFileConversion();
console.log(files)

    const onFilesAdded = (newFiles: File[]) => {
        addFiles(newFiles);
    }

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {

        if (rejectedFiles.length > 0) {
            rejectedFiles.forEach((file) => {
                file.errors.forEach((error: any) => {
                if (error.code === 'file-too-large') {
                    toast.error(`File ${file.file.name} is too large. Max size is ${maxSize / 1024 / 1024}MB`);
                } else if (error.code === 'file-invalid-type') {
                    toast.error(`File ${file.file.name} has an invalid format`);
                } else {
                    toast.error(`Error with file ${file.file.name}: ${error.message}`);
                }
                });
            });
        }

        if (acceptedFiles.length > 0) {
            onFilesAdded(acceptedFiles);
            toast.success(`${acceptedFiles.length} file(s) added successfully`);
        }
  }, [onFilesAdded, maxSize]);


  const { getRootProps, getInputProps, isDragActive: dropzoneActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  // get total file size
  const totalFileSize = files.reduce((accum, currentVal) => accum + currentVal.size, 0);
 
    return (
        <div className="w-full max-w-4xl mx-auto space-y-6 mt-20 py-10">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">
                    <span className="bg-amber-400 bg-clip-text text-transparent">Start Your Conversion</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Easily transform your files into any format you need, quickly and efficiently.
                </p>
            </div>

            <Card className="w-full bg-transparent border-transparent">
                <CardContent className="p-0">
                    <div
                    {...getRootProps()}
                    className={cn(
                        "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-300",
                        "hover:border-primary/50 hover:bg-primary/5",
                        isDragActive || dropzoneActive
                        ? "border-primary bg-primary/10"
                        : "border-muted-foreground/25"
                    )}
                    >
                    <input {...getInputProps()} />
                    
                        <div className="space-y-6">
                            <div className="animate-float mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <Upload className="h-8 w-8 text-primary" />
                            </div>
                            
                            <div className="space-y-2">
                            <h3 className="text-xl font-semibold">
                                {isDragActive || dropzoneActive ? "Drop files here" : "Upload your files"}
                            </h3>
                            <p className="text-muted-foreground">
                                Drag and drop files here, or click to browse
                            </p>
                            </div>

                            <div className="flex flex-col items-center space-y-2">
                            <Button variant="outline" className="w-auto rounded py-5">
                                <FileText className="mr-2 h-4 w-4" />
                                Choose Files
                            </Button>
                            <div className="text-xs text-muted-foreground text-center">
                                <p>Maximum {maxFiles} files • Up to {maxSize / 1024 / 1024}MB each</p>
                                <p>Supports: PDF, DOC, DOCX, JPG, PNG, MP4, MP3, and more</p>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-muted/30 rounded-b-lg">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <AlertCircle className="h-4 w-4" />
                        <span>Your files are processed securely and automatically deleted after conversion</span>
                    </div>
                    </div>
                </CardContent>
            </Card>

            {
                files.length > 0 &&
                <div className="space-y-4">
                <h4 className="text-lg font-semibold">Your Files</h4>
                <Card className="rounded">
                    <CardContent className="glass rounded-xl animate-slide-up">
                        <div className="space-y-2">
                            {
                                files.map((file) => (
                                    <div key={file.id} className="border-b border-gray-800 py-3 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="text-primary">
                                        {getFileIcon(file.file.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col items-start justify-between mb-1">
                                            <p className="text-sm font-medium w-64 truncate">
                                                {file.name}
                                            </p>
                                            <p className="text-sm font-medium truncate text-gray-600">{formatBytes(file.size)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-10">
                                    {
                                        file.status === "pending" ?
                                        <div className="flex items-center gap-2 w-full">
                                            <p className="whitespace-nowrap">Convert to:</p>
                                            <FormatSelector fileExtension={file.originalFormat}/>
                                        </div>
                                        :
                                        <p className="whitespace-nowrap space-x-2">
                                            <span>Convert to</span>
                                            <Badge variant='destructive'>PS</Badge>
                                        </p>
                                    }
                                    {file.status !== "pending" && (
                                        <div>
                                            {status === "second" ? (
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary" className="uppercase bg-amber-500 text-white dark:bg-amber-600 rounded">
                                                <RefreshCcw />
                                                Waiting
                                                </Badge>
                                                <span>Uploading</span>
                                            </div>
                                            ) : (
                                            <div>
                                                <Badge variant="secondary" className="uppercase bg-green-500 text-white dark:bg-green-600">
                                                <BadgeCheckIcon />
                                                Finished
                                                </Badge>
                                            </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 w-full">
                                        {
                                            file.status !== "pending" ? (
                                                    status === "second"
                                                    ?
                                                        <Progress value={30} className="w-24" />
                                                    :
                                                    <Button
                                                        className="text-success border-success hover:bg-success/10 bg-gradient-to-r from-amber-400 via-10% to-amber-500 hover:opacity-75 rounded cursor-pointer"
                                                    >
                                                        <Download />
                                                        Download
                                                    </Button>
                                            )
                                            :
                                            <Button
                                            variant="outline"
                                            className="text-muted-foreground hover:text-destructive w-10 h-10 rounded-full"
                                            >
                                            <Settings className="w-6 h-6" />
                                        </Button>
                                        }
                                        
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-muted-foreground hover:text-destructive w-10 h-10 rounded-full"
                                            onClick={()=> removeFile(file.id)}
                                            >
                                            <X className="w-6 h-6" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                                ))
                            }
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="flex justify-between items-center w-full">
                            <div>
                                <p className="text-sm">{files.length} files selected — {formatBytes(totalFileSize)} total</p>
                                <p className="text-sm text-gray-500">Est. time: 10–12 sec</p>
                            </div>
                            <div>
                                <Button className="rounded group flex items-center gap-2 transition-all bg-gradient-to-r from-amber-400 via-10% to-amber-500 hover:opacity-75 text-white cursor-pointer" size="lg">
                                    <span>Convert</span>
                                    <MoveRight className="transform transition-transform duration-200 group-hover:translate-x-1" />
                                </Button>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
            }
        </div>
    )
}

export default FileUploadZone;