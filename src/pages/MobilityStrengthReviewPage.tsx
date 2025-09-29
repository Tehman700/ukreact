import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Star, X, RefreshCw } from 'lucide-react';
import { PaymentGate } from '../components/PaymentGate'; // <-- import the gate

const POSITIVE_FEEDBACK_OPTIONS = [
  "Accurate baseline",
  "Helpful tracking", 
  "Clear measurements",
  "Motivating results",
  "Practical guidance",
  "Good progress tracking",
  "Realistic goals",
  "Comprehensive assessment",
  "Easy to understand",
  "Confidence-building"
];

export function MobilityStrengthReviewPage() {
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
      alert("Please select a star rating before generating your review.");
      return;
    }

    const getIntroPhrase = (rating: number) => {
      const highRatingIntros = [
        "I recently completed the Mobility & Strength Score and was impressed with the baseline assessment.",
        "Just finished the Mobility & Strength Score - what a comprehensive evaluation of my physical capacity.",
        "The Mobility & Strength Score exceeded my expectations in establishing my baseline fitness.",
        "As someone preparing for surgery, I found the Mobility & Strength Score incredibly valuable."
      ];

      const midRatingIntros = [
        "I completed the Mobility & Strength Score and found it to be a solid resource overall.",
        "The Mobility & Strength Score provided useful insights, though there's room for improvement.",
        "I went through the Mobility & Strength Score and had a generally positive experience.",
        "The Mobility & Strength Score was helpful in certain areas, with mixed results in others."
      ];

      const lowRatingIntros = [
        "I tried the Mobility & Strength Score but unfortunately didn't find it as helpful as I'd hoped.",
        "While I appreciate the concept behind the Mobility & Strength Score, the execution fell short for me.",
        "I completed the Mobility & Strength Score but came away with mixed feelings about the experience.",
        "The Mobility & Strength Score has potential, but there are several areas that need improvement."
      ];

      if (rating >= 4) return highRatingIntros[Math.floor(Math.random() * highRatingIntros.length)];
      if (rating === 3) return midRatingIntros[Math.floor(Math.random() * midRatingIntros.length)];
      return lowRatingIntros[Math.floor(Math.random() * lowRatingIntros.length)];
    };

    const createFeedbackSentence = (positive: string[]) => {
      if (positive.length === 0) return "";

      const positiveConnectors = [
        "What I particularly appreciated was how",
        "I found the baseline assessment especially",
        "The analysis was notably",
        "One thing that stood out was how"
      ];

      const connector = positiveConnectors[Math.floor(Math.random() * positiveConnectors.length)];
      const traits = positive.slice(0, 3);

      if (traits.length === 1) {
        return `${connector} ${traits[0].toLowerCase()} it felt throughout the process.`;
      } else if (traits.length === 2) {
        return `${connector} ${traits[0].toLowerCase()} and ${traits[1].toLowerCase()} the entire experience was.`;
      } else {
        return `${connector} ${traits.slice(0, -1).map(t => t.toLowerCase()).join(', ')}, and ${traits[traits.length - 1].toLowerCase()} it felt.`;
      }
    };

    let review = getIntroPhrase(rating) + " ";
    const feedbackSentence = createFeedbackSentence(selectedPositiveFeedback);
    if (feedbackSentence) review += feedbackSentence + " ";
    if (customText.trim()) review += customText.trim() + " ";

    if (rating >= 4) {
      review += "Would absolutely use this again and recommend it to others.";
    } else if (rating === 3) {
      review += "Has some valuable elements that make it worth considering.";
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
    window.location.hash = 'surgery-conditioning-protocol-challenge';
  };

  const hasSelectedFeedback = selectedPositiveFeedback.length > 0;

  return (
    <PaymentGate requiredFunnel="mobility">
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="mb-4">Did you find the Mobility & Strength Score helpful?</h1>
            <p className="text-muted-foreground">Leave a review to help us improve.</p>
          </div>

          {/* Rating */}
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

          {/* Selected Feedback */}
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

          {/* Review Output */}
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
