import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import { Search, Menu, User, Heart, Palette } from 'lucide-react';
import { SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import lutherHealthLogo from 'figma:asset/33e2bc5ac0e628d4cd978f233c2b6c1f6d83054a.png';

interface HeaderProps {
  onDesignSystemClick?: () => void;
}

export function Header({ onDesignSystemClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Navigation Menu - Left Side */}
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="px-[20px] py-[14px]">
                  <SheetTitle>Navigation Menu</SheetTitle>
                  <SheetDescription>
                    Navigate to different sections of Luther Health website
                  </SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-[70vh] mt-4">
                  <nav className="flex flex-col space-y-4 px-[20px] py-[0px] pr-4">
                    <h4 className="font-medium text-primary">Main Navigation</h4>
                    <a href="#" onClick={() => window.location.hash = ''} className="text-sm hover:text-primary transition-colors pl-2">Home</a>
                    <a href="#about" onClick={() => window.location.hash = 'about'} className="text-sm hover:text-primary transition-colors pl-2">About</a>
                    <a href="#services" onClick={() => window.location.hash = 'services'} className="text-sm hover:text-primary transition-colors pl-2">Services</a>
                    <a href="#assessments" onClick={() => window.location.hash = 'assessments'} className="text-sm hover:text-primary transition-colors pl-2">Assessments</a>
                    <a href="#blog" onClick={() => window.location.hash = 'blog'} className="text-sm hover:text-primary transition-colors pl-2">Blog</a>
                    <a href="#contact" onClick={() => window.location.hash = 'contact'} className="text-sm hover:text-primary transition-colors pl-2">Contact</a>
                    
                    <h4 className="font-medium text-primary pt-4">Surgery Readiness Funnel</h4>
                    <a href="#blog/10-surgery-ready-signs" onClick={() => window.location.hash = 'blog/10-surgery-ready-signs'} className="text-sm hover:text-primary transition-colors pl-2">1. 10 Surgery Ready Signs</a>
                    <a href="#surgery-readiness-assessment-learn-more" onClick={() => window.location.hash = 'surgery-readiness-assessment-learn-more'} className="text-sm hover:text-primary transition-colors pl-2">2. Surgery Readiness Assessment Learn More</a>
                    <a href="#surgery-readiness-assessment-questions" onClick={() => window.location.hash = 'surgery-readiness-assessment-questions'} className="text-sm hover:text-primary transition-colors pl-2">3. Surgery Readiness Assessment Questions</a>
                    <a href="#surgery-readiness-assessment-information" onClick={() => window.location.hash = 'surgery-readiness-assessment-information'} className="text-sm hover:text-primary transition-colors pl-2">4. Surgery Readiness Assessment Information</a>
                    <a href="#surgery-readiness-assessment-results" onClick={() => window.location.hash = 'surgery-readiness-assessment-results'} className="text-sm hover:text-primary transition-colors pl-2">5. Surgery Readiness Assessment Results</a>
                    <a href="#surgery-readiness-assessment-feedback" onClick={() => window.location.hash = 'surgery-readiness-assessment-feedback'} className="text-sm hover:text-primary transition-colors pl-2">6. Surgery Readiness Assessment Feedback</a>
                    <a href="#surgery-conditioning-protocol-challenge" onClick={() => window.location.hash = 'surgery-conditioning-protocol-challenge'} className="text-sm hover:text-primary transition-colors pl-2">7. Surgery Conditioning Protocol Challenge</a>
                    
                    <h4 className="font-medium text-primary pt-4">Complication Risk Checker Funnel</h4>
                    <a href="#blog/complication-risk-factors" onClick={() => window.location.hash = 'blog/complication-risk-factors'} className="text-sm hover:text-primary transition-colors pl-2">1. Complication Risk Factors Blog</a>
                    <a href="#complication-risk-checker-learn-more" onClick={() => window.location.hash = 'complication-risk-checker-learn-more'} className="text-sm hover:text-primary transition-colors pl-2">2. Learn More</a>
                    <a href="#complication-risk-checker-questions" onClick={() => window.location.hash = 'complication-risk-checker-questions'} className="text-sm hover:text-primary transition-colors pl-2">3. Questions</a>
                    <a href="#complication-risk-checker-information" onClick={() => window.location.hash = 'complication-risk-checker-information'} className="text-sm hover:text-primary transition-colors pl-2">4. Information</a>
                    <a href="#complication-risk-checker-results" onClick={() => window.location.hash = 'complication-risk-checker-results'} className="text-sm hover:text-primary transition-colors pl-2">5. Results</a>
                    <a href="#complication-risk-checker-feedback" onClick={() => window.location.hash = 'complication-risk-checker-feedback'} className="text-sm hover:text-primary transition-colors pl-2">6. Feedback</a>
                    
                    <h4 className="font-medium text-primary pt-4">Recovery Speed Predictor Funnel</h4>
                    <a href="#blog/recovery-speed-secrets" onClick={() => window.location.hash = 'blog/recovery-speed-secrets'} className="text-sm hover:text-primary transition-colors pl-2">1. Recovery Speed Secrets Blog</a>
                    <a href="#recovery-speed-predictor-learn-more" onClick={() => window.location.hash = 'recovery-speed-predictor-learn-more'} className="text-sm hover:text-primary transition-colors pl-2">2. Learn More</a>
                    <a href="#recovery-speed-predictor-questions" onClick={() => window.location.hash = 'recovery-speed-predictor-questions'} className="text-sm hover:text-primary transition-colors pl-2">3. Questions</a>
                    <a href="#recovery-speed-predictor-information" onClick={() => window.location.hash = 'recovery-speed-predictor-information'} className="text-sm hover:text-primary transition-colors pl-2">4. Information</a>
                    <a href="#recovery-speed-predictor-results" onClick={() => window.location.hash = 'recovery-speed-predictor-results'} className="text-sm hover:text-primary transition-colors pl-2">5. Results</a>
                    <a href="#recovery-speed-predictor-feedback" onClick={() => window.location.hash = 'recovery-speed-predictor-feedback'} className="text-sm hover:text-primary transition-colors pl-2">6. Feedback</a>
                    
                    <h4 className="font-medium text-primary pt-4">Anaesthesia Risk Screener Funnel</h4>
                    <a href="#blog/anaesthesia-risks" onClick={() => window.location.hash = 'blog/anaesthesia-risks'} className="text-sm hover:text-primary transition-colors pl-2">1. Anaesthesia Risks Blog</a>
                    <a href="#anaesthesia-risk-screener-learn-more" onClick={() => window.location.hash = 'anaesthesia-risk-screener-learn-more'} className="text-sm hover:text-primary transition-colors pl-2">2. Learn More</a>
                    <a href="#anaesthesia-risk-screener-questions" onClick={() => window.location.hash = 'anaesthesia-risk-screener-questions'} className="text-sm hover:text-primary transition-colors pl-2">3. Questions</a>
                    <a href="#anaesthesia-risk-screener-information" onClick={() => window.location.hash = 'anaesthesia-risk-screener-information'} className="text-sm hover:text-primary transition-colors pl-2">4. Information</a>
                    <a href="#anaesthesia-risk-screener-results" onClick={() => window.location.hash = 'anaesthesia-risk-screener-results'} className="text-sm hover:text-primary transition-colors pl-2">5. Results</a>
                    <a href="#anaesthesia-risk-screener-feedback" onClick={() => window.location.hash = 'anaesthesia-risk-screener-feedback'} className="text-sm hover:text-primary transition-colors pl-2">6. Feedback</a>
                    
                    <h4 className="font-medium text-primary pt-4">Mobility & Strength Score Funnel</h4>
                    <a href="#blog/mobility-baseline" onClick={() => window.location.hash = 'blog/mobility-baseline'} className="text-sm hover:text-primary transition-colors pl-2">1. Mobility Baseline Blog</a>
                    <a href="#mobility-strength-score-learn-more" onClick={() => window.location.hash = 'mobility-strength-score-learn-more'} className="text-sm hover:text-primary transition-colors pl-2">2. Learn More</a>
                    <a href="#mobility-strength-score-questions" onClick={() => window.location.hash = 'mobility-strength-score-questions'} className="text-sm hover:text-primary transition-colors pl-2">3. Questions</a>
                    <a href="#mobility-strength-score-information" onClick={() => window.location.hash = 'mobility-strength-score-information'} className="text-sm hover:text-primary transition-colors pl-2">4. Information</a>
                    <a href="#mobility-strength-score-results" onClick={() => window.location.hash = 'mobility-strength-score-results'} className="text-sm hover:text-primary transition-colors pl-2">5. Results</a>
                    <a href="#mobility-strength-score-feedback" onClick={() => window.location.hash = 'mobility-strength-score-feedback'} className="text-sm hover:text-primary transition-colors pl-2">6. Feedback</a>
                    
                    <h4 className="font-medium text-primary pt-4">Symptom Severity Index Funnel</h4>
                    <a href="#blog/symptom-severity-guide" onClick={() => window.location.hash = 'blog/symptom-severity-guide'} className="text-sm hover:text-primary transition-colors pl-2">1. Symptom Severity Guide Blog</a>
                    <a href="#symptom-severity-index-learn-more" onClick={() => window.location.hash = 'symptom-severity-index-learn-more'} className="text-sm hover:text-primary transition-colors pl-2">2. Learn More</a>
                    <a href="#symptom-severity-index-questions" onClick={() => window.location.hash = 'symptom-severity-index-questions'} className="text-sm hover:text-primary transition-colors pl-2">3. Questions</a>
                    <a href="#symptom-severity-index-information" onClick={() => window.location.hash = 'symptom-severity-index-information'} className="text-sm hover:text-primary transition-colors pl-2">4. Information</a>
                    <a href="#symptom-severity-index-results" onClick={() => window.location.hash = 'symptom-severity-index-results'} className="text-sm hover:text-primary transition-colors pl-2">5. Results</a>
                    <a href="#symptom-severity-index-feedback" onClick={() => window.location.hash = 'symptom-severity-index-feedback'} className="text-sm hover:text-primary transition-colors pl-2">6. Feedback</a>
                    
                    <h4 className="font-medium text-primary pt-4">Inflammation Risk Score Funnel</h4>
                    <a href="#blog/inflammation-trigger-guide" onClick={() => window.location.hash = 'blog/inflammation-trigger-guide'} className="text-sm hover:text-primary transition-colors pl-2">1. Inflammation Trigger Guide Blog</a>
                    <a href="#inflammation-risk-score-learn-more" onClick={() => window.location.hash = 'inflammation-risk-score-learn-more'} className="text-sm hover:text-primary transition-colors pl-2">2. Learn More</a>
                    <a href="#inflammation-risk-score-questions" onClick={() => window.location.hash = 'inflammation-risk-score-questions'} className="text-sm hover:text-primary transition-colors pl-2">3. Questions</a>
                    <a href="#inflammation-risk-score-information" onClick={() => window.location.hash = 'inflammation-risk-score-information'} className="text-sm hover:text-primary transition-colors pl-2">4. Information</a>
                    <a href="#inflammation-risk-score-results" onClick={() => window.location.hash = 'inflammation-risk-score-results'} className="text-sm hover:text-primary transition-colors pl-2">5. Results</a>
                    <a href="#inflammation-risk-score-feedback" onClick={() => window.location.hash = 'inflammation-risk-score-feedback'} className="text-sm hover:text-primary transition-colors pl-2">6. Feedback</a>
                    
                    <h4 className="font-medium text-primary pt-4">Medication Burden Calculator Funnel</h4>
                    <a href="#blog/medication-safety-guide" onClick={() => window.location.hash = 'blog/medication-safety-guide'} className="text-sm hover:text-primary transition-colors pl-2">1. Medication Safety Guide Blog</a>
                    <a href="#medication-burden-calculator-learn-more" onClick={() => window.location.hash = 'medication-burden-calculator-learn-more'} className="text-sm hover:text-primary transition-colors pl-2">2. Learn More</a>
                    <a href="#medication-burden-calculator-questions" onClick={() => window.location.hash = 'medication-burden-calculator-questions'} className="text-sm hover:text-primary transition-colors pl-2">3. Questions</a>
                    <a href="#medication-burden-calculator-information" onClick={() => window.location.hash = 'medication-burden-calculator-information'} className="text-sm hover:text-primary transition-colors pl-2">4. Information</a>
                    <a href="#medication-burden-calculator-results" onClick={() => window.location.hash = 'medication-burden-calculator-results'} className="text-sm hover:text-primary transition-colors pl-2">5. Results</a>
                    <a href="#medication-burden-calculator-feedback" onClick={() => window.location.hash = 'medication-burden-calculator-feedback'} className="text-sm hover:text-primary transition-colors pl-2">6. Feedback</a>
                    
                    <h4 className="font-medium text-primary pt-4">Daily Energy Audit Funnel</h4>
                    <a href="#blog/energy-optimization-guide" onClick={() => window.location.hash = 'blog/energy-optimization-guide'} className="text-sm hover:text-primary transition-colors pl-2">1. Energy Optimization Guide Blog</a>
                    <a href="#daily-energy-audit-learn-more" onClick={() => window.location.hash = 'daily-energy-audit-learn-more'} className="text-sm hover:text-primary transition-colors pl-2">2. Learn More</a>
                    <a href="#daily-energy-audit-questions" onClick={() => window.location.hash = 'daily-energy-audit-questions'} className="text-sm hover:text-primary transition-colors pl-2">3. Questions</a>
                    <a href="#daily-energy-audit-information" onClick={() => window.location.hash = 'daily-energy-audit-information'} className="text-sm hover:text-primary transition-colors pl-2">4. Information</a>
                    <a href="#daily-energy-audit-results" onClick={() => window.location.hash = 'daily-energy-audit-results'} className="text-sm hover:text-primary transition-colors pl-2">5. Results</a>
                    <a href="#daily-energy-audit-feedback" onClick={() => window.location.hash = 'daily-energy-audit-feedback'} className="text-sm hover:text-primary transition-colors pl-2">6. Feedback</a>
                    
                    <h4 className="font-medium text-primary pt-4">Lifestyle Limiter Score Funnel</h4>
                    <a href="#blog/lifestyle-impact-guide" onClick={() => window.location.hash = 'blog/lifestyle-impact-guide'} className="text-sm hover:text-primary transition-colors pl-2">1. Lifestyle Impact Guide Blog</a>
                    <a href="#lifestyle-limiter-score-learn-more" onClick={() => window.location.hash = 'lifestyle-limiter-score-learn-more'} className="text-sm hover:text-primary transition-colors pl-2">2. Learn More</a>
                    <a href="#lifestyle-limiter-score-questions" onClick={() => window.location.hash = 'lifestyle-limiter-score-questions'} className="text-sm hover:text-primary transition-colors pl-2">3. Questions</a>
                    <a href="#lifestyle-limiter-score-information" onClick={() => window.location.hash = 'lifestyle-limiter-score-information'} className="text-sm hover:text-primary transition-colors pl-2">4. Information</a>
                    <a href="#lifestyle-limiter-score-results" onClick={() => window.location.hash = 'lifestyle-limiter-score-results'} className="text-sm hover:text-primary transition-colors pl-2">5. Results</a>
                    <a href="#lifestyle-limiter-score-feedback" onClick={() => window.location.hash = 'lifestyle-limiter-score-feedback'} className="text-sm hover:text-primary transition-colors pl-2">6. Feedback</a>
                    
                    <h4 className="font-medium text-primary pt-4">Longevity Focus Funnel</h4>
                    <a href="#blog/7-aging-faster-signs" onClick={() => window.location.hash = 'blog/7-aging-faster-signs'} className="text-sm hover:text-primary transition-colors pl-2">1. 7 Aging Faster Signs Blog</a>
                    <a href="#biological-age-calculator-learn-more" onClick={() => window.location.hash = 'biological-age-calculator-learn-more'} className="text-sm hover:text-primary transition-colors pl-2">2. Biological Age Calculator Learn More</a>
                    <a href="#biological-age-calculator-questions" onClick={() => window.location.hash = 'biological-age-calculator-questions'} className="text-sm hover:text-primary transition-colors pl-2">3. Biological Age Calculator Questions</a>
                    <a href="#biological-age-calculator-information" onClick={() => window.location.hash = 'biological-age-calculator-information'} className="text-sm hover:text-primary transition-colors pl-2">4. Biological Age Calculator Information</a>
                    <a href="#biological-age-calculator-results" onClick={() => window.location.hash = 'biological-age-calculator-results'} className="text-sm hover:text-primary transition-colors pl-2">5. Biological Age Calculator Results</a>
                    <a href="#biological-age-calculator-feedback" onClick={() => window.location.hash = 'biological-age-calculator-feedback'} className="text-sm hover:text-primary transition-colors pl-2">6. Biological Age Calculator Feedback</a>
                    <a href="#longevity-focus-protocol-challenge" onClick={() => window.location.hash = 'longevity-focus-protocol-challenge'} className="text-sm hover:text-primary transition-colors pl-2">7. Longevity Focus Protocol Challenge</a>
                    
                    <h4 className="font-medium text-primary pt-4">Cardiometabolic Risk Score Funnel</h4>
                    <a href="#blog/cardiometabolic-risk-signs" onClick={() => window.location.hash = 'blog/cardiometabolic-risk-signs'} className="text-sm hover:text-primary transition-colors pl-2">1. Cardiometabolic Risk Signs Blog</a>
                    <a href="#cardiometabolic-risk-score-learn-more" onClick={() => window.location.hash = 'cardiometabolic-risk-score-learn-more'} className="text-sm hover:text-primary transition-colors pl-2">2. Learn More</a>
                    <a href="#cardiometabolic-risk-score-questions" onClick={() => window.location.hash = 'cardiometabolic-risk-score-questions'} className="text-sm hover:text-primary transition-colors pl-2">3. Questions</a>
                    <a href="#cardiometabolic-risk-score-information" onClick={() => window.location.hash = 'cardiometabolic-risk-score-information'} className="text-sm hover:text-primary transition-colors pl-2">4. Information</a>
                    <a href="#cardiometabolic-risk-score-results" onClick={() => window.location.hash = 'cardiometabolic-risk-score-results'} className="text-sm hover:text-primary transition-colors pl-2">5. Results</a>
                    <a href="#cardiometabolic-risk-score-feedback" onClick={() => window.location.hash = 'cardiometabolic-risk-score-feedback'} className="text-sm hover:text-primary transition-colors pl-2">6. Feedback</a>
                    
                    <h4 className="font-medium text-primary pt-4">Resilience Index Funnel</h4>
                    <a href="#blog/resilience-signs" onClick={() => window.location.hash = 'blog/resilience-signs'} className="text-sm hover:text-primary transition-colors pl-2">1. Resilience Signs Blog</a>
                    <a href="#resilience-index-learn-more" onClick={() => window.location.hash = 'resilience-index-learn-more'} className="text-sm hover:text-primary transition-colors pl-2">2. Learn More</a>
                    <a href="#resilience-index-questions" onClick={() => window.location.hash = 'resilience-index-questions'} className="text-sm hover:text-primary transition-colors pl-2">3. Questions</a>
                    <a href="#resilience-index-information" onClick={() => window.location.hash = 'resilience-index-information'} className="text-sm hover:text-primary transition-colors pl-2">4. Information</a>
                    <a href="#resilience-index-results" onClick={() => window.location.hash = 'resilience-index-results'} className="text-sm hover:text-primary transition-colors pl-2">5. Results</a>
                    <a href="#resilience-index-feedback" onClick={() => window.location.hash = 'resilience-index-feedback'} className="text-sm hover:text-primary transition-colors pl-2">6. Feedback</a>
                    
                    <h4 className="font-medium text-primary pt-4">Nutrition & Body Composition Score Funnel</h4>
                    <a href="#blog/nutrition-body-composition-signs" onClick={() => window.location.hash = 'blog/nutrition-body-composition-signs'} className="text-sm hover:text-primary transition-colors pl-2">1. Nutrition Signs Blog</a>
                    <a href="#nutrition-body-composition-score-learn-more" onClick={() => window.location.hash = 'nutrition-body-composition-score-learn-more'} className="text-sm hover:text-primary transition-colors pl-2">2. Learn More</a>
                    <a href="#nutrition-body-composition-score-questions" onClick={() => window.location.hash = 'nutrition-body-composition-score-questions'} className="text-sm hover:text-primary transition-colors pl-2">3. Questions</a>
                    <a href="#nutrition-body-composition-score-information" onClick={() => window.location.hash = 'nutrition-body-composition-score-information'} className="text-sm hover:text-primary transition-colors pl-2">4. Information</a>
                    <a href="#nutrition-body-composition-score-results" onClick={() => window.location.hash = 'nutrition-body-composition-score-results'} className="text-sm hover:text-primary transition-colors pl-2">5. Results</a>
                    <a href="#nutrition-body-composition-score-feedback" onClick={() => window.location.hash = 'nutrition-body-composition-score-feedback'} className="text-sm hover:text-primary transition-colors pl-2">6. Feedback</a>
                    
                    <h4 className="font-medium text-primary pt-4">Functional Fitness Age Test Funnel</h4>
                    <a href="#blog/functional-fitness-age-signs" onClick={() => window.location.hash = 'blog/functional-fitness-age-signs'} className="text-sm hover:text-primary transition-colors pl-2">1. Fitness Age Signs Blog</a>
                    <a href="#functional-fitness-age-test-learn-more" onClick={() => window.location.hash = 'functional-fitness-age-test-learn-more'} className="text-sm hover:text-primary transition-colors pl-2">2. Learn More</a>
                    <a href="#functional-fitness-age-test-questions" onClick={() => window.location.hash = 'functional-fitness-age-test-questions'} className="text-sm hover:text-primary transition-colors pl-2">3. Questions</a>
                    <a href="#functional-fitness-age-test-information" onClick={() => window.location.hash = 'functional-fitness-age-test-information'} className="text-sm hover:text-primary transition-colors pl-2">4. Information</a>
                    <a href="#functional-fitness-age-test-results" onClick={() => window.location.hash = 'functional-fitness-age-test-results'} className="text-sm hover:text-primary transition-colors pl-2">5. Results</a>
                    <a href="#functional-fitness-age-test-feedback" onClick={() => window.location.hash = 'functional-fitness-age-test-feedback'} className="text-sm hover:text-primary transition-colors pl-2">6. Feedback</a>
                    
                    <h4 className="font-medium text-primary pt-4">Surgery Preparation Bundle Funnel</h4>
                    <a href="#completed-surgery-preparation-bundle-learn-more" onClick={() => window.location.hash = 'completed-surgery-preparation-bundle-learn-more'} className="text-sm hover:text-primary transition-colors pl-2">1. Learn More</a>
                    <a href="#completed-surgery-preparation-bundle-questions" onClick={() => window.location.hash = 'completed-surgery-preparation-bundle-questions'} className="text-sm hover:text-primary transition-colors pl-2">2. Questions</a>
                    <a href="#completed-surgery-preparation-bundle-information" onClick={() => window.location.hash = 'completed-surgery-preparation-bundle-information'} className="text-sm hover:text-primary transition-colors pl-2">3. Information</a>
                    <a href="#completed-surgery-preparation-bundle-results" onClick={() => window.location.hash = 'completed-surgery-preparation-bundle-results'} className="text-sm hover:text-primary transition-colors pl-2">4. Results</a>
                    <a href="#completed-surgery-preparation-bundle-feedback" onClick={() => window.location.hash = 'completed-surgery-preparation-bundle-feedback'} className="text-sm hover:text-primary transition-colors pl-2">5. Feedback</a>
                    
                    <h4 className="font-medium text-primary pt-4">Chronic Symptoms Bundle Funnel</h4>
                    <a href="#completed-chronic-symptoms-bundle-learn-more" onClick={() => window.location.hash = 'completed-chronic-symptoms-bundle-learn-more'} className="text-sm hover:text-primary transition-colors pl-2">1. Learn More</a>
                    <a href="#completed-chronic-symptoms-bundle-questions" onClick={() => window.location.hash = 'completed-chronic-symptoms-bundle-questions'} className="text-sm hover:text-primary transition-colors pl-2">2. Questions</a>
                    <a href="#completed-chronic-symptoms-bundle-information" onClick={() => window.location.hash = 'completed-chronic-symptoms-bundle-information'} className="text-sm hover:text-primary transition-colors pl-2">3. Information</a>
                    <a href="#completed-chronic-symptoms-bundle-results" onClick={() => window.location.hash = 'completed-chronic-symptoms-bundle-results'} className="text-sm hover:text-primary transition-colors pl-2">4. Results</a>
                    <a href="#completed-chronic-symptoms-bundle-feedback" onClick={() => window.location.hash = 'completed-chronic-symptoms-bundle-feedback'} className="text-sm hover:text-primary transition-colors pl-2">5. Feedback</a>
                    
                    <h4 className="font-medium text-primary pt-4">Longevity & Wellness Bundle Funnel</h4>
                    <a href="#longevity-wellness-bundle-learn-more" onClick={() => window.location.hash = 'longevity-wellness-bundle-learn-more'} className="text-sm hover:text-primary transition-colors pl-2">1. Learn More</a>
                    <a href="#longevity-wellness-bundle-questions" onClick={() => window.location.hash = 'longevity-wellness-bundle-questions'} className="text-sm hover:text-primary transition-colors pl-2">2. Questions</a>
                    <a href="#longevity-wellness-bundle-information" onClick={() => window.location.hash = 'longevity-wellness-bundle-information'} className="text-sm hover:text-primary transition-colors pl-2">3. Information</a>
                    <a href="#longevity-wellness-bundle-results" onClick={() => window.location.hash = 'longevity-wellness-bundle-results'} className="text-sm hover:text-primary transition-colors pl-2">4. Results</a>
                    <a href="#longevity-wellness-bundle-feedback" onClick={() => window.location.hash = 'longevity-wellness-bundle-feedback'} className="text-sm hover:text-primary transition-colors pl-2">5. Feedback</a>
                    
                    <h4 className="font-medium text-primary pt-4">Protocol Challenges</h4>
                    <a href="#chronic-symptom-protocol-challenge" onClick={() => window.location.hash = 'chronic-symptom-protocol-challenge'} className="text-sm hover:text-primary transition-colors pl-2">Chronic Symptom Protocol Challenge</a>
                    <a href="#longevity-focus-protocol-challenge" onClick={() => window.location.hash = 'longevity-focus-protocol-challenge'} className="text-sm hover:text-primary transition-colors pl-2">Longevity Focus Protocol Challenge</a>
                    
                    <h4 className="font-medium text-primary pt-4">Other Blog Articles</h4>
                    <a href="#blog/red-flags-surgery" onClick={() => window.location.hash = 'blog/red-flags-surgery'} className="text-sm hover:text-primary transition-colors pl-2">Red Flags Surgery</a>
                    <a href="#blog/home-tweaks-recovery" onClick={() => window.location.hash = 'blog/home-tweaks-recovery'} className="text-sm hover:text-primary transition-colors pl-2">Home Tweaks Recovery</a>
                    <a href="#blog/morning-stiffness-solutions" onClick={() => window.location.hash = 'blog/morning-stiffness-solutions'} className="text-sm hover:text-primary transition-colors pl-2">Morning Stiffness Solutions</a>
                    <a href="#blog/7-aging-faster-signs" onClick={() => window.location.hash = 'blog/7-aging-faster-signs'} className="text-sm hover:text-primary transition-colors pl-2">7 Warning Signs You're Aging Faster</a>
                    <a href="#blog/cardiometabolic-risk-signs" onClick={() => window.location.hash = 'blog/cardiometabolic-risk-signs'} className="text-sm hover:text-primary transition-colors pl-2">7 Critical Cardiometabolic Warning Signs</a>
                    <a href="#blog/resilience-signs" onClick={() => window.location.hash = 'blog/resilience-signs'} className="text-sm hover:text-primary transition-colors pl-2">7 Warning Signs Resilience Is Declining</a>
                    <a href="#blog/nutrition-body-composition-signs" onClick={() => window.location.hash = 'blog/nutrition-body-composition-signs'} className="text-sm hover:text-primary transition-colors pl-2">7 Signs Nutrition Is Sabotaging Body Composition</a>
                    <a href="#blog/functional-fitness-age-signs" onClick={() => window.location.hash = 'blog/functional-fitness-age-signs'} className="text-sm hover:text-primary transition-colors pl-2">7 Signs Your Body Is Aging Faster Than Your Years</a>
                    
                    <h4 className="font-medium text-primary pt-4">Legal Pages</h4>
                    <a href="#terms" onClick={() => window.location.hash = 'terms'} className="text-sm hover:text-primary transition-colors pl-2">Terms & Conditions</a>
                    <a href="#privacy" onClick={() => window.location.hash = 'privacy'} className="text-sm hover:text-primary transition-colors pl-2">Privacy Policy</a>
                    <a href="#cookies" onClick={() => window.location.hash = 'cookies'} className="text-sm hover:text-primary transition-colors pl-2">Cookie Policy</a>
                    <a href="#complaints" onClick={() => window.location.hash = 'complaints'} className="text-sm hover:text-primary transition-colors pl-2">Complaints Procedure</a>

                    <h4 className="font-medium text-primary pt-4">Admin Panel</h4>
                    <a href="#admin-login" onClick={() => window.location.hash = 'admin-login'} className="text-sm hover:text-primary transition-colors pl-2">Admin Portal</a>
                  </nav>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo - Center */}
          <div className="flex-1 flex justify-center">
            <a href="#" onClick={() => window.location.hash = ''} className="flex items-center">
              <img 
                src={lutherHealthLogo} 
                alt="Luther Health" 
                className="h-8 w-auto"
              />
            </a>
          </div>

          {/* Actions - Right Side */}
          <div className="flex items-center space-x-2">
            {/* Mobile-friendly user icon */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <User className="w-5 h-5" />
            </Button>
            
            {/* Desktop actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
              {onDesignSystemClick && (
                <Button variant="ghost" size="icon" onClick={onDesignSystemClick}>
                  <Palette className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}