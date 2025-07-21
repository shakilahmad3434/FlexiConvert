export type ConversionStatus = 'pending' | 'processing' | 'completed' | 'error';

export interface ConversionFile {
  id: string;
  name: string;
  size: number;
  originalFormat: string;
  targetFormat: string;
  status: ConversionStatus;
  progress: number;
  timestamp: number;
  file: File;
}

export interface ConversionOptions {
  quality?: number;
  compression?: number;
  resolution?: string;
  audioCodec?: string;
  videoCodec?: string;
}

export interface ConversionResult {
  success: boolean;
  message: string;
  downloadUrl?: string;
  fileSize?: number;
}