import React, { useEffect, useState } from 'react';
import { QuizTemplate, QuizConfig } from '../components/QuizTemplate';

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
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sessionId = sessionStorage.getItem("stripe_session_id");

    if (!sessionId) {
      setAllowed(false);
      setLoading(false);
      return;
    }

    fetch(`https://luther.health/api/check-payment?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (data.paid) {
          setAllowed(true);
        } else {
          window.location.href = "/payment-required";
        }
      })
      .catch(err => {
        console.error("Payment check failed:", err);
        setAllowed(false);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!allowed) return <p>Redirecting to payment...</p>;

  // ✅ FIX: use complicationRiskQuiz instead of quizWithSubmit
  return <QuizTemplate config={complicationRiskQuiz} />;
}
