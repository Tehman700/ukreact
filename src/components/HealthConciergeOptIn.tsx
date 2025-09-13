import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface HealthConciergeOptInProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export function HealthConciergeOptIn({ isOpen, onClose, onAccept }: HealthConciergeOptInProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-8">
          <div className="flex justify-end mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="flex-shrink-0"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl">Feel overwhelmed?</h2>
              <p className="text-muted-foreground">
                Most men delay their health needs, simply because they feel lost on where to start.
              </p>
              <p className="text-muted-foreground">
                That's why we've made it simple — <strong>and free</strong> — to figure it out.
              </p>
              <p className="text-muted-foreground">
               Just answer a few quick questions about where you’re at, and we’ll point you toward the right steps, tests, or support for your health journey.
              </p>
              <br></br>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={onAccept} size="lg" className="px-8">
                👉 Find Out What’s Right for You
              </Button>
              <Button variant="ghost" onClick={onClose} size="lg">
                Maybe Later
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}