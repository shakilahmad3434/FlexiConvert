import { ArrowRight, Download, Star, Users } from 'lucide-react';
import React from 'react'
import { Button } from '../ui/button';
import { FileUploadZone } from '../shared/FileUploadZone';
import Link from 'next/link';

const Hero = () => {

    return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm animate-slide-up">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-muted-foreground">Rated #1 File Converter</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Convert Any
                <br />
                <span className="bg-amber-400 bg-clip-text text-transparent">
                  File Format
                </span>
                <br />
                Instantly
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Transform your files between 500+ formats with lightning speed, 
                military-grade security, and zero quality loss.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">10M+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">500M+ Conversions</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <Link href="/signup" className='group'>
                    <Button size="lg" className="group bg-gradient-to-r from-amber-300 via-10% to-amber-400 hover:opacity-80 cursor-pointer">
                            Start Converting
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
              </Link>
              <Button size="lg" className='cursor-pointer'>
                View Demo
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start pt-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <span className="text-sm text-muted-foreground">Trusted by:</span>
              <div className="flex items-center gap-4">
                <div className="px-3 py-1 bg-black border border-black rounded-md text-sm font-medium">Google</div>
                <div className="px-3 py-1 bg-black border border-black rounded-md text-sm font-medium">Microsoft</div>
                <div className="px-3 py-1 bg-black border border-black rounded-md text-sm font-medium">Adobe</div>
              </div>
            </div>
          </div>

          <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-3xl blur-2xl"></div>
              <img
                src="/images/hero-illustration.jpg"
                alt="File conversion illustration"
                className="relative w-full h-auto rounded-3xl glow-card animate-float"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero