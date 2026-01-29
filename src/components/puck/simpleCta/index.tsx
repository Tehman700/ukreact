import React from "react";
import { ComponentConfig } from "@measured/puck";

export const SimpleCTA: ComponentConfig<{
  title: string;
  buttonText: string;
  buttonLink: string;
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
  },
  defaultProps: {
    title: "Reduce Risks, Recover Faster",
    buttonText: "Book Free Consultation Now",
    buttonLink: "#contact",
  },
  render: ({
    title,
    buttonText,
    buttonLink,
  }) => {
    return (
      <section
        className="middle-cta-section"
      >
        <div className="middle-cta-wrap">
          <div className="text-center middle-cta-inner">
            {/* Title */}
            <h2 className="middle-cta-title m-0">
              {title}
            </h2>

            {/* Button */}
            <div>
              <a
                href={buttonLink}
                className="inline-block dark-btn"
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
