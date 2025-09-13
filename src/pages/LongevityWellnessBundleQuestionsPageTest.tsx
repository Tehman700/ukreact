import React from 'react';
import { QuizTemplate, QuizConfig } from '../components/QuizTemplate';

const longevityWellnessBundleQuiz: QuizConfig = {
  title: 'The Complete Longevity Bundle',
  onComplete: () => {
    window.location.hash = 'longevity-wellness-bundle-information';
  },
  questions: [
    {
      id: 'current-age',
      question: 'What is your current chronological age?',
      options: [
        { id: '18-25', label: '18-25 years', description: 'Young adult age range' },
        { id: '26-35', label: '26-35 years', description: 'Early adult professional age' },
        { id: '36-45', label: '36-45 years', description: 'Mid-career adult age' },
        { id: '46-55', label: '46-55 years', description: 'Mature adult age range' },
        { id: '56-65', label: '56-65 years', description: 'Pre-retirement age range' },
        { id: '66-75', label: '66-75 years', description: 'Early retirement age' },
        { id: '76+', label: '76+ years', description: 'Senior adult age range' },
      ],
    },
    {
      id: 'energy-levels',
      question: 'How would you describe your typical energy levels throughout the day?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'High energy that lasts throughout the entire day' },
        { id: 'good', label: 'Good', description: 'Generally good energy with minor afternoon dips' },
        { id: 'moderate', label: 'Moderate', description: 'Decent energy but noticeable fatigue by evening' },
        { id: 'low', label: 'Low', description: 'Frequent fatigue and need for rest periods' },
        { id: 'very-low', label: 'Very low', description: 'Chronic fatigue affecting daily activities' },
      ],
    },
    {
      id: 'test-complete',
      question: 'This is a test question to verify the quiz is working correctly.',
      options: [
        { id: 'yes', label: 'Yes, it works', description: 'The quiz is loading correctly' },
        { id: 'no', label: 'No, there are issues', description: 'Still having problems' },
      ],
    },
  ],
};

export function LongevityWellnessBundleQuestionsPageTest() {
  return <QuizTemplate config={longevityWellnessBundleQuiz} />;
}