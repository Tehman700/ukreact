import React from "react";
import { ComponentConfig } from "@measured/puck";

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
