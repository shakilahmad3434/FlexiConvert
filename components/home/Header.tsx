"use client"
import { FileType, Menu, X } from 'lucide-react';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import Image from 'next/image';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: 'Features', href: '#features' },
        { name: 'Formats', href: '#formats' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'API', href: '#api' },
        { name: 'Support', href: '#support' }
    ];

    return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-lg flex items-center justify-center">
              <Image 
                src="/images/logo.png"
                alt='logo'
                fill
                className='w-full h-full object-cover'
              />
            </div>
            <span className="text-xl font-bold bg-amber-400 bg-clip-text text-transparent">
              ConvertPro
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors hover:scale-105 duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="hover:bg-primary/10 transition-smooth">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-yellow-300 via-10% to-yellow-400 hover:opacity-90 transition-smooth glow-primary">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-smooth"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 glass border-t border-border/50 animate-slide-up">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-border/50 space-y-3">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start hover:bg-primary/10 transition-smooth"
                >
                  Sign In
                </Button>
                <Button className="w-full gradient-primary hover:opacity-90 transition-smooth">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );

}

export default Header