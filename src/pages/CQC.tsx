import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Shield, Users, Award, Clock } from 'lucide-react';
import { Separator } from '../components/ui/separator';

export function CQCPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="mb-4">CQC Registration & Standards</h1>
          <p className="text-muted-foreground">
            Luther Health is committed to maintaining the highest standards of care as regulated by the Care Quality Commission (CQC), the independent regulator of health and social care in England.
          </p>
        </div>

        <div className="space-y-6">
          <Card className="bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <h2>Our Registration</h2>
              </div>
              <p className="mb-4">Luther Health is registered with the Care Quality Commission and operates under their regulatory framework to ensure the highest standards of patient care and safety.</p>
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                View Registration
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4">What is the CQC?</h2>
              <p className="mb-4">The Care Quality Commission (CQC) is the independent regulator of health and social care in England.</p>
              <p>They are the foremost authority in our industry, assessing health providers' ability to provide people with safe, effective, compassionate and high quality care.</p>
              <p className="mt-4">Whether a health company sits on the private or public side of the fence, the CQC will have assessed them – and that is just as true for individual NHS trusts as it is for companies like Luther Health.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-6">Why does the CQC matter?</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Shield className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="mb-2">Registration Required</h3>
                    <p>Care providers can only become care providers once they have registered with the CQC. Until that point, they cannot and should not operate.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <TrendingUp className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="mb-2">High Standards from Care Providers</h3>
                    <p>The CQC monitor health and social care providers continuously. They work tirelessly to make sure that their standards are upheld consistently even between major inspections.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="mb-2">Patient Protection</h3>
                    <p>The CQC has the power to protect you from harm, ultimately. The CQC hold care providers accountable for failures in the provision of healthcare, no matter the scale.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Star className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="mb-2">Rating System</h3>
                    <p>Care providers are rated based on five simple criteria – safety, effectiveness, caring, responsiveness and leadership. These vital metrics allow leading providers to excel, while others flounder.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-6">CQC's Five Key Questions</h2>
              <p className="mb-6">The CQC assesses healthcare providers based on five fundamental questions:</p>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                  <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h4>Safe</h4>
                    <p className="text-sm text-muted-foreground">Are people protected from harm?</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                  <TrendingUp className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h4>Effective</h4>
                    <p className="text-sm text-muted-foreground">Do treatments achieve good outcomes?</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                  <Heart className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h4>Caring</h4>
                    <p className="text-sm text-muted-foreground">Do staff treat people with kindness?</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                  <Users className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h4>Responsive</h4>
                    <p className="text-sm text-muted-foreground">Do services meet people's needs?</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 md:col-span-2">
                  <Star className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h4>Well-led</h4>
                    <p className="text-sm text-muted-foreground">Is the leadership, management and governance of the organisation assuring the delivery of high-quality care?</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/50">
            <CardContent className="p-6">
              <h2 className="mb-4">Our Commitment to CQC Standards</h2>
              <p className="mb-4">At Luther Health, we are committed to not just meeting but exceeding CQC standards in all areas of our practice. Our healthcare protocols are designed around the five key questions that the CQC uses to assess providers:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Ensuring patient safety through rigorous clinical protocols</li>
                <li>Delivering effective treatments with measurable outcomes</li>
                <li>Providing caring, compassionate service to every patient</li>
                <li>Being responsive to individual patient needs and concerns</li>
                <li>Maintaining strong leadership and governance structures</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
