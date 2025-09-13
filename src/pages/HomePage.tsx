import React from 'react';
import { Hero } from '../components/Hero';
import { LogoCarousel } from '../components/LogoCarousel';
import { ProductGrid } from '../components/ProductGrid';
import { AssessmentsSection } from '../components/AssessmentsSection';

interface HomePageProps {
  onRequestQuote: (product: any) => void;
  onAddToCart?: (product: any, size?: string, color?: string, quantity?: number) => void;
}

export function HomePage({ onRequestQuote, onAddToCart }: HomePageProps) {
  return (
    <>
      <Hero />
      <LogoCarousel />
      <ProductGrid onRequestQuote={onRequestQuote} onAddToCart={onAddToCart} />
      <AssessmentsSection />
    </>
  );
}