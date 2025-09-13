import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Product } from '../App';

interface ChronicSymptomProtocolPageProps {
  onAddToCart: (product: Product) => void;
}

export function ChronicSymptomProtocolPage({ onAddToCart }: ChronicSymptomProtocolPageProps) {
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

  const chronicSymptomProtocol = {
    id: '15',
    name: 'Chronic Symptom Management Protocol',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1740479050129-7fef21254518?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJvbmljJTIwaGVhbHRoJTIwcHJvdG9jb2wlMjBjaGFsbGVuZ2V8ZW58MXx8fHwxNzU3MzQ2NjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Chronic Symptom Management',
    sizes: ['3 Weeks', '6 Weeks', '12 Weeks'],
    colors: ['Standard', 'Enhanced', 'Premium'],
    description: 'Comprehensive chronic symptom management program designed by healthcare professionals to optimize daily living, reduce symptom burden, and improve quality of life.',
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
                  src={chronicSymptomProtocol.image}
                  alt="Person managing chronic symptoms with confidence and vitality"
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
                Your assessment identified several areas where chronic symptoms may be impacting your daily life. If any of those are causing concern, we'd love to help.
              </p>
              <p className="text-lg text-[rgba(76,76,76,1)] leading-relaxed text-left px-[0px] py-[10px]">
                That's why we're offering you a free 21-day trial of our Chronic Symptom Management Protocol — designed to help men like you reduce symptom burden, optimize energy, and reclaim control over daily living.
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
            product={chronicSymptomProtocol}
            onRequestQuote={handleRequestQuote}
            onAddToCart={onAddToCart}
          />
        </div>
      </div>
    </div>
  );
}