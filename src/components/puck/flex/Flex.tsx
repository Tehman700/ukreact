import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Section } from "../Section";

export type FlexProps = {
  justifyContent: "start" | "center" | "end" | "space-between" | "space-around";
  direction: "row" | "column";
  gap: number;
  wrap: "wrap" | "nowrap";
  alignItems: "start" | "center" | "end" | "stretch";
  minItemWidth?: number;
  fontColor?: string;
  backgroundColor?: string;
};

export const Flex: ComponentConfig<FlexProps> = {
  fields: {
    direction: {
      label: "Direction",
      type: "radio",
      options: [
        { label: "Row", value: "row" },
        { label: "Column", value: "column" },
      ],
    },
    justifyContent: {
      label: "Justify Content",
      type: "select",
      options: [
        { label: "Start", value: "start" },
        { label: "Center", value: "center" },
        { label: "End", value: "end" },
        { label: "Space Between", value: "space-between" },
        { label: "Space Around", value: "space-around" },
      ],
    },
    alignItems: {
      label: "Align Items",
      type: "radio",
      options: [
        { label: "Start", value: "start" },
        { label: "Center", value: "center" },
        { label: "End", value: "end" },
        { label: "Stretch", value: "stretch" },
      ],
    },
    gap: {
      label: "Gap (px)",
      type: "number",
      min: 0,
      max: 100,
    },
    wrap: {
      label: "Wrap",
      type: "radio",
      options: [
        { label: "Wrap", value: "wrap" },
        { label: "No Wrap", value: "nowrap" },
      ],
    },
    minItemWidth: {
      label: "Min Item Width (px)",
      type: "number",
      min: 0,
    },
    fontColor: {
      type: "text",
      label: "Font Color (e.g., #111827)",
    },
    backgroundColor: {
      type: "text",
      label: "Background Color (e.g., transparent)",
    },
  },
  defaultProps: {
    justifyContent: "start",
    direction: "row",
    gap: 24,
    wrap: "wrap",
    alignItems: "stretch",
    fontColor: "inherit",
    backgroundColor: "transparent",
  },
  render: ({ 
    justifyContent, 
    direction, 
    gap, 
    wrap, 
    alignItems = "stretch",
    minItemWidth,
    fontColor,
    backgroundColor,
    puck
  }) => (
    <Section maxWidth="100%">
      <div
        style={{
          display: "flex",
          flexDirection: direction,
          justifyContent,
          alignItems,
          gap: `${gap}px`,
          flexWrap: wrap,
          width: "100%",
          color: fontColor || "inherit",
          backgroundColor: backgroundColor || "transparent",
        }}
      >
        {puck.renderDropZone({ 
          zone: "flex-items",
          style: {
            display: "flex",
            flexDirection: direction,
            justifyContent,
            alignItems,
            gap: `${gap}px`,
            flexWrap: wrap,
            width: "100%",
          }
        })}
      </div>
    </Section>
  ),
  zones: {
    "flex-items": {
      title: "Flex Items",
    },
  },
};