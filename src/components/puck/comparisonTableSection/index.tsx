import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Check, X } from "lucide-react";

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
  fontColor?: string;
  backgroundColor?: string;
  fontHeaderColor?: string;
  fontSubHeaderColor?: string;
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
        lhsCheck: { 
          type: "radio", 
          label: "Left Checkmark",
          options: [
            { label: "No", value: false },
            { label: "Yes", value: true },
          ],
        },
        rhsCheck: { 
          type: "radio", 
          label: "Right Checkmark",
          options: [
            { label: "No", value: false },
            { label: "Yes", value: true },
          ],
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
    backgroundColor: {
      type: "text",
      label: "Background Color",
    },
    fontHeaderColor: { type: "text", label: "Header Font Color" },
    fontSubHeaderColor: { type: "text", label: "Subheader Font Color" },
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
    fontColor: "#111827",
    backgroundColor: "#ffffff",
    fontHeaderColor: "#111827",
    fontSubHeaderColor: "#6b7280",
  },
  render: ({ title, subtitle, lhsLabel, rhsLabel, rows, paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, fontSize, fontColor = "#111827", backgroundColor = "#ffffff", fontHeaderColor = "#111827", fontSubHeaderColor = "#6b7280" }) => (
    <section className="relative bg-white" style={{ 
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      paddingLeft: `${paddingLeft}px`,
      paddingRight: `${paddingRight}px`,
      marginTop: `${marginTop}px`,
      marginBottom: `${marginBottom}px`,
      marginLeft: `${marginLeft}px`,
      marginRight: `${marginRight}px`,
      backgroundColor: backgroundColor
    }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="tracking-tight mb-4" style={{ fontSize: `clamp(${fontSize * 1.5}px, 4vw, ${fontSize * 2.5}px)`, color: fontColor }}>{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" style={{ fontSize: `${fontSize * 1.125}px`, color: fontSubHeaderColor }}>{subtitle}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 min-w-[200px]" style={{ fontSize: `${fontSize}px`,color: fontColor  }}></th>
                <th className="text-center py-4 px-4 min-w-[200px]">
                  <div className="inline-block px-4 py-2 bg-primary/10 rounded-lg" style={{ fontSize: `${fontSize}px`, color: fontHeaderColor }}>{lhsLabel}</div>
                </th>
                <th className="text-center py-4 px-4 min-w-[200px] text-muted-foreground" style={{ fontSize: `${fontSize}px`, color: fontSubHeaderColor }}>{rhsLabel}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row, idx) => (
                <tr key={idx}>
                  <td className="py-4 px-4" style={{ fontSize: `${fontSize}px`, color: fontColor }}>{row.label}</td>
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
                        <span className="text-muted-foreground" style={{ fontSize: `${fontSize * 0.875}px`, color: fontSubHeaderColor}}>{row.rhs}</span>
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
