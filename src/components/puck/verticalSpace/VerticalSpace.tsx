import React from "react";
import { ComponentConfig } from "@measured/puck";

export type VerticalSpaceProps = {
  size: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
  backgroundColor?: string;
};

const sizeMap = {
  xxs: 8,
  xs: 16,
  s: 24,
  m: 48,
  l: 72,
  xl: 96,
  xxl: 144,
};

export const VerticalSpace: ComponentConfig<VerticalSpaceProps> = {
  fields: {
    size: {
      type: "select",
      label: "Space Size",
      options: [
        { label: "XXS (8px)", value: "xxs" },
        { label: "XS (16px)", value: "xs" },
        { label: "S (24px)", value: "s" },
        { label: "M (48px)", value: "m" },
        { label: "L (72px)", value: "l" },
        { label: "XL (96px)", value: "xl" },
        { label: "XXL (144px)", value: "xxl" },
      ],
    },
    backgroundColor: {
      type: "text",
      label: "Background Color (e.g., transparent, #f0f0f0)",
    },
  },
  defaultProps: {
    size: "m",
    backgroundColor: "transparent",
  },
  render: ({ size, backgroundColor }) => {
    return <div style={{ height: sizeMap[size], width: "100%", backgroundColor: backgroundColor || "transparent" }} />;
  },
};
