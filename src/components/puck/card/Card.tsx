import React from "react";
import { ComponentConfig } from "@measured/puck";
import * as Icons from "lucide-react";

const iconOptions = Object.keys(Icons)
  .filter((iconName) => {
    const Icon = Icons[iconName as keyof typeof Icons];
    return typeof Icon === "function";
  })
  .map((iconName) => ({
    label: iconName,
    value: iconName,
  }));

export type CardProps = {
  title?: string;
  content: string;
  icon?: string;
  mode: "card" | "flat" | "bordered" | "elevated";
  align: "left" | "center" | "right";
  padding?: string;
  backgroundColor?: string;
  borderRadius?: string;
  showIcon?: boolean;
  iconSize?: number;
  iconColor?: string;
  titleSize?: string;
  titleColor?: string;
  contentSize?: string;
  contentColor?: string;
  maxWidth?: string;
};

export const Card: ComponentConfig<CardProps> = {
  fields: {
    title: { 
      type: "text", 
      label: "Title (optional)",
      contentEditable: true,
    },
    content: { 
      type: "textarea", 
      label: "Content",
      contentEditable: true,
    },
    icon: {
      type: "select",
      label: "Icon",
      options: iconOptions,
    },
    showIcon: {
      type: "radio",
      label: "Show Icon",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    mode: {
      type: "radio",
      label: "Card Style",
      options: [
        { label: "Flat", value: "flat" },
        { label: "Card", value: "card" },
        { label: "Bordered", value: "bordered" },
        { label: "Elevated", value: "elevated" },
        { label: "Outlined", value: "outlined" }
      ],
    },
    align: {
      type: "radio",
      label: "Text Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    padding: {
      type: "text",
      label: "Padding (e.g., 1.5rem)",
    },
    backgroundColor: {
      type: "text",
      label: "Background Color (e.g., #f5f5f5, transparent)",
    },
    borderRadius: {
      type: "text",
      label: "Border Radius (e.g., 0.5rem, 12px)",
    },
    iconSize: {
      type: "number",
      label: "Icon Size (px)",
      min: 16,
      max: 64,
    },
    iconColor: {
      type: "text",
      label: "Icon Color (e.g., #3b82f6)",
    },
    titleSize: {
      type: "text",
      label: "Title Font Size (e.g., 1.5rem)",
    },
    titleColor: {
      type: "text",
      label: "Title Color (e.g., #1f2937)",
    },
    contentSize: {
      type: "text",
      label: "Content Font Size (e.g., 1rem)",
    },
    contentColor: {
      type: "text",
      label: "Content Color (e.g., #6b7280)",
    },
    maxWidth: {
      type: "text",
      label: "Max Width (e.g., 400px, 100%)",
    },
  },
  defaultProps: {
    title: "Card Title",
    content: "Card content goes here. You can add detailed information about your product, service, or feature.",
    icon: "Heart",
    mode: "card",
    align: "left",
    showIcon: true,
    padding: "1.5rem",
    backgroundColor: "white",
    borderRadius: "0.75rem",
    iconSize: 32,
    iconColor: "#3b82f6",
    titleSize: "1.5rem",
    titleColor: "#1f2937",
    contentSize: "1rem",
    contentColor: "#6b7280",
    maxWidth: "100%",
  },
  render: ({ 
    title, 
    content, 
    icon, 
    mode, 
    align,
    padding,
    backgroundColor,
    borderRadius,
    showIcon,
    iconSize,
    iconColor,
    titleSize,
    titleColor,
    contentSize,
    contentColor,
    maxWidth,
  }) => {
    const IconComponent = icon ? Icons[icon as keyof typeof Icons] : null;
    
    const cardStyles: React.CSSProperties = {
      padding: padding || "1.5rem",
      backgroundColor: backgroundColor || "white",
      borderRadius: borderRadius || "0.75rem",
      textAlign: align || "left",
      maxWidth: maxWidth || "100%",
      width: "100%",
      ...(mode === "card" && {
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      }),
      ...(mode === "bordered" && {
        border: "1px solid #e5e7eb",
      }),
      ...(mode === "elevated" && {
        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      }),
    };

    const iconContainerStyles: React.CSSProperties = {
      display: "flex",
      justifyContent: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
      marginBottom: "1rem",
      color: iconColor || "#3b82f6",
    };

    const titleStyles: React.CSSProperties = {
      fontSize: titleSize || "1.5rem",
      fontWeight: 600,
      marginBottom: "0.75rem",
      color: titleColor || "#1f2937",
    };

    const contentStyles: React.CSSProperties = {
      fontSize: contentSize || "1rem",
      color: contentColor || "#6b7280",
      lineHeight: 1.6,
    };

    return (
      <div style={cardStyles}>
        {showIcon && IconComponent && (
          <div style={iconContainerStyles}>
            <IconComponent size={iconSize || 32} />
          </div>
        )}
        {title && <div style={titleStyles}>{title}</div>}
        <div style={contentStyles}>{content}</div>
      </div>
    );
  },
};