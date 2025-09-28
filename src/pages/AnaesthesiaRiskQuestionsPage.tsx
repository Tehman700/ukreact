import React from "react";
import { QuizTemplate, QuizConfig } from "../components/QuizTemplate";
import { PaymentGate } from '../components/PaymentGate'; // <-- import the gate


// Anaesthesia Quiz Config
const anaesthesiaRiskQuiz: QuizConfig = {
  title: "Anaesthesia Risk Screener",
  questions: [
    {
      id: "sleep-patterns",
      question: "How would you describe your sleep patterns?",
      subtitle: "Sleep disorders can significantly impact anaesthesia safety",
      multiSelect: true,
      options: [
        { id: "loud-snoring", label: "Loud snoring that disturbs others" },
        { id: "breathing-stops", label: "Partner notices breathing stops during sleep" },
        { id: "gasping", label: "Waking up gasping or choking" },
        { id: "morning-headaches", label: "Frequent morning headaches" },
        { id: "daytime-fatigue", label: "Excessive daytime sleepiness" },
        { id: "diagnosed-sleep-apnea", label: "Diagnosed with sleep apnoea" },
        { id: "cpap-user", label: "Use CPAP or similar device" },
        { id: "no-sleep-issues", label: "No sleep-related issues" },
      ],
    },
    {
      id: "current-medications",
      question: "Which medications are you currently taking?",
      subtitle: "Some medications can interact with anaesthetic drugs",
      multiSelect: true,
      options: [
        { id: "heart-medications", label: "Heart medications (beta-blockers, ACE inhibitors)" },
        { id: "blood-pressure", label: "Blood pressure medications" },
        { id: "diabetes-meds", label: "Diabetes medications" },
        { id: "blood-thinners", label: "Blood thinners (Warfarin, Rivaroxaban, etc.)" },
        { id: "antidepressants", label: "Antidepressants or anxiety medications" },
        { id: "seizure-meds", label: "Seizure medications" },
        { id: "pain-medications", label: "Regular pain medications or opioids" },
        { id: "herbal-supplements", label: "Herbal supplements or alternative medicines" },
        { id: "no-medications", label: "No regular medications" },
      ],
    },
    {
      id: "alcohol-consumption",
      question: "How would you describe your alcohol consumption?",
      subtitle: "Alcohol affects how your body processes anaesthetic drugs",
      options: [
        { id: "none", label: "I don't drink alcohol", description: "No alcohol consumption" },
        { id: "light", label: "Light Drinker", description: "1-7 units per week (1-3 drinks)" },
        { id: "moderate", label: "Moderate Drinker", description: "8-14 units per week (4-7 drinks)" },
        { id: "heavy", label: "Heavy Drinker", description: "15-21 units per week (8-10 drinks)" },
        { id: "very-heavy", label: "Very Heavy Drinker", description: "More than 21 units per week (10+ drinks)" },
      ],
    },
    {
      id: "substance-use",
      question: "Do you use any of the following substances?",
      subtitle: "These substances can affect anaesthesia safety and dosing",
      multiSelect: true,
      options: [
        { id: "tobacco-current", label: "Current tobacco smoker" },
        { id: "tobacco-recent", label: "Quit smoking within the last year" },
        { id: "vaping", label: "Vaping or e-cigarettes" },
        { id: "marijuana", label: "Recreational marijuana use" },
        { id: "other-drugs", label: "Other recreational drugs" },
        { id: "none", label: "None of the above" },
      ],
    },
    {
      id: "previous-anaesthesia",
      question: "Have you had anaesthesia before?",
      subtitle: "Previous experiences help predict potential complications",
      options: [
        { id: "never", label: "Never had anaesthesia", description: "This would be my first time" },
        { id: "good-experience", label: "Yes, good experience", description: "No problems with previous anaesthesia" },
        { id: "minor-issues", label: "Yes, minor issues", description: "Nausea, grogginess, or slow wake-up" },
        { id: "major-issues", label: "Yes, major complications", description: "Serious breathing, heart, or other problems" },
        { id: "family-history", label: "Family history of problems", description: "Family members had anaesthesia complications" },
      ],
    },
    {
      id: "allergies-reactions",
      question: "Do you have any known allergies or adverse reactions?",
      subtitle: "Allergic reactions during surgery can be life-threatening",
      multiSelect: true,
      options: [
        { id: "drug-allergies", label: "Drug allergies (antibiotics, painkillers, etc.)" },
        { id: "latex-allergy", label: "Latex allergy" },
        { id: "food-allergies", label: "Severe food allergies" },
        { id: "environmental", label: "Environmental allergies (severe)" },
        { id: "anaesthetic-allergy", label: "Known anaesthetic drug allergies" },
        { id: "contrast-allergy", label: "X-ray contrast dye allergies" },
        { id: "no-allergies", label: "No known allergies" },
      ],
    },
    {
      id: "airway-concerns",
      question: "Do you have any airway or breathing concerns?",
      subtitle: "Airway management is crucial for safe anaesthesia",
      multiSelect: true,
      options: [
        { id: "difficult-intubation", label: "Previous difficult intubation (hard to insert breathing tube)" },
        { id: "small-mouth", label: "Small mouth opening or jaw problems" },
        { id: "large-tongue", label: "Large tongue or thick neck" },
        { id: "dental-issues", label: "Loose teeth or significant dental work" },
        { id: "throat-surgery", label: "Previous throat or neck surgery" },
        { id: "breathing-problems", label: "Chronic breathing problems (asthma, COPD)" },
        { id: "no-concerns", label: "No airway concerns" },
      ],
    },
    {
      id: "eating-drinking",
      question: "When did you last eat or drink?",
      subtitle: "Recent food/drink intake affects anaesthesia safety",
      options: [
        { id: "over-8-hours", label: "More than 8 hours ago" },
        { id: "6-8-hours", label: "6-8 hours ago" },
        { id: "4-6-hours", label: "4-6 hours ago" },
        { id: "2-4-hours", label: "2-4 hours ago" },
        { id: "within-2-hours", label: "Within the last 2 hours" },
        { id: "not-applicable", label: "Not applicable - surgery not scheduled yet" },
      ],
    },
  ],
};

// Convert answers like in Complication
const convertAnswersToLabels = (answers: Record<string, any>) => {
  const converted: Array<{ question: string; answer: string }> = [];
  anaesthesiaRiskQuiz.questions.forEach((q) => {
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

export function AnaesthesiaRiskQuestionsPage() {
  const quizWithSubmit: QuizConfig = {
    ...anaesthesiaRiskQuiz,
    informationPageRoute: "anaesthesia-risk-screener-results",
    onComplete: async (answers) => {
      console.log("Anaesthesia Risk Assessment completed:", answers);
      sessionStorage.setItem(
        "pendingAnswers",
        JSON.stringify(convertAnswersToLabels(answers))
      );
      window.location.hash = "anaesthesia-risk-screener-information"; // go to info page
    },
    onBack: () => {
      window.location.hash = "anaesthesia-risk-screener-learn-more";
    },
  };

  return (
    <PaymentGate requiredFunnel="anesthesia">
      <QuizTemplate config={quizWithSubmit} />
    </PaymentGate>
  );
}