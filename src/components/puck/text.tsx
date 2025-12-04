import React from "react";
import { ComponentConfig } from "@measured/puck";

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
  render: ({
    content,
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
    fontWeight,
  }) => (
    <p
      style={{
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
      }}
    >
      {content}
    </p>
  ),
};
