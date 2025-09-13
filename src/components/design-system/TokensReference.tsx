import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Copy, Check, Search } from 'lucide-react';

// Design tokens reference for developers
export function TokensReference() {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedToken, setCopiedToken] = useState('');

  const copyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(''), 2000);
  };

  // Color tokens
  const colorTokens = [
    { name: 'Background', token: 'var(--background)', usage: 'Primary background color', category: 'Base' },
    { name: 'Foreground', token: 'var(--foreground)', usage: 'Primary text color', category: 'Base' },
    { name: 'Primary', token: 'var(--primary)', usage: 'Brand primary color', category: 'Brand' },
    { name: 'Primary Foreground', token: 'var(--primary-foreground)', usage: 'Text on primary backgrounds', category: 'Brand' },
    { name: 'Secondary', token: 'var(--secondary)', usage: 'Secondary backgrounds', category: 'Brand' },
    { name: 'Secondary Foreground', token: 'var(--secondary-foreground)', usage: 'Text on secondary backgrounds', category: 'Brand' },
    { name: 'Muted', token: 'var(--muted)', usage: 'Subtle backgrounds', category: 'Neutral' },
    { name: 'Muted Foreground', token: 'var(--muted-foreground)', usage: 'Subtle text', category: 'Neutral' },
    { name: 'Accent', token: 'var(--accent)', usage: 'Accent backgrounds', category: 'Accent' },
    { name: 'Accent Foreground', token: 'var(--accent-foreground)', usage: 'Text on accent backgrounds', category: 'Accent' },
    { name: 'Destructive', token: 'var(--destructive)', usage: 'Error/danger color', category: 'Feedback' },
    { name: 'Destructive Foreground', token: 'var(--destructive-foreground)', usage: 'Text on destructive backgrounds', category: 'Feedback' },
    { name: 'Border', token: 'var(--border)', usage: 'Border color', category: 'Border' },
    { name: 'Input', token: 'var(--input)', usage: 'Input border color', category: 'Form' },
    { name: 'Input Background', token: 'var(--input-background)', usage: 'Input background color', category: 'Form' },
    { name: 'Ring', token: 'var(--ring)', usage: 'Focus ring color', category: 'Interactive' }
  ];

  // Typography tokens
  const typographyTokens = [
    { name: 'Font Weight Medium', token: 'var(--font-weight-medium)', usage: 'Medium weight text (500)', category: 'Weight' },
    { name: 'Font Weight Normal', token: 'var(--font-weight-normal)', usage: 'Normal weight text (400)', category: 'Weight' }
  ];

  // Layout tokens
  const layoutTokens = [
    { name: 'Radius Small', token: 'var(--radius-sm)', usage: 'Small border radius', category: 'Radius' },
    { name: 'Radius Medium', token: 'var(--radius-md)', usage: 'Medium border radius', category: 'Radius' },
    { name: 'Radius Large', token: 'var(--radius-lg)', usage: 'Large border radius', category: 'Radius' },
    { name: 'Radius Extra Large', token: 'var(--radius-xl)', usage: 'Extra large border radius', category: 'Radius' }
  ];

  // Chart tokens
  const chartTokens = [
    { name: 'Chart 1', token: 'var(--chart-1)', usage: 'Primary chart color', category: 'Charts' },
    { name: 'Chart 2', token: 'var(--chart-2)', usage: 'Secondary chart color', category: 'Charts' },
    { name: 'Chart 3', token: 'var(--chart-3)', usage: 'Tertiary chart color', category: 'Charts' },
    { name: 'Chart 4', token: 'var(--chart-4)', usage: 'Quaternary chart color', category: 'Charts' },
    { name: 'Chart 5', token: 'var(--chart-5)', usage: 'Quinary chart color', category: 'Charts' }
  ];

  const allTokens = [...colorTokens, ...typographyTokens, ...layoutTokens, ...chartTokens];

  const filteredTokens = allTokens.filter(token =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.usage.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const TokenTable = ({ tokens }: { tokens: typeof allTokens }) => (
    <div className="space-y-2">
      {tokens.map((token) => (
        <Card key={token.token} className="hover:bg-muted/50 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium">{token.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {token.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{token.usage}</p>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {token.token}
                </code>
              </div>
              <div className="flex items-center gap-2">
                {token.category === 'Base' || token.category === 'Brand' || token.category === 'Neutral' || token.category === 'Accent' || token.category === 'Feedback' ? (
                  <div 
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: token.token }}
                  />
                ) : null}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => copyToken(token.token)}
                >
                  {copiedToken === token.token ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search design tokens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tokens */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Tokens</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">All Design Tokens</h3>
              <Badge variant="secondary">{filteredTokens.length} tokens</Badge>
            </div>
            <TokenTable tokens={filteredTokens} />
          </div>
        </TabsContent>

        <TabsContent value="colors" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Color Tokens</h3>
              <Badge variant="secondary">{colorTokens.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase())).length} tokens</Badge>
            </div>
            <TokenTable tokens={colorTokens.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()))} />
          </div>
        </TabsContent>

        <TabsContent value="typography" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Typography Tokens</h3>
              <Badge variant="secondary">{typographyTokens.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase())).length} tokens</Badge>
            </div>
            <TokenTable tokens={typographyTokens.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()))} />
          </div>
        </TabsContent>

        <TabsContent value="layout" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Layout Tokens</h3>
              <Badge variant="secondary">{layoutTokens.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase())).length} tokens</Badge>
            </div>
            <TokenTable tokens={layoutTokens.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()))} />
          </div>
        </TabsContent>

        <TabsContent value="charts" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Chart Tokens</h3>
              <Badge variant="secondary">{chartTokens.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase())).length} tokens</Badge>
            </div>
            <TokenTable tokens={chartTokens.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()))} />
          </div>
        </TabsContent>
      </Tabs>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">CSS Custom Properties</h4>
            <div className="p-4 bg-muted rounded-lg">
              <code className="text-sm">
                {`.my-component {
  background-color: var(--background);
  color: var(--foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}`}
              </code>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Tailwind CSS Classes</h4>
            <div className="p-4 bg-muted rounded-lg">
              <code className="text-sm">
                {`<div className="bg-background text-foreground border border-border rounded-md">
  <h2 className="text-primary">Styled with design tokens</h2>
</div>`}
              </code>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Component Styling</h4>
            <div className="p-4 bg-muted rounded-lg">
              <code className="text-sm">
                {`const StyledButton = styled.button\`
  background-color: var(--primary);
  color: var(--primary-foreground);
  border-radius: var(--radius-md);
  
  &:hover {
    background-color: var(--primary-hover);
  }
\`;`}
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}