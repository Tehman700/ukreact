import React from 'react';
import { ComponentConfig } from '@measured/puck';

export const HomeCTA: ComponentConfig<{
  mainTitle: string;
  titleHighlight: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  features: Array<{ label: string; color: string }>;
  imageUrl: string;
  imageAlt: string;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  backgroundColor: string;
}> = {
  fields: {
    mainTitle: {
      type: 'text',
      label: 'Main Title',
      contentEditable: true,
    },
    titleHighlight: {
      type: 'text',
      label: 'Title Highlight (Second Line)',
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
        label: { type: 'text', label: 'Feature Label' },
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
    paddingTop: {
      type: 'number',
      label: 'Padding Top (px)',
      min: 0,
      max: 200,
    },
    paddingBottom: {
      type: 'number',
      label: 'Padding Bottom (px)',
      min: 0,
      max: 200,
    },
    paddingLeft: {
      type: 'number',
      label: 'Padding Left (px)',
      min: 0,
      max: 200,
    },
    paddingRight: {
      type: 'number',
      label: 'Padding Right (px)',
      min: 0,
      max: 200,
    },
    marginTop: {
      type: 'number',
      label: 'Margin Top (px)',
      min: 0,
      max: 200,
    },
    marginBottom: {
      type: 'number',
      label: 'Margin Bottom (px)',
      min: 0,
      max: 200,
    },
    marginLeft: {
      type: 'number',
      label: 'Margin Left (px)',
      min: 0,
      max: 200,
    },
    marginRight: {
      type: 'number',
      label: 'Margin Right (px)',
      min: 0,
      max: 200,
    },
    backgroundColor: {
      type: 'text',
      label: 'Background Color (CSS)',
    },
  },
  defaultProps: {
    mainTitle: 'Performance Healthcare',
    titleHighlight: 'For Men',
    subtitle: 'Expert-led, data-driven, and designed exclusively for men\'s health.',
    buttonText: 'Discover',
    buttonLink: 'https://luther.health/#contact',
    features: [
      { label: 'Regulated', color: 'bg-blue-600' },
      { label: 'Doctor Led', color: 'bg-green-600' },
      { label: 'Evidence Based', color: 'bg-purple-600' },
    ],
    imageUrl: '/src/assets/hi.png',
    imageAlt: 'Successful professional enjoying an active lifestyle',
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: 'linear-gradient(to right, rgb(249 250 251), rgb(243 244 246))',
  },
  render: ({
    mainTitle,
    titleHighlight,
    subtitle,
    buttonText,
    buttonLink,
    features,
    imageUrl,
    imageAlt,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    backgroundColor,
  }) => {
    return (
      <section
        className="relative"
        style={{
          background: backgroundColor,
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
        <div className="container py-8 sm:py-12 md:py-16 lg:py-24 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                {mainTitle}
                <span className="block text-primary">{titleHighlight}</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
                {subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors w-full sm:w-auto"
                  onClick={() => (window.location.href = buttonLink)}
                >
                  {buttonText}
                </button>
              </div>
              <div className="flex items-center justify-center lg:justify-start flex-wrap gap-4 sm:gap-6 text-sm text-muted-foreground">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className={`w-2 h-2 ${feature.color} rounded-full`}></span>
                    <span>{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="aspect-square relative overflow-hidden rounded-2xl max-w-md mx-auto lg:max-w-none">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
};

export default HomeCTA;
