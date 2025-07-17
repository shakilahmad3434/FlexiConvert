import { FileText, Image, Video, Music, Archive, Code, Database, Presentation } from 'lucide-react';

interface FormatCategory {
  name: string;
  icon: React.ReactNode;
  formats: string[];
  color: string;
  bgColor: string;
}

const formatCategories: FormatCategory[] = [
  {
    name: 'Documents',
    icon: <FileText className="w-6 h-6" />,
    formats: ['PDF', 'DOC', 'DOCX', 'TXT', 'RTF', 'ODT'],
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10 border-blue-500/20'
  },
  {
    name: 'Images',
    icon: <Image className="w-6 h-6" />,
    formats: ['JPG', 'PNG', 'SVG', 'GIF', 'WebP', 'TIFF'],
    color: 'text-green-400',
    bgColor: 'bg-green-500/10 border-green-500/20'
  },
  {
    name: 'Videos',
    icon: <Video className="w-6 h-6" />,
    formats: ['MP4', 'AVI', 'MOV', 'MKV', 'WebM', 'FLV'],
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10 border-purple-500/20'
  },
  {
    name: 'Audio',
    icon: <Music className="w-6 h-6" />,
    formats: ['MP3', 'WAV', 'FLAC', 'AAC', 'OGG', 'M4A'],
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10 border-orange-500/20'
  },
  {
    name: 'Archives',
    icon: <Archive className="w-6 h-6" />,
    formats: ['ZIP', 'RAR', '7Z', 'TAR', 'GZ', 'BZ2'],
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10 border-yellow-500/20'
  },
  {
    name: 'Code',
    icon: <Code className="w-6 h-6" />,
    formats: ['JSON', 'XML', 'CSV', 'HTML', 'CSS', 'JS'],
    color: 'text-red-400',
    bgColor: 'bg-red-500/10 border-red-500/20'
  },
  {
    name: 'Data',
    icon: <Database className="w-6 h-6" />,
    formats: ['SQL', 'DB', 'XLSX', 'XLS', 'CSV', 'TSV'],
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10 border-cyan-500/20'
  },
  {
    name: 'Presentation',
    icon: <Presentation className="w-6 h-6" />,
    formats: ['PPT', 'PPTX', 'ODP', 'KEY', 'PDF', 'HTML'],
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10 border-pink-500/20'
  }
];

const Formats = () => {
    return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-amber-400 bg-clip-text text-transparent">
              Supported Formats
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Convert between hundreds of file formats with lightning speed and precision.
            Our advanced algorithms ensure perfect quality retention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {formatCategories.map((category, index) => (
            <div
              key={category.name}
              className={`glass rounded-2xl p-6 border ${category.bgColor} hover:scale-105 transition-all duration-300 group cursor-pointer`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: 'slide-up 0.6s ease-out forwards'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`${category.color} group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.formats.map((format) => (
                  <span
                    key={format}
                    className="px-3 py-1 text-xs font-medium bg-muted rounded-full hover:bg-primary/20 transition-colors"
                  >
                    {format}
                  </span>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  {category.formats.length}+ formats supported
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold bg-amber-400 bg-clip-text text-transparent mb-2">
              500+
            </div>
            <p className="text-muted-foreground">File Formats</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-amber-600 bg-clip-text text-transparent mb-2">
              10M+
            </div>
            <p className="text-muted-foreground">Files Converted</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-amber-400 bg-clip-text text-transparent mb-2">
              99.9%
            </div>
            <p className="text-muted-foreground">Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Formats