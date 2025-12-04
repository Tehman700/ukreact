import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Section } from "./Section";

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
    marginTop: { type: "number", label: "Margin Top (px)", min: 0, max: 200 },
    marginBottom: {
      type: "number",
      label: "Margin Bottom (px)",
      min: 0,
      max: 200,
    },
    marginLeft: { type: "number", label: "Margin Left (px)", min: 0, max: 200 },
    marginRight: {
      type: "number",
      label: "Margin Right (px)",
      min: 0,
      max: 200,
    },
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
  render: ({
    text,
    level,
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
    color,
    backgroundColor,
  }) => {
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
