import React from 'react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import heroImage from 'figma:asset/d7e3cd445a3d74be683dd8f119c8e15300b19f39.png';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="container px-4 py-8 sm:py-12 md:py-16 lg:py-24 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Performance Healthcare
              <span className="block text-primary">For Men</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
              Expert-led, data-driven, and designed exclusively for men's health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="w-full sm:w-auto"
                onClick={() => window.location.hash = 'health-concierge-questions'}
              >
                Discover
              </Button>
            </div>
            <div className="flex items-center justify-center lg:justify-start flex-wrap gap-4 sm:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span>Regulated</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                <span>Doctor Led</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                <span>Evidence Based</span>
              </div>
            </div>
          </div>
          
          <div className="relative mt-8 lg:mt-0">
            <div className="aspect-square relative overflow-hidden rounded-2xl max-w-md mx-auto lg:max-w-none">
              <ImageWithFallback
                src={heroImage}
                alt="Successful professional enjoying an active lifestyle"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}