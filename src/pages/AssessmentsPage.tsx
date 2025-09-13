import React, { useState, useRef } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ShoppingBasket } from '../components/ShoppingBasket';
import { Play, Star, Clock, Shield, TrendingUp, AlertTriangle, Zap, Heart, Activity, Thermometer, Pill, Battery, Users, Apple, Stethoscope } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { getVisibleAssessments, Assessment, BasketItem } from '../App';
import { useSearchAnalytics, useAnalytics } from '../hooks/useAnalytics';

export function AssessmentsPage() {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Initialize analytics for search and filtering
  const { trackFilterApplied } = useSearchAnalytics();
  const { trackAssessmentStart, trackAddToBasket } = useAnalytics();

  const handleUpgradeToBundle = (bundleId: string) => {
    // Add upgrade to bundle logic here
    console.log('Upgrading to bundle:', bundleId);
    // This would need to integrate with the main App's bundle upgrade logic
  };

  const addToBasket = (assessment: Assessment) => {
    setBasketItems(prev => {
      const existingItem = prev.find(item => item.assessment.id === assessment.id);
      if (existingItem) {
        // Item already exists, don't add duplicate
        return prev;
      }
      
      // Track add to basket
      trackAddToBasket(assessment.id, assessment.name, assessment.price);
      
      return [...prev, { assessment, quantity: 1 }];
    });
    setIsBasketOpen(true);
  };

  const removeFromBasket = (assessmentId: string) => {
    setBasketItems(prev => prev.filter(item => item.assessment.id !== assessmentId));
  };

  const updateQuantity = (assessmentId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromBasket(assessmentId);
      return;
    }
    setBasketItems(prev =>
      prev.map(item =>
        item.assessment.id === assessmentId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return basketItems.reduce((total, item) => total + (item.assessment.price * item.quantity), 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = container.offsetWidth * 0.8;
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Filter assessments based on active filter
  const filteredAssessments = () => {
    return getVisibleAssessments(activeFilter);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-16 md:py-24 mt-[0px] mr-[0px] mb-[20px] ml-[0px]">
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

      {/* Filter Section */}
      <section className="container mx-auto px-4 sm:pb-8 px-[14px] py-[21px]">
        <div className="flex justify-center">
          <div className="flex flex-wrap sm:flex-nowrap gap-1 sm:gap-1 bg-muted p-1 rounded-lg overflow-x-auto scrollbar-hide w-full max-w-2xl">
            <Button
              variant={activeFilter === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => {
                setActiveFilter('all');
                trackFilterApplied('category', 'all', getVisibleAssessments('all').length);
              }}
              className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm whitespace-nowrap flex-1 sm:flex-initial"
            >
              All
            </Button>
            <Button
              variant={activeFilter === 'bundle' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => {
                setActiveFilter('bundle');
                trackFilterApplied('category', 'bundle', getVisibleAssessments('bundle').length);
              }}
              className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm whitespace-nowrap flex-1 sm:flex-initial"
            >
              Bundles
            </Button>
            <Button
              variant={activeFilter === 'symptoms-control' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => {
                setActiveFilter('symptoms-control');
                trackFilterApplied('category', 'symptoms-control', getVisibleAssessments('symptoms-control').length);
              }}
              className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm whitespace-nowrap flex-1 sm:flex-initial"
            >
              <span className="hidden sm:inline">Symptoms Control</span>
              <span className="sm:hidden">Symptoms</span>
            </Button>
            <Button
              variant={activeFilter === 'surgery-preparation' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => {
                setActiveFilter('surgery-preparation');
                trackFilterApplied('category', 'surgery-preparation', getVisibleAssessments('surgery-preparation').length);
              }}
              className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm whitespace-nowrap flex-1 sm:flex-initial"
            >
              <span className="hidden sm:inline">Surgery Preparation</span>
              <span className="sm:hidden">Surgery</span>
            </Button>
            <Button
              variant={activeFilter === 'longevity' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => {
                setActiveFilter('longevity');
                trackFilterApplied('category', 'longevity', getVisibleAssessments('longevity').length);
              }}
              className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm whitespace-nowrap flex-1 sm:flex-initial"
            >
              Longevity
            </Button>
          </div>
        </div>
      </section>

      {/* Assessments Peek Carousel */}
      <section className="container mx-auto px-4 pb-16">
        <div className="relative">
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
              className="flex gap-6 pb-4 pl-4 pr-16"
              role="list"
              aria-label="Health assessments carousel"
            >
              {filteredAssessments().map((assessment, index) => (
                <div
                  key={assessment.id}
                  className="flex-shrink-0 w-[calc(100vw-6rem)] sm:w-[calc(90vw-4rem)] md:w-[400px] lg:w-[450px] h-auto"
                  style={{ scrollSnapAlign: 'start' }}
                  role="listitem"
                >
                  <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col bg-[rgba(251,251,251,1)]">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <ImageWithFallback
                        src={assessment.image}
                        alt={assessment.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="space-y-4 flex-1 flex flex-col">
                        <div className="space-y-2">
                          <h3 className="font-medium">{assessment.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {assessment.description}
                          </p>
                        </div>

                        <div className="flex-1">
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

                        <div className="pt-4 mt-auto">
                          <p className="font-medium">
                            £{assessment.price.toFixed(2)}
                            {/* Show savings for bundle assessments */}
                            {assessment.id === '21' && (
                              <span className="block text-sm text-muted-foreground mt-1">
                                Save £87.00 vs individual assessments
                              </span>
                            )}
                            {assessment.id === '22' && (
                              <span className="block text-sm text-muted-foreground mt-1">
                                Save £90.60 vs individual assessments
                              </span>
                            )}
                            {assessment.id === '23' && (
                              <span className="block text-sm text-muted-foreground mt-1">
                                Save £96.95 vs individual assessments
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 space-y-2">
                        <Button 
                          onClick={() => {
                            if (assessment.id === '1') {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              window.location.hash = 'surgery-readiness-assessment-learn-more';
                            } else if (assessment.id === '2') {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              window.location.hash = 'biological-age-calculator-learn-more';
                            } else if (assessment.id === '3') {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              window.location.hash = 'assessments';
                            } else if (assessment.id === '4') {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              window.location.hash = 'assessments';
                            } else if (assessment.id === '5') {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              window.location.hash = 'surgery-conditioning-protocol-challenge';
                            } else if (assessment.id === '6') {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              window.location.hash = 'complication-risk-checker-learn-more';
                            } else if (assessment.id === '7') {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              window.location.hash = 'recovery-speed-predictor-learn-more';
                            } else if (assessment.id === '8') {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              window.location.hash = 'anaesthesia-risk-screener-learn-more';
                            } else if (assessment.id === '9') {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              window.location.hash = 'mobility-strength-score-learn-more';
                            } else if (assessment.id === '10') {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              window.location.hash = 'symptom-severity-index-learn-more';
                            } else if (assessment.id === '11') {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              window.location.hash = 'inflammation-risk-score-learn-more';
                            } else if (assessment.id === '12') {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              window.location.hash = 'medication-burden-calculator-learn-more';
                            } else if (assessment.id === '13') {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              window.location.hash = 'daily-energy-audit-learn-more';
                            } else if (assessment.id === '14') {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              window.location.hash = 'lifestyle-limiter-score-learn-more';
                            } else if (assessment.id === '15') {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              window.location.hash = 'chronic-symptom-protocol-challenge';
                            } else if (assessment.id === '16') {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              window.location.hash = 'longevity-focus-protocol-challenge';
                            } else if (assessment.id === '17') {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              window.location.hash = 'cardiometabolic-risk-score-learn-more';
                            } else if (assessment.id === '18') {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              window.location.hash = 'resilience-index-learn-more';
                            } else if (assessment.id === '19') {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              window.location.hash = 'nutrition-body-composition-score-learn-more';
                            } else if (assessment.id === '20') {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              window.location.hash = 'functional-fitness-age-test-learn-more';
                            } else if (assessment.id === '21') {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              window.location.hash = 'completed-surgery-preparation-bundle-learn-more';
                            } else if (assessment.id === '22') {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              window.location.hash = 'completed-chronic-symptoms-bundle-learn-more';
                            } else if (assessment.id === '23') {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              window.location.hash = 'longevity-wellness-bundle-learn-more';
                            } else {
                              trackAssessmentStart(assessment.id, assessment.name, assessment.price);
                              addToBasket(assessment);
                            }
                          }}
                          className="w-full"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Start Assessment
                        </Button>
                        <Button 
                          onClick={() => addToBasket(assessment)}
                          className="w-full"
                          variant="outline"
                        >
                          Add to Basket
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
              <div className="w-4 flex-shrink-0" />
            </div>
          </div>
          
          <div className="absolute top-0 right-0 bottom-4 w-8 bg-gradient-to-l from-background/80 to-transparent pointer-events-none" />
        </div>
      </section>

      <ShoppingBasket
        isOpen={isBasketOpen}
        onClose={() => setIsBasketOpen(false)}
        items={basketItems}
        onRemoveItem={removeFromBasket}
        onUpgradeToBundle={handleUpgradeToBundle}
        totalPrice={getTotalPrice()}
      />
    </div>
  );
}