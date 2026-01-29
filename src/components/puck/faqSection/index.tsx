import React from "react";
import { ComponentConfig } from "@measured/puck";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Button } from "../../ui/button";

export const FAQSection: ComponentConfig<{
  title: string;
  faqs: Array<{
    question: string;
    answer: string;
    badges?: Array<{ label: string }>;
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
  accordionItemBackgroundColor?: string;
  accordionItemBorderRadius?: string;
  accordionItemPadding?: number;
  accordionItemBorder?: string;
  accordionFontColor?: string;
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
        },
        badges: {
          type: "array",
          label: "Badges (optional)",
          arrayFields: {
            label: {
              type: "text",
              label: "Badge Label",
            },
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
    fontColor: { type: "text", label: "Font Color (hex or name)" },
    backgroundColor: { type: "text", label: "Background Color (hex or name)" },
    accordionItemBackgroundColor: { type: "text", label: "Accordion Item Background Color" },
    accordionItemBorderRadius: { type: "text", label: "Accordion Item Border Radius (e.g., '8px')" },
    accordionItemPadding: { type: "number", label: "Accordion Item Padding (px)", min: 0, max: 100 },
    accordionItemBorder: { type: "text", label: "Accordion Item Border (e.g., 'none')" },
    accordionFontColor: { type: "text", label: "Accordion Font Color" },
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
    accordionItemBackgroundColor: "#f9fafb",
    accordionItemBorderRadius: "8px",
    accordionItemPadding: 24,
    accordionItemBorder: "none",
    accordionFontColor: "#374151",
  },
  render: ({ title, faqs, paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, fontSize, fontColor, backgroundColor, accordionItemBackgroundColor, accordionItemBorderRadius, accordionItemPadding, accordionItemBorder, accordionFontColor }) => (
    <section  style={{ 
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
                backgroundColor: accordionItemBackgroundColor || '#f9fafb',
                borderRadius: accordionItemBorderRadius || '8px',
                padding: `${accordionItemPadding || 24}px`,
                border: accordionItemBorder || 'none'
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
                color: accordionFontColor || '#374151',
                paddingTop: '8px',
                fontSize: `${fontSize * 0.875}px`
              }}>
                <div style={{ whiteSpace: 'pre-line' }}>{faq.answer}</div>
                {faq.badges && faq.badges.length > 0 && (
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '8px', 
                    marginTop: '12px' 
                  }}>
                    {faq.badges.map((badge, badgeIndex) => (
                      <Button
                        key={badgeIndex}
                        variant="outline"
                        size="sm"
                        style={{
                          height: 'auto',
                          padding: '2px 13px',
                          fontSize: '12px',
                          fontWeight: '500',
                          whiteSpace: 'nowrap',
                          borderRadius: '7px'
                        }}
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
    </section>
  ),
};
