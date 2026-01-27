import React from "react";
import { ComponentConfig } from "@measured/puck";

export const PuckCTA: ComponentConfig<{
  sectionTitle: string;
  cards: Array<{
    imageUrl: string;
    title: string;
    description: string;
  }>;
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
}> = {
  fields: {
    sectionTitle: {
      type: "text",
      label: "Section Title",
      contentEditable: true,
    },
    cards: {
      type: "array",
      label: "Cards",
      getItemSummary: (item) => item.title || "Card",
      arrayFields: {
        imageUrl: { type: "text", label: "Image URL" },
        title: { type: "text", label: "Card Title", contentEditable: true },
        description: {
          type: "textarea",
          label: "Card Description",
          contentEditable: true,
        },
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
    backgroundColor: {
      type: "text",
      label: "Background Color (CSS gradient or color)",
    },
    fontColor: {
      type: "text",
      label: "Font Color",
    },
  },
  defaultProps: {
    sectionTitle: "How We Work",
    cards: [
      {
        imageUrl: "/assests/inflammation-hero.webp",
        title: "Remote Consultation",
        description:
          "At every decision point, you will meet one of our doctors. We listen to your concerns and understand your goals. Based on what you tell us and your data, we ensure you have what you need. You'll leave each consultation with clear answers and what to do next.",
      },
      {
        imageUrl: "/assests/symp-sever-hero.webp",
        title: "Bespoke plan",
        description:
          "Your health and goals are unique – your protocol, programmes, and supplements should be too. We run a series of tests to understand who you really are, then using best available science (and lots of it) a unique, expert protocol, with clear evidence and clinical factors, that directly maps from what we find about you.",
      },
      {
        imageUrl: "/assests/burden-hero.webp",
        title: "Ongoing support",
        description:
          "From scheduling appointments with your doctor to purchasing your supplements, to tracking your program and reviewing any adjustments as you progress, you can manage everything online. We manage everything else, like arranging comprehensive tests, and coordinating with your care provider, so you can focus on the most important thing: implementing your plan.",
      },
    ],
    paddingTop: 96,
    paddingBottom: 96,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: "#ffffff",
    fontColor: "#111827",
  },
  render: ({
    sectionTitle,
    cards,
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
  }) => {
    return (
      <section
        style={{
          background: backgroundColor || "#ffffff",
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
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold">{sectionTitle}</h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <div key={index} className="flex flex-col border border-gray-200 rounded-lg ">
                {/* Card Image */}
                <div className="aspect-[4/3] w-full bg-gray-20 overflow-hidden shadow-sm" >
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    style={{ borderRadius: '6px 6px 0 0' }}
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                {/* Card Title */}
                <h3 className="text-base font-semibold mb-3">{card.title}</h3>
                
                {/* Card Description */}
                <p className="text-xs text-gray-600 leading-relaxed">
                  {card.description}
                </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
};
