type FormatGroups = {
  image?: string[];
  document?: string[];
  audio?: string[];
  video?: string[];
  archive?: string[];
  code?: string[];         // Source code files (e.g., .js, .py, .java)
  font?: string[];         // Font files (e.g., .ttf, .otf, .woff)
  spreadsheet?: string[];  // Spreadsheet files (e.g., .xls, .xlsx, .csv)
  presentation?: string[]; // Presentation files (e.g., .ppt, .pptx, .odp)
  database?: string[];     // Database files (e.g., .db, .sqlite)
  cad?: string[];          // CAD files (e.g., .dwg, .dxf)
  ebook?: string[];        // Ebook formats (e.g., .epub, .mobi) - though some overlap with document
  diskImage?: string[];    // Disk image files (e.g., .iso, .img)
  executable?: string[];   // Executable files (though conversions are rare/specialized)
  web?: string[];          // Web-related files (e.g., .html, .css, .json, .xml) - some overlap with document/code
};

const conversionMap: Record<string, FormatGroups> = {
  png: {
    image: ["jpg", "jpeg", "webp", "gif", "tiff", "ico", "bmp", "avif", "svg", "eps", "psd"],
    document: ["pdf"],
  },
  jpg: {
    image: ["png", "jpeg", "webp", "gif", "tiff", "ico", "bmp", "avif", "svg", "eps", "psd"],
    document: ["pdf"],
  },
  jpeg: {
    image: ["png", "jpg", "webp", "gif", "tiff", "ico", "bmp", "avif", "svg", "eps", "psd"],
    document: ["pdf"],
  },
  webp: {
    image: ["png", "jpg", "jpeg", "gif", "tiff", "ico", "bmp", "avif", "svg", "eps", "psd"],
    document: ["pdf"],
  },
  gif: {
    image: ["png", "jpg", "jpeg", "webp", "tiff", "bmp", "avif", "svg", "eps", "psd"],
    document: ["pdf"],
  },
  tiff: {
    image: ["png", "jpg", "jpeg", "webp", "gif", "bmp", "avif", "svg", "eps", "psd"],
    document: ["pdf"],
  },
  bmp: {
    image: ["png", "jpg", "jpeg", "webp", "gif", "tiff", "ico", "avif", "svg", "eps", "psd"],
    document: ["pdf"],
  },
  ico: {
    image: ["png", "jpg", "jpeg", "webp", "bmp", "avif", "svg", "eps", "psd"],
  },
  svg: {
    image: ["png", "jpg", "jpeg", "webp", "pdf"],
  },
  psd: {
    image: ["png", "jpg", "jpeg", "webp", "gif", "tiff", "bmp", "pdf"],
  },
  avif: {
    image: ["png", "jpg", "jpeg", "webp", "gif", "tiff", "bmp", "svg", "eps", "psd"],
    document: ["pdf"],
  },
  eps: {
    image: ["png", "jpg", "jpeg", "pdf"],
  },

  // --- Document Formats ---
  pdf: {
    image: ["png", "jpg", "jpeg", "webp", "gif", "tiff", "bmp", "svg"],
    document: ["doc", "docx", "txt", "rtf", "odt", "html", "epub", "ps"],
  },
  doc: {
    document: ["docx", "pdf", "txt", "rtf", "odt", "html"],
  },
  docx: {
    document: ["doc", "pdf", "txt", "rtf", "odt", "html"],
  },
  txt: {
    document: ["doc", "docx", "pdf", "rtf", "odt", "html"],
  },
  rtf: {
    document: ["doc", "docx", "pdf", "txt", "odt", "html"],
  },
  odt: {
    document: ["doc", "docx", "pdf", "txt", "rtf", "html"],
  },
  html: {
    document: ["pdf", "txt", "doc", "docx"],
  },
  epub: {
    document: ["pdf", "mobi", "azw3", "txt", "html"],
  },
  ps: {
    image: ["pdf", "png", "jpg"],
    document: ["pdf"],
  },

  // --- Audio Formats ---
  mp3: {
    audio: ["wav", "aac", "flac", "ogg", "wma", "aiff", "m4a"],
  },
  wav: {
    audio: ["mp3", "aac", "flac", "ogg", "wma", "aiff", "m4a"],
  },
  aac: {
    audio: ["mp3", "wav", "flac", "ogg", "wma", "aiff", "m4a"],
  },
  flac: {
    audio: ["mp3", "wav", "aac", "ogg", "wma", "aiff", "m4a"],
  },
  ogg: {
    audio: ["mp3", "wav", "aac", "flac", "wma", "aiff", "m4a"],
  },
  wma: {
    audio: ["mp3", "wav", "aac", "flac", "ogg", "aiff", "m4a"],
  },
  aiff: {
    audio: ["mp3", "wav", "aac", "flac", "ogg", "wma", "m4a"],
  },
  m4a: {
    audio: ["mp3", "wav", "aac", "flac", "ogg", "wma", "aiff"],
  },

  // --- Video Formats ---
  mp4: {
    audio: ["mp3", "aac"],
    video: ["avi", "mov", "wmv", "flv", "mkv", "webm", "mpeg", "3gp"],
  },
  avi: {
    audio: ["mp3", "aac"],
    video: ["mp4", "mov", "wmv", "flv", "mkv", "webm", "mpeg", "3gp"],
  },
  mov: {
    audio: ["mp3", "aac"],
    video: ["mp4", "avi", "wmv", "flv", "mkv", "webm", "mpeg", "3gp"],
  },
  wmv: {
    audio: ["mp3", "aac"],
    video: ["mp4", "avi", "mov", "flv", "mkv", "webm", "mpeg", "3gp"],
  },
  flv: {
    audio: ["mp3", "aac"],
    video: ["mp4", "avi", "mov", "wmv", "mkv", "webm", "mpeg", "3gp"],
  },
  mkv: {
    audio: ["mp3", "aac"],
    video: ["mp4", "avi", "mov", "wmv", "flv", "webm", "mpeg", "3gp"],
  },
  webm: {
    audio: ["mp3", "aac"],
    video: ["mp4", "avi", "mov", "wmv", "flv", "mkv", "mpeg", "3gp"],
  },
  mpeg: {
    audio: ["mp3", "aac"],
    video: ["mp4", "avi", "mov", "wmv", "flv", "mkv", "webm", "3gp"],
  },
  "3gp": {
    audio: ["mp3", "aac"],
    video: ["mp4", "avi", "mov", "wmv", "flv", "mkv", "webm", "mpeg"],
  },

  // --- Archive Formats ---
  zip: {
    archive: ["rar", "7z", "tar", "gz", "bz2"]
  },
  rar: {
    archive: ["zip", "7z", "tar", "gz", "bz2"]
  },
  "7z": {
    archive: ["zip", "rar", "tar", "gz", "bz2"]
  },
  tar: {
    archive: ["zip", "rar", "7z", "gz", "bz2"]
  },
  gz: {
    archive: ["zip", "rar", "7z", "tar", "bz2"]
  },
  bz2: {
    archive: ["zip", "rar", "7z", "tar", "gz"]
  },
  // --- Spreadsheet Formats ---
    xls: {
        spreadsheet: ["xlsx", "csv", "ods", "pdf"],
        document: ["pdf"]
    },
    xlsx: {
        spreadsheet: ["xls", "csv", "ods", "pdf"],
    },
    csv: {
        spreadsheet: ["xls", "xlsx", "tsv"],
        document: ["pdf"],
    },

    // --- Presentation Formats ---
    ppt: {
        presentation: ["pptx", "pdf", "odp"],
    },
    pptx: {
        presentation: ["ppt", "pdf", "odp"],
    },
    js: {
        code: ["ts", "json"],
        web: ["html"]
    },
    json: {
        web: ["xml", "yaml"],
        code: ["js"]
    },

    // --- Font Formats ---
    ttf: {
        font: ["otf", "woff", "woff2", "eot"],
    },
    otf: {
        font: ["ttf", "woff", "woff2", "eot"],
    },

// ... and so on for other categories
};

export function getConversionFormats(extension: string): FormatGroups {
  const ext = extension.toLowerCase().replace('.', '');
  return (
    conversionMap[ext] || {}
  );
}
