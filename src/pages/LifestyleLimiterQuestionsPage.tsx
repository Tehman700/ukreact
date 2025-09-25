import React from 'react';
import { QuizTemplate, QuizConfig } from '../components/QuizTemplate';
import { PaymentGate } from '../components/PaymentGate'; // <-- import the gate


const lifestyleLimiterQuiz: QuizConfig = {
  title: 'Lifestyle Limiter Score Assessment',
  questions: [
    {
      id: 'work-performance-impact',
      question: 'How do health issues affect your work performance?',
      subtitle: 'Consider productivity, concentration, and ability to meet deadlines',
      options: [
        { id: 'no-impact', label: 'No impact on work performance' },
        { id: 'minimal-impact', label: 'Minimal impact - occasionally slower pace' },
        { id: 'moderate-impact', label: 'Moderate impact - noticeable reduction in efficiency' },
        { id: 'significant-impact', label: 'Significant impact - frequently struggle to perform' },
        { id: 'severe-impact', label: 'Severe impact - work quality consistently affected' },
        { id: 'unable-to-work', label: 'Unable to work at full capacity most days' },
      ],
    },
    {
      id: 'work-attendance',
      question: 'How often do health issues cause you to miss work or leave early?',
      subtitle: 'Include both physical and mental health-related absences',
      options: [
        { id: 'never', label: 'Never miss work due to health issues' },
        { id: 'rarely', label: 'Rarely (once every few months)' },
        { id: 'occasionally', label: 'Occasionally (once a month)' },
        { id: 'frequently', label: 'Frequently (2-3 times per month)' },
        { id: 'regularly', label: 'Regularly (weekly)' },
        { id: 'not-applicable', label: 'Not currently employed' },
      ],
    },
    {
      id: 'social-activities-participation',
      question: 'How do health issues affect your participation in social activities?',
      subtitle: 'Include events with friends, family gatherings, social clubs, etc.',
      options: [
        { id: 'fully-participate', label: 'Fully participate in all desired social activities' },
        { id: 'mostly-participate', label: 'Participate in most activities with minor adjustments' },
        { id: 'selective-participation', label: 'Selective participation - choose easier activities' },
        { id: 'limited-participation', label: 'Limited participation - miss many events' },
        { id: 'rarely-participate', label: 'Rarely participate in social activities' },
        { id: 'avoid-social-activities', label: 'Avoid social activities entirely' },
      ],
    },
    {
      id: 'relationship-strain',
      question: 'Have health issues created strain in your personal relationships?',
      subtitle: 'Consider impact on family, friends, and romantic relationships',
      options: [
        { id: 'no-strain', label: 'No relationship strain related to health' },
        { id: 'minimal-strain', label: 'Minimal strain - occasional understanding needed' },
        { id: 'some-strain', label: 'Some strain - relationships require more effort' },
        { id: 'significant-strain', label: 'Significant strain - frequent relationship challenges' },
        { id: 'severe-strain', label: 'Severe strain - damaged or lost relationships' },
        { id: 'isolated', label: 'Became increasingly isolated due to health issues' },
      ],
    },
    {
      id: 'physical-activities-limitation',
      question: 'How have health issues limited your physical activities?',
      subtitle: 'Include exercise, sports, hobbies, and recreational activities',
      options: [
        { id: 'no-limitation', label: 'No limitation in physical activities' },
        { id: 'minor-adjustments', label: 'Minor adjustments to intensity or duration' },
        { id: 'moderate-limitations', label: 'Moderate limitations - avoided some activities' },
        { id: 'significant-limitations', label: 'Significant limitations - major activity restrictions' },
        { id: 'severe-limitations', label: 'Severe limitations - minimal physical activity' },
        { id: 'unable-to-exercise', label: 'Unable to engage in most physical activities' },
      ],
    },
    {
      id: 'household-responsibilities',
      question: 'How do health issues affect your ability to manage household responsibilities?',
      subtitle: 'Include cleaning, cooking, shopping, maintenance, childcare',
      options: [
        { id: 'manage-fully', label: 'Manage all household responsibilities without difficulty' },
        { id: 'manage-mostly', label: 'Manage most responsibilities with occasional help' },
        { id: 'need-assistance', label: 'Need regular assistance with some responsibilities' },
        { id: 'struggle-significantly', label: 'Struggle significantly with most responsibilities' },
        { id: 'require-help-most', label: 'Require help with most household tasks' },
        { id: 'unable-to-manage', label: 'Unable to manage household responsibilities' },
      ],
    },
    {
      id: 'leisure-activities-enjoyment',
      question: 'How have health issues affected your enjoyment of leisure activities?',
      subtitle: 'Include hobbies, entertainment, travel, and personal interests',
      options: [
        { id: 'full-enjoyment', label: 'Full enjoyment of all leisure activities' },
        { id: 'mostly-enjoyable', label: 'Most activities still enjoyable with minor modifications' },
        { id: 'some-activities-limited', label: 'Some activities less enjoyable or accessible' },
        { id: 'many-activities-affected', label: 'Many activities no longer enjoyable or possible' },
        { id: 'few-activities-possible', label: 'Very few leisure activities still possible' },
        { id: 'no-enjoyment', label: 'Little to no enjoyment from leisure activities' },
      ],
    },
    {
      id: 'travel-limitations',
      question: 'How do health issues affect your ability to travel?',
      subtitle: 'Include both local trips and longer travel for work or pleasure',
      options: [
        { id: 'no-travel-limits', label: 'No limitations on travel' },
        { id: 'minor-planning', label: 'Minor additional planning required' },
        { id: 'moderate-restrictions', label: 'Moderate restrictions - some destinations difficult' },
        { id: 'significant-restrictions', label: 'Significant restrictions - limited travel options' },
        { id: 'local-travel-only', label: 'Local travel only, long trips too difficult' },
        { id: 'unable-to-travel', label: 'Unable to travel beyond essential local trips' },
      ],
    },
    {
      id: 'financial-impact',
      question: 'What financial impact have health issues had on your life?',
      subtitle: 'Consider medical costs, lost income, and lifestyle adjustments',
      options: [
        { id: 'no-financial-impact', label: 'No significant financial impact' },
        { id: 'minor-costs', label: 'Minor additional healthcare costs' },
        { id: 'moderate-burden', label: 'Moderate financial burden from health issues' },
        { id: 'significant-burden', label: 'Significant financial strain affecting lifestyle' },
        { id: 'major-hardship', label: 'Major financial hardship due to health issues' },
        { id: 'unable-to-afford', label: 'Unable to afford necessary care or treatments' },
      ],
    },
    {
      id: 'independence-level',
      question: 'How have health issues affected your independence in daily living?',
      subtitle: 'Consider your ability to live and function independently',
      options: [
        { id: 'fully-independent', label: 'Fully independent in all aspects of daily living' },
        { id: 'mostly-independent', label: 'Mostly independent with occasional assistance' },
        { id: 'some-dependence', label: 'Some dependence on others for certain activities' },
        { id: 'significant-dependence', label: 'Significant dependence on others for daily care' },
        { id: 'high-dependence', label: 'High level of dependence on caregivers' },
        { id: 'complete-dependence', label: 'Complete dependence on others for daily needs' },
      ],
    },
  ],
  onComplete: (answers) => {
    console.log('Lifestyle Limiter Score Assessment completed with answers:', answers);
    window.location.hash = 'lifestyle-limiter-score-information';
  },
  onBack: () => {
    window.location.hash = 'lifestyle-limiter-score-learn-more';
  },
};

export function LifestyleLimiterQuestionsPage() {
    return (
    <PaymentGate requiredFunnel="lifestyle">
      <QuizTemplate config={lifestyleLimiterQuiz} />
    </PaymentGate>
  );
}