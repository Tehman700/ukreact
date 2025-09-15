import React from 'react';
import { QuizTemplate, QuizConfig } from '../components/QuizTemplate';
import { useAssessmentAnalytics } from '../hooks/useAnalytics';

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

export function SurgeryReadinessQuestionsPage() {
  // Initialize analytics for this specific assessment
  const { startAssessment, trackProgress, completeAssessment } = useAssessmentAnalytics(
    '1',
    'Surgery Readiness Score',
    37.00
  );

  // Helper function to convert answer IDs to labels
  const convertAnswersToLabels = (answers: Record<string, any>) => {
    const convertedAnswers: Array<{ question: string; answer: string }> = [];

    Object.entries(answers).forEach(([questionId, answerValue]) => {
      // Find the question by ID
      const question = surgeryReadinessQuiz.questions.find(q => q.id === questionId);
      if (!question) return;

      let answerLabels: string;

      if (question.multiSelect && Array.isArray(answerValue)) {
        // Handle multi-select questions
        const labels = answerValue.map(answerId => {
          const option = question.options.find(opt => opt.id === answerId);
          return option ? option.label : answerId;
        });
        answerLabels = labels.join(', ');
      } else {
        // Handle single-select questions
        const selectedAnswerId = Array.isArray(answerValue) ? answerValue[0] : answerValue;
        const option = question.options.find(opt => opt.id === selectedAnswerId);
        answerLabels = option ? option.label : selectedAnswerId || '';
      }

      convertedAnswers.push({
        question: question.question,
        answer: answerLabels
      });
    });

    return convertedAnswers;
  };

  // Enhanced quiz configuration with analytics tracking
  const surgeryReadinessQuizWithAnalytics: QuizConfig = {
    ...surgeryReadinessQuiz,
    informationPageRoute: 'surgery-readiness-assessment-information',
    onComplete: async (answers) => {
      console.log("Surgery Readiness Assessment completed with answers:", answers);

      const user = JSON.parse(sessionStorage.getItem("currentUser") || "{}");

      try {
        // Convert answers to use question text and answer labels
        const convertedAnswers = convertAnswersToLabels(answers);

        await fetch("https://luther.health/api/assessments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.id,
            assessment_type: "Surgery Readiness",
            answers: convertedAnswers,
          }),
        });

        // ✅ Analytics + navigation
        completeAssessment();
        window.location.hash = "surgery-readiness-assessment-information";
      } catch (err) {
        console.error("Error saving assessment:", err);
      }
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

  return <QuizTemplate config={surgeryReadinessQuizWithAnalytics} />;
}