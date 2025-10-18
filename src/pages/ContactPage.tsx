import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Mail, Phone, Clock } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thank you for your inquiry. A member of our team will contact you within 24 hours.');
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        alert('There was an error sending your message. Please try again or contact us directly.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['02080920615', 'Available 24/7'],
      action: 'tel:02080920615'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['Admin@luther.health', 'Response within 4 hours'],
      action: 'mailto:Admin@luther.health'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Mon-Fri: 8am-8pm', 'Sat-Sun: 9am-5pm'],
      action: null
    }
  ];

  const faqs = [
    {
      question: 'Why are your services self-pay only?',
      answer: 'Due to the exclusive, bespoke nature of our services, we operate on a self-pay basis. This allows us to provide personalized, premium care without the constraints of insurance protocols, ensuring you receive exactly what you need when you need it.'
    },
    {
      question: 'Do you offer in-person appointments?',
      answer: 'We are exclusively a remote healthcare provider. This model provides maximum flexibility for our high-achieving, dynamic clients who value convenience and discretion. All consultations and follow-ups are conducted via secure telehealth platforms.'
    },
    {
      question: 'What should I prepare for my first appointment?',
      answer: 'Please have the following ready for your consultation: valid photo ID, complete list of current medications and supplements, any recent medical records, and recent lab work or diagnostic results. Having these prepared ensures we can maximize your consultation time.'
    },
    {
      question: 'How quickly can I schedule a consultation?',
      answer: 'We typically have availability within 48-72 hours for initial consultations. For urgent matters or time-sensitive protocols, we can often accommodate same-day or next-day appointments to meet your schedule.'
    },
    {
      question: 'What makes your approach different?',
      answer: 'Our protocols are designed for high-performers who demand results. We combine cutting-edge diagnostics, evidence-based treatments, and flexible remote delivery to optimize your health without disrupting your demanding lifestyle.'
    },
    {
      question: 'How do remote consultations work?',
      answer: 'Our secure telehealth platform allows for comprehensive consultations from anywhere. We review your medical history, discuss your goals, and create personalized protocols. Lab work and diagnostics can be arranged locally, with results reviewed remotely for maximum convenience.'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="tracking-tight">
              Get in Touch
            </h1>
            <p className="text-muted-foreground">
              Ready to optimize your performance? Our remote healthcare specialists provide bespoke, self pay services designed for high-achieving professionals who demand results.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <div>
            <h2 className="mb-6 text-center">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-2">Full Name</label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2">Email</label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block mb-2">Phone Number</label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block mb-2">Service Interest</label>
                  <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="surgery-conditioning">Surgery Conditioning</SelectItem>
                      <SelectItem value="longevity-focus">Longevity Focus</SelectItem>
                      <SelectItem value="symptom-control">Symptom Control</SelectItem>
                      <SelectItem value="assessments">Health Assessments</SelectItem>
                      <SelectItem value="general-inquiry">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block mb-2">Message</label>
                <Textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Learn about our exclusive remote healthcare model, cash pay approach, and what to expect from your bespoke care experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{faq.answer}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}