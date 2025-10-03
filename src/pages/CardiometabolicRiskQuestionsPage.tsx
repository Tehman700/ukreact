import React from 'react';
import { QuizTemplate, QuizConfig } from '../components/QuizTemplate';
import { PaymentGate } from '../components/PaymentGate';

const cardiometabolicRiskQuiz: QuizConfig = {
  title: 'Cardiometabolic Risk Score',
  questions: [
    {
      id: 'age-range',
      question: 'What is your current age?',
      options: [
        { id: '18-29', label: '18-29 years' },
        { id: '30-39', label: '30-39 years' },
        { id: '40-49', label: '40-49 years' },
        { id: '50-59', label: '50-59 years' },
        { id: '60-69', label: '60-69 years' },
        { id: '70-plus', label: '70+ years' },
      ],
    },
    {
      id: 'family-history',
      question: 'Do you have a family history of cardiovascular disease or diabetes?',
      multiSelect: true,
      options: [
        { id: 'heart-disease', label: 'Heart disease (parent or sibling)', description: 'Heart attack, coronary artery disease, heart failure' },
        { id: 'stroke', label: 'Stroke (parent or sibling)', description: 'Cerebrovascular accident' },
        { id: 'diabetes', label: 'Type 2 diabetes (parent or sibling)', description: 'Adult-onset diabetes' },
        { id: 'high-bp', label: 'High blood pressure (parent or sibling)', description: 'Hypertension requiring medication' },
        { id: 'high-cholesterol', label: 'High cholesterol (parent or sibling)', description: 'Requiring medication or dietary changes' },
        { id: 'none', label: 'None of the above' },
      ],
    },
    {
      id: 'current-conditions',
      question: 'Do you currently have any of these diagnosed conditions?',
      multiSelect: true,
      options: [
        { id: 'hypertension', label: 'High blood pressure', description: 'Currently taking medication or diagnosed' },
        { id: 'diabetes', label: 'Type 2 diabetes or prediabetes', description: 'Elevated blood sugar or HbA1c' },
        { id: 'high-cholesterol', label: 'High cholesterol', description: 'LDL >130 mg/dL or taking statins' },
        { id: 'metabolic-syndrome', label: 'Metabolic syndrome', description: 'Combination of risk factors' },
        { id: 'sleep-apnea', label: 'Sleep apnea', description: 'Diagnosed breathing disorder during sleep' },
        { id: 'none', label: 'None of the above' },
      ],
    },
    {
      id: 'body-composition',
      question: 'How would you describe your current body composition?',
      options: [
        { id: 'lean', label: 'Lean/Athletic', description: 'Low body fat, visible muscle definition' },
        { id: 'normal', label: 'Normal weight', description: 'Healthy weight for height, some muscle tone' },
        { id: 'overweight', label: 'Overweight', description: 'Some excess weight, BMI 25-29.9' },
        { id: 'obese', label: 'Obese', description: 'Significant excess weight, BMI >30' },
        { id: 'abdominal-obesity', label: 'Central/abdominal obesity', description: 'Excess weight concentrated around midsection' },
      ],
    },
    {
      id: 'exercise-habits',
      question: 'How often do you engage in cardiovascular exercise?',
      options: [
        { id: 'daily', label: 'Daily', description: '30+ minutes most days, heart rate elevated' },
        { id: 'regular', label: '4-6 times per week', description: 'Consistent cardio routine' },
        { id: 'moderate', label: '2-3 times per week', description: 'Regular but not daily exercise' },
        { id: 'occasional', label: '1-2 times per week', description: 'Some cardiovascular activity' },
        { id: 'sedentary', label: 'Rarely or never', description: 'Minimal structured exercise' },
      ],
    },
    {
      id: 'diet-pattern',
      question: 'Which best describes your typical eating pattern?',
      options: [
        { id: 'mediterranean', label: 'Mediterranean-style', description: 'Fish, vegetables, olive oil, whole grains, minimal processed foods' },
        { id: 'plant-based', label: 'Plant-based/vegetarian', description: 'Predominantly vegetables, fruits, legumes, grains' },
        { id: 'balanced', label: 'Balanced mixed diet', description: 'Variety of foods, some processed items' },
        { id: 'western', label: 'Western/standard diet', description: 'Regular processed foods, fast food, high refined carbs' },
        { id: 'poor', label: 'Poor diet quality', description: 'Frequent fast food, sugary drinks, minimal vegetables' },
      ],
    },
    {
      id: 'smoking-status',
      question: 'What is your smoking history?',
      options: [
        { id: 'never', label: 'Never smoked', description: 'No history of regular tobacco use' },
        { id: 'former-long', label: 'Former smoker (quit 5+ years ago)', description: 'Long-term former smoker' },
        { id: 'former-recent', label: 'Former smoker (quit within 5 years)', description: 'Recently quit smoking' },
        { id: 'current-light', label: 'Current light smoker', description: 'Less than 10 cigarettes per day' },
        { id: 'current-heavy', label: 'Current heavy smoker', description: '10+ cigarettes per day' },
      ],
    },
    {
      id: 'alcohol-intake',
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
      id: 'stress-levels',
      question: 'How would you rate your chronic stress levels?',
      options: [
        { id: 'very-low', label: 'Very Low', description: 'Minimal stress, feel calm and relaxed' },
        { id: 'low', label: 'Low', description: 'Occasional stress but well-managed' },
        { id: 'moderate', label: 'Moderate', description: 'Regular stress but coping adequately' },
        { id: 'high', label: 'High', description: 'Frequent stress, affecting health and sleep' },
        { id: 'very-high', label: 'Very High', description: 'Chronic overwhelming stress' },
      ],
    },
    {
      id: 'sleep-quality',
      question: 'How would you describe your sleep quality and duration?',
      options: [
        { id: 'excellent', label: 'Excellent', description: '7-9 hours, wake up refreshed, no snoring' },
        { id: 'good', label: 'Good', description: 'Generally good sleep, occasionally tired' },
        { id: 'fair', label: 'Fair', description: 'Some sleep issues, often tired during day' },
        { id: 'poor', label: 'Poor', description: 'Frequent sleep problems, usually tired' },
        { id: 'very-poor', label: 'Very Poor', description: 'Severe sleep issues, chronic fatigue' },
      ],
    },
    {
      id: 'blood-pressure-awareness',
      question: 'What do you know about your blood pressure readings?',
      options: [
        { id: 'optimal', label: 'Optimal (less than 120/80)', description: 'Consistently normal readings' },
        { id: 'normal', label: 'Normal (120-129/80-84)', description: 'Slightly elevated but normal range' },
        { id: 'high-normal', label: 'High normal (130-139/85-89)', description: 'Borderline high, pre-hypertension' },
        { id: 'high', label: 'High (140+/90+)', description: 'Diagnosed hypertension' },
        { id: 'unknown', label: 'I don\'t know my blood pressure', description: 'Haven\'t checked recently' },
      ],
    },
    {
      id: 'energy-fatigue',
      question: 'How are your energy levels and physical stamina?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'High energy all day, good stamina for activities' },
        { id: 'good', label: 'Good', description: 'Generally energetic, occasional afternoon fatigue' },
        { id: 'fair', label: 'Fair', description: 'Moderate energy, tire easily with exertion' },
        { id: 'poor', label: 'Poor', description: 'Low energy most days, poor stamina' },
        { id: 'very-poor', label: 'Very Poor', description: 'Constantly tired, minimal stamina' },
      ],
    },
  ],
};

export function CardiometabolicRiskQuestionsPage() {
  const convertAnswersToLabels = (answers: Record<string, any>) => {
    const converted: Array<{ question: string; answer: string }> = [];
    cardiometabolicRiskQuiz.questions.forEach((q) => {
      const answer = answers[q.id];
      if (!answer) return;

      let labels: string;
      if (q.multiSelect && Array.isArray(answer)) {
        labels = answer
          .map((id) => q.options.find((o) => o.id === id)?.label || id)
          .join(", ");
      } else {
        const selectedId = Array.isArray(answer) ? answer[0] : answer;
        labels =
          q.options.find((o) => o.id === selectedId)?.label ||
          selectedId ||
          "";
      }

      converted.push({ question: q.question, answer: labels });
    });
    return converted;
  };

  const quizWithSubmit: QuizConfig = {
    ...cardiometabolicRiskQuiz,
    informationPageRoute: "cardiometabolic-risk-score-results",
    onComplete: async (answers) => {
      console.log("Cardiometabolic Risk Assessment completed:", answers);
      sessionStorage.setItem("pendingAnswers", JSON.stringify(convertAnswersToLabels(answers)));
      window.location.hash = "cardiometabolic-risk-score-information";
    },
    onBack: () => {
      window.location.hash = "cardiometabolic-risk-score-learn-more";
    },
  };

  return (
    <PaymentGate requiredFunnel="card">
      <QuizTemplate config={quizWithSubmit} />
    </PaymentGate>
  );
}