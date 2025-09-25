import React from 'react';
import { QuizTemplate, QuizConfig } from '../components/QuizTemplate';
import { PaymentGate } from '../components/PaymentGate'; // <-- import the gate

const symptomSeverityQuiz: QuizConfig = {
  title: 'Symptom Severity Index Assessment',
  questions: [
    {
      id: 'pain-frequency',
      question: 'How often do you experience pain?',
      subtitle: 'Include any type of pain (headaches, joint pain, muscle pain, etc.)',
      options: [
        { id: 'never', label: 'Never' },
        { id: 'rarely', label: 'Rarely (once a month or less)' },
        { id: 'sometimes', label: 'Sometimes (2-3 times per month)' },
        { id: 'often', label: 'Often (1-2 times per week)' },
        { id: 'daily', label: 'Daily or almost daily' },
        { id: 'constant', label: 'Constant/continuous' },
      ],
    },
    {
      id: 'pain-intensity',
      question: 'On average, how intense is your pain when it occurs?',
      subtitle: 'Rate on a scale where 0 = no pain and 10 = worst pain imaginable',
      options: [
        { id: 'mild', label: '1-3 (Mild pain)' },
        { id: 'moderate', label: '4-6 (Moderate pain)' },
        { id: 'severe', label: '7-8 (Severe pain)' },
        { id: 'extreme', label: '9-10 (Extreme pain)' },
        { id: 'no-pain', label: 'I don\'t experience pain' },
      ],
    },
    {
      id: 'fatigue-level',
      question: 'How would you describe your energy levels throughout the day?',
      subtitle: 'Consider your typical energy patterns over the past month',
      options: [
        { id: 'high-energy', label: 'High energy most of the day' },
        { id: 'good-energy', label: 'Good energy with occasional dips' },
        { id: 'moderate-energy', label: 'Moderate energy, need afternoon rest' },
        { id: 'low-energy', label: 'Low energy, frequently tired' },
        { id: 'very-low-energy', label: 'Very low energy, exhausted most days' },
        { id: 'severe-fatigue', label: 'Severe fatigue affecting daily activities' },
      ],
    },
    {
      id: 'fatigue-impact',
      question: 'How does fatigue affect your daily activities?',
      subtitle: 'Select all that apply',
      multiSelect: true,
      options: [
        { id: 'work-performance', label: 'Affects work performance' },
        { id: 'social-activities', label: 'Limits social activities' },
        { id: 'exercise', label: 'Prevents regular exercise' },
        { id: 'household-tasks', label: 'Makes household tasks difficult' },
        { id: 'concentration', label: 'Affects concentration and focus' },
        { id: 'mood', label: 'Impacts mood and emotional wellbeing' },
        { id: 'no-impact', label: 'No significant impact' },
      ],
    },
    {
      id: 'digestive-symptoms',
      question: 'How often do you experience digestive symptoms?',
      subtitle: 'Include bloating, gas, stomach pain, irregular bowel movements, etc.',
      options: [
        { id: 'never', label: 'Never' },
        { id: 'rarely', label: 'Rarely (once a month or less)' },
        { id: 'sometimes', label: 'Sometimes (few times per month)' },
        { id: 'weekly', label: 'Weekly' },
        { id: 'daily', label: 'Daily' },
        { id: 'multiple-daily', label: 'Multiple times daily' },
      ],
    },
    {
      id: 'digestive-severity',
      question: 'When digestive symptoms occur, how severe are they?',
      subtitle: 'Rate the impact on your daily activities',
      options: [
        { id: 'mild', label: 'Mild - barely noticeable' },
        { id: 'moderate', label: 'Moderate - noticeable but manageable' },
        { id: 'significant', label: 'Significant - affects daily activities' },
        { id: 'severe', label: 'Severe - significantly disrupts daily life' },
        { id: 'no-symptoms', label: 'I don\'t experience digestive symptoms' },
      ],
    },
    {
      id: 'joint-stiffness',
      question: 'How often do you experience joint stiffness or pain?',
      subtitle: 'Include morning stiffness, joint pain during movement, etc.',
      options: [
        { id: 'never', label: 'Never' },
        { id: 'occasionally', label: 'Occasionally (few times per month)' },
        { id: 'weekly', label: 'Weekly' },
        { id: 'most-days', label: 'Most days' },
        { id: 'daily', label: 'Daily' },
        { id: 'constant', label: 'Constant throughout the day' },
      ],
    },
    {
      id: 'morning-stiffness',
      question: 'How long does morning stiffness typically last?',
      subtitle: 'From when you wake up until joints feel normal',
      options: [
        { id: 'none', label: 'No morning stiffness' },
        { id: 'under-15-min', label: 'Less than 15 minutes' },
        { id: '15-30-min', label: '15-30 minutes' },
        { id: '30-60-min', label: '30-60 minutes' },
        { id: '1-2-hours', label: '1-2 hours' },
        { id: 'over-2-hours', label: 'More than 2 hours' },
      ],
    },
    {
      id: 'sleep-quality',
      question: 'How would you rate your sleep quality?',
      subtitle: 'Consider how refreshed you feel upon waking',
      options: [
        { id: 'excellent', label: 'Excellent - always wake refreshed' },
        { id: 'good', label: 'Good - usually wake refreshed' },
        { id: 'fair', label: 'Fair - sometimes wake refreshed' },
        { id: 'poor', label: 'Poor - rarely wake refreshed' },
        { id: 'very-poor', label: 'Very poor - never wake refreshed' },
      ],
    },
    {
      id: 'symptom-triggers',
      question: 'What factors seem to worsen your symptoms?',
      subtitle: 'Select all that apply',
      multiSelect: true,
      options: [
        { id: 'stress', label: 'Stress or anxiety' },
        { id: 'certain-foods', label: 'Certain foods' },
        { id: 'weather-changes', label: 'Weather changes' },
        { id: 'lack-of-sleep', label: 'Lack of sleep' },
        { id: 'physical-activity', label: 'Physical activity' },
        { id: 'inactivity', label: 'Lack of physical activity' },
        { id: 'hormonal-changes', label: 'Hormonal changes' },
        { id: 'no-pattern', label: 'No clear pattern identified' },
      ],
    },
  ],
  onComplete: (answers) => {
    console.log('Symptom Severity Index Assessment completed with answers:', answers);
    window.location.hash = 'symptom-severity-index-information';
  },
  onBack: () => {
    window.location.hash = 'symptom-severity-index-learn-more';
  },
};

export function SymptomSeverityQuestionsPage() {
    return (
    <PaymentGate requiredFunnel="symptom">
      <QuizTemplate config={symptomSeverityQuiz} />
    </PaymentGate>
  );
}