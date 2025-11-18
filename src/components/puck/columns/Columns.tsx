import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Section } from "../Section";

export type ColumnsProps = {
  distribution: "auto" | "manual";
  columns: Array<{
    span?: number;
  }>;
  fontColor?: string;
  backgroundColor?: string;
};

const ColumnsInternal: ComponentConfig<ColumnsProps> = {
  fields: {
    distribution: {
      type: "radio",
      label: "Column Distribution",
      options: [
        { label: "Auto", value: "auto" },
        { label: "Manual", value: "manual" },
      ],
    },
    columns: {
      type: "array",
      label: "Columns",
      arrayFields: {
        span: {
          label: "Column Span (1-12)",
          type: "number",
          min: 1,
          max: 12,
        },
      },
      defaultItemProps: {
        span: 6,
      },
      getItemSummary: (col, id) =>
        `Column ${(id ?? 0) + 1}, span ${
          col.span ? col.span : "auto"
        }`,
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
    distribution: "auto",
    columns: [{}, {}],
    fontColor: "inherit",
    backgroundColor: "transparent",
  },
  render: ({ columns, distribution, fontColor, backgroundColor, puck: { renderDropZone } }) => {
    return (
      <Section maxWidth="100%">
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              distribution === "auto"
                ? `repeat(${columns.length}, 1fr)`
                : `repeat(12, 1fr)`,
            gap: 16,
            width: "100%",
            color: fontColor || "inherit",
            backgroundColor: backgroundColor || "transparent",
          }}
        >
          {columns.map(({ span }, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                gridColumn:
                  distribution === "manual"
                    ? span
                      ? `span ${Math.max(Math.min(span, 12), 1)}`
                      : "span 6"
                    : "",
              }}
            >
              {renderDropZone({
                zone: `column-${idx}`,
              })}
            </div>
          ))}
        </div>
      </Section>
    );
  },
  zones: (data) =>
    data.columns?.reduce(
      (acc, _, idx) => {
        acc[`column-${idx}`] = {
          title: `Column ${idx + 1}`,
        };
        return acc;
      },
      {} as Record<string, { title: string }>
    ) ?? {},
};

export const Columns = ColumnsInternal;
