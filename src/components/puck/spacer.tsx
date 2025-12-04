import React from "react";
import { ComponentConfig } from "@measured/puck";

export const Spacer: ComponentConfig<{
  height: number;
  backgroundColor?: string;
  direction: "vertical" | "horizontal" | "both";
}> = {
  fields: {
    height: { type: "number", label: "Height (px)", min: 0, max: 500 },
    backgroundColor: { type: "text", label: "Background Color (hex or name)" },
    direction: {
      type: "select",
      label: "Direction",
      options: [
        { label: "Vertical", value: "vertical" },
        { label: "Horizontal", value: "horizontal" },
        { label: "Both", value: "both" },
      ],
    },
  },
  defaultProps: {
    height: 40,
    backgroundColor: "transparent",
    direction: "vertical",
  },
  render: ({ height, backgroundColor, direction }) => (
    <div
      style={{
        height: direction === "vertical" ? `${height}px` : "100%",
        width: direction === "horizontal" ? `${height}px` : "100%",
        backgroundColor: backgroundColor || "transparent",
      }}
    />
  ),
};
