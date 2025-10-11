import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { X, Mail } from 'lucide-react';

export function ResultsNotification() {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // ✅ Don't show notification during PDF capture (Puppeteer detection)
    const isPuppeteer = navigator.webdriver ||
                        /HeadlessChrome/.test(navigator.userAgent) ||
                        window.navigator.webdriver === true;

    if (isPuppeteer) {
      setShowNotification(false);
      console.log("🤖 Puppeteer detected - hiding results notification");
      return;
    }

    // Show notification after a brief delay for better UX
    const timer = setTimeout(() => setShowNotification(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const closeNotification = () => {
    setShowNotification(false);
  };

  if (!showNotification) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <Card className="mx-auto max-w-2xl shadow-lg border-2">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div>
                  <h3 className="mb-2">Your results are ready!</h3>
                  <p className="text-sm text-muted-foreground">
                    A copy has also been sent to your email so you can review them anytime.
                  </p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={closeNotification}
                className="flex-shrink-0"
                aria-label="Close notification"
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