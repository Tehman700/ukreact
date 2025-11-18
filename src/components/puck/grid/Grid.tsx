import React from "react";
import { ComponentConfig } from "@measured/puck";
import { withLayout } from "../withLayout";

export type GridProps = {
  columns: number;
  gap: number;
  rowGap?: number;
  columnGap?: number;
  alignItems?: "start" | "center" | "end" | "stretch";
  justifyItems?: "start" | "center" | "end" | "stretch";
  minColumnWidth?: string;
  responsive?: boolean;
  fontColor?: string;
  backgroundColor?: string;
};

const GridInternal: ComponentConfig<GridProps> = {
  fields: {
    columns: { 
      type: "number", 
      label: "Number of Columns", 
      min: 1, 
      max: 12,
    },
    gap: { 
      type: "number", 
      label: "Gap (px)", 
      min: 0, 
      max: 100,
    },
    rowGap: { 
      type: "number", 
      label: "Row Gap (px) - Optional", 
      min: 0, 
      max: 100,
    },
    columnGap: { 
      type: "number", 
      label: "Column Gap (px) - Optional", 
      min: 0, 
      max: 100,
    },
    alignItems: {
      type: "select",
      label: "Align Items",
      options: [
        { label: "Start", value: "start" },
        { label: "Center", value: "center" },
        { label: "End", value: "end" },
        { label: "Stretch", value: "stretch" },
      ],
    },
    justifyItems: {
      type: "select",
      label: "Justify Items",
      options: [
        { label: "Start", value: "start" },
        { label: "Center", value: "center" },
        { label: "End", value: "end" },
        { label: "Stretch", value: "stretch" },
      ],
    },
    minColumnWidth: {
      type: "text",
      label: "Min Column Width (e.g., 250px, 20rem)",
    },
    responsive: {
      type: "radio",
      label: "Responsive (Auto-fit columns)",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
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
    columns: 3,
    gap: 24,
    alignItems: "stretch",
    justifyItems: "stretch",
    minColumnWidth: "250px",
    responsive: false,
    fontColor: "inherit",
    backgroundColor: "transparent",
  },
  render: ({ 
    columns, 
    gap, 
    rowGap,
    columnGap,
    alignItems,
    justifyItems,
    minColumnWidth,
    responsive,
    fontColor,
    backgroundColor,
    puck
  }) => {
    const gridStyles: React.CSSProperties = {
      display: "grid",
      gap: gap,
      ...(rowGap !== undefined && { rowGap }),
      ...(columnGap !== undefined && { columnGap }),
      gridTemplateColumns: responsive 
        ? `repeat(auto-fit, minmax(${minColumnWidth || "250px"}, 1fr))`
        : `repeat(${columns}, 1fr)`,
      alignItems: alignItems || "stretch",
      justifyItems: justifyItems || "stretch",
      width: "100%",
      color: fontColor || "inherit",
      backgroundColor: backgroundColor || "transparent",
    };

    return (
      <div style={{ width: "100%" }}>
        {puck.renderDropZone({ 
          zone: "grid-items",
          style: gridStyles
        })}
      </div>
    );
  },
  zones: {
    "grid-items": {
      title: "Grid Items",
    },
  },
};

export const Grid = withLayout(GridInternal);