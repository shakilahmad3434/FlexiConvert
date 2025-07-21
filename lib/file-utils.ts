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
