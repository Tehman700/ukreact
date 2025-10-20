import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ShieldCheck, FileText, ClipboardCheck, Users } from 'lucide-react';
import { Separator } from '../components/ui/separator';

export function CQCPage() {
  const standards = [
    {
      icon: ShieldCheck,
      title: 'Regulated by the CQC',
      description:
        'Luther Health is fully regulated by the Care Quality Commission (CQC), ensuring our services meet the highest standards of clinical governance and patient safety.'
    },
    {
      icon: FileText,
      title: 'Registered Medical Services',
      description:
        'We are registered to provide remote consultations and treatment services under regulated activity frameworks for diagnostic and screening procedures.'
    },
    {
      icon: ClipboardCheck,
      title: 'Governance & Compliance',
      description:
        'Our governance structure ensures ongoing compliance with CQC Key Lines of Enquiry (KLOEs), covering safety, effectiveness, care, responsiveness, and leadership.'
    },
    {
      icon: Users,
      title: 'Patient-Centered Care',
      description:
        'Every patient interaction is guided by clinical excellence and a commitment to compassion, confidentiality, and respect.'
    }
  ];

  return (
    <div id="cqc" className="relative space-y-0 text-foreground">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-4xl font-bold">Care Quality Commission (CQC)</h1>
            <p className="text-muted-foreground text-lg">
              Our commitment to clinical excellence and regulatory compliance ensures the highest standard of care for every patient we support.
            </p>
          </div>
        </div>
      </div>

      {/* Standards Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
          {standards.map((item, index) => (
            <Card key={index} className="shadow-sm">
              <CardHeader className="flex flex-row items-center space-x-4">
                <item.icon className="w-8 h-8 text-primary" />
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Want to Verify Our Registration?</h2>
          <p className="text-muted-foreground">
            You can view Luther Health’s official registration and regulatory details directly on the CQC website.
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
          >
            <a
              href="https://www.cqc.org.uk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on CQC Website
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
