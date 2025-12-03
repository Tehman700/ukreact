import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Button } from "../../ui/button";

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
