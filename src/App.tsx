import React, { useState, useEffect, useCallback } from 'react';
// Core Components


import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { ResultsNotification } from './components/ResultsNotification';
import { HealthConciergeOptIn } from './components/HealthConciergeOptIn';
import { DesignSystemApp } from './components/design-system/DesignSystemApp';
import { ShoppingBasket } from './components/ShoppingBasket';

// Main Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { AssessmentsPage } from './pages/AssessmentsPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { CookiePage } from './pages/CookiePage';
import { ComplaintsPage } from './pages/ComplaintsPage';
import { QuizPage } from './pages/QuizPage';
import { LoadingPage } from './pages/LoadingPage';
import { QuizResultsPage } from './pages/QuizResultsPage';
import { UpsellPage } from './pages/UpsellPage';

// Assessment Pages - Surgery Readiness
import { SurgeryReadinessUpsellPage } from './pages/SurgeryReadinessUpsellPage';
import { SurgeryReadinessQuestionsPage } from './pages/SurgeryReadinessQuestionsPage';
import { SurgeryReadinessInformationPage } from './pages/SurgeryReadinessInformationPage';
import { SurgeryReadinessResultsPage } from './pages/SurgeryReadinessResultsPage';
import { SurgeryReadinessReviewPage } from './pages/SurgeryReadinessReviewPage';
import { HealthConciergeInformationUser } from './pages/HealthConciergeInformationUser';

// Assessment Pages - Biological Age
import { BiologicalAgeUpsellPage } from './pages/BiologicalAgeUpsellPage';
import { BiologicalAgeQuestionsPage } from './pages/BiologicalAgeQuestionsPage';
import { BiologicalAgeInformationPage } from './pages/BiologicalAgeInformationPage';
import { BiologicalAgeResultsPage } from './pages/BiologicalAgeResultsPage';
import { BiologicalAgeReviewPage } from './pages/BiologicalAgeReviewPage';

// Assessment Pages - Cardiometabolic Risk
import { CardiometabolicRiskUpsellPage } from './pages/CardiometabolicRiskUpsellPage';
import { CardiometabolicRiskQuestionsPage } from './pages/CardiometabolicRiskQuestionsPage';
import { CardiometabolicRiskInformationPage } from './pages/CardiometabolicRiskInformationPage';
import { CardiometabolicRiskResultsPage } from './pages/CardiometabolicRiskResultsPage';
import { CardiometabolicRiskReviewPage } from './pages/CardiometabolicRiskReviewPage';

// Assessment Pages - Resilience Index
import { ResilienceIndexUpsellPage } from './pages/ResilienceIndexUpsellPage';
import { ResilienceIndexQuestionsPage } from './pages/ResilienceIndexQuestionsPage';
import { ResilienceIndexInformationPage } from './pages/ResilienceIndexInformationPage';
import { ResilienceIndexResultsPage } from './pages/ResilienceIndexResultsPage';
import { ResilienceIndexReviewPage } from './pages/ResilienceIndexReviewPage';

// Assessment Pages - Nutrition & Body Composition
import { NutritionBodyCompositionUpsellPage } from './pages/NutritionBodyCompositionUpsellPage';
import { NutritionBodyCompositionQuestionsPage } from './pages/NutritionBodyCompositionQuestionsPage';
import { NutritionBodyCompositionInformationPage } from './pages/NutritionBodyCompositionInformationPage';
import { NutritionBodyCompositionResultsPage } from './pages/NutritionBodyCompositionResultsPage';
import { NutritionBodyCompositionReviewPage } from './pages/NutritionBodyCompositionReviewPage';

// Assessment Pages - Functional Fitness Age
import { FunctionalFitnessAgeUpsellPage } from './pages/FunctionalFitnessAgeUpsellPage';
import { FunctionalFitnessAgeQuestionsPage } from './pages/FunctionalFitnessAgeQuestionsPage';
import { FunctionalFitnessAgeInformationPage } from './pages/FunctionalFitnessAgeInformationPage';
import { FunctionalFitnessAgeResultsPage } from './pages/FunctionalFitnessAgeResultsPage';
import { FunctionalFitnessAgeReviewPage } from './pages/FunctionalFitnessAgeReviewPage';

// Bundle Assessment Pages
import { CompletedSurgeryPreparationUpsellPage } from './pages/CompletedSurgeryPreparationUpsellPage';
import { CompletedSurgeryPreparationQuestionsPage } from './pages/CompletedSurgeryPreparationQuestionsPage';
import { CompletedSurgeryPreparationInformationPage } from './pages/CompletedSurgeryPreparationInformationPage';
import { CompletedSurgeryPreparationResultsPage } from './pages/CompletedSurgeryPreparationResultsPage';
import { CompletedSurgeryPreparationReviewPage } from './pages/CompletedSurgeryPreparationReviewPage';

import { CompletedChronicSymptomsUpsellPage } from './pages/CompletedChronicSymptomsUpsellPage';
import { CompletedChronicSymptomsQuestionsPage } from './pages/CompletedChronicSymptomsQuestionsPage';
import { CompletedChronicSymptomsInformationPage } from './pages/CompletedChronicSymptomsInformationPage';
import { CompletedChronicSymptomsResultsPage } from './pages/CompletedChronicSymptomsResultsPage';
import { CompletedChronicSymptomsReviewPage } from './pages/CompletedChronicSymptomsReviewPage';

import { LongevityWellnessBundleUpsellPage } from './pages/LongevityWellnessBundleUpsellPage';
import { LongevityWellnessBundleQuestionsPage } from './pages/LongevityWellnessBundleQuestionsPage';
import { LongevityWellnessBundleInformationPage } from './pages/LongevityWellnessBundleInformationPage';
import { LongevityWellnessBundleResultsPage } from './pages/LongevityWellnessBundleResultsPage';
import { LongevityWellnessBundleReviewPage } from './pages/LongevityWellnessBundleReviewPage';

// Additional Assessment Pages
import { ComplicationRiskUpsellPage } from './pages/ComplicationRiskUpsellPage';
import { ComplicationRiskQuestionsPage } from './pages/ComplicationRiskQuestionsPage';
import { ComplicationRiskInformationPage } from './pages/ComplicationRiskInformationPage';
import { ComplicationRiskResultsPage } from './pages/ComplicationRiskResultsPage';
import { ComplicationRiskReviewPage } from './pages/ComplicationRiskReviewPage';

import { RecoverySpeedUpsellPage } from './pages/RecoverySpeedUpsellPage';
import { RecoverySpeedQuestionsPage } from './pages/RecoverySpeedQuestionsPage';
import { RecoverySpeedInformationPage } from './pages/RecoverySpeedInformationPage';
import { RecoverySpeedResultsPage } from './pages/RecoverySpeedResultsPage';
import { RecoverySpeedReviewPage } from './pages/RecoverySpeedReviewPage';

import { AnaesthesiaRiskUpsellPage } from './pages/AnaesthesiaRiskUpsellPage';
import { AnaesthesiaRiskQuestionsPage } from './pages/AnaesthesiaRiskQuestionsPage';
import { AnaesthesiaRiskInformationPage } from './pages/AnaesthesiaRiskInformationPage';
import { AnaesthesiaRiskResultsPage } from './pages/AnaesthesiaRiskResultsPage';
import { AnaesthesiaRiskReviewPage } from './pages/AnaesthesiaRiskReviewPage';

import { MobilityStrengthUpsellPage } from './pages/MobilityStrengthUpsellPage';
import { MobilityStrengthQuestionsPage } from './pages/MobilityStrengthQuestionsPage';
import { MobilityStrengthInformationPage } from './pages/MobilityStrengthInformationPage';
import { MobilityStrengthResultsPage } from './pages/MobilityStrengthResultsPage';
import { MobilityStrengthReviewPage } from './pages/MobilityStrengthReviewPage';

import { SymptomSeverityUpsellPage } from './pages/SymptomSeverityUpsellPage';
import { SymptomSeverityQuestionsPage } from './pages/SymptomSeverityQuestionsPage';
import { SymptomSeverityInformationPage } from './pages/SymptomSeverityInformationPage';
import { SymptomSeverityResultsPage } from './pages/SymptomSeverityResultsPage';
import { SymptomSeverityReviewPage } from './pages/SymptomSeverityReviewPage';

import { InflammationRiskUpsellPage } from './pages/InflammationRiskUpsellPage';
import { InflammationRiskQuestionsPage } from './pages/InflammationRiskQuestionsPage';
import { InflammationRiskInformationPage } from './pages/InflammationRiskInformationPage';
import { InflammationRiskResultsPage } from './pages/InflammationRiskResultsPage';
import { InflammationRiskReviewPage } from './pages/InflammationRiskReviewPage';

import { MedicationBurdenUpsellPage } from './pages/MedicationBurdenUpsellPage';
import { MedicationBurdenQuestionsPage } from './pages/MedicationBurdenQuestionsPage';
import { MedicationBurdenInformationPage } from './pages/MedicationBurdenInformationPage';
import { MedicationBurdenResultsPage } from './pages/MedicationBurdenResultsPage';
import { MedicationBurdenReviewPage } from './pages/MedicationBurdenReviewPage';

import { DailyEnergyUpsellPage } from './pages/DailyEnergyUpsellPage';
import { DailyEnergyQuestionsPage } from './pages/DailyEnergyQuestionsPage';
import { DailyEnergyInformationPage } from './pages/DailyEnergyInformationPage';
import { DailyEnergyResultsPage } from './pages/DailyEnergyResultsPage';
import { DailyEnergyReviewPage } from './pages/DailyEnergyReviewPage';

import { LifestyleLimiterUpsellPage } from './pages/LifestyleLimiterUpsellPage';
import { LifestyleLimiterQuestionsPage } from './pages/LifestyleLimiterQuestionsPage';
import { LifestyleLimiterInformationPage } from './pages/LifestyleLimiterInformationPage';
import { LifestyleLimiterResultsPage } from './pages/LifestyleLimiterResultsPage';
import { LifestyleLimiterReviewPage } from './pages/LifestyleLimiterReviewPage';

// Protocol Pages
import { ChronicSymptomProtocolPage } from './pages/ChronicSymptomProtocolPage';
import { LongevityFocusProtocolPage } from './pages/LongevityFocusProtocolPage';

// Health Concierge Pages
import { HealthConciergePage } from './pages/HealthConciergePage';
import { HealthConciergeQuestionsPage } from './pages/HealthConciergeQuestionsPage';
import { HealthConciergeResultsPage } from './pages/HealthConciergeResultsPage';
import { HealthConciergeInformationPage } from './pages/HealthConciergeInformationPage';


// For Stripe Payment Pages
import Success from './pages/Success';
import Cancel from './pages/Cancel';


// Blog Pages
import { BlogPage } from './pages/BlogPage';
import { SurgeryReadySignsPage } from './pages/blog/SurgeryReadySignsPage';
import { RedFlagsSurgeryPage } from './pages/blog/RedFlagsSurgeryPage';
import { HomeTweaksPage } from './pages/blog/HomeTweaksPage';
import { MorningStiffnessPage } from './pages/blog/MorningStiffnessPage';
import { ComplicationRiskFactorsPage } from './pages/blog/ComplicationRiskFactorsPage';
import { RecoverySpeedSecretsPage } from './pages/blog/RecoverySpeedSecretsPage';
import { AnaesthesiaRisksPage } from './pages/blog/AnaesthesiaRisksPage';
import { MobilityBaselinePage } from './pages/blog/MobilityBaselinePage';
import { SymptomSeverityGuidePage } from './pages/blog/SymptomSeverityGuidePage';
import { InflammationTriggerGuidePage } from './pages/blog/InflammationTriggerGuidePage';
import { MedicationSafetyGuidePage } from './pages/blog/MedicationSafetyGuidePage';
import { EnergyOptimizationGuidePage } from './pages/blog/EnergyOptimizationGuidePage';
import { LifestyleImpactGuidePage } from './pages/blog/LifestyleImpactGuidePage';
import { AgingFasterSignsPage } from './pages/blog/AgingFasterSignsPage';
import { CardiometabolicRiskSignsPage } from './pages/blog/CardiometabolicRiskSignsPage';
import { ResilienceSignsPage } from './pages/blog/ResilienceSignsPage';
import { NutritionBodyCompositionSignsPage } from './pages/blog/NutritionBodyCompositionSignsPage';
import { FunctionalFitnessAgeSignsPage } from './pages/blog/FunctionalFitnessAgeSignsPage';




// Admin Pages
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AnalyticsTestPage } from './pages/AnalyticsTestPage';

// Icons and Assets
import { Shield, Clock, TrendingUp, Star, AlertTriangle, Zap, Heart, Activity, Thermometer, Pill, Battery, Users, Apple, Stethoscope } from 'lucide-react';
import surgeryReadinessImage from '/assests/surgery-hero.webp';
import biologicalAgeImage from '/assests/bio-hero.webp';
// import healthspanImage from 'figma:asset/4cabb8a4e6274a78708d8b568484f39d32dc28b7.png';
// import redFlagImage from 'figma:asset/a163b0438899761e6de30773381158aa6a8fce3c.png';
import completedSurgeryPreparationBundleImage from '/assests/completed02.webp';
// import cardiometabolicRiskImage from 'figma:asset/fdc40145acfa322877cd1761f1bde47228465bbd.png';
import resilienceIndexImage from '/assests/resi-hero.webp';
import completeLongevityBundleImage from '/assests/long-hero.webp';
import nutritionBodyCompositionImage from '/assests/nutrition-hero.webp';
import purpleGradientImage from '/assests/complication-hero.webp';
// import multiColorStripesImage from 'figma:asset/d746a8bd9d32934c155e6f367c1a324ba5d51655.png';
import purplesGradientImage from '/assests/anaesthesia-hero.webp';
import sympGradientImage from '/assests/symp-sever-hero.webp';
import mobility from '/assests/mobility-hero.webp';
import inflammation from '/assests/inflammation-hero.webp';
import burden from '/assests/burden-hero.webp';
import daily from '/assests/energy-hero.webp';
import lifestyle from '/assests/lifestyle-hero.webp';
import cardio from '/assests/cardio-hero.webp';
import nut from '/assests/nutrition-hero.webp';
import func from '/assests/functional-hero.webp';
import chronic from '/assests/completed01.webp';

// UI Components and Hooks
import { Toaster } from './components/ui/sonner';
import { useAnalytics } from './hooks/useAnalytics';
import './utils/analyticsTest'; // Initialize analytics testing utilities

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
  description: string;
  isTrialOffer?: boolean;
}

export interface Assessment {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  icon: React.ReactNode;
  features: string[];
  hidden?: boolean; // Add hidden property for protocol assessments
}

export interface BasketItem {
  assessment: Assessment;
  quantity: number;
}

const globalAssessments: Assessment[] = [
  {
    id: '1',
    name: 'Surgery Readiness Score',
    description: "The first step to taking control of your surgery risks is understanding them. We'll help you get a clear picture of where you are right now, and show you the path toward where you want to be — with guidance and support at every step.",
    price: 37.00,
    image: surgeryReadinessImage,
    icon: <Shield className="w-6 h-6" />,
    features: ['Your personalized readiness score', 'An in-depth report detailing your current health status', 'Bespoke recommendations designed to reduce risks and optimise your outcome']
  },
  {
    id: '2',
    name: 'Practical Biological Age Proxy',
    description: 'Advanced biomarker analysis to determine your true biological age compared to chronological age.',
    price: 49.99,
   image: biologicalAgeImage,
    icon: <Clock className="w-6 h-6" />,
    features: ['Comprehensive biomarker testing', 'Age acceleration analysis', 'Personalized longevity insights']
  },
  {
    id: '3',
    name: 'Healthspan Optimization Protocol',
    description: 'Comprehensive protocol to extend healthy lifespan and optimize physical and cognitive function throughout aging.',
    price: 59.99,
   // image: healthspanImage,
    icon: <TrendingUp className="w-6 h-6" />,
    features: ['Healthspan extension strategies', 'Cognitive optimization protocols', 'Physical function preservation'],
    hidden: true // Hidden as it may not have a complete funnel yet
  },
  {
    id: '4',
    name: 'Red Flag Health Screen',
    description: 'Critical health screening to identify immediate risk factors and warning signs requiring urgent attention.',
    price: 34.99,
   // image: redFlagImage,
    icon: <AlertTriangle className="w-6 h-6" />,
    features: ['Critical risk identification', 'Warning sign detection', 'Urgent intervention recommendations'],
    hidden: true // Hidden as it may not have a complete funnel yet
  },
  {
    id: '5',
    name: 'Surgery Conditioning Protocol - 14 Day Free Trial',
    description: 'Comprehensive 14-day program to optimize your physical and mental preparation for upcoming surgery.',
    price: 200.00,
  //  image: multiColorStripesImage,
    icon: <Shield className="w-6 h-6" />,
    features: ['Pre-surgical conditioning protocol', '14-day structured program', 'Recovery optimization guidance'],
    hidden: true
  },
  {
    id: '6',
    name: 'Complication Risk Checker',
    description: 'Comprehensive lifestyle and comorbidity analysis to predict and prevent surgical complications before they occur.',
    price: 40.00,
   image: purpleGradientImage,
    icon: <AlertTriangle className="w-6 h-6" />,
    features: ['Lifestyle risk factor analysis', 'Comorbidity assessment scoring', 'Personalized prevention strategies']
  },
  {
    id: '7',
    name: 'Recovery Speed Predictor',
    description: 'Personalized recovery timeline based on nutrition, mindset, and home support systems to optimize healing.',
    price: 45.00,
   image: nutritionBodyCompositionImage,
    icon: <Zap className="w-6 h-6" />,
    features: ['Nutrition impact analysis', 'Mental readiness assessment', 'Support system optimization']
  },
  {
    id: '8',
    name: 'Anaesthesia Risk Screener',
    description: 'Critical screening for anaesthesia complications based on sleep patterns, medications, and lifestyle factors.',
    price: 35.00,
   image: purplesGradientImage,
    icon: <Heart className="w-6 h-6" />,
    features: ['Sleep apnoea risk assessment', 'Medication interaction analysis', 'Alcohol impact evaluation']
  },
  {
    id: '9',
    name: 'Mobility & Strength Score',
    description: 'Baseline physical assessment to track post-operative recovery progress and optimize rehabilitation outcomes.',
    price: 50.00,
   image: mobility,
    icon: <Activity className="w-6 h-6" />,
    features: ['Baseline mobility measurement', 'Strength assessment scoring', 'Recovery milestone tracking']
  },
  {
    id: '10',
    name: 'Symptom Severity Index',
    description: 'Comprehensive assessment capturing frequency and intensity of pain, fatigue, digestive or joint issues.',
    price: 43.00,
   image: sympGradientImage,
    icon: <Thermometer className="w-6 h-6" />,
    features: ['Pain intensity scoring', 'Fatigue impact analysis', 'Digestive symptom tracking']
  },
  {
    id: '11',
    name: 'Inflammation Risk Score',
    description: 'Evidence-based assessment rooted in diet, lifestyle, sleep patterns, and stress levels.',
    price: 39.00,
   image: inflammation,
    icon: <Heart className="w-6 h-6" />,
    features: ['Dietary inflammation analysis', 'Lifestyle factor assessment', 'Stress impact evaluation']
  },
  {
    id: '12',
    name: 'Medication Burden Calculator',
    description: 'Comprehensive analysis weighing prescription load and potential drug interaction risks.',
    price: 47.00,
   image: burden,
    icon: <Pill className="w-6 h-6" />,
    features: ['Polypharmacy assessment', 'Drug interaction screening', 'Side effect burden analysis']
  },
  {
    id: '13',
    name: 'Daily Energy Audit',
    description: 'Detailed snapshot of fatigue patterns, sleep quality metrics, and stamina optimization potential.',
    price: 42.00,
   image: daily,
    icon: <Battery className="w-6 h-6" />,
    features: ['Energy pattern analysis', 'Sleep quality assessment', 'Stamina optimization plan']
  },
  {
    id: '14',
    name: 'Lifestyle Limiter Score',
    description: 'Quantifies real-world impact on work performance, social connections, and physical activities.',
    price: 45.00,
   image: lifestyle,
    icon: <Users className="w-6 h-6" />,
    features: ['Work impact assessment', 'Social activity limitation analysis', 'Physical function scoring']
  },
  {
    id: '15',
    name: 'Chronic Symptom Protocol Challenge - 14 Day Challenge',
    description: 'Comprehensive 14-day program to manage chronic symptoms and optimize daily living with evidence-based strategies.',
    price: 200.00,
  //  image: multiColorStripesImage,
    icon: <Shield className="w-6 h-6" />,
    features: ['Chronic symptom management protocol', '14-day structured program', 'Daily living optimization guidance'],
    hidden: true
  },
  {
    id: '16',
    name: 'Longevity Focus Protocol - 14 Day Challenge',
    description: 'Comprehensive 14-day program to slow aging, extend healthspan, and optimize biological function for peak longevity.',
    price: 200.00,
  //  image: multiColorStripesImage,
    icon: <Clock className="w-6 h-6" />,
    features: ['Biological aging optimization protocol', '14-day structured program', 'Longevity and healthspan enhancement guidance'],
    hidden: true
  },
  {
    id: '17',
    name: 'Cardiometabolic Risk Score',
    description: 'Comprehensive heart and metabolic health assessment to identify cardiovascular disease and diabetes risk factors.',
    price: 39.99,
   image: cardio,
    icon: <Heart className="w-6 h-6" />,
    features: ['Cardiovascular risk analysis', 'Metabolic health assessment', 'Personalized prevention strategies']
  },
  {
    id: '18',
    name: 'Resilience Index',
    description: 'Comprehensive mental and physical resilience assessment to measure your ability to adapt, recover, and thrive under stress.',
    price: 49.99,
   image: resilienceIndexImage,
    icon: <Zap className="w-6 h-6" />,
    features: ['Stress resilience analysis', 'Recovery capacity assessment', 'Personalized resilience building strategies']
  },
  {
    id: '19',
    name: 'Nutrition & Body Composition Score',
    description: 'Comprehensive nutritional and body composition assessment to optimize metabolic health, body composition, and nutritional status.',
    price: 49.99,
   image: nut,
    icon: <Apple className="w-6 h-6" />,
    features: ['Body composition analysis', 'Nutritional deficiency assessment', 'Personalized nutrition optimization strategies']
  },
  {
    id: '20',
    name: 'Functional Fitness Age Test',
    description: 'Comprehensive physical capability assessment to determine your functional fitness age and identify movement quality decline patterns.',
    price: 44.99,
   image: func,
    icon: <Activity className="w-6 h-6" />,
    features: ['Movement quality analysis', 'Physical capability assessment', 'Personalized fitness optimization strategies']
  },
  {
    id: '21',
    name: 'Completed Surgery Preparation Bundle',
    description: 'The smarter way to prepare for surgery. This premium package brings every essential check together in one streamlined experience, helping you feel informed, confident, and fully prepared—while saving on the total cost.',
    price: 120.00,
   image: completedSurgeryPreparationBundleImage,
    icon: <Shield className="w-6 h-6" />,
    features: ['Complete surgical readiness assessment', 'Comprehensive risk factor analysis', 'Personalized preparation strategies']
  },
  {
    id: '22',
    name: 'Completed Chronic Symptoms Bundle',
    description: 'Comprehensive chronic symptom management assessment combining severity analysis, inflammation risk, medication burden, energy patterns, and lifestyle impact evaluation in one complete bundle.',
    price: 125.40,
   image: chronic,
    icon: <Stethoscope className="w-6 h-6" />,
    features: ['Complete chronic symptom assessment', 'Comprehensive lifestyle impact analysis', 'Personalized management strategies']
  },
  {
    id: '23',
    name: 'Complete Longevity Bundle',
    description: 'Comprehensive longevity optimization assessment combining Biological Age Calculator, Cardiometabolic Risk Score, Resilience Index, Nutrition & Body Composition Score, and Functional Fitness Age Test in one complete bundle.',
    price: 138.00,
   image: completeLongevityBundleImage,
    icon: <Clock className="w-6 h-6" />,
    features: ['Biological Age Calculator assessment', 'Cardiometabolic Risk Score analysis', 'Resilience Index & Nutrition evaluation', 'Functional Fitness Age testing', 'Personalized longevity optimization strategies']
  }
];

// Helper function to get visible assessments (filters out hidden ones)
export const getVisibleAssessments = (category?: string): Assessment[] => {
  const visibleAssessments = globalAssessments.filter(assessment => !assessment.hidden);

  if (!category || category === 'all') {
    return visibleAssessments;
  }

  // Filter based on assessment content and purpose
  if (category === 'bundle') {
    return visibleAssessments.filter(assessment =>
      assessment.id === '21' || // Completed Surgery Preparation Bundle
      assessment.id === '22' || // Completed Chronic Symptoms Bundle
      assessment.id === '23'    // Complete Longevity Bundle
    );
  }

  if (category === 'symptoms-control') {
    return visibleAssessments.filter(assessment =>
      assessment.id === '10' || // Symptom Severity Index
      assessment.id === '11' || // Inflammation Risk Score
      assessment.id === '12' || // Medication Burden Calculator
      assessment.id === '13' || // Daily Energy Audit
      assessment.id === '14'    // Lifestyle Limiter Score
    );
  }

  if (category === 'surgery-preparation') {
    return visibleAssessments.filter(assessment =>
      assessment.id === '1' ||  // Surgery Readiness Score
      assessment.id === '6' ||  // Complication Risk Checker
      assessment.id === '7' ||  // Recovery Speed Predictor
      assessment.id === '8' ||  // Anaesthesia Risk Screener
      assessment.id === '9'     // Mobility & Strength Score
    );
  }

  if (category === 'longevity') {
    return visibleAssessments.filter(assessment =>
      assessment.id === '2' ||  // Practical Biological Age Proxy
      assessment.id === '17' || // Cardiometabolic Risk Score
      assessment.id === '18' || // Resilience Index
      assessment.id === '19' || // Nutrition & Body Composition Score
      assessment.id === '20'    // Functional Fitness Age Test
    );
  }

  return visibleAssessments;
};

// Export the full assessment array for individual access
export { globalAssessments };

export default function App() {
  const [showDesignSystem, setShowDesignSystem] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState<string | null>(null);
  const [showHealthConciergeOptIn, setShowHealthConciergeOptIn] = useState(false);
  const [hasSeenOptIn, setHasSeenOptIn] = useState(false);

  // Initialize analytics
  const analytics = useAnalytics();

  // Define the upgrade to bundle function early to ensure it's available
const handleUpgradeToBundle = useCallback((bundleId: string) => {
  console.log('handleUpgradeToBundle called with bundleId:', bundleId);

  try {
    const bundle = globalAssessments.find(a => a.id === bundleId);
    console.log('Found bundle:', bundle);

    if (!bundle) {
      console.error('Bundle not found with id:', bundleId);
      alert('Bundle not found. Please try again.');
      analytics.trackError('bundle_not_found', `Bundle ID ${bundleId} not found`, currentPage);
      return;
    }

    // Get current basket items for tracking
    const currentAssessmentIds = basketItems.map(item => item.assessment.id);
    const currentValue = basketItems.reduce((total, item) => total + item.assessment.price, 0);
    const savings = currentValue - bundle.price;

    console.log('Clearing current basket and adding bundle');

    // Track bundle upgrade BEFORE state changes
    analytics.trackBundleUpgrade(currentAssessmentIds, bundleId, bundle.name, savings);

    // Clear current basket and add the bundle in a single state update
    setBasketItems([{ assessment: bundle, quantity: 1 }]);
    console.log('setBasketItems called with:', [{ assessment: bundle, quantity: 1 }]);

    // Don't close/reopen basket - just let it update naturally
    // The basket will re-render with the new items automatically

  } catch (error) {
    console.error('Error in handleUpgradeToBundle:', error);
    analytics.trackError('bundle_upgrade_error', error.message, currentPage);
    alert('There was an error upgrading to the bundle. Please try again.');
  }
}, [basketItems, analytics, currentPage]); // Add dependencies

  // Health Concierge opt-in timer
  useEffect(() => {
    if (hasSeenOptIn) return;

    const timer = setTimeout(() => {
      setShowHealthConciergeOptIn(true);
      analytics.trackUserJourneyMilestone('health_concierge_popup_shown', 20000);
    }, 20000); // 20 seconds

    return () => clearTimeout(timer);
  }, [hasSeenOptIn, analytics]);

useEffect(() => {
  const handleHashChange = () => {
    const hash = window.location.hash.replace('#', '');
    const newPage = hash || 'home';

    // Only update page and scroll if it's actually a different page
    if (newPage !== currentPage) {
      setCurrentPage(newPage);

      // Track page navigation
      analytics.trackPage(newPage, 'Navigation');

      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  window.addEventListener('hashchange', handleHashChange);
  handleHashChange(); // Check initial hash

  return () => window.removeEventListener('hashchange', handleHashChange);
}, [currentPage, analytics]);



  // Set current assessment based on the current page
  useEffect(() => {
    if (currentPage.includes('surgery-readiness-assessment-questions')) {
      setCurrentAssessment('surgery-readiness');
    } else if (currentPage.includes('biological-age-calculator-questions')) {
      setCurrentAssessment('biological-age');
    } else if (currentPage.includes('cardiometabolic-risk-score-questions')) {
      setCurrentAssessment('cardiometabolic-risk');
    } else if (currentPage.includes('resilience-index-questions')) {
      setCurrentAssessment('resilience-index');
    } else if (currentPage.includes('nutrition-body-composition-score-questions')) {
      setCurrentAssessment('nutrition-body-composition');
    } else if (currentPage.includes('functional-fitness-age-test-questions')) {
      setCurrentAssessment('functional-fitness-age');
    } else if (currentPage.includes('completed-surgery-preparation-bundle-questions')) {
      setCurrentAssessment('completed-surgery-preparation');
    } else if (currentPage.includes('completed-chronic-symptoms-bundle-questions')) {
      setCurrentAssessment('completed-chronic-symptoms');
    } else if (currentPage.includes('longevity-wellness-bundle-questions')) {
      setCurrentAssessment('longevity-wellness-bundle');
    } else if (currentPage.includes('complication-risk-checker-questions')) {
      setCurrentAssessment('complication-risk');
    } else if (currentPage.includes('recovery-speed-predictor-questions')) {
      setCurrentAssessment('recovery-speed');
    } else if (currentPage.includes('anaesthesia-risk-screener-questions')) {
      setCurrentAssessment('anaesthesia-risk');
    } else if (currentPage.includes('mobility-strength-score-questions')) {
      setCurrentAssessment('mobility-strength');
    } else if (currentPage.includes('symptom-severity-index-questions')) {
      setCurrentAssessment('symptom-severity');
    } else if (currentPage.includes('inflammation-risk-score-questions')) {
      setCurrentAssessment('inflammation-risk');
    } else if (currentPage.includes('medication-burden-calculator-questions')) {
      setCurrentAssessment('medication-burden');
    } else if (currentPage.includes('daily-energy-audit-questions')) {
      setCurrentAssessment('daily-energy');
    } else if (currentPage.includes('lifestyle-limiter-score-questions')) {
      setCurrentAssessment('lifestyle-limiter');
    } else if (currentPage.includes('health-concierge-questions')) {
      setCurrentAssessment('health-concierge');
    }
  }, [currentPage]);

  const handleRequestQuote = (product: Product) => {
    // Store the product context for the contact form
    sessionStorage.setItem('requestedService', JSON.stringify({
      name: product.name,
      category: product.category,
      price: product.price
    }));

    // Track lead generation
    analytics.trackLeadGenerated('product_quote_request', product.category, product.price);

    // Navigate to contact page
    window.location.hash = 'contact';
  };

  const handleAddToCart = (product: Product) => {
    // Convert Product to Assessment for Surgery Conditioning Protocol
    if (product.isTrialOffer && product.category === 'Surgery Conditioning') {
      const surgeryAssessment = globalAssessments.find(a => a.id === '5');
      if (surgeryAssessment) {
        addToBasket(surgeryAssessment);
      }
    }
    // Convert Product to Assessment for Chronic Symptom Protocol
    if (product.isTrialOffer && product.category === 'Chronic Symptom Management') {
      const chronicAssessment = globalAssessments.find(a => a.id === '15');
      if (chronicAssessment) {
        addToBasket(chronicAssessment);
      }
    }
    // Convert Product to Assessment for Longevity Focus Protocol
    if (product.isTrialOffer && product.category === 'Longevity Optimization') {
      const longevityAssessment = globalAssessments.find(a => a.id === '16');
      if (longevityAssessment) {
        addToBasket(longevityAssessment);
      }
    }
  };

  const addToBasket = (assessment: Assessment) => {
    setBasketItems(prev => {
      const existingItem = prev.find(item => item.assessment.id === assessment.id);
      if (existingItem) {
        // Item already exists, don't add duplicate
        analytics.trackError('duplicate_basket_item', `Attempted to add duplicate item: ${assessment.name}`, currentPage);
        return prev;
      }

      // Track successful add to basket
      analytics.trackAddToBasket(assessment.id, assessment.name, assessment.price);

      return [...prev, { assessment, quantity: 1 }];
    });
    setIsBasketOpen(true);
  };

  const removeFromBasket = (assessmentId: string) => {
    const removedItem = basketItems.find(item => item.assessment.id === assessmentId);
    if (removedItem) {
      analytics.trackRemoveFromBasket(removedItem.assessment.id, removedItem.assessment.name);
    }

    setBasketItems(prev => prev.filter(item => item.assessment.id !== assessmentId));
  };

  const getTotalPrice = () => {
    return basketItems.reduce((total, item) => total + item.assessment.price, 0);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage onRequestQuote={handleRequestQuote} />;
      case 'assessments':
          return <AssessmentsPage
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
          />;
      case 'contact':
        return <ContactPage />;
      case 'health-concierge':
        return <HealthConciergePage />;
      case 'terms':
        return <TermsPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'cookies':

      case 'cancel':
          return <Cancel />;

      case 'success':
          return <Success />;


        return <CookiePage />;
      case 'complaints':
        return <ComplaintsPage />;
      case 'quiz':
        return <QuizPage />;
      case 'surgery-readiness-assessment-learn-more':
          return <SurgeryReadinessUpsellPage
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
          />;

      case 'surgery-readiness-assessment-questions':
        return <SurgeryReadinessQuestionsPage />;
      case 'surgery-readiness-assessment-information':
        return <SurgeryReadinessInformationPage />;
      case 'biological-age-calculator-learn-more':
          return <BiologicalAgeUpsellPage
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
          />;

      case 'health-concierge-information-user':
          return <HealthConciergeInformationUser />;
      case 'biological-age-calculator-questions':
        return <BiologicalAgeQuestionsPage />;
      case 'biological-age-calculator-information':
        return <BiologicalAgeInformationPage />;
      case 'cardiometabolic-risk-score-learn-more':
          return <CardiometabolicRiskUpsellPage
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
          />;
      case 'cardiometabolic-risk-score-questions':
        return <CardiometabolicRiskQuestionsPage />;
      case 'cardiometabolic-risk-score-information':
        return <CardiometabolicRiskInformationPage />;
      case 'database-processing':
        return <LoadingPage onComplete={() => {
          // Determine which assessment results page to navigate to based on the current assessment
          if (currentAssessment === 'surgery-readiness') {
            setCurrentPage('surgery-readiness-assessment-results');
          } else if (currentAssessment === 'biological-age') {
            setCurrentPage('biological-age-calculator-results');
          } else if (currentAssessment === 'cardiometabolic-risk') {
            setCurrentPage('cardiometabolic-risk-score-results');
          } else if (currentAssessment === 'resilience-index') {
            setCurrentPage('resilience-index-results');
          } else if (currentAssessment === 'nutrition-body-composition') {
            setCurrentPage('nutrition-body-composition-score-results');
          } else if (currentAssessment === 'functional-fitness-age') {
            setCurrentPage('functional-fitness-age-test-results');
          } else if (currentAssessment === 'completed-surgery-preparation') {
            setCurrentPage('completed-surgery-preparation-bundle-results');
          } else if (currentAssessment === 'completed-chronic-symptoms') {
            setCurrentPage('completed-chronic-symptoms-bundle-results');
          } else if (currentAssessment === 'longevity-wellness-bundle') {
            setCurrentPage('longevity-wellness-bundle-results');
          } else if (currentAssessment === 'complication-risk') {
            setCurrentPage('complication-risk-checker-results');
          } else if (currentAssessment === 'recovery-speed') {
            setCurrentPage('recovery-speed-predictor-results');
          } else if (currentAssessment === 'anaesthesia-risk') {
            setCurrentPage('anaesthesia-risk-screener-results');
          } else if (currentAssessment === 'mobility-strength') {
            setCurrentPage('mobility-strength-score-results');
          } else if (currentAssessment === 'symptom-severity') {
            setCurrentPage('symptom-severity-index-results');
          } else if (currentAssessment === 'inflammation-risk') {
            setCurrentPage('inflammation-risk-score-results');
          } else if (currentAssessment === 'medication-burden') {
            setCurrentPage('medication-burden-calculator-results');
          } else if (currentAssessment === 'daily-energy') {
            setCurrentPage('daily-energy-audit-results');
          } else if (currentAssessment === 'lifestyle-limiter') {
            setCurrentPage('lifestyle-limiter-score-results');
          } else if (currentAssessment === 'health-concierge') {
            setCurrentPage('health-concierge-results');
          } else {
            // Fallback to surgery readiness if no assessment is set
            setCurrentPage('surgery-readiness-assessment-results');
          }
        }} />;
      case 'surgery-readiness-assessment-results':
        return <SurgeryReadinessResultsPage />;
      case 'surgery-readiness-assessment-feedback':
        return <SurgeryReadinessReviewPage />;
      case 'surgery-conditioning-protocol-challenge':
        return <UpsellPage onAddToCart={handleAddToCart} />;
      case 'biological-age-calculator-results':
        return <BiologicalAgeResultsPage />;
      case 'biological-age-calculator-feedback':
        return <BiologicalAgeReviewPage />;
      case 'cardiometabolic-risk-score-results':
        return <CardiometabolicRiskResultsPage />;
      case 'cardiometabolic-risk-score-feedback':
        return <CardiometabolicRiskReviewPage />;
      case 'resilience-index-learn-more':
          return <ResilienceIndexUpsellPage
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
          />;
      case 'resilience-index-questions':
        return <ResilienceIndexQuestionsPage />;
      case 'resilience-index-information':
        return <ResilienceIndexInformationPage />;
      case 'resilience-index-results':
        return <ResilienceIndexResultsPage />;
      case 'resilience-index-feedback':
        return <ResilienceIndexReviewPage />;
      case 'nutrition-body-composition-score-learn-more':
          return <NutritionBodyCompositionUpsellPage
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
          />;

      case 'nutrition-body-composition-score-questions':
        return <NutritionBodyCompositionQuestionsPage />;
      case 'nutrition-body-composition-score-information':
        return <NutritionBodyCompositionInformationPage />;
      case 'nutrition-body-composition-score-results':
        return <NutritionBodyCompositionResultsPage />;
      case 'nutrition-body-composition-score-feedback':
        return <NutritionBodyCompositionReviewPage />;
      case 'functional-fitness-age-test-learn-more':
          return <FunctionalFitnessAgeUpsellPage
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
          />;
      case 'functional-fitness-age-test-questions':
        return <FunctionalFitnessAgeQuestionsPage />;
      case 'functional-fitness-age-test-information':
        return <FunctionalFitnessAgeInformationPage />;
      case 'functional-fitness-age-test-results':
        return <FunctionalFitnessAgeResultsPage />;
      case 'functional-fitness-age-test-feedback':
        return <FunctionalFitnessAgeReviewPage />;
      case 'completed-surgery-preparation-bundle-learn-more':
        return <CompletedSurgeryPreparationUpsellPage />;
      case 'completed-surgery-preparation-bundle-questions':
        return <CompletedSurgeryPreparationQuestionsPage />;
      case 'completed-surgery-preparation-bundle-information':
        return <CompletedSurgeryPreparationInformationPage />;
      case 'completed-surgery-preparation-bundle-results':
        return <CompletedSurgeryPreparationResultsPage />;
      case 'completed-surgery-preparation-bundle-feedback':
        return <CompletedSurgeryPreparationReviewPage />;
      case 'completed-chronic-symptoms-bundle-learn-more':
        return <CompletedChronicSymptomsUpsellPage />;
      case 'completed-chronic-symptoms-bundle-questions':
        return <CompletedChronicSymptomsQuestionsPage />;
      case 'completed-chronic-symptoms-bundle-information':
        return <CompletedChronicSymptomsInformationPage />;
      case 'completed-chronic-symptoms-bundle-results':
        return <CompletedChronicSymptomsResultsPage />;
      case 'completed-chronic-symptoms-bundle-feedback':
        return <CompletedChronicSymptomsReviewPage />;
      case 'longevity-wellness-bundle-learn-more':
        return <LongevityWellnessBundleUpsellPage />;
      case 'longevity-wellness-bundle-questions':
        return <LongevityWellnessBundleQuestionsPage />;
      case 'longevity-wellness-bundle-information':
        return <LongevityWellnessBundleInformationPage />;
      case 'longevity-wellness-bundle-results':
        return <LongevityWellnessBundleResultsPage />;
      case 'longevity-wellness-bundle-feedback':
        return <LongevityWellnessBundleReviewPage />;
      case 'longevity-focus-protocol-challenge':
        return <LongevityFocusProtocolPage onAddToCart={handleAddToCart} />;
      case 'blog':
        return <BlogPage />;
      case 'blog/10-surgery-ready-signs':
        return <SurgeryReadySignsPage />;
      case 'blog/red-flags-surgery':
        return <RedFlagsSurgeryPage />;
      case 'blog/home-tweaks-recovery':
        return <HomeTweaksPage />;
      case 'blog/morning-stiffness-solutions':
        return <MorningStiffnessPage />;
      case 'blog/complication-risk-factors':
        return <ComplicationRiskFactorsPage />;
      case 'blog/recovery-speed-secrets':
        return <RecoverySpeedSecretsPage />;
      case 'blog/anaesthesia-risks':
        return <AnaesthesiaRisksPage />;
      case 'blog/mobility-baseline':
        return <MobilityBaselinePage />;
      case 'blog/symptom-severity-guide':
        return <SymptomSeverityGuidePage />;
      case 'blog/inflammation-trigger-guide':
        return <InflammationTriggerGuidePage />;
      case 'blog/medication-safety-guide':
        return <MedicationSafetyGuidePage />;
      case 'blog/energy-optimization-guide':
        return <EnergyOptimizationGuidePage />;
      case 'blog/lifestyle-impact-guide':
        return <LifestyleImpactGuidePage />;
      case 'blog/7-aging-faster-signs':
        return <AgingFasterSignsPage />;
      case 'blog/cardiometabolic-risk-signs':
        return <CardiometabolicRiskSignsPage />;
      case 'blog/resilience-signs':
        return <ResilienceSignsPage />;
      case 'blog/nutrition-body-composition-signs':
        return <NutritionBodyCompositionSignsPage />;
      case 'blog/functional-fitness-age-signs':
        return <FunctionalFitnessAgeSignsPage />;
      case 'complication-risk-checker-upsell':
        return <ComplicationRiskUpsellPage />;
      case 'complication-risk-checker-learn-more':
  return <ComplicationRiskUpsellPage
    onAddToBasket={addToBasket}
    onOpenBasket={() => setIsBasketOpen(true)}
  />;
      case 'complication-risk-checker-questions':
        return <ComplicationRiskQuestionsPage />;
      case 'complication-risk-checker-information':
        return <ComplicationRiskInformationPage />;
      case 'complication-risk-checker-results':
        return <ComplicationRiskResultsPage />;
      case 'complication-risk-checker-feedback':
        return <ComplicationRiskReviewPage />;
      case 'recovery-speed-predictor-learn-more':
  return <RecoverySpeedUpsellPage
    onAddToBasket={addToBasket}
    onOpenBasket={() => setIsBasketOpen(true)}
  />;

      case 'recovery-speed-predictor-questions':
        return <RecoverySpeedQuestionsPage />;
      case 'recovery-speed-predictor-information':
        return <RecoverySpeedInformationPage />;
      case 'recovery-speed-predictor-results':
        return <RecoverySpeedResultsPage />;
      case 'recovery-speed-predictor-feedback':
        return <RecoverySpeedReviewPage />;
      case 'anaesthesia-risk-screener-learn-more':
  return <AnaesthesiaRiskUpsellPage
    onAddToBasket={addToBasket}
    onOpenBasket={() => setIsBasketOpen(true)}
  />;      case 'anaesthesia-risk-screener-questions':
        return <AnaesthesiaRiskQuestionsPage />;
      case 'anaesthesia-risk-screener-information':
        return <AnaesthesiaRiskInformationPage />;
      case 'anaesthesia-risk-screener-results':
        return <AnaesthesiaRiskResultsPage />;
      case 'anaesthesia-risk-screener-feedback':
        return <AnaesthesiaRiskReviewPage />;
      case 'mobility-strength-score-learn-more':
          return <MobilityStrengthUpsellPage
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
          />;

      case 'mobility-strength-score-questions':
        return <MobilityStrengthQuestionsPage />;
      case 'mobility-strength-score-information':
        return <MobilityStrengthInformationPage />;
      case 'mobility-strength-score-results':
        return <MobilityStrengthResultsPage />;
      case 'mobility-strength-score-feedback':
        return <MobilityStrengthReviewPage />;
      case 'symptom-severity-index-learn-more':
          return <SymptomSeverityUpsellPage
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
          />;

      case 'symptom-severity-index-questions':
        return <SymptomSeverityQuestionsPage />;
      case 'symptom-severity-index-information':
        return <SymptomSeverityInformationPage />;
      case 'symptom-severity-index-results':
        return <SymptomSeverityResultsPage />;
      case 'symptom-severity-index-feedback':
        return <SymptomSeverityReviewPage />;
      case 'inflammation-risk-score-learn-more':
          return <InflammationRiskUpsellPage
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
          />;

      case 'inflammation-risk-score-questions':
        return <InflammationRiskQuestionsPage />;
      case 'inflammation-risk-score-information':
        return <InflammationRiskInformationPage />;
      case 'inflammation-risk-score-results':
        return <InflammationRiskResultsPage />;
      case 'inflammation-risk-score-feedback':
        return <InflammationRiskReviewPage />;
      case 'medication-burden-calculator-learn-more':
          return <MedicationBurdenUpsellPage
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
          />;

      case 'medication-burden-calculator-questions':
        return <MedicationBurdenQuestionsPage />;
      case 'medication-burden-calculator-information':
        return <MedicationBurdenInformationPage />;
      case 'medication-burden-calculator-results':
        return <MedicationBurdenResultsPage />;
      case 'medication-burden-calculator-feedback':
        return <MedicationBurdenReviewPage />;
      case 'daily-energy-audit-learn-more':
          return <DailyEnergyUpsellPage
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
          />;
      case 'daily-energy-audit-questions':
        return <DailyEnergyQuestionsPage />;
      case 'daily-energy-audit-information':
        return <DailyEnergyInformationPage />;
      case 'daily-energy-audit-results':
        return <DailyEnergyResultsPage />;
      case 'daily-energy-audit-feedback':
        return <DailyEnergyReviewPage />;
      case 'lifestyle-limiter-score-learn-more':
          return <LifestyleLimiterUpsellPage
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
          />;
      case 'lifestyle-limiter-score-questions':
        return <LifestyleLimiterQuestionsPage />;
      case 'lifestyle-limiter-score-information':
        return <LifestyleLimiterInformationPage />;
      case 'lifestyle-limiter-score-results':
        return <LifestyleLimiterResultsPage />;
      case 'lifestyle-limiter-score-feedback':
        return <LifestyleLimiterReviewPage />;
      case 'chronic-symptom-protocol-challenge':
  return <ChronicSymptomProtocolPage
    onAddToCart={handleAddToCart}
    onOpenBasket={() => setIsBasketOpen(true)}
  />;
      case 'health-concierge-information':
        return <HealthConciergeInformationPage />;
      case 'health-concierge-questions':
        return <HealthConciergeQuestionsPage />;
      case 'health-concierge-results':
        return <HealthConciergeResultsPage />;
      case 'admin-login':
        return <AdminLoginPage />;
      case 'admin-dashboard':
        return <AdminDashboardPage />;
      case 'analytics-test':
        return <AnalyticsTestPage />;
      default:
        return <HomePage onRequestQuote={handleRequestQuote} />;
    }
  };

  const isQuizPage = useCallback(() => {
    // Pages where footer should be hidden
    const quizPages = [
      'surgery-readiness-assessment-learn-more',
      'surgery-readiness-assessment-questions',
      'surgery-readiness-assessment-information',
      'biological-age-calculator-learn-more',
      'biological-age-calculator-questions',
      'biological-age-calculator-information',
      'biological-age-calculator-results',
      'biological-age-calculator-feedback',
      'cardiometabolic-risk-score-learn-more',
      'cardiometabolic-risk-score-questions',
      'cardiometabolic-risk-score-information',
      'cardiometabolic-risk-score-results',
      'cardiometabolic-risk-score-feedback',
      'resilience-index-learn-more',
      'resilience-index-questions',
      'resilience-index-information',
      'resilience-index-results',
      'resilience-index-feedback',
      'nutrition-body-composition-score-learn-more',
      'nutrition-body-composition-score-questions',
      'nutrition-body-composition-score-information',
      'nutrition-body-composition-score-results',
      'nutrition-body-composition-score-feedback',
      'functional-fitness-age-test-learn-more',
      'functional-fitness-age-test-questions',
      'functional-fitness-age-test-information',
      'functional-fitness-age-test-results',
      'functional-fitness-age-test-feedback',
      'completed-surgery-preparation-bundle-learn-more',
      'completed-surgery-preparation-bundle-questions',
      'completed-surgery-preparation-bundle-information',
      'completed-surgery-preparation-bundle-results',
      'completed-surgery-preparation-bundle-feedback',
      'completed-chronic-symptoms-bundle-learn-more',
      'completed-chronic-symptoms-bundle-questions',
      'completed-chronic-symptoms-bundle-information',
      'completed-chronic-symptoms-bundle-results',
      'completed-chronic-symptoms-bundle-feedback',
      'longevity-wellness-bundle-learn-more',
      'longevity-wellness-bundle-questions',
      'longevity-wellness-bundle-information',
      'longevity-wellness-bundle-results',
      'longevity-wellness-bundle-feedback',
      'database-processing',
      'surgery-readiness-assessment-results',
      'surgery-readiness-assessment-feedback',
      'surgery-conditioning-protocol-challenge',
      'longevity-focus-protocol-challenge',
      'complication-risk-checker-learn-more',
      'complication-risk-checker-questions',
      'complication-risk-checker-information',
      'complication-risk-checker-results',
      'complication-risk-checker-feedback',
      'recovery-speed-predictor-learn-more',
      'recovery-speed-predictor-questions',
      'recovery-speed-predictor-information',
      'recovery-speed-predictor-results',
      'recovery-speed-predictor-feedback',
      'anaesthesia-risk-screener-learn-more',
      'anaesthesia-risk-screener-questions',
      'anaesthesia-risk-screener-information',
      'anaesthesia-risk-screener-results',
      'anaesthesia-risk-screener-feedback',
      'mobility-strength-score-learn-more',
      'mobility-strength-score-questions',
      'mobility-strength-score-information',
      'mobility-strength-score-results',
      'mobility-strength-score-feedback',
      'symptom-severity-index-learn-more',
      'symptom-severity-index-questions',
      'symptom-severity-index-information',
      'symptom-severity-index-results',
      'symptom-severity-index-feedback',
      'inflammation-risk-score-learn-more',
      'inflammation-risk-score-questions',
      'inflammation-risk-score-information',
      'inflammation-risk-score-results',
      'inflammation-risk-score-feedback',
      'medication-burden-calculator-learn-more',
      'medication-burden-calculator-questions',
      'medication-burden-calculator-information',
      'medication-burden-calculator-results',
      'medication-burden-calculator-feedback',
      'daily-energy-audit-learn-more',
      'daily-energy-audit-questions',
      'daily-energy-audit-information',
      'daily-energy-audit-results',
      'daily-energy-audit-feedback',
      'lifestyle-limiter-score-learn-more',
      'lifestyle-limiter-score-questions',
      'lifestyle-limiter-score-information',
      'lifestyle-limiter-score-results',
      'lifestyle-limiter-score-feedback',
      'chronic-symptom-protocol-challenge',
      'health-concierge-questions',
      'health-concierge-results'
    ];
    return quizPages.includes(currentPage);
  }, [currentPage]);

  if (showDesignSystem) {
    return (
      <DesignSystemApp onBack={() => setShowDesignSystem(false)} />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        onDesignSystemClick={() => setShowDesignSystem(true)}
      />
      <main>
        {renderCurrentPage()}
      </main>
      {!isQuizPage() && <Footer />}
      <CookieConsent />
      {currentPage.endsWith('-results') && <ResultsNotification />}
      <HealthConciergeOptIn
        isOpen={showHealthConciergeOptIn}
        onClose={() => {
          setShowHealthConciergeOptIn(false);
          setHasSeenOptIn(true);
          analytics.trackUserJourneyMilestone('health_concierge_popup_dismissed');
        }}
        onAccept={() => {
          setShowHealthConciergeOptIn(false);
          setHasSeenOptIn(true);
          analytics.trackHealthConciergeOptIn('popup_opt_in');
          window.location.hash = 'health-concierge-questions';
        }}
      />
      <ShoppingBasket
        isOpen={isBasketOpen}
        onClose={() => setIsBasketOpen(false)}
        items={basketItems}
        onRemoveItem={removeFromBasket}
        onUpgradeToBundle={handleUpgradeToBundle}
        totalPrice={getTotalPrice()}
      />
      <Toaster />
    </div>
  );
}