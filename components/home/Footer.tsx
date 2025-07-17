"use client"
import React from 'react'
import { FileType, Github, Twitter, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'API', href: '#api' },
        { name: 'Integrations', href: '#integrations' }
      ]
    },
    {
      title: 'Formats',
      links: [
        { name: 'Image Converter', href: '#image' },
        { name: 'Video Converter', href: '#video' },
        { name: 'Document Converter', href: '#document' },
        { name: 'Audio Converter', href: '#audio' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '#blog' },
        { name: 'Documentation', href: '#docs' },
        { name: 'Tutorials', href: '#tutorials' },
        { name: 'Help Center', href: '#help' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Careers', href: '#careers' },
        { name: 'Privacy Policy', href: '#privacy' },
        { name: 'Terms of Service', href: '#terms' }
      ]
    }
  ];

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
    <footer className="relative border-t border-border/50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center glow-primary">
                  <FileType className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                  ConvertPro
                </span>
              </div>
              
              <p className="text-muted-foreground leading-relaxed max-w-md">
                The world's most advanced file conversion platform. 
                Transform any file format with speed, security, and precision.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-primary/20 transition-all hover:scale-110"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-primary/20 transition-all hover:scale-110"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-primary/20 transition-all hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-primary/20 transition-all hover:scale-110"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="font-semibold text-foreground">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 duration-200 inline-block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-border/50">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-muted-foreground">
                Get the latest features and format support delivered to your inbox.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 min-w-[300px]"
              />
              <Button className="gradient-primary hover:opacity-90 transition-smooth whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground text-center sm:text-left">
            © 2024 ConvertPro. All rights reserved. Built with ❤️ for creators worldwide.
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="hover:bg-primary/10 transition-smooth"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Back to Top
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default Footer