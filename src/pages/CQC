import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Shield, Users, Award, Clock } from 'lucide-react';
import { Separator } from '../components/ui/separator';

export function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Regulated Care',
      description: 'Fully regulated by the CQC and GMC, ensuring the highest standards of medical care and patient safety.'
    },
    {
      icon: Users,
      title: 'Doctor Led',
      description: 'All treatments are overseen by experienced medical professionals with specialized training in men\'s health.'
    },
    {
      icon: Award,
      title: 'Evidence Based',
      description: 'Our protocols follow the latest clinical guidelines and are backed by peer-reviewed research.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Continuous support and monitoring throughout your treatment journey with dedicated care coordinators.'
    }
  ];

  const team = [
    {
      name: 'Dr. Michael Harrison',
      role: 'Medical Director',
      specialization: 'Endocrinology & Men\'s Health',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      name: 'Dr. Sarah Chen',
      role: 'Senior Consultant',
      specialization: 'Sports Medicine & Performance',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      name: 'Dr. James Rodriguez',
      role: 'Consultant Physician',
      specialization: 'Preventive Medicine & Longevity',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80'
    }
  ];

  return (
    <div className="relative space-y-0 text-foreground">
      {/* Hero Section with Smaller Centered Image */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="relative max-w-2xl mx-auto">
              <img
                src="https://cdn.cosmos.so/0d2dca26-af8d-4a33-a775-fc29184144b6?format=jpeg"
                alt="Luther Health background"
                className="w-full h-[300px] md:h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Values */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We at Luther Health, we exist for men who take their health seriously — men who want the best, expect results, and don't have time for guesswork.
              </p>
              <p>
                We provide personalised, high-performance health solutions for those facing complex challenges — whether preparing for surgery, recovering from it, or navigating the in-between. Our clients come to us not just for support, but for a plan they can trust. They want clarity, control, and measurable progress. That's what we deliver.
              </p>
              <p>
                This isn't standard care. It's tailored, data-informed, and outcome-driven — built by clinicians and designed for individuals who demand precision and performance. We don't just help men recover — we help them elevate. The goal isn't to return to baseline. It's to come back better.
              </p>
              <p>
                At its core, Luther Health is about giving men a clear path forward, built around their goals, their timelines, and their standards. Because when your health is on the line, generic care isn't good enough.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Founder Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Luther Health was born out of a frustration that became impossible to ignore.
              </p>
              <p>
                After more than a decade working within the NHS, our founder kept seeing the same pattern: men facing major surgery or complex health issues were left waiting — unsure of what to do, how to prepare, or who to trust. Too often, they entered surgery deconditioned, anxious, and underinformed. And afterward? Recovery was slow, fragmented, and reactive. The system didn't make men stronger — it just tried to patch them up.
              </p>
              <p>
                So we built what we wished had existed.
              </p>
              <p>
                What started as a side project — helping a handful of patients prepare more intentionally for surgery — quickly grew into a comprehensive approach to personalised health transformation. The goal wasn't just to reduce complications or bounce back faster (though we do that). It was to shift the entire mindset around health: from passive waiting to active ownership.
              </p>
              <p>
                Luther Health is now a platform serving men around the world — men who want to take control of their health, face big moments with confidence, and come out on the other side sharper, stronger, and ready for more. What started as a simple idea has become a new standard for what care should look like — intelligent, proactive, and built around the individual.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Culture</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We're a team of clinicians, coaches, and creators driven by one thing: results that matter.
              </p>
              <p>
                At Luther Health, our culture is built on performance and purpose. We work with men who operate at a high level — and we hold ourselves to the same standard. That means we're not here to tick boxes or follow outdated protocols. We're here to solve problems, deliver outcomes, and raise the bar for what health support can be.
              </p>
              <p>
                We value precision over platitudes, clarity over complexity, and excellence over ego. We collaborate across disciplines, we challenge each other to improve, and we keep the focus where it belongs — on the men we serve and the results we deliver.
              </p>
              <p>
                But we also lead with compassion. We know that behind every case is a person with goals, fears, and high expectations. We treat each client with the same care we'd want for ourselves or our families. That human side — the deep respect for what our clients are navigating — is what shapes how we work.
              </p>
              <p>
                Luther Health is a place where high standards meet deep care. Where curiosity fuels innovation. And where every member of the team plays a role in redefining what world-class health support looks like for men who expect more — and won't settle for less.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Separator />

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Start Your Health Journey?</h2>
          <p className="text-muted-foreground">
            Join thousands of men who have transformed their health with Luther Health's personalized approach to men's healthcare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg">Contact Our Team</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
