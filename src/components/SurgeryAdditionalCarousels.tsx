import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import Slider from 'react-slick';

export function SurgeryAdditionalCarousels() {
  const guides = [
    {
      title: "14 Pre-Op Mistakes",
      description: "The most common errors men 60+ make - and how to avoid each with simple, evidence-backed fixes. Lower risk, pain, and delays.",
      badge: "30-day plan"
    },
    {
      title: "First 7 Days",
      description: "A day-by-day home plan for week one:meds, walking sleep,bowel care, and red flags. Regain independence faster.",
      badge: "30-day plan"
    },
    {
      title: "Protein Playbook",
      description: "Exactly how much protein you need and when to eat it for wound healing. Includes 14-day menu, shopping list and protein guide.",
      badge: "6-week program"
    },
    {
      title: "10-Minute Prehab",
      description: "Five targeted 2-minute drills for strength, balance, and breathing. Do at home, no equipment. Build resilience before the operation.",
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