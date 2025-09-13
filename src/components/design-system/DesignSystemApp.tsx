import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { ArrowLeft, Palette, FileText, Code2, Eye, Layers, Layout } from 'lucide-react';
import { DesignSystem } from './DesignSystem';
import { StyleGuide } from './StyleGuide';
import { TokensReference } from './TokensReference';

interface DesignSystemAppProps {
  onBack: () => void;
}

export function DesignSystemApp({ onBack }: DesignSystemAppProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Luther Health Design System</h1>
              <p className="text-sm text-muted-foreground">
                Complete design system documentation and guidelines
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Badge variant="outline">v1.0.0</Badge>
              <Badge variant="secondary">Beta</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="foundations" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Foundations
            </TabsTrigger>
            <TabsTrigger value="components" className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Components
            </TabsTrigger>
            <TabsTrigger value="patterns" className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Patterns
            </TabsTrigger>
            <TabsTrigger value="tokens" className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Tokens
            </TabsTrigger>
            <TabsTrigger value="guidelines" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Guidelines
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-semibold">Welcome to Luther Health Design System</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  A comprehensive design system built for Luther Health's healthcare services platform. 
                  This system ensures consistency, accessibility, and scalability across all touchpoints.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Palette className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Design Foundations</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Color palettes, typography scales, spacing systems, and other foundational elements.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setActiveTab('foundations')}
                  >
                    Explore Foundations
                  </Button>
                </div>

                <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Layers className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Components</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Reusable UI components with examples, usage guidelines, and best practices.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setActiveTab('components')}
                  >
                    Browse Components
                  </Button>
                </div>

                <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Layout className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Design Patterns</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Common design patterns, layouts, and interaction behaviors used throughout the app.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setActiveTab('patterns')}
                  >
                    View Patterns
                  </Button>
                </div>

                <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Code2 className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Design Tokens</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Complete reference of design tokens with usage examples and implementation details.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setActiveTab('tokens')}
                  >
                    Reference Tokens
                  </Button>
                </div>

                <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Guidelines</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Design principles, accessibility standards, and implementation guidelines.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setActiveTab('guidelines')}
                  >
                    Read Guidelines
                  </Button>
                </div>

                <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Eye className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Live Examples</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    See the design system in action with interactive examples and code snippets.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onBack}
                  >
                    View Live App
                  </Button>
                </div>
              </div>

              <div className="border-t pt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4">Getting Started</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                          1
                        </div>
                        <div>
                          <p className="font-medium">Import Design Tokens</p>
                          <p className="text-sm text-muted-foreground">Include the CSS variables in your project</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                          2
                        </div>
                        <div>
                          <p className="font-medium">Use Components</p>
                          <p className="text-sm text-muted-foreground">Copy components from the component library</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                          3
                        </div>
                        <div>
                          <p className="font-medium">Follow Guidelines</p>
                          <p className="text-sm text-muted-foreground">Adhere to the design principles and patterns</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Key Features</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Fully responsive design system</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">WCAG 2.1 AA accessibility compliant</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Dark mode support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Modular and scalable architecture</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Tailwind CSS integration</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="foundations">
            <DesignSystem />
          </TabsContent>

          <TabsContent value="components">
            <DesignSystem />
          </TabsContent>

          <TabsContent value="patterns">
            <StyleGuide />
          </TabsContent>

          <TabsContent value="tokens">
            <TokensReference />
          </TabsContent>

          <TabsContent value="guidelines">
            <div className="prose prose-sm max-w-4xl mx-auto">
              <h2>Design Guidelines</h2>
              
              <h3>Design Principles</h3>
              <ul>
                <li><strong>Simplicity:</strong> Keep designs clean and focused on the user's goals</li>
                <li><strong>Consistency:</strong> Use standardized patterns and components across the platform</li>
                <li><strong>Accessibility:</strong> Ensure all users can access and use the platform effectively</li>
                <li><strong>Performance:</strong> Optimize for speed and efficiency in all interactions</li>
                <li><strong>Scalability:</strong> Design systems that can grow with the business needs</li>
              </ul>

              <h3>Accessibility Standards</h3>
              <ul>
                <li>All interactive elements must have proper focus indicators</li>
                <li>Color combinations must meet WCAG 2.1 AA contrast requirements</li>
                <li>All images must have meaningful alt text</li>
                <li>Forms must have proper labels and error messages</li>
                <li>Content must be navigable using keyboard only</li>
              </ul>

              <h3>Implementation Guidelines</h3>
              <ul>
                <li>Always use design tokens instead of hardcoded values</li>
                <li>Follow the established component hierarchy</li>
                <li>Test components in both light and dark modes</li>
                <li>Ensure responsive behavior across all screen sizes</li>
                <li>Document any custom modifications to base components</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}