import React from 'react';
import { QuizTemplate, QuizConfig } from '../components/QuizTemplate';
import { PaymentGate } from '../components/PaymentGate'; // <-- import the gate

// Daily Energy Quiz Config
const dailyEnergyQuiz: QuizConfig = {
  title: 'Daily Energy Audit Assessment',
  questions: [
    {
      id: 'morning-energy',
      question: 'How do you typically feel when you first wake up?',
      subtitle: 'Consider your energy level before coffee or breakfast',
      options: [
        { id: 'refreshed-energetic', label: 'Refreshed and energetic' },
        { id: 'somewhat-refreshed', label: 'Somewhat refreshed, ready to start the day' },
        { id: 'neutral-okay', label: 'Neutral - not great, not terrible' },
        { id: 'tired-sluggish', label: 'Tired and sluggish' },
        { id: 'exhausted-drained', label: 'Exhausted and drained' },
        { id: 'varies-significantly', label: 'Varies significantly day to day' },
      ],
    },
    {
      id: 'energy-pattern',
      question: 'What best describes your energy pattern throughout the day?',
      subtitle: 'Think about your typical energy levels from morning to evening',
      options: [
        { id: 'consistent-high', label: 'Consistently high energy all day' },
        { id: 'morning-high-afternoon-dip', label: 'High in morning, dip in afternoon, second wind evening' },
        { id: 'steady-decline', label: 'Steady decline from morning to evening' },
        { id: 'afternoon-peak', label: 'Low morning, peak energy in afternoon' },
        { id: 'evening-peak', label: 'Low all day, most energetic in evening' },
        { id: 'unpredictable-crashes', label: 'Unpredictable with sudden energy crashes' },
      ],
    },
    {
      id: 'sleep-duration',
      question: 'How many hours of sleep do you typically get per night?',
      subtitle: 'Include time from when you fall asleep to when you wake up',
      options: [
        { id: 'less-than-5', label: 'Less than 5 hours' },
        { id: '5-6-hours', label: '5-6 hours' },
        { id: '6-7-hours', label: '6-7 hours' },
        { id: '7-8-hours', label: '7-8 hours' },
        { id: '8-9-hours', label: '8-9 hours' },
        { id: 'more-than-9', label: 'More than 9 hours' },
      ],
    },
    {
      id: 'sleep-quality',
      question: 'How would you rate your sleep quality?',
      subtitle: 'Consider how rested you feel and how often you wake during the night',
      options: [
        { id: 'excellent', label: 'Excellent - deep, uninterrupted sleep' },
        { id: 'good', label: 'Good - mostly restful with occasional disruptions' },
        { id: 'fair', label: 'Fair - some restful nights, some poor nights' },
        { id: 'poor', label: 'Poor - frequently disrupted or light sleep' },
        { id: 'very-poor', label: 'Very poor - rarely feel rested regardless of hours' },
      ],
    },
    {
      id: 'afternoon-fatigue',
      question: 'Do you experience an afternoon energy crash?',
      subtitle: 'Typically between 1 PM and 4 PM',
      options: [
        { id: 'never', label: 'Never experience afternoon crashes' },
        { id: 'occasionally', label: 'Occasionally (1-2 times per week)' },
        { id: 'sometimes', label: 'Sometimes (3-4 times per week)' },
        { id: 'most-days', label: 'Most days (5-6 times per week)' },
        { id: 'daily', label: 'Every day without fail' },
        { id: 'multiple-crashes', label: 'Multiple energy crashes throughout the day' },
      ],
    },
    {
      id: 'fatigue-impact',
      question: 'How does fatigue affect your daily productivity?',
      subtitle: 'Consider impact on work, household tasks, and personal activities',
      options: [
        { id: 'no-impact', label: 'No impact - maintain full productivity' },
        { id: 'minimal-impact', label: 'Minimal impact - slight reduction in efficiency' },
        { id: 'moderate-impact', label: 'Moderate impact - noticeable reduction in productivity' },
        { id: 'significant-impact', label: 'Significant impact - struggle to complete tasks' },
        { id: 'severe-impact', label: 'Severe impact - frequently unable to finish tasks' },
        { id: 'debilitating', label: 'Debilitating - major activities severely affected' },
      ],
    },
    {
      id: 'energy-strategies',
      question: 'What do you currently use to boost your energy?',
      subtitle: 'Select all that apply',
      multiSelect: true,
      options: [
        { id: 'caffeine-coffee', label: 'Caffeine/coffee' },
        { id: 'energy-drinks', label: 'Energy drinks' },
        { id: 'sugar-snacks', label: 'Sugar or sweet snacks' },
        { id: 'exercise', label: 'Physical exercise' },
        { id: 'power-naps', label: 'Power naps' },
        { id: 'meditation', label: 'Meditation or mindfulness' },
        { id: 'supplements', label: 'Energy supplements or vitamins' },
        { id: 'nothing-specific', label: 'Nothing specific' },
      ],
    },
    {
      id: 'exercise-frequency',
      question: 'How often do you engage in physical exercise?',
      subtitle: 'Include any form of intentional physical activity',
      options: [
        { id: 'daily', label: 'Daily' },
        { id: 'most-days', label: 'Most days (5-6 times per week)' },
        { id: 'few-times-week', label: 'Few times a week (3-4 times)' },
        { id: 'occasionally', label: 'Occasionally (1-2 times per week)' },
        { id: 'rarely', label: 'Rarely (few times per month)' },
        { id: 'never', label: 'Never or almost never' },
      ],
    },
    {
      id: 'stress-levels',
      question: 'How would you rate your current stress levels?',
      subtitle: 'Consider work, personal, and financial stress over the past month',
      options: [
        { id: 'very-low', label: 'Very low - life feels manageable' },
        { id: 'low', label: 'Low - occasional stress but well-managed' },
        { id: 'moderate', label: 'Moderate - noticeable stress but coping' },
        { id: 'high', label: 'High - stress affecting daily life' },
        { id: 'very-high', label: 'Very high - feeling overwhelmed most days' },
        { id: 'extreme', label: 'Extreme - stress is debilitating' },
      ],
    },
    {
      id: 'nutrition-patterns',
      question: 'How would you describe your eating patterns?',
      subtitle: 'Consider meal timing, frequency, and nutritional quality',
      options: [
        { id: 'regular-balanced', label: 'Regular, balanced meals at consistent times' },
        { id: 'mostly-regular', label: 'Mostly regular with occasional skipped meals' },
        { id: 'irregular-timing', label: 'Irregular meal timing due to schedule' },
        { id: 'frequent-snacking', label: 'Frequent snacking instead of proper meals' },
        { id: 'skip-meals-often', label: 'Often skip meals due to time/appetite' },
        { id: 'very-irregular', label: 'Very irregular eating patterns' },
      ],
    },
  ],
};

// Convert answers into labels
const convertAnswersToLabels = (answers: Record<string, any>) => {
  const converted: Array<{ question: string; answer: string }> = [];
  dailyEnergyQuiz.questions.forEach((q) => {
    const answer = answers[q.id];
    if (!answer) return;

    let labels: string;
    if (q.multiSelect && Array.isArray(answer)) {
      labels = answer
        .map((id) => q.options.find((o) => o.id === id)?.label || id)
        .join(', ');
    } else {
      const selectedId = Array.isArray(answer) ? answer[0] : answer;
      labels = q.options.find((o) => o.id === selectedId)?.label || selectedId || '';
    }

    converted.push({ question: q.question, answer: labels });
  });
  return converted;
};

export function DailyEnergyQuestionsPage() {
  const quizWithSubmit: QuizConfig = {
    ...dailyEnergyQuiz,
    informationPageRoute: 'daily-energy-audit-results',
    onComplete: (answers) => {
      console.log('Daily Energy Audit Assessment completed:', answers);
      sessionStorage.setItem(
        'pendingAnswers',
        JSON.stringify(convertAnswersToLabels(answers))
      );
      window.location.hash = 'daily-energy-audit-information';
    },
    onBack: () => {
      window.location.hash = 'daily-energy-audit-learn-more';
    },
  };

  return (
    <PaymentGate requiredFunnel="energy">
      <QuizTemplate config={quizWithSubmit} />
    </PaymentGate>
  );
}
