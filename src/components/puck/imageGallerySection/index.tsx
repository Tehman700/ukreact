import React from "react";
import { ComponentConfig } from "@measured/puck";
import { ImageWithFallback } from "../../figma/ImageWithFallback";

export const ImageGallerySection: ComponentConfig<{
  title: string;
  subtitle: string;
  images: Array<{ src: string; alt: string }>;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  fontSize: number;
  backgroundColor?: string;
  fontHeaderColor?: string;
  fontSubHeaderColor?: string;
}> = {
  fields: {
    title: { type: "text", label: "Title", contentEditable: true },
    subtitle: { type: "textarea", label: "Subtitle", contentEditable: true },
    images: {
      type: "array",
      label: "Images",
      getItemSummary: (item: { alt: string }) => item.alt || "Image",
      arrayFields: {
        src: { type: "text", label: "Image URL" },
        alt: { type: "text", label: "Alt Text" },
      },
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
    fontSize: {
      type: "number",
      label: "Font Size (px)",
      min: 10,
      max: 100,
    },
    backgroundColor: {
      type: "text",
      label: "Background Color",
    },
    fontHeaderColor: {
      type: "text",
      label: "Font Color",
    },
    fontSubHeaderColor: {
      type: "text",
      label: "Subtitle Font Color",
    },
  },
  defaultProps: {
    title: "See What's Possible\nWhen You Prepare Properly.",
    subtitle:
      "A picture speaks louder than words — here's a glimpse of the difference proper preparation can make before surgery.",
    images: [
      { src: "/src/assets/SurgeryHeroVarient1.webp", alt: "Preparation example" },
      { src: "/src/assets/SurgeryHeroVarient1.webp", alt: "Recovery example" },
      { src: "/src/assets/SurgeryHeroVarient1.webp", alt: "Results example" },
    ],
    paddingTop: 64,
    paddingBottom: 64,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 16,
    backgroundColor: "#ffffff",
    fontHeaderColor: "#111827",
    fontSubHeaderColor: "#6b7280",
  },
  render: ({ title, subtitle, images, paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, fontSize, backgroundColor, fontHeaderColor, fontSubHeaderColor }) => (
    <section className="relative " style={{ 
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      paddingLeft: `${paddingLeft}px`,
      paddingRight: `${paddingRight}px`,
      marginTop: `${marginTop}px`,
      marginBottom: `${marginBottom}px`,
      marginLeft: `${marginLeft}px`,
      marginRight: `${marginRight}px`,
      backgroundColor: backgroundColor || "#ffffff",

    }}>
      <div className="max-w-5xl mx-auto px-4 text-left">
        <div className="space-y-6 mt-10">
          <h2 className="font-semibold tracking-tight leading-snug whitespace-pre-line" style={{ fontSize: `clamp(${fontSize * 1.5}px, 4vw, ${fontSize * 3.125}px)`, color: fontHeaderColor || "#111827" }}>
            {title}
          </h2>
          <p className="text-muted-foreground max-w-2xl" style={{ fontSize: `clamp(${fontSize}px, 2vw, ${fontSize * 1.125}px)`, color: fontSubHeaderColor || "#6b7280" }}>{subtitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {images.map((img, i) => (
              <div key={i} className="overflow-hidden rounded-2xl shadow-md">
                <ImageWithFallback
                  src={img.src}
                  alt={img.alt ?? "Gallery Image"}
                  width={1024}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  className="object-cover w-full h-64 hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </section>
  ),
};
