import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { X, Settings, Cookie } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface CookiePreferences {
  essential: boolean;
  performance: boolean;
  functionality: boolean;
  analytics: boolean;
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always required
    performance: false,
    functionality: false,
    analytics: false,
  });

  // List of page patterns where cookie consent should NOT appear
  const excludedPages = [
    'questions', // Any page with "questions" in the hash
    'information', // Any page with "information" in the hash
    'questionnaire', // Additional common patterns
    'assessment',
    'results',
    'feedback',
    'screener'
  ];

  const isExcludedPage = () => {
    const currentHash = window.location.hash.toLowerCase();
    return excludedPages.some(pattern => currentHash.includes(pattern));
  };

  useEffect(() => {
    // Don't show banner on excluded pages
    if (isExcludedPage()) {
      setShowBanner(false);
      return;
    }

    // Check if user has already made a cookie choice
    const cookieConsent = localStorage.getItem('lutherhealth-cookie-consent');
    if (!cookieConsent) {
      // Delay showing banner slightly for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(cookieConsent);
        setPreferences(savedPreferences);
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
      }
    }
  }, []);

  // Listen for hash changes to hide banner if user navigates to excluded page
  useEffect(() => {
    const handleHashChange = () => {
      if (isExcludedPage()) {
        setShowBanner(false);
        setShowPreferences(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('lutherhealth-cookie-consent', JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      performance: true,
      functionality: true,
      analytics: true,
    };
    savePreferences(allAccepted);
  };

  const acceptEssentialOnly = () => {
    const essentialOnly = {
      essential: true,
      performance: false,
      functionality: false,
      analytics: false,
    };
    savePreferences(essentialOnly);
  };

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: key === 'essential' ? true : value, // Essential cookies always true
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <Card className="mx-auto max-w-4xl shadow-lg border-2">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Cookie className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="mb-2">We use cookies to improve your experience</h3>
                  <p className="text-sm text-muted-foreground">
                    We use cookies to ensure our website operates effectively, provide personalized experiences, and analyze usage to improve our healthcare services. You can customize your preferences or accept all cookies.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={acceptAll} className="flex-1 sm:flex-none">
                    Accept All
                  </Button>
                  <Button variant="outline" onClick={acceptEssentialOnly} className="flex-1 sm:flex-none">
                    Essential Only
                  </Button>
                  
                  <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="flex-1 sm:flex-none gap-2">
                        <Settings className="h-4 w-4" />
                        Customize
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Cookie Preferences</DialogTitle>
                        <DialogDescription>
                          Choose which cookies you'd like to accept. Essential cookies are required for the website to function properly.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-6 py-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="space-y-2">
                              <h4>Essential Cookies</h4>
                              <p className="text-sm text-muted-foreground">
                                Required for basic website functionality including navigation and secure areas.
                              </p>
                            </div>
                            <Switch
                              checked={preferences.essential}
                              disabled={true}
                              aria-label="Essential cookies (always required)"
                            />
                          </div>
                          
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="space-y-2">
                              <h4>Performance Cookies</h4>
                              <p className="text-sm text-muted-foreground">
                                Help us understand how visitors interact with our website to improve performance.
                              </p>
                            </div>
                            <Switch
                              checked={preferences.performance}
                              onCheckedChange={(checked) => updatePreference('performance', checked)}
                              aria-label="Performance cookies"
                            />
                          </div>
                          
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="space-y-2">
                              <h4>Functionality Cookies</h4>
                              <p className="text-sm text-muted-foreground">
                                Remember your preferences and settings for a personalized experience.
                              </p>
                            </div>
                            <Switch
                              checked={preferences.functionality}
                              onCheckedChange={(checked) => updatePreference('functionality', checked)}
                              aria-label="Functionality cookies"
                            />
                          </div>
                          
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="space-y-2">
                              <h4>Analytics Cookies</h4>
                              <p className="text-sm text-muted-foreground">
                                Collect anonymous data to help us analyze usage and improve our services.
                              </p>
                            </div>
                            <Switch
                              checked={preferences.analytics}
                              onCheckedChange={(checked) => updatePreference('analytics', checked)}
                              aria-label="Analytics cookies"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 pt-4">
                        <Button onClick={() => savePreferences(preferences)} className="flex-1">
                          Save Preferences
                        </Button>
                        <Button variant="outline" onClick={() => setShowPreferences(false)} className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBanner(false)}
                className="flex-shrink-0"
                aria-label="Close cookie banner"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Overlay to prevent interaction with page content */}
      <div className="fixed inset-0 bg-black/20 z-40" />
    </>
  );
}