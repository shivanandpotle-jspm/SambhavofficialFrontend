import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Linkedin, Twitter, Instagram, Users } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

export const TeamPage: React.FC = () => {
  const { teamMembers } = useAdmin();

  const getRoleCategory = (role: string): 'leadership' | 'core' | 'volunteer' => {
    const lowerRole = role.toLowerCase();
    if (lowerRole.includes('founder') || lowerRole.includes('ceo') || lowerRole.includes('director') || lowerRole.includes('head')) {
      return 'leadership';
    }
    if (lowerRole.includes('manager') || lowerRole.includes('lead') || lowerRole.includes('coordinator')) {
      return 'core';
    }
    return 'volunteer';
  };

  const leadership = teamMembers.filter(m => getRoleCategory(m.role) === 'leadership');
  const coreTeam = teamMembers.filter(m => getRoleCategory(m.role) === 'core');
  const volunteers = teamMembers.filter(m => getRoleCategory(m.role) === 'volunteer');

  const TeamMemberCard = ({ member, featured = false }: { member: typeof teamMembers[0]; featured?: boolean }) => (
    <Card className={`group overflow-hidden border-0 shadow-card hover:shadow-glow transition-all duration-500 ${featured ? 'bg-card' : 'bg-card'}`}>
      <CardContent className="p-0">
        <div className={`${featured ? 'aspect-[4/5]' : 'aspect-square'} relative overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20`}>
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-12 w-12 text-primary/50" />
              </div>
            </div>
          )}
          
          {/* Social Links Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <div className="flex items-center gap-2">
              {member.socialLinks.linkedin && (
                <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <Button variant="glass" size="icon" className="h-9 w-9">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </a>
              )}
              {member.socialLinks.twitter && (
                <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <Button variant="glass" size="icon" className="h-9 w-9">
                    <Twitter className="h-4 w-4" />
                  </Button>
                </a>
              )}
              {member.socialLinks.instagram && (
                <a href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                  <Button variant="glass" size="icon" className="h-9 w-9">
                    <Instagram className="h-4 w-4" />
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-5 text-center">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
            {member.name}
          </h3>
          <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
          {featured && member.bio && (
            <p className="text-muted-foreground text-sm line-clamp-2">{member.bio}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-section relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Meet Our <span className="text-gradient">Team</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Passionate individuals dedicated to making a difference in our community.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      {leadership.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Leadership
              </h2>
              <p className="text-muted-foreground">Guiding our mission with vision and dedication</p>
            </div>

            <div className={`grid ${leadership.length === 1 ? 'max-w-sm mx-auto' : leadership.length === 2 ? 'max-w-2xl mx-auto grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'} gap-8`}>
              {leadership.map((member) => (
                <TeamMemberCard key={member.id} member={member} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Core Team */}
      {coreTeam.length > 0 && (
        <section className="py-16 bg-gradient-section">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Core Team
              </h2>
              <p className="text-muted-foreground">The driving force behind our programs</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {coreTeam.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Volunteers */}
      {volunteers.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Volunteers
              </h2>
              <p className="text-muted-foreground">Hearts that make our work possible</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {volunteers.map((member) => (
                <Card key={member.id} className="overflow-hidden border-0 shadow-soft">
                  <CardContent className="p-0">
                    <div className="aspect-square relative overflow-hidden bg-muted">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Users className="h-8 w-8 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                    <div className="p-3 text-center">
                      <h3 className="font-medium text-sm text-foreground truncate">{member.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Join CTA */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
            Want to Join Our Team?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            We're always looking for passionate individuals who share our vision. Join us as a volunteer or become a member.
          </p>
          <Button variant="warm" size="lg">
            Get Involved
          </Button>
        </div>
      </section>
    </div>
  );
};
