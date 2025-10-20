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
                Most healthcare is slow, generic, and built for the average person. That’s not who we serve. <br />
                At Luther Health, we work with men who take their health seriously—guys who want to fix real problems, get clear answers, and move fast. <br />
                We don’t do cookie-cutter NHS style care. We build custom, hands-on plans using real data, expert oversight, and a focus on outcomes—not opinions. <br />
                Whether it’s pre-surgery, recovery, or long-term performance, our goal isn’t to get you back to baseline. It’s to get you better than you were before. Faster. Smarter. Stronger.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Founder Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Luther Health was built out of frustration. After over a decade inside the NHS, our founder kept seeing the same thing: men facing major surgery or complex health issues left waiting, guessing, and hoping it would work out. <br />
                They went in unprepared—anxious, out of shape, and unclear on what to expect. Recovery was slow, support was scattered, and outcomes were worse than they needed to be. <br />
                The system wasn’t built to make men stronger—it was built to patch them up and move on.
                <br /><br />
                So we built what should’ve existed all along.
                <br /><br />
                What started as a side project—helping a few men prepare smarter for surgery—quickly grew into a full-stack, personalized health platform. <br />
                Not just to reduce complications or speed up recovery (we do that), but to flip the script: from passive patients to active owners of their health.
                <br /><br />
                Today, Luther Health serves men around the world who want to take control of their bodies, face big moments with confidence, and come out the other side stronger than they went in. <br />
                It’s not traditional care. It’s what care should’ve been all along—intelligent, proactive, and built for performance.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Culture</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We’re a team of clinicians, coaches, and creators focused on one thing: results that matter.
                <br /><br />
                At Luther Health, we work with men who operate at a high level—and we hold ourselves to the same standard. <br />
                That means no box-ticking, no outdated playbooks, and no fluff. Just clear goals, custom plans, and measurable outcomes.
                <br /><br />
                We value precision over guesswork, clarity over complexity, and performance over ego. <br />
                We challenge each other, collaborate across disciplines, and keep the focus where it belongs—on the men we serve and the results we deliver.
                <br /><br />
                But we don’t just push for outcomes—we lead with care. <br />
                We know every case is personal. Behind every lab result is a man with a life, a family, and something at stake. <br />
                We treat our clients like we’d treat our own—and that mindset drives everything we do.
                <br /><br />
                Luther Health is where high standards meet human care. <br />
                Where elite support isn't the exception—it’s the baseline.
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
