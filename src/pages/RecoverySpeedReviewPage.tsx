import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Star, X, RefreshCw } from 'lucide-react';
import { PaymentGate } from '../components/PaymentGate'; // <-- import the gate

const POSITIVE_FEEDBACK_OPTIONS = [
  "Accurate timeline",
  "Helpful insights", 
  "Actionable recommendations",
  "Personalized approach",
  "Comprehensive analysis",
  "Realistic expectations",
  "Motivating guidance",
  "Practical tips",
  "Clear explanations",
  "Confidence-building"
];

const NEGATIVE_FEEDBACK_OPTIONS = [
  "Too basic",
  "Not specific enough",
  "Unclear recommendations",
  "Generic advice",
  "Timeline seems off",
  "Missing details"
];

export function RecoverySpeedReviewPage() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedPositiveFeedback, setSelectedPositiveFeedback] = useState<string[]>([]);
  const [selectedNegativeFeedback, setSelectedNegativeFeedback] = useState<string[]>([]);
  const [customText, setCustomText] = useState('');
  const [generatedReview, setGeneratedReview] = useState('');
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handlePositiveFeedbackToggle = (feedback: string) => {
    setSelectedPositiveFeedback(prev =>
      prev.includes(feedback)
        ? prev.filter(item => item !== feedback)
        : [...prev, feedback]
    );
  };

  const handleNegativeFeedbackToggle = (feedback: string) => {
    setSelectedNegativeFeedback(prev =>
      prev.includes(feedback)
        ? prev.filter(item => item !== feedback)
        : [...prev, feedback]
    );
  };

  const removeSelectedFeedback = (feedback: string, isPositive: boolean) => {
    if (isPositive) {
      setSelectedPositiveFeedback(prev => prev.filter(item => item !== feedback));
    } else {
      setSelectedNegativeFeedback(prev => prev.filter(item => item !== feedback));
    }
  };

  const generateReview = () => {
    const getIntroPhrase = (rating: number) => {
      const highRatingIntros = [
        "I recently completed the Recovery Speed Predictor and was impressed with the detailed timeline analysis.",
        "Just finished the Recovery Speed Predictor - what a comprehensive assessment of recovery factors.",
        "The Recovery Speed Predictor exceeded my expectations in predicting my healing timeline.",
        "As someone preparing for surgery, I found the Recovery Speed Predictor incredibly valuable."
      ];
      
      const midRatingIntros = [
        "I completed the Recovery Speed Predictor and found it to be a solid resource overall.",
        "The Recovery Speed Predictor provided useful insights, though there's room for improvement.",
        "I went through the Recovery Speed Predictor and had a generally positive experience.",
        "The Recovery Speed Predictor was helpful in certain areas, with mixed results in others."
      ];
      
      const lowRatingIntros = [
        "I tried the Recovery Speed Predictor but unfortunately didn't find it as helpful as I'd hoped.",
        "While I appreciate the concept behind the Recovery Speed Predictor, the execution fell short for me.",
        "I completed the Recovery Speed Predictor but came away with mixed feelings about the experience.",
        "The Recovery Speed Predictor has potential, but there are several areas that need improvement."
      ];
      
      if (rating >= 4) return highRatingIntros[Math.floor(Math.random() * highRatingIntros.length)];
      if (rating === 3) return midRatingIntros[Math.floor(Math.random() * midRatingIntros.length)];
      return lowRatingIntros[Math.floor(Math.random() * lowRatingIntros.length)];
    };

    const createFeedbackSentence = (positive: string[], negative: string[]) => {
      const sentences = [];
      
      if (positive.length > 0) {
        const positiveConnectors = [
          "What I particularly appreciated was how",
          "I found the recovery timeline especially",
          "The analysis was notably",
          "One thing that stood out was how"
        ];
        
        const connector = positiveConnectors[Math.floor(Math.random() * positiveConnectors.length)];
        const traits = positive.slice(0, 3);
        
        if (traits.length === 1) {
          sentences.push(`${connector} ${traits[0].toLowerCase()} it felt throughout the process.`);
        } else if (traits.length === 2) {
          sentences.push(`${connector} ${traits[0].toLowerCase()} and ${traits[1].toLowerCase()} the entire experience was.`);
        } else {
          sentences.push(`${connector} ${traits.slice(0, -1).map(t => t.toLowerCase()).join(', ')}, and ${traits[traits.length - 1].toLowerCase()} it felt.`);
        }
      }
      
      if (negative.length > 0) {
        const negativeConnectors = [
          "However, I did find some aspects",
          "That said, there were areas that felt",
          "On the flip side, certain parts seemed",
          "I do think some improvements could be made where things felt"
        ];
        
        const connector = negativeConnectors[Math.floor(Math.random() * negativeConnectors.length)];
        const issues = negative.slice(0, 2);
        
        if (issues.length === 1) {
          sentences.push(`${connector} ${issues[0].toLowerCase()}.`);
        } else {
          sentences.push(`${connector} ${issues.join(' and ').toLowerCase()}.`);
        }
      }
      
      return sentences;
    };

    let review = '';
    
    if (rating > 0 || selectedPositiveFeedback.length > 0 || selectedNegativeFeedback.length > 0) {
      if (rating > 0) {
        review += getIntroPhrase(rating) + ' ';
      }
      
      const feedbackSentences = createFeedbackSentence(selectedPositiveFeedback, selectedNegativeFeedback);
      if (feedbackSentences.length > 0) {
        review += feedbackSentences.join(' ') + ' ';
      }
      
      if (customText.trim()) {
        review += customText.trim() + ' ';
      }
      
      if (rating >= 4) {
        const conclusions = [
          "Overall, I'd definitely recommend this to anyone preparing for surgery.",
          "I'm giving this a strong recommendation for anyone concerned about recovery timing.",
          "Would absolutely use this again and recommend it to others.",
          "This has genuinely helped me feel more prepared and confident about my recovery."
        ];
        review += conclusions[Math.floor(Math.random() * conclusions.length)];
      } else if (rating === 3) {
        const conclusions = [
          "It's worth trying if you're looking for recovery timeline insights.",
          "A decent option among the various recovery assessment tools available.",
          "Has some valuable elements that make it worth considering.",
          "Could be helpful for some people, though results may vary."
        ];
        review += conclusions[Math.floor(Math.random() * conclusions.length)];
      } else if (rating <= 2) {
        const conclusions = [
          "Hopefully future updates will address some of these concerns.",
          "With some improvements, this could become a much more valuable resource.",
          "There's definitely potential here, but it needs more development.",
          "Others might have a different experience, but this didn't quite work for me."
        ];
        review += conclusions[Math.floor(Math.random() * conclusions.length)];
      }
      
      if (rating > 0) {
        review += ` ${rating}/5 stars.`;
      }
    }
    
    review = review.replace(/\s+/g, ' ').trim();
    
    setGeneratedReview(review);
    setShowSubmitButton(true);
  };

  const handleSubmitReview = () => {
    console.log('Submitting review:', {
      rating,
      review: generatedReview,
      positiveFeedback: selectedPositiveFeedback,
      negativeFeedback: selectedNegativeFeedback
    });
    
    window.location.hash = 'surgery-conditioning-protocol-challenge';
  };

  const hasSelectedFeedback = selectedPositiveFeedback.length > 0 || selectedNegativeFeedback.length > 0;

  return (
           <PaymentGate requiredFunnel="recovery-speed">

    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="mb-4">Did you find the Recovery Speed Predictor helpful?</h1>
          <p className="text-muted-foreground">Leave a review to help us improve.</p>
        </div>

        <div className="mb-8 text-center">
          <h3 className="mb-4">Overall Rating</h3>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="p-1 transition-colors"
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-4">Positive Feedback</h3>
          <div className="flex flex-wrap gap-2">
            {POSITIVE_FEEDBACK_OPTIONS.map((feedback, index) => (
              <Badge
                key={index}
                variant={selectedPositiveFeedback.includes(feedback) ? "default" : "secondary"}
                className="cursor-pointer px-3 py-2 text-sm"
                onClick={() => handlePositiveFeedbackToggle(feedback)}
              >
                {feedback}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-4">Negative Feedback</h3>
          <div className="flex flex-wrap gap-2">
            {NEGATIVE_FEEDBACK_OPTIONS.map((feedback, index) => (
              <Badge
                key={index}
                variant={selectedNegativeFeedback.includes(feedback) ? "default" : "secondary"}
                className="cursor-pointer px-3 py-2 text-sm"
                onClick={() => handleNegativeFeedbackToggle(feedback)}
              >
                {feedback}
              </Badge>
            ))}
          </div>
        </div>

        {hasSelectedFeedback && (
          <div className="mb-8">
            <h3 className="mb-4">Selected Feedback</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                {selectedPositiveFeedback.map((feedback, index) => (
                  <div key={index} className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                    <span className="text-sm">{feedback}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSelectedFeedback(feedback, true)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {selectedNegativeFeedback.map((feedback, index) => (
                  <div key={index} className="flex items-center justify-between bg-red-50 p-3 rounded-lg">
                    <span className="text-sm">{feedback}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSelectedFeedback(feedback, false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Add your own thoughts:</label>
                <Textarea
                  placeholder="Add any additional feedback..."
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  rows={3}
                />
              </div>

              {!generatedReview && (
                <Button onClick={generateReview} className="w-full px-[14px] py-[10px]">
                  Generate Review
                </Button>
              )}
            </div>
          </div>
        )}

        {generatedReview && (
          <div className="mb-8">
            <h3 className="mb-4">Your Review</h3>
            <div>
              <Textarea
                value={generatedReview}
                onChange={(e) => setGeneratedReview(e.target.value)}
                rows={4}
                className="mb-4"
              />
              <div className="flex flex-col sm:flex-row gap-3">
                {showSubmitButton && (
                  <Button onClick={handleSubmitReview} className="flex-1 py-[20px] px-[21px] py-[10px]" size="lg">
                    Submit Review
                  </Button>
                )}
                <Button 
                  onClick={generateReview} 
                  variant="outline" 
                  className="flex-1 sm:flex-none px-[14px] py-[10px]" 
                  size="lg"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
        </PaymentGate>

  );
}