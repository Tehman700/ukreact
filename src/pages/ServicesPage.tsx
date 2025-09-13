import React, { useState } from 'react';
import { ProductGrid } from '../components/ProductGrid';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

interface ServicesPageProps {
  onRequestQuote: (product: any) => void;
  onAddToCart?: (product: any, size?: string, color?: string, quantity?: number) => void;
}

export function ServicesPage({ onRequestQuote, onAddToCart }: ServicesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'hormone', label: 'Hormone Therapy' },
    { id: 'performance', label: 'Performance' },
    { id: 'wellness', label: 'Wellness' },
    { id: 'diagnostics', label: 'Diagnostics' }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-16 md:py-24 py-[56px] px-[14px]">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="tracking-tight">
              Comprehensive Men's Health Services
            </h1>
            <p className="text-muted-foreground">
             Our bespoke service offers deeply personalised, doctor-led care tailored to your goals, medical history, and lifestyle. We go beyond symptom management—combining advanced diagnostics, targeted protocols, and ongoing expert oversight to deliver meaningful, measurable results. Whether you're preparing for surgery, optimising performance, or investing in long-term health, your plan is built around you—with medical precision and concierge-level attention at every step.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}


      {/* Services Grid */}
      <section className="container mx-auto px-4 overflow-hidden">
        <div className="-mx-4 px-[14px] py-[58px] pt-[0px] pr-[14px] pb-[58px] pl-[14px]">
          <ProductGrid onRequestQuote={onRequestQuote} onAddToCart={onAddToCart} />
        </div>
      </section>
    </div>
  );
}