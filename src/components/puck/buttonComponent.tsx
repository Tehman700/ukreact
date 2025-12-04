import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Button } from "../ui/button";

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
