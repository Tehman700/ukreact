import React from 'react';
import { QuizTemplate, QuizConfig } from '../components/QuizTemplate';
import { PaymentGate } from '../components/PaymentGate';

const nutritionBodyCompositionQuiz: QuizConfig = {
  title: 'Nutrition & Body Composition Score',
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
      id: 'body-composition-goals',
      question: 'What are your primary body composition goals?',
      multiSelect: true,
      options: [
        { id: 'lose-fat', label: 'Lose body fat', description: 'Reduce overall body fat percentage' },
        { id: 'build-muscle', label: 'Build lean muscle mass', description: 'Increase muscle mass and strength' },
        { id: 'improve-definition', label: 'Improve muscle definition', description: 'Enhance muscle tone and visibility' },
        { id: 'weight-maintenance', label: 'Maintain current weight', description: 'Stay at current weight while improving composition' },
        { id: 'athletic-performance', label: 'Enhance athletic performance', description: 'Optimize body composition for sport' },
        { id: 'general-health', label: 'General health improvement', description: 'Overall health and wellness goals' },
      ],
    },
    {
      id: 'current-body-composition',
      question: 'How would you describe your current body composition?',
      options: [
        { id: 'lean-athletic', label: 'Lean and athletic', description: 'Low body fat, visible muscle definition, athletic build' },
        { id: 'healthy-weight', label: 'Healthy weight with some muscle', description: 'Normal BMI with moderate muscle tone' },
        { id: 'average-composition', label: 'Average body composition', description: 'Typical weight for height, moderate fat and muscle' },
        { id: 'excess-fat', label: 'Excess body fat', description: 'Higher body fat percentage, limited muscle definition' },
        { id: 'skinny-fat', label: 'Normal weight but high body fat', description: 'Appear slim but lack muscle mass' },
      ],
    },
    {
      id: 'dietary-pattern',
      question: 'Which best describes your typical eating pattern?',
      options: [
        { id: 'structured-macro-tracking', label: 'Structured macro tracking', description: 'Track calories, protein, carbs, and fats systematically' },
        { id: 'whole-foods-focused', label: 'Whole foods focused', description: 'Emphasize unprocessed, nutrient-dense foods' },
        { id: 'intermittent-fasting', label: 'Intermittent fasting protocol', description: 'Follow specific eating windows or fasting periods' },
        { id: 'flexible-balanced', label: 'Flexible but balanced', description: 'Generally healthy with occasional indulgences' },
        { id: 'inconsistent-erratic', label: 'Inconsistent and erratic', description: 'Irregular eating patterns, frequent processed foods' },
      ],
    },
    {
      id: 'protein-intake',
      question: 'How much protein do you typically consume daily?',
      options: [
        { id: 'high-protein', label: '1.2g+ per kg body weight', description: 'High protein intake for muscle building/maintenance' },
        { id: 'moderate-protein', label: '0.8-1.2g per kg body weight', description: 'Moderate protein intake meeting basic needs' },
        { id: 'low-protein', label: '0.5-0.8g per kg body weight', description: 'Lower protein intake, mostly plant sources' },
        { id: 'very-low-protein', label: 'Less than 0.5g per kg', description: 'Minimal protein intake, inadequate for most goals' },
        { id: 'unknown-protein', label: 'I don\'t track protein intake', description: 'Unaware of daily protein consumption' },
      ],
    },
    {
      id: 'exercise-routine',
      question: 'What is your current exercise routine?',
      options: [
        { id: 'strength-cardio-combo', label: 'Strength training + cardio', description: '4+ sessions per week, structured program' },
        { id: 'mainly-strength', label: 'Primarily strength training', description: 'Weight lifting 3+ times per week' },
        { id: 'mainly-cardio', label: 'Primarily cardiovascular exercise', description: 'Running, cycling, or cardio-focused activities' },
        { id: 'recreational-exercise', label: 'Recreational activities', description: 'Sports, hiking, yoga, or casual fitness' },
        { id: 'minimal-exercise', label: 'Minimal or no structured exercise', description: 'Sedentary lifestyle with little physical activity' },
      ],
    },
    {
      id: 'meal-timing',
      question: 'How would you describe your meal timing and frequency?',
      options: [
        { id: 'planned-frequent', label: 'Planned frequent meals', description: '5-6 small meals throughout the day' },
        { id: 'traditional-three', label: 'Traditional three meals', description: 'Breakfast, lunch, dinner with occasional snacks' },
        { id: 'two-main-meals', label: 'Two main meals', description: 'Skip breakfast or dinner, eat twice daily' },
        { id: 'grazing-pattern', label: 'Constant grazing', description: 'Frequent snacking throughout the day' },
        { id: 'irregular-timing', label: 'Irregular meal timing', description: 'Inconsistent eating schedule, often skip meals' },
      ],
    },
    {
      id: 'hydration-habits',
      question: 'How much water do you typically drink per day?',
      options: [
        { id: 'optimal-hydration', label: '3+ litres per day', description: 'Consistently well-hydrated throughout the day' },
        { id: 'adequate-hydration', label: '2-3 litres per day', description: 'Meet basic hydration needs most days' },
        { id: 'moderate-hydration', label: '1-2 litres per day', description: 'Some water intake but likely insufficient' },
        { id: 'poor-hydration', label: 'Less than 1 litre per day', description: 'Minimal water intake, often dehydrated' },
        { id: 'unknown-hydration', label: 'I don\'t track water intake', description: 'Unaware of daily hydration levels' },
      ],
    },
    {
      id: 'supplement-usage',
      question: 'What supplements do you currently take?',
      multiSelect: true,
      options: [
        { id: 'protein-powder', label: 'Protein powder', description: 'Whey, casein, or plant-based protein supplements' },
        { id: 'creatine', label: 'Creatine', description: 'Creatine monohydrate for strength and muscle building' },
        { id: 'multivitamin', label: 'Multivitamin/mineral', description: 'General vitamin and mineral supplementation' },
        { id: 'omega-3', label: 'Omega-3 fatty acids', description: 'Fish oil or algae-based omega-3 supplements' },
        { id: 'vitamin-d', label: 'Vitamin D', description: 'Vitamin D3 supplementation' },
        { id: 'pre-workout', label: 'Pre-workout formulas', description: 'Caffeine and performance-enhancing supplements' },
        { id: 'no-supplements', label: 'No supplements', description: 'Do not use any nutritional supplements' },
      ],
    },
    {
      id: 'energy-levels',
      question: 'How are your energy levels throughout the day?',
      options: [
        { id: 'consistent-high', label: 'Consistently high energy', description: 'Steady energy from morning to evening' },
        { id: 'good-with-dips', label: 'Generally good with minor dips', description: 'Mostly energetic with slight afternoon fatigue' },
        { id: 'moderate-fluctuations', label: 'Moderate energy fluctuations', description: 'Noticeable ups and downs throughout the day' },
        { id: 'frequent-crashes', label: 'Frequent energy crashes', description: 'Regular periods of fatigue and low energy' },
        { id: 'chronically-fatigued', label: 'Chronically low energy', description: 'Consistently tired regardless of sleep' },
      ],
    },
    {
      id: 'digestive-health',
      question: 'How would you rate your digestive health?',
      options: [
        { id: 'excellent-digestion', label: 'Excellent', description: 'No digestive issues, regular bowel movements' },
        { id: 'good-digestion', label: 'Good', description: 'Occasional minor digestive discomfort' },
        { id: 'fair-digestion', label: 'Fair', description: 'Regular digestive issues like bloating or irregularity' },
        { id: 'poor-digestion', label: 'Poor', description: 'Frequent digestive problems affecting daily life' },
        { id: 'very-poor-digestion', label: 'Very poor', description: 'Chronic digestive issues requiring medical attention' },
      ],
    },
    {
      id: 'sleep-nutrition-impact',
      question: 'How does your sleep quality affect your nutrition choices?',
      options: [
        { id: 'no-impact', label: 'No noticeable impact', description: 'Sleep quality doesn\'t affect food choices' },
        { id: 'slight-impact', label: 'Slight impact on cravings', description: 'Occasional changes in appetite when tired' },
        { id: 'moderate-impact', label: 'Moderate impact on eating', description: 'Poor sleep leads to increased snacking' },
        { id: 'significant-impact', label: 'Significant impact on food choices', description: 'Sleep deprivation causes poor food decisions' },
        { id: 'major-impact', label: 'Major impact on nutrition', description: 'Sleep problems severely disrupt eating patterns' },
      ],
    },
  ],
};

export function NutritionBodyCompositionQuestionsPage() {
  const convertAnswersToLabels = (answers: Record<string, any>) => {
    const converted: Array<{ question: string; answer: string }> = [];
    nutritionBodyCompositionQuiz.questions.forEach((q) => {
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
    ...nutritionBodyCompositionQuiz,
    informationPageRoute: "nutrition-body-composition-score-results",
    onComplete: async (answers) => {
      console.log("Nutrition & Body Composition Assessment completed:", answers);
      sessionStorage.setItem("pendingAnswers", JSON.stringify(convertAnswersToLabels(answers)));
      window.location.hash = "nutrition-body-composition-score-information";
    },
    onBack: () => {
      window.location.hash = "nutrition-body-composition-score-learn-more";
    },
  };

  return (
    <PaymentGate requiredFunnel="nutrition">
      <QuizTemplate config={quizWithSubmit} />
    </PaymentGate>
  );
}