import React from "react";
import { ComponentConfig } from "@measured/puck";
import { ImageWithFallback } from "../../figma/ImageWithFallback";

export const Image: ComponentConfig<{
  src: string;
  alt: string;
  fullScreen: boolean;
  align: "left" | "center" | "right" | "justify";
  shadowSize: "none" | "xs" | "small" | "medium" | "large" | "xl" | "2xl";
  borderRadius: number;
  width?: number;
  height?: number;
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
    src: {
      type: "text",
      label: "Image URL",
    },
    alt: {
      type: "text",
      label: "Alt Text",
    },
    fullScreen: {
      type: "radio",
      label: "Display Mode",
      options: [
        { label: "Card Shaped", value: false },
        { label: "Full Screen", value: true },
      ],
    },
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
    shadowSize: {
      type: "select",
      label: "Shadow Size",
      options: [
        { label: "None", value: "none" },
        { label: "Extra Small", value: "xs" },
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
        { label: "Extra Large", value: "xl" },
        { label: "2X Large", value: "2xl" },
      ],
    },
    borderRadius: {
      type: "number",
      label: "Border Radius (px)",
      min: 0,
      max: 50,
    },
    width: {
      type: "number",
      label: "Width (px, optional)",
      min: 0,
      max: 2000,
    },
    height: {
      type: "number",
      label: "Height (px, optional)",
      min: 0,
      max: 2000,
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
  },
  defaultProps: {
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&h=500&fit=crop",
    alt: "Image",
    fullScreen: false,
    align: "center",
    shadowSize: "medium",
    borderRadius: 8,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  render: ({ src, alt, fullScreen, align, shadowSize, borderRadius, width, height, paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight }) => {
    const shadowStyles = {
      none: "none",
      xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      small: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      medium: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      large: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    };

    const containerStyle: React.CSSProperties = fullScreen
      ? {
          paddingTop: `${paddingTop}px`,
          paddingBottom: `${paddingBottom}px`,
          paddingLeft: `${paddingLeft}px`,
          paddingRight: `${paddingRight}px`,
          marginTop: `${marginTop}px`,
          marginBottom: `${marginBottom}px`,
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          textAlign: align,
        }
      : {
          paddingTop: `${paddingTop}px`,
          paddingBottom: `${paddingBottom}px`,
          paddingLeft: `${paddingLeft}px`,
          paddingRight: `${paddingRight}px`,
          marginTop: `${marginTop}px`,
          marginBottom: `${marginBottom}px`,
          marginLeft: `${marginLeft}px`,
          marginRight: `${marginRight}px`,
          width: "100%",
          textAlign: align,
        };

    const imageStyle: React.CSSProperties = {
      ...(width && { width: `${width}px` }) ||  { width: "100%" },
      ...(height && { height: `${height}px` }) || { height: "auto" },
      display: "inline-block",
      borderRadius: fullScreen ? "0" : `${borderRadius}px`,
      boxShadow: shadowStyles[shadowSize],
      margin: "0 auto",
    };

    return (
      <div style={containerStyle}>
        <ImageWithFallback src={src} alt={alt} style={imageStyle} />
      </div>
    );
  },
};
