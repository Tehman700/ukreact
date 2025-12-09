import React from 'react';
import { QuizTemplate, QuizConfig } from '../components/QuizTemplate';
import { useAssessmentAnalytics } from '../hooks/useAnalytics';
// import { PaymentGate } from '../components/PaymentGate';

const surgeryReadinessQuiz: QuizConfig = {
  title: 'Surgery Readiness Assessment',
  questions: [
    {
      id: 'surgery-type',
      question: 'What type of surgery are you preparing for?',
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
    {
      id: 'health-optimization',
      question: 'How are you currently preparing for surgery?',
      multiSelect: true,
      options: [
        { id: 'exercise-routine', label: 'Following an exercise routine' },
        { id: 'diet-improvement', label: 'Improving my diet' },
        { id: 'smoking-cessation', label: 'Stopped or reducing smoking' },
        { id: 'alcohol-reduction', label: 'Reducing alcohol consumption' },
        { id: 'sleep-optimization', label: 'Optimizing sleep habits' },
        { id: 'stress-management', label: 'Managing stress levels' },
        { id: 'supplement-protocol', label: 'Taking recommended supplements' },
        { id: 'none-yet', label: 'Haven\'t started preparation yet' },
      ],
    },
    {
      id: 'medical-history',
      question: 'Do you have any of the following conditions?',
      multiSelect: true,
      options: [
        { id: 'diabetes', label: 'Diabetes' },
        { id: 'heart-disease', label: 'Heart Disease' },
        { id: 'high-blood-pressure', label: 'High Blood Pressure' },
        { id: 'lung-disease', label: 'Lung Disease (COPD, Asthma)' },
        { id: 'kidney-disease', label: 'Kidney Disease' },
        { id: 'liver-disease', label: 'Liver Disease' },
        { id: 'autoimmune', label: 'Autoimmune Disorders' },
        { id: 'obesity', label: 'Obesity (BMI >30)' },
        { id: 'none', label: 'None of the above' },
      ],
    },
  ],
};

// Helper function to convert answer IDs to labels
const convertAnswersToLabels = (answers: Record<string, any>) => {
  const convertedAnswers: Array<{ question: string; answer: string }> = [];

  surgeryReadinessQuiz.questions.forEach((q) => {
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
        q.options.find((o) => o.id === selectedId)?.label || selectedId || "";
    }

    convertedAnswers.push({ question: q.question, answer: labels });
  });

  return convertedAnswers;
};

export function Questions_3() {
  // Initialize analytics for this specific assessment
  const { startAssessment, trackProgress, completeAssessment } = useAssessmentAnalytics(
    '1',
    'Surgery Readiness Score',
    37.00
  );

  // Enhanced quiz configuration with sessionStorage mechanism
  const surgeryReadinessQuizWithAnalytics: QuizConfig = {
    ...surgeryReadinessQuiz,
    informationPageRoute: 'surgery-readiness-information-three',
    onComplete: async (answers) => {
      console.log("Surgery Readiness Assessment completed:", answers);

      // Store converted answers in sessionStorage (same as anaesthesia flow)
      sessionStorage.setItem(
        "pendingAnswers",
        JSON.stringify(convertAnswersToLabels(answers))
      );

      // Complete analytics tracking
      completeAssessment();

      // Navigate to information page
      window.location.hash = "surgery-readiness-information-three";
    },
    onQuestionComplete: (questionIndex, totalQuestions) => {
      const completionPercentage = Math.round(((questionIndex + 1) / totalQuestions) * 100);
      trackProgress(`question_${questionIndex + 1}`, completionPercentage);
    },
    onBack: () => {
      window.location.hash = "surgery-readiness-assessment-learn-more";
    },
  };

  // Start assessment tracking when component mounts
  React.useEffect(() => {
    // ✅ STEP 1: Track that user is in Variant C
    sessionStorage.setItem("surgery_variant", "C");
    console.log("🎯 Variant C selected");

    startAssessment();
  }, [startAssessment]);
  return <QuizTemplate config={surgeryReadinessQuizWithAnalytics} />;

}