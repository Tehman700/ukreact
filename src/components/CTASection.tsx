import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="tracking-tight text-[21px] font-normal">
            Bespoke care starts here.
          </h2>
          
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Complete our confidential assessment to see how we can support your recovery, longevity, and performance.
          </p>
          
          <div className="pt-4">
            <Button 
              size="lg" 
              onClick={() => window.location.hash = 'assessments'}
              className="px-8"
            >
              Discover Your Personal Plan
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}