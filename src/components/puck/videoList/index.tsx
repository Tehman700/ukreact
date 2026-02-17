import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Play } from "lucide-react";

export const VideoList: ComponentConfig<{
  title: string;
  slides: Array<{
    videoUrl: string;
    thumbnailUrl?: string;
    title: string;
  }>;

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
    backgroundColor: "#ffffff",
    fontColor: "#111827",
  },
  render: ({
    title,
    slides
  }) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    // Keyboard navigation for carousel
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const scrollAmount = container.offsetWidth * 0.8; // Scroll by ~80% of container width
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    };

    

    const VideoSlide = ({ slide, index }: { slide: any; index: number }) => {
      const [isPlaying, setIsPlaying] = React.useState(false);
      const [isHovered, setIsHovered] = React.useState(false);
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
          className="flex-shrink-0 slide_itm"
          style={{ scrollSnapAlign: 'start' }}
          role="listitem"
        >
          <div
            className="block relative rounded-lg overflow-hidden group cursor-pointer h-full transition-shadow hover:shadow-lg"
           
            onClick={handlePlayPause}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Video Element */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
              {...(slide.thumbnailUrl && { poster: slide.thumbnailUrl })}
              preload="metadata"
              onEnded={() => setIsPlaying(false)}
            >
              <source src={slide.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Hover Overlay */}
            <div className={`absolute inset-0 bg-black/20 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
            
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
        className="container mx-auto video-list-section"
      
      >
        
          {/* Title */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="relative">
            <div 
              ref={scrollContainerRef}
              className="slide-inner-wrapper overflow-x-auto overscroll-x-contain scrollbar-hide focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                scrollSnapType: 'x mandatory'
              }}
              tabIndex={0}
              role="region"
              aria-label="Video carousel. Use arrow keys to scroll."
              onKeyDown={handleKeyDown}
            >
              <div 
                className="flex slide-wrapper" 
                role="list"
                aria-label="Video carousel"
              >
                {slides.map((slide, index) => (
                  <VideoSlide key={index} slide={slide} index={index} />
                ))}
                <div className="w-10 flex-shrink-0" />
              </div>
            </div>
          <div className="light-overlay absolute top-0 right-0 bottom-4 w-8 bg-gradient-to-l from-background/80 to-transparent pointer-events-none" />

          </div>
    
      </section>
    );
  },
};
