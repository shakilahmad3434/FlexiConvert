'use client'

import { AlertCircle, BadgeCheckIcon, Download, FileText, MoveRight, RefreshCcw, Settings, Upload, X } from "lucide-react";
import { Button } from "../ui/button";
import React, { useCallback, useState } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { formatBytes, getFileCategory, useFileConversion } from "@/lib/file-utils";
import { getFileIcon } from "./FileIcon";
import FormatSelector from "./FormatSelector";
import { ConversionFile } from "@/types/conversion";
import {v4 as uuidv4} from "uuid"
import { httpRequest } from "@/lib/httpRequest";
import { AxiosProgressEvent } from "axios";


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
    const [loading, setLoading] = useState(false);
    const [convertedFileUrl, setConvertedFileUrl] = useState<string | null>(null);
    const { files, addFiles, removeFile, updateTargetFormat, updateFileStatus, clearHistory } = useFileConversion();

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
        if (rejectedFiles.length > 0) {
            rejectedFiles.forEach((file) => {
                file.errors.forEach((error: any) => {
                if (error.code === 'file-too-large') {
                    toast.error(`File ${file.file.name} is too large. Max size is ${formatBytes(maxSize)}`);
                } else if (error.code === 'file-invalid-type') {
                    toast.error(`File ${file.file.name} has an invalid format`);
                } else {
                    toast.error(`Error with file ${file.file.name}: ${error.message}`);
                }
                });
            });
        }
        if (acceptedFiles.length > 0) {
            addFiles(acceptedFiles);
            toast.success(`${acceptedFiles.length} file(s) added successfully`);
        }
  }, [addFiles, maxSize]);


  const { getRootProps, getInputProps, isDragActive: dropzoneActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  // check targeted format is select or not
  const checkTargetedFormat = files.filter((file)=> file.targetFormat === "None")
  const checkFileStatus = files.filter((file)=> file.status === "pending")

  // convert the whole file in the same time
  const fileConversion = async (totalFiles: ConversionFile[]) => {
    if(checkTargetedFormat.length > 0)
        return toast.error("Please select targeted format")

    for(const file of totalFiles){
        if(file.status === "completed")
            continue

        console.log("HIHIHI")
        updateFileStatus(file.id, 'processing', 0);

        const category = getFileCategory(file.originalFormat);

        const path = `${category}/${uuidv4()}.${file.originalFormat}`;
        const payload = {path, type: file.file.type};
        const options = {
            headers: { 'Content-Type': file.file.type },
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                if(progressEvent.total){
                    const percent = Math.round((progressEvent.loaded * 50) / progressEvent.total);
                    updateFileStatus(file.id, 'processing', percent);
                }
            }
        };

        try {
            setLoading(true)
            const { data } = await httpRequest.post('/upload', payload);
            await httpRequest.put(data.url, file.file, options);
            updateFileStatus(file.id, 'processing', 50);

            const conversionPayload = {
                category,
                path,
                format: file.targetFormat
            }
            updateFileStatus(file.id, 'processing', 75);

            const {data: convertedFileUrl} = await httpRequest.post('/conversion', conversionPayload);

             toast.success('Conversion successful');
            setConvertedFileUrl(convertedFileUrl.convertedFileUrl);
            updateFileStatus(file.id, 'completed', 100);
        } catch (err) {
             updateFileStatus(file.id, 'error', 0);
            if (err instanceof Error) {
                toast.error(err.message || "something went wrong");
            }
        } finally{
            setLoading(false)
        }
        console.log(files)

    }

  }

  const handleFormatChange = (fileId: string, newFormat: string) => {
    updateTargetFormat(fileId, newFormat)
    // In a real app, this would update the file's target format
    toast.info(`Target format changed to ${newFormat.toUpperCase()}`);
  };

  const handleDownload = async (file: ConversionFile) => {
    const name = `${file.name.split('.')[0]}.${file.targetFormat}`;
    if(!convertedFileUrl)
        return toast.error('Conversion file not generated!')

    const response = await fetch(convertedFileUrl)
    const blob = await response.blob();
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = name
    document.body.appendChild(a);
    a.click()
    a.remove()
    URL.revokeObjectURL(url);
    
    toast.success(`Downloading ${name}`);
    console.log(files)
  };

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
                                <p>Maximum {maxFiles} files • Up to {formatBytes(maxSize)} each</p>
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
                                            <FormatSelector fileExtension={file.originalFormat} handleFormatChange={handleFormatChange} id={file.id} />
                                        </div>
                                        :
                                        <p className="whitespace-nowrap space-x-2">
                                            <span>Convert to</span>
                                            <Badge variant='destructive' className="uppercase">{file.targetFormat}</Badge>
                                        </p>
                                    }
                                    {file.status !== "pending" && (
                                        <div>
                                            {file.status === "processing" ? (
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary" className="uppercase bg-amber-500 text-white dark:bg-amber-600 rounded">
                                                <RefreshCcw className="animate-spin" />
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
                                                    file.status === "processing"
                                                    ?
                                                        <Progress value={file.progress} className="w-24" />
                                                    :
                                                    <Button
                                                        onClick={()=> handleDownload(file)}
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
                            </div>
                            {
                                checkFileStatus.length > 0 &&
                                <div>
                                    <Button onClick={()=> fileConversion(files)} className={`rounded group flex items-center gap-2 transition-all ${checkTargetedFormat.length > 0 ? "bg-gradient-to-r from-gray-500 via-20% to-gray-600" : "bg-gradient-to-r from-amber-400 via-10% to-amber-500"} hover:opacity-75 text-white cursor-pointer`} size="lg">
                                        
                                        {loading ? <span>Loading...</span> : <span>Convert</span>}
                                        <MoveRight className="transform transition-transform duration-200 group-hover:translate-x-1" />
                                    </Button>
                                </div>
                            }
                        </div>
                    </CardFooter>
                </Card>
            </div>
            }
        </div>
    )
}

export default FileUploadZone;