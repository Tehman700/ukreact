import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
// Core Components (keep these as they're needed immediately)
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { ShoppingBasket } from './components/ShoppingBasket';
import { PageLoader } from './components/PageLoader';

// Critical pages (loaded immediately)
import { HomePageWithPuck } from './pages/HomePageWithPuck';
import { HomePage } from './pages/HomePage';


// =======
import { PurchaseThankYouPage } from './pages/PurchaseThankYouPage';

// Lazy load ALL non-critical pages for optimal performance
const DesignSystemApp = lazy(() => import('./components/design-system/DesignSystemApp').then(m => ({ default: m.DesignSystemApp })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const AssessmentsPage = lazy(() => import('./pages/AssessmentsPage').then(m => ({ default: m.AssessmentsPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const CookiePage = lazy(() => import('./pages/CookiePage').then(m => ({ default: m.CookiePage })));
const ComplaintsPage = lazy(() => import('./pages/ComplaintsPage').then(m => ({ default: m.ComplaintsPage })));
const QuizPage = lazy(() => import('./pages/QuizPage').then(m => ({ default: m.QuizPage })));
const LoadingPage = lazy(() => import('./pages/LoadingPage').then(m => ({ default: m.LoadingPage })));
const QuizResultsPage = lazy(() => import('./pages/QuizResultsPage').then(m => ({ default: m.QuizResultsPage })));
const UpsellPage = lazy(() => import('./pages/UpsellPage').then(m => ({ default: m.UpsellPage })));
const CQCPage = lazy(() => import('./pages/CQC').then(m => ({ default: m.CQCPage })));
// >>>>>>> 34c1ceb1cadc04b99f7cd857e2def27d39531e08

// Lazy load Puck pages
const SurgeryReadinessUpsellPageWithPuck = lazy(() => import('./pages/SurgeryReadinessUpsellPageWithPuck').then(m => ({ default: m.SurgeryReadinessUpsellPageWithPuck })));
const SurgeryReadinessUpsellPageBWithPuck = lazy(() => import('./pages/SurgeryReadinessUpsellPageBWithPuck').then(m => ({ default: m.SurgeryReadinessUpsellPageBWithPuck })));
const SurgeryReadinessUpsellPageCWithPuck = lazy(() => import('./pages/SurgeryReadinessUpsellPageCWithPuck').then(m => ({ default: m.SurgeryReadinessUpsellPageCWithPuck })));
const SurgeryReadinessUpsellPageDWithPuck = lazy(() => import('./pages/SurgeryReadinessUpsellPageDWithPuck').then(m => ({ default: m.SurgeryReadinessUpsellPageDWithPuck })));
const SurgeryReadinessUpsellPageEWithPuck = lazy(() => import('./pages/SurgeryReadinessUpsellPageEWithPuck').then(m => ({ default: m.SurgeryReadinessUpsellPageEWithPuck })));
const SurgeryReadinessUpsellPageFWithPuck = lazy(() => import('./pages/SurgeryReadinessUpsellPageFWithPuck').then(m => ({ default: m.SurgeryReadinessUpsellPageFWithPuck })));
const SurgeryReadinessUpsellPageGWithPuck = lazy(() => import('./pages/SurgeryReadinessUpsellPageGWithPuck').then(m => ({ default: m.SurgeryReadinessUpsellPageGWithPuck })));
const SurgeryReadinessUpsellPageHWithPuck = lazy(() => import('./pages/SurgeryReadinessUpsellPageHWithPuck').then(m => ({ default: m.SurgeryReadinessUpsellPageHWithPuck })));
const SurgeryReadinessUpsellPageIWithPuck = lazy(() => import('./pages/SurgeryReadinessUpsellPageIWithPuck').then(m => ({ default: m.SurgeryReadinessUpsellPageIWithPuck })));
const SurgeryReadinessUpsellPageJWithPuck = lazy(() => import('./pages/SurgeryReadinessUpsellPageJWithPuck').then(m => ({ default: m.SurgeryReadinessUpsellPageJWithPuck })));

// Lazy load Surgery Readiness pages
const SurgeryPreparationChecklistPage = lazy(() => import('./pages/SurgeryPreparationChecklistPage').then(m => ({ default: m.SurgeryPreparationChecklistPage })));
const SurgeryPreparationChecklistPageB = lazy(() => import('./pages/SurgeryPreparationChecklistPageB').then(m => ({ default: m.SurgeryPreparationChecklistPageB })));
const SurgeryPreparationChecklistPageC = lazy(() => import('./pages/SurgeryPreparationChecklistPageC').then(m => ({ default: m.SurgeryPreparationChecklistPageC })));
const SurgeryReadinessUpsellPage = lazy(() => import('./pages/SurgeryReadinessUpsellPage').then(m => ({ default: m.SurgeryReadinessUpsellPage })));
const SurgeryReadinessUpsellPageB = lazy(() => import('./pages/SurgeryReadinessUpsellPageB').then(m => ({ default: m.SurgeryReadinessUpsellPageB })));
const SurgeryReadinessUpsellPageC = lazy(() => import('./pages/SurgeryReadinessUpsellPageC').then(m => ({ default: m.SurgeryReadinessUpsellPageC })));
const SurgeryReadinessUpsellPageD = lazy(() => import('./pages/SurgeryReadinessUpsellPageD').then(m => ({ default: m.SurgeryReadinessUpsellPageD })));
const SurgeryReadinessUpsellPageE = lazy(() => import('./pages/SurgeryReadinessUpsellPageE').then(m => ({ default: m.SurgeryReadinessUpsellPageE })));
const SurgeryReadinessQuestionsPage = lazy(() => import('./pages/SurgeryReadinessQuestionsPage').then(m => ({ default: m.SurgeryReadinessQuestionsPage })));
const SurgeryReadinessInformationPage = lazy(() => import('./pages/SurgeryReadinessInformationPage').then(m => ({ default: m.SurgeryReadinessInformationPage })));
const SurgeryReadinessResultsPage = lazy(() => import('./pages/SurgeryReadinessResultsPage').then(m => ({ default: m.SurgeryReadinessResultsPage })));
const SurgeryReadinessResultsPageA = lazy(() => import('./pages/SurgeryReadinessResultsPageA').then(m => ({ default: m.SurgeryReadinessResultsPageA })));
const SurgeryReadinessResultsPageB = lazy(() => import('./pages/SurgeryReadinessResultsPageB').then(m => ({ default: m.SurgeryReadinessResultsPageB })));
const SurgeryReadinessResultsPageC = lazy(() => import('./pages/SurgeryReadinessResultsPageC').then(m => ({ default: m.SurgeryReadinessResultsPageC })));
const SurgeryReadinessReviewPage = lazy(() => import('./pages/SurgeryReadinessReviewPage').then(m => ({ default: m.SurgeryReadinessReviewPage })));
const SurgeryReadinessReviewPageA = lazy(() => import('./pages/SurgeryReadinessReviewPageA').then(m => ({ default: m.SurgeryReadinessReviewPageA })));
const SurgeryReadinessReviewPageB = lazy(() => import('./pages/SurgeryReadinessReviewPageB').then(m => ({ default: m.SurgeryReadinessReviewPageB })));
const SurgeryReadinessReviewPageC = lazy(() => import('./pages/SurgeryReadinessReviewPageC').then(m => ({ default: m.SurgeryReadinessReviewPageC })));
const SurgeryReadinessUpsellFinalA = lazy(() => import('./pages/SurgeryReadinessUpsellFinalA').then(m => ({ default: m.SurgeryReadinessUpsellFinalA })));
const SurgeryReadinessUpsellFinalB = lazy(() => import('./pages/SurgeryReadinessUpsellFinalB').then(m => ({ default: m.SurgeryReadinessUpsellFinalB })));
const SurgeryReadinessUpsellFinalC = lazy(() => import('./pages/SurgeryReadinessUpsellFinalC').then(m => ({ default: m.SurgeryReadinessUpsellFinalC })));
const HealthConciergeInformationUser = lazy(() => import('./pages/HealthConciergeInformationUser').then(m => ({ default: m.HealthConciergeInformationUser })));

const Questions_1 = lazy(() => import('./pages/Questions_1').then(m => ({ default: m.Questions_1 })));
const Questions_2 = lazy(() => import('./pages/Questions_2').then(m => ({ default: m.Questions_2 })));
const Questions_3 = lazy(() => import('./pages/Questions_3').then(m => ({ default: m.Questions_3 })));
const Information_1 = lazy(() => import('./pages/Information_1').then(m => ({ default: m.Information_1 })));
const Information_2 = lazy(() => import('./pages/Information_2').then(m => ({ default: m.Information_2 })));
const Information_3 = lazy(() => import('./pages/Information_3').then(m => ({ default: m.Information_3 })));

// All other assessment pages - lazy loaded
const BiologicalAgeUpsellPage = lazy(() => import('./pages/BiologicalAgeUpsellPage').then(m => ({ default: m.BiologicalAgeUpsellPage })));
const BiologicalAgeQuestionsPage = lazy(() => import('./pages/BiologicalAgeQuestionsPage').then(m => ({ default: m.BiologicalAgeQuestionsPage })));
const BiologicalAgeInformationPage = lazy(() => import('./pages/BiologicalAgeInformationPage').then(m => ({ default: m.BiologicalAgeInformationPage })));
const BiologicalAgeResultsPage = lazy(() => import('./pages/BiologicalAgeResultsPage').then(m => ({ default: m.BiologicalAgeResultsPage })));
const BiologicalAgeReviewPage = lazy(() => import('./pages/BiologicalAgeReviewPage').then(m => ({ default: m.BiologicalAgeReviewPage })));

const CardiometabolicRiskUpsellPage = lazy(() => import('./pages/CardiometabolicRiskUpsellPage').then(m => ({ default: m.CardiometabolicRiskUpsellPage })));
const CardiometabolicRiskQuestionsPage = lazy(() => import('./pages/CardiometabolicRiskQuestionsPage').then(m => ({ default: m.CardiometabolicRiskQuestionsPage })));
const CardiometabolicRiskInformationPage = lazy(() => import('./pages/CardiometabolicRiskInformationPage').then(m => ({ default: m.CardiometabolicRiskInformationPage })));
const CardiometabolicRiskResultsPage = lazy(() => import('./pages/CardiometabolicRiskResultsPage').then(m => ({ default: m.CardiometabolicRiskResultsPage })));
const CardiometabolicRiskReviewPage = lazy(() => import('./pages/CardiometabolicRiskReviewPage').then(m => ({ default: m.CardiometabolicRiskReviewPage })));

const ResilienceIndexUpsellPage = lazy(() => import('./pages/ResilienceIndexUpsellPage').then(m => ({ default: m.ResilienceIndexUpsellPage })));
const ResilienceIndexQuestionsPage = lazy(() => import('./pages/ResilienceIndexQuestionsPage').then(m => ({ default: m.ResilienceIndexQuestionsPage })));
const ResilienceIndexInformationPage = lazy(() => import('./pages/ResilienceIndexInformationPage').then(m => ({ default: m.ResilienceIndexInformationPage })));
const ResilienceIndexResultsPage = lazy(() => import('./pages/ResilienceIndexResultsPage').then(m => ({ default: m.ResilienceIndexResultsPage })));
const ResilienceIndexReviewPage = lazy(() => import('./pages/ResilienceIndexReviewPage').then(m => ({ default: m.ResilienceIndexReviewPage })));

const NutritionBodyCompositionUpsellPage = lazy(() => import('./pages/NutritionBodyCompositionUpsellPage').then(m => ({ default: m.NutritionBodyCompositionUpsellPage })));
const NutritionBodyCompositionQuestionsPage = lazy(() => import('./pages/NutritionBodyCompositionQuestionsPage').then(m => ({ default: m.NutritionBodyCompositionQuestionsPage })));
const NutritionBodyCompositionInformationPage = lazy(() => import('./pages/NutritionBodyCompositionInformationPage').then(m => ({ default: m.NutritionBodyCompositionInformationPage })));
const NutritionBodyCompositionResultsPage = lazy(() => import('./pages/NutritionBodyCompositionResultsPage').then(m => ({ default: m.NutritionBodyCompositionResultsPage })));
const NutritionBodyCompositionReviewPage = lazy(() => import('./pages/NutritionBodyCompositionReviewPage').then(m => ({ default: m.NutritionBodyCompositionReviewPage })));

const FunctionalFitnessAgeUpsellPage = lazy(() => import('./pages/FunctionalFitnessAgeUpsellPage').then(m => ({ default: m.FunctionalFitnessAgeUpsellPage })));
const FunctionalFitnessAgeQuestionsPage = lazy(() => import('./pages/FunctionalFitnessAgeQuestionsPage').then(m => ({ default: m.FunctionalFitnessAgeQuestionsPage })));
const FunctionalFitnessAgeInformationPage = lazy(() => import('./pages/FunctionalFitnessAgeInformationPage').then(m => ({ default: m.FunctionalFitnessAgeInformationPage })));
const FunctionalFitnessAgeResultsPage = lazy(() => import('./pages/FunctionalFitnessAgeResultsPage').then(m => ({ default: m.FunctionalFitnessAgeResultsPage })));
const FunctionalFitnessAgeReviewPage = lazy(() => import('./pages/FunctionalFitnessAgeReviewPage').then(m => ({ default: m.FunctionalFitnessAgeReviewPage })));

const CompletedSurgeryPreparationUpsellPage = lazy(() => import('./pages/CompletedSurgeryPreparationUpsellPage').then(m => ({ default: m.CompletedSurgeryPreparationUpsellPage })));
const CompletedSurgeryPreparationQuestionsPage = lazy(() => import('./pages/CompletedSurgeryPreparationQuestionsPage').then(m => ({ default: m.CompletedSurgeryPreparationQuestionsPage })));
const CompletedSurgeryPreparationInformationPage = lazy(() => import('./pages/CompletedSurgeryPreparationInformationPage').then(m => ({ default: m.CompletedSurgeryPreparationInformationPage })));
const CompletedSurgeryPreparationResultsPage = lazy(() => import('./pages/CompletedSurgeryPreparationResultsPage').then(m => ({ default: m.CompletedSurgeryPreparationResultsPage })));
const CompletedSurgeryPreparationReviewPage = lazy(() => import('./pages/CompletedSurgeryPreparationReviewPage').then(m => ({ default: m.CompletedSurgeryPreparationReviewPage })));

const CompletedChronicSymptomsUpsellPage = lazy(() => import('./pages/CompletedChronicSymptomsUpsellPage').then(m => ({ default: m.CompletedChronicSymptomsUpsellPage })));
const CompletedChronicSymptomsQuestionsPage = lazy(() => import('./pages/CompletedChronicSymptomsQuestionsPage').then(m => ({ default: m.CompletedChronicSymptomsQuestionsPage })));
const CompletedChronicSymptomsInformationPage = lazy(() => import('./pages/CompletedChronicSymptomsInformationPage').then(m => ({ default: m.CompletedChronicSymptomsInformationPage })));
const CompletedChronicSymptomsResultsPage = lazy(() => import('./pages/CompletedChronicSymptomsResultsPage').then(m => ({ default: m.CompletedChronicSymptomsResultsPage })));
const CompletedChronicSymptomsReviewPage = lazy(() => import('./pages/CompletedChronicSymptomsReviewPage').then(m => ({ default: m.CompletedChronicSymptomsReviewPage })));

const LongevityWellnessBundleUpsellPage = lazy(() => import('./pages/LongevityWellnessBundleUpsellPage').then(m => ({ default: m.LongevityWellnessBundleUpsellPage })));
const LongevityWellnessBundleQuestionsPage = lazy(() => import('./pages/LongevityWellnessBundleQuestionsPage').then(m => ({ default: m.LongevityWellnessBundleQuestionsPage })));
const LongevityWellnessBundleInformationPage = lazy(() => import('./pages/LongevityWellnessBundleInformationPage').then(m => ({ default: m.LongevityWellnessBundleInformationPage })));
const LongevityWellnessBundleResultsPage = lazy(() => import('./pages/LongevityWellnessBundleResultsPage').then(m => ({ default: m.LongevityWellnessBundleResultsPage })));
const LongevityWellnessBundleReviewPage = lazy(() => import('./pages/LongevityWellnessBundleReviewPage').then(m => ({ default: m.LongevityWellnessBundleReviewPage })));

const ComplicationRiskUpsellPage = lazy(() => import('./pages/ComplicationRiskUpsellPage').then(m => ({ default: m.ComplicationRiskUpsellPage })));
const ComplicationRiskQuestionsPage = lazy(() => import('./pages/ComplicationRiskQuestionsPage').then(m => ({ default: m.ComplicationRiskQuestionsPage })));
const ComplicationRiskInformationPage = lazy(() => import('./pages/ComplicationRiskInformationPage').then(m => ({ default: m.ComplicationRiskInformationPage })));
const ComplicationRiskResultsPage = lazy(() => import('./pages/ComplicationRiskResultsPage').then(m => ({ default: m.ComplicationRiskResultsPage })));
const ComplicationRiskReviewPage = lazy(() => import('./pages/ComplicationRiskReviewPage').then(m => ({ default: m.ComplicationRiskReviewPage })));

const RecoverySpeedUpsellPage = lazy(() => import('./pages/RecoverySpeedUpsellPage').then(m => ({ default: m.RecoverySpeedUpsellPage })));
const RecoverySpeedQuestionsPage = lazy(() => import('./pages/RecoverySpeedQuestionsPage').then(m => ({ default: m.RecoverySpeedQuestionsPage })));
const RecoverySpeedInformationPage = lazy(() => import('./pages/RecoverySpeedInformationPage').then(m => ({ default: m.RecoverySpeedInformationPage })));
const RecoverySpeedResultsPage = lazy(() => import('./pages/RecoverySpeedResultsPage').then(m => ({ default: m.RecoverySpeedResultsPage })));
const RecoverySpeedReviewPage = lazy(() => import('./pages/RecoverySpeedReviewPage').then(m => ({ default: m.RecoverySpeedReviewPage })));

const AnaesthesiaRiskUpsellPage = lazy(() => import('./pages/AnaesthesiaRiskUpsellPage').then(m => ({ default: m.AnaesthesiaRiskUpsellPage })));
const AnaesthesiaRiskQuestionsPage = lazy(() => import('./pages/AnaesthesiaRiskQuestionsPage').then(m => ({ default: m.AnaesthesiaRiskQuestionsPage })));
const AnaesthesiaRiskInformationPage = lazy(() => import('./pages/AnaesthesiaRiskInformationPage').then(m => ({ default: m.AnaesthesiaRiskInformationPage })));
const AnaesthesiaRiskResultsPage = lazy(() => import('./pages/AnaesthesiaRiskResultsPage').then(m => ({ default: m.AnaesthesiaRiskResultsPage })));
const AnaesthesiaRiskReviewPage = lazy(() => import('./pages/AnaesthesiaRiskReviewPage').then(m => ({ default: m.AnaesthesiaRiskReviewPage })));

const MobilityStrengthUpsellPage = lazy(() => import('./pages/MobilityStrengthUpsellPage').then(m => ({ default: m.MobilityStrengthUpsellPage })));
const MobilityStrengthQuestionsPage = lazy(() => import('./pages/MobilityStrengthQuestionsPage').then(m => ({ default: m.MobilityStrengthQuestionsPage })));
const MobilityStrengthInformationPage = lazy(() => import('./pages/MobilityStrengthInformationPage').then(m => ({ default: m.MobilityStrengthInformationPage })));
const MobilityStrengthResultsPage = lazy(() => import('./pages/MobilityStrengthResultsPage').then(m => ({ default: m.MobilityStrengthResultsPage })));
const MobilityStrengthReviewPage = lazy(() => import('./pages/MobilityStrengthReviewPage').then(m => ({ default: m.MobilityStrengthReviewPage })));

const SymptomSeverityUpsellPage = lazy(() => import('./pages/SymptomSeverityUpsellPage').then(m => ({ default: m.SymptomSeverityUpsellPage })));
const SymptomSeverityQuestionsPage = lazy(() => import('./pages/SymptomSeverityQuestionsPage').then(m => ({ default: m.SymptomSeverityQuestionsPage })));
const SymptomSeverityInformationPage = lazy(() => import('./pages/SymptomSeverityInformationPage').then(m => ({ default: m.SymptomSeverityInformationPage })));
const SymptomSeverityResultsPage = lazy(() => import('./pages/SymptomSeverityResultsPage').then(m => ({ default: m.SymptomSeverityResultsPage })));
const SymptomSeverityReviewPage = lazy(() => import('./pages/SymptomSeverityReviewPage').then(m => ({ default: m.SymptomSeverityReviewPage })));

const InflammationRiskUpsellPage = lazy(() => import('./pages/InflammationRiskUpsellPage').then(m => ({ default: m.InflammationRiskUpsellPage })));
const InflammationRiskQuestionsPage = lazy(() => import('./pages/InflammationRiskQuestionsPage').then(m => ({ default: m.InflammationRiskQuestionsPage })));
const InflammationRiskInformationPage = lazy(() => import('./pages/InflammationRiskInformationPage').then(m => ({ default: m.InflammationRiskInformationPage })));
const InflammationRiskResultsPage = lazy(() => import('./pages/InflammationRiskResultsPage').then(m => ({ default: m.InflammationRiskResultsPage })));
const InflammationRiskReviewPage = lazy(() => import('./pages/InflammationRiskReviewPage').then(m => ({ default: m.InflammationRiskReviewPage })));

const MedicationBurdenUpsellPage = lazy(() => import('./pages/MedicationBurdenUpsellPage').then(m => ({ default: m.MedicationBurdenUpsellPage })));
const MedicationBurdenQuestionsPage = lazy(() => import('./pages/MedicationBurdenQuestionsPage').then(m => ({ default: m.MedicationBurdenQuestionsPage })));
const MedicationBurdenInformationPage = lazy(() => import('./pages/MedicationBurdenInformationPage').then(m => ({ default: m.MedicationBurdenInformationPage })));
const MedicationBurdenResultsPage = lazy(() => import('./pages/MedicationBurdenResultsPage').then(m => ({ default: m.MedicationBurdenResultsPage })));
const MedicationBurdenReviewPage = lazy(() => import('./pages/MedicationBurdenReviewPage').then(m => ({ default: m.MedicationBurdenReviewPage })));

const DailyEnergyUpsellPage = lazy(() => import('./pages/DailyEnergyUpsellPage').then(m => ({ default: m.DailyEnergyUpsellPage })));
const DailyEnergyQuestionsPage = lazy(() => import('./pages/DailyEnergyQuestionsPage').then(m => ({ default: m.DailyEnergyQuestionsPage })));
const DailyEnergyInformationPage = lazy(() => import('./pages/DailyEnergyInformationPage').then(m => ({ default: m.DailyEnergyInformationPage })));
const DailyEnergyResultsPage = lazy(() => import('./pages/DailyEnergyResultsPage').then(m => ({ default: m.DailyEnergyResultsPage })));
const DailyEnergyReviewPage = lazy(() => import('./pages/DailyEnergyReviewPage').then(m => ({ default: m.DailyEnergyReviewPage })));

const LifestyleLimiterUpsellPage = lazy(() => import('./pages/LifestyleLimiterUpsellPage').then(m => ({ default: m.LifestyleLimiterUpsellPage })));
const LifestyleLimiterQuestionsPage = lazy(() => import('./pages/LifestyleLimiterQuestionsPage').then(m => ({ default: m.LifestyleLimiterQuestionsPage })));
const LifestyleLimiterInformationPage = lazy(() => import('./pages/LifestyleLimiterInformationPage').then(m => ({ default: m.LifestyleLimiterInformationPage })));
const LifestyleLimiterResultsPage = lazy(() => import('./pages/LifestyleLimiterResultsPage').then(m => ({ default: m.LifestyleLimiterResultsPage })));
const LifestyleLimiterReviewPage = lazy(() => import('./pages/LifestyleLimiterReviewPage').then(m => ({ default: m.LifestyleLimiterReviewPage })));

const ChronicSymptomProtocolPage = lazy(() => import('./pages/ChronicSymptomProtocolPage').then(m => ({ default: m.ChronicSymptomProtocolPage })));
const LongevityFocusProtocolPage = lazy(() => import('./pages/LongevityFocusProtocolPage').then(m => ({ default: m.LongevityFocusProtocolPage })));

const HealthConciergePage = lazy(() => import('./pages/HealthConciergePage').then(m => ({ default: m.HealthConciergePage })));
const HealthConciergeQuestionsPage = lazy(() => import('./pages/HealthConciergeQuestionsPage').then(m => ({ default: m.HealthConciergeQuestionsPage })));
const HealthConciergeResultsPage = lazy(() => import('./pages/HealthConciergeResultsPage').then(m => ({ default: m.HealthConciergeResultsPage })));
const HealthConciergeInformationPage = lazy(() => import('./pages/HealthConciergeInformationPage').then(m => ({ default: m.HealthConciergeInformationPage })));

const Success = lazy(() => import('./pages/Success').then(m => ({ default: m.default })));
const Cancel = lazy(() => import('./pages/Cancel').then(m => ({ default: m.default })));

const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const SurgeryReadySignsPage = lazy(() => import('./pages/blog/SurgeryReadySignsPage').then(m => ({ default: m.SurgeryReadySignsPage })));
const RedFlagsSurgeryPage = lazy(() => import('./pages/blog/RedFlagsSurgeryPage').then(m => ({ default: m.RedFlagsSurgeryPage })));
const HomeTweaksPage = lazy(() => import('./pages/blog/HomeTweaksPage').then(m => ({ default: m.HomeTweaksPage })));
const MorningStiffnessPage = lazy(() => import('./pages/blog/MorningStiffnessPage').then(m => ({ default: m.MorningStiffnessPage })));
const ComplicationRiskFactorsPage = lazy(() => import('./pages/blog/ComplicationRiskFactorsPage').then(m => ({ default: m.ComplicationRiskFactorsPage })));
const RecoverySpeedSecretsPage = lazy(() => import('./pages/blog/RecoverySpeedSecretsPage').then(m => ({ default: m.RecoverySpeedSecretsPage })));
const AnaesthesiaRisksPage = lazy(() => import('./pages/blog/AnaesthesiaRisksPage').then(m => ({ default: m.AnaesthesiaRisksPage })));
const MobilityBaselinePage = lazy(() => import('./pages/blog/MobilityBaselinePage').then(m => ({ default: m.MobilityBaselinePage })));
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
import completedSurgeryPreparationBundleImage from '/assests/completed02.webp';
// import cardiometabolicRiskImage from 'figma:asset/fdc40145acfa322877cd1761f1bde47228465bbd.png';
import resilienceIndexImage from '/assests/resi-hero.webp';
import completeLongevityBundleImage from '/assests/long-hero.webp';
import nutritionBodyCompositionImage from '/assests/nutrition-hero.webp';
import purpleGradientImage from '/assests/complication-hero.webp';
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
    description: "Before any surgery, you need to know your risks. This score gives you a clear snapshot of your current health status and highlights areas that need attention. It helps you lower your chances of complications and sets you up for a smoother recovery. Think of it as your pre-surgery game plan.",
    price: 39.00,
    image: surgeryReadinessImage,
    icon: <Shield className="w-6 h-6" />,
    features: ['Your personalized readiness score', 'An in-depth report detailing your current health status', 'Bespoke recommendations designed to reduce risks and optimise your outcome']
  },
  {
    id: '2',
    name: 'Practical Biological Age Proxy',
    description: 'Your real age isn’t just the number on your ID—it’s how your body is aging on the inside. This test compares your biological age to your actual age using advanced health markers. If your body is aging faster than it should, you’ll know where to make changes. It’s your starting point for living longer and performing better.',
    price: 46,
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
    name: '21 day surgery preparation protocol',
    description: 'Comprehensive 21-day program to optimize your physical and mental preparation for upcoming surgery.',
    price: 200.00,
  //  image: multiColorStripesImage,
    icon: <Shield className="w-6 h-6" />,
    features: ['Pre-surgical conditioning protocol', '21-day structured program', 'Recovery optimization guidance'],
    hidden: true
  },
  {
    id: '6',
    name: 'Complication Risk Checker',
    description: 'Not all health issues are obvious—but they can still mess up your surgery. This check looks at lifestyle and existing conditions that could raise your risk for complications. It shows you where you are vulnerable and what to fix before going under. Get ahead of problems instead of reacting to them later.',
    price: 40.00,
   image: purpleGradientImage,
    icon: <AlertTriangle className="w-6 h-6" />,
    features: ['Lifestyle risk factor analysis', 'Comorbidity assessment scoring', 'Personalized prevention strategies']
  },
  {
    id: '7',
    name: 'Recovery Speed Predictor',
    description: 'Want to know how fast you’ll get back on your feet? This tool gives you a personalized healing timeline based on your habits, mindset, and support system. It shows what’s helping or slowing down your recovery. The better your inputs, the faster your bounce-back.',
    price: 45.00,
   image: nutritionBodyCompositionImage,
    icon: <Zap className="w-6 h-6" />,
    features: ['Nutrition impact analysis', 'Mental readiness assessment', 'Support system optimization']
  },
  {
    id: '8',
    name: 'Anaesthesia Risk Screener',
    description: 'Anaesthesia affects everyone differently—and some people are at higher risk. This screener looks at your sleep, meds, and lifestyle to predict any complications. It helps avoid unwanted surprises during surgery. Peace of mind starts with knowing you are prepared.',
    price: 35.00,
   image: purplesGradientImage,
    icon: <Heart className="w-6 h-6" />,
    features: ['Sleep apnoea risk assessment', 'Medication interaction analysis', 'Alcohol impact evaluation']
  },
  {
    id: '9',
    name: 'Mobility & Strength Score',
    description: 'Your physical condition plays a big role in how well you recover. This test measures your strength and movement before surgery so you can track improvements after. It sets a performance baseline to guide your rehab. Stronger in, stronger out.',
    price: 50.00,
   image: mobility,
    icon: <Activity className="w-6 h-6" />,
    features: ['Baseline mobility measurement', 'Strength assessment scoring', 'Recovery milestone tracking']
  },
  {
    id: '10',
    name: 'Symptom Severity Index',
    description: 'If you’re living with pain, fatigue, or gut issues, this will help you measure how much it’s affecting you. It tracks how often and how intense your symptoms are. That way, you can stop guessing and start targeting the real problems. Clear data leads to better decisions.',
    price: 43.00,
   image: sympGradientImage,
    icon: <Thermometer className="w-6 h-6" />,
    features: ['Pain intensity scoring', 'Fatigue impact analysis', 'Digestive symptom tracking']
  },
  {
    id: '11',
    name: 'Inflammation Risk Score',
    description: 'Low-grade inflammation can quietly damage your body and speed up aging. This score shows how your diet, sleep, stress, and habits are contributing to it. You’ll learn where your risks are and what changes can lower them. Less inflammation means better energy, recovery, and long-term health.',
    price: 39.00,
   image: inflammation,
    icon: <Heart className="w-6 h-6" />,
    features: ['Dietary inflammation analysis', 'Lifestyle factor assessment', 'Stress impact evaluation']
  },
  {
    id: '12',
    name: 'Medication Burden Calculator',
    description: 'Too many prescriptions can hurt more than help. This tool checks if your current meds are working against each other or causing side effects. It helps you clean up your medication list and reduce risks. More clarity, fewer complications.',
    price: 47.00,
   image: burden,
    icon: <Pill className="w-6 h-6" />,
    features: ['Polypharmacy assessment', 'Drug interaction screening', 'Side effect burden analysis']
  },
  {
    id: '13',
    name: 'Daily Energy Audit',
    description: 'Always tired? This audit looks at your sleep, fatigue patterns, and energy levels throughout the day. It helps pinpoint what’s draining your battery—and how to recharge. You’ll know where to adjust for more focus and stamina.',
    price: 42.00,
   image: daily,
    icon: <Battery className="w-6 h-6" />,
    features: ['Energy pattern analysis', 'Sleep quality assessment', 'Stamina optimization plan']
  },
  {
    id: '14',
    name: 'Lifestyle Limiter Score',
    description: 'Some health issues hold you back more than you realize. This score shows how much your current condition is affecting work, fitness, and social life. It brings hidden problems to the surface so you can fix them. Stop settling for “okay” when you can operate at 100%.',
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
    description: 'Heart disease and diabetes often show no early signs—until it’s too late. This score finds key risk factors based on your blood, habits, and body metrics. Knowing your risk means you can take control before anything serious hits. It’s your early warning system.',
    price: 39.00,
   image: cardio,
    icon: <Heart className="w-6 h-6" />,
    features: ['Cardiovascular risk analysis', 'Metabolic health assessment', 'Personalized prevention strategies']
  },
  {
    id: '18',
    name: 'Resilience Index',
    description: 'Life hits hard. This test measures how well you handle stress—both mentally and physically. It shows your capacity to adapt, recover, and keep going when others crash. Build the edge that helps you win long-term.',
    price: 42.00,
   image: resilienceIndexImage,
    icon: <Zap className="w-6 h-6" />,
    features: ['Stress resilience analysis', 'Recovery capacity assessment', 'Personalized resilience building strategies']
  },
  {
    id: '19',
    name: 'Nutrition & Body Composition Score',
    description: 'Your diet and body composition affect everything—energy, strength, even how you age. This test helps you see what’s working and what’s not. It gives you a clear breakdown of how to improve your metabolism and nutrition. Strong body, sharp mind.',
    price: 47.00,
   image: nut,
    icon: <Apple className="w-6 h-6" />,
    features: ['Body composition analysis', 'Nutritional deficiency assessment', 'Personalized nutrition optimization strategies']
  },
  {
    id: '20',
    name: 'Functional Fitness Age Test',
    description: 'This test tells you how your body moves compared to your actual age. If your body performs like it’s older than you are, it’s time to act. You’ll learn where you’re losing strength, mobility, or flexibility. Stay ahead of the decline—and stay in the game.',
    price: 44.00,
   image: func,
    icon: <Activity className="w-6 h-6" />,
    features: ['Movement quality analysis', 'Physical capability assessment', 'Personalized fitness optimization strategies']
  },
  {
    id: '21',
    name: 'Completed Surgery Preparation Bundle',
    description: 'Get everything you need to fully prepare for surgery—without wasting time. This bundle combines all the key risk and recovery assessments in one. You’ll be informed, confident, and ready for a smoother outcome. Better results, lower stress, and smart savings.',
    price: 120.00,
   image: completedSurgeryPreparationBundleImage,
    icon: <Shield className="w-6 h-6" />,
    features: ['Complete surgical readiness assessment', 'Comprehensive risk factor analysis', 'Personalized preparation strategies']
  },
  {
    id: '22',
    name: 'Completed Chronic Symptoms Bundle',
    description: 'Tired of dragging through the day with no answers? This bundle tackles your pain, fatigue, inflammation, meds, and energy—all at once. You’ll get a full picture of what’s going on and how to fix it. It’s time to stop managing symptoms and start solving them.',
    price: 138,
   image: chronic,
    icon: <Stethoscope className="w-6 h-6" />,
    features: ['Complete chronic symptom assessment', 'Comprehensive lifestyle impact analysis', 'Personalized management strategies']
  },
  {
    id: '23',
    name: 'Complete Longevity Bundle',
    description: 'If you want to live longer and stay strong, this is your package. It covers biological age, heart health, resilience, nutrition, and physical fitness—all in one test suite. You’ll know where you stand and how to add more high-quality years to your life. Think of it as your long-term performance plan.',
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
  const [currentPage, setCurrentPage] = useState('page-loading');
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState<string | null>(null);

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



useEffect(() => {
  if (currentPage.includes('surgery-readiness-assessment')) {
    setCurrentAssessment('surgery-readiness');
  } else if (currentPage.includes('biological-age-calculator')) {
    setCurrentAssessment('biological-age');
  } else if (currentPage.includes('cardiometabolic-risk-score')) {
    setCurrentAssessment('cardiometabolic-risk');
  } else if (currentPage.includes('resilience-index')) {
    setCurrentAssessment('resilience-index');
  } else if (currentPage.includes('nutrition-body-composition-score')) {
    setCurrentAssessment('nutrition-body-composition');
  } else if (currentPage.includes('functional-fitness-age-test')) {
    setCurrentAssessment('functional-fitness-age');
  } else if (currentPage.includes('completed-surgery-preparation-bundle')) {
    setCurrentAssessment('completed-surgery-preparation');
  } else if (currentPage.includes('completed-chronic-symptoms-bundle')) {
    setCurrentAssessment('completed-chronic-symptoms');
  } else if (currentPage.includes('longevity-wellness-bundle')) {
    setCurrentAssessment('longevity-wellness-bundle');
  } else if (currentPage.includes('complication-risk-checker')) {
    setCurrentAssessment('complication-risk');
  } else if (currentPage.includes('recovery-speed-predictor')) {
    setCurrentAssessment('recovery-speed');
  } else if (currentPage.includes('anaesthesia-risk-screener')) {
    setCurrentAssessment('anaesthesia-risk');
  } else if (currentPage.includes('mobility-strength-score')) {
    setCurrentAssessment('mobility-strength');
  } else if (currentPage.includes('symptom-severity-index')) {
    setCurrentAssessment('symptom-severity');
  } else if (currentPage.includes('inflammation-risk-score')) {
    setCurrentAssessment('inflammation-risk');
  } else if (currentPage.includes('medication-burden-calculator')) {
    setCurrentAssessment('medication-burden');
  } else if (currentPage.includes('daily-energy-audit')) {
    setCurrentAssessment('daily-energy');
  } else if (currentPage.includes('lifestyle-limiter-score')) {
    setCurrentAssessment('lifestyle-limiter');
  } else if (currentPage.includes('health-concierge')) {
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

  const updateBasketItem = useCallback((assessment: Assessment) => {
    setBasketItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.assessment.id === assessment.id);
      if (existingItemIndex !== -1) {
        // Item exists in basket, update it with new data
        const newItems = [...prev];
        newItems[existingItemIndex] = { assessment, quantity: 1 };
        return newItems;
      }
      return prev;
    });
  }, []);

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
          return <CookiePage />;
      case 'cancel':
          return <Cancel />;
      case 'success':
          return <Success />;
        case 'thank-you':
          return <PurchaseThankYouPage />;
      case 'complaints':
        return <ComplaintsPage />;
      case 'quiz':
        return <QuizPage />;
      case 'cqc':
          return <CQCPage />;
      case 'surgery-checklist':
            return <SurgeryPreparationChecklistPage
              onAddToBasket={addToBasket}
              onOpenBasket={() => setIsBasketOpen(true)}
            />;


      // New Routing added by Tehman for the Duplicate Pages for A/B Testing
      case 'surgery-readiness-one':
          return <Questions_1
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
          />;
      case 'surgery-readiness-two':
          return <Questions_2
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
          />;
      case 'surgery-readiness-three':
          return <Questions_3
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
          />;

      case 'surgery-readiness-information-one':
        return <Information_1 />;

      case 'surgery-readiness-information-two':
        return <Information_2 />;

      case 'surgery-readiness-information-three':
        return <Information_3 />;

      case 'surgery-checklist-b':
            return <SurgeryPreparationChecklistPageB
              onAddToBasket={addToBasket}
              onOpenBasket={() => setIsBasketOpen(true)}
            />;
      case 'surgery-checklist-c':
            return <SurgeryPreparationChecklistPageC
              onAddToBasket={addToBasket}
              onOpenBasket={() => setIsBasketOpen(true)}
            />;
      case 'surgery-readiness-assessment-learn-more':
          return <SurgeryReadinessUpsellPageWithPuck
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
            onAssessmentUpdate={updateBasketItem}
          />;
      case 'surgery-readiness-assessment-learn-more-b':
          return <SurgeryReadinessUpsellPageBWithPuck
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
            onAssessmentUpdate={updateBasketItem}
          />;
      case 'surgery-readiness-assessment-learn-more-c':
          return <SurgeryReadinessUpsellPageCWithPuck
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
            onAssessmentUpdate={updateBasketItem}
          />;
      case 'surgery-readiness-assessment-learn-more-d':
          return <SurgeryReadinessUpsellPageDWithPuck
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
            onAssessmentUpdate={updateBasketItem}
          />;
      case 'surgery-readiness-assessment-learn-more-e':
          return <SurgeryReadinessUpsellPageEWithPuck
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
            onAssessmentUpdate={updateBasketItem}
          />;
      case 'surgery-readiness-assessment-learn-more-f':
          return <SurgeryReadinessUpsellPageFWithPuck
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
            onAssessmentUpdate={updateBasketItem}
          />;
      case 'surgery-readiness-assessment-learn-more-g':
          return <SurgeryReadinessUpsellPageGWithPuck
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
            onAssessmentUpdate={updateBasketItem}
          />;
      case 'surgery-readiness-assessment-learn-more-h':
          return <SurgeryReadinessUpsellPageHWithPuck
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
            onAssessmentUpdate={updateBasketItem}
          />;
      case 'surgery-readiness-assessment-learn-more-i':
          return <SurgeryReadinessUpsellPageIWithPuck
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
            onAssessmentUpdate={updateBasketItem}
          />;    
      case 'surgery-readiness-assessment-learn-more-j':
          return <SurgeryReadinessUpsellPageJWithPuck
            onAddToBasket={addToBasket}
            onOpenBasket={() => setIsBasketOpen(true)}
            onAssessmentUpdate={updateBasketItem}
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
      case 'surgery-readiness-assessment-results-a':
        return <SurgeryReadinessResultsPageA />;
      case 'surgery-readiness-assessment-results-b':
        return <SurgeryReadinessResultsPageB />;
      case 'surgery-readiness-assessment-results-c':
        return <SurgeryReadinessResultsPageC />;
      case 'surgery-readiness-assessment-feedback':
        return <SurgeryReadinessReviewPage />;
      case 'surgery-readiness-assessment-feedback-a':
        return <SurgeryReadinessReviewPageA />;
      case 'surgery-readiness-assessment-feedback-b':
        return <SurgeryReadinessReviewPageB />;
      case 'surgery-readiness-assessment-feedback-c':
        return <SurgeryReadinessReviewPageC />;
      case 'surgery-readiness-upsell-final-a':
        return <SurgeryReadinessUpsellFinalA />;
      case 'surgery-readiness-upsell-final-b':
        return <SurgeryReadinessUpsellFinalB />;
      case 'surgery-readiness-upsell-final-c':
        return <SurgeryReadinessUpsellFinalC />;
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
      case 'page-loading':
         return <PageLoader />;
      case 'old-home':
         return <HomePage />;   
      case 'home':
        return <HomePageWithPuck 
          onAddToBasket={addToBasket}
          onOpenBasket={() => setIsBasketOpen(true)}
        />;
      default:
        return <HomePageWithPuck 
          onAddToBasket={addToBasket}
          onOpenBasket={() => setIsBasketOpen(true)}
        />;
    }
  };

  const isQuizPage = useCallback(() => {
    // Pages where footer should be hidden
    const quizPages = [
      'surgery-readiness-assessment-learn-more',
      'surgery-readiness-assessment-learn-more-b',
      'surgery-readiness-assessment-learn-more-c',
      'surgery-readiness-assessment-learn-more-d',
      'surgery-readiness-assessment-learn-more-e',
      'surgery-readiness-assessment-learn-more-f',
      'surgery-readiness-assessment-learn-more-g',
      'surgery-readiness-assessment-learn-more-h',
      'surgery-readiness-assessment-learn-more-i',
      'surgery-readiness-assessment-learn-more-j',
      'surgery-readiness-assessment-questions',
      'surgery-checklist',
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
      'surgery-readiness-assessment-results-a',
      'surgery-readiness-assessment-results-b',
      'surgery-readiness-assessment-results-c',
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
        <Suspense fallback={<PageLoader />}>
          {renderCurrentPage()}
        </Suspense>
      </main>
      {!isQuizPage() && <Footer />}
      <CookieConsent />
      {currentPage.endsWith('-results')}
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
