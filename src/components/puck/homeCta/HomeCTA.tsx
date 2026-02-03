import React from 'react';
import { ComponentConfig } from '@measured/puck';
import niceLogoSrc from 'figma:asset/75274da7c43eea09dc54e8c89b9b1024bd53bf72.png';
import gmcLogoSrc from 'figma:asset/31a0d62591eaf7b51f56d60f63824150a1786f8d.png';
import cqcLogoSrc from 'figma:asset/1d3650155b960261d923b43759d5822627f2ff7f.png';

const logos = [
  {
    id: 1,
    name: 'NICE - National Institute for Health and Care Excellence',
    image: niceLogoSrc
  },
  {
    id: 2,
    name: 'General Medical Council',
    image: gmcLogoSrc
  },
  {
    id: 3,
    name: 'Care Quality Commission',
    image: cqcLogoSrc
  }
];
export const HomeCTA: ComponentConfig<{
  mainTitle: string;
  titleHighlight: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  features: Array<{ label: string; color: string }>;
  imageUrl: string;
  imageAlt: string;
  overlayTitle: string;
  overlaySubtitle: string;
  mainTitleColor: string;
  titleHighlightColor: string;
  subtitleColor: string;
  buttonTextColor: string;
  buttonBgColor: string;
  featuresTextColor: string;
  overlayTitleColor: string;
  overlaySubtitleColor: string;
  backgroundColor: string;
}> = {
  fields: {
    mainTitle: {
      type: 'text',
      label: 'Main Title',
      contentEditable: true,
    },
    subtitle: {
      type: 'textarea',
      label: 'Subtitle',
      contentEditable: true,
    },
    buttonText: {
      type: 'text',
      label: 'Button Text',
    },
    buttonLink: {
      type: 'text',
      label: 'Button Link',
    },
    features: {
      type: 'array',
      label: 'Features',
      getItemSummary: (item) => item.label || 'Feature',
      arrayFields: {
        label: { type: 'text', label: 'Feature Label', contentEditable: true },
        color: { 
          type: 'select',
          label: 'Dot Color',
          options: [
            { label: 'Blue', value: 'bg-blue-600' },
            { label: 'Green', value: 'bg-green-600' },
            { label: 'Purple', value: 'bg-purple-600' },
            { label: 'Red', value: 'bg-red-600' },
            { label: 'Yellow', value: 'bg-yellow-600' },
          ],
        },
      },
    },
    imageUrl: {
      type: 'text',
      label: 'Image URL',
    },
    imageAlt: {
      type: 'text',
      label: 'Image Alt Text',
    },
    overlayTitle: {
      type: 'text',
      label: 'Overlay Title',
      contentEditable: true,
    },
    overlaySubtitle: {
      type: 'textarea',
      label: 'Overlay Subtitle',
      contentEditable: true,
    },

    mainTitleColor: {
      type: 'text',
      label: 'Main Title Color',
    },
    titleHighlightColor: {
      type: 'text',
      label: 'Title Highlight Color',
    },
    subtitleColor: {
      type: 'text',
      label: 'Subtitle Color',
    },
    buttonTextColor: {
      type: 'text',
      label: 'Button Text Color',
    },
    buttonBgColor: {
      type: 'text',
      label: 'Button Background Color',
    },
    featuresTextColor: {
      type: 'text',
      label: 'Features Text Color',
    },
    overlayTitleColor: {
      type: 'text',
      label: 'Overlay Title Color',
    },
    overlaySubtitleColor: {
      type: 'text',
      label: 'Overlay Subtitle Color',
    },
    backgroundColor: {
      type: 'text',
      label: 'Background Color (CSS)',
    },
  },
  defaultProps: {
    mainTitle: 'Surgery Preparation for',
    subtitle: 'Reduce surgical risks and improve recovery times.',
    buttonText: 'Start Assessment',
    buttonLink: 'https://luther.health/#contact',
    features: [
      { label: 'Regulated', color: 'bg-blue-600' },
      { label: 'Doctor Led', color: 'bg-green-600' },
      { label: 'Evidence Based', color: 'bg-purple-600' },
    ],
    imageUrl: '/src/assets/hi.png',
    imageAlt: 'Successful professional enjoying an active lifestyle',
    overlayTitle: 'Dr Matthew Lawrence',
    overlaySubtitle: 'Over 1000 health consultations',
    mainTitleColor: '#000000',
    titleHighlightColor: '#000000',
    subtitleColor: '#6b7280',
    buttonTextColor: '#ffffff',
    buttonBgColor: '#111827',
    featuresTextColor: '#6b7280',
    overlayTitleColor: '#ffffff',
    overlaySubtitleColor: '#ffffff',
    backgroundColor: 'linear-gradient(to right, rgb(249 250 251), rgb(243 244 246))',
  },
  
  render: ({
    mainTitle,
    subtitle,
    buttonText,
    buttonLink,
    features,
    imageUrl,
    imageAlt,
    overlayTitle,
    overlaySubtitle,
    mainTitleColor,
    subtitleColor,
    buttonTextColor,
    buttonBgColor,
    featuresTextColor,
    overlayTitleColor,
    overlaySubtitleColor,
    backgroundColor,
  }) => {
    return (
      <section
        className="relative main-banner-section"
        style={{
          background: backgroundColor,
 
        }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-+ sm:space-y-6 text-center lg:text-left banner-start-col">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight" style={{ color: mainTitleColor }}>
                {mainTitle}
              </h1>
              <p className="text-base sm:text-lg max-w-md mx-auto lg:mx-0" style={{ color: subtitleColor }}>
                {subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  className="banner-btn dark-btn inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg transition-colors w-full sm:w-auto cursor-pointer"
                  style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
                  onClick={() => (window.location.href = buttonLink)}
                >
                  {buttonText}
                </button>
              </div>
              <div className="colored-list flex items-center justify-center lg:justify-start flex-wrap gap-4 sm:gap-6 text-sm" style={{ color: featuresTextColor }}>
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className={`w-2 h-2 ${feature.color} rounded-full`}></span>
                    <span className='colored-label'>{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0 banner-end-col">
              <div className="aspect-square relative overflow-hidden rounded-2xl max-w-md mx-auto lg:max-w-none">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="w-full h-full object-cover object-center"
                />
                <div className="banner-img-content absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <div>
                    <h6 className="text-sm font-semibold" style={{ color: overlayTitleColor }}>{overlayTitle}</h6>
                    <p
                      className="opacity-90"
                      style={{ color: overlaySubtitleColor }}
                      dangerouslySetInnerHTML={{
                        __html: (() => {
                          if (typeof overlaySubtitle === 'string') return overlaySubtitle.replace(/\n/g, '<br />');
                          if (overlaySubtitle && typeof overlaySubtitle === 'object') {
                            if ('value' in overlaySubtitle && typeof overlaySubtitle.value === 'string') return overlaySubtitle.value.replace(/\n/g, '<br />');
                            if ('props' in overlaySubtitle && overlaySubtitle.props && typeof overlaySubtitle.props.value === 'string') return overlaySubtitle.props.value.replace(/\n/g, '<br />');
                          }
                          return '';
                        })()
                      }}
                    />

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
          <div className="">
      <div className=" mx-auto banner-logo-content">
        <div className="text-center mb-8">
          <p className="text-muted-foreground">Regulated and accredited by UK healthcare authorities</p>
        </div>
        
        <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8">
          {logos.map((logo) => (
            <div key={logo.id} className="flex items-center justify-center">
              <div className="relative w-24 h-12 md:w-28 md:h-14 lg:w-32 lg:h-16 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
      </section>
    );
  },
};

export default HomeCTA;
