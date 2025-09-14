import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Shield, Users, Award, Clock } from 'lucide-react';

export function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Regulated',
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
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="tracking-tight">
              Pioneering Men's Healthcare
            </h1>
            <p className="text-muted-foreground">
              Luther Health was founded on the principle that men deserve specialized, evidence-based healthcare tailored to their unique physiological and lifestyle needs. We combine cutting-edge medical science with personalized care to help men optimize their health, performance, and longevity.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4">Our Mission</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            To revolutionize men's healthcare by providing accessible, evidence-based treatments that address the root causes of health issues, not just the symptoms. We believe every man deserves to feel his best at every stage of life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-lg bg-primary/10">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{value.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="mb-4">Meet Our Medical Team</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Our team of specialists brings together decades of experience in men's health, endocrinology, sports medicine, and preventive care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.specialization}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      
    </div>
  );
}