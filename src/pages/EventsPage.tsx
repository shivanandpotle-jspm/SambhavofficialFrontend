import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Users, Clock, Search, Filter, ArrowRight } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'financial', label: 'Financial Learning' },
  { value: 'entrepreneurship', label: 'Entrepreneurship' },
  { value: 'social', label: 'Social Service' },
  { value: 'mental-health', label: 'Mental Health' },
  { value: 'innovation', label: 'Innovation' },
];

export const EventsPage: React.FC = () => {
  const { events } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const upcomingEvents = filteredEvents.filter((e) => e.status === 'upcoming');
  const pastEvents = filteredEvents.filter((e) => e.status === 'completed');

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-section relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Our <span className="text-gradient">Events</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Join us at workshops, seminars, and community gatherings designed to inspire, educate, and connect.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="h-5 w-5 text-muted-foreground hidden sm:block" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-8">
            Upcoming Events
          </h2>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="group overflow-hidden border-0 bg-card shadow-card hover:shadow-glow transition-all duration-500">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                    {event.images[0] ? (
                      <img src={event.images[0].url} alt={event.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Calendar className="h-16 w-16 text-primary/30" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground capitalize">
                        {event.category.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {event.shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-primary">₹{event.ticketPrice}</span>
                        <span className="text-sm text-muted-foreground ml-2">per person</span>
                      </div>
                      <Link to={`/events/${event.id}`}>
                        <Button size="sm" variant="hero">
                          Register
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Calendar className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No upcoming events found. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="py-16 bg-gradient-section">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-8">
              Past Events
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pastEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden border-0 bg-card/50 shadow-soft">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    {event.images[0] ? (
                      <img src={event.images[0].url} alt={event.title} className="w-full h-full object-cover opacity-70" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Calendar className="h-12 w-12 text-muted-foreground/30" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                        Completed
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">
                      {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                    <h3 className="font-heading font-semibold text-foreground line-clamp-1">
                      {event.title}
                    </h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
