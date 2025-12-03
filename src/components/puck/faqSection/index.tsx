import React from "react";
import { ComponentConfig } from "@measured/puck";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";

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
