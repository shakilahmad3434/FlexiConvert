import React from 'react'
import { 
  Zap, 
  Shield, 
  Cloud, 
  Cpu, 
  Download, 
  Smartphone,
  Clock,
  Stars,
  Lock,
  RefreshCw,
  Users,
  Award
} from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Lightning Fast',
    description: 'Convert files in seconds with our optimized processing engines.',
    color: 'text-yellow-400'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Secure & Private',
    description: 'Your files are encrypted and automatically deleted after conversion.',
    color: 'text-green-400'
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: 'Cloud Processing',
    description: 'Powerful cloud infrastructure handles any file size effortlessly.',
    color: 'text-blue-400'
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: 'AI-Powered',
    description: 'Advanced algorithms ensure optimal quality and compression.',
    color: 'text-purple-400'
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: 'Batch Processing',
    description: 'Convert multiple files simultaneously to save time.',
    color: 'text-orange-400'
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Mobile Friendly',
    description: 'Works perfectly on all devices - desktop, tablet, and mobile.',
    color: 'text-pink-400'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: '24/7 Available',
    description: 'Convert files anytime, anywhere with our always-online service.',
    color: 'text-cyan-400'
  },
  {
    icon: <Stars className="w-6 h-6" />,
    title: 'Premium Quality',
    description: 'Maintain original quality while optimizing file size.',
    color: 'text-indigo-400'
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'No Registration',
    description: 'Start converting immediately without creating an account.',
    color: 'text-red-400'
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: 'Auto-Update',
    description: 'Always get the latest features and format support.',
    color: 'text-teal-400'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Team Sharing',
    description: 'Share converted files instantly with your team members.',
    color: 'text-violet-400'
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Industry Leading',
    description: 'Trusted by millions of users worldwide for their conversion needs.',
    color: 'text-amber-400'
  }
];

const Features = () => {
    return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-amber-400 bg-clip-text text-transparent">
              Why Choose Our Converter?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the most advanced file conversion platform with cutting-edge features 
            designed for speed, security, and simplicity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass rounded-xl p-6 hover:scale-105 transition-all duration-300 group cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start gap-4">
                <div className={`${feature.color} group-hover:scale-110 transition-transform shrink-0 mt-1`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to start converting?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join millions of users who trust our platform for their file conversion needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-yellow-300 via-10% to-yellow-400 rounded-xl font-medium hover:opacity-90 transition-smooth glow-primary">
                Start Converting Now
              </button>
              <button className="px-8 py-3 border border-border rounded-xl font-medium hover:bg-primary/10 transition-smooth">
                View All Features
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features