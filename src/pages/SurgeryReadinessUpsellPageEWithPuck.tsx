import React from "react";
import { Shield } from "lucide-react";
import { Assessment } from "../App";
import surgeryReadinessImage from "figma:asset/cdb0a3c5cfea26d8c71d21bafe6097790d5f4c09.png";
import { SurgeryPageWithPuck } from "../components/SurgeryPageWithPuck";
import { surgeryReadinessDefaultData } from "../data/surgeryReadinessDefaultData";

// Surgery Readiness Assessment definition
const surgeryReadinessAssessment: Assessment = {
  id: "1",
  name: "Surgery Readiness Score",
  description:
    "Comprehensive pre-surgical evaluation to optimize your readiness and minimize risks for upcoming procedures.",
  price: 37.0,
  image: surgeryReadinessImage,
  icon: <Shield className="w-6 h-6" />,
  features: [
    "Pre-surgical health optimization",
    "Risk assessment protocols",
    "Recovery timeline planning",
  ],
};

interface SurgeryReadinessUpsellPageProps {
  onAddToBasket: (assessment: Assessment) => void;
  onOpenBasket: () => void;
}



export function SurgeryReadinessUpsellPageEWithPuck({
  onAddToBasket,
  onOpenBasket,
}: SurgeryReadinessUpsellPageProps) {
  return (
    <SurgeryPageWithPuck
      pageName="surgery-readiness-assessment-learn-more-e"
      pageTitle="Surgery Readiness Page E"
      defaultData={surgeryReadinessDefaultData}
      assessment={surgeryReadinessAssessment}
      onAddToBasket={onAddToBasket}
      onOpenBasket={onOpenBasket}
    />
  );
}