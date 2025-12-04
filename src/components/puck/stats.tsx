import React from "react";
import { ComponentConfig } from "@measured/puck";

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
  render: ({
    items,
    columns,
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
  }) => (
    <div
      style={{
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
      }}
    >
      {items.map((item, index) => (
        <div key={index} style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: `${fontSize * 2}px`,
              fontWeight: "bold",
              color: fontColor || "#111827",
              marginBottom: "8px",
            }}
          >
            {item.value}
          </div>
          <div
            style={{ fontSize: `${fontSize}px`, color: fontColor || "#6b7280" }}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  ),
};
