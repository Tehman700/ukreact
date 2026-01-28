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
    const VideoSlide = ({ slide, index }: { slide: any; index: number }) => {
      const [isPlaying, setIsPlaying] = React.useState(false);
      const videoRef = React.useRef<HTMLVideoElement>(null);

      const handlePlayPause = () => {
        if (videoRef.current) {
          if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
          } else {
            videoRef.current.play();
            setIsPlaying(true);
          }
        }
      };

      return (
        <div
          className="flex-shrink-0"
 
        >
          <div
            className="block relative rounded-lg overflow-hidden group cursor-pointer"
            style={{ 
              width: slideWidth === 'auto' ? 'auto' : `min(${slideWidth}px, calc(100vw - 3rem))`,
              height: slideHeight === 'auto' ? 'auto' : `min(${slideHeight}px, calc((100vw - 3rem) * ${typeof slideHeight === 'number' && typeof slideWidth === 'number' ? slideHeight / slideWidth : 0.5625}))`,
              backgroundColor: '#d1d5db',
              maxWidth: '320px'
              
            }}
            onClick={handlePlayPause}
          >
            {/* Video Element */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster={slide.thumbnailUrl}
              preload="metadata"
              onEnded={() => setIsPlaying(false)}
            >
              <source src={slide.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Play Button Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-gray-800 fill-gray-800 ml-1" />
                </div>
              </div>
            )}
          </div>
        </div>
      );
    };

    return (
      <section
        className="px-[10px] sm:px-0 video-list-section"
        style={{
          background: backgroundColor || "#ffffff",
          color: fontColor || "#111827",
          paddingTop: `10px`,
          paddingBottom: `10px`,
          marginTop: `${marginTop}px`,
          marginBottom: `${marginBottom}px`,
          marginLeft: `${marginLeft}px`,
          marginRight: `${marginRight}px`,
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @media (min-width: 640px) {
            .video-list-section {
              padding-left: ${paddingLeft}px !important;
              padding-right: ${paddingRight}px !important;
              padding-top: ${paddingTop}px !important;
              padding-bottom: ${paddingBottom}px !important;
            }
          }
        `}} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 video-list-section">
          {/* Title */}
          <div className="text-center mb-8 sm:mb-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold px-4">{title}</h2>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="relative p-4">
            <div 
              className="overflow-x-auto -mx-4 px-4"
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
              <div className="flex gap-3 sm:gap-4 md:gap-6 pb-4" style={{ minWidth: 'min-content' }}>
                {slides.map((slide, index) => (
                  <VideoSlide key={index} slide={slide} index={index} />
                ))}
              </div>
            </div>
            
            {/* Right Fade Overlay - indicates more content */}
            {slides.length > 2 && (
              <div 
                className="hidden sm:block absolute right-0 top-0 bottom-4 w-24 md:w-32 pointer-events-none z-10"
                style={{ 
                  background: backgroundColor?.includes('gradient') 
                    ? 'linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0) 100%)'
                    : `linear-gradient(to left, ${backgroundColor || '#ffffff'} 0%, ${backgroundColor || '#ffffff'}dd 40%, transparent 100%)` 
                }}
              ></div>
            )}
          </div>
        </div>
      </section>
    );
  },
};
