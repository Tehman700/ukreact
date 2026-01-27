import { ComponentConfig } from "@measured/puck";
// Import separated components
import { HeroSection } from "./heroSection";
import { TextSection } from "./textSection";
import { Image } from "./image";
import { TestimonialSection } from "./testimonialSection";
import { FAQSection } from "./faqSection";
import { CTASection } from "./ctaSection";
import { ComparisonTableSection } from "./comparisonTableSection";
import { TestimonialsGridSection } from "./testimonialsGridSection";
import { ImageGallerySection } from "./imageGallerySection";
import { ExtendedFAQSection } from "./extendedFAQSection";
import { LogoCarouselSection } from "./logoCarouselSection";
import { Heading } from "./heading";
import { Text } from "./text";
import { Spacer } from "./spacer";
import { Stats } from "./stats";
import { ButtonComponent } from "./buttonComponent";
import { Card } from "./card";
import { Grid } from "./grid";
import { CardGrid } from "./cardGrid";
import { Columns } from "./columns";
import { VerticalSpace } from "./verticalSpace";
import { Section } from "./Section";
import { Flex } from "./flex";
import { VideoList } from "./videoList";
import { PuckFeatures } from "./puckFeatures";
import { PuckCTA } from "./puckCta";
import { HomeCTA } from "./homeCta";
import { SimpleCTA } from "./simpleCta";
// Default Components - Flex

// Export the component config for Puck (after all components are defined)
export const puckConfig = {
  root: {
    fields: {
      title: { type: "text", label: "Page Title" },
      assessmentName: { type: "text", label: "Assessment Name" },
      assessmentDescription: { type: "textarea", label: "Assessment Description" },
      assessmentPrice: { type: "number", label: "Assessment Price (£)" },
    },
  },
  components: {
    HeroSection,
    HomeCTA,
    TextSection,
    TestimonialSection,
    FAQSection,
    CTASection,
    ComparisonTableSection,
    TestimonialsGridSection,
    ImageGallerySection,
    ExtendedFAQSection,
    LogoCarouselSection,
    Image,
    Columns,
    Flex,
    Grid,
    VerticalSpace,
    Card,
    CardGrid,
    Heading,
    Text,
    Button: ButtonComponent,
    Spacer,
    Stats,
    VideoList,
    SideTextWithImage: PuckFeatures,
    Blog: PuckCTA,
    SimpleCTA,

  },
};
