import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Shield, Users, Award, Clock } from 'lucide-react';
import { Separator } from '../components/ui/separator';

export function CQCPage() {
  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>CQC Accreditation</CardTitle>
          <CardDescription>
            Learn more about our CQC rating and how we maintain the highest standards of care.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="mt-4">
          <p>Details about the CQC inspection, ratings, and what it means for our patients.</p>
          <Button className="mt-4">Read Full Report</Button>
        </CardContent>
      </Card>
    </div>
  );
}
