import React from 'react';
import { QuizTemplate, QuizConfig } from '../components/QuizTemplate';
import { PaymentGate } from '../components/PaymentGate'; // <-- import the gate

const functionalFitnessAgeQuiz: QuizConfig = {
  title: 'Functional Fitness Age Test',
  onComplete: () => {
    window.location.hash = 'functional-fitness-age-test-information';
  },
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
      id: 'movement-limitations',
      question: 'Do you experience any of these movement limitations?',
      multiSelect: true,
      options: [
        { id: 'stair-climbing', label: 'Difficulty climbing stairs', description: 'Need handrail support or feel winded' },
        { id: 'getting-up', label: 'Trouble getting up from chairs', description: 'Need to use arms to push up from seated position' },
        { id: 'balance-issues', label: 'Balance problems', description: 'Feel unsteady or need support when standing on one foot' },
        { id: 'joint-stiffness', label: 'Joint stiffness or reduced range of motion', description: 'Difficulty reaching overhead or touching toes' },
        { id: 'back-pain', label: 'Lower back pain with movement', description: 'Pain when bending, lifting, or prolonged standing' },
        { id: 'no-limitations', label: 'No significant limitations', description: 'Move freely without notable restrictions' },
      ],
    },
    {
      id: 'current-exercise-routine',
      question: 'How would you describe your current exercise routine?',
      options: [
        { id: 'high-intensity', label: 'High-intensity training', description: '5+ sessions per week, includes strength and cardio' },
        { id: 'regular-structured', label: 'Regular structured exercise', description: '3-4 sessions per week with variety' },
        { id: 'moderate-consistent', label: 'Moderate consistent activity', description: '2-3 sessions per week, mostly cardio or sports' },
        { id: 'occasional-light', label: 'Occasional light exercise', description: 'Weekly walks, occasional gym visits' },
        { id: 'sedentary', label: 'Mostly sedentary', description: 'Minimal structured physical activity' },
      ],
    },
    {
      id: 'strength-capabilities',
      question: 'How would you rate your current strength capabilities?',
      options: [
        { id: 'excellent-strength', label: 'Excellent strength', description: 'Can lift heavy objects, do push-ups and pull-ups easily' },
        { id: 'good-strength', label: 'Good strength', description: 'Handle most daily tasks, some gym exercises challenging' },
        { id: 'adequate-strength', label: 'Adequate strength', description: 'Manage daily activities but avoid heavy lifting' },
        { id: 'declining-strength', label: 'Declining strength', description: 'Notice weakness, difficulty with stairs and lifting' },
        { id: 'poor-strength', label: 'Poor strength', description: 'Struggle with basic tasks like opening jars or carrying groceries' },
      ],
    },
    {
      id: 'flexibility-mobility',
      question: 'How is your flexibility and mobility?',
      options: [
        { id: 'very-flexible', label: 'Very flexible', description: 'Can touch toes easily, good range of motion in all joints' },
        { id: 'moderately-flexible', label: 'Moderately flexible', description: 'Some tightness but generally mobile' },
        { id: 'limited-flexibility', label: 'Limited flexibility', description: 'Noticeable stiffness, especially in morning' },
        { id: 'very-stiff', label: 'Very stiff', description: 'Significant restrictions in movement and range of motion' },
        { id: 'extremely-limited', label: 'Extremely limited', description: 'Severe mobility restrictions affecting daily activities' },
      ],
    },
    {
      id: 'balance-coordination',
      question: 'How is your balance and coordination?',
      options: [
        { id: 'excellent-balance', label: 'Excellent balance', description: 'Can stand on one foot easily, good coordination' },
        { id: 'good-balance', label: 'Good balance', description: 'Generally stable with occasional minor wobbles' },
        { id: 'fair-balance', label: 'Fair balance', description: 'Some unsteadiness, especially on uneven surfaces' },
        { id: 'poor-balance', label: 'Poor balance', description: 'Frequently feel unsteady, need support' },
        { id: 'very-poor-balance', label: 'Very poor balance', description: 'Significant balance issues, fear of falling' },
      ],
    },
    {
      id: 'endurance-stamina',
      question: 'How is your cardiovascular endurance and stamina?',
      options: [
        { id: 'excellent-endurance', label: 'Excellent endurance', description: 'Can sustain vigorous activity for extended periods' },
        { id: 'good-endurance', label: 'Good endurance', description: 'Handle moderate activity well, some fatigue with intensity' },
        { id: 'fair-endurance', label: 'Fair endurance', description: 'Get winded with moderate exertion like climbing stairs' },
        { id: 'poor-endurance', label: 'Poor endurance', description: 'Short of breath with light activity' },
        { id: 'very-poor-endurance', label: 'Very poor endurance', description: 'Exhausted by minimal physical activity' },
      ],
    },
    {
      id: 'daily-activity-level',
      question: 'How active are you in your daily life outside of structured exercise?',
      options: [
        { id: 'very-active', label: 'Very active', description: 'Walk or bike for transport, take stairs, stand frequently' },
        { id: 'moderately-active', label: 'Moderately active', description: 'Some walking, occasional active tasks' },
        { id: 'somewhat-active', label: 'Somewhat active', description: 'Mostly sedentary with brief periods of activity' },
        { id: 'inactive', label: 'Inactive', description: 'Primarily sitting or lying down most of the day' },
        { id: 'very-inactive', label: 'Very inactive', description: 'Minimal movement even for basic tasks' },
      ],
    },
    {
      id: 'pain-discomfort',
      question: 'Do you experience pain or discomfort during physical activity?',
      options: [
        { id: 'no-pain', label: 'No pain or discomfort', description: 'Can exercise and move freely without pain' },
        { id: 'minor-discomfort', label: 'Minor discomfort', description: 'Slight stiffness or soreness that doesn\'t limit activity' },
        { id: 'moderate-pain', label: 'Moderate pain', description: 'Some pain that affects exercise intensity or duration' },
        { id: 'significant-pain', label: 'Significant pain', description: 'Pain that limits many physical activities' },
        { id: 'severe-pain', label: 'Severe chronic pain', description: 'Constant pain that severely restricts movement' },
      ],
    },
    {
      id: 'recovery-time',
      question: 'How long does it take you to recover from physical exertion?',
      options: [
        { id: 'quick-recovery', label: 'Quick recovery', description: 'Feel normal within minutes after exercise' },
        { id: 'normal-recovery', label: 'Normal recovery', description: 'Recover within an hour of moderate activity' },
        { id: 'slow-recovery', label: 'Slow recovery', description: 'Need several hours to feel normal after exertion' },
        { id: 'very-slow-recovery', label: 'Very slow recovery', description: 'Feel tired for a day or more after activity' },
        { id: 'poor-recovery', label: 'Poor recovery', description: 'Exhaustion lasts for days after mild exertion' },
      ],
    },
    {
      id: 'functional-movements',
      question: 'How easily can you perform these functional movements?',
      options: [
        { id: 'all-easy', label: 'All movements are easy', description: 'Can squat, lunge, reach overhead, and carry objects effortlessly' },
        { id: 'most-manageable', label: 'Most movements manageable', description: 'Some difficulty with deep squats or overhead reaching' },
        { id: 'several-challenging', label: 'Several movements challenging', description: 'Clear limitations in squatting, lunging, or lifting' },
        { id: 'many-difficult', label: 'Many movements difficult', description: 'Struggle with basic functional movements' },
        { id: 'most-impossible', label: 'Most movements very difficult', description: 'Unable to perform many basic movement patterns' },
      ],
    },
    {
      id: 'fitness-decline',
      question: 'Have you noticed a decline in your physical capabilities over the past 2-3 years?',
      options: [
        { id: 'improved', label: 'Actually improved', description: 'Gotten stronger, more flexible, or more fit' },
        { id: 'maintained', label: 'Maintained same level', description: 'Physical capabilities remain consistent' },
        { id: 'slight-decline', label: 'Slight decline', description: 'Some reduction in strength, flexibility, or endurance' },
        { id: 'noticeable-decline', label: 'Noticeable decline', description: 'Clear reduction in multiple physical capabilities' },
        { id: 'significant-decline', label: 'Significant decline', description: 'Major loss of physical function and capabilities' },
      ],
    },
  ],
};

export function FunctionalFitnessAgeQuestionsPage() {
    return (
    <PaymentGate requiredFunnel="functional">
      <QuizTemplate config={functionalFitnessAgeQuiz} />
    </PaymentGate>
  );
}