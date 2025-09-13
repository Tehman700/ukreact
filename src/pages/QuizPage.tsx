import React from 'react';
import { QuizTemplate, QuizConfig } from '../components/QuizTemplate';

const surgeryReadinessQuiz: QuizConfig = {
  title: 'Surgery Readiness Assessment',
  questions: [
    {
      id: 'surgery-type',
      question: 'What type of surgery are you preparing for?',
      subtitle: 'Select the option that best describes your upcoming procedure',
      options: [
        { id: 'knee', label: 'Knee' },
        { id: 'hip', label: 'Hip' },
        { id: 'shoulder', label: 'Shoulder' },
        { id: 'heart', label: 'Heart' },
        { id: 'hernia', label: 'Hernia' },
        { id: 'other', label: 'Other' },
      ],
    },
    {
      id: 'timeline',
      question: 'When is your surgery scheduled?',
      subtitle: 'This helps us tailor your preparation plan',
      options: [
        { id: 'within-2-weeks', label: 'Within 2 weeks' },
        { id: '2-4-weeks', label: '2-4 weeks' },
        { id: '1-2-months', label: '1-2 months' },
        { id: '2-3-months', label: '2-3 months' },
        { id: 'more-than-3-months', label: 'More than 3 months' },
        { id: 'not-scheduled', label: 'Not yet scheduled' },
      ],
    },
    {
      id: 'current-fitness',
      question: 'How would you rate your current fitness level?',
      subtitle: 'Be honest - this helps us create the right program for you',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'I exercise regularly and feel very fit' },
        { id: 'good', label: 'Good', description: 'I exercise sometimes and feel moderately fit' },
        { id: 'fair', label: 'Fair', description: 'I exercise occasionally but could improve' },
        { id: 'poor', label: 'Poor', description: 'I rarely exercise and feel out of shape' },
        { id: 'very-poor', label: 'Very Poor', description: 'I have significant fitness concerns' },
      ],
    },
    {
      id: 'concerns',
      question: 'What are your main concerns about the surgery?',
      subtitle: 'Select all that apply',
      multiSelect: true,
      options: [
        { id: 'pain-management', label: 'Pain Management' },
        { id: 'recovery-time', label: 'Recovery Time' },
        { id: 'complications', label: 'Potential Complications' },
        { id: 'mobility-loss', label: 'Loss of Mobility' },
        { id: 'work-impact', label: 'Impact on Work' },
        { id: 'family-impact', label: 'Impact on Family' },
        { id: 'financial-concerns', label: 'Financial Concerns' },
        { id: 'no-concerns', label: 'No Major Concerns' },
      ],
    },
  ],
  onComplete: (answers) => {
    console.log('Quiz completed with answers:', answers);
    // Here you would typically send the results to your backend
  },
  onBack: () => {
    window.location.hash = 'assessments';
  },
};

export function QuizPage() {
  return <QuizTemplate config={surgeryReadinessQuiz} />;
}