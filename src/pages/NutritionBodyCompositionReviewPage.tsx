import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Star, X, RefreshCw } from 'lucide-react';
import { PaymentGate } from '../components/PaymentGate'; // <-- import the gate

const POSITIVE_FEEDBACK_OPTIONS = [
  "Comprehensive",
  "Accurate",
  "Relevant",
  "Insightful",
  "Motivating",
  "Reassuring",
  "Confidence-building",
  "Practical",
  "Actionable",
  "Eye-opening",
  "Informative",
  "Clear",
  "Straightforward",
  "Educational",
  "Body-focused",
  "Nutrition-focused",
  "Detailed",
  "Personalized"
];

export function NutritionBodyCompositionReviewPage() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedPositiveFeedback, setSelectedPositiveFeedback] = useState<string[]>([]);
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

  const removeSelectedFeedback = (feedback: string) => {
    setSelectedPositiveFeedback(prev => prev.filter(item => item !== feedback));
  };

  const generateReview = () => {
    if (rating === 0) {
      alert("Please select a star rating before generating a review.");
      return;
    }

    const getIntroPhrase = (rating: number) => {
      const highRatingIntros = [
        "I recently completed the Nutrition & Body Composition Score assessment and was genuinely impressed with the comprehensive nutritional analysis.",
        "Just finished going through the Nutrition & Body Composition Score - what a thorough and insightful body composition evaluation.",
        "I have to say, the Nutrition & Body Composition Score exceeded my expectations for nutritional health assessment.",
        "As someone focused on optimizing my nutrition and physique, I found the Nutrition & Body Composition Score to be incredibly valuable."
      ];
      const midRatingIntros = [
        "I completed the Nutrition & Body Composition Score and found it to be a solid nutritional assessment tool overall.",
        "The Nutrition & Body Composition Score provided some useful body composition insights, though there's room for improvement.",
        "I went through the Nutrition & Body Composition Score and had a generally positive experience with the nutrition analysis.",
        "The Nutrition & Body Composition Score was helpful for understanding nutritional status, with mixed results in some areas."
      ];
      const lowRatingIntros = [
        "I tried the Nutrition & Body Composition Score but unfortunately didn't find it as comprehensive as I'd hoped.",
        "While I appreciate the concept behind the Nutrition & Body Composition Score, the execution fell short for me.",
        "I completed the Nutrition & Body Composition Score but came away with mixed feelings about the nutrition assessment.",
        "The Nutrition & Body Composition Score has potential, but there are several areas that need improvement."
      ];
      if (rating >= 4) return highRatingIntros[Math.floor(Math.random() * highRatingIntros.length)];
      if (rating === 3) return midRatingIntros[Math.floor(Math.random() * midRatingIntros.length)];
      return lowRatingIntros[Math.floor(Math.random() * lowRatingIntros.length)];
    };

    const createFeedbackSentence = (positive: string[]) => {
      const sentences = [];
      if (positive.length > 0) {
        const connectors = [
          "What I particularly appreciated was how",
          "I found the assessment especially",
          "The nutrition analysis was notably",
          "One thing that stood out was how"
        ];
        const connector = connectors[Math.floor(Math.random() * connectors.length)];
        const traits = positive.slice(0, 3);
        if (traits.length === 1) {
          sentences.push(`${connector} ${traits[0].toLowerCase()} it felt throughout the process.`);
        } else if (traits.length === 2) {
          sentences.push(`${connector} ${traits[0].toLowerCase()} and ${traits[1].toLowerCase()} the entire experience was.`);
        } else {
          sentences.push(`${connector} ${traits.slice(0, -1).map(t => t.toLowerCase()).join(', ')}, and ${traits[traits.length - 1].toLowerCase()} it felt.`);
        }
      }
      return sentences;
    };

    let review = getIntroPhrase(rating) + ' ';
    const feedbackSentences = createFeedbackSentence(selectedPositiveFeedback);
    if (feedbackSentences.length > 0) {
      review += feedbackSentences.join(' ') + ' ';
    }
    if (customText.trim()) {
      review += customText.trim() + ' ';
    }

    if (rating >= 4) {
      review += "Overall, I'd definitely recommend this to anyone looking to optimize their nutrition and body composition.";
    } else if (rating === 3) {
      review += "It's worth trying if you're looking for nutrition and body composition assessment tools.";
    } else {
      review += "Hopefully future updates will address some of these concerns.";
    }

    review += ` ${rating}/5 stars.`;

    setGeneratedReview(review.trim());
    setShowSubmitButton(true);
  };

  const handleSubmitReview = () => {
    console.log('Submitting review:', {
      rating,
      review: generatedReview,
      positiveFeedback: selectedPositiveFeedback
    });
    window.location.hash = 'longevity-focus-protocol-challenge';
  };

  const handleRegenerate = () => {
    setGeneratedReview('');
    setShowSubmitButton(false);
  };

  const hasSelectedFeedback = selectedPositiveFeedback.length > 0;

  return (
    <PaymentGate requiredFunnel="nutrition">
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="mb-4">Did you find Nutrition & Body Composition Score helpful?</h1>
            <p className="text-muted-foreground">Leave a review to help us improve.</p>
          </div>

          {/* Star Rating */}
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

          {/* Positive Feedback */}
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

          {/* Selected Feedback + Custom */}
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
                        onClick={() => removeSelectedFeedback(feedback)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Add your own thoughts:</label>
                  <Textarea
                    placeholder="Add any additional feedback about the nutrition and body composition assessment..."
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

          {/* Generated Review */}
          {generatedReview && (
            <div className="mb-8">
              <h3 className="mb-4">Your Review</h3>
              <Textarea
                value={generatedReview}
                onChange={(e) => setGeneratedReview(e.target.value)}
                rows={4}
                className="mb-4"
              />
              <div className="flex flex-col sm:flex-row gap-3">
                {showSubmitButton && (
                  <Button onClick={handleSubmitReview} className="flex-1" size="lg">
                    Submit Review
                  </Button>
                )}
                <Button
                  onClick={handleRegenerate}
                  variant="outline"
                  className="flex-1 sm:flex-none"
                  size="lg"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PaymentGate>
  );
}
