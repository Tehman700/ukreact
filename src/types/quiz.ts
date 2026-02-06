export type QuestionType = "slider" | "single" | "multiple";

export interface QuizOption {
  id: string;
  label: string;
  description?: string;
  value: string | number;
}

export interface QuizQuestion {
  id: number;
  type: QuestionType;
  title: string;
  subtitle?: string;
  helperText?: string;
  options?: QuizOption[];
  min?: number;
  max?: number;
  unit?: string;
  validation?: {
    min?: number;
    max?: number;
  };
}

export interface QuizAnswer {
  questionId: number;
  answer: string | number | string[];
}

export interface QuizState {
  currentQuestion: number;
  answers: Record<number, string | number | string[]>;
  isComplete: boolean;
}
