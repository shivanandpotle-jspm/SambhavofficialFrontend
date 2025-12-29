import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Clock, Users, ArrowLeft, Share2, Heart } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { DynamicFormRenderer } from '@/components/DynamicFormRenderer';
import { useRazorpay } from '@/hooks/useRazorpay';
import { toast } from '@/hooks/use-toast';

export const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { events, addAttendee, settings } = useAdmin();
  const { payForEvent } = useRazorpay(settings.razorpayKeyId);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState<Record<string, unknown> | null>(null);

  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-4">Event Not Found</h1>
          <Button onClick={() => navigate('/events')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  const handleFormSubmit = (data: Record<string, unknown>) => {
    setFormData(data);
    
    if (event.ticketPrice > 0) {
      payForEvent(
        event.title,
        event.ticketPrice,
        {
          name: data.name as string || '',
          email: data.email as string || '',
          phone: data.phone as string || '',
        },
        () => {
          completeRegistration(data);
        }
      );
    } else {
      completeRegistration(data);
    }
  };

  const completeRegistration = (data: Record<string, unknown>) => {
    addAttendee({
      id: Date.now().toString(),
      eventId: event.id,
      name: data.name as string || 'Anonymous',
      email: data.email as string || '',
      formData: data,
      registeredAt: new Date().toISOString(),
      ticketPaid: event.ticketPrice > 0,
    });

    toast({
      title: 'Registration Successful!',
      description: `You're registered for ${event.title}. Check your email for details.`,
    });

    setIsRegistering(false);
    setFormData(null);
  };

  return (
    <div className="pt-24 pb-16 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button onClick={() => navigate('/events')} variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 relative">
              {event.images[0] ? (
                <img src={event.images[0].url} alt={event.title} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Calendar className="h-24 w-24 text-primary/30" />
                </div>
              )}
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 text-sm font-semibold rounded-full bg-primary text-primary-foreground capitalize">
                  {event.category.replace('-', ' ')}
                </span>
              </div>
            </div>

            {/* Event Details */}
            <div>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {event.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>{new Date(event.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Max {event.maxAttendees} attendees</span>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Image Gallery */}
            {event.images.length > 1 && (
              <div>
                <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Event Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.images.slice(1).map((image, index) => (
                    <div key={image.id} className="aspect-square rounded-xl overflow-hidden">
                      <img src={image.url} alt={image.caption || `Event image ${index + 2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ticket Card */}
            <Card className="border-0 shadow-card sticky top-28">
              <CardHeader className="pb-4">
                <CardTitle className="font-heading text-xl">Register for this Event</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold text-primary">
                    {event.ticketPrice > 0 ? `₹${event.ticketPrice}` : 'Free'}
                  </span>
                  {event.ticketPrice > 0 && <span className="text-muted-foreground">per person</span>}
                </div>

                {!isRegistering ? (
                  <div className="space-y-3">
                    <Button variant="hero" size="lg" className="w-full" onClick={() => setIsRegistering(true)}>
                      Register Now
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Heart className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground mb-4">
                      Fill in the details below to complete your registration.
                    </div>
                    <DynamicFormRenderer
                      fields={event.formFields}
                      onSubmit={handleFormSubmit}
                      submitLabel={event.ticketPrice > 0 ? `Pay ₹${event.ticketPrice} & Register` : 'Complete Registration'}
                    />
                    <Button variant="ghost" size="sm" className="w-full" onClick={() => setIsRegistering(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-foreground mb-4">Event Information</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium text-primary capitalize">{event.status}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium capitalize">{event.category.replace('-', ' ')}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Max Attendees</span>
                    <span className="font-medium">{event.maxAttendees}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
