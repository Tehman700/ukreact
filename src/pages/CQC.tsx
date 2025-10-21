import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Shield, Users, Award, Clock, ClipboardCheck, FileCheck } from 'lucide-react';
import { Separator } from '../components/ui/separator';

export function CQCPage() {
  const values = [
    {
      icon: Shield,
      title: 'CQC Regulated',
      description: 'Luther Health is fully regulated by the Care Quality Commission (CQC), ensuring our clinical services meet the highest national standards of quality, safety, and governance.'
    },
    {
      icon: ClipboardCheck,
      title: 'Commitment to Quality',
      description: 'Our policies, procedures, and patient pathways are designed to exceed CQC standards across key domains — Safety, Effectiveness, Caring, Responsiveness, and Well-Led.'
    },
    {
      icon: FileCheck,
      title: 'Transparent Compliance',
      description: 'We maintain clear, auditable processes for clinical oversight, data security, consent, safeguarding, and risk management — reviewed regularly as part of our compliance framework.'
    },
    {
      icon: Users,
      title: 'Patient-Centred Care',
      description: 'Every element of our service is designed around patient wellbeing — ensuring dignity, respect, and individualised treatment that aligns with CQC’s patient-first principles.'
    }
  ];

  return (
    <div className="relative space-y-0 text-foreground">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="relative max-w-2xl mx-auto">
              <img
                src="https://cdn.cosmos.so/7cf6d02e-2ff0-47db-8a6b-b16e4f33aaf1?format=jpeg"
                alt="CQC Compliance"
                className="w-full h-[300px] md:h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CQC Information */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Care Quality Commission (CQC)</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Luther Health is registered with the Care Quality Commission (CQC), the independent regulator of health and social care services in England. This registration confirms that we meet strict legal requirements for safety, quality, and governance across all aspects of care delivery.
              </p>
              <p>
                Our clinical operations are reviewed regularly to ensure compliance with the Health and Social Care Act 2008 (Regulated Activities) Regulations 2014 and the CQC’s five key questions:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Safe:</strong> Services are designed to protect patients from avoidable harm and risk.</li>
                <li><strong>Effective:</strong> Care is evidence-based, outcome-driven, and led by qualified professionals.</li>
                <li><strong>Caring:</strong> We treat every patient with compassion, dignity, and respect.</li>
                <li><strong>Responsive:</strong> Services are organised to meet individual needs and preferences.</li>
                <li><strong>Well-Led:</strong> Leadership promotes transparency, accountability, and continuous improvement.</li>
              </ul>
              <p>
                By maintaining this regulatory standard, we provide patients with assurance that our clinical services are delivered ethically, professionally, and in line with national healthcare benchmarks.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Our CQC Commitment</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Our governance framework is built around continuous improvement and proactive compliance. We conduct regular internal audits, team training, and data protection reviews to maintain the highest levels of integrity and operational excellence.
              </p>
              <p>
                We also work closely with our Responsible Officer and designated CQC manager to ensure full accountability across every area of clinical practice, including patient confidentiality, documentation standards, and informed consent.
              </p>
              <p>
                Patients can view our CQC registration details, statement of purpose, and inspection outcomes at any time. Transparency and accountability are central to how we operate.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Governance and Oversight</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Clinical governance is at the heart of our model. Every service is led by qualified medical professionals who uphold the standards set by both the CQC and the General Medical Council (GMC). 
              </p>
              <p>
                Our governance structure ensures oversight in the following areas:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Clinical safety and incident management</li>
                <li>Safeguarding and patient protection</li>
                <li>Staff training and professional development</li>
                <li>Information governance and data protection</li>
                <li>Quality assurance and outcome measurement</li>
              </ul>
              <p>
                This multi-layered approach guarantees that patients receive care that is safe, effective, and compliant — while continuously driving improvements in clinical performance and patient satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">View Our CQC Registration</h2>
          <p className="text-muted-foreground">
            For full details about our regulatory status and inspection reports, visit the official CQC website.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" asChild>
              <a href="https://www.cqc.org.uk" target="_blank" rel="noopener noreferrer">
                Visit CQC Website
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
