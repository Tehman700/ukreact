import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

// Reusable design patterns for StyleHub
export function StyleGuide() {
  return (
    <div className="space-y-8">
      {/* Product Card Patterns */}
      <Card>
        <CardHeader>
          <CardTitle>Product Card Patterns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="mb-4">Standard Product Card</h4>
            <div className="p-4 border rounded-lg bg-muted/50">
              <code className="text-sm">
                {`<Card className="group overflow-hidden transition-shadow hover:shadow-lg">
  <div className="relative aspect-square overflow-hidden">
    <img className="w-full h-full object-cover transition-transform group-hover:scale-105" />
    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100" />
  </div>
  <CardContent className="p-4">
    <h3 className="font-medium line-clamp-2">\${product.name}</h3>
    <p className="text-lg font-semibold">\$\${product.price}</p>
  </CardContent>
</Card>`}
              </code>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="mb-4">Interactive States</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="font-medium mb-2">Default State</p>
                <div className="w-full h-32 bg-muted rounded border"></div>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="font-medium mb-2">Hover State</p>
                <div className="w-full h-32 bg-muted rounded border shadow-lg scale-[1.02]"></div>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="font-medium mb-2">Loading State</p>
                <div className="w-full h-32 bg-muted rounded border animate-pulse"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layout Patterns */}
      <Card>
        <CardHeader>
          <CardTitle>Layout Patterns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="mb-4">Container Sizes</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <Badge variant="outline">container</Badge>
                <code>max-width: 1200px; margin: 0 auto; padding: 0 1rem;</code>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline">container-sm</Badge>
                <code>max-width: 640px; margin: 0 auto; padding: 0 1rem;</code>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline">container-md</Badge>
                <code>max-width: 768px; margin: 0 auto; padding: 0 1rem;</code>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="mb-4">Grid Patterns</h4>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">Product Grid (Responsive)</p>
                <div className="p-4 border rounded-lg bg-muted/50">
                  <code className="text-sm">
                    grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                  </code>
                </div>
              </div>
              <div>
                <p className="font-medium mb-2">Feature Grid</p>
                <div className="p-4 border rounded-lg bg-muted/50">
                  <code className="text-sm">
                    grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                  </code>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Animation Patterns */}
      <Card>
        <CardHeader>
          <CardTitle>Animation & Transitions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="mb-4">Common Transitions</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition-shadow">
                <span>Hover Shadow</span>
                <code className="text-sm">transition-shadow hover:shadow-lg</code>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition-colors">
                <span>Background Change</span>
                <code className="text-sm">transition-colors hover:bg-muted</code>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span>Scale Transform</span>
                <code className="text-sm">transition-transform hover:scale-105</code>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="mb-4">Loading States</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium mb-2">Skeleton Loading</p>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
                </div>
              </div>
              <div>
                <p className="font-medium mb-2">Spinner</p>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <code className="text-sm">animate-spin</code>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Responsive Patterns */}
      <Card>
        <CardHeader>
          <CardTitle>Responsive Design Patterns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="mb-4">Breakpoint Strategy</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <Badge>sm</Badge>
                  <span>640px+</span>
                  <span className="text-muted-foreground">Mobile landscape</span>
                </div>
                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <Badge>md</Badge>
                  <span>768px+</span>
                  <span className="text-muted-foreground">Tablet</span>
                </div>
                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <Badge>lg</Badge>
                  <span>1024px+</span>
                  <span className="text-muted-foreground">Desktop</span>
                </div>
                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <Badge>xl</Badge>
                  <span>1280px+</span>
                  <span className="text-muted-foreground">Large desktop</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="mb-4">Common Responsive Patterns</h4>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <p className="font-medium mb-1">Hide on mobile</p>
                  <code className="text-sm">hidden md:block</code>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium mb-1">Stack on mobile</p>
                  <code className="text-sm">flex-col md:flex-row</code>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium mb-1">Responsive text</p>
                  <code className="text-sm">text-sm md:text-base lg:text-lg</code>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}