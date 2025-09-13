import React, { useState, useMemo, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Shield, Clock, TrendingUp, Star, Play, AlertTriangle, Zap, Heart, Activity, Thermometer, Pill, Battery, Users, Apple, Stethoscope } from 'lucide-react';
import { getVisibleAssessments, Assessment } from '../App';

export function AssessmentsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredAssessments = useMemo(() => {
    return getVisibleAssessments(selectedCategory);
  }, [selectedCategory]);

  // Keyboard navigation for carousel
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = container.offsetWidth * 0.8; // Scroll by ~80% of container width
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h2 
              className="text-2xl mb-2 cursor-pointer hover:text-primary transition-colors"
              onClick={() => window.location.hash = 'assessments'}
            >
              Health Assessments
            </h2>
            <p className="text-muted-foreground">Utilise our clinically engineered assessments to detect risk, direct care, and track outcomes—fast, remote, and precise.</p>
          </div>
        </div>

        {/* Category Filter */}
        <section className="container mx-auto px-4 pb-8">
          <div className="flex justify-center">
            <div className="flex flex-wrap sm:flex-nowrap gap-1 sm:gap-1 bg-muted p-1 rounded-lg overflow-x-auto scrollbar-hide">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
                className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
              >
                All
              </Button>
              <Button
                variant={selectedCategory === 'bundle' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory('bundle')}
                className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
              >
                Bundles
              </Button>
              <Button
                variant={selectedCategory === 'symptoms-control' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory('symptoms-control')}
                className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
              >
                <span className="hidden sm:inline">Symptoms Control</span>
                <span className="sm:hidden">Symptoms</span>
              </Button>
              <Button
                variant={selectedCategory === 'surgery-preparation' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory('surgery-preparation')}
                className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
              >
                <span className="hidden sm:inline">Surgery Preparation</span>
                <span className="sm:hidden">Surgery</span>
              </Button>
              <Button
                variant={selectedCategory === 'longevity' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory('longevity')}
                className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
              >
                Longevity
              </Button>
            </div>
          </div>
        </section>

        {/* Assessments Peek Carousel */}
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
            aria-label="Health assessments carousel. Use arrow keys to scroll."
            onKeyDown={handleKeyDown}
          >
            <div 
              className="flex gap-4 pb-4 pl-4 pr-16"
              role="list"
              aria-label="Health assessments carousel"
            >
              {filteredAssessments.map((assessment, index) => (
                <div
                  key={assessment.id}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] lg:w-[450px] h-auto"
                  style={{ scrollSnapAlign: 'start' }}
                  role="listitem"
                >
                  <Card className="group overflow-hidden transition-shadow hover:shadow-lg h-full flex flex-col">
                    {/* Image Section */}
                    <div 
                      className="relative aspect-[4/3] overflow-hidden"
                      onMouseEnter={() => setIsHovered(assessment.id)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      <ImageWithFallback
                        src={assessment.image}
                        alt={assessment.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      
                      <div className={`absolute inset-0 bg-black/20 transition-opacity ${isHovered === assessment.id ? 'opacity-100' : 'opacity-0'}`} />
                    </div>

                    <CardContent className="p-3 sm:p-4 flex-1 flex flex-col">
                      <div className="space-y-3 sm:space-y-4 flex-1 flex flex-col">
                        {/* Title and Description */}
                        <div className="space-y-2">
                          <h3 className="font-medium line-clamp-2 text-sm sm:text-base">{assessment.name}</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">
                            {assessment.description}
                          </p>
                        </div>
                        
                        {/* FAQ Accordion */}
                        <div className="flex-1 m-[0px]">
                          <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="what-included">
                              <AccordionTrigger className="text-sm text-left">
                                What's included in this assessment?
                              </AccordionTrigger>
                              <AccordionContent className="text-sm text-muted-foreground space-y-3">
                                <ul className="space-y-2">
                                  {assessment.features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                      <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="how-long">
                              <AccordionTrigger className="text-sm text-left">
                                How long does it take to complete?
                              </AccordionTrigger>
                              <AccordionContent className="text-sm text-muted-foreground">
                                Most assessments take just 15–30 minutes to complete online. Your results are usually ready the same day, and we'll send you a detailed report along with personalized recommendations straight to your email.
                              </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="who-for">
                              <AccordionTrigger className="text-sm text-left">
                                Who is this assessment for?
                              </AccordionTrigger>
                              <AccordionContent className="text-sm text-muted-foreground">
                                {assessment.id === '1' && "This assessment is designed for individuals preparing for surgery who wish to optimise their health and recovery outcomes. It is particularly relevant for men over 50 who may be awaiting procedures such as joint replacement or other planned operations. By highlighting key health factors and providing evidence-based recommendations, it supports patients who want to reduce risks, enhance resilience, and improve post-surgical recovery."}
                                {assessment.id === '2' && "Health-conscious men who want to understand their true biological age compared to chronological age. Perfect for those focused on longevity and aging optimization."}
                                {assessment.id === '3' && "Forward-thinking men planning for decades of peak performance. Designed for those who view health as their most valuable asset and want to maximize their healthspan potential."}
                                {assessment.id === '4' && "Men seeking comprehensive health screening to identify hidden risks early. Essential for busy professionals who need rapid, accurate health assessments."}
                                {(assessment.id === '5' || assessment.id === '6' || assessment.id === '7' || assessment.id === '8' || assessment.id === '9') && "Men preparing for surgery who want to optimize their pre-operative health and recovery outcomes."}
                                {(assessment.id === '10' || assessment.id === '11' || assessment.id === '12' || assessment.id === '13' || assessment.id === '14' || assessment.id === '15') && "Men dealing with chronic symptoms who want to better understand and manage their condition for improved quality of life."}
                                {(assessment.id === '16' || assessment.id === '17' || assessment.id === '18' || assessment.id === '19' || assessment.id === '20') && "Health-conscious men focused on longevity, aging optimization, and peak performance throughout their lifespan."}
                                {(assessment.id === '21' || assessment.id === '22' || assessment.id === '23') && "Men seeking comprehensive assessment bundles that provide a complete evaluation across multiple health domains at exceptional value."}
                              </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="how-start">
                              <AccordionTrigger className="text-sm text-left">
                                How do I get started?
                              </AccordionTrigger>
                              <AccordionContent className="text-sm text-muted-foreground">
                                Click 'Start Assessment' to begin your evaluation. For the Surgery Readiness Score, you can try our demo quiz first to see how the assessment works.
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>
                        
                        {/* Price */}
                        <div className="p-[0px]">
                          <p className="font-medium mt-[10px] mr-[0px] mb-[0px] ml-[0px] text-sm sm:text-base">
                            £{assessment.price.toFixed(2)}
                            {/* Show savings for bundle assessments */}
                            {assessment.id === '21' && (
                              <span className="block text-xs sm:text-sm text-muted-foreground mt-1">
                                Save £87.00 vs individual assessments
                              </span>
                            )}
                            {assessment.id === '22' && (
                              <span className="block text-xs sm:text-sm text-muted-foreground mt-1">
                                Save £90.60 vs individual assessments
                              </span>
                            )}
                            {assessment.id === '23' && (
                              <span className="block text-xs sm:text-sm text-muted-foreground mt-1">
                                Save £96.95 vs individual assessments
                              </span>
                            )}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-3 sm:mt-4 space-y-2">
                          <Button 
                            onClick={() => {
                              if (assessment.id === '1') {
                                window.location.hash = 'surgery-readiness-assessment-learn-more';
                              } else if (assessment.id === '2') {
                                window.location.hash = 'biological-age-calculator-learn-more';
                              } else if (assessment.id === '3') {
                                window.location.hash = 'assessments';
                              } else if (assessment.id === '4') {
                                window.location.hash = 'assessments';
                              } else if (assessment.id === '5') {
                                window.location.hash = 'surgery-conditioning-protocol-challenge';
                              } else if (assessment.id === '6') {
                                window.location.hash = 'complication-risk-checker-learn-more';
                              } else if (assessment.id === '7') {
                                window.location.hash = 'recovery-speed-predictor-learn-more';
                              } else if (assessment.id === '8') {
                                window.location.hash = 'anaesthesia-risk-screener-learn-more';
                              } else if (assessment.id === '9') {
                                window.location.hash = 'mobility-strength-score-learn-more';
                              } else if (assessment.id === '10') {
                                window.location.hash = 'symptom-severity-index-learn-more';
                              } else if (assessment.id === '11') {
                                window.location.hash = 'inflammation-risk-score-learn-more';
                              } else if (assessment.id === '12') {
                                window.location.hash = 'medication-burden-calculator-learn-more';
                              } else if (assessment.id === '13') {
                                window.location.hash = 'daily-energy-audit-learn-more';
                              } else if (assessment.id === '14') {
                                window.location.hash = 'lifestyle-limiter-score-learn-more';
                              } else if (assessment.id === '15') {
                                window.location.hash = 'chronic-symptom-protocol-challenge';
                              } else if (assessment.id === '16') {
                                window.location.hash = 'longevity-focus-protocol-challenge';
                              } else if (assessment.id === '17') {
                                window.location.hash = 'cardiometabolic-risk-score-learn-more';
                              } else if (assessment.id === '18') {
                                window.location.hash = 'resilience-index-learn-more';
                              } else if (assessment.id === '19') {
                                window.location.hash = 'nutrition-body-composition-score-learn-more';
                              } else if (assessment.id === '20') {
                                window.location.hash = 'functional-fitness-age-test-learn-more';
                              } else if (assessment.id === '21') {
                                window.location.hash = 'completed-surgery-preparation-bundle-learn-more';
                              } else if (assessment.id === '22') {
                                window.location.hash = 'completed-chronic-symptoms-bundle-learn-more';
                              } else if (assessment.id === '23') {
                                window.location.hash = 'longevity-wellness-bundle-learn-more';
                              } else {
                                window.location.hash = 'assessments';
                              }
                            }}
                            className="w-full text-sm sm:text-base"
                          >
                            <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            Start Assessment
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
              {/* Peek spacer for final card */}
              <div className="w-4 flex-shrink-0" />
            </div>
          </div>
          
          {/* Optional subtle right-edge gradient for "more content" cue */}
          <div className="absolute top-0 right-0 bottom-4 w-8 bg-gradient-to-l from-background/80 to-transparent pointer-events-none" />
        </div>

        {filteredAssessments.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No assessments found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}