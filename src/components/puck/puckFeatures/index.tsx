import React from "react";
import { ComponentConfig } from "@measured/puck";

export const PuckFeatures: ComponentConfig<{
  heading: string;
  description: string;
  bulletPoints: Array<{ text: string }>;
  buttonText: string;
  buttonLink: string;
  cardTitle: string;
  cardDescription: string;
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
    heading: {
      type: "text",
      label: "Main Heading",
      contentEditable: true,
    },
    description: {
      type: "textarea",
      label: "Description",
      contentEditable: true,
    },
    bulletPoints: {
      type: "array",
      label: "Bullet Points",
      getItemSummary: (item) => item.text || "Bullet point",
      arrayFields: {
        text: { type: "textarea", label: "Bullet Text", contentEditable: true },
      },
    },
    buttonText: {
      type: "text",
      label: "Button Text",
    },
    buttonLink: {
      type: "text",
      label: "Button Link",
    },
    cardTitle: {
      type: "text",
      label: "Card Title",
      contentEditable: true,
    },
    cardDescription: {
      type: "textarea",
      label: "Card Description",
      contentEditable: true,
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
  },
  defaultProps: {
    heading: "How much could you reduce your surgical risk and speed up your recovery?",
    description:
      "Patient-led prepare for surgery reduce their risk in several perioperative complications by up to 81% and relevant hospital stays by up to three days.",
    bulletPoints: [
      {
        text: "Complete the quiz to see how much you could improve your surgical experience.",
      },
      {
        text: "Based on results from systematic reviews and meta-analyses that analysed results from over 16,000 total participants.",
      },
    ],
    buttonText: "Start",
    buttonLink: "#",
    cardTitle: "",
    cardDescription: "",
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
    heading,
    description,
    bulletPoints,
    buttonText,
    buttonLink,
    cardTitle,
    cardDescription,
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
        className="px-[10px] sm:px-0 puck-features-section"
        style={{
          backgroundColor: backgroundColor || "#ffffff",
          color: fontColor || "#111827",
          paddingTop: `${paddingTop}px`,
          paddingBottom: `${paddingBottom}px`,
          marginTop: `${marginTop}px`,
          marginBottom: `${marginBottom}px`,
          marginLeft: `${marginLeft}px`,
          marginRight: `${marginRight}px`,
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @media (min-width: 640px) {
            .puck-features-section {
              padding-left: ${paddingLeft}px !important;
              padding-right: ${paddingRight}px !important;
            }
          }
        `}} />
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16 items-center">
            {/* Card with button - Left on desktop, bottom on mobile */}
            <div className="rounded-2xl w-full max-w-md shadow-sm flex justify-center order-2 lg:order-1" style={{ padding: '100px', backgroundColor: '#f6f7f9' }}>
              <div className="w-full">
                {cardTitle && (
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-900">
                    {cardTitle}
                  </h3>
                )}
                {cardDescription && (
                  <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">{cardDescription}</p>
                )}
                <a
                  href={buttonLink}
                  className="inline-block w-full text-center bg-black text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base"
                >{buttonText}</a>
              </div>
            </div>

            {/* Content - Right on desktop, top on mobile */}
            <div className="space-y-4 sm:space-y-6 flex-1 w-full order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {heading}
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                {description}
              </p>
              {bulletPoints && bulletPoints.length > 0 && (
                <div className="space-y-3 text-sm sm:text-base text-gray-600">
                  {bulletPoints.map((bullet, index) => (
                    <p key={index} className="leading-relaxed">
                      {bullet.text}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  },
};
