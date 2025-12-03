import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Star } from "lucide-react";

export const TestimonialSection: ComponentConfig<{
  quote: string;
  author: string;
  role: string;
  rating: number;
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
    quote: {
      type: "textarea",
      label: "Testimonial Quote",
      contentEditable: true,
    },
    author: {
      type: "text",
      label: "Author Name",
      contentEditable: true,
    },
    role: {
      type: "text",
      label: "Author Role",
      contentEditable: true,
    },
    rating: {
      type: "number",
      label: "Star Rating (1-5)",
      min: 1,
      max: 5,
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
    fontColor: {
      type: "text",
      label: "Font Color (hex or name)",
    },
    backgroundColor: {
      type: "text",
      label: "Background Color (hex or name)",
    },
  },
  defaultProps: {
    quote: "This assessment changed how I prepared for surgery. Highly recommended!",
    author: "John D.",
    role: "Surgery Patient",
    rating: 5,
    paddingTop: 80,
    paddingBottom: 80,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 16,
    fontColor: "#374151",
    backgroundColor: "#f9fafb",
  },
  render: ({ quote, author, role, rating, paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, fontSize, fontColor, backgroundColor }) => (
    <section style={{ 
      backgroundColor: backgroundColor || '#f9fafb', 
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
        maxWidth: '1024px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', gap: '4px', marginBottom: '24px' }}>
            {[...Array(rating)].map((_, i) => (
              <Star key={i} style={{
                width: '20px',
                height: '20px',
                fill: '#eab308',
                color: '#eab308'
              }} />
            ))}
          </div>
          <blockquote style={{
            fontSize: `${fontSize * 0.7}px`,
            color: fontColor || '#374151',
            marginBottom: '24px',
            fontStyle: 'italic',
            margin: '0 0 24px 0'
          }}>
            "{quote}"
          </blockquote>
          <div style={{
            borderTop: '1px solid #e5e7eb',
            paddingTop: '24px'
          }}>
            <p style={{
              fontWeight: '600',
              color: '#111827',
              margin: '0 0 4px 0',
              fontSize: `${fontSize}px`
            }}>
              {author}
            </p>
            <p style={{
              fontSize: `${fontSize * 0.875}px`,
              color: '#6b7280',
              margin: 0
            }}>
              {role}
            </p>
          </div>
        </div>
      </div>
    </section>
  ),
};
