import React from 'react';
import { QuizTemplate, QuizConfig } from '../components/QuizTemplate';

const inflammationRiskQuiz: QuizConfig = {
  title: 'Inflammation Risk Score Assessment',
  questions: [
    {
      id: 'diet-quality',
      question: 'How would you describe your typical diet?',
      subtitle: 'Think about your eating patterns over the past month',
      options: [
        { id: 'whole-foods', label: 'Whole foods based', description: 'Mostly unprocessed foods, plenty of vegetables and fruits' },
        { id: 'balanced-mixed', label: 'Balanced mixed diet', description: 'Mix of processed and unprocessed foods' },
        { id: 'convenience-focused', label: 'Convenience focused', description: 'Regular processed foods, some fresh ingredients' },
        { id: 'highly-processed', label: 'Highly processed', description: 'Mostly packaged, processed, and fast foods' },
      ],
    },
    {
      id: 'inflammatory-foods',
      question: 'How often do you consume these potentially inflammatory foods?',
      subtitle: 'Include fried foods, sugary snacks, processed meats, refined grains',
      options: [
        { id: 'rarely', label: 'Rarely (few times per month)' },
        { id: 'sometimes', label: 'Sometimes (1-2 times per week)' },
        { id: 'regularly', label: 'Regularly (3-4 times per week)' },
        { id: 'daily', label: 'Daily or almost daily' },
        { id: 'multiple-daily', label: 'Multiple times daily' },
      ],
    },
    {
      id: 'anti-inflammatory-foods',
      question: 'How often do you eat anti-inflammatory foods?',
      subtitle: 'Include fatty fish, leafy greens, berries, nuts, olive oil, turmeric',
      options: [
        { id: 'daily', label: 'Daily - multiple servings' },
        { id: 'most-days', label: 'Most days of the week' },
        { id: 'few-times-week', label: 'A few times per week' },
        { id: 'occasionally', label: 'Occasionally' },
        { id: 'rarely', label: 'Rarely or never' },
      ],
    },
    {
      id: 'sugar-intake',
      question: 'How much added sugar do you consume daily?',
      subtitle: 'Include sugary drinks, desserts, and processed foods with added sugars',
      options: [
        { id: 'minimal', label: 'Minimal (less than 25g/day)' },
        { id: 'moderate', label: 'Moderate (25-50g/day)' },
        { id: 'high', label: 'High (50-100g/day)' },
        { id: 'very-high', label: 'Very high (over 100g/day)' },
        { id: 'unsure', label: 'I\'m not sure' },
      ],
    },
    {
      id: 'physical-activity',
      question: 'How would you describe your physical activity level?',
      subtitle: 'Consider both structured exercise and daily movement',
      options: [
        { id: 'very-active', label: 'Very active', description: 'Exercise 5+ times per week, mostly active lifestyle' },
        { id: 'moderately-active', label: 'Moderately active', description: 'Exercise 3-4 times per week' },
        { id: 'somewhat-active', label: 'Somewhat active', description: 'Exercise 1-2 times per week' },
        { id: 'sedentary', label: 'Sedentary', description: 'Little to no regular exercise' },
      ],
    },
    {
      id: 'stress-level',
      question: 'How would you rate your current stress levels?',
      subtitle: 'Consider work, personal, and overall life stress over the past month',
      options: [
        { id: 'low', label: 'Low stress', description: 'Generally calm and relaxed' },
        { id: 'moderate', label: 'Moderate stress', description: 'Some stressful periods but manageable' },
        { id: 'high', label: 'High stress', description: 'Frequently stressed or overwhelmed' },
        { id: 'chronic', label: 'Chronic stress', description: 'Constantly stressed or anxious' },
      ],
    },
    {
      id: 'sleep-quality',
      question: 'How would you rate your sleep quality?',
      subtitle: 'Consider how refreshed you feel and how well you sleep through the night',
      options: [
        { id: 'excellent', label: 'Excellent', description: '7-9 hours, wake refreshed, rarely disrupted' },
        { id: 'good', label: 'Good', description: 'Usually get good sleep with occasional disruptions' },
        { id: 'fair', label: 'Fair', description: 'Sleep is okay but often feel tired' },
        { id: 'poor', label: 'Poor', description: 'Frequently disrupted, rarely feel rested' },
      ],
    },
    {
      id: 'sleep-duration',
      question: 'How many hours of sleep do you typically get per night?',
      subtitle: 'Consider your average over the past month',
      options: [
        { id: 'less-than-6', label: 'Less than 6 hours' },
        { id: '6-7-hours', label: '6-7 hours' },
        { id: '7-8-hours', label: '7-8 hours' },
        { id: '8-9-hours', label: '8-9 hours' },
        { id: 'more-than-9', label: 'More than 9 hours' },
      ],
    },
    {
      id: 'smoking-alcohol',
      question: 'Do you smoke or consume alcohol regularly?',
      subtitle: 'Both can contribute to chronic inflammation',
      multiSelect: true,
      options: [
        { id: 'current-smoker', label: 'Current smoker (cigarettes, vaping, etc.)' },
        { id: 'former-smoker', label: 'Former smoker (quit within last 5 years)' },
        { id: 'regular-alcohol', label: 'Regular alcohol consumption (most days)' },
        { id: 'moderate-alcohol', label: 'Moderate alcohol consumption (few times per week)' },
        { id: 'occasional-alcohol', label: 'Occasional alcohol consumption' },
        { id: 'neither', label: 'Neither smoking nor regular alcohol use' },
      ],
    },
    {
      id: 'weight-status',
      question: 'How would you describe your current weight status?',
      subtitle: 'Excess body fat, particularly abdominal fat, can promote inflammation',
      options: [
        { id: 'underweight', label: 'Underweight' },
        { id: 'normal-weight', label: 'Normal weight' },
        { id: 'slightly-overweight', label: 'Slightly overweight' },
        { id: 'moderately-overweight', label: 'Moderately overweight' },
        { id: 'significantly-overweight', label: 'Significantly overweight' },
      ],
    },
    {
      id: 'health-conditions',
      question: 'Do you have any of these health conditions?',
      subtitle: 'These conditions are often associated with chronic inflammation',
      multiSelect: true,
      options: [
        { id: 'diabetes', label: 'Diabetes or pre-diabetes' },
        { id: 'heart-disease', label: 'Heart disease or high blood pressure' },
        { id: 'arthritis', label: 'Arthritis or joint problems' },
        { id: 'autoimmune', label: 'Autoimmune condition' },
        { id: 'digestive', label: 'Digestive issues (IBS, IBD, etc.)' },
        { id: 'allergies', label: 'Allergies or asthma' },
        { id: 'none', label: 'None of the above' },
      ],
    },
    {
      id: 'inflammatory-symptoms',
      question: 'How often do you experience these symptoms?',
      subtitle: 'These can be signs of chronic inflammation',
      multiSelect: true,
      options: [
        { id: 'joint-pain', label: 'Joint pain or stiffness' },
        { id: 'muscle-aches', label: 'Muscle aches or soreness' },
        { id: 'fatigue', label: 'Persistent fatigue' },
        { id: 'brain-fog', label: 'Brain fog or difficulty concentrating' },
        { id: 'skin-issues', label: 'Skin problems (eczema, acne, rashes)' },
        { id: 'digestive-problems', label: 'Digestive problems' },
        { id: 'frequent-infections', label: 'Frequent colds or infections' },
        { id: 'none', label: 'None of these symptoms' },
      ],
    },
  ],
  onComplete: (answers) => {
    console.log('Inflammation Risk Score Assessment completed with answers:', answers);
    window.location.hash = 'inflammation-risk-score-information';
  },
  onBack: () => {
    window.location.hash = 'inflammation-risk-score-learn-more';
  },
};

export function InflammationRiskQuestionsPage() {
  return <QuizTemplate config={inflammationRiskQuiz} />;
}