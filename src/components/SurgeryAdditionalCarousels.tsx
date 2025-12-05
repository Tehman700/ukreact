import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Separator } from './ui/separator';
import Slider from 'react-slick';
import { AlertTriangle, Calendar, Utensils, Activity, TrendingUp, Droplet, Clock, CheckCircle2, Bed, Pill, Home, Dumbbell, Wind } from 'lucide-react';
import { Badge } from '../components/ui/badge';

export function SurgeryAdditionalCarousels() {
  const preOpMistakes = [
    {
      id: 1,
      icon: <AlertTriangle className="h-5 w-5" />,
      mistake: "Skipping the Cardiac Assessment",
      solution: "Request a comprehensive cardiac evaluation including stress testing if you have risk factors",
      whyItMatters: "Heart complications are the leading cause of perioperative issues in men over 60."
    },
    {
      id: 2,
      icon: <TrendingUp className="h-5 w-5" />,
      mistake: "Ignoring Testosterone Levels",
      solution: "Get levels checked 8 weeks before surgery and consider optimization under medical supervision",
      whyItMatters: "Low testosterone impairs wound healing, muscle recovery, and increases fatigue."
    },
    {
      id: 3,
      icon: <Droplet className="h-5 w-5" />,
      mistake: "Continuing Blood Thinners Without Guidance",
      solution: "Create a detailed medication timeline with your surgeon 4-6 weeks before surgery.",
      whyItMatters: "Improper anticoagulation management increases bleeding risk significantly."
    },
    {
      id: 4,
      icon: <Clock className="h-5 w-5" />,
      mistake: "Underestimating Recovery Time Needed",
      solution: "Plan for 4-6 weeks minimum recovery and arrange adequate support.",
      whyItMatters: "Men over 60 need 30-50% longer recovery time than younger patients."
    },
    {
      id: 5,
      icon: <Activity className="h-5 w-5" />,
      mistake: "Remaining Sedentary Before Surgery",
      solution: "Start a prehabilitation program 6-8 weeks before surgery with 150 minutes of moderate exercise weekly, including cardio and strength training.",
      whyItMatters: "Better preoperative fitness reduces hospital stays by 2-3 days and lowers complication rates."
    }
  ];

  const first7Days = [
    {
      id: 1,
      icon: <Bed className="h-5 w-5" />,
      title: "Recovery Room to Hospital Bed",
      description: "Focus: Pain management, vital sign monitoring, initial mobilization",
      goals: [
        "Manage post-anaesthesia effects",
        "Control pain effectively",
        "Begin breathing exercises",
        "Sit up in bed with assistance"
      ],
      proTip: "Don't be a hero with pain. Stay ahead of it with prescribed medication"
    },
    {
      id: 2,
      icon: <Activity className="h-5 w-5" />,
      title: "First Steps",
      description: "Focus: Gentle mobilization, breathing exercises, nutrition restarts",
      goals: [
        "Walk to bathroom with assistance",
        "Begin clear liquid diet",
        "Perform incentive spirometry 10x hourly",
        "Manage drainage tubes if present"
      ],
      proTip: "Every step counts. Even walking to the bathroom is significant progress."
    },
    {
      id: 3,
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Building Momentum",
      description: "Focus: Increased mobility, advancing diet, wound care education",
      goals: [
        "Walk hallway 3-4 times",
        "Transition to soft foods",
        "Learn wound care routine",
        "Reduce IV medications"
      ],
      proTip: "This is often the turning point. Push through fatigue with short, frequent walks."
    },
    {
      id: 4,
      icon: <Home className="h-5 w-5" />,
      title: "Preparing for Home",
      description: "Focus: Independence in basic activities, medication management",
      goals: [
        "Walk independently with assistive device",
        "Manage oral medications",
        "Demonstrate wound care",
        "Pain discharge needs"
      ],
      proTip: "Start thinking about home logistics, What do you need modified?"
    }
  ];

  const proteinPlaybook = [
    {
      id: 1,
      icon: <Utensils className="h-5 w-5" />,
      title: "Morning Power Start",
      subtitle: "Breakfast (7-9 AM)",
      target: "25-30g protein",
      options: [
        "3 eggs scrambled with cheese and smoked salmon",
        "Greek yogurt (200g) with whey protein powder and berries",
        "Protein pancakes made with cottage cheese and oats",
        "Ham and cheese omelette with wholemeal toast"
      ],
      proTip: "Front-load your protein early. Your body uses amino acids most efficiently in the morning for tissue repair and recovery."
    },
    {
      id: 2,
      icon: <Utensils className="h-5 w-5" />,
      title: "Mid-Morning Refuel",
      subtitle: "Mid-Morning Snack (10-11 AM)",
      target: "15-20g protein",
      options: [
        "Protein shake with banana and peanut butter",
        "Handful of almonds with protein bar",
        "Cottage cheese (150g) with pineapple chunks",
        "Hard-boiled eggs (2) with cherry tomatoes"
      ],
      proTip: "Consistent protein every 3-4 hours maintains optimal blood amino acid levels for wound healing."
    },
    {
      id: 3,
      icon: <Utensils className="h-5 w-5" />,
      title: "Midday Rebuild",
      subtitle: "Lunch (12-2 PM)",
      target: "30-35g protein",
      options: [
        "Grilled chicken breast (150g) with quinoa and vegetables",
        "Tuna salad with beans, mixed greens, and olive oil",
        "Beef stir-fry with broccoli and brown rice",
        "Salmon fillet (140g) with sweet potato and asparagus"
      ],
      proTip: "Pair protein with colorful vegetables for vitamin C and zinc—both critical for collagen synthesis and wound healing."
    },
    {
      id: 4,
      icon: <Utensils className="h-5 w-5" />,
      title: "Afternoon Boost",
      subtitle: "Afternoon Snack (3-4 PM)",
      target: "15-20g protein",
      options: [
        "Protein smoothie with spinach, berries, and flax seeds",
        "Turkey slices wrapped around cucumber sticks",
        "Hummus with carrot sticks and a protein shake",
        "Mixed nuts and seeds (50g) with Greek yogurt"
      ],
      proTip: "This snack prevents the evening protein gap and keeps your metabolism primed for recovery."
    },
    {
      id: 5,
      icon: <Utensils className="h-5 w-5" />,
      title: "Evening Recovery",
      subtitle: "Dinner (6-8 PM)",
      target: "30-35g protein",
      options: [
        "Grilled steak (150g) with roasted vegetables and quinoa",
        "Baked cod with lentils and green beans",
        "Chicken thighs with chickpeas and Mediterranean salad",
        "Pork tenderloin with Brussels sprouts and mashed sweet potato"
      ],
      proTip: "Evening protein supports overnight muscle repair and immune function during sleep—your body's prime recovery time."
    }
  ];

  const prehabExercises = [
    {
      id: 1,
      icon: <Wind className="h-5 w-5" />,
      title: "Diaphragmatic Breathing",
      description: "Build lung capacity and prevent post-op pneumonia",
      target: "2 minutes",
      options: [
        "Lie on back with knees bent, one hand on chest, one on belly",
        "Inhale slowly through nose for 4 counts, belly rises",
        "Exhale through pursed lips for 6 counts, belly falls",
        "Repeat for 2 minutes, focus on deep belly breathing"
      ],
      proTip: "This strengthens your diaphragm and increases lung capacity—critical for preventing post-operative pneumonia. Practice twice daily."
    },
    {
      id: 2,
      icon: <Activity className="h-5 w-5" />,
      title: "Core Bracing",
      description: "Strengthen your core for easier post-op movement",
      target: "2 minutes",
      options: [
        "Stand or sit with straight spine, shoulders back",
        "Gently pull belly button toward spine (don't hold breath)",
        "Hold brace for 10 seconds while breathing normally",
        "Release and repeat 10-12 times"
      ],
      proTip: "Strong core muscles support your spine and make post-operative movement easier and less painful. You'll thank yourself later."
    },
    {
      id: 3,
      icon: <Dumbbell className="h-5 w-5" />,
      title: "Sit-to-Stand",
      description: "Build leg strength for recovery mobility",
      target: "2 minutes",
      options: [
        "Sit in sturdy chair, feet flat on floor hip-width apart",
        "Lean forward slightly, push through heels to stand",
        "Lower back down with control, don't drop into seat",
        "Repeat 10-15 times, rest, then do second set"
      ],
      proTip: "This mimics exactly what you'll need to do after surgery. The stronger your legs now, the easier recovery mobility will be."
    },
    {
      id: 4,
      icon: <Activity className="h-5 w-5" />,
      title: "Balance Training",
      description: "Prevent falls during recovery",
      target: "2 minutes",
      options: [
        "Stand near wall or counter for safety",
        "Lift one foot 6 inches off ground, balance for 30 seconds",
        "Switch feet, repeat 3-4 times each side",
        "Progress to tandem stance (heel-to-toe) when ready"
      ],
      proTip: "Balance prevents falls during recovery when you may be on pain medications or feeling unsteady. Practice daily for best results."
    },
    {
      id: 5,
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Gentle Cardio",
      description: "Boost cardiovascular reserve safely",
      target: "2 minutes",
      options: [
        "March in place, lifting knees to comfortable height",
        "Swing arms naturally, maintain steady rhythm",
        "Gradually increase pace if comfortable",
        "Alternative: step side-to-side or walk in circles"
      ],
      proTip: "This gets your heart rate up safely and builds cardiovascular reserve. Even 2 minutes helps—your heart will be stronger for surgery."
    }
  ];

  return (
    <div className="space-y-6">
      {/* 14 Pre-Op Mistakes - Special Carousel */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="pre-op-mistakes" className="border border-border rounded-lg overflow-hidden shadow-sm">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="text-left flex-1">
              <h2 className="text-lg font-medium mb-2">14 Pre-Op Mistakes</h2>
              <p className="text-sm text-muted-foreground pr-4">
                The most common errors men 60+ make - and how to avoid each with simple, evidence-backed fixes. Lower risk, pain, and delays.
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-4 pb-4">
              <div className="overflow-visible py-8">
                <style>{`
                  .slick-slider {
                    position: relative;
                    display: block;
                    box-sizing: border-box;
                    user-select: none;
                    touch-action: pan-y;
                  }
                  .slick-list {
                    position: relative;
                    display: block;
                    overflow: hidden;
                    margin: 0;
                    padding: 0;
                  }
                  .slick-track {
                    position: relative;
                    top: 0;
                    left: 0;
                    display: flex;
                  }
                  .slick-slide {
                    float: left;
                    height: 100%;
                    min-height: 1px;
                  }
                  .slick-slide > div {
                    height: 100%;
                  }
                  .slick-slide .shadow-lg {
                    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
                  }
                `}</style>
                <Slider
                  dots={false}
                  arrows={false}
                  infinite={false}
                  speed={500}
                  slidesToShow={1.15}
                  slidesToScroll={1}
                  swipeToSlide={true}
                  touchThreshold={10}
                  className="mistakes-slider"
                >
                  {preOpMistakes.map((mistake) => (
                    <div key={mistake.id} className="px-3">
                      <Card className="h-full shadow-lg">
                        <CardHeader>
                          <div className="space-y-3">
                            {/* Icon and Title */}
                            <div className="flex items-start space-x-3">
                              <div className="p-2 rounded-lg bg-muted flex-shrink-0">
                                {mistake.icon}
                              </div>
                              <CardTitle className="text-lg pt-1">
                       Mistake #{mistake.id}: {mistake.mistake}
                                </CardTitle>
                              </div>

                              {/* The Mistake */}
                              <div>
                                <Badge variant="outline" className="text-xs mb-1">The Mistake</Badge>
                                <CardDescription>{mistake.mistake}</CardDescription>
                              </div>

                            </div>
                          </CardHeader>

                        <CardContent className="space-y-4">
                          {/* The Solution */}
                          <div>
                            <Badge variant="outline" className="text-xs mb-1">The Solution</Badge>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {mistake.solution}
                            </p>
                          </div>

                          {/* Why it Matters */}
                          <div>
                            <Badge variant="outline" className="text-xs mb-1">Why it Matters</Badge>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {mistake.whyItMatters}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* First 7 Days - Special Carousel */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="first-7-days" className="border border-border rounded-lg overflow-hidden shadow-sm">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="text-left flex-1">
              <h2 className="text-lg font-medium mb-2">First 7 Days</h2>
              <p className="text-sm text-muted-foreground pr-4">
                A day-by-day home plan for week one: meds, walking, sleep, bowel care, and red flags. Regain independence faster.
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-4 pb-4">
              <div className="overflow-visible py-8">
                <style>{`
                  .slick-slider {
                    position: relative;
                    display: block;
                    box-sizing: border-box;
                    user-select: none;
                    touch-action: pan-y;
                  }
                  .slick-list {
                    position: relative;
                    display: block;
                    overflow: hidden;
                    margin: 0;
                    padding: 0;
                  }
                  .slick-track {
                    position: relative;
                    top: 0;
                    left: 0;
                    display: flex;
                  }
                  .slick-slide {
                    float: left;
                    height: 100%;
                    min-height: 1px;
                  }
                  .slick-slide > div {
                    height: 100%;
                  }
                  .slick-slide .shadow-lg {
                    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
                  }
                `}</style>
                <Slider
                  dots={false}
                  arrows={false}
                  infinite={false}
                  speed={500}
                  slidesToShow={1.15}
                  slidesToScroll={1}
                  swipeToSlide={true}
                  touchThreshold={10}
                  className="first-7-days-slider"
                >
                  {first7Days.map((day) => (
                    <div key={day.id} className="px-3">
                      <Card className="h-full shadow-lg">
                        <CardHeader>
                          <div className="space-y-3">
                            {/* Day Badge */}
                            <Badge variant="outline" className="text-xs">
                              Day {day.id}
                            </Badge>

                            {/* Icon and Title */}
                            <div className="flex items-start space-x-3">
                              <div className="p-2 rounded-lg bg-muted flex-shrink-0">
                                {day.icon}
                              </div>
                              <CardTitle className="text-lg pt-1">
                                {day.title}
                              </CardTitle>
                            </div>

                            {/* Description */}
                            <CardDescription>
                              {day.description}
                            </CardDescription>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          {/* Goals */}
                          <div>
                            <h3 className="text-sm font-medium mb-3">Goals:</h3>
                            <ul className="space-y-2">
                              {day.goals.map((goal, idx) => (
                                <li key={idx} className="flex items-start space-x-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm text-muted-foreground">{goal}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <Separator />

                          {/* Pro Tip */}
                          <div>
                            <h3 className="text-sm font-medium mb-2">Pro Tip:</h3>
                            <p style={{ fontStyle: 'italic' }} className="text-sm text-muted-foreground leading-relaxed">
                              {day.proTip}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Protein Playbook - Special Carousel */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="protein-playbook" className="border border-border rounded-lg overflow-hidden shadow-sm">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="text-left flex-1">
              <h2 className="text-lg font-medium mb-2">Protein Playbook</h2>
              <p className="text-sm text-muted-foreground pr-4">
                Exactly how much protein you need and when to eat it for wound healing. Includes 14-day menu, shopping list and protein guide.
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-4 pb-4">
              <div className="overflow-visible py-8">
                <style>{`
                  .slick-slider {
                    position: relative;
                    display: block;
                    box-sizing: border-box;
                    user-select: none;
                    touch-action: pan-y;
                  }
                  .slick-list {
                    position: relative;
                    display: block;
                    overflow: hidden;
                    margin: 0;
                    padding: 0;
                  }
                  .slick-track {
                    position: relative;
                    top: 0;
                    left: 0;
                    display: flex;
                  }
                  .slick-slide {
                    float: left;
                    height: 100%;
                    min-height: 1px;
                  }
                  .slick-slide > div {
                    height: 100%;
                  }
                  .slick-slide .shadow-lg {
                    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
                  }
                `}</style>
                <Slider
                  dots={false}
                  arrows={false}
                  infinite={false}
                  speed={500}
                  slidesToShow={1.15}
                  slidesToScroll={1}
                  swipeToSlide={true}
                  touchThreshold={10}
                  className="protein-playbook-slider"
                >
                  {proteinPlaybook.map((meal) => (
                    <div key={meal.id} className="px-3">
                      <Card className="h-full shadow-lg">
                        <CardHeader>
                          <div className="space-y-3">
                            {/* Icon and Title */}
                            <div className="flex items-start space-x-3">
                              <div className="p-2 rounded-lg bg-muted flex-shrink-0">
                                {meal.icon}
                              </div>
                              <div className="flex-1">
                                <CardTitle className="text-lg pt-1">
                                  {meal.title}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {meal.subtitle}
                                </p>
                              </div>
                            </div>

                            {/* Target Badge */}
                            <div>
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                Target: {meal.target}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          {/* Options */}
                          <div>
                            <h3 className="text-sm font-medium mb-3">Options:</h3>
                            <ul className="space-y-2">
                              {meal.options.map((option, idx) => (
                                <li key={idx} className="flex items-start space-x-2">
                                  <span className="text-primary mt-0.5">•</span>
                                  <span className="text-sm text-muted-foreground">{option}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <Separator />

                          {/* Pro Tip */}
                          <div>
                            <h3 className="text-sm font-medium mb-2">Pro Tip:</h3>
                            <p style={{ fontStyle: 'italic' }} className="text-sm text-muted-foreground leading-relaxed">
                              {meal.proTip}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* 10-Minute Prehab - Special Carousel */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="prehab" className="border border-border rounded-lg overflow-hidden shadow-sm">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="text-left flex-1">
              <h2 className="text-lg font-medium mb-2">10-Minute Prehab</h2>
              <p className="text-sm text-muted-foreground pr-4">
                Five targeted 2-minute drills for strength, balance, and breathing. Do at home, no equipment. Build resilience before the operation.
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-4 pb-4">
              <div className="overflow-visible py-8">
                <style>{`
                  .slick-slider {
                    position: relative;
                    display: block;
                    box-sizing: border-box;
                    user-select: none;
                    touch-action: pan-y;
                  }
                  .slick-list {
                    position: relative;
                    display: block;
                    overflow: hidden;
                    margin: 0;
                    padding: 0;
                  }
                  .slick-track {
                    position: relative;
                    top: 0;
                    left: 0;
                    display: flex;
                  }
                  .slick-slide {
                    float: left;
                    height: 100%;
                    min-height: 1px;
                  }
                  .slick-slide > div {
                    height: 100%;
                  }
                  .slick-slide .shadow-lg {
                    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
                  }
                `}</style>
                <Slider
                  dots={false}
                  arrows={false}
                  infinite={false}
                  speed={500}
                  slidesToShow={1.15}
                  slidesToScroll={1}
                  swipeToSlide={true}
                  touchThreshold={10}
                  className="prehab-slider"
                >
                  {prehabExercises.map((exercise) => (
                    <div key={exercise.id} className="px-3">
                      <Card className="h-full shadow-lg">
                        <CardHeader>
                          <div className="space-y-3">
                            {/* Icon and Title */}
                            <div className="flex items-start space-x-3">
                              <div className="p-2 rounded-lg bg-muted flex-shrink-0">
                                {exercise.icon}
                              </div>
                              <div className="flex-1">
                                <CardTitle className="text-lg pt-1">
                                  {exercise.title}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {exercise.description}
                                </p>
                              </div>
                            </div>

                            {/* Target Badge */}
                            <div>
                              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                Duration: {exercise.target}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          {/* Options */}
                          <div>
                            <h3 className="text-sm font-medium mb-3">The Routine:</h3>
                            <ul className="space-y-2">
                              {exercise.options.map((option, idx) => (
                                <li key={idx} className="flex items-start space-x-2">
                                  <CheckCircle2 className="h-4 w-4 text-black flex-shrink-0 mt-0.5" />
                                  <span className="text-sm text-muted-foreground">{option}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <Separator />

                          {/* Pro Tip */}
                          <div>
                            <h3 className="text-sm font-medium mb-2">Why This Matters:</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {exercise.proTip}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}