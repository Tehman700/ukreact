import React from "react";
import { ComponentConfig } from "@measured/puck";

export const PuckCTA: ComponentConfig<{
  sectionTitle: string;
  cards: Array<{
    imageUrl: string;
    title: string;
    description: string;
  }>;
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

  },
  render: ({
    sectionTitle,
    cards
  }) => {
    return (
      <section
        className="container mx-auto px-4 px-[10px] sm:px-0 puckcta-list-section"

      >

          {/* Section Title */}
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">{sectionTitle}</h2>
          </div>

          {/* Horizontal Scroll for All Devices */}
          <div className="relative " style={{display:'flex', justifyContent: 'center'}}>
            <div 
              className="overflow-x-auto w-full"
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <style dangerouslySetInnerHTML={{ __html: `
                .overflow-x-auto::-webkit-scrollbar {
                  display: none;
                }
              `}} />
              <div className="flex card-slide-wrap " style={{ minWidth: 'min-content' }}>
                {cards.map((card, index) => (
                  <div 
                    key={index} 
                   className="
        card-slidebox
        flex-shrink-0
      "
                  >
                    {/* Card Image */}
                    <div className="card-slideimg" >
                      <img
                        src={card.imageUrl}
                        alt={card.title}
                        className="w-full h-full object-cover"
                        style={{ borderRadius: '6px 6px 0 0' }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col slide-card-content">
                    {/* Card Title */}
                    <h3 className="card-title m-0">{card.title}</h3>
                    
                    {/* Card Description */}
                    <p className="card-para m-0 leading-relaxed">
                      {card.description}
                    </p>
                    </div>
                  </div>
                ))}
                 <div className="w-10 flex-shrink-0" />
              </div>

          <div className="light-overlay absolute top-0 right-0 bottom-4 w-8 bg-gradient-to-l from-background/80 to-transparent pointer-events-none" />

            </div>
          </div>
      </section>
    );
  },
};
