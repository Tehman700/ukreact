import React from 'react';
import { QuizTemplate, QuizConfig } from '../components/QuizTemplate';
import { useAssessmentAnalytics } from '../hooks/useAnalytics';

const biologicalAgeQuiz: QuizConfig = {
  title: 'Biological Age Calculator',
  onComplete: () => {
    window.location.hash = 'biological-age-calculator-information';
  },
  questions: [
    {
      id: 'chronological-age',
      question: 'What is your current chronological age?',
      options: [
        { id: '30-39', label: '30-39 years' },
        { id: '40-49', label: '40-49 years' },
        { id: '50-59', label: '50-59 years' },
        { id: '60-69', label: '60-69 years' },
        { id: '70-79', label: '70-79 years' },
        { id: '80-plus', label: '80+ years' },
      ],
    },
    {
      id: 'exercise-frequency',
      question: 'How often do you engage in vigorous physical activity?',
      options: [
        { id: 'daily', label: 'Daily', description: 'Most days of the week, 30+ minutes' },
        { id: 'regular', label: '4-6 times per week', description: 'Consistent vigorous exercise' },
        { id: 'moderate', label: '2-3 times per week', description: 'Regular but not daily' },
        { id: 'occasional', label: '1-2 times per week', description: 'Some vigorous activity' },
        { id: 'rarely', label: 'Rarely or never', description: 'Minimal vigorous exercise' },
      ],
    },
    {
      id: 'muscle-strength',
      question: 'How would you rate your current muscle strength and mobility?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Strong and very mobile, no limitations' },
        { id: 'good', label: 'Good', description: 'Generally strong with minor limitations' },
        { id: 'fair', label: 'Fair', description: 'Moderate strength, some difficulty with tasks' },
        { id: 'poor', label: 'Poor', description: 'Weak, significant difficulty with daily tasks' },
        { id: 'very-poor', label: 'Very Poor', description: 'Very weak, major mobility issues' },
      ],
    },
    {
      id: 'sleep-quality',
      question: 'How would you describe your sleep quality over the past month?',
      options: [
        { id: 'excellent', label: 'Excellent', description: '7-9 hours, wake up refreshed' },
        { id: 'good', label: 'Good', description: 'Generally good sleep, occasionally tired' },
        { id: 'fair', label: 'Fair', description: 'Some sleep issues, often tired' },
        { id: 'poor', label: 'Poor', description: 'Frequent sleep problems, usually tired' },
        { id: 'very-poor', label: 'Very Poor', description: 'Severe sleep issues, always exhausted' },
      ],
    },
    {
      id: 'stress-levels',
      question: 'How do you rate your current stress levels?',
      options: [
        { id: 'very-low', label: 'Very Low', description: 'Minimal stress, feel calm and relaxed' },
        { id: 'low', label: 'Low', description: 'Occasional stress but manageable' },
        { id: 'moderate', label: 'Moderate', description: 'Regular stress but coping well' },
        { id: 'high', label: 'High', description: 'Frequent stress, affecting daily life' },
        { id: 'very-high', label: 'Very High', description: 'Constant stress, overwhelming' },
      ],
    },
    {
      id: 'diet-quality',
      question: 'How would you describe your overall diet quality?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Balanced, nutritious, minimal processed foods' },
        { id: 'good', label: 'Good', description: 'Generally healthy with occasional treats' },
        { id: 'fair', label: 'Fair', description: 'Mixed diet, some healthy and unhealthy choices' },
        { id: 'poor', label: 'Poor', description: 'Often unhealthy, many processed foods' },
        { id: 'very-poor', label: 'Very Poor', description: 'Mostly unhealthy, fast food, poor nutrition' },
      ],
    },
    {
      id: 'smoking-status',
      question: 'What is your smoking history?',
      options: [
        { id: 'never', label: 'Never smoked', description: 'No history of regular smoking' },
        { id: 'former-recent', label: 'Former smoker (quit within 5 years)', description: 'Quit recently' },
        { id: 'former-long', label: 'Former smoker (quit 5+ years ago)', description: 'Long-term former smoker' },
        { id: 'current-light', label: 'Current light smoker', description: 'Less than 10 cigarettes per day' },
        { id: 'current-heavy', label: 'Current heavy smoker', description: '10+ cigarettes per day' },
      ],
    },
    {
      id: 'alcohol-consumption',
      question: 'How much alcohol do you typically consume per week?',
      options: [
        { id: 'none', label: 'None', description: 'No alcohol consumption' },
        { id: 'light', label: '1-7 drinks per week', description: 'Light to moderate consumption' },
        { id: 'moderate', label: '8-14 drinks per week', description: 'Moderate consumption' },
        { id: 'heavy', label: '15-21 drinks per week', description: 'Heavy consumption' },
        { id: 'very-heavy', label: '22+ drinks per week', description: 'Very heavy consumption' },
      ],
    },
    {
      id: 'chronic-conditions',
      question: 'Do you have any of the following chronic health conditions?',
      multiSelect: true,
      options: [
        { id: 'diabetes', label: 'Diabetes (Type 1 or 2)' },
        { id: 'hypertension', label: 'High blood pressure' },
        { id: 'heart-disease', label: 'Heart disease' },
        { id: 'arthritis', label: 'Arthritis or joint disease' },
        { id: 'depression', label: 'Depression or anxiety' },
        { id: 'obesity', label: 'Obesity (BMI >30)' },
        { id: 'osteoporosis', label: 'Osteoporosis' },
        { id: 'none', label: 'None of the above' },
      ],
    },
    {
      id: 'cognitive-function',
      question: 'How would you rate your memory and cognitive function?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Sharp memory, excellent concentration' },
        { id: 'good', label: 'Good', description: 'Generally good, occasional forgetfulness' },
        { id: 'fair', label: 'Fair', description: 'Some memory issues, difficulty concentrating' },
        { id: 'poor', label: 'Poor', description: 'Frequent memory problems, poor concentration' },
        { id: 'very-poor', label: 'Very Poor', description: 'Significant cognitive difficulties' },
      ],
    },
    {
      id: 'social-connections',
      question: 'How would you describe your social connections and relationships?',
      options: [
        { id: 'very-strong', label: 'Very Strong', description: 'Close family/friends, regular social activities' },
        { id: 'strong', label: 'Strong', description: 'Good relationships, fairly social' },
        { id: 'moderate', label: 'Moderate', description: 'Some good relationships, limited social time' },
        { id: 'weak', label: 'Weak', description: 'Few close relationships, often lonely' },
        { id: 'very-weak', label: 'Very Weak', description: 'Isolated, minimal social connections' },
      ],
    },
    {
      id: 'energy-levels',
      question: 'How are your energy levels throughout the day?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'High energy all day, rarely tired' },
        { id: 'good', label: 'Good', description: 'Generally energetic, occasional fatigue' },
        { id: 'fair', label: 'Fair', description: 'Moderate energy, afternoon fatigue common' },
        { id: 'poor', label: 'Poor', description: 'Low energy most days, frequent fatigue' },
        { id: 'very-poor', label: 'Very Poor', description: 'Constantly tired, no energy' },
      ],
    },
  ],
};

export function BiologicalAgeQuestionsPage() {
  // Initialize analytics for this specific assessment
  const { startAssessment, trackProgress, completeAssessment } = useAssessmentAnalytics(
    '2',
    'Practical Biological Age Proxy',
    49.99
  );

  // Enhanced quiz configuration with analytics tracking
  const biologicalAgeQuizWithAnalytics: QuizConfig = {
    ...biologicalAgeQuiz,
    informationPageRoute: 'biological-age-calculator-information',
    onComplete: (answers) => {
      console.log('Biological Age Assessment completed with answers:', answers);
      completeAssessment();
      window.location.hash = 'biological-age-calculator-information';
    },
    onQuestionComplete: (questionIndex, totalQuestions) => {
      const completionPercentage = Math.round(((questionIndex + 1) / totalQuestions) * 100);
      trackProgress(`question_${questionIndex + 1}`, completionPercentage);
    },
  };

  // Start assessment tracking when component mounts
  React.useEffect(() => {
    startAssessment();
  }, [startAssessment]);

  return <QuizTemplate config={biologicalAgeQuizWithAnalytics} />;
}