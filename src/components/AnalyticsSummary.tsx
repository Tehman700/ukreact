import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { BarChart3, Eye, Users, TrendingUp, Activity } from 'lucide-react';
import { getLocalAnalyticsSummary } from '../utils/analyticsTest';

interface AnalyticsSummaryProps {
  compact?: boolean;
  className?: string;
}

export function AnalyticsSummary({ compact = false, className = '' }: AnalyticsSummaryProps) {
  const [summary, setSummary] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadSummary = () => {
      const data = getLocalAnalyticsSummary();
      setSummary(data);
    };

    loadSummary();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadSummary, 30000);
    return () => clearInterval(interval);
  }, []);

  // Only show if there are events to display
  useEffect(() => {
    setIsVisible(summary && summary.totalEvents > 0);
  }, [summary]);

  if (!isVisible) return null;

  if (compact) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <Card className="w-64 bg-background/95 backdrop-blur-sm border shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Analytics Live
              </h4>
              <Badge variant="outline" className="text-xs">
                {summary.totalEvents} events
              </Badge>
            </div>
            
            <div className="space-y-1 text-xs text-muted-foreground">
              {Object.entries(summary.eventsByCategory).slice(0, 3).map(([category, count]: [string, any]) => (
                <div key={category} className="flex justify-between">
                  <span>{category}</span>
                  <span>{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Analytics Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold">{summary.totalEvents}</div>
            <p className="text-sm text-muted-foreground">Total Events</p>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold">
              {Object.keys(summary.eventsByType).length}
            </div>
            <p className="text-sm text-muted-foreground">Event Types</p>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Recent Activity</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {summary.recentEvents.slice(0, 5).map((event: any, index: number) => (
              <div key={index} className="flex items-center justify-between text-xs p-2 bg-muted/30 rounded">
                <span className="font-medium">{event.event_name}</span>
                <span className="text-muted-foreground">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full"
          onClick={() => window.location.hash = 'analytics-test'}
        >
          View Full Analytics
        </Button>
      </CardContent>
    </Card>
  );
}