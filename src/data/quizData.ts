import { QuizQuestion } from "../types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "slider",
    title: "How old are you?",
    subtitle: "Age",
    unit: "years",
    min: 30,
    max: 95,
    validation: {
      min: 30,
      max: 95,
    },
  },
  {
    id: 2,
    type: "single",
    title: "What type of surgery are you preparing for?",
    subtitle: "Type of surgery",
    options: [
      {
        id: "orthopaedic",
        label: "Orthopaedic surgery",
        description: "Knee, hip, or spinal surgery",
        value: "orthopaedic",
      },
      {
        id: "cardiac",
        label: "Cardiac surgery",
        description: "Heart bypass, valve surgery, or other open heart procedures",
        value: "cardiac",
      },
      {
        id: "abdominal",
        label: "Abdominal surgery",
        description: "Aneurysm repair, hernia repair, bowel or other abdominal surgery",
        value: "abdominal",
      },
    ],
  },
  {
    id: 3,
    type: "single",
    title: "When is your surgery scheduled?",
    subtitle: "Time until surgery",
    options: [
      {
        id: "less-1",
        label: "Less than 1 month",
        value: "<1",
      },
      {
        id: "1-3",
        label: "Between 1 and 3 months",
        value: "1-3",
      },
      {
        id: "more-3",
        label: "More than 3 months away",
        value: ">3",
      },
      {
        id: "not-scheduled",
        label: "Not scheduled yet",
        value: ">3+",
        description:"(“Not scheduled yet” is treated as “>3 months” internally but feels more natural to users.)"
      },
    ],
  },
  {
    id: 4,
    type: "single",
    title: "Which best describes your current body weight?",
    subtitle: "Body weight (BMI selector)",
    options: [
      {
        id: "underweight",
        label: "Underweight",
        value: "underweight",
      },
      {
        id: "normal",
        label: "Normal weight",
        value: "normal",
      },
      {
        id: "overweight",
        label: "Overweight",
        value: "overweight",
      },
      {
        id: "obese",
        label: "Obese",
        value: "obese",
      },
      {
        id: "very-overweight",
        label: "Very overweight",
        value: "very-overweight",
      },
    ],
  },
  {
    id: 5,
    type: "single",
    title: "Do you currently take medication for any of the following?",
    subtitle: "Medications & medical conditions",
    helperText: "Select all that apply",
    options: [
      {
        id: "high-bp",
        label: "High blood pressure",
        value: "high-bp",
      },
      {
        id: "diabetes-tablets",
        label: "Type 2 diabetes (tablets)",
        value: "diabetes-tablets",
      },
      {
        id: "diabetes-insulin",
        label: "Type 2 diabetes (insulin)",
        value: "diabetes-insulin",
      },
      {
        id: "type-1",
        label: "Type 1 diabetes",
        value: "type-1",
      },
      {
        id: "none",
        label: "None of the above",
        value: "none",
      },
    ],
  },
  {
    id: 6,
    type: "single",
    title: "Which best describes your smoking history?",
    subtitle: "Smoking history",
    options: [
      {
        id: "never",
        label: "I've never smoked",
        value: "never",
      },
      {
        id: "former",
        label: "I used to smoke, but I don't anymore",
        value: "former",
      },
      {
        id: "current",
        label: "I currently smoke",
        value: "current",
      },
    ],
  },
  {
    id: 7,
    type: "single",
    title: "On average, how much alcohol do you drink per week?",
    subtitle: "Alcohol intake",
    helperText: "A pint of beer ≈ 2 units",
    options: [
      {
        id: "low",
        label: "0–7 units (Little or none)",
        value: "0-7",
      },
      {
        id: "moderate",
        label: "8–21 units (Moderate)",
        value: "8-21",
      },
      {
        id: "high",
        label: "22 or more units (High)",
        value: "22+",
      },
    ],
  },
  {
    id: 8,
    type: "single",
    title: "How physically active are you at the moment?",
    subtitle: "Physical activity",
    options: [
      {
        id: "very-active",
        label: "Very active",
        description: "Regular exercise most days",
        value: "very-active",
      },
      {
        id: "moderate",
        label: "Moderately active",
        description: "Some regular activity, but not consistent",
        value: "moderate",
      },
      {
        id: "low",
        label: "Low activity",
        description: "Mostly sedentary",
        value: "low",
      },
    ],
  },
  {
    id: 9,
    type: "single",
    title: "How would you describe your current pain and mobility?",
    subtitle: "Current pain & mobility",
    options: [
      {
        id: "minimal",
        label: "Minimal pain, good mobility",
        value: "minimal",
      },
      {
        id: "some",
        label: "Some pain or stiffness",
        value: "some",
      },
      {
        id: "significant",
        label: "Significant pain that limits daily activities",
        value: "significant",
      },
    ],
  },
];
