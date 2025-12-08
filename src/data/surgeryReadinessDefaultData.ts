import { Data } from "@measured/puck";

// Common default Puck data for all Surgery Readiness Upsell pages
export const surgeryReadinessDefaultData: Data = {
  root: {
    props: {
      title: "Surgery Readiness Assessment",
      assessmentName: "Surgery Readiness Score",
      assessmentDescription: "Comprehensive pre-surgical evaluation to optimize your readiness and minimize risks for upcoming procedures.",
      assessmentPrice: 39.0,
    } as any // Type assertion needed for custom root fields
  },
  zones: {},
  content: [
    {
      type: "HeroSection",
      props: {
        id: "HeroSection-c96173f2-16cd-4a97-a5c9-a21cf1f1fa6c",
        image: "https://luther.health/assests/unsplash_uhXlRnt9dTw.png",
        title: "FREE surgery preparation plan",
        fontSize: 20,
        imageAlt: "Smiling male patient in hospital gown representing the Surgery Readiness Score",
        subtitle: "Take the stress our of preparing for your surgery",
        fontColor: "#111827",
        marginTop: 0,
        marginLeft: 0,
        paddingTop: 96,
        marginRight: 0,
        paddingLeft: 0,
        marginBottom: 0,
        paddingRight: 0,
        paddingBottom: 30,
        backgroundColor: "linear-gradient(to right, #f9fafb, #f3f4f6)"
      }
    },
    {
      type: "Button",
      props: {
        id: "Button-8808d842-4f81-47fe-b905-a9db46545e89",
        href: "",
        size: "lg",
        text: "                    Get Started                    ",
        align: "center",
        variant: "default",
        fontSize: 12,
        marginTop: 0,
        marginLeft: 0,
        paddingTop: 40,
        marginRight: 0,
        paddingLeft: 0,
        marginBottom: 0,
        paddingRight: 0,
        paddingBottom: 30,
        backgroundColor: ""
      }
    },
    {
      type: "ImageGallerySection",
      props: {
        id: "ImageGallerySection-8a2facef-b38e-4227-a4bb-0907d3bffc93",
        title: "Benefits",
        images: [
          {
            alt: "Preparation example",
            src: "https://luther.health/assests/landing4.png"
          }
        ],
        fontSize: 13,
        subtitle: "We all know that preparing for your surgery ",
        marginTop: 0,
        marginLeft: 0,
        paddingTop: 64,
        marginRight: 0,
        paddingLeft: 0,
        marginBottom: 0,
        paddingRight: 0,
        paddingBottom: 64
      }
    },
    {
      type: "ImageGallerySection",
      props: {
        id: "ImageGallerySection-47a34925-5f30-46d3-bb22-1455f8d8cf87",
        title: "Our plans have help men regain control of their lives",
        images: [
          {
            alt: "Recovery example",
            src: "https://luther.health/assests/landing1.png"
          },
          {
            alt: "Results example",
            src: "https://luther.health/assests/landing2.png"
          },
          {
            src: "https://luther.health/assests/landing3.png"
          }
        ],
        fontSize: 13,
        subtitle: "A picture speaks louder than words — here's a glimpse of the difference proper preparation can make before surgery.",
        marginTop: 0,
        marginLeft: 0,
        paddingTop: 64,
        marginRight: 0,
        paddingLeft: 0,
        marginBottom: 0,
        paddingRight: 0,
        paddingBottom: 64
      }
    },
    {
      type: "FAQSection",
      props: {
        id: "faq-1",
        faqs: [
          {
            answer: "No. The aim is to improve readiness before your date. If your Score flags something that needs a clinician's attention, we'll say so.",
            question: "Will this replace my pre-op appointment?"
          },
          {
            answer: "It's simple. If you can read email, you can do this.",
            question: "What if I'm not techy?"
          },
          {
            answer: "You can keep it DIY, join the 21-Day Prehab Challenge, or apply for the concierge protocol if you want hands-on support.",
            question: "What if I need help?"
          },
          {
            answer: "The assessment takes about 10 minutes. Implementation of recommendations depends on how much time you have before surgery.",
            question: "How long does it take?"
          },
          {
            answer: "Yes. All recommendations are based on current surgical and anesthetic guidelines, with input from practicing surgeons and anesthetists.",
            question: "Is this evidence-based?"
          }
        ],
        title: "",
        paddingTop: 4
      }
    },
    {
      type: "Button",
      props: {
        id: "Button-24a68c85-5010-42d8-bcb8-a488d8b8da98",
        href: "",
        size: "lg",
        text: "                    Get Started                    ",
        align: "center",
        variant: "default",
        fontSize: 12,
        marginTop: 0,
        marginLeft: 0,
        paddingTop: 10,
        marginRight: 0,
        paddingLeft: 0,
        marginBottom: 0,
        paddingRight: 0,
        paddingBottom: 40,
        backgroundColor: ""
      }
    },
    {
      type: "LogoCarouselSection",
      props: {
        id: "LogoCarouselSection-c4711c71-a616-4c63-8ed6-ba781b5e7e34",
        fontSize: 16,
        marginTop: 0,
        marginLeft: 0,
        paddingTop: 0,
        marginRight: 0,
        paddingLeft: 0,
        marginBottom: 0,
        paddingRight: 0,
        paddingBottom: 0
      }
    }
  ]
};
