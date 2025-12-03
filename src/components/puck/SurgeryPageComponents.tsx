import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Button } from "../ui/button";
import { Card } from "./card";
import { Grid } from "./grid";
import { CardGrid } from "./cardGrid";
import { Columns } from "./columns";
import { VerticalSpace } from "./verticalSpace";
import { Section } from "./Section";

// Import separated components
import { HeroSection } from "./heroSection";
import { TextSection } from "./textSection";
import { Image } from "./image";
import { TestimonialSection } from "./testimonialSection";
import { FAQSection } from "./faqSection";
import { CTASection } from "./ctaSection";
import { ComparisonTableSection } from "./comparisonTableSection";
import { TestimonialsGridSection } from "./testimonialsGridSection";
import { ImageGallerySection } from "./imageGallerySection";
import { ExtendedFAQSection } from "./extendedFAQSection";
import { LogoCarouselSection } from "./logoCarouselSection";

// Default Components - Heading
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

// Default Components - Text
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

// Default Components - Button
export const ButtonComponent: ComponentConfig<{
  text: string;
  href?: string;
  variant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size: "default" | "sm" | "lg" | "icon";
  align: "left" | "center" | "right";
  width?: number;
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
  onClick?: () => void;
}> = {
  fields: {
    text: { type: "text", label: "Button Text", contentEditable: true },
    variant: {
      type: "select",
      label: "Variant",
      options: [
        { label: "Default", value: "default" },
        { label: "Destructive", value: "destructive" },
        { label: "Outline", value: "outline" },
        { label: "Secondary", value: "secondary" },
        { label: "Ghost", value: "ghost" },
        { label: "Link", value: "link" },
      ],
    },
    href: { type: "text", label: "Link URL (optional)" },
    size: {
      type: "select",
      label: "Size",
      options: [
        { label: "Default", value: "default" },
        { label: "Small", value: "sm" },
        { label: "Large", value: "lg" },
        { label: "Icon", value: "icon" },
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
    width: { type: "number", label: "Width (px, optional)", min: 0, max: 1000 },
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
    text: "Click Me",
    href: "",
    variant: "default",
    size: "default",
    align: "center",
    width: undefined,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 16,
    fontColor: undefined,
    backgroundColor: undefined,
  },
  render: ({
    text,
    href,
    variant,
    size,
    align,
    width,
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
    onClick,
  }) => {
    const hasHref = Boolean(href && href.trim().length > 0);

    return (
      <div
        style={{
          textAlign: align,
          marginTop: `${marginTop}px`,
          marginBottom: `${marginBottom}px`,
          marginLeft: `${marginLeft}px`,
          marginRight: `${marginRight}px`,
          paddingTop: `${paddingTop}px`,
          paddingBottom: `${paddingBottom}px`,
          paddingLeft: `${paddingLeft}px`,
          paddingRight: `${paddingRight}px`,
        }}
      >
        <Button
          variant={variant}
          size={size}
          onClick={onClick}
          asChild={hasHref}
          style={{
            fontSize: `${fontSize}px`,
            ...(fontColor && { color: fontColor }),
            ...(backgroundColor && { backgroundColor: backgroundColor }),
            ...(width && { width: `${width}px` }),
          }}
        >
          {hasHref ? (
            <a href={href} target="_self" rel="noreferrer">
              {text}
            </a>
          ) : (
            <span>{text}</span>
          )}
        </Button>
      </div>
    );
  },
};

// Default Components - Flex
export const Flex: ComponentConfig<{
  direction: "row" | "column" | "row-reverse" | "column-reverse";
  justify:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  gap: number;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
}> = {
  fields: {
    direction: {
      type: "select",
      label: "Direction",
      options: [
        { label: "Row", value: "row" },
        { label: "Column", value: "column" },
        { label: "Row Reverse", value: "row-reverse" },
        { label: "Column Reverse", value: "column-reverse" },
      ],
    },
    justify: {
      type: "select",
      label: "Justify Content",
      options: [
        { label: "Flex Start", value: "flex-start" },
        { label: "Flex End", value: "flex-end" },
        { label: "Center", value: "center" },
        { label: "Space Between", value: "space-between" },
        { label: "Space Around", value: "space-around" },
        { label: "Space Evenly", value: "space-evenly" },
      ],
    },
    align: {
      type: "select",
      label: "Align Items",
      options: [
        { label: "Flex Start", value: "flex-start" },
        { label: "Flex End", value: "flex-end" },
        { label: "Center", value: "center" },
        { label: "Stretch", value: "stretch" },
        { label: "Baseline", value: "baseline" },
      ],
    },
    gap: { type: "number", label: "Gap (px)", min: 0, max: 100 },
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
  },
  defaultProps: {
    direction: "row",
    justify: "flex-start",
    align: "flex-start",
    gap: 16,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  resolveData: ({ props, data }) => {
    return {
      props,
      readOnly: false,
    };
  },
  render: ({
    direction,
    justify,
    align,
    gap,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    puck: { renderDropZone },
  }) => (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        gap: `${gap}px`,
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
      {renderDropZone({ zone: "flex-items" })}
    </div>
  ),
  zones: {
    "flex-items": {
      title: "Flex Items",
    },
  },
};

// Default Components - Spacer
export const Spacer: ComponentConfig<{
  height: number;
  backgroundColor?: string;
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

// Default Components - Stats
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

// Export the component config for Puck (after all components are defined)
export const puckConfig = {
  root: {
    fields: {
      title: { type: "text", label: "Page Title" },
      assessmentName: { type: "text", label: "Assessment Name" },
      assessmentDescription: { type: "textarea", label: "Assessment Description" },
      assessmentPrice: { type: "number", label: "Assessment Price (£)" },
    },
  },
  components: {
    HeroSection,
    TextSection,
    TestimonialSection,
    FAQSection,
    CTASection,
    ComparisonTableSection,
    TestimonialsGridSection,
    ImageGallerySection,
    ExtendedFAQSection,
    LogoCarouselSection,
    Image,
    Columns,
    Flex,
    Grid,
    VerticalSpace,
    Card,
    CardGrid,
    Heading,
    Text,
    Button: ButtonComponent,
    Spacer,
    Stats,
  },
};
