import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion-simple";
import { LogoCarousel } from "../LogoCarousel";
import { Check, Star, X } from "lucide-react";
import { Card } from "./card";
import { Grid } from "./grid";
import { CardGrid } from "./cardGrid";
import { Columns } from "./columns";
import { VerticalSpace } from "./verticalSpace";
import { Section } from "./Section";

// Hero Section Component for Puck
export const HeroSection: ComponentConfig<{
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  fontSize: number;
  fontColor?: string;
  backgroundColor?: string;
}> = {
  fields: {
    title: {
      type: "text",
      label: "Main Title",
      contentEditable: true,
    },
    subtitle: {
      type: "textarea",
      label: "Subtitle",
      contentEditable: true,
    },
    image: {
      type: "text",
      label: "Image URL",
    },
    imageAlt: {
      type: "text", 
      label: "Image Alt Text",
    },
    paddingTop: {
      type: "number",
      label: "Padding Top (px)",
      min: 0,
      max: 200,
    },
    paddingBottom: {
      type: "number",
      label: "Padding Bottom (px)",
      min: 0,
      max: 200,
    },
    paddingLeft: {
      type: "number",
      label: "Padding Left (px)",
      min: 0,
      max: 200,
    },
    paddingRight: {
      type: "number",
      label: "Padding Right (px)",
      min: 0,
      max: 200,
    },
    marginTop: {
      type: "number",
      label: "Margin Top (px)",
      min: 0,
      max: 200,
    },
    marginBottom: {
      type: "number",
      label: "Margin Bottom (px)",
      min: 0,
      max: 200,
    },
    marginLeft: {
      type: "number",
      label: "Margin Left (px)",
      min: 0,
      max: 200,
    },
    marginRight: {
      type: "number",
      label: "Margin Right (px)",
      min: 0,
      max: 200,
    },
    fontSize: {
      type: "number",
      label: "Font Size (px)",
      min: 10,
      max: 100,
    },
  },
  defaultProps: {
    title: "The £37 Pre-Op check that could save you weeks of recovery",
    subtitle: "If you've got a surgery date, your biggest risk isn't the operation. It's showing up under-prepared.",
    image: "/assets/surgery-hero.webp",
    imageAlt: "Smiling male patient in hospital gown representing the Surgery Readiness Score",
    paddingTop: 96,
    paddingBottom: 96,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 16,
    fontColor: "#111827",
    backgroundColor: "linear-gradient(to right, #f9fafb, #f3f4f6)",
  },
  render: ({ title, subtitle, image, imageAlt, paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, fontSize, fontColor = "#111827", backgroundColor = "linear-gradient(to right, #f9fafb, #f3f4f6)" }) => (
    <section style={{
      position: 'relative',
      background: backgroundColor,
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      paddingLeft: `${paddingLeft}px`,
      paddingRight: `${paddingRight}px`,
      marginTop: `${marginTop}px`,
      marginBottom: `${marginBottom}px`,
      marginLeft: `${marginLeft}px`,
      marginRight: `${marginRight}px`
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        <div style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}>
          <h1 style={{
            fontSize: `clamp(${fontSize * 1.25}px, 5vw, ${fontSize * 2.34}px)`,
            fontWeight: 'bold',
            lineHeight: '1.1',
            color: fontColor,
            margin: 0
          }}>
            {title}
          </h1>
          <p style={{
            fontSize: `${fontSize * 0.875}px`,
            color: '#4b5563',
            maxWidth: '768px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            {subtitle}
          </p>
          
          <div style={{
            position: 'relative',
            marginTop: '48px',
            maxWidth: '384px',
            margin: '48px auto 0'
          }}>
            <ImageWithFallback
              src={image}
              alt={imageAlt}
              width={400}
              height={500}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '16px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
            />
          </div>
        </div>

        {/* Trust Badges */}
        <div style={{
          marginTop: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '32px',
          fontSize: '14px',
          color: '#4b5563'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#2563eb',
              borderRadius: '50%'
            }} />
            <span>Regulated</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#059669',
              borderRadius: '50%'
            }} />
            <span>Doctor Led</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#7c3aed',
              borderRadius: '50%'
            }} />
            <span>Evidence Based</span>
          </div>
        </div>
      </div>
    </section>
  ),
};

// Text Section Component for Puck
export const TextSection: ComponentConfig<{
  title: string;
  content: string;
  backgroundColor?: string;
  fontColor?: string;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  fontSize: number;
}> = {
  fields: {
    title: {
      type: "text",
      label: "Section Title",
      contentEditable: true,
    },
    content: {
      type: "textarea",
      label: "Content",
      contentEditable: true,
    },
    backgroundColor: {
      type: "text",
      label: "Background Color (e.g., #ffffff, #f9fafb)",
    },
    fontColor: {
      type: "text",
      label: "Font Color (e.g., #111827)",
    },
    paddingTop: {
      type: "number",
      label: "Padding Top (px)",
      min: 0,
      max: 200,
    },
    paddingBottom: {
      type: "number",
      label: "Padding Bottom (px)",
      min: 0,
      max: 200,
    },
    paddingLeft: {
      type: "number",
      label: "Padding Left (px)",
      min: 0,
      max: 200,
    },
    paddingRight: {
      type: "number",
      label: "Padding Right (px)",
      min: 0,
      max: 200,
    },
    marginTop: {
      type: "number",
      label: "Margin Top (px)",
      min: 0,
      max: 200,
    },
    marginBottom: {
      type: "number",
      label: "Margin Bottom (px)",
      min: 0,
      max: 200,
    },
    marginLeft: {
      type: "number",
      label: "Margin Left (px)",
      min: 0,
      max: 200,
    },
    marginRight: {
      type: "number",
      label: "Margin Right (px)",
      min: 0,
      max: 200,
    },
    fontSize: {
      type: "number",
      label: "Font Size (px)",
      min: 10,
      max: 100,
    },
  },
  defaultProps: {
    title: "Section Title",
    content: "Section content goes here...",
    backgroundColor: "#ffffff",
    fontColor: "#111827",
    paddingTop: 80,
    paddingBottom: 80,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 16,
  },
  render: ({ title, content, backgroundColor = "#ffffff", fontColor = "#111827", paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, fontSize }) => (
    <section style={{
      backgroundColor: backgroundColor,
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      paddingLeft: `${paddingLeft}px`,
      paddingRight: `${paddingRight}px`,
      marginTop: `${marginTop}px`,
      marginBottom: `${marginBottom}px`,
      marginLeft: `${marginLeft}px`,
      marginRight: `${marginRight}px`
    }}>
      <div style={{
        maxWidth: '1024px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        <h2 style={{
          fontSize: `clamp(${fontSize * 1.17}px, 4vw, ${fontSize * 1.4}px)`,
          fontWeight: 'bold',
          color: fontColor,
          marginBottom: '32px'
        }}>
          {title}
        </h2>
        <div style={{
          fontSize: `${fontSize * 0.7}px`,
          lineHeight: '1.7',
          color: fontColor
        }}>
          <p style={{ margin: 0 }}>{content}</p>
        </div>
      </div>
    </section>
  ),
};

// Testimonial Component for Puck
export const TestimonialSection: ComponentConfig<{
  quote: string;
  author: string;
  role: string;
  rating: number;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  fontSize: number;
  fontColor?: string;
  backgroundColor?: string;
}> = {
  fields: {
    quote: {
      type: "textarea",
      label: "Testimonial Quote",
      contentEditable: true,
    },
    author: {
      type: "text",
      label: "Author Name",
      contentEditable: true,
    },
    role: {
      type: "text",
      label: "Author Role",
      contentEditable: true,
    },
    rating: {
      type: "number",
      label: "Star Rating (1-5)",
      min: 1,
      max: 5,
    },
    paddingTop: {
      type: "number",
      label: "Padding Top (px)",
      min: 0,
      max: 200,
    },
    paddingBottom: {
      type: "number",
      label: "Padding Bottom (px)",
      min: 0,
      max: 200,
    },
    paddingLeft: {
      type: "number",
      label: "Padding Left (px)",
      min: 0,
      max: 200,
    },
    paddingRight: {
      type: "number",
      label: "Padding Right (px)",
      min: 0,
      max: 200,
    },
    marginTop: {
      type: "number",
      label: "Margin Top (px)",
      min: 0,
      max: 200,
    },
    marginBottom: {
      type: "number",
      label: "Margin Bottom (px)",
      min: 0,
      max: 200,
    },
    marginLeft: {
      type: "number",
      label: "Margin Left (px)",
      min: 0,
      max: 200,
    },
    marginRight: {
      type: "number",
      label: "Margin Right (px)",
      min: 0,
      max: 200,
    },
    fontSize: {
      type: "number",
      label: "Font Size (px)",
      min: 10,
      max: 100,
    },
    fontColor: {
      type: "text",
      label: "Font Color (hex or name)",
    },
    backgroundColor: {
      type: "text",
      label: "Background Color (hex or name)",
    },
  },
  defaultProps: {
    quote: "This assessment changed how I prepared for surgery. Highly recommended!",
    author: "John D.",
    role: "Surgery Patient",
    rating: 5,
    paddingTop: 80,
    paddingBottom: 80,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 16,
    fontColor: "#374151",
    backgroundColor: "#f9fafb",
  },
  render: ({ quote, author, role, rating, paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, fontSize, fontColor, backgroundColor }) => (
    <section style={{ 
      backgroundColor: backgroundColor || '#f9fafb', 
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      paddingLeft: `${paddingLeft}px`,
      paddingRight: `${paddingRight}px`,
      marginTop: `${marginTop}px`,
      marginBottom: `${marginBottom}px`,
      marginLeft: `${marginLeft}px`,
      marginRight: `${marginRight}px`
    }}>
      <div style={{
        maxWidth: '1024px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', gap: '4px', marginBottom: '24px' }}>
            {[...Array(rating)].map((_, i) => (
              <Star key={i} style={{
                width: '20px',
                height: '20px',
                fill: '#eab308',
                color: '#eab308'
              }} />
            ))}
          </div>
          <blockquote style={{
            fontSize: `${fontSize * 0.7}px`,
            color: fontColor || '#374151',
            marginBottom: '24px',
            fontStyle: 'italic',
            margin: '0 0 24px 0'
          }}>
            "{quote}"
          </blockquote>
          <div style={{
            borderTop: '1px solid #e5e7eb',
            paddingTop: '24px'
          }}>
            <p style={{
              fontWeight: '600',
              color: '#111827',
              margin: '0 0 4px 0',
              fontSize: `${fontSize}px`
            }}>
              {author}
            </p>
            <p style={{
              fontSize: `${fontSize * 0.875}px`,
              color: '#6b7280',
              margin: 0
            }}>
              {role}
            </p>
          </div>
        </div>
      </div>
    </section>
  ),
};

// FAQ Section Component for Puck
export const FAQSection: ComponentConfig<{
  title: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  fontSize: number;
  fontColor?: string;
  backgroundColor?: string;
}> = {
  fields: {
    title: {
      type: "text",
      label: "FAQ Section Title",
      contentEditable: true,
    },
    faqs: {
      type: "array",
      label: "FAQ Items",
      getItemSummary: (item: { question: string }) => item.question || "FAQ Item",
      arrayFields: {
        question: {
          type: "text",
          label: "Question",
          contentEditable: true,
        },
        answer: {
          type: "textarea", 
          label: "Answer",
          contentEditable: true,
        },
      },
    },
    paddingTop: {
      type: "number",
      label: "Padding Top (px)",
      min: 0,
      max: 200,
    },
    paddingBottom: {
      type: "number",
      label: "Padding Bottom (px)",
      min: 0,
      max: 200,
    },
    paddingLeft: {
      type: "number",
      label: "Padding Left (px)",
      min: 0,
      max: 200,
    },
    paddingRight: {
      type: "number",
      label: "Padding Right (px)",
      min: 0,
      max: 200,
    },
    marginTop: {
      type: "number",
      label: "Margin Top (px)",
      min: 0,
      max: 200,
    },
    marginBottom: {
      type: "number",
      label: "Margin Bottom (px)",
      min: 0,
      max: 200,
    },
    marginLeft: {
      type: "number",
      label: "Margin Left (px)",
      min: 0,
      max: 200,
    },
    marginRight: {
      type: "number",
      label: "Margin Right (px)",
      min: 0,
      max: 200,
    },
    fontSize: {
      type: "number",
      label: "Font Size (px)",
      min: 10,
      max: 100,
    },
  },
  defaultProps: {
    title: "Frequently Asked Questions",
    faqs: [
      {
        question: "Is this medical advice?",
        answer: "It's an assessment and planning tool designed by clinicians to help you prepare. It does not replace medical advice from your surgeon or GP.",
      },
    ],
    paddingTop: 80,
    paddingBottom: 80,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 16,
    fontColor: "#111827",
    backgroundColor: "#ffffff",
  },
  render: ({ title, faqs, paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, fontSize, fontColor, backgroundColor }) => (
    <section style={{ 
      backgroundColor: backgroundColor || '#ffffff', 
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      paddingLeft: `${paddingLeft}px`,
      paddingRight: `${paddingRight}px`,
      marginTop: `${marginTop}px`,
      marginBottom: `${marginBottom}px`,
      marginLeft: `${marginLeft}px`,
      marginRight: `${marginRight}px`
    }}>
      <div style={{
        maxWidth: '1024px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        <h2 style={{
          fontSize: `clamp(${fontSize * 1.17}px, 4vw, ${fontSize * 1.4}px)`,
          fontWeight: 'bold',
          color: fontColor || '#111827',
          marginBottom: '48px',
          textAlign: 'center'
        }}>
          {title}
        </h2>
        <Accordion type="single" collapsible style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index + 1}`} 
              style={{
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                padding: '24px',
                border: 'none'
              }}
            >
              <AccordionTrigger style={{
                textAlign: 'left',
                fontWeight: '600',
                textDecoration: 'none',
                fontSize: `${fontSize}px`
              }}>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent style={{
                color: '#374151',
                paddingTop: '8px',
                fontSize: `${fontSize * 0.875}px`
              }}>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  ),
};

// CTA Section Component for Puck
export const CTASection: ComponentConfig<{
  title: string;
  description: string;
  buttonText: string;
  onButtonClick?: () => void;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  fontSize: number;
  fontColor?: string;
  backgroundColor?: string;
}> = {
  fields: {
    title: {
      type: "text",
      label: "CTA Title",
      contentEditable: true,
    },
    description: {
      type: "textarea",
      label: "CTA Description",
      contentEditable: true,
    },
    buttonText: {
      type: "text",
      label: "Button Text",
      contentEditable: true,
    },
    paddingTop: {
      type: "number",
      label: "Padding Top (px)",
      min: 0,
      max: 200,
    },
    paddingBottom: {
      type: "number",
      label: "Padding Bottom (px)",
      min: 0,
      max: 200,
    },
    paddingLeft: {
      type: "number",
      label: "Padding Left (px)",
      min: 0,
      max: 200,
    },
    paddingRight: {
      type: "number",
      label: "Padding Right (px)",
      min: 0,
      max: 200,
    },
    marginTop: {
      type: "number",
      label: "Margin Top (px)",
      min: 0,
      max: 200,
    },
    marginBottom: {
      type: "number",
      label: "Margin Bottom (px)",
      min: 0,
      max: 200,
    },
    marginLeft: {
      type: "number",
      label: "Margin Left (px)",
      min: 0,
      max: 200,
    },
    marginRight: {
      type: "number",
      label: "Margin Right (px)",
      min: 0,
      max: 200,
    },
    fontSize: {
      type: "number",
      label: "Font Size (px)",
      min: 10,
      max: 100,
    },
    fontColor: {
      type: "text",
      label: "Font Color (hex or name)",
    },
    backgroundColor: {
      type: "text",
      label: "Background Color (hex or name)",
    },
  },
  defaultProps: {
    title: "Ready to Get Started?",
    description: "Take the first step toward a safer, smoother surgery experience.",
    buttonText: "Start Assessment",
    paddingTop: 80,
    paddingBottom: 80,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 16,
    fontColor: "#ffffff",
    backgroundColor: "#2563eb",
  },
  render: ({ title, description, buttonText, onButtonClick, paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, fontSize, fontColor, backgroundColor }) => (
    <section style={{ 
      backgroundColor: backgroundColor || "#2563eb",
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      paddingLeft: `${paddingLeft}px`,
      paddingRight: `${paddingRight}px`,
      marginTop: `${marginTop}px`,
      marginBottom: `${marginBottom}px`,
      marginLeft: `${marginLeft}px`,
      marginRight: `${marginRight}px`
    }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-bold mb-6" style={{ fontSize: `clamp(${fontSize * 1.5}px, 4vw, ${fontSize * 2.5}px)`, color: fontColor || "#ffffff" }}>
          {title}
        </h2>
        <p className="mb-8 max-w-2xl mx-auto" style={{ fontSize: `${fontSize * 1.25}px`, color: fontColor || "#ffffff", opacity: 0.9 }}>
          {description}
        </p>
        <Button
          size="lg"
          onClick={onButtonClick}
          className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
        >
          {buttonText}
        </Button>
      </div>
    </section>
  ),
};

// Surgery Types Section Component for Puck
export const SurgeryTypesSection: ComponentConfig<{
  title: string;
  subtitle: string;
  surgeryTypes: Array<{ label: string }>;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  fontSize: number;
}> = {
  fields: {
    title: {
      type: "text",
      label: "Section Title",
      contentEditable: true,
    },
    subtitle: {
      type: "textarea",
      label: "Subtitle",
      contentEditable: true,
    },
    surgeryTypes: {
      type: "array",
      label: "Surgery Types",
      getItemSummary: (item: { label: string }) => item.label || "Surgery Type",
      arrayFields: {
        label: {
          type: "text",
          label: "Surgery Type",
          contentEditable: true,
        },
      },
    },
    paddingTop: {
      type: "number",
      label: "Padding Top (px)",
      min: 0,
      max: 200,
    },
    paddingBottom: {
      type: "number",
      label: "Padding Bottom (px)",
      min: 0,
      max: 200,
    },
    paddingLeft: {
      type: "number",
      label: "Padding Left (px)",
      min: 0,
      max: 200,
    },
    paddingRight: {
      type: "number",
      label: "Padding Right (px)",
      min: 0,
      max: 200,
    },
    marginTop: {
      type: "number",
      label: "Margin Top (px)",
      min: 0,
      max: 200,
    },
    marginBottom: {
      type: "number",
      label: "Margin Bottom (px)",
      min: 0,
      max: 200,
    },
    marginLeft: {
      type: "number",
      label: "Margin Left (px)",
      min: 0,
      max: 200,
    },
    marginRight: {
      type: "number",
      label: "Margin Right (px)",
      min: 0,
      max: 200,
    },
    fontSize: {
      type: "number",
      label: "Font Size (px)",
      min: 10,
      max: 100,
    },
  },
  defaultProps: {
    title: "Surgeries We Support",
    subtitle: "Our assessment covers a wide range of surgical procedures",
    surgeryTypes: [
      { label: "Knee Surgery" },
      { label: "Hip Replacement" },
      { label: "Heart Surgery" },
    ],
    paddingTop: 80,
    paddingBottom: 80,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 16,
  },
  render: ({ title, subtitle, surgeryTypes, paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, fontSize }) => (
    <section className="bg-gray-50" style={{ 
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      paddingLeft: `${paddingLeft}px`,
      paddingRight: `${paddingRight}px`,
      marginTop: `${marginTop}px`,
      marginBottom: `${marginBottom}px`,
      marginLeft: `${marginLeft}px`,
      marginRight: `${marginRight}px`
    }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: `clamp(${fontSize * 1.5}px, 4vw, ${fontSize * 2.5}px)` }}>{title}</h2>
          <p className="text-gray-600" style={{ fontSize: `${fontSize * 1.125}px` }}>{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {surgeryTypes.map((surgery, index) => (
            <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm border">
              <span className="font-medium text-gray-900" style={{ fontSize: `${fontSize * 0.875}px` }}>{surgery.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
};

// (puckConfig moved to bottom to ensure all components are defined first)

// Luther vs NHS Comparison Table (from Page B)
export const ComparisonTableSection: ComponentConfig<{
  title: string;
  subtitle: string;
  lhsLabel: string;
  rhsLabel: string;
  rows: Array<{ label: string; lhs: string; rhs: string; lhsCheck?: boolean; rhsCheck?: boolean }>;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  fontSize: number;
}> = {
  fields: {
    title: { type: "text", label: "Title", contentEditable: true },
    subtitle: { type: "textarea", label: "Subtitle", contentEditable: true },
    lhsLabel: { type: "text", label: "Left Column Label", contentEditable: true },
    rhsLabel: { type: "text", label: "Right Column Label", contentEditable: true },
    rows: {
      type: "array",
      label: "Rows",
      getItemSummary: (item: { label: string }) => item.label || "Row",
      arrayFields: {
        label: { type: "text", label: "Row Label", contentEditable: true },
        lhs: { type: "text", label: "Left Value (text shown if no check)" },
        rhs: { type: "text", label: "Right Value (text shown if no check)" },
        lhsCheck: { type: "checkbox", label: "Left Checkmark" },
        rhsCheck: { type: "checkbox", label: "Right Checkmark" },
      },
    },
    paddingTop: {
      type: "number",
      label: "Padding Top (px)",
      min: 0,
      max: 200,
    },
    paddingBottom: {
      type: "number",
      label: "Padding Bottom (px)",
      min: 0,
      max: 200,
    },
    paddingLeft: {
      type: "number",
      label: "Padding Left (px)",
      min: 0,
      max: 200,
    },
    paddingRight: {
      type: "number",
      label: "Padding Right (px)",
      min: 0,
      max: 200,
    },
    marginTop: {
      type: "number",
      label: "Margin Top (px)",
      min: 0,
      max: 200,
    },
    marginBottom: {
      type: "number",
      label: "Margin Bottom (px)",
      min: 0,
      max: 200,
    },
    marginLeft: {
      type: "number",
      label: "Margin Left (px)",
      min: 0,
      max: 200,
    },
    marginRight: {
      type: "number",
      label: "Margin Right (px)",
      min: 0,
      max: 200,
    },
    fontSize: {
      type: "number",
      label: "Font Size (px)",
      min: 10,
      max: 100,
    },
  },
  defaultProps: {
    title: "The Luther Health Difference",
    subtitle: "Most surgical preparation is reactive. We're proactive.",
    lhsLabel: "Luther Health",
    rhsLabel: "Standard NHS Pathway",
    rows: [
      { label: "Pre-surgical risk assessment", lhs: "", rhs: "Basic only", lhsCheck: true },
      { label: "Personalized optimization plan", lhs: "", rhs: "", lhsCheck: true, rhsCheck: false },
      { label: "Nutrition & fitness guidance", lhs: "", rhs: "", lhsCheck: true, rhsCheck: false },
      { label: "Medication review for surgery", lhs: "", rhs: "Limited", lhsCheck: true },
      { label: "Instant results", lhs: "", rhs: "Weeks wait", lhsCheck: true },
      { label: "Specialist follow-up available", lhs: "", rhs: "", lhsCheck: true, rhsCheck: false },
      { label: "Time to complete", lhs: "10 minutes", rhs: "Multiple appointments" },
    ],
    paddingTop: 64,
    paddingBottom: 64,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 16,
  },
  render: ({ title, subtitle, lhsLabel, rhsLabel, rows, paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, fontSize }) => (
    <section className="relative bg-white" style={{ 
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      paddingLeft: `${paddingLeft}px`,
      paddingRight: `${paddingRight}px`,
      marginTop: `${marginTop}px`,
      marginBottom: `${marginBottom}px`,
      marginLeft: `${marginLeft}px`,
      marginRight: `${marginRight}px`
    }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="tracking-tight mb-4" style={{ fontSize: `clamp(${fontSize * 1.5}px, 4vw, ${fontSize * 2.5}px)` }}>{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" style={{ fontSize: `${fontSize * 1.125}px` }}>{subtitle}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 min-w-[200px]" style={{ fontSize: `${fontSize}px` }}></th>
                <th className="text-center py-4 px-4 min-w-[200px]">
                  <div className="inline-block px-4 py-2 bg-primary/10 rounded-lg" style={{ fontSize: `${fontSize}px` }}>{lhsLabel}</div>
                </th>
                <th className="text-center py-4 px-4 min-w-[200px] text-muted-foreground" style={{ fontSize: `${fontSize}px` }}>{rhsLabel}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row, idx) => (
                <tr key={idx}>
                  <td className="py-4 px-4" style={{ fontSize: `${fontSize}px` }}>{row.label}</td>
                  <td className="text-center py-4 px-4">
                    <div className="flex justify-center">
                      {row.lhsCheck ? (
                        <Check className="w-6 h-6 text-green-600" />
                      ) : (
                        <span style={{ fontSize: `${fontSize * 0.875}px` }}>{row.lhs}</span>
                      )}
                    </div>
                  </td>
                  <td className="text-center py-4 px-4">
                    <div className="flex justify-center">
                      {row.rhsCheck ? (
                        <Check className="w-6 h-6 text-green-600" />
                      ) : row.rhs ? (
                        <span className="text-muted-foreground" style={{ fontSize: `${fontSize * 0.875}px` }}>{row.rhs}</span>
                      ) : (
                        <X className="w-6 h-6 text-gray-300" />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  ),
};

// Testimonials Grid (from Page B)
export const TestimonialsGridSection: ComponentConfig<{
  title: string;
  testimonials: Array<{ quote: string; author: string; role: string; rating?: number }>;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  fontSize: number;
}> = {
  fields: {
    title: { type: "text", label: "Title", contentEditable: true },
    testimonials: {
      type: "array",
      label: "Testimonials",
      getItemSummary: (item: { author: string }) => item.author || "Testimonial",
      arrayFields: {
        quote: { type: "textarea", label: "Quote", contentEditable: true },
        author: { type: "text", label: "Author", contentEditable: true },
        role: { type: "text", label: "Role", contentEditable: true },
        rating: { type: "number", label: "Stars (1-5)", min: 1, max: 5 },
      },
    },
    paddingTop: {
      type: "number",
      label: "Padding Top (px)",
      min: 0,
      max: 200,
    },
    paddingBottom: {
      type: "number",
      label: "Padding Bottom (px)",
      min: 0,
      max: 200,
    },
    paddingLeft: {
      type: "number",
      label: "Padding Left (px)",
      min: 0,
      max: 200,
    },
    paddingRight: {
      type: "number",
      label: "Padding Right (px)",
      min: 0,
      max: 200,
    },
    marginTop: {
      type: "number",
      label: "Margin Top (px)",
      min: 0,
      max: 200,
    },
    marginBottom: {
      type: "number",
      label: "Margin Bottom (px)",
      min: 0,
      max: 200,
    },
    marginLeft: {
      type: "number",
      label: "Margin Left (px)",
      min: 0,
      max: 200,
    },
    marginRight: {
      type: "number",
      label: "Margin Right (px)",
      min: 0,
      max: 200,
    },
    fontSize: {
      type: "number",
      label: "Font Size (px)",
      min: 10,
      max: 100,
    },
  },
  defaultProps: {
    title: "What Our Patients Say",
    testimonials: [
      {
        quote:
          "I'm 67 and was terrified about my hip replacement. This assessment showed me I had low protein and poor fitness—things my surgeon never mentioned. I spent 6 weeks preparing properly. Recovery was faster than expected and I was walking without a stick in 3 weeks.",
        author: "Michael R.",
        role: "Hip Replacement Patient",
        rating: 5,
      },
      {
        quote:
          "After taking the assessment, I realized my diabetes wasn't as well controlled as I thought. My doctor adjusted my medication 2 months before surgery. No infections, no complications. I wish every surgical patient knew about this.",
        author: "James T.",
        role: "Cardiac Surgery Patient",
        rating: 5,
      },
      {
        quote:
          "The assessment flagged that I was taking too many medications that could interfere with anesthesia. My GP reviewed everything and stopped two unnecessary ones. I felt safer going into surgery knowing this had been addressed.",
        author: "Robert K.",
        role: "Prostate Surgery Patient",
        rating: 5,
      },
      {
        quote:
          "I'm a surgeon myself and I took this before my own knee replacement. It's exactly the kind of systematic pre-operative assessment we should all be doing but rarely have time for.",
        author: "Dr. Andrew M.",
        role: "Orthopedic Surgeon & Patient",
        rating: 5,
      },
    ],
    paddingTop: 64,
    paddingBottom: 64,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 16,
  },
  render: ({ title, testimonials, paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, fontSize }) => (
    <section className="relative bg-gradient-to-r from-gray-50 to-gray-100" style={{ 
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      paddingLeft: `${paddingLeft}px`,
      paddingRight: `${paddingRight}px`,
      marginTop: `${marginTop}px`,
      marginBottom: `${marginBottom}px`,
      marginLeft: `${marginLeft}px`,
      marginRight: `${marginRight}px`
    }}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
            ))}
          </div>
          <h2 className="tracking-tight mb-2" style={{ fontSize: `clamp(${fontSize * 1.5}px, 4vw, ${fontSize * 2.5}px)` }}>{title}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating ?? 5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4" style={{ fontSize: `${fontSize * 0.875}px` }}>"{t.quote}"</p>
              <div className="space-y-1">
                <p className="font-medium" style={{ fontSize: `${fontSize}px` }}>{t.author}</p>
                <p className="text-muted-foreground" style={{ fontSize: `${fontSize * 0.875}px` }}>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
};

// Image Gallery (from Page B)
export const ImageGallerySection: ComponentConfig<{
  title: string;
  subtitle: string;
  images: Array<{ src: string; alt: string }>;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  fontSize: number;
}> = {
  fields: {
    title: { type: "text", label: "Title", contentEditable: true },
    subtitle: { type: "textarea", label: "Subtitle", contentEditable: true },
    images: {
      type: "array",
      label: "Images",
      getItemSummary: (item: { alt: string }) => item.alt || "Image",
      arrayFields: {
        src: { type: "text", label: "Image URL" },
        alt: { type: "text", label: "Alt Text" },
      },
    },
    paddingTop: {
      type: "number",
      label: "Padding Top (px)",
      min: 0,
      max: 200,
    },
    paddingBottom: {
      type: "number",
      label: "Padding Bottom (px)",
      min: 0,
      max: 200,
    },
    paddingLeft: {
      type: "number",
      label: "Padding Left (px)",
      min: 0,
      max: 200,
    },
    paddingRight: {
      type: "number",
      label: "Padding Right (px)",
      min: 0,
      max: 200,
    },
    marginTop: {
      type: "number",
      label: "Margin Top (px)",
      min: 0,
      max: 200,
    },
    marginBottom: {
      type: "number",
      label: "Margin Bottom (px)",
      min: 0,
      max: 200,
    },
    marginLeft: {
      type: "number",
      label: "Margin Left (px)",
      min: 0,
      max: 200,
    },
    marginRight: {
      type: "number",
      label: "Margin Right (px)",
      min: 0,
      max: 200,
    },
    fontSize: {
      type: "number",
      label: "Font Size (px)",
      min: 10,
      max: 100,
    },
  },
  defaultProps: {
    title: "See What's Possible\nWhen You Prepare Properly.",
    subtitle:
      "A picture speaks louder than words — here's a glimpse of the difference proper preparation can make before surgery.",
    images: [
      { src: "/src/assets/SurgeryHeroVarient1.webp", alt: "Preparation example" },
      { src: "/src/assets/SurgeryHeroVarient1.webp", alt: "Recovery example" },
      { src: "/src/assets/SurgeryHeroVarient1.webp", alt: "Results example" },
    ],
    paddingTop: 64,
    paddingBottom: 64,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 16,
  },
  render: ({ title, subtitle, images, paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, fontSize }) => (
    <section className="relative bg-white" style={{ 
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      paddingLeft: `${paddingLeft}px`,
      paddingRight: `${paddingRight}px`,
      marginTop: `${marginTop}px`,
      marginBottom: `${marginBottom}px`,
      marginLeft: `${marginLeft}px`,
      marginRight: `${marginRight}px`
    }}>
      <div className="max-w-5xl mx-auto px-4 text-left">
        <div className="space-y-6 mt-10">
          <h2 className="font-semibold tracking-tight leading-snug whitespace-pre-line" style={{ fontSize: `clamp(${fontSize * 1.5}px, 4vw, ${fontSize * 3.125}px)` }}>
            {title}
          </h2>
          <p className="text-muted-foreground max-w-2xl" style={{ fontSize: `clamp(${fontSize}px, 2vw, ${fontSize * 1.125}px)` }}>{subtitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {images.map((img, i) => (
              <div key={i} className="overflow-hidden rounded-2xl shadow-md">
                <ImageWithFallback
                  src={img.src}
                  alt={img.alt}
                  width={1024}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  className="object-cover w-full h-64 hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </section>
  ),
};

// Extended FAQ (from Page E/B)
export const ExtendedFAQSection: ComponentConfig<{
  title: string;
  items: Array<{ question: string; answer?: string; bullets?: Array<{ text: string }> }>;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  fontSize: number;
}> = {
  fields: {
    title: { type: "text", label: "Section Title", contentEditable: true },
    items: {
      type: "array",
      label: "FAQ Items",
      getItemSummary: (item: { question: string }) => item.question || "FAQ",
      arrayFields: {
        question: { type: "text", label: "Question", contentEditable: true },
        answer: { type: "textarea", label: "Answer (optional)", contentEditable: true },
        bullets: {
          type: "array",
          label: "Bulleted Points (optional)",
          getItemSummary: (item: { text: string }) => item?.text || "Bullet",
          arrayFields: {
            text: { type: "text", label: "Item", contentEditable: true },
          },
        },
      },
    },
    paddingTop: {
      type: "number",
      label: "Padding Top (px)",
      min: 0,
      max: 200,
    },
    paddingBottom: {
      type: "number",
      label: "Padding Bottom (px)",
      min: 0,
      max: 200,
    },
    paddingLeft: {
      type: "number",
      label: "Padding Left (px)",
      min: 0,
      max: 200,
    },
    paddingRight: {
      type: "number",
      label: "Padding Right (px)",
      min: 0,
      max: 200,
    },
    marginTop: {
      type: "number",
      label: "Margin Top (px)",
      min: 0,
      max: 200,
    },
    marginBottom: {
      type: "number",
      label: "Margin Bottom (px)",
      min: 0,
      max: 200,
    },
    marginLeft: {
      type: "number",
      label: "Margin Left (px)",
      min: 0,
      max: 200,
    },
    marginRight: {
      type: "number",
      label: "Margin Right (px)",
      min: 0,
      max: 200,
    },
    fontSize: {
      type: "number",
      label: "Font Size (px)",
      min: 10,
      max: 100,
    },
  },
  defaultProps: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Who is this assessment for?",
        bullets: [
          { text: "Men over 60 preparing for surgery" },
          { text: "Those with diabetes, high blood pressure, or heart problems" },
          { text: "Anyone worried about slow healing or complications" },
          { text: "Men who want to stay strong and independent after surgery" },
          { text: "Anyone who wants a simple plan to improve their outcome" },
        ],
      },
      {
        question: "How long does it take?",
        answer: "Less than 10 minutes. No fluff. No medical jargon. Just real answers.",
      },
    ],
    paddingTop: 64,
    paddingBottom: 64,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 16,
  },
  render: ({ title, items, paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, fontSize }) => (
    <section className="relative bg-gradient-to-r from-gray-50 to-gray-100" style={{ 
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      paddingLeft: `${paddingLeft}px`,
      paddingRight: `${paddingRight}px`,
      marginTop: `${marginTop}px`,
      marginBottom: `${marginBottom}px`,
      marginLeft: `${marginLeft}px`,
      marginRight: `${marginRight}px`
    }}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-semibold tracking-tight text-center mb-8" style={{ fontSize: `clamp(${fontSize * 1.25}px, 4vw, ${fontSize * 1.875}px)` }}>{title}</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {items.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx + 1}`} className="bg-white rounded-lg px-6 border-0 shadow-sm">
                <AccordionTrigger className="hover:no-underline" style={{ fontSize: `${fontSize}px` }}>{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2" style={{ fontSize: `${fontSize * 0.875}px` }}>
                  {item.answer && <p>{item.answer}</p>}
                  {Array.isArray(item.bullets) && item.bullets.length > 0 && (
                    <ul className="list-disc pl-6 space-y-1">
                      {item.bullets.map((b, i) => (
                        <li key={i}>{b.text}</li>
                      ))}
                    </ul>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  ),
};

// Logo Carousel wrapper
export const LogoCarouselSection: ComponentConfig<{
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  fontSize: number;
}> = {
  fields: {
    paddingTop: {
      type: "number",
      label: "Padding Top (px)",
      min: 0,
      max: 200,
    },
    paddingBottom: {
      type: "number",
      label: "Padding Bottom (px)",
      min: 0,
      max: 200,
    },
    paddingLeft: {
      type: "number",
      label: "Padding Left (px)",
      min: 0,
      max: 200,
    },
    paddingRight: {
      type: "number",
      label: "Padding Right (px)",
      min: 0,
      max: 200,
    },
    marginTop: {
      type: "number",
      label: "Margin Top (px)",
      min: 0,
      max: 200,
    },
    marginBottom: {
      type: "number",
      label: "Margin Bottom (px)",
      min: 0,
      max: 200,
    },
    marginLeft: {
      type: "number",
      label: "Margin Left (px)",
      min: 0,
      max: 200,
    },
    marginRight: {
      type: "number",
      label: "Margin Right (px)",
      min: 0,
      max: 200,
    },
    fontSize: {
      type: "number",
      label: "Font Size (px)",
      min: 10,
      max: 100,
    },
  },
  defaultProps: {
    paddingTop: 48,
    paddingBottom: 48,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 16,
  },
  render: ({ paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, fontSize }) => (
    <div className="container mx-auto px-4" style={{ 
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      paddingLeft: `${paddingLeft}px`,
      paddingRight: `${paddingRight}px`,
      marginTop: `${marginTop}px`,
      marginBottom: `${marginBottom}px`,
      marginLeft: `${marginLeft}px`,
      marginRight: `${marginRight}px`,
      fontSize: `${fontSize}px` 
    }}>
      <LogoCarousel />
    </div>
  ),
};
const sizeOptions = [
  { value: "xxxl", label: "XXXL" },
  { value: "xxl", label: "XXL" },
  { value: "xl", label: "XL" },
  { value: "l", label: "L" },
  { value: "m", label: "M" },
  { value: "s", label: "S" },
  { value: "xs", label: "XS" },
];
// Default Components - Heading
export const Heading: ComponentConfig<{
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  align: "left" | "center" | "right";
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  fontSize: number;
  color?: string;
  backgroundColor?: string;
}> = {
  fields: {
    text: { type: "text", label: "Heading Text", contentEditable: true },
    level: {
      type: "select",
      label: "Heading Level",
          options: [
            { label: "H1", value: 1 },
            { label: "H2", value: 2 },
            { label: "H3", value: 3 },
            { label: "H4", value: 4 },
            { label: "H5", value: 5 },
            { label: "H6", value: 6 },
          ],
    },
    align: {
      type: "select",
      label: "Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    paddingTop: { type: "number", label: "Padding Top (px)", min: 0, max: 200 },
    paddingBottom: { type: "number", label: "Padding Bottom (px)", min: 0, max: 200 },
    paddingLeft: { type: "number", label: "Padding Left (px)", min: 0, max: 200 },
    paddingRight: { type: "number", label: "Padding Right (px)", min: 0, max: 200 },
    marginTop: { type: "number", label: "Margin Top (px)", min: 0, max: 200 },
    marginBottom: { type: "number", label: "Margin Bottom (px)", min: 0, max: 200 },
    marginLeft: { type: "number", label: "Margin Left (px)", min: 0, max: 200 },
    marginRight: { type: "number", label: "Margin Right (px)", min: 0, max: 200 },
    fontSize: { type: "number", label: "Font Size (px)", min: 10, max: 100 },
    color: { type: "text", label: "Text Color (hex or name)" },
    backgroundColor: { type: "text", label: "Background Color (hex or name)" },
  },
  defaultProps: {
    text: "Heading Text",
    level: 2,
    align: "left",
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 16,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 24,
    color: "#111827",
    backgroundColor: "transparent",
  },
  render: ({ text, level, align, paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, fontSize, color, backgroundColor }) => {
    const sizeMultiplier = [2.5, 2, 1.75, 1.5, 1.25, 1.125][level - 1];
    const style = {
      fontSize: `${fontSize * sizeMultiplier}px`,
      fontWeight: "bold" as const,
      textAlign: align as "left" | "center" | "right",
      color: color || "#111827",
      backgroundColor: backgroundColor || "transparent",
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      paddingLeft: `${paddingLeft}px`,
      paddingRight: `${paddingRight}px`,
      marginTop: `${marginTop}px`,
      marginBottom: `${marginBottom}px`,
      marginLeft: `${marginLeft}px`,
      marginRight: `${marginRight}px`,
      margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
    };
    
    if (level === 1) return <h1 style={style}>{text}</h1>;
    if (level === 2) return <h2 style={style}>{text}</h2>;
    if (level === 3) return <h3 style={style}>{text}</h3>;
    if (level === 4) return <h4 style={style}>{text}</h4>;
    if (level === 5) return <h5 style={style}>{text}</h5>;
    return (
      <Section>
        <h6 style={style}>{text}</h6>
      </Section>
    );
  },
};

// Default Components - Text
export const Text: ComponentConfig<{
  content: string;
  align: "left" | "center" | "right" | "justify";
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  fontSize: number;
  color?: string;
  backgroundColor?: string;
  fontWeight?: "normal" | "bold" | "lighter";
}> = {
  fields: {
    content: { type: "textarea", label: "Text Content", contentEditable: true },
    align: {
      type: "select",
      label: "Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
        { label: "Justify", value: "justify" },
      ],
    },
    paddingTop: { type: "number", label: "Padding Top (px)", min: 0, max: 200 },
    paddingBottom: { type: "number", label: "Padding Bottom (px)", min: 0, max: 200 },
    paddingLeft: { type: "number", label: "Padding Left (px)", min: 0, max: 200 },
    paddingRight: { type: "number", label: "Padding Right (px)", min: 0, max: 200 },
    marginTop: { type: "number", label: "Margin Top (px)", min: 0, max: 200 },
    marginBottom: { type: "number", label: "Margin Bottom (px)", min: 0, max: 200 },
    marginLeft: { type: "number", label: "Margin Left (px)", min: 0, max: 200 },
    marginRight: { type: "number", label: "Margin Right (px)", min: 0, max: 200 },
    fontSize: { type: "number", label: "Font Size (px)", min: 10, max: 100 },
    color: { type: "text", label: "Text Color (hex or name)" },
    backgroundColor: { type: "text", label: "Background Color (hex or name)" },
    fontWeight: {
      type: "select",
      label: "Font Weight",
      options: [
        { label: "Normal", value: "normal" },
        { label: "Bold", value: "bold" },
        { label: "Lighter", value: "lighter" },
      ],
    },
  },
  defaultProps: {
    content: "Text content goes here...",
    align: "left",
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 16,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 16,
    color: "#374151",
    backgroundColor: "transparent",
    fontWeight: "normal",
  },
  render: ({ content, align, paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, fontSize, color, backgroundColor, fontWeight }) => (
    <p style={{
      fontSize: `${fontSize}px`,
      textAlign: align,
      color: color || "#374151",
      backgroundColor: backgroundColor || "transparent",
      fontWeight: fontWeight || "normal",
      lineHeight: "1.6",
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      paddingLeft: `${paddingLeft}px`,
      paddingRight: `${paddingRight}px`,
      marginTop: `${marginTop}px`,
      marginBottom: `${marginBottom}px`,
      marginLeft: `${marginLeft}px`,
      marginRight: `${marginRight}px`,
      margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
    }}>
      {content}
    </p>
  ),
};

// Default Components - Button
export const ButtonComponent: ComponentConfig<{
  text: string;
  href?: string;
  variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size: "default" | "sm" | "lg" | "icon";
  align: "left" | "center" | "right";
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  fontSize: number;
  fontColor?: string;
  backgroundColor?: string;
  onClick?: () => void;
}> = {
  fields: {
    text: { type: "text", label: "Button Text", contentEditable: true },
    variant: {
      type: "select",
      label: "Variant",
      options: [
        { label: "Default", value: "default" },
        { label: "Destructive", value: "destructive" },
        { label: "Outline", value: "outline" },
        { label: "Secondary", value: "secondary" },
        { label: "Ghost", value: "ghost" },
        { label: "Link", value: "link" },
      ],
    },
    href: { type: "text", label: "Link URL (optional)" },
    size: {
      type: "select",
      label: "Size",
      options: [
        { label: "Default", value: "default" },
        { label: "Small", value: "sm" },
        { label: "Large", value: "lg" },
        { label: "Icon", value: "icon" },
      ],
    },
    align: {
      type: "select",
      label: "Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    paddingTop: { type: "number", label: "Padding Top (px)", min: 0, max: 200 },
    paddingBottom: { type: "number", label: "Padding Bottom (px)", min: 0, max: 200 },
    paddingLeft: { type: "number", label: "Padding Left (px)", min: 0, max: 200 },
    paddingRight: { type: "number", label: "Padding Right (px)", min: 0, max: 200 },
    marginTop: { type: "number", label: "Margin Top (px)", min: 0, max: 200 },
    marginBottom: { type: "number", label: "Margin Bottom (px)", min: 0, max: 200 },
    marginLeft: { type: "number", label: "Margin Left (px)", min: 0, max: 200 },
    marginRight: { type: "number", label: "Margin Right (px)", min: 0, max: 200 },
    fontSize: { type: "number", label: "Font Size (px)", min: 10, max: 100 },
    fontColor: { type: "text", label: "Font Color (hex or name)" },
    backgroundColor: { type: "text", label: "Background Color (hex or name)" },
  },
  defaultProps: {
    text: "Click Me",
    href: "",
    variant: "default",
    size: "default",
    align: "center",
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 16,
    fontColor: undefined,
    backgroundColor: undefined,
  },
  render: ({
    text,
    href,
    variant,
    size,
    align,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    fontSize,
    fontColor,
    backgroundColor,
    onClick,
  }) => {
    const hasHref = Boolean(href && href.trim().length > 0);

    return (
      <div
        style={{
          textAlign: align,
          marginTop: `${marginTop}px`,
          marginBottom: `${marginBottom}px`,
          marginLeft: `${marginLeft}px`,
          marginRight: `${marginRight}px`,
          paddingTop: `${paddingTop}px`,
          paddingBottom: `${paddingBottom}px`,
          paddingLeft: `${paddingLeft}px`,
          paddingRight: `${paddingRight}px`,
        }}
      >
        <Button
          variant={variant}
          size={size}
          onClick={onClick}
          asChild={hasHref}
          style={{ 
            fontSize: `${fontSize}px`,
            ...(fontColor && { color: fontColor }),
            ...(backgroundColor && { backgroundColor: backgroundColor })
          }}
        >
          {hasHref ? (
            <a href={href} target="_self" rel="noreferrer">
              {text}
            </a>
          ) : (
            <span>{text}</span>
          )}
        </Button>
      </div>
    );
  },
};


// Default Components - Flex
export const Flex: ComponentConfig<{
  direction: "row" | "column" | "row-reverse" | "column-reverse";
  justify: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  align: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  gap: number;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
}> = {
  fields: {
    direction: {
      type: "select",
      label: "Direction",
      options: [
        { label: "Row", value: "row" },
        { label: "Column", value: "column" },
        { label: "Row Reverse", value: "row-reverse" },
        { label: "Column Reverse", value: "column-reverse" },
      ],
    },
    justify: {
      type: "select",
      label: "Justify Content",
      options: [
        { label: "Flex Start", value: "flex-start" },
        { label: "Flex End", value: "flex-end" },
        { label: "Center", value: "center" },
        { label: "Space Between", value: "space-between" },
        { label: "Space Around", value: "space-around" },
        { label: "Space Evenly", value: "space-evenly" },
      ],
    },
    align: {
      type: "select",
      label: "Align Items",
      options: [
        { label: "Flex Start", value: "flex-start" },
        { label: "Flex End", value: "flex-end" },
        { label: "Center", value: "center" },
        { label: "Stretch", value: "stretch" },
        { label: "Baseline", value: "baseline" },
      ],
    },
    gap: { type: "number", label: "Gap (px)", min: 0, max: 100 },
    paddingTop: { type: "number", label: "Padding Top (px)", min: 0, max: 200 },
    paddingBottom: { type: "number", label: "Padding Bottom (px)", min: 0, max: 200 },
    paddingLeft: { type: "number", label: "Padding Left (px)", min: 0, max: 200 },
    paddingRight: { type: "number", label: "Padding Right (px)", min: 0, max: 200 },
    marginTop: { type: "number", label: "Margin Top (px)", min: 0, max: 200 },
    marginBottom: { type: "number", label: "Margin Bottom (px)", min: 0, max: 200 },
    marginLeft: { type: "number", label: "Margin Left (px)", min: 0, max: 200 },
    marginRight: { type: "number", label: "Margin Right (px)", min: 0, max: 200 },
  },
  defaultProps: {
    direction: "row",
    justify: "flex-start",
    align: "flex-start",
    gap: 16,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  resolveData: ({ props, data }) => {
    return {
      props,
      readOnly: false,
    };
  },
  render: ({ direction, justify, align, gap, paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, puck: { renderDropZone } }) => (
    <div style={{
      display: "flex",
      flexDirection: direction,
      justifyContent: justify,
      alignItems: align,
      gap: `${gap}px`,
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      paddingLeft: `${paddingLeft}px`,
      paddingRight: `${paddingRight}px`,
      marginTop: `${marginTop}px`,
      marginBottom: `${marginBottom}px`,
      marginLeft: `${marginLeft}px`,
      marginRight: `${marginRight}px`,
    }}>
      {renderDropZone({ zone: "flex-items" })}
    </div>
  ),
  zones: {
    "flex-items": {
      title: "Flex Items",
    },
  },
};

// Default Components - Spacer
export const Spacer: ComponentConfig<{
  height: number;
  backgroundColor?: string;
}> = {
  fields: {
    height: { type: "number", label: "Height (px)", min: 0, max: 500 },
    backgroundColor: { type: "text", label: "Background Color (hex or name)" },
    direction: { type: "select", label: "Direction", options: [
      { label: "Vertical", value: "vertical" },
      { label: "Horizontal", value: "horizontal" },
      { label: "Both", value: "both" },
    ] },
  },
  defaultProps: {
    height: 40,
    backgroundColor: "transparent",
    direction: "vertical",
  },
  render: ({ height, backgroundColor, direction }) => (
    <div style={{ 
      height: direction === "vertical" ? `${height}px` : "100%", 
      width: direction === "horizontal" ? `${height}px` : "100%",
      backgroundColor: backgroundColor || "transparent"
    }} />
  ),
};

// Default Components - Stats
export const Stats: ComponentConfig<{
  items: Array<{ label: string; value: string }>;
  columns: number;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  fontSize: number;
  fontColor?: string;
  backgroundColor?: string;
}> = {
  fields: {
    items: {
      type: "array",
      label: "Stat Items",
      getItemSummary: (item: { label: string }) => item.label || "Stat",
      arrayFields: {
        label: { type: "text", label: "Label", contentEditable: true },
        value: { type: "text", label: "Value", contentEditable: true },
      },
    },
    columns: { type: "number", label: "Number of Columns", min: 1, max: 6 },
    paddingTop: { type: "number", label: "Padding Top (px)", min: 0, max: 200 },
    paddingBottom: { type: "number", label: "Padding Bottom (px)", min: 0, max: 200 },
    paddingLeft: { type: "number", label: "Padding Left (px)", min: 0, max: 200 },
    paddingRight: { type: "number", label: "Padding Right (px)", min: 0, max: 200 },
    marginTop: { type: "number", label: "Margin Top (px)", min: 0, max: 200 },
    marginBottom: { type: "number", label: "Margin Bottom (px)", min: 0, max: 200 },
    marginLeft: { type: "number", label: "Margin Left (px)", min: 0, max: 200 },
    marginRight: { type: "number", label: "Margin Right (px)", min: 0, max: 200 },
    fontSize: { type: "number", label: "Font Size (px)", min: 10, max: 100 },
    fontColor: { type: "text", label: "Font Color (hex or name)" },
    backgroundColor: { type: "text", label: "Background Color (hex or name)" },
  },
  defaultProps: {
    items: [
      { label: "Patients", value: "10,000+" },
      { label: "Success Rate", value: "98%" },
      { label: "Years", value: "5+" },
    ],
    columns: 3,
    paddingTop: 48,
    paddingBottom: 48,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 16,
    fontColor: "#111827",
    backgroundColor: "transparent",
  },
  render: ({ items, columns, paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, fontSize, fontColor, backgroundColor }) => (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: "24px",
      backgroundColor: backgroundColor || "transparent",
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      paddingLeft: `${paddingLeft}px`,
      paddingRight: `${paddingRight}px`,
      marginTop: `${marginTop}px`,
      marginBottom: `${marginBottom}px`,
      marginLeft: `${marginLeft}px`,
      marginRight: `${marginRight}px`,
    }}>
      {items.map((item, index) => (
        <div key={index} style={{ textAlign: "center" }}>
          <div style={{ fontSize: `${fontSize * 2}px`, fontWeight: "bold", color: fontColor || "#111827", marginBottom: "8px" }}>
            {item.value}
          </div>
          <div style={{ fontSize: `${fontSize}px`, color: fontColor || "#6b7280" }}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  ),
};

// Export the component config for Puck (after all components are defined)
export const puckConfig = {
  components: {
    // Custom Surgery Page Components
    HeroSection,
    TextSection,
    TestimonialSection,
    FAQSection,
    CTASection,
    SurgeryTypesSection,
    ComparisonTableSection,
    TestimonialsGridSection,
    ImageGallerySection,
    ExtendedFAQSection,
    LogoCarouselSection,
    // Layout Components (Demo-style)
    Columns,
    Flex,
    Grid,
    VerticalSpace,
    // Card Components
    Card,
    CardGrid,
    // Content Components
    Heading,
    Text,
    Button: ButtonComponent,
    Spacer,
    Stats,
  },
};