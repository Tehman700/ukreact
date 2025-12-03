import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import Slider from 'react-slick';

export function SurgeryAdditionalCarousels() {
  const guides = [
    {
      title: "Recovery Timeline",
      description: "Week-by-week guide to what to expect during your recovery period.",
      badge: "7-day guide"
    },
    {
      title: "Nutrition Plan",
      description: "Meal suggestions and nutritional targets for optimal healing.",
      badge: "30-day plan"
    },
    {
      title: "Exercise Protocol",
      description: "Safe, progressive exercises to rebuild strength and mobility.",
      badge: "6-week program"
    }
  ];

  return (
    <div className="space-y-6">
      {guides.map((guide, index) => (
        <Card key={index} className="shadow-sm">
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg">{guide.title}</CardTitle>
              <Badge variant="outline" className="text-xs">{guide.badge}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{guide.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}