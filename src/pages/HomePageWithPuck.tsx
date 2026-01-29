import "./HomePageWithPuck.inter.css";
import { SurgeryPageWithPuck } from "../components/SurgeryPageWithPuck";
import { surgeryReadinessDefaultData } from "../data/surgeryReadinessDefaultData";

interface HomePageWithPuckProps {
  onAddToBasket?: (assessment: any) => void;
  onOpenBasket?: () => void;
  onAssessmentUpdate?: (assessment: any) => void;
}

export function HomePageWithPuck({
  onAddToBasket,
  onOpenBasket,
  onAssessmentUpdate,
}: HomePageWithPuckProps) {
  return (
    <div className="homepage-with-puck-inter">
    <SurgeryPageWithPuck
      pageName="home"
      pageTitle="Home Page"
      defaultData={surgeryReadinessDefaultData}
      onAddToBasket={onAddToBasket || (() => {})}
      onOpenBasket={onOpenBasket || (() => {})}
      onAssessmentUpdate={onAssessmentUpdate}
    />
    </div>
  );

}