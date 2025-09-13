import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Product } from '../App';
import surgeryImage from 'figma:asset/9ebef07fad65729c6d4470987d218e08b54ab491.png';

interface UpsellPageProps {
  onAddToCart: (product: Product) => void;
}

export function UpsellPage({ onAddToCart }: UpsellPageProps) {
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

  const surgeryConditioningProduct = {
    id: '2',
    name: 'Pre & Post-Surgery Conditioning',
    price: 399.99,
    image: surgeryImage,
    category: 'Surgery Conditioning',
    sizes: ['2 Weeks', '4 Weeks', '8 Weeks'],
    colors: ['Standard', 'Enhanced', 'Premium'],
    description: 'Comprehensive pre-operative conditioning program crafted by doctors to optimize surgical outcomes, reduce complications, and accelerate healing.',
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
                  src={surgeryImage}
                  alt="Active professional enjoying optimal health and vitality"
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
                Your assessment flagged a few areas that could be improved before surgery. If any of those are causing concern, we'd love to help.
              </p>
              <p className="text-lg text-[rgba(76,76,76,1)] leading-relaxed text-left px-[0px] py-[10px]">
                That's why we're offering you a free 14-day trial of our Surgery Conditioning Program — designed to help men like you feel stronger, safer, and more confident heading into and out of their procedure.
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
            product={surgeryConditioningProduct}
            onRequestQuote={handleRequestQuote}
            onAddToCart={onAddToCart}
          />
        </div>
      </div>
    </div>
  );
}