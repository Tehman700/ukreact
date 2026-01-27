import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Play } from "lucide-react";

export const VideoList: ComponentConfig<{
  title: string;
  slides: Array<{
    videoUrl: string;
    thumbnailUrl: string;
    title: string;
  }>;
  slideWidth: number | string;
  slideHeight: number | string;
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
    title: {
      type: "text",
      label: "Section Title",
      contentEditable: true,
    },
    slides: {
      type: "array",
      label: "Slides",
      getItemSummary: (item) => item.title || "Slide",
      arrayFields: {
        videoUrl: { type: "text", label: "Video URL" },
        thumbnailUrl: { type: "text", label: "Thumbnail URL" },
        title: { type: "text", label: "Slide Title", contentEditable: true },
      },
    },
    slideWidth: {
      type: "text",
      label: "Slide Width (px or 'auto')",
    },
    slideHeight: {
      type: "text",
      label: "Slide Height (px or 'auto')",
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
    title: "Risks of Surgery",
    slides: [
      {
        videoUrl: "#",
        thumbnailUrl: "/placeholder-video1.jpg",
        title: "Understanding Surgical Risks",
      },
      {
        videoUrl: "#",
        thumbnailUrl: "/placeholder-video2.jpg",
        title: "How to Prepare",
      },
      {
        videoUrl: "#",
        thumbnailUrl: "/placeholder-video3.jpg",
        title: "Recovery Tips",
      },
    ],
    slideWidth: 450,
    slideHeight: 253,
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
    title,
    slides,
    slideWidth,
    slideHeight,
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
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-6 pb-4" style={{ minWidth: 'min-content' }}>
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ width: slideWidth === 'auto' ? 'auto' : `${slideWidth}px` }}
                >
                  <a
                    href={slide.videoUrl}
                    className="block relative rounded-lg overflow-hidden group"
                    style={{ 
                      width: slideWidth === 'auto' ? 'auto' : `${slideWidth}px`,
                      height: slideHeight === 'auto' ? 'auto' : `${slideHeight}px`,
                      backgroundColor: '#d1d5db'
                    }}
                  >
                    {/* Thumbnail - using gradient as placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-blue-300"></div>
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <Play className="w-8 h-8 text-gray-800 fill-gray-800 ml-1" />
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  },
};
