import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Star } from "lucide-react";

export const TestimonialsGridSection: ComponentConfig<{
  title: string;
  testimonials: Array<{ quote: string; author: string; role: string; rating?: number }>;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  fontSize: number;
}> = {
  fields: {
    title: { type: "text", label: "Title", contentEditable: true },
    testimonials: {
      type: "array",
      label: "Testimonials",
      getItemSummary: (item: { author: string }) => item.author || "Testimonial",
      arrayFields: {
        quote: { type: "textarea", label: "Quote", contentEditable: true },
        author: { type: "text", label: "Author", contentEditable: true },
        role: { type: "text", label: "Role", contentEditable: true },
        rating: { type: "number", label: "Stars (1-5)", min: 1, max: 5 },
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
  },
  defaultProps: {
    title: "What Our Patients Say",
    testimonials: [
      {
        quote:
          "I'm 67 and was terrified about my hip replacement. This assessment showed me I had low protein and poor fitness—things my surgeon never mentioned. I spent 6 weeks preparing properly. Recovery was faster than expected and I was walking without a stick in 3 weeks.",
        author: "Michael R.",
        role: "Hip Replacement Patient",
        rating: 5,
      },
      {
        quote:
          "After taking the assessment, I realized my diabetes wasn't as well controlled as I thought. My doctor adjusted my medication 2 months before surgery. No infections, no complications. I wish every surgical patient knew about this.",
        author: "James T.",
        role: "Cardiac Surgery Patient",
        rating: 5,
      },
      {
        quote:
          "The assessment flagged that I was taking too many medications that could interfere with anesthesia. My GP reviewed everything and stopped two unnecessary ones. I felt safer going into surgery knowing this had been addressed.",
        author: "Robert K.",
        role: "Prostate Surgery Patient",
        rating: 5,
      },
      {
        quote:
          "I'm a surgeon myself and I took this before my own knee replacement. It's exactly the kind of systematic pre-operative assessment we should all be doing but rarely have time for.",
        author: "Dr. Andrew M.",
        role: "Orthopedic Surgeon & Patient",
        rating: 5,
      },
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
  },
  render: ({ title, testimonials, paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom, marginLeft, marginRight, fontSize }) => (
    <section className="relative bg-gradient-to-r from-gray-50 to-gray-100" style={{ 
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      paddingLeft: `${paddingLeft}px`,
      paddingRight: `${paddingRight}px`,
      marginTop: `${marginTop}px`,
      marginBottom: `${marginBottom}px`,
      marginLeft: `${marginLeft}px`,
      marginRight: `${marginRight}px`
    }}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
            ))}
          </div>
          <h2 className="tracking-tight mb-2" style={{ fontSize: `clamp(${fontSize * 1.5}px, 4vw, ${fontSize * 2.5}px)` }}>{title}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating ?? 5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4" style={{ fontSize: `${fontSize * 0.875}px` }}>"{t.quote}"</p>
              <div className="space-y-1">
                <p className="font-medium" style={{ fontSize: `${fontSize}px` }}>{t.author}</p>
                <p className="text-muted-foreground" style={{ fontSize: `${fontSize * 0.875}px` }}>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
};
