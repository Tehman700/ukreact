import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Cookie, Settings, BarChart3, Zap } from 'lucide-react';

interface CookiePreferences {
  essential: boolean;
  performance: boolean;
  functionality: boolean;
  analytics: boolean;
}

export function CookiePage() {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    performance: false,
    functionality: false,
    analytics: false,
  });

  useEffect(() => {
    // Load saved preferences
    const savedPreferences = localStorage.getItem('lutherhealth-cookie-consent');
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
      }
    }
  }, []);

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    const newPreferences = {
      ...preferences,
      [key]: key === 'essential' ? true : value, // Essential cookies always true
    };
    setPreferences(newPreferences);
    localStorage.setItem('lutherhealth-cookie-consent', JSON.stringify(newPreferences));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground">
            This Cookie Policy explains how Luther Health ("we," "us," "our") uses cookies and similar technologies on our website. By using our website, you agree to the use of cookies as described in this policy. You can manage your cookie preferences through our website at any time.
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Cookie className="h-5 w-5 text-primary" />
                <h2>What Are Cookies?</h2>
              </div>
              <p>Cookies are small text files stored on your device (computer, tablet, or mobile) when you visit a website. Cookies enable websites to recognize your device, store your preferences, and provide a better browsing experience.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-6">Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Zap className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="mb-2">Essential Cookies</h3>
                    <p>These cookies are necessary for our website to function correctly. They allow you to navigate the site and access secure areas. Without these cookies, certain parts of the site may not function.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <BarChart3 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="mb-2">Performance Cookies</h3>
                    <p>These cookies help us understand how visitors interact with our site by providing information on areas such as the number of visitors and pages viewed. This data helps us improve the website's performance and user experience.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Settings className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="mb-2">Functionality Cookies</h3>
                    <p>These cookies remember your choices and preferences, such as language settings, to provide a more personalized experience.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <BarChart3 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="mb-2">Analytics and Tracking Cookies</h3>
                    <p>These cookies collect anonymous data to help us analyze web traffic and usage patterns. We use third-party analytics tools to track and report on our website's performance and improve our services.</p>
                    <p className="mt-2 text-sm text-muted-foreground">No personally identifiable information is collected by these cookies.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4">How We Use Cookies</h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>Ensure the website operates effectively and securely.</li>
                <li>Provide a personalized experience by remembering your preferences.</li>
                <li>Analyse website performance to improve user experience.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4">Third-Party Cookies</h2>
              <p>We may allow third-party service providers, such as Google Analytics, to set cookies on our website. These third parties use cookies to analyse website usage on our behalf. We have no control over these cookies and recommend reviewing their privacy policies to understand their data collection and processing practices.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4">Your Cookie Preferences</h2>
              <p className="mb-4">You can control and manage cookies in various ways:</p>
              <div className="space-y-3">
                <p><strong>Cookie Management on Our Website:</strong> You can set your preferences through our cookie consent tool, allowing you to enable or disable specific types of cookies.</p>
                <p><strong>Browser Settings:</strong> Most browsers automatically accept cookies, but you can modify your settings to reject cookies or alert you when a cookie is being set. Please note that disabling certain cookies may affect website functionality.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4">Changes to This Cookie Policy</h2>
              <p>We may update this Cookie Policy periodically. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy regularly for any updates.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-6">Manage Your Cookie Preferences</h2>
              <p className="mb-4">You can update your cookie preferences at any time using the controls below:</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4>Essential Cookies</h4>
                    <p className="text-sm text-muted-foreground">Always required for basic functionality</p>
                  </div>
                  <Switch
                    checked={preferences.essential}
                    disabled={true}
                    aria-label="Essential cookies (always required)"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4>Performance Cookies</h4>
                    <p className="text-sm text-muted-foreground">Help improve website performance</p>
                  </div>
                  <Switch
                    checked={preferences.performance}
                    onCheckedChange={(checked) => updatePreference('performance', checked)}
                    aria-label="Performance cookies"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4>Functionality Cookies</h4>
                    <p className="text-sm text-muted-foreground">Remember your preferences</p>
                  </div>
                  <Switch
                    checked={preferences.functionality}
                    onCheckedChange={(checked) => updatePreference('functionality', checked)}
                    aria-label="Functionality cookies"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4>Analytics Cookies</h4>
                    <p className="text-sm text-muted-foreground">Anonymous usage analytics</p>
                  </div>
                  <Switch
                    checked={preferences.analytics}
                    onCheckedChange={(checked) => updatePreference('analytics', checked)}
                    aria-label="Analytics cookies"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4">Contact Us</h2>
              <p>For any questions or concerns about our use of cookies, please contact us at:</p>
              <p className="mt-2"><strong>Email:</strong> admin@luther.health</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}