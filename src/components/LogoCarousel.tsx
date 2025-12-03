import React from 'react';
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

export function LogoCarousel() {
  return (
    <section className="border-b bg-muted/30">
      <div className=" mx-auto px-4 py-12 px-[14px] py-[42px]">
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
    </section>
  );
}