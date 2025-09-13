import React from 'react';
import { QuizTemplate, QuizConfig } from '../components/QuizTemplate';

const recoverySpeedQuiz: QuizConfig = {
  title: 'Recovery Speed Predictor',
  questions: [
    {
      id: 'nutrition-habits',
      question: 'How would you describe your current nutrition habits?',
      subtitle: 'Nutrition significantly impacts healing speed and recovery outcomes',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Balanced diet, adequate protein, minimal processed foods' },
        { id: 'good', label: 'Good', description: 'Generally healthy with occasional processed foods' },
        { id: 'fair', label: 'Fair', description: 'Some healthy choices but inconsistent' },
        { id: 'poor', label: 'Poor', description: 'Frequent processed foods, limited protein' },
        { id: 'very-poor', label: 'Very Poor', description: 'Mostly processed foods, poor nutritional quality' },
      ],
    },
    {
      id: 'protein-intake',
      question: 'How often do you consume adequate protein?',
      subtitle: 'Protein is crucial for tissue repair and wound healing',
      options: [
        { id: 'every-meal', label: 'Every Meal', description: 'I include protein at breakfast, lunch, and dinner' },
        { id: 'most-meals', label: 'Most Meals', description: 'I have protein at 2 out of 3 main meals' },
        { id: 'some-meals', label: 'Some Meals', description: 'I have protein at 1 main meal per day' },
        { id: 'occasionally', label: 'Occasionally', description: 'I sometimes forget to include protein' },
        { id: 'rarely', label: 'Rarely', description: 'I don\'t focus on protein intake' },
      ],
    },
    {
      id: 'mental-readiness',
      question: 'How mentally prepared do you feel for surgery and recovery?',
      subtitle: 'Mental preparation significantly impacts recovery outcomes',
      options: [
        { id: 'very-prepared', label: 'Very Prepared', description: 'I feel confident and have realistic expectations' },
        { id: 'mostly-prepared', label: 'Mostly Prepared', description: 'I understand the process but have some concerns' },
        { id: 'somewhat-prepared', label: 'Somewhat Prepared', description: 'I know the basics but feel uncertain' },
        { id: 'unprepared', label: 'Unprepared', description: 'I feel anxious and unsure about what to expect' },
        { id: 'very-unprepared', label: 'Very Unprepared', description: 'I feel overwhelmed and very anxious' },
      ],
    },
    {
      id: 'stress-management',
      question: 'How do you typically manage stress and anxiety?',
      subtitle: 'Stress management skills help optimize healing and recovery',
      multiSelect: true,
      options: [
        { id: 'exercise', label: 'Regular Exercise' },
        { id: 'meditation', label: 'Meditation or Mindfulness' },
        { id: 'social-support', label: 'Talking to Friends/Family' },
        { id: 'professional-help', label: 'Professional Counseling' },
        { id: 'hobbies', label: 'Engaging in Hobbies' },
        { id: 'breathing', label: 'Deep Breathing Techniques' },
        { id: 'poor-coping', label: 'I struggle with stress management' },
        { id: 'no-strategies', label: 'I don\'t have specific strategies' },
      ],
    },
    {
      id: 'support-system',
      question: 'What level of support do you have at home during recovery?',
      subtitle: 'Strong support systems dramatically improve recovery outcomes',
      options: [
        { id: 'excellent-support', label: 'Excellent Support', description: 'Multiple people available to help with daily tasks' },
        { id: 'good-support', label: 'Good Support', description: 'One dedicated person available most of the time' },
        { id: 'moderate-support', label: 'Moderate Support', description: 'Some help available but limited hours' },
        { id: 'minimal-support', label: 'Minimal Support', description: 'Occasional help but mostly on my own' },
        { id: 'no-support', label: 'No Support', description: 'I will be managing recovery entirely alone' },
      ],
    },
    {
      id: 'home-preparation',
      question: 'How prepared is your home environment for recovery?',
      subtitle: 'A recovery-ready home environment speeds healing and prevents setbacks',
      multiSelect: true,
      options: [
        { id: 'mobility-aids', label: 'Mobility aids ready (crutches, walker, etc.)' },
        { id: 'bathroom-safety', label: 'Bathroom safety equipment installed' },
        { id: 'sleeping-arrangements', label: 'Sleeping arrangements optimized' },
        { id: 'meal-prep', label: 'Meals prepared or planned' },
        { id: 'medication-organized', label: 'Medication management system set up' },
        { id: 'entertainment', label: 'Entertainment/activities for bed rest' },
        { id: 'transport-arranged', label: 'Transportation for appointments arranged' },
        { id: 'none-prepared', label: 'Haven\'t started preparing yet' },
      ],
    },
    {
      id: 'sleep-quality',
      question: 'How would you rate your current sleep quality?',
      subtitle: 'Quality sleep is essential for healing and tissue repair',
      options: [
        { id: 'excellent', label: 'Excellent', description: '7-9 hours of deep, refreshing sleep nightly' },
        { id: 'good', label: 'Good', description: 'Generally sleep well with occasional disruptions' },
        { id: 'fair', label: 'Fair', description: 'Some nights good, some nights poor' },
        { id: 'poor', label: 'Poor', description: 'Frequently disrupted or insufficient sleep' },
        { id: 'very-poor', label: 'Very Poor', description: 'Chronic insomnia or severe sleep disorders' },
      ],
    },
    {
      id: 'exercise-baseline',
      question: 'What is your current activity level?',
      subtitle: 'Your baseline fitness affects how quickly you can return to normal activities',
      options: [
        { id: 'very-active', label: 'Very Active', description: 'Regular intense exercise, excellent fitness' },
        { id: 'moderately-active', label: 'Moderately Active', description: 'Regular moderate exercise, good fitness' },
        { id: 'lightly-active', label: 'Lightly Active', description: 'Some regular activity, fair fitness' },
        { id: 'sedentary', label: 'Sedentary', description: 'Minimal regular activity, poor fitness' },
        { id: 'very-sedentary', label: 'Very Sedentary', description: 'No regular activity, very poor fitness' },
      ],
    },
  ],
  onComplete: (answers) => {
    console.log('Recovery Speed Assessment completed with answers:', answers);
    window.location.hash = 'recovery-speed-predictor-information';
  },
  onBack: () => {
    window.location.hash = 'recovery-speed-predictor-learn-more';
  },
};

export function RecoverySpeedQuestionsPage() {
  return <QuizTemplate config={recoverySpeedQuiz} />;
}