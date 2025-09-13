import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Product } from '../App';

interface LongevityFocusProtocolPageProps {
  onAddToCart: (product: Product) => void;
}

export function LongevityFocusProtocolPage({ onAddToCart }: LongevityFocusProtocolPageProps) {
  const handleRequestQuote = (product: any) => {
    // Store the product context for the contact form
    sessionStorage.setItem('requestedService', JSON.stringify({
      name: product.name,
      category: product.category,
      price: product.price
    }));
    
    // Navigate to contact page
    window.location.hash = 'contact';
  };

  const longevityFocusProtocol = {
    id: '16',
    name: 'Longevity Focus Protocol',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ2luZyUyMGZhc3RlciUyMHNpZ25zJTIwbG9uZ2V2aXR5fGVufDF8fHx8MTc1NzM0NjY0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Longevity Optimization',
    sizes: ['4 Weeks', '8 Weeks', '12 Weeks'],
    colors: ['Standard', 'Enhanced', 'Premium'],
    description: 'Comprehensive longevity optimization program designed by longevity experts to slow aging, extend healthspan, and optimize biological function for optimal aging.',
    isTrialOffer: true // Flag to indicate this is the trial version
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container px-4 md:py-24 py-[0px] mx-[0px] m-[0px] pt-[30px] pr-[14px] pb-[0px] pl-[14px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-xl font-medium tracking-tight text-muted-foreground">
                Thanks for Your Feedback.
              </h2>
              <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-[24px]">
                Want to Trial Our Best Program,
                <span className="block text-primary">On Us?</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Your feedback helps us improve our service — so we want to return the favor.
              </p>

            </div>
            
            <div className="relative">
              <div className="aspect-square relative overflow-hidden rounded-2xl">
                <ImageWithFallback
                  src={longevityFocusProtocol.image}
                  alt="Person living with optimal longevity and vitality"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Context Section */}
      <section className="py-16 bg-background px-[0px] pt-[40px] pr-[0px] pb-[20px] pl-[0px]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="space-y-4">
              <p className="text-lg text-[rgba(76,76,76,1)] leading-relaxed text-left">
                Your assessment revealed insights about your biological aging patterns. If any of those findings are concerning or you want to optimize your longevity, we'd love to help.
              </p>
              <p className="text-lg text-[rgba(76,76,76,1)] leading-relaxed text-left px-[0px] py-[10px]">
                That's why we're offering you a free 30-day trial of our Longevity Focus Protocol — designed to help men like you slow aging, extend healthspan, and optimize biological function for peak longevity.
              </p>
              <p className="text-lg text-[rgba(76,76,76,1)] leading-relaxed text-left">
                This is our way of saying thank you for helping us improve — and giving you something of value in return.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-24 px-[14px] py-[50px]">
        <div className="max-w-md mx-auto">
          <ProductCard
            product={longevityFocusProtocol}
            onRequestQuote={handleRequestQuote}
            onAddToCart={onAddToCart}
          />
        </div>
      </div>
    </div>
  );
}