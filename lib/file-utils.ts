'use client'

import { ConversionFile, ConversionStatus } from '@/types/conversion';
import { useState, useCallback } from 'react';


export const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileCategory = (extension: string) => {
  const ext = extension.toLowerCase().replace('.', '');

  const categories = {
    pictures: ['jpg', 'jpeg', 'png', 'svg', 'gif', 'webp', 'tiff'],
    videos: ['mp4', 'avi', 'mov', 'mkv', 'webm', 'flv'],
    audio: ['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a'],
    documents: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'],
    presentation: ['ppt', 'pptx', 'odp', 'key', 'pdf', 'html'],
    archives: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'],
    code: ['json', 'xml', 'csv', 'html', 'css', 'js'],
    data: ['sql', 'db', 'xlsx', 'xls', 'csv', 'tsv'],
  };

  for (const [category, extensions] of Object.entries(categories)) {
    if (extensions.includes(ext)) {
      return category;
    }
  }

  return 'unknown';
}

export function useFileConversion() {
  const [files, setFiles] = useState<ConversionFile[]>([]);

  const addFiles = useCallback((newFiles: File[]) => {
    const conversionFiles: ConversionFile[] = newFiles.map(file => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      size: file.size,
      originalFormat: file.name.split('.').pop()?.toLowerCase() || 'unknown',
      targetFormat: 'None', // Default target format
      status: 'pending' as ConversionStatus,
      progress: 0,
      timestamp: Date.now(),
      file,
    }));

    setFiles(prev => [...prev, ...conversionFiles]);
  }, []);

  const updateFileStatus = useCallback((id: string, status: ConversionStatus, progress = 0) => {
    setFiles(prev => prev.map(file => 
      file.id === id 
        ? { ...file, status, progress, timestamp: status === 'completed' ? Date.now() : file.timestamp }
        : file
    ));
  }, []);

  const updateTargetFormat = useCallback((id: string, format: string) => {
    setFiles(prev => prev.map(file =>
        file.id === id
            ? {...file, targetFormat: format}
            : file
    ))
  }, [])

  const removeFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setFiles(prev => prev.filter(file => file.status !== 'completed'));
  }, []);

  const getFilesByStatus = useCallback((status: ConversionStatus) => {
    return files.filter(file => file.status === status);
  }, [files]);

  return {
    files,
    addFiles,
    updateFileStatus,
    removeFile,
    clearHistory,
    getFilesByStatus,
    updateTargetFormat
  };
}

export function formatBytes(bytes: number): string {
    if (bytes === 0) return "0 B";

    const units = ["B", "KB", "MB", "GB", "TB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));
    const value = bytes / Math.pow(1024, index);

    return `${value.toFixed(2)} ${units[index]}`;
}