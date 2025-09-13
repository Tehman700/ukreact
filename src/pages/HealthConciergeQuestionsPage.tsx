import React from 'react';
import { QuizTemplate, QuizConfig } from '../components/QuizTemplate';

const healthConciergeQuiz: QuizConfig = {
  title: 'Health Concierge Assessment',
  onComplete: (answers) => {
    // Store answers for results page
    localStorage.setItem('healthConciergeResponses', JSON.stringify(answers));
    window.location.hash = 'database-processing';
  },
  questions: [
    {
      id: 'primary-goal',
      question: 'What is your primary health goal right now?',
      options: [
        { id: 'surgery-prep', label: 'Preparing for upcoming surgery', description: 'Getting ready for a surgical procedure' },
        { id: 'chronic-symptoms', label: 'Managing chronic symptoms', description: 'Dealing with ongoing pain, fatigue, or other symptoms' },
        { id: 'aging-optimization', label: 'Slowing aging & optimizing longevity', description: 'Focus on healthy aging and extending healthspan' },
        { id: 'energy-performance', label: 'Improving energy & performance', description: 'Boosting daily energy and physical performance' },
        { id: 'general-health', label: 'General health optimization', description: 'Overall wellness improvement and prevention' },
        { id: 'specific-concern', label: 'Addressing a specific health concern', description: 'Have a particular health issue to investigate' },
      ],
    },
    {
      id: 'urgency-level',
      question: 'How urgent is your health concern?',
      options: [
        { id: 'immediate', label: 'Immediate', description: 'Need help within days or weeks' },
        { id: 'soon', label: 'Soon', description: 'Need help within 1-3 months' },
        { id: 'planning', label: 'Planning ahead', description: 'Looking to improve over 3-6 months' },
        { id: 'prevention', label: 'Prevention focused', description: 'Long-term health optimization' },
      ],
    },
    {
      id: 'current-challenges',
      question: 'What health challenges are you currently experiencing?',
      multiSelect: true,
      options: [
        { id: 'chronic-pain', label: 'Chronic pain or discomfort' },
        { id: 'low-energy', label: 'Low energy or fatigue' },
        { id: 'sleep-issues', label: 'Sleep problems' },
        { id: 'weight-concerns', label: 'Weight management concerns' },
        { id: 'stress-anxiety', label: 'High stress or anxiety' },
        { id: 'digestive-issues', label: 'Digestive problems' },
        { id: 'mobility-issues', label: 'Mobility or strength concerns' },
        { id: 'medication-burden', label: 'Managing multiple medications' },
        { id: 'no-major-issues', label: 'No major issues - focusing on optimization' },
      ],
    },
    {
      id: 'previous-attempts',
      question: 'Have you tried addressing your health concerns before?',
      options: [
        { id: 'never-tried', label: 'This is my first serious attempt', description: 'Haven\'t really focused on health improvement before' },
        { id: 'some-attempts', label: 'Tried a few things', description: 'Some diet changes, occasional exercise, etc.' },
        { id: 'many-attempts', label: 'Tried many approaches', description: 'Multiple diets, programs, treatments with mixed results' },
        { id: 'working-with-professionals', label: 'Currently working with healthcare professionals', description: 'Have ongoing medical care or support' },
      ],
    },
    {
      id: 'investment-level',
      question: 'How much are you willing to invest in your health annually?',
      options: [
        { id: 'minimal', label: 'Minimal investment', description: 'Primarily looking for free resources and self-help options' },
        { id: 'moderate', label: '£100-£500', description: 'Willing to invest in assessments and basic programs' },
        { id: 'significant', label: '£500-£2,000', description: 'Ready for comprehensive assessments and protocols' },
        { id: 'premium', label: '£2,000+', description: 'Interested in premium care including potential clinician consultations' },
      ],
    },
    {
      id: 'preferred-approach',
      question: 'What type of health approach appeals to you most?',
      options: [
        { id: 'diy-guided', label: 'DIY with guidance', description: 'Self-directed with expert recommendations and resources' },
        { id: 'structured-program', label: 'Structured programs', description: 'Step-by-step protocols and assessments' },
        { id: 'professional-support', label: 'Professional support', description: 'Direct access to healthcare professionals' },
        { id: 'community-based', label: 'Community approach', description: 'Learning and improving with others' },
      ],
    },
  ],
  processingPage: 'database-processing',
  resultsPage: 'health-concierge-results',
};

export function HealthConciergeQuestionsPage() {
  return <QuizTemplate config={healthConciergeQuiz} />;
}