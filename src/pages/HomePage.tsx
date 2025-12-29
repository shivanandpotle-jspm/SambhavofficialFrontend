import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Heart, 
  Users, 
  Calendar, 
  TrendingUp, 
  Lightbulb, 
  Brain, 
  Handshake,
  ArrowRight,
  Star,
  ChevronRight,
  DollarSign,
  Sparkles
} from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

const pillars = [
  {
    icon: DollarSign,
    title: 'Financial Learning',
    description: 'Empowering individuals with essential financial literacy skills for a secure future.',
    color: 'from-primary to-primary-light',
  },
  {
    icon: TrendingUp,
    title: 'Entrepreneurship',
    description: 'Nurturing the next generation of innovators and business leaders.',
    color: 'from-secondary to-secondary-light',
  },
  {
    icon: Handshake,
    title: 'Social Service',
    description: 'Building stronger communities through impactful social initiatives.',
    color: 'from-accent to-accent/70',
  },
  {
    icon: Brain,
    title: 'Mental Health',
    description: 'Prioritizing mental wellness and emotional well-being for all.',
    color: 'from-primary-light to-primary',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Driving change through creative solutions and forward thinking.',
    color: 'from-secondary-light to-secondary',
  },
];

const stats = [
  { value: '10,000+', label: 'Lives Impacted' },
  { value: '150+', label: 'Events Hosted' },
  { value: '500+', label: 'Active Members' },
  { value: '50+', label: 'Partner Organizations' },
];

export const HomePage: React.FC = () => {
  const { events } = useAdmin();
  const upcomingEvents = events.filter(e => e.status === 'upcoming').slice(0, 3);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-pattern">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-24 pb-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-up">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Empowering Communities Since 2020</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Building <span className="text-gradient">Brighter</span> Futures,{' '}
              <span className="text-gradient">Together</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Join a community dedicated to financial literacy, entrepreneurship, mental wellness, and social impact. 
              Together, we transform lives and build stronger communities.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/membership">
                <Button variant="hero" size="xl">
                  Become a Member
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/events">
                <Button variant="outline" size="xl">
                  Explore Events
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-8 mt-12 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-foreground font-heading">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary rounded-full" />
          </div>
        </div>
      </section>

      {/* Our Pillars Section */}
      <section className="py-24 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Five Pillars of Impact
            </h2>
            <p className="text-muted-foreground text-lg">
              Guided by purpose, we focus on five key areas to create lasting, meaningful change in communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Card 
                  key={index} 
                  className="group relative overflow-hidden border-0 bg-card shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {pillar.description}
                    </p>
                  </CardContent>
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${pillar.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Upcoming Events
              </h2>
              <p className="text-muted-foreground">
                Join us at our upcoming workshops, seminars, and community gatherings.
              </p>
            </div>
            <Link to="/events">
              <Button variant="outline">
                View All Events
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <Card key={event.id} className="group overflow-hidden border-0 bg-card shadow-card hover:shadow-glow transition-all duration-500">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Calendar className="h-16 w-16 text-primary/30" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground capitalize">
                        {event.category.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {event.shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">₹{event.ticketPrice}</span>
                      <Link to={`/events/${event.id}`}>
                        <Button size="sm" variant="outline">
                          Book Now
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Calendar className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No upcoming events at the moment. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-mesh-gradient opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-8">
              <Heart className="h-4 w-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">Make a Difference Today</span>
            </div>
            
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Together, We Can Create Lasting Change
            </h2>
            
            <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              Your support helps us continue our mission of empowering communities through education, 
              wellness programs, and social initiatives.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/donate">
                <Button variant="warm" size="xl">
                  <Heart className="h-5 w-5" />
                  Donate Now
                </Button>
              </Link>
              <Link to="/membership">
                <Button variant="glass" size="xl" className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
                  <Users className="h-5 w-5" />
                  Join Our Community
                </Button>
              </Link>
            </div>

            {/* Testimonial */}
            <div className="mt-16 p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                ))}
              </div>
              <blockquote className="text-lg text-primary-foreground italic mb-4">
                "Joining Empower Foundation was a turning point in my life. The financial literacy workshops 
                helped me take control of my future, and the community support has been incredible."
              </blockquote>
              <div className="text-primary-foreground/70 text-sm">
                — Priya M., Member since 2022
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
