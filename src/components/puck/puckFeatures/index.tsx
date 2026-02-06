import { ComponentConfig } from "@measured/puck";
import { useState } from "react";
import { Quiz } from "../../quiz/Quiz";

export const PuckFeatures: ComponentConfig<{
  heading: string;
  bulletPoints: Array<{ text: string }>;
  buttonText: string;
  buttonLink: string;
}> = {
  fields: {
    heading: {
      type: "text",
      label: "Main Heading",
      contentEditable: true,
    },
    bulletPoints: {
      type: "array",
      label: "Bullet Points",
      getItemSummary: (item) => item.text || "Bullet point",
      arrayFields: {
        text: { type: "textarea", label: "Bullet Text", contentEditable: true },
      },
    },
    buttonText: {
      type: "text",
      label: "Button Text",
    },
    buttonLink: {
      type: "text",
      label: "Button Link",
    },
  },
  defaultProps: {
    heading: "How much could you reduce your surgical risk and speed up your recovery?",
        bulletPoints: [
      {
        text: "Complete the quiz to see how much you could improve your surgical experience.",
      },
      {
        text: "Based on results from systematic reviews and meta-analyses that analysed results from over 16,000 total participants.",
      },
    ],
    buttonText: "Start",
    buttonLink: "#quiz",
  },
  render: ({
    heading,
    bulletPoints,
    buttonText,
    buttonLink
  }) => {
    const [showQuiz, setShowQuiz] = useState(false);

    const handleStartQuiz = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setShowQuiz(true);
      // Scroll to quiz smoothly
      setTimeout(() => {
        const quizElement = document.getElementById('quiz-container');
        if (quizElement) {
          quizElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    };

    return (
      <section
        className="puck-features-section"
       
      >
            <div className="container mx-auto ">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16 items-center">
            {/* Card with button - Left on desktop, bottom on mobile */}
            <div className="flex flex-col justify-center order-2 lg:order-1 risk-col-start w-full">
              {!showQuiz && (
                <div className="w-full text-center">
                  <a
                    href={buttonLink}
                    className="dark-btn"
                    onClick={handleStartQuiz}
                  >{buttonText}</a>
                </div>
              )}
              {showQuiz && (
                <div id="quiz-container" className="w-full">
                  <Quiz />
                </div>
              )}
            </div>

            {/* Content - Right on desktop, top on mobile */}
            <div className="space-y-4 sm:space-y-6 flex-1 w-full order-1 lg:order-2 risk-col-end">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {heading}
              </h2>
              {bulletPoints && bulletPoints.length > 0 && (
                <div className="feature-end-para">
                  {bulletPoints.map((bullet, index) => (
                    <p key={index} className="leading-relaxed">
                      {bullet.text}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  },
};
