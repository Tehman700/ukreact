import React from 'react';
import { QuizTemplate, QuizConfig } from '../components/QuizTemplate';
import { PaymentGate } from '../components/PaymentGate';

// Medication Burden Quiz Config
const medicationBurdenQuiz: QuizConfig = {
  title: 'Medication Burden Calculator Assessment',
  questions: [
    {
      id: 'current-medications',
      question: 'How many prescription medications do you currently take regularly?',
      subtitle: 'Include daily, weekly, and monthly prescribed medications',
      options: [
        { id: 'none', label: 'None' },
        { id: '1-2', label: '1-2 medications' },
        { id: '3-5', label: '3-5 medications' },
        { id: '6-9', label: '6-9 medications' },
        { id: '10-15', label: '10-15 medications' },
        { id: 'over-15', label: 'More than 15 medications' },
      ],
    },
    {
      id: 'medication-timing',
      question: 'How often do you take medications throughout the day?',
      subtitle: 'Consider all prescribed medications combined',
      options: [
        { id: 'once-daily', label: 'Once daily' },
        { id: 'twice-daily', label: 'Twice daily' },
        { id: 'three-times', label: '3 times daily' },
        { id: 'four-times', label: '4 times daily' },
        { id: 'five-plus', label: '5 or more times daily' },
        { id: 'no-medications', label: "I don't take medications" },
      ],
    },
    {
      id: 'medication-management',
      question: 'How do you manage your medication schedule?',
      subtitle: 'Select the method that best describes your approach',
      options: [
        { id: 'memory-only', label: 'Memory alone' },
        { id: 'written-list', label: 'Written list or notes' },
        { id: 'pill-organizer', label: 'Pill organizer/weekly dispenser' },
        { id: 'phone-reminders', label: 'Phone alarms or app reminders' },
        { id: 'family-help', label: 'Family member helps manage' },
        { id: 'multiple-methods', label: 'Combination of multiple methods' },
      ],
    },
    {
      id: 'missed-doses',
      question: 'How often do you miss or forget to take your medications?',
      subtitle: 'Consider the past month',
      options: [
        { id: 'never', label: 'Never miss doses' },
        { id: 'rarely', label: 'Rarely (once a month or less)' },
        { id: 'occasionally', label: 'Occasionally (2-3 times per month)' },
        { id: 'weekly', label: 'About once a week' },
        { id: 'frequently', label: 'Several times a week' },
        { id: 'daily', label: 'Miss doses daily' },
      ],
    },
    {
      id: 'side-effects',
      question: 'Do you experience side effects from your medications?',
      subtitle: 'Include any unpleasant symptoms you attribute to medications',
      options: [
        { id: 'no-side-effects', label: 'No noticeable side effects' },
        { id: 'mild-tolerable', label: 'Mild side effects, but tolerable' },
        { id: 'moderate-bothersome', label: 'Moderate side effects, somewhat bothersome' },
        { id: 'significant-impact', label: 'Significant side effects affecting daily life' },
        { id: 'severe-limiting', label: 'Severe side effects limiting activities' },
        { id: 'unsure', label: 'Unsure if symptoms are medication-related' },
      ],
    },
    {
      id: 'side-effect-types',
      question: 'What types of side effects do you experience?',
      subtitle: 'Select all that apply',
      multiSelect: true,
      options: [
        { id: 'drowsiness', label: 'Drowsiness or fatigue' },
        { id: 'dizziness', label: 'Dizziness or lightheadedness' },
        { id: 'nausea', label: 'Nausea or stomach upset' },
        { id: 'constipation', label: 'Constipation or digestive issues' },
        { id: 'dry-mouth', label: 'Dry mouth' },
        { id: 'confusion', label: 'Confusion or memory problems' },
        { id: 'weight-changes', label: 'Weight gain or loss' },
        { id: 'sleep-issues', label: 'Sleep disturbances' },
        { id: 'mood-changes', label: 'Mood changes or depression' },
        { id: 'no-side-effects', label: 'No side effects experienced' },
      ],
    },
    {
      id: 'drug-interactions',
      question: 'Are you aware of potential interactions between your medications?',
      subtitle: 'Consider knowledge of how your medications might affect each other',
      options: [
        { id: 'very-aware', label: 'Very aware - regularly discuss with healthcare providers' },
        { id: 'somewhat-aware', label: 'Somewhat aware - occasionally check interactions' },
        { id: 'limited-awareness', label: 'Limited awareness - rely on pharmacist guidance' },
        { id: 'not-aware', label: 'Not aware of potential interactions' },
        { id: 'concerned-unsure', label: 'Concerned but unsure how to check' },
        { id: 'single-medication', label: 'Only take one medication' },
      ],
    },
    {
      id: 'medication-costs',
      question: 'How do medication costs affect your ability to take them as prescribed?',
      subtitle: 'Consider financial impact on medication adherence',
      options: [
        { id: 'no-cost-issues', label: 'Cost is not a concern' },
        { id: 'manageable-costs', label: 'Costs are manageable with current insurance/budget' },
        { id: 'sometimes-struggle', label: 'Sometimes struggle to afford medications' },
        { id: 'often-skip', label: 'Often skip doses due to cost' },
        { id: 'ration-medications', label: 'Regularly ration medications to save money' },
        { id: 'cannot-afford', label: 'Cannot afford some prescribed medications' },
      ],
    },
    {
      id: 'healthcare-communication',
      question: 'How often do you discuss your complete medication list with healthcare providers?',
      subtitle: 'Include all doctors, specialists, and pharmacists',
      options: [
        { id: 'every-visit', label: 'Every healthcare visit' },
        { id: 'most-visits', label: 'Most healthcare visits' },
        { id: 'occasionally', label: 'Occasionally when asked' },
        { id: 'rarely', label: 'Rarely discuss complete list' },
        { id: 'never', label: 'Never provide complete medication list' },
        { id: 'single-provider', label: 'Only with my primary care doctor' },
      ],
    },
    {
      id: 'medication-burden-impact',
      question: 'How does managing your medications affect your daily life?',
      subtitle: 'Consider the overall impact of medication management',
      options: [
        { id: 'no-impact', label: 'No impact on daily activities' },
        { id: 'minimal-impact', label: 'Minimal impact, easily manageable' },
        { id: 'moderate-effort', label: 'Requires moderate effort and planning' },
        { id: 'significant-burden', label: 'Significant burden, affects daily routine' },
        { id: 'overwhelming', label: 'Overwhelming, difficult to manage effectively' },
        { id: 'family-dependent', label: 'Completely dependent on others for management' },
      ],
    },
  ],
};

// Convert answers like in Anaesthesia
const convertAnswersToLabels = (answers: Record<string, any>) => {
  const converted: Array<{ question: string; answer: string }> = [];
  medicationBurdenQuiz.questions.forEach((q) => {
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

export function MedicationBurdenQuestionsPage() {
  const quizWithSubmit: QuizConfig = {
    ...medicationBurdenQuiz,
    informationPageRoute: 'medication-burden-calculator-results',
    onComplete: async (answers) => {
      console.log('Medication Burden Assessment completed:', answers);
      sessionStorage.setItem(
        'pendingAnswers',
        JSON.stringify(convertAnswersToLabels(answers))
      );
      window.location.hash = 'medication-burden-calculator-information'; // go to info page
    },
    onBack: () => {
      window.location.hash = 'medication-burden-calculator-learn-more';
    },
  };

  return (
    <PaymentGate requiredFunnel="medication">
      <QuizTemplate config={quizWithSubmit} />
    </PaymentGate>
  );
}
