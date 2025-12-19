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

  ]
};
