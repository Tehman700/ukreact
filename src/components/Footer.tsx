import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Facebook, Instagram, Twitter, Youtube, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-3 sm:space-y-4 col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="font-medium">Luther Health</h3>
            <p className="text-sm text-muted-foreground">
              Performance healthcare for men who demand excellence. Remote consultations, evidence-based protocols, results-driven care.
            </p>
            <div className="flex space-x-2 sm:space-x-4">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Youtube className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-medium">Services</h3>
            <ul className="space-y-1 sm:space-y-2 text-sm">
              <li><a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Surgery Conditioning Protocol</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Longevity Focus Protocol</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Symptom Control Protocol</a></li>
              <li><a href="#assessments" className="text-muted-foreground hover:text-foreground transition-colors">Health Assessments</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-medium">Company</h3>
            <ul className="space-y-1 sm:space-y-2 text-sm">
              <li><a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#cqc" className="text-muted-foreground hover:text-foreground transition-colors">CQC Registration</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-medium">Legal</h3>
            <ul className="space-y-1 sm:space-y-2 text-sm">
              <li><a href="#privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#cookies" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a></li>
              <li><a href="#complaints" className="text-muted-foreground hover:text-foreground transition-colors">Complaints Procedure</a></li>
            </ul>
          </div>
        </div>

        <Separator className="my-6 sm:my-8" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <div className="text-sm text-muted-foreground text-center sm:text-left">
            © 2024 Luther Health. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}