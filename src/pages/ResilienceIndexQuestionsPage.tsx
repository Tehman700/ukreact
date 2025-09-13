import React from 'react';
import { QuizTemplate, QuizConfig } from '../components/QuizTemplate';

const resilienceIndexQuiz: QuizConfig = {
  title: 'Resilience Index',
  onComplete: () => {
    window.location.hash = 'resilience-index-information';
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
      id: 'stress-response',
      question: 'How do you typically respond to unexpected stressful situations?',
      options: [
        { id: 'thrive', label: 'I thrive under pressure', description: 'Feel energized and perform better when challenged' },
        { id: 'adapt-quickly', label: 'I adapt quickly and find solutions', description: 'Stay calm and problem-solve effectively' },
        { id: 'manage-well', label: 'I manage reasonably well', description: 'Some initial stress but recover and cope' },
        { id: 'struggle-initially', label: 'I struggle initially but eventually cope', description: 'Feel overwhelmed at first but find ways to manage' },
        { id: 'overwhelmed', label: 'I feel overwhelmed and struggle to cope', description: 'Difficult to think clearly or take action' },
      ],
    },
    {
      id: 'recovery-speed',
      question: 'After experiencing a setback or failure, how quickly do you bounce back?',
      options: [
        { id: 'immediately', label: 'Almost immediately', description: 'Learn and move forward right away' },
        { id: 'within-hours', label: 'Within a few hours', description: 'Process briefly then refocus on goals' },
        { id: 'few-days', label: 'Within a few days', description: 'Need some time to process but recover relatively quickly' },
        { id: 'weeks', label: 'Takes weeks to fully recover', description: 'Extended time needed to regain confidence' },
        { id: 'months', label: 'Takes months or longer', description: 'Setbacks significantly impact confidence and performance' },
      ],
    },
    {
      id: 'support-network',
      question: 'How would you describe your social support network?',
      options: [
        { id: 'strong-diverse', label: 'Strong and diverse', description: 'Multiple trusted people across different areas of life' },
        { id: 'solid-core', label: 'Solid core group', description: 'Several close relationships I can rely on' },
        { id: 'adequate', label: 'Adequate support', description: 'Some people I can turn to when needed' },
        { id: 'limited', label: 'Limited support', description: 'Few people I feel comfortable opening up to' },
        { id: 'isolated', label: 'Socially isolated', description: 'Minimal support network or trusted relationships' },
      ],
    },
    {
      id: 'mindset-challenges',
      question: 'When facing major challenges, which mindset best describes you?',
      options: [
        { id: 'growth-opportunity', label: 'Challenges are growth opportunities', description: 'Excited to learn and develop new capabilities' },
        { id: 'problem-solve', label: 'Challenges are problems to solve', description: 'Focus on finding practical solutions' },
        { id: 'temporary-obstacle', label: 'Challenges are temporary obstacles', description: 'Believe they will pass with time and effort' },
        { id: 'overwhelming-burden', label: 'Challenges feel overwhelming', description: 'Often feel burdened by difficult situations' },
        { id: 'confirmation-failure', label: 'Challenges confirm my limitations', description: 'Tend to see setbacks as proof of inadequacy' },
      ],
    },
    {
      id: 'emotional-regulation',
      question: 'How well do you manage your emotions during difficult times?',
      options: [
        { id: 'excellent-control', label: 'Excellent emotional control', description: 'Stay calm and composed even in crisis' },
        { id: 'good-management', label: 'Good emotional management', description: 'Generally stable with occasional emotional responses' },
        { id: 'moderate-regulation', label: 'Moderate regulation', description: 'Sometimes emotional but can regain control' },
        { id: 'struggle-emotions', label: 'Struggle with emotions', description: 'Often feel overwhelmed by emotional responses' },
        { id: 'poor-control', label: 'Poor emotional control', description: 'Emotions frequently interfere with decision-making' },
      ],
    },
    {
      id: 'adaptability',
      question: 'How easily do you adapt to significant life changes?',
      options: [
        { id: 'embrace-change', label: 'I embrace change eagerly', description: 'See change as exciting and full of possibilities' },
        { id: 'adapt-well', label: 'I adapt well to change', description: 'Some initial adjustment but quickly find new routines' },
        { id: 'gradual-adjustment', label: 'I need time but adjust gradually', description: 'Require planning and support but ultimately adapt' },
        { id: 'resist-change', label: 'I resist change and find it stressful', description: 'Prefer stability and find transitions difficult' },
        { id: 'struggle-severely', label: 'I struggle severely with change', description: 'Major changes cause significant distress and dysfunction' },
      ],
    },
    {
      id: 'self-efficacy',
      question: 'How confident are you in your ability to handle future challenges?',
      options: [
        { id: 'very-confident', label: 'Very confident', description: 'Believe I can handle whatever comes my way' },
        { id: 'mostly-confident', label: 'Mostly confident', description: 'Generally believe in my abilities with some reservations' },
        { id: 'somewhat-confident', label: 'Somewhat confident', description: 'Mixed feelings about my capability to handle difficulties' },
        { id: 'lacking-confidence', label: 'Lacking confidence', description: 'Often doubt my ability to cope with challenges' },
        { id: 'very-insecure', label: 'Very insecure', description: 'Frequently worry about my capacity to handle stress' },
      ],
    },
    {
      id: 'stress-management',
      question: 'What stress management techniques do you regularly use?',
      multiSelect: true,
      options: [
        { id: 'meditation', label: 'Meditation or mindfulness', description: 'Regular practice of present-moment awareness' },
        { id: 'exercise', label: 'Physical exercise', description: 'Regular physical activity for stress relief' },
        { id: 'social-connection', label: 'Social connection', description: 'Talking with friends, family, or colleagues' },
        { id: 'hobbies', label: 'Hobbies or creative activities', description: 'Engaging in enjoyable personal interests' },
        { id: 'professional-help', label: 'Professional counseling/therapy', description: 'Working with mental health professionals' },
        { id: 'sleep-routine', label: 'Good sleep hygiene', description: 'Prioritizing quality sleep and rest' },
        { id: 'none-regular', label: 'No regular stress management', description: 'Don\'t have consistent coping strategies' },
      ],
    },
    {
      id: 'work-pressure',
      question: 'How do you perform under high-pressure work situations?',
      options: [
        { id: 'peak-performance', label: 'Peak performance under pressure', description: 'Do my best work when stakes are high' },
        { id: 'maintain-quality', label: 'Maintain quality despite pressure', description: 'Stay focused and deliver consistent results' },
        { id: 'adequate-performance', label: 'Adequate performance', description: 'Get the job done but may feel stressed' },
        { id: 'declining-quality', label: 'Quality declines under pressure', description: 'Make more mistakes when pressured' },
        { id: 'paralyzed-pressure', label: 'Feel paralyzed by pressure', description: 'Struggle to function effectively under stress' },
      ],
    },
    {
      id: 'optimism-level',
      question: 'How would you describe your general outlook on life?',
      options: [
        { id: 'very-optimistic', label: 'Very optimistic', description: 'Generally expect positive outcomes and see opportunities' },
        { id: 'mostly-positive', label: 'Mostly positive', description: 'Generally hopeful with occasional pessimistic moments' },
        { id: 'balanced-realistic', label: 'Balanced/realistic', description: 'Mix of optimism and pragmatism' },
        { id: 'often-pessimistic', label: 'Often pessimistic', description: 'Frequently expect negative outcomes' },
        { id: 'very-negative', label: 'Very negative', description: 'Consistently expect the worst and focus on problems' },
      ],
    },
    {
      id: 'physical-health',
      question: 'How would you rate your current physical health and energy levels?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'High energy, rarely sick, feel physically strong' },
        { id: 'very-good', label: 'Very good', description: 'Generally healthy with good energy most days' },
        { id: 'good', label: 'Good', description: 'Decent health with occasional fatigue or minor issues' },
        { id: 'fair', label: 'Fair', description: 'Some health concerns that affect energy and mood' },
        { id: 'poor', label: 'Poor', description: 'Significant health issues that impact daily resilience' },
      ],
    },
  ],
};

export function ResilienceIndexQuestionsPage() {
  return <QuizTemplate config={resilienceIndexQuiz} />;
}