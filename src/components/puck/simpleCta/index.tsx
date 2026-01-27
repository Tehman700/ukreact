import React from "react";
import { ComponentConfig } from "@measured/puck";

export const SimpleCTA: ComponentConfig<{
  title: string;
  buttonText: string;
  buttonLink: string;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  backgroundColor?: string;
  fontColor?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
}> = {
  fields: {
    title: {
      type: "text",
      label: "Title",
      contentEditable: true,
    },
    buttonText: {
      type: "text",
      label: "Button Text",
    },
    buttonLink: {
      type: "text",
      label: "Button Link",
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
    backgroundColor: {
      type: "text",
      label: "Background Color",
    },
    fontColor: {
      type: "text",
      label: "Font Color",
    },
    buttonBackgroundColor: {
      type: "text",
      label: "Button Background Color",
    },
    buttonTextColor: {
      type: "text",
      label: "Button Text Color",
    },
  },
  defaultProps: {
    title: "Reduce Risks, Recover Faster",
    buttonText: "Book Free Consultation Now",
    buttonLink: "#contact",
    paddingTop: 64,
    paddingBottom: 64,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: "#f9fafb",
    fontColor: "#111827",
    buttonBackgroundColor: "#000000",
    buttonTextColor: "#ffffff",
  },
  render: ({
    title,
    buttonText,
    buttonLink,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    backgroundColor,
    fontColor,
    buttonBackgroundColor,
    buttonTextColor,
  }) => {
    return (
      <section
        style={{
          background: backgroundColor || "#f9fafb",
          color: fontColor || "#111827",
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              {title}
            </h2>

            {/* Button */}
            <div>
              <a
                href={buttonLink}
                className="inline-block px-8 py-3 text-base font-semibold rounded-lg transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: buttonBackgroundColor || "#000000",
                  color: buttonTextColor || "#ffffff",
                }}
              >
                {buttonText}
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  },
};

export default SimpleCTA;
