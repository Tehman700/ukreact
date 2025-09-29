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
  "Empowering",
  "Mental-strength-focused",
  "Detailed",
  "Personalized"
];

export function ResilienceIndexReviewPage() {
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
      alert("Please provide a star rating before generating a review.");
      return;
    }

    const getIntroPhrase = (rating: number) => {
      const highRatingIntros = [
        "I recently completed the Resilience Index assessment and was genuinely impressed with the comprehensive mental strength analysis.",
        "Just finished going through the Resilience Index - what a thorough and insightful resilience evaluation.",
        "I have to say, the Resilience Index exceeded my expectations for mental toughness assessment.",
        "As someone interested in building mental resilience, I found the Resilience Index to be incredibly valuable."
      ];

      const midRatingIntros = [
        "I completed the Resilience Index and found it to be a solid mental resilience assessment tool overall.",
        "The Resilience Index provided some useful mental strength insights, though there's room for improvement.",
        "I went through the Resilience Index and had a generally positive experience with the resilience analysis.",
        "The Resilience Index was helpful for understanding mental toughness, with mixed results in some areas."
      ];

      const lowRatingIntros = [
        "I tried the Resilience Index but unfortunately didn't find it as comprehensive as I'd hoped.",
        "While I appreciate the concept behind the Resilience Index, the execution fell short for me.",
        "I completed the Resilience Index but came away with mixed feelings about the resilience assessment.",
        "The Resilience Index has potential, but there are several areas that need improvement."
      ];

      if (rating >= 4) return highRatingIntros[Math.floor(Math.random() * highRatingIntros.length)];
      if (rating === 3) return midRatingIntros[Math.floor(Math.random() * midRatingIntros.length)];
      return lowRatingIntros[Math.floor(Math.random() * lowRatingIntros.length)];
    };

    let review = getIntroPhrase(rating) + " ";

    if (selectedPositiveFeedback.length > 0) {
      const connector = "What I particularly appreciated was how";
      review += `${connector} ${selectedPositiveFeedback.join(', ').toLowerCase()} it felt throughout the process. `;
    }

    if (customText.trim()) {
      review += customText.trim() + " ";
    }

    if (rating >= 4) {
      review += "Overall, I'd definitely recommend this to anyone looking to build mental resilience.";
    } else if (rating === 3) {
      review += "It's worth trying if you're looking for resilience assessment tools.";
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
    <PaymentGate requiredFunnel="res">
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="mb-4">Did you find Resilience Index helpful?</h1>
            <p className="text-muted-foreground">Leave a review to help us improve.</p>
          </div>

          {/* Rating */}
          <div className="mb-8 text-center">
            <h3 className="mb-4">Overall Rating (required)</h3>
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

          {hasSelectedFeedback && (
            <div className="mb-8">
              <h3 className="mb-4">Selected Feedback</h3>
              <div className="space-y-4">
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

                <div className="space-y-3">
                  <label className="text-sm font-medium">Add your own thoughts:</label>
                  <Textarea
                    placeholder="Add any additional feedback about the resilience assessment..."
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
                    <Button onClick={handleSubmitReview} className="flex-1 py-[10px]" size="lg">
                      Submit Review
                    </Button>
                  )}
                  <Button
                    onClick={handleRegenerate}
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
