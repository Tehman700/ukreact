import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MessageCircle } from 'lucide-react';
import { Product } from '../App';
import { toast } from 'sonner@2.0.3';
import surgeonImage from 'figma:asset/31b7fd69d3019f0b108fe61e9645c1e3d7f9f3af.png';

interface ProductCardProps {
  product: Product;
  onRequestQuote: (product: Product) => void;
  onAddToCart?: (product: Product, size?: string, color?: string, quantity?: number) => void;
}

export function ProductCard({ product, onRequestQuote, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleRequestQuote = () => {
    onRequestQuote(product);
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  // Get protocol name and short description based on category
  const getProtocolInfo = () => {
    switch (product.category) {
      case 'Symptom Control':
        return {
          name: 'Symptom Control Protocol',
          description: 'Comprehensive management of chronic conditions with personalized treatment plans and ongoing monitoring.'
        };
      case 'Surgery Conditioning':
        return {
          name: 'Surgery Conditioning Protocol',
          description: product.isTrialOffer 
            ? 'Pre-surgical optimization to improve outcomes and accelerate recovery times.'
            : 'Pre and post-surgical optimization to improve outcomes and accelerate recovery times.'
        };
      case 'Longevity Focus':
        return {
          name: 'Longevity Focus Protocol',
          description: 'Advanced anti-aging strategies combining hormone optimization and preventive health measures.'
        };
      default:
        return {
          name: `${product.category} Protocol`,
          description: 'Specialized healthcare protocol tailored to your individual needs and goals.'
        };
    }
  };

  const protocolInfo = getProtocolInfo();

  // Consistent badge styling following design guide
  const badgeStyle = "bg-white text-foreground border-border";

  // Get protocol-specific badge lists and FAQ content
  const getProtocolContent = () => {
    switch (product.category) {
      case 'Symptom Control':
        return {
          targetDescription: "If you're a driven professional experiencing unexplained symptoms that are affecting your work performance, family life, or personal well-being, this protocol is designed for you.\n\nWe understand you don't have time for generic healthcare approaches. You need rapid, accurate diagnosis and effective treatment plans that fit your demanding lifestyle.\n\nOur clients are typically executives, entrepreneurs, and high-achievers who refuse to let health issues slow them down, but recognize they need expert medical guidance to address complex, interconnected symptoms.",
          badges: [
            { label: "Fatigue" },
            { label: "Low Energy" },
            { label: "Weight Loss" },
            { label: "Weight Gain" },
            { label: "Fever" },
            { label: "Night Sweats" },
            { label: "Sleep Issues" },
            { label: "Chest Pain" },
            { label: "Palpitations" },
            { label: "Shortness of Breath" },
            { label: "Swelling" },
            { label: "Dizziness" },
            { label: "Chronic Cough" },
            { label: "Sleep Apnoea" },
            { label: "Abdominal Pain" },
            { label: "Heartburn" },
            { label: "Nausea" },
            { label: "Constipation" },
            { label: "Urination Issues" },
            { label: "Erectile Dysfunction" },
            { label: "Low Libido" },
            { label: "Headaches" },
            { label: "Joint Pain" },
            { label: "Back Pain" },
            { label: "Anxiety" },
            { label: "Low Mood" },
            { label: "Poor Concentration" }
          ]
        };
      case 'Surgery Conditioning':
        return {
          targetDescription: "Facing an upcoming surgery? You understand that preparation and recovery can make or break your surgical outcome.\n\nThis protocol is perfect for men who want to maximize their surgical success, minimize complications, and return to peak performance as quickly as possible.\n\nWhether you're a busy executive who can't afford extended downtime, an athlete preparing for career-critical surgery, or simply someone who demands the best possible outcome, our comprehensive pre and post-surgical optimization gives you the competitive edge in your recovery.",
          badges: [
            { label: "Knee Surgery" },
            { label: "Hip Replacement" },
            { label: "Shoulder Surgery" },
            { label: "Hernia Repair" },
            { label: "Cataract Surgery" },
            { label: "Gallbladder Surgery" },
            { label: "Varicose Vein" },
            { label: "Cosmetic Surgery" },
            { label: "Weight Loss Surgery" },
            { label: "Prostate Surgery" },
            { label: "Vasectomy" },
            { label: "Spinal Surgery" },
            { label: "Carpal Tunnel" },
            { label: "Tonsillectomy" }
          ]
        };
      case 'Longevity Focus':
        return {
          targetDescription: "You're not just planning for retirement – you're planning to dominate your 50s, 60s, 70s, and beyond.\n\nThis protocol is designed for forward-thinking men who refuse to accept 'normal aging' as inevitable. You want to optimize your energy, cognitive function, physical performance, and overall vitality for decades to come.\n\nOur clients are typically successful professionals, entrepreneurs, and leaders who view their health as their most valuable asset and are willing to invest in cutting-edge, evidence-based longevity strategies that go far beyond conventional medicine.",
          badges: [
            { label: "Health Prevention" },
            { label: "Disease Prevention" },
            { label: "Energy Optimization" },
            { label: "Performance Enhancement" },
            { label: "Health Tracking" },
            { label: "Biomarker Optimization" },
            { label: "Lifestyle Optimization" },
            { label: "Mental Resilience" }
          ]
        };
      default:
        return {
          targetDescription: "We work with motivated men facing multiple health concerns who require personalized, comprehensive care.",
          badges: []
        };
    }
  };

  const protocolContent = getProtocolContent();

  // Sample FAQ data - in a real app, this would come from the product data
  const faqItems = [
    {
      question: "Who is this service for?",
      answer: protocolContent.targetDescription,
      badges: protocolContent.badges
    },
    {
      question: "What does this service include?",
      answer: product.description
    },
    {
      question: "How long does the program last?",
      answer: product.isTrialOffer 
        ? "This program lasts 14 days and is crafted to meet your specific needs and goals."
        : `This program offers flexible durations: ${product.sizes.join(', ')} to meet your specific needs and goals.`
    },
    product.isTrialOffer ? {
      question: "Is the 14-day trial really free?",
      answer: "Yes — if you follow the plan.\n\nWe ask for a £200 fully refundable deposit to secure your spot and make sure you're committed.\n\nComplete the program as outlined, and we'll refund every penny at the end of the 14 days.\n\nWe've found that when patients commit, they get better results — and that's what we care about."
    } : {
      question: "What service levels are available?",
      answer: `We offer different service tiers: ${product.colors.join(', ')} to provide the right level of care for your situation.`
    },
    {
      question: "How do I get started?",
      answer: product.isTrialOffer 
        ? "Click 'Let's prepare together' to schedule a consultation with one of our doctors who will assess your needs and create your 14 day personalized treatment plan."
        : "Click 'Request Quote' to schedule a consultation with one of our specialists who will assess your needs and create a personalized treatment plan."
    }
  ];

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg h-full flex flex-col">
      {/* Image Section */}
      <div 
        className="relative aspect-[4/3] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ImageWithFallback
          src={product.name.toLowerCase().includes('surgery') ? surgeonImage : product.image}
          alt={product.name.toLowerCase().includes('surgery') ? "Professional surgeon in operating room" : product.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        
        {/* FREE 14 day trial badge */}
        {product.isTrialOffer && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-primary-foreground font-medium px-3 py-1">
              FREE 14 day trial
            </Badge>
          </div>
        )}
        
        <div className={`absolute inset-0 bg-black/20 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="space-y-4 flex-1 flex flex-col">
          {/* Protocol Name and Description */}
          <div className="space-y-2">
            <h3 className="font-medium line-clamp-2">{protocolInfo.name}</h3>
            <p className="text-sm text-muted-foreground">{protocolInfo.description}</p>
          </div>
          
          {/* Trial badges - only for trial offers */}
          {product.isTrialOffer && (
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground mb-4 px-[0px] py-[10px]">
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
          )}

          {/* FAQ Accordion */}
          <div className="flex-1">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-sm text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-3">
                    <div className="whitespace-pre-line">{item.answer}</div>
                    {item.badges && item.badges.length > 0 && (
                      <div className="flex flex-wrap gap-2 mx-[0px] my-[3px] px-[0px py-[-6px]] py-[22px] px-[0px] py-[20px]">
                        {item.badges.map((badge, badgeIndex) => (
                          <Button
                            key={badgeIndex} 
                            variant="outline"
                            size="sm"
                            className="h-auto py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 bg-white text-foreground border-border hover:bg-muted/50 py-[2px] px-[12px] px-[13px] mx-[0px] my-[1px] rounded-[7px]"
                          >
                            {badge.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          {/* Request Quote CTA */}
          <div className="mt-auto pt-4">
            <Button 
              onClick={product.isTrialOffer && onAddToCart ? handleAddToCart : handleRequestQuote}
              className="w-full"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {product.isTrialOffer ? "Let's prepare together" : "Request Quote"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}