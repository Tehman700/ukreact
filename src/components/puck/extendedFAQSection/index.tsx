import React from "react";
import { ComponentConfig } from "@measured/puck";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";

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
