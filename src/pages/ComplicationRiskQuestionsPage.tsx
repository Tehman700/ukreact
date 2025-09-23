import React, { useEffect, useState } from 'react';
import { QuizTemplate, QuizConfig } from '../components/QuizTemplate';
import { PaymentGate } from "../components/PaymentGate"; // 👈 import gate


const complicationRiskQuiz: QuizConfig = {
  title: 'Complication Risk Checker',
  questions: [
    {
      id: 'medical-conditions',
      question: 'Do you have any of the following medical conditions?',
      subtitle: 'Select all that apply - this helps us assess your surgical risk profile',
      multiSelect: true,
      options: [
        { id: 'diabetes', label: 'Diabetes (Type 1 or 2)' },
        { id: 'heart-disease', label: 'Heart Disease or Cardiovascular Issues' },
        { id: 'high-blood-pressure', label: 'High Blood Pressure' },
        { id: 'kidney-disease', label: 'Kidney Disease' },
        { id: 'liver-disease', label: 'Liver Disease' },
        { id: 'lung-disease', label: 'Lung Disease (COPD, Asthma)' },
        { id: 'autoimmune', label: 'Autoimmune Disorders' },
        { id: 'blood-clots', label: 'History of Blood Clots' },
        { id: 'none', label: 'None of the above' },
      ],
    },
    {
      id: 'lifestyle-factors',
      question: 'Which lifestyle factors apply to you?',
      subtitle: 'These factors can significantly impact surgical outcomes',
      multiSelect: true,
      options: [
        { id: 'smoking', label: 'Current smoker' },
        { id: 'former-smoker', label: 'Former smoker (quit within last 2 years)' },
        { id: 'heavy-drinking', label: 'Regular alcohol consumption (>14 units/week)' },
        { id: 'sedentary', label: 'Sedentary lifestyle (minimal exercise)' },
        { id: 'poor-diet', label: 'Poor nutritional habits' },
        { id: 'high-stress', label: 'High stress levels' },
        { id: 'sleep-issues', label: 'Sleep problems or disorders' },
        { id: 'none', label: 'None of the above' },
      ],
    },
    {
      id: 'medications',
      question: 'Are you currently taking any of these medications?',
      subtitle: 'Some medications can increase surgical complications',
      multiSelect: true,
      options: [
        { id: 'blood-thinners', label: 'Blood thinners (Warfarin, Aspirin, etc.)' },
        { id: 'diabetes-meds', label: 'Diabetes medications' },
        { id: 'heart-meds', label: 'Heart medications' },
        { id: 'immunosuppressants', label: 'Immunosuppressive drugs' },
        { id: 'steroids', label: 'Long-term steroid use' },
        { id: 'herbal-supplements', label: 'Herbal supplements or alternative medicines' },
        { id: 'pain-meds', label: 'Regular pain medications' },
        { id: 'none', label: 'None of the above' },
      ],
    },
    {
      id: 'previous-surgery',
      question: 'What is your surgical history?',
      subtitle: 'Previous surgical experiences can indicate potential risks',
      options: [
        { id: 'no-surgery', label: 'No Previous Surgery', description: 'This would be my first surgical procedure' },
        { id: 'minor-surgery', label: 'Minor Surgery Only', description: 'Outpatient procedures, dental surgery, etc.' },
        { id: 'major-surgery-good', label: 'Major Surgery - Good Recovery', description: 'Had major surgery with no complications' },
        { id: 'major-surgery-complications', label: 'Major Surgery - With Complications', description: 'Experienced complications during or after surgery' },
        { id: 'multiple-surgeries', label: 'Multiple Major Surgeries', description: 'Several major surgical procedures' },
      ],
    },
    {
      id: 'bmi-category',
      question: 'What is your current weight status?',
      subtitle: 'Weight significantly impacts surgical risk and recovery',
      options: [
        { id: 'underweight', label: 'Underweight', description: 'BMI under 18.5' },
        { id: 'normal', label: 'Normal Weight', description: 'BMI 18.5-24.9' },
        { id: 'overweight', label: 'Overweight', description: 'BMI 25-29.9' },
        { id: 'obese-1', label: 'Obese Class I', description: 'BMI 30-34.9' },
        { id: 'obese-2', label: 'Obese Class II', description: 'BMI 35-39.9' },
        { id: 'obese-3', label: 'Obese Class III', description: 'BMI 40+' },
      ],
    },
    {
      id: 'age-group',
      question: 'What is your age range?',
      subtitle: 'Age is a key factor in surgical risk assessment',
      options: [
        { id: 'under-40', label: 'Under 40' },
        { id: '40-49', label: '40-49' },
        { id: '50-59', label: '50-59' },
        { id: '60-69', label: '60-69' },
        { id: '70-79', label: '70-79' },
        { id: '80-plus', label: '80+' },
      ],
    },
  ],
};

export function ComplicationRiskQuestionsPage() {
  const convertAnswersToLabels = (answers: Record<string, any>) => {
    const converted: Array<{ question: string; answer: string }> = [];
    complicationRiskQuiz.questions.forEach((q) => {
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
    ...complicationRiskQuiz,
    informationPageRoute: "complication-risk-checker-information",
    onComplete: async (answers) => {
      console.log("Complication Risk Assessment completed with answers:", answers);
      const user = JSON.parse(sessionStorage.getItem("currentUser") || "{}");

      try {
        const convertedAnswers = convertAnswersToLabels(answers);

        await fetch("https://luther.health/api/assessments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.id,
            assessment_type: "Complication Risk",
            answers: convertedAnswers,
          }),
        });

        window.location.hash = "complication-risk-checker-information";
      } catch (err) {
        console.error("Error saving complication risk assessment:", err);
      }
    },
    onBack: () => {
      window.location.hash = "complication-risk-checker-learn-more";
    },
  };

  // ✅ Wrap with PaymentGate
  return (
    <PaymentGate>
      <QuizTemplate config={quizWithSubmit} />
    </PaymentGate>
  );
}