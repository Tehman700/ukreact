import React from "react";
import { QuizTemplate, QuizConfig } from "../components/QuizTemplate";
import { PaymentGate } from "../components/PaymentGate";

// ----------------------
// Quiz Config
// ----------------------
const mobilityStrengthQuiz: QuizConfig = {
  title: "Mobility & Strength Score",
  questions: [
    {
      id: "walking-ability",
      question:
        "How far can you walk without stopping or experiencing significant discomfort?",
      subtitle:
        "Walking endurance is a key indicator of cardiovascular fitness and lower body strength",
      options: [
        { id: "over-mile", label: "More than 1 mile", description: "I can walk long distances without difficulty" },
        { id: "half-to-one-mile", label: "0.5 - 1 mile", description: "I can walk moderate distances comfortably" },
        { id: "quarter-to-half-mile", label: "0.25 - 0.5 miles", description: "I can walk short to moderate distances" },
        { id: "under-quarter-mile", label: "Less than 0.25 miles", description: "I have limited walking endurance" },
        { id: "very-limited", label: "Very limited walking", description: "I can only walk very short distances" },
      ],
    },
    {
      id: "stair-climbing",
      question: "How easily can you climb a flight of stairs (10-15 steps)?",
      subtitle: "Stair climbing ability indicates leg strength and cardiovascular fitness",
      options: [
        { id: "easily-multiple", label: "Easily climb multiple flights", description: "No difficulty with stairs" },
        { id: "easily-one", label: "Easily climb one flight", description: "Minor breathlessness at top" },
        { id: "moderate-difficulty", label: "Moderate difficulty", description: "Need to rest or hold handrail" },
        { id: "significant-difficulty", label: "Significant difficulty", description: "Very breathless, must rest partway" },
        { id: "cannot-climb", label: "Cannot climb stairs", description: "Unable to climb stairs independently" },
      ],
    },
    {
      id: "sit-to-stand",
      question:
        "How many times can you stand up from a chair without using your arms in 30 seconds?",
      subtitle: "This test measures lower body strength and functional mobility",
      options: [
        { id: "over-15", label: "15 or more times", description: "Excellent lower body strength" },
        { id: "12-14", label: "12-14 times", description: "Good lower body strength" },
        { id: "10-11", label: "10-11 times", description: "Average lower body strength" },
        { id: "8-9", label: "8-9 times", description: "Below average strength" },
        { id: "under-8", label: "Less than 8 times", description: "Poor lower body strength" },
        { id: "cannot-perform", label: "Cannot perform without arms", description: "Need arms to stand up" },
      ],
    },
    {
      id: "balance-stability",
      question: "How would you rate your balance and stability?",
      subtitle: "Good balance reduces fall risk and indicates core strength",
      options: [
        { id: "excellent", label: "Excellent", description: "Can stand on one foot >30 seconds, never feel unsteady" },
        { id: "good", label: "Good", description: "Occasionally feel unsteady but recover quickly" },
        { id: "fair", label: "Fair", description: "Sometimes feel unsteady, need to hold onto things" },
        { id: "poor", label: "Poor", description: "Often feel unsteady, avoid challenging positions" },
        { id: "very-poor", label: "Very Poor", description: "Frequent balance problems, fear of falling" },
      ],
    },
    {
      id: "grip-strength",
      question: "How would you describe your grip strength?",
      subtitle:
        "Grip strength correlates with overall body strength and health",
      options: [
        { id: "very-strong", label: "Very Strong", description: "Can easily open jars, carry heavy bags" },
        { id: "strong", label: "Strong", description: "Generally good grip, occasional difficulty with tight lids" },
        { id: "moderate", label: "Moderate", description: "Sometimes need help opening things" },
        { id: "weak", label: "Weak", description: "Frequently need help with jars, bottles, etc." },
        { id: "very-weak", label: "Very Weak", description: "Significant difficulty with grip-related tasks" },
      ],
    },
    {
      id: "daily-activities",
      question: "How independently can you perform daily activities?",
      subtitle:
        "Functional independence indicates overall physical capacity",
      multiSelect: true,
      options: [
        { id: "bathing", label: "Bathing/showering independently" },
        { id: "dressing", label: "Dressing without assistance" },
        { id: "cooking", label: "Preparing meals" },
        { id: "shopping", label: "Grocery shopping" },
        { id: "housework", label: "Light housework" },
        { id: "gardening", label: "Gardening or yard work" },
        { id: "driving", label: "Driving safely" },
        { id: "need-help", label: "Need help with most activities" },
      ],
    },
    {
      id: "pain-stiffness",
      question: "How much do pain or stiffness limit your movement?",
      subtitle:
        "Pain and stiffness can significantly impact recovery and rehabilitation",
      options: [
        { id: "no-limitation", label: "No Limitation", description: "Pain/stiffness doesn't affect my activities" },
        { id: "mild-limitation", label: "Mild Limitation", description: "Occasional discomfort but doesn't stop activities" },
        { id: "moderate-limitation", label: "Moderate Limitation", description: "Sometimes avoid activities due to pain/stiffness" },
        { id: "significant-limitation", label: "Significant Limitation", description: "Pain/stiffness frequently limits activities" },
        { id: "severe-limitation", label: "Severe Limitation", description: "Pain/stiffness severely restricts movement" },
      ],
    },
    {
      id: "exercise-frequency",
      question: "How often do you engage in physical exercise or activity?",
      subtitle:
        "Regular activity indicates better baseline fitness for recovery",
      options: [
        { id: "daily", label: "Daily", description: "I exercise or stay active every day" },
        { id: "most-days", label: "Most days (5-6 times/week)", description: "Very regular exercise routine" },
        { id: "several-times", label: "Several times per week (3-4)", description: "Regular but not daily exercise" },
        { id: "occasionally", label: "Occasionally (1-2 times/week)", description: "Some regular activity" },
        { id: "rarely", label: "Rarely", description: "Minimal structured exercise" },
        { id: "never", label: "Never", description: "No regular physical activity" },
      ],
    },
  ],
};

// ----------------------
// Convert answers to labels
// ----------------------
const convertAnswersToLabels = (answers: Record<string, any>) => {
  const converted: Array<{ question: string; answer: string }> = [];
  mobilityStrengthQuiz.questions.forEach((q) => {
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

    converted.push({ question: q.question, answer: labels });
  });
  return converted;
};

// ----------------------
// Page Component
// ----------------------
export function MobilityStrengthQuestionsPage() {
  const quizWithSubmit: QuizConfig = {
    ...mobilityStrengthQuiz,
    informationPageRoute: "mobility-strength-score-results",
    onComplete: async (answers) => {
      console.log("Mobility & Strength Assessment completed:", answers);
      sessionStorage.setItem(
        "pendingAnswers",
        JSON.stringify(convertAnswersToLabels(answers))
      );
      window.location.hash = "mobility-strength-score-information"; // go to info page
    },
    onBack: () => {
      window.location.hash = "mobility-strength-score-learn-more";
    },
  };

  return (
    <PaymentGate requiredFunnel="mobility">
      <QuizTemplate config={quizWithSubmit} />
    </PaymentGate>
  );
}
