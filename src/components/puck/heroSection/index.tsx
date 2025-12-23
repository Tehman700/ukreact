import React from "react";
import { ComponentConfig } from "@measured/puck";
import { ImageWithFallback } from "../../figma/ImageWithFallback";

export const HeroSection: ComponentConfig<{
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
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
  fontHeaderColor?: string;
  fontSubHeaderColor?: string;
}> = {
  fields: {
    title: {
      type: "text",
      label: "Main Title",
      contentEditable: true,
    },
    subtitle: {
      type: "textarea",
      label: "Subtitle",
      contentEditable: true,
    },
    image: {
      type: "text",
      label: "Image URL",
    },
    imageAlt: {
      type: "text", 
      label: "Image Alt Text",
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
    fontColor: { type: "text", label: "Font Color (hex or name)" },
    backgroundColor: {
      type: "text",
      label: "Background Color",
    },
    fontSubHeaderColor: { type: "text", label: "Subheader Font Color" },

  },
  defaultProps: {
    title: "The £37 Pre-Op check that could save you weeks of recovery",
    subtitle: "If you've got a surgery date, your biggest risk isn't the operation. It's showing up under-prepared.",
    image: "/assets/surgery-hero.webp",
    imageAlt: "Image",
    paddingTop: 96,
    paddingBottom: 96,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 16,
    fontColor: "#111827",
    backgroundColor: "linear-gradient(to right, #f9fafb, #f3f4f6)",
    fontSubHeaderColor: "#6b7280",
  },
  render: ({ title, subtitle, image, imageAlt, paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, fontSize, fontColor = "#111827", backgroundColor = "linear-gradient(to right, #f9fafb, #f3f4f6)", fontSubHeaderColor = "#6b7280" }) => (
    <section style={{
      position: 'relative',
      background: backgroundColor,
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      paddingLeft: `${paddingLeft}px`,
      paddingRight: `${paddingRight}px`,
      marginTop: `${marginTop}px`,
      marginBottom: `${marginBottom}px`,
      marginLeft: `${marginLeft}px`,
      marginRight: `${marginRight}px`
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        <div style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}>
          <div style={{
            fontSize: `clamp(${fontSize * 1.25}px, 5vw, ${fontSize * 2.34}px)`,
            fontWeight: '700',
            lineHeight: '1.1',
            color: fontColor,
            margin: 0
          }}>
            {title}
          </div>
          <p style={{
            fontSize: `${fontSize * 0.875}px`,
            maxWidth: '768px',
            margin: '0 auto',
            lineHeight: '1.6',
            color: fontSubHeaderColor || "#6b7280"
          }}>
            {subtitle}
          </p>
          
          <div style={{
            position: 'relative',
            marginTop: '48px',
            maxWidth: '384px',
            margin: '48px auto 0'
          }}>
            <ImageWithFallback
              src={image}
              alt={imageAlt}
              width={400}
              height={500}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '16px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
              fetchPriority={"high"}
              loading={"eager"}
              decoding={"async"}
            />
          </div>
        </div>

        {/* Trust Badges */}
        <div style={{
          marginTop: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '32px',
          fontSize: '14px',
          color: '#4b5563'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#2563eb',
              borderRadius: '50%'
            }} />
            <span>Regulated</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#059669',
              borderRadius: '50%'
            }} />
            <span>Doctor Led</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#7c3aed',
              borderRadius: '50%'
            }} />
            <span>Evidence Based</span>
          </div>
        </div>
      </div>
    </section>
  ),
};
