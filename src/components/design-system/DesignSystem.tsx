import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { 
  Palette, 
  Type, 
  Layout, 
  Layers, 
  Eye, 
  Copy,
  Check
} from 'lucide-react';

// Color system component
function ColorSystem() {
  const [copiedColor, setCopiedColor] = useState('');

  const colors = {
    primary: {
      name: 'Primary',
      colors: [
        { name: 'primary', value: 'var(--primary)', hex: '#030213' },
        { name: 'primary-foreground', value: 'var(--primary-foreground)', hex: '#ffffff' }
      ]
    },
    secondary: {
      name: 'Secondary',
      colors: [
        { name: 'secondary', value: 'var(--secondary)', hex: '#f1f2f6' },
        { name: 'secondary-foreground', value: 'var(--secondary-foreground)', hex: '#030213' }
      ]
    },
    accent: {
      name: 'Accent',
      colors: [
        { name: 'accent', value: 'var(--accent)', hex: '#e9ebef' },
        { name: 'accent-foreground', value: 'var(--accent-foreground)', hex: '#030213' }
      ]
    },
    muted: {
      name: 'Muted',
      colors: [
        { name: 'muted', value: 'var(--muted)', hex: '#ececf0' },
        { name: 'muted-foreground', value: 'var(--muted-foreground)', hex: '#717182' }
      ]
    },
    destructive: {
      name: 'Destructive',
      colors: [
        { name: 'destructive', value: 'var(--destructive)', hex: '#d4183d' },
        { name: 'destructive-foreground', value: 'var(--destructive-foreground)', hex: '#ffffff' }
      ]
    }
  };

  const copyColor = (colorName: string, hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(colorName);
    setTimeout(() => setCopiedColor(''), 2000);
  };

  return (
    <div className="space-y-6">
      {Object.entries(colors).map(([key, colorGroup]) => (
        <Card key={key}>
          <CardHeader>
            <CardTitle className="text-lg">{colorGroup.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {colorGroup.colors.map((color) => (
                <div 
                  key={color.name}
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted cursor-pointer transition-colors"
                  onClick={() => copyColor(color.name, color.hex)}
                >
                  <div 
                    className="w-8 h-8 rounded-md border" 
                    style={{ backgroundColor: color.value }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{color.name}</p>
                    <p className="text-sm text-muted-foreground">{color.hex}</p>
                  </div>
                  {copiedColor === color.name ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Typography system component
function TypographySystem() {
  const typographyElements = [
    { element: 'h1', name: 'Heading 1', className: '', description: '2xl, medium weight, 1.5 line-height' },
    { element: 'h2', name: 'Heading 2', className: '', description: 'xl, medium weight, 1.5 line-height' },
    { element: 'h3', name: 'Heading 3', className: '', description: 'lg, medium weight, 1.5 line-height' },
    { element: 'h4', name: 'Heading 4', className: '', description: 'base, medium weight, 1.5 line-height' },
    { element: 'p', name: 'Body Text', className: '', description: 'base, normal weight, 1.5 line-height' },
    { element: 'label', name: 'Label', className: '', description: 'base, medium weight, 1.5 line-height' },
    { element: 'button', name: 'Button Text', className: '', description: 'base, medium weight, 1.5 line-height' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Typography Scale</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {typographyElements.map((item) => (
            <div key={item.element} className="space-y-2">
              <div className="flex items-baseline gap-4">
                {React.createElement(item.element, { 
                  className: item.className,
                  children: item.name 
                })}
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <Separator />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// Component showcase
function ComponentShowcase() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Form Elements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Search products..." />
          <Input type="email" placeholder="Email address" />
          <div className="flex gap-2">
            <Input placeholder="First name" />
            <Input placeholder="Last name" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Spacing system
function SpacingSystem() {
  const spacingValues = [
    { name: 'xs', value: '0.5rem', pixels: '8px' },
    { name: 'sm', value: '0.75rem', pixels: '12px' },
    { name: 'md', value: '1rem', pixels: '16px' },
    { name: 'lg', value: '1.5rem', pixels: '24px' },
    { name: 'xl', value: '2rem', pixels: '32px' },
    { name: '2xl', value: '3rem', pixels: '48px' },
    { name: '3xl', value: '4rem', pixels: '64px' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spacing System</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {spacingValues.map((spacing) => (
          <div key={spacing.name} className="flex items-center gap-4">
            <div className="w-16 text-sm">{spacing.name}</div>
            <div className="w-20 text-sm text-muted-foreground">{spacing.pixels}</div>
            <div 
              className="bg-primary h-4" 
              style={{ width: spacing.value }}
            />
            <code className="text-sm bg-muted px-2 py-1 rounded">{spacing.value}</code>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// Main design system component
export function DesignSystem() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl tracking-tight">StyleHub Design System</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive design system for StyleHub's e-commerce platform. 
              Built with consistency, accessibility, and scalability in mind.
            </p>
          </div>

          {/* Navigation Tabs */}
          <Tabs defaultValue="colors" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="colors" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Colors
              </TabsTrigger>
              <TabsTrigger value="typography" className="flex items-center gap-2">
                <Type className="w-4 h-4" />
                Typography
              </TabsTrigger>
              <TabsTrigger value="components" className="flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Components
              </TabsTrigger>
              <TabsTrigger value="spacing" className="flex items-center gap-2">
                <Layout className="w-4 h-4" />
                Spacing
              </TabsTrigger>
              <TabsTrigger value="guidelines" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Guidelines
              </TabsTrigger>
            </TabsList>

            <TabsContent value="colors" className="mt-8">
              <ColorSystem />
            </TabsContent>

            <TabsContent value="typography" className="mt-8">
              <TypographySystem />
            </TabsContent>

            <TabsContent value="components" className="mt-8">
              <ComponentShowcase />
            </TabsContent>

            <TabsContent value="spacing" className="mt-8">
              <SpacingSystem />
            </TabsContent>

            <TabsContent value="guidelines" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Design Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h3>Brand Principles</h3>
                  <ul>
                    <li><strong>Clean & Modern:</strong> Maintain clean layouts with plenty of whitespace</li>
                    <li><strong>Accessible:</strong> Ensure all components meet WCAG 2.1 AA standards</li>
                    <li><strong>Consistent:</strong> Use design tokens consistently across all components</li>
                    <li><strong>Mobile-First:</strong> Design for mobile first, then enhance for larger screens</li>
                  </ul>

                  <h3>Component Usage</h3>
                  <ul>
                    <li>Always use the provided color variables instead of hardcoded values</li>
                    <li>Follow the established typography hierarchy</li>
                    <li>Use consistent spacing values from the spacing system</li>
                    <li>Maintain proper contrast ratios for accessibility</li>
                  </ul>

                  <h3>Interactive States</h3>
                  <ul>
                    <li><strong>Hover:</strong> Subtle color changes or elevation effects</li>
                    <li><strong>Focus:</strong> Clear focus indicators for keyboard navigation</li>
                    <li><strong>Active:</strong> Visual feedback for pressed/active states</li>
                    <li><strong>Disabled:</strong> Reduced opacity and clear visual indication</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}