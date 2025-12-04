import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Separator } from './ui/separator';
import Slider from 'react-slick';
import { AlertTriangle, Calendar, Utensils, Activity, TrendingUp, Droplet, Clock, CheckCircle2, Bed, Pill, Home, Dumbbell } from 'lucide-react';
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

  const otherGuides = [
    {
      title: "Protein Playbook",
      description: "Exactly how much protein you need and when to eat it for wound healing. Includes 14-day menu, shopping list and protein guide.",
      content: [
        "Daily protein targets by body weight",
        "Optimal timing for protein intake",
        "High-protein meal examples",
        "Supplement recommendations",
        "Shopping list and meal prep tips"
      ]
    },
    {
      title: "10-Minute Prehab",
      description: "Five targeted 2-minute drills for strength, balance, and breathing. Do at home, no equipment. Build resilience before the operation.",
      content: [
        "Breathing exercises for lung capacity",
        "Core strengthening movements",
        "Balance and stability drills",
        "Gentle cardiovascular activity",
        "Progress tracking guide"
      ]
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

    {/* ADD THIS BADGE HERE */}
    <Badge variant="outline" className="text-xs mb-3">
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

      {/* Other Guides */}
      {otherGuides.map((guide, index) => (
        <Accordion key={index} type="single" collapsible className="w-full">
          <AccordionItem value={`guide-${index}`} className="border border-border rounded-lg overflow-hidden shadow-sm">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="text-left flex-1">
                <h2 className="text-lg font-medium mb-2">{guide.title}</h2>
                <p className="text-sm text-muted-foreground pr-4">
                  {guide.description}
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
                    className="surgery-guide-slider"
                  >
                    {guide.content.map((item, idx) => (
                      <div key={idx} className="px-3">
                        <Card className="h-full shadow-lg">
                          <CardHeader>
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-primary font-medium text-sm">{idx + 1}</span>
                              </div>
                              <CardTitle className="text-base">
                                {item.split(':')[0]}
                              </CardTitle>
                            </div>
                          </CardHeader>

                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              {item.includes(':') ? item.split(':')[1] : item}
                            </p>
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
      ))}
    </div>
  );
}