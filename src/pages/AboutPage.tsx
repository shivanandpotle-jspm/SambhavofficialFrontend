import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award, 
  Globe,
  TrendingUp,
  Lightbulb,
  CheckCircle
} from 'lucide-react';

const values = [
  { icon: Heart, title: 'Compassion', description: 'We lead with empathy and understanding in everything we do.' },
  { icon: Users, title: 'Community', description: 'Building strong bonds that lift everyone together.' },
  { icon: Award, title: 'Excellence', description: 'Striving for the highest standards in all our programs.' },
  { icon: Globe, title: 'Inclusivity', description: 'Welcoming all backgrounds and perspectives.' },
  { icon: TrendingUp, title: 'Growth', description: 'Fostering continuous learning and development.' },
  { icon: Lightbulb, title: 'Innovation', description: 'Embracing new ideas to solve old challenges.' },
];

const timeline = [
  { year: '2020', title: 'Foundation Established', description: 'Started with a vision to empower communities through education.' },
  { year: '2021', title: 'First Financial Literacy Program', description: 'Launched our signature financial education workshops.' },
  { year: '2022', title: 'Mental Health Initiative', description: 'Expanded to include mental wellness programs.' },
  { year: '2023', title: 'Entrepreneurship Hub', description: 'Created a platform for aspiring entrepreneurs.' },
  { year: '2024', title: '10,000 Lives Impacted', description: 'Reached a milestone of transforming 10,000 lives.' },
];

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-section relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
              About <span className="text-gradient">Empower</span> Foundation
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We are a non-profit organization dedicated to transforming lives through financial education, 
              entrepreneurship support, mental wellness programs, and community service initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-card bg-card overflow-hidden">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-primary-foreground" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To empower individuals and communities with the knowledge, skills, and resources they need 
                  to achieve financial independence, mental well-being, and social prosperity. We believe 
                  that everyone deserves access to quality education and support systems that enable them 
                  to thrive.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card bg-card overflow-hidden">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-warm flex items-center justify-center mb-6">
                  <Eye className="h-8 w-8 text-accent-foreground" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A world where every individual has the opportunity to reach their full potential, 
                  regardless of their background. We envision communities that are financially literate, 
                  mentally healthy, socially connected, and driven by innovation and entrepreneurship.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground">
              These principles guide every decision we make and every program we create.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border-0 shadow-card bg-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-muted-foreground">
              From humble beginnings to impacting thousands of lives.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

              {timeline.map((item, index) => (
                <div key={index} className="relative pl-20 pb-12 last:pb-0">
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-5 h-5 rounded-full bg-primary border-4 border-background" />
                  
                  <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-glow transition-shadow duration-300">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-primary bg-primary/10 rounded-full mb-3">
                      {item.year}
                    </span>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-12">
              What Sets Us Apart
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                'Holistic approach to community development',
                'Expert-led workshops and seminars',
                'Personalized mentorship programs',
                'Strong network of industry professionals',
                'Transparent and accountable governance',
                'Data-driven impact measurement',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-primary-foreground/10 backdrop-blur-sm">
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
