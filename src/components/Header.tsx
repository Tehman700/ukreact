import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import { Search, Menu, User, Heart, Palette } from 'lucide-react';
import { SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import lutherHealthLogo from 'figma:asset/33e2bc5ac0e628d4cd978f233c2b6c1f6d83054a.png';

interface HeaderProps {
  onDesignSystemClick?: () => void;
}

export function Header({ onDesignSystemClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Navigation Menu - Left Side */}
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="px-[20px] py-[14px]">
                  <SheetTitle>Navigation Menu</SheetTitle>
                  <SheetDescription>
                    Navigate to different sections of Luther Health website
                  </SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-[70vh] mt-4">
                  <nav className="flex flex-col space-y-4 px-[20px] py-[0px] pr-4">
                    <h4 className="font-medium text-primary">Main Navigation</h4>
                    <a href="#" onClick={() => window.location.hash = 'home'} className="text-sm hover:text-primary transition-colors pl-2">Home</a>
                    <a href="#about" onClick={() => window.location.hash = 'about'} className="text-sm hover:text-primary transition-colors pl-2">About</a>
                    <a href="#services" onClick={() => window.location.hash = 'services'} className="text-sm hover:text-primary transition-colors pl-2">Services</a>
                    <a href="#assessments" onClick={() => window.location.hash = 'assessments'} className="text-sm hover:text-primary transition-colors pl-2">Assessments</a>
                    <a href="#blog" onClick={() => window.location.hash = 'blog'} className="text-sm hover:text-primary transition-colors pl-2">Blog</a>
                    <a href="#contact" onClick={() => window.location.hash = 'contact'} className="text-sm hover:text-primary transition-colors pl-2">Contact</a>

                    <h4 className="font-medium text-primary pt-8">Legal Pages</h4>
                    <a href="#terms" onClick={() => window.location.hash = 'terms'} className="text-sm hover:text-primary transition-colors pl-2">Terms & Conditions</a>
                    <a href="#privacy" onClick={() => window.location.hash = 'privacy'} className="text-sm hover:text-primary transition-colors pl-2">Privacy Policy</a>
                    <a href="#cookies" onClick={() => window.location.hash = 'cookies'} className="text-sm hover:text-primary transition-colors pl-2">Cookie Policy</a>
                    <a href="#complaints" onClick={() => window.location.hash = 'complaints'} className="text-sm hover:text-primary transition-colors pl-2">Complaints Procedure</a>
                  </nav>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo - Center */}
          <div className="flex-1 flex justify-center">
            <a href="#" onClick={() => window.location.hash = ''} className="flex items-center">
              <img
                src={lutherHealthLogo}
                alt="Luther Health"
                className="h-8 w-auto"
                fetchPriority="high"
                loading="eager"
                decoding={"async"}
              />
            </a>
          </div>

          {/* Right Side - Empty for balance */}
          <div className="flex items-center">
            <div className="w-10"></div>
          </div>

        </div>
      </div>
    </header>
  );
}