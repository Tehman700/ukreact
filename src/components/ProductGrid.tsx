import React, { useState, useMemo, useRef } from 'react';
import { ProductCard } from './ProductCard';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Product } from '../App';
import symptomControlImage from 'figma:asset/615fca6b72dfa376143404e888b35e257c7263ec.png';
import longevityImage from 'figma:asset/5d661bdb774a1fa903a7a2c585f84549da7f7440.png';
import surgeryImage from 'figma:asset/31b7fd69d3019f0b108fe61e9645c1e3d7f9f3af.png';

interface ProductGridProps {
  onRequestQuote: (product: Product) => void;
  onAddToCart?: (product: Product, size?: string, color?: string, quantity?: number) => void;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: '2',
    name: 'Pre & Post-Surgery Conditioning',
    price: 399.99,
    image: surgeryImage,
    category: 'Surgery Conditioning',
    sizes: ['2 Weeks', '4 Weeks', '8 Weeks'],
    colors: ['Standard', 'Enhanced', 'Premium'],
    description: 'Comprehensive pre-operative conditioning and post-surgical recovery program to optimize surgical outcomes, reduce complications, and accelerate healing.'
  },
  {
    id: '3',
    name: 'Longevity & Anti-Aging Protocol',
    price: 549.99,
    image: longevityImage,
    category: 'Longevity Focus',
    sizes: ['3 Months', '6 Months', '12 Months'],
    colors: ['Foundation', 'Advanced', 'Executive'],
    description: 'Advanced longevity protocol combining hormone optimization, cardiovascular health, cognitive enhancement, and comprehensive anti-aging strategies for optimal healthspan.'
  },
  {
    id: '1',
    name: 'Comprehensive Symptom Control Program',
    price: 299.99,
    image: symptomControlImage,
    category: 'Symptom Control',
    sizes: ['3 Months', '6 Months', '12 Months'],
    colors: ['Standard', 'Premium', 'VIP'],
    description: 'Expert-led chronic symptom management program combining medication optimization, lifestyle coaching, and ongoing monitoring for conditions like pain, inflammation, and metabolic disorders.'
  }
];

const CATEGORIES = ['All', 'Surgery Conditioning', 'Longevity Focus', 'Symptom Control'];

export function ProductGrid({ onRequestQuote, onAddToCart }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = selectedCategory === 'All' 
      ? MOCK_PRODUCTS 
      : MOCK_PRODUCTS.filter(product => product.category === selectedCategory);

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'default':
        default:
          return 0; // Preserve array order
      }
    });
  }, [selectedCategory, sortBy]);

  // Keyboard navigation for carousel
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const cardWidth = container.scrollWidth / filteredAndSortedProducts.length;
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      container.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };
{/* Header Section */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="tracking-tight">
              Health Assessments
            </h1>
            <p className="text-muted-foreground">
             Our health assessments are designed by medical experts using real clinical data and the latest research to spot risks early, personalise your care, and give you a clear, actionable plan—all in ~ 10 minutes, fully remote, and built to help you stay ahead of your health.
            </p>
          </div>
        </div>
      </section>
  return (
    <section className="py-16 bg-background pt-[0px] pr-[0px] pb-[56px] pl-[0px]">
      <div className="container mx-auto px-4 pt-[58px] pr-[14px] pb-[0px] pl-[14px]">
<div className="flex flex-col justify-center items-center mb-8 gap-4">
          <div className="text-center">
            <h2
              className="text-2xl mb-2 cursor-pointer hover:text-primary transition-colors"
              onClick={() => window.location.hash = 'services'}
            >
              Our Services
            </h2>
            <p className="text-muted-foreground">Discover our selection of premium services</p>
          </div>
        </div>

        {/* Category Filter */}
        <section className="container mx-auto px-4 pb-8">
          <div className="flex justify-center">
            <div className="flex flex-wrap sm:flex-nowrap gap-1 sm:gap-1 bg-muted p-1 rounded-lg overflow-x-auto scrollbar-hide">
              {CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
                >
                  {category === 'Surgery Conditioning' ? (
                    <>
                      <span className="hidden sm:inline">Surgery</span>
                      <span className="sm:hidden">Surgery</span>
                    </>
                  ) : category === 'Longevity Focus' ? (
                    <>
                      <span className="hidden sm:inline">Conditioning</span>
                      <span className="sm:hidden">Longevity</span>
                    </>
                  ) : category === 'Symptom Control' ? (
                    <>
                      <span className="hidden sm:inline">Longevity</span>
                      <span className="sm:hidden">Symptoms</span>
                    </>
                  ) : (
                    category
                  )}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Peek Carousel */}
        <div className="relative">
          {/* Carousel Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto overscroll-x-contain scrollbar-hide focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory'
            }}
            tabIndex={0}
            role="region"
            aria-label="Healthcare services carousel. Use arrow keys to scroll."
            onKeyDown={handleKeyDown}
          >
            <div
              className="flex gap-4 pb-4 pl-4 pr-16"
              role="list"
              aria-label="Healthcare services carousel"
            >
              {filteredAndSortedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-[calc(100vw-6rem)] sm:w-[calc(90vw-4rem)] md:w-[400px] lg:w-[450px] h-auto"
                  style={{ scrollSnapAlign: 'start' }}
                  role="listitem"
                >
                  <ProductCard
                    product={product}
                    onRequestQuote={onRequestQuote}
                    onAddToCart={onAddToCart}
                  />
                </div>
              ))}
              {/* Peek spacer for final card */}
              <div className="w-4 flex-shrink-0" />
            </div>
          </div>

          {/* Optional subtle right-edge gradient for "more content" cue */}
          <div className="absolute top-0 right-0 bottom-4 w-8 bg-gradient-to-l from-background/80 to-transparent pointer-events-none" />
        </div>

        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No services found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}