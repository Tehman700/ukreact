import React from 'react';
import { QuizTemplate, QuizConfig } from '../components/QuizTemplate';
import { PaymentGate } from '../components/PaymentGate'; // <-- import the gate

const longevityWellnessBundleQuiz: QuizConfig = {
  title: 'The Complete Longevity Bundle',
  onComplete: () => {
    window.location.hash = 'longevity-wellness-bundle-information';
  },
  questions: [
    // Biological Age Questions (1-12)
    {
      id: 'current-age',
      question: 'What is your current chronological age?',
      options: [
        { id: '18-25', label: '18-25 years', description: 'Young adult age range' },
        { id: '26-35', label: '26-35 years', description: 'Early adult professional age' },
        { id: '36-45', label: '36-45 years', description: 'Mid-career adult age' },
        { id: '46-55', label: '46-55 years', description: 'Mature adult age range' },
        { id: '56-65', label: '56-65 years', description: 'Pre-retirement age range' },
        { id: '66-75', label: '66-75 years', description: 'Early retirement age' },
        { id: '76+', label: '76+ years', description: 'Senior adult age range' },
      ],
    },
    {
      id: 'energy-levels',
      question: 'How would you describe your typical energy levels throughout the day?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'High energy that lasts throughout the entire day' },
        { id: 'good', label: 'Good', description: 'Generally good energy with minor afternoon dips' },
        { id: 'moderate', label: 'Moderate', description: 'Decent energy but noticeable fatigue by evening' },
        { id: 'low', label: 'Low', description: 'Frequent fatigue and need for rest periods' },
        { id: 'very-low', label: 'Very low', description: 'Chronic fatigue affecting daily activities' },
      ],
    },
    {
      id: 'recovery-rate',
      question: 'How quickly do you recover from physical exertion or illness?',
      options: [
        { id: 'very-fast', label: 'Very fast', description: 'Bounce back within hours or a day' },
        { id: 'fast', label: 'Fast', description: 'Recover within 1-2 days' },
        { id: 'moderate', label: 'Moderate', description: 'Take 3-5 days to fully recover' },
        { id: 'slow', label: 'Slow', description: 'Need a week or more to recover' },
        { id: 'very-slow', label: 'Very slow', description: 'Recovery takes weeks or feels incomplete' },
      ],
    },
    {
      id: 'sleep-quality',
      question: 'How would you rate your sleep quality?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Fall asleep easily, sleep deeply, wake refreshed' },
        { id: 'good', label: 'Good', description: 'Generally good sleep with occasional disturbances' },
        { id: 'fair', label: 'Fair', description: 'Adequate sleep but not always refreshing' },
        { id: 'poor', label: 'Poor', description: 'Frequent sleep problems or non-restorative sleep' },
        { id: 'very-poor', label: 'Very poor', description: 'Chronic insomnia or severely disrupted sleep' },
      ],
    },
    {
      id: 'physical-appearance',
      question: 'How do others typically perceive your age compared to your chronological age?',
      options: [
        { id: 'much-younger', label: 'Much younger', description: 'People think I\'m 5+ years younger' },
        { id: 'younger', label: 'Somewhat younger', description: 'People think I\'m 2-4 years younger' },
        { id: 'about-right', label: 'About right', description: 'People guess my age accurately' },
        { id: 'older', label: 'Somewhat older', description: 'People think I\'m 2-4 years older' },
        { id: 'much-older', label: 'Much older', description: 'People think I\'m 5+ years older' },
      ],
    },
    {
      id: 'cognitive-sharpness',
      question: 'How would you rate your cognitive sharpness and mental clarity?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Sharp memory, quick thinking, excellent focus' },
        { id: 'good', label: 'Good', description: 'Generally sharp with occasional lapses' },
        { id: 'moderate', label: 'Moderate', description: 'Some memory issues or brain fog' },
        { id: 'poor', label: 'Poor', description: 'Frequent forgetfulness or difficulty concentrating' },
        { id: 'very-poor', label: 'Very poor', description: 'Significant cognitive decline affecting daily life' },
      ],
    },
    {
      id: 'hair-skin-health',
      question: 'How would you describe the health of your hair, skin, and nails?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Thick hair, clear skin, strong nails' },
        { id: 'good', label: 'Good', description: 'Generally healthy with minor concerns' },
        { id: 'moderate', label: 'Moderate', description: 'Some thinning, skin issues, or brittle nails' },
        { id: 'poor', label: 'Poor', description: 'Significant hair loss, skin problems, weak nails' },
        { id: 'very-poor', label: 'Very poor', description: 'Severe deterioration in hair, skin, and nail health' },
      ],
    },
    {
      id: 'hormonal-balance',
      question: 'How balanced do you feel your hormones are?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Stable mood, energy, and libido' },
        { id: 'good', label: 'Good', description: 'Generally balanced with minor fluctuations' },
        { id: 'moderate', label: 'Moderate', description: 'Some hormonal symptoms affecting quality of life' },
        { id: 'poor', label: 'Poor', description: 'Significant hormonal imbalances' },
        { id: 'very-poor', label: 'Very poor', description: 'Severe hormonal dysfunction' },
      ],
    },
    {
      id: 'inflammation-markers',
      question: 'How often do you experience signs of chronic inflammation?',
      options: [
        { id: 'never', label: 'Never', description: 'No signs of chronic inflammation' },
        { id: 'rarely', label: 'Rarely', description: 'Occasional minor inflammatory symptoms' },
        { id: 'sometimes', label: 'Sometimes', description: 'Periodic joint stiffness, digestive issues, or fatigue' },
        { id: 'often', label: 'Often', description: 'Regular inflammatory symptoms' },
        { id: 'constantly', label: 'Constantly', description: 'Chronic inflammation affecting daily life' },
      ],
    },
    {
      id: 'immune-function',
      question: 'How would you rate your immune system function?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Rarely get sick, recover quickly when I do' },
        { id: 'good', label: 'Good', description: 'Occasional minor illnesses' },
        { id: 'moderate', label: 'Moderate', description: 'Get sick a few times per year' },
        { id: 'poor', label: 'Poor', description: 'Frequently get sick or take long to recover' },
        { id: 'very-poor', label: 'Very poor', description: 'Constantly fighting infections or very slow recovery' },
      ],
    },
    {
      id: 'vision-hearing',
      question: 'How is your vision and hearing compared to when you were younger?',
      options: [
        { id: 'unchanged', label: 'Unchanged', description: 'No noticeable decline in vision or hearing' },
        { id: 'minor-decline', label: 'Minor decline', description: 'Slight changes but manageable' },
        { id: 'moderate-decline', label: 'Moderate decline', description: 'Need glasses or have some hearing difficulty' },
        { id: 'significant-decline', label: 'Significant decline', description: 'Major vision or hearing problems' },
        { id: 'severe-decline', label: 'Severe decline', description: 'Substantial impairment affecting daily life' },
      ],
    },
    {
      id: 'medication-dependence',
      question: 'How many prescription medications do you currently take regularly?',
      options: [
        { id: 'none', label: 'None', description: 'No regular prescription medications' },
        { id: 'one', label: '1 medication', description: 'Single prescription for health condition' },
        { id: 'two-three', label: '2-3 medications', description: 'Few medications for health management' },
        { id: 'four-six', label: '4-6 medications', description: 'Multiple medications for various conditions' },
        { id: 'seven-plus', label: '7+ medications', description: 'Many medications indicating complex health issues' },
      ],
    },

    // Cardiometabolic Health Questions (13-24)
    {
      id: 'cardiovascular-health',
      question: 'How would you rate your cardiovascular health?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'No issues, very fit, low resting heart rate' },
        { id: 'good', label: 'Good', description: 'Generally healthy with good exercise tolerance' },
        { id: 'fair', label: 'Fair', description: 'Some concerns but manageable' },
        { id: 'poor', label: 'Poor', description: 'Multiple risk factors or diagnosed conditions' },
        { id: 'very-poor', label: 'Very poor', description: 'Significant cardiovascular disease' },
      ],
    },
    {
      id: 'blood-pressure',
      question: 'What is your typical blood pressure reading?',
      options: [
        { id: 'optimal', label: 'Optimal (<120/80)', description: 'Consistently low and healthy readings' },
        { id: 'normal', label: 'Normal (120-129/80-84)', description: 'Within normal healthy range' },
        { id: 'high-normal', label: 'High normal (130-139/85-89)', description: 'Borderline elevated readings' },
        { id: 'high', label: 'High (140-159/90-99)', description: 'Stage 1 hypertension range' },
        { id: 'very-high', label: 'Very high (≥160/100)', description: 'Stage 2 hypertension or higher' },
        { id: 'unknown', label: 'I don\'t know', description: 'Haven\'t measured recently' },
      ],
    },
    {
      id: 'cholesterol-levels',
      question: 'What do you know about your cholesterol levels?',
      options: [
        { id: 'excellent', label: 'Excellent levels', description: 'Recent test showed optimal cholesterol' },
        { id: 'good', label: 'Good levels', description: 'Within healthy range' },
        { id: 'borderline', label: 'Borderline high', description: 'Slightly elevated but not requiring medication' },
        { id: 'high', label: 'High levels', description: 'Require medication or lifestyle intervention' },
        { id: 'unknown', label: 'Unknown', description: 'Haven\'t been tested recently' },
      ],
    },
    {
      id: 'blood-sugar',
      question: 'How is your blood sugar control?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Stable blood sugar, no concerns' },
        { id: 'good', label: 'Good', description: 'Generally stable with minor fluctuations' },
        { id: 'prediabetic', label: 'Prediabetic', description: 'Elevated but not diabetic range' },
        { id: 'diabetic-controlled', label: 'Diabetic - well controlled', description: 'Diabetes managed with medication/lifestyle' },
        { id: 'diabetic-poor', label: 'Diabetic - poorly controlled', description: 'Struggling to manage blood sugar levels' },
        { id: 'unknown', label: 'Unknown', description: 'Haven\'t been tested recently' },
      ],
    },
    {
      id: 'waist-measurement',
      question: 'What is your waist circumference measurement?',
      options: [
        { id: 'low-risk-male', label: 'Male: <94cm (37 inches)', description: 'Low metabolic risk for men' },
        { id: 'moderate-risk-male', label: 'Male: 94-102cm (37-40 inches)', description: 'Moderate metabolic risk for men' },
        { id: 'high-risk-male', label: 'Male: >102cm (40 inches)', description: 'High metabolic risk for men' },
        { id: 'low-risk-female', label: 'Female: <80cm (31 inches)', description: 'Low metabolic risk for women' },
        { id: 'moderate-risk-female', label: 'Female: 80-88cm (31-35 inches)', description: 'Moderate metabolic risk for women' },
        { id: 'high-risk-female', label: 'Female: >88cm (35 inches)', description: 'High metabolic risk for women' },
        { id: 'unknown', label: 'I don\'t know', description: 'Haven\'t measured recently' },
      ],
    },
    {
      id: 'resting-heart-rate',
      question: 'What is your resting heart rate?',
      options: [
        { id: 'excellent', label: 'Excellent (50-60 bpm)', description: 'Athletic level resting heart rate' },
        { id: 'good', label: 'Good (60-70 bpm)', description: 'Healthy resting heart rate' },
        { id: 'average', label: 'Average (70-80 bpm)', description: 'Normal but could improve' },
        { id: 'poor', label: 'Poor (80-90 bpm)', description: 'Elevated resting heart rate' },
        { id: 'very-poor', label: 'Very poor (>90 bpm)', description: 'Concerning resting heart rate' },
        { id: 'unknown', label: 'I don\'t know', description: 'Haven\'t measured recently' },
      ],
    },
    {
      id: 'metabolic-health',
      question: 'How would you rate your overall metabolic health?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Optimal weight, energy, and metabolic markers' },
        { id: 'good', label: 'Good', description: 'Generally healthy metabolism' },
        { id: 'moderate', label: 'Moderate', description: 'Some metabolic concerns' },
        { id: 'poor', label: 'Poor', description: 'Multiple metabolic risk factors' },
        { id: 'very-poor', label: 'Very poor', description: 'Metabolic syndrome or diabetes' },
      ],
    },
    {
      id: 'lipid-profile',
      question: 'Based on your last lipid panel, how were your triglyceride levels?',
      options: [
        { id: 'optimal', label: 'Optimal (<150 mg/dL)', description: 'Healthy triglyceride levels' },
        { id: 'borderline', label: 'Borderline (150-199 mg/dL)', description: 'Slightly elevated triglycerides' },
        { id: 'high', label: 'High (200-499 mg/dL)', description: 'Elevated triglycerides requiring attention' },
        { id: 'very-high', label: 'Very high (≥500 mg/dL)', description: 'Dangerously high triglyceride levels' },
        { id: 'unknown', label: 'Unknown', description: 'Haven\'t been tested recently' },
      ],
    },
    {
      id: 'heart-disease-family-history',
      question: 'Do you have a family history of heart disease?',
      options: [
        { id: 'none', label: 'None', description: 'No known family history of heart disease' },
        { id: 'distant', label: 'Distant relatives', description: 'Heart disease in grandparents or distant relatives' },
        { id: 'parents-siblings', label: 'Parents or siblings', description: 'Direct family members with heart disease' },
        { id: 'multiple-close', label: 'Multiple close relatives', description: 'Several immediate family members affected' },
        { id: 'early-onset', label: 'Early-onset family history', description: 'Family members had heart disease before age 55/65' },
      ],
    },
    {
      id: 'diabetes-family-history',
      question: 'Do you have a family history of diabetes?',
      options: [
        { id: 'none', label: 'None', description: 'No known family history of diabetes' },
        { id: 'distant', label: 'Distant relatives', description: 'Diabetes in grandparents or distant relatives' },
        { id: 'parents-siblings', label: 'Parents or siblings', description: 'Direct family members with diabetes' },
        { id: 'multiple-close', label: 'Multiple close relatives', description: 'Several immediate family members affected' },
        { id: 'type1-history', label: 'Type 1 diabetes history', description: 'Family history of autoimmune diabetes' },
      ],
    },
    {
      id: 'smoking-history',
      question: 'What is your smoking history?',
      options: [
        { id: 'never', label: 'Never smoked', description: 'No history of tobacco use' },
        { id: 'former-light', label: 'Former light smoker', description: 'Quit smoking, was light smoker (<10 cigarettes/day)' },
        { id: 'former-heavy', label: 'Former heavy smoker', description: 'Quit smoking, was heavy smoker (>10 cigarettes/day)' },
        { id: 'current-light', label: 'Current light smoker', description: 'Currently smoke <10 cigarettes per day' },
        { id: 'current-heavy', label: 'Current heavy smoker', description: 'Currently smoke >10 cigarettes per day' },
      ],
    },
    {
      id: 'alcohol-consumption',
      question: 'How much alcohol do you consume per week?',
      options: [
        { id: 'none', label: 'None', description: 'Don\'t drink alcohol' },
        { id: 'light', label: 'Light (1-3 drinks/week)', description: 'Occasional social drinking' },
        { id: 'moderate', label: 'Moderate (4-7 drinks/week)', description: 'Regular but controlled consumption' },
        { id: 'heavy', label: 'Heavy (8-14 drinks/week)', description: 'Above recommended guidelines' },
        { id: 'excessive', label: 'Excessive (>14 drinks/week)', description: 'Significantly above safe limits' },
      ],
    },

    // Resilience Questions (25-36)
    {
      id: 'stress-management',
      question: 'How well do you handle stress in your daily life?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Very resilient, bounce back quickly from setbacks' },
        { id: 'good', label: 'Good', description: 'Generally cope well with most stressors' },
        { id: 'moderate', label: 'Moderate', description: 'Sometimes struggle but usually manage' },
        { id: 'poor', label: 'Poor', description: 'Often feel overwhelmed by stress' },
        { id: 'very-poor', label: 'Very poor', description: 'Chronic stress significantly impacts life' },
      ],
    },
    {
      id: 'emotional-regulation',
      question: 'How well do you regulate your emotions during challenging times?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Stay calm and composed under pressure' },
        { id: 'good', label: 'Good', description: 'Generally maintain emotional balance' },
        { id: 'moderate', label: 'Moderate', description: 'Sometimes get overwhelmed but recover' },
        { id: 'poor', label: 'Poor', description: 'Frequently struggle with emotional control' },
        { id: 'very-poor', label: 'Very poor', description: 'Emotions often feel unmanageable' },
      ],
    },
    {
      id: 'social-support',
      question: 'How strong is your social support network?',
      options: [
        { id: 'very-strong', label: 'Very strong', description: 'Large network of supportive relationships' },
        { id: 'strong', label: 'Strong', description: 'Several close, supportive relationships' },
        { id: 'moderate', label: 'Moderate', description: 'Some supportive people in my life' },
        { id: 'weak', label: 'Weak', description: 'Limited social connections' },
        { id: 'very-weak', label: 'Very weak', description: 'Feel isolated with little support' },
      ],
    },
    {
      id: 'adaptability',
      question: 'How well do you adapt to change and new situations?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Thrive on change and new challenges' },
        { id: 'good', label: 'Good', description: 'Generally adapt well to changes' },
        { id: 'moderate', label: 'Moderate', description: 'Sometimes struggle but eventually adjust' },
        { id: 'poor', label: 'Poor', description: 'Find change very difficult to handle' },
        { id: 'very-poor', label: 'Very poor', description: 'Change causes severe distress' },
      ],
    },
    {
      id: 'optimism-level',
      question: 'How would you describe your general outlook on life?',
      options: [
        { id: 'very-optimistic', label: 'Very optimistic', description: 'Generally positive and hopeful about the future' },
        { id: 'optimistic', label: 'Optimistic', description: 'More positive than negative outlook' },
        { id: 'neutral', label: 'Neutral', description: 'Balanced perspective, neither overly positive nor negative' },
        { id: 'pessimistic', label: 'Pessimistic', description: 'Tend to expect negative outcomes' },
        { id: 'very-pessimistic', label: 'Very pessimistic', description: 'Generally negative outlook on life' },
      ],
    },
    {
      id: 'coping-strategies',
      question: 'How effective are your coping strategies when facing difficulties?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Have multiple effective strategies that work well' },
        { id: 'good', label: 'Good', description: 'Generally have good coping mechanisms' },
        { id: 'moderate', label: 'Moderate', description: 'Some strategies work, others don\'t' },
        { id: 'poor', label: 'Poor', description: 'Limited effective coping strategies' },
        { id: 'very-poor', label: 'Very poor', description: 'Struggle to cope effectively with challenges' },
      ],
    },
    {
      id: 'mental-health',
      question: 'How would you rate your overall mental health?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Consistently positive mental state' },
        { id: 'good', label: 'Good', description: 'Generally good with occasional low periods' },
        { id: 'moderate', label: 'Moderate', description: 'Some mental health challenges but manageable' },
        { id: 'poor', label: 'Poor', description: 'Frequent mental health struggles' },
        { id: 'very-poor', label: 'Very poor', description: 'Severe mental health challenges affecting daily life' },
      ],
    },
    {
      id: 'sleep-stress-relationship',
      question: 'How does stress affect your sleep quality?',
      options: [
        { id: 'not-at-all', label: 'Not at all', description: 'Sleep remains good regardless of stress levels' },
        { id: 'minimal', label: 'Minimal impact', description: 'Stress occasionally affects sleep' },
        { id: 'moderate', label: 'Moderate impact', description: 'Stress sometimes disrupts sleep patterns' },
        { id: 'significant', label: 'Significant impact', description: 'Stress frequently affects sleep quality' },
        { id: 'severe', label: 'Severe impact', description: 'Stress severely disrupts sleep regularly' },
      ],
    },
    {
      id: 'work-life-balance',
      question: 'How would you rate your work-life balance?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Perfect balance between work and personal life' },
        { id: 'good', label: 'Good', description: 'Generally balanced with occasional busy periods' },
        { id: 'moderate', label: 'Moderate', description: 'Some imbalance but manageable' },
        { id: 'poor', label: 'Poor', description: 'Work often interferes with personal life' },
        { id: 'very-poor', label: 'Very poor', description: 'Severe imbalance causing significant stress' },
      ],
    },
    {
      id: 'purpose-meaning',
      question: 'How strong is your sense of purpose and meaning in life?',
      options: [
        { id: 'very-strong', label: 'Very strong', description: 'Clear sense of purpose and meaning' },
        { id: 'strong', label: 'Strong', description: 'Generally feel purposeful and meaningful' },
        { id: 'moderate', label: 'Moderate', description: 'Some sense of purpose but could be stronger' },
        { id: 'weak', label: 'Weak', description: 'Limited sense of purpose or meaning' },
        { id: 'very-weak', label: 'Very weak', description: 'Feel lost or lacking in purpose' },
      ],
    },
    {
      id: 'mindfulness-practices',
      question: 'How often do you engage in mindfulness or stress-reduction practices?',
      options: [
        { id: 'daily', label: 'Daily', description: 'Regular meditation, yoga, or mindfulness practice' },
        { id: 'weekly', label: 'Weekly', description: 'Several times per week' },
        { id: 'occasionally', label: 'Occasionally', description: 'Sometimes when stressed' },
        { id: 'rarely', label: 'Rarely', description: 'Very infrequent practice' },
        { id: 'never', label: 'Never', description: 'No mindfulness or stress-reduction practices' },
      ],
    },
    {
      id: 'relationship-quality',
      question: 'How would you rate the quality of your closest relationships?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Deep, supportive, and fulfilling relationships' },
        { id: 'good', label: 'Good', description: 'Generally positive and supportive relationships' },
        { id: 'moderate', label: 'Moderate', description: 'Some good relationships, some challenges' },
        { id: 'poor', label: 'Poor', description: 'Relationships often stressful or unsatisfying' },
        { id: 'very-poor', label: 'Very poor', description: 'Significant relationship problems or isolation' },
      ],
    },

    // Nutrition Questions (37-48)
    {
      id: 'diet-quality',
      question: 'How would you rate the overall quality of your diet?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Whole foods, balanced, minimal processed foods' },
        { id: 'good', label: 'Good', description: 'Generally healthy with occasional treats' },
        { id: 'moderate', label: 'Moderate', description: 'Mix of healthy and less healthy choices' },
        { id: 'poor', label: 'Poor', description: 'Limited variety, frequent processed foods' },
        { id: 'very-poor', label: 'Very poor', description: 'Mostly processed foods, little nutritional variety' },
      ],
    },
    {
      id: 'vegetable-intake',
      question: 'How many servings of vegetables do you eat per day?',
      options: [
        { id: '5-plus', label: '5 or more servings', description: 'Meet or exceed recommended intake' },
        { id: '3-4', label: '3-4 servings', description: 'Good but could improve' },
        { id: '1-2', label: '1-2 servings', description: 'Below recommended intake' },
        { id: 'less-than-1', label: 'Less than 1 serving', description: 'Minimal vegetable consumption' },
        { id: 'none', label: 'Rarely eat vegetables', description: 'Very limited vegetable intake' },
      ],
    },
    {
      id: 'protein-intake',
      question: 'How adequate is your protein intake?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'High-quality protein at every meal' },
        { id: 'good', label: 'Good', description: 'Adequate protein most days' },
        { id: 'moderate', label: 'Moderate', description: 'Some protein but could be more consistent' },
        { id: 'poor', label: 'Poor', description: 'Limited protein sources' },
        { id: 'very-poor', label: 'Very poor', description: 'Rarely consume adequate protein' },
      ],
    },
    {
      id: 'hydration',
      question: 'How well do you stay hydrated throughout the day?',
      options: [
        { id: 'excellent', label: 'Excellent', description: '8+ glasses of water daily, rarely thirsty' },
        { id: 'good', label: 'Good', description: 'Generally well-hydrated' },
        { id: 'moderate', label: 'Moderate', description: 'Sometimes forget to drink enough' },
        { id: 'poor', label: 'Poor', description: 'Often feel thirsty or dehydrated' },
        { id: 'very-poor', label: 'Very poor', description: 'Chronically under-hydrated' },
      ],
    },
    {
      id: 'body-composition',
      question: 'How would you describe your current body composition?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Lean muscle mass, low body fat percentage' },
        { id: 'good', label: 'Good', description: 'Healthy muscle-to-fat ratio' },
        { id: 'moderate', label: 'Moderate', description: 'Some excess weight but not obese' },
        { id: 'poor', label: 'Poor', description: 'Overweight with limited muscle mass' },
        { id: 'very-poor', label: 'Very poor', description: 'Significantly overweight or underweight' },
      ],
    },
    {
      id: 'fruit-intake',
      question: 'How many servings of fruit do you eat per day?',
      options: [
        { id: '3-plus', label: '3 or more servings', description: 'Excellent fruit consumption' },
        { id: '2', label: '2 servings', description: 'Good fruit intake' },
        { id: '1', label: '1 serving', description: 'Minimal but some fruit consumption' },
        { id: 'less-than-1', label: 'Less than 1 serving', description: 'Very limited fruit intake' },
        { id: 'none', label: 'Rarely eat fruit', description: 'Almost no fruit consumption' },
      ],
    },
    {
      id: 'processed-food-consumption',
      question: 'How often do you eat highly processed foods?',
      options: [
        { id: 'rarely', label: 'Rarely', description: 'Occasional processed foods, mostly whole foods' },
        { id: 'sometimes', label: 'Sometimes', description: 'A few times per week' },
        { id: 'regularly', label: 'Regularly', description: 'Most days include some processed foods' },
        { id: 'frequently', label: 'Frequently', description: 'Daily consumption of processed foods' },
        { id: 'constantly', label: 'Constantly', description: 'Diet consists mostly of processed foods' },
      ],
    },
    {
      id: 'meal-timing',
      question: 'How consistent are your meal times and eating patterns?',
      options: [
        { id: 'very-consistent', label: 'Very consistent', description: 'Regular meal times, structured eating pattern' },
        { id: 'consistent', label: 'Consistent', description: 'Generally regular with minor variations' },
        { id: 'somewhat-consistent', label: 'Somewhat consistent', description: 'Some regularity but often disrupted' },
        { id: 'inconsistent', label: 'Inconsistent', description: 'Irregular meal times and patterns' },
        { id: 'very-inconsistent', label: 'Very inconsistent', description: 'Chaotic eating patterns, frequent skipping meals' },
      ],
    },
    {
      id: 'healthy-fats',
      question: 'How often do you consume healthy fats (olive oil, nuts, avocados, fish)?',
      options: [
        { id: 'daily', label: 'Daily', description: 'Include healthy fats in most meals' },
        { id: 'most-days', label: 'Most days', description: 'Regular but not daily consumption' },
        { id: 'sometimes', label: 'Sometimes', description: 'A few times per week' },
        { id: 'rarely', label: 'Rarely', description: 'Infrequent consumption of healthy fats' },
        { id: 'never', label: 'Never', description: 'Very limited or no healthy fat consumption' },
      ],
    },
    {
      id: 'sugar-intake',
      question: 'How much added sugar do you consume daily?',
      options: [
        { id: 'minimal', label: 'Minimal', description: 'Rarely consume added sugars' },
        { id: 'low', label: 'Low', description: 'Occasional sweet treats or desserts' },
        { id: 'moderate', label: 'Moderate', description: 'Some added sugar daily but controlled' },
        { id: 'high', label: 'High', description: 'Regular consumption of sugary foods/drinks' },
        { id: 'excessive', label: 'Excessive', description: 'High sugar intake throughout the day' },
      ],
    },
    {
      id: 'supplement-use',
      question: 'Do you take any nutritional supplements regularly?',
      options: [
        { id: 'comprehensive', label: 'Comprehensive regimen', description: 'Well-researched supplement protocol' },
        { id: 'basic', label: 'Basic supplements', description: 'Multivitamin and a few key nutrients' },
        { id: 'minimal', label: 'Minimal', description: 'Occasional supplement use' },
        { id: 'none-targeted', label: 'None but interested', description: 'Don\'t take supplements but considering it' },
        { id: 'none', label: 'None', description: 'No supplement use' },
      ],
    },
    {
      id: 'digestive-health',
      question: 'How would you rate your digestive health?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'No digestive issues, regular and comfortable' },
        { id: 'good', label: 'Good', description: 'Generally good with occasional minor issues' },
        { id: 'moderate', label: 'Moderate', description: 'Some digestive discomfort or irregularity' },
        { id: 'poor', label: 'Poor', description: 'Frequent digestive problems affecting daily life' },
        { id: 'very-poor', label: 'Very poor', description: 'Severe digestive issues requiring medical attention' },
      ],
    },

    // Functional Fitness Questions (49-60)
    {
      id: 'exercise-frequency',
      question: 'How often do you engage in structured physical exercise?',
      options: [
        { id: 'daily', label: 'Daily', description: 'Exercise or physical activity every day' },
        { id: '5-6-times', label: '5-6 times per week', description: 'Very regular exercise routine' },
        { id: '3-4-times', label: '3-4 times per week', description: 'Regular exercise routine' },
        { id: '1-2-times', label: '1-2 times per week', description: 'Occasional exercise' },
        { id: 'rarely', label: 'Rarely or never', description: 'Sedentary lifestyle' },
      ],
    },
    {
      id: 'strength-levels',
      question: 'How would you rate your current strength levels?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Very strong, can perform all daily tasks easily' },
        { id: 'good', label: 'Good', description: 'Generally strong with good functional capacity' },
        { id: 'moderate', label: 'Moderate', description: 'Adequate strength for most activities' },
        { id: 'poor', label: 'Poor', description: 'Struggle with some daily activities' },
        { id: 'very-poor', label: 'Very poor', description: 'Significant difficulty with basic tasks' },
      ],
    },
    {
      id: 'flexibility-mobility',
      question: 'How is your flexibility and mobility?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Very flexible, full range of motion' },
        { id: 'good', label: 'Good', description: 'Generally flexible with minor limitations' },
        { id: 'moderate', label: 'Moderate', description: 'Some stiffness but manageable' },
        { id: 'poor', label: 'Poor', description: 'Limited range of motion, frequent stiffness' },
        { id: 'very-poor', label: 'Very poor', description: 'Severely limited mobility' },
      ],
    },
    {
      id: 'balance-coordination',
      question: 'How is your balance and coordination?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Perfect balance, very coordinated' },
        { id: 'good', label: 'Good', description: 'Generally good balance and coordination' },
        { id: 'moderate', label: 'Moderate', description: 'Occasional balance issues' },
        { id: 'poor', label: 'Poor', description: 'Frequent balance problems or clumsiness' },
        { id: 'very-poor', label: 'Very poor', description: 'Significant balance and coordination issues' },
      ],
    },
    {
      id: 'endurance-capacity',
      question: 'How is your cardiovascular endurance?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Can sustain activity for long periods without fatigue' },
        { id: 'good', label: 'Good', description: 'Good endurance for most activities' },
        { id: 'moderate', label: 'Moderate', description: 'Adequate endurance but room for improvement' },
        { id: 'poor', label: 'Poor', description: 'Get winded easily with minimal activity' },
        { id: 'very-poor', label: 'Very poor', description: 'Severe limitations in endurance capacity' },
      ],
    },
    {
      id: 'strength-training',
      question: 'How often do you engage in resistance or strength training?',
      options: [
        { id: 'daily', label: 'Daily', description: 'Daily strength training or resistance work' },
        { id: '4-6-times', label: '4-6 times per week', description: 'Very regular strength training' },
        { id: '2-3-times', label: '2-3 times per week', description: 'Regular strength training routine' },
        { id: 'weekly', label: 'Once per week', description: 'Minimal strength training' },
        { id: 'rarely', label: 'Rarely or never', description: 'No regular strength training' },
      ],
    },
    {
      id: 'functional-movement',
      question: 'How easily can you perform functional movements like squatting, reaching overhead, or getting up from the floor?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'All movements performed easily and pain-free' },
        { id: 'good', label: 'Good', description: 'Generally good with minor limitations' },
        { id: 'moderate', label: 'Moderate', description: 'Some difficulty or discomfort with certain movements' },
        { id: 'poor', label: 'Poor', description: 'Significant difficulty with functional movements' },
        { id: 'very-poor', label: 'Very poor', description: 'Unable to perform many basic movements' },
      ],
    },
    {
      id: 'daily-activity-level',
      question: 'How active are you in your daily life outside of formal exercise?',
      options: [
        { id: 'very-active', label: 'Very active', description: 'Consistently active throughout the day' },
        { id: 'active', label: 'Active', description: 'Regular walking, taking stairs, active lifestyle' },
        { id: 'moderately-active', label: 'Moderately active', description: 'Some daily activity but mostly sedentary' },
        { id: 'sedentary', label: 'Sedentary', description: 'Mostly sitting throughout the day' },
        { id: 'very-sedentary', label: 'Very sedentary', description: 'Minimal movement throughout most days' },
      ],
    },
    {
      id: 'recovery-between-workouts',
      question: 'How well do you recover between workout sessions?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'Feel completely recovered and energized' },
        { id: 'good', label: 'Good', description: 'Generally recover well with minor soreness' },
        { id: 'moderate', label: 'Moderate', description: 'Adequate recovery but sometimes feel fatigued' },
        { id: 'poor', label: 'Poor', description: 'Often feel sore or fatigued between workouts' },
        { id: 'very-poor', label: 'Very poor', description: 'Chronic fatigue and poor recovery' },
      ],
    },
    {
      id: 'joint-health',
      question: 'How would you rate your joint health and comfort?',
      options: [
        { id: 'excellent', label: 'Excellent', description: 'No joint pain or stiffness' },
        { id: 'good', label: 'Good', description: 'Generally comfortable with occasional minor stiffness' },
        { id: 'moderate', label: 'Moderate', description: 'Some joint discomfort but manageable' },
        { id: 'poor', label: 'Poor', description: 'Regular joint pain or stiffness affecting activities' },
        { id: 'very-poor', label: 'Very poor', description: 'Significant joint problems limiting daily function' },
      ],
    },
    {
      id: 'injury-history',
      question: 'How would you describe your injury history and current injury status?',
      options: [
        { id: 'none', label: 'No significant injuries', description: 'No history of major injuries or current issues' },
        { id: 'minor-past', label: 'Minor past injuries', description: 'Previous minor injuries that healed completely' },
        { id: 'major-past', label: 'Major past injuries', description: 'Previous significant injuries but currently pain-free' },
        { id: 'chronic-issues', label: 'Chronic issues', description: 'Ongoing problems from past injuries' },
        { id: 'current-injury', label: 'Current injury', description: 'Currently dealing with injury or pain' },
      ],
    },
    {
      id: 'physical-goals',
      question: 'What are your current physical fitness goals?',
      options: [
        { id: 'performance', label: 'Performance enhancement', description: 'Focused on improving athletic performance' },
        { id: 'maintenance', label: 'Maintenance', description: 'Maintaining current fitness level' },
        { id: 'weight-loss', label: 'Weight loss', description: 'Primary goal is losing weight' },
        { id: 'strength-muscle', label: 'Strength/muscle gain', description: 'Building strength and muscle mass' },
        { id: 'general-health', label: 'General health', description: 'Overall health and longevity focus' },
        { id: 'rehabilitation', label: 'Rehabilitation', description: 'Recovering from injury or health issue' },
      ],
    },
  ],
};

export function LongevityWellnessBundleQuestionsPage() {
    return (
    <PaymentGate requiredFunnel="longevity">
      <QuizTemplate config={longevityWellnessBundleQuiz} />
    </PaymentGate>
  );
}