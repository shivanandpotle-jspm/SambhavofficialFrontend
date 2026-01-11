import React from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Instagram, Users } from "lucide-react";

/* =====================
   REAL TEAM DATA
===================== */

const realTeamMembers = [
  /* ===== LEADERSHIP (1 Member) ===== */
  {
    id: "1",
    name: "Vikram Khade",
    role: "Founder & President",
    bio: "Visionary leader with 10+ years in social entrepreneurship.",
    image: "/public/assets/team/vikram-khade.jpg",
    category: "leadership",
    socialLinks: {
      linkedin: "https://linkedin.com/in/vikramkhade",
    },
  },
  
  /* ===== CORE TEAM ===== */
  {
    id: "2",
    name: "Pranav More",
    role: "Current President",
    bio: "Manages day-to-day operations and ensures smooth functioning.",
    image: "/public/assets/team/pranav-more.jpg",
    category: "core",
    socialLinks: {
      linkedin: "https://linkedin.com/in/pranavmore",
    },
  },
  {
    id: "3",
    name: "Tejas Ghondge",
    role: "Vice President ",
    bio: "Oversees educational programs and workshop delivery.",
    image: "/public/assets/team/tejas-ghondge.jpg",
    category: "core",
    socialLinks: {
      linkedin: "https://linkedin.com/in/tejasghondge",
    },
  },
  {
    id: "4",
    name: "Sanika Avhad",
    role: "Secretary",
    bio: "Drives brand awareness and digital marketing campaigns.",
    image: "/public/assets/team/sanika-avhad.jpg",
    category: "core",
    socialLinks: {
      linkedin: "https://linkedin.com/in/sanikaavhad",
    },
  },
  {
    id: "5",
    name: "Siddharth Gawali",
    role: "Treasurer",
    bio: "Handles budgeting and financial reporting.",
    image: "/public/assets/team/siddharth-gawali.jpg",
    category: "core",
    socialLinks: {
      linkedin: "https://linkedin.com/in/siddharthgawali",
    },
  },
  {
    id: "6",
    name: "OM Sonawane",
    role: "Core Team Member",
    bio: "Plans and executes community events and fundraisers.",
    image: "/public/assets/team/om-sonawane.jpg",
    category: "core",
    socialLinks: {
      linkedin: "https://linkedin.com/in/omsonawane",
    },
  },
  
  /* ===== BOARD OF DIRECTORS ===== */
  {
    id: "7",
    name: "Smita Swami",
    role: "PR Head",
    bio: "Education specialist focusing on youth development.",
    image: "/public/assets/team/smita-swami.jpg",
    category: "bod",
    socialLinks: {
      linkedin: "https://linkedin.com/in/smitaswami",
    },
  },
  {
    id: "8",
    name: "Devashri Gaud",
    role: "Board Member",
    bio: "Strategic advisor with expertise in organizational development.",
    image: "/public/assets/team/devashri-gaud.jpg",
    category: "bod",
    socialLinks: {
      linkedin: "https://linkedin.com/in/devashrigaud",
    },
  },
  {
    id: "9",
    name: "Shreyash Giramkar",
    role: "CSD ",
    bio: "Finance expert with background in non-profit management.",
    image: "/public/assets/team/shreyash-giramkar.jpg",
    category: "bod",
    socialLinks: {
      linkedin: "https://linkedin.com/in/shreyashgiramkar",
    },
  },
  {
    id: "10",
    name: "Shreyash Mangle",
    role: "Documentation Head",
    bio: "Community relations specialist with extensive network.",
    image: "/public/assets/team/shreyash-mangle.jpg",
    category: "bod",
    socialLinks: {
      linkedin: "https://linkedin.com/in/shreyashmangle",
    },
  },

  {
    id: "11",
    name: "Sarthak D",
    role: "Event Management Head",
    bio: "Community relations specialist with extensive network.",
    image: "/public/assets/team/sarthak-d.jpg",
    category: "bod",
    socialLinks: {
      linkedin: "https://linkedin.com/in/sarthakd",
    },
  },
  {
    id: "12",
    name: "Vidya Ghodke",
    role: "Membership Director",
    bio: "Community relations specialist with extensive network.",
    image: "/public/assets/team/vidya-ghodke.jpg",
    category: "bod",
    socialLinks: {
      linkedin: "https://linkedin.com/in/vidyaghodke",
    },
  },
    {
    id: "13",
    name: "Smit Nukte",
    role: "Social Media Head",
    bio: "Community relations specialist with extensive network.",
    image: "/public/assets/team/smit-nukte.jpg",
    category: "bod",
    socialLinks: {
      linkedin: "https://linkedin.com/in/smitnukte",
    },
  },
    {
    id: "14",
    name: "shivanand Potle",
    role: "Technical  Head",
    bio: "Community relations specialist with extensive network.",
    image: "/public/assets/team/shivanand-potle.jpg",
    category: "bod",
    socialLinks: {
      linkedin: "https://linkedin.com/in/shivanandpotle",
    },
  },
    {
    id: "15",
    name: "Adityaraj Kshetre",
    role: "jounior CSD",
    bio: "Community relations specialist with extensive network.",
    image: "/public/assets/team/adityaraj-kshetre.jpg",
    category: "bod",
    socialLinks: {
      linkedin: "https://linkedin.com/in/adityarajkshetre",
    },
  },
];

/* =====================
   Animations - FIXED VARIANTS
===================== */

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// FIXED: Define cardHover as Variants type
const cardHover: Variants = {
  initial: { y: 0, scale: 1 },
  hover: {
    y: -10,
    scale: 1.04,
    transition: { type: "spring", stiffness: 220, damping: 18 },
  },
};

/* =====================
   Component
===================== */

export const TeamPage: React.FC = () => {
  const teamMembers = realTeamMembers;

  // Filter members by category
  const leadership = teamMembers.filter((m) => m.category === "leadership");
  const coreTeam = teamMembers.filter((m) => m.category === "core");
  const bod = teamMembers.filter((m) => m.category === "bod");

  // Card component - ALL CARDS SAME SIZE
  const TeamMemberCard = ({
    member,
  }: {
    member: typeof teamMembers[number];
  }) => (
    <motion.div
      variants={fadeUp}
      initial="initial"
      whileHover="hover"
      animate="initial"
    >
      <motion.div variants={cardHover}>
        <Card className="group overflow-hidden border-0 shadow-card hover:shadow-glow transition-all duration-500 bg-card">
          <CardContent className="p-0">
            {/* ALL CARDS: aspect-square (same height as width) */}
            <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-12 w-12 text-primary/50" />
                  </div>
                </div>
              )}

              {/* Social Overlay - FIXED: Only show if links exist */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <div className="flex items-center gap-2">
                  {/* Only show LinkedIn if it exists */}
                  {member.socialLinks && member.socialLinks.linkedin && (
                    <a
                      href={member.socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button variant="glass" size="icon" className="h-9 w-9">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                  {/* Only show Twitter if it exists
                  {member.socialLinks && member.socialLinks.twitter && (
                    <a
                      href={member.socialLinks.twitter}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button variant="glass" size="icon" className="h-9 w-9">
                        <Twitter className="h-4 w-4" />
                      </Button>
                    </a>
                  )} */}
                  {/* Only show Instagram if it exists */}
                  {/* {member.socialLinks && member.socialLinks.instagram && (
                    <a
                      href={member.socialLinks.instagram}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button variant="glass" size="icon" className="h-9 w-9">
                        <Instagram className="h-4 w-4" />
                      </Button>
                    </a>
                  )} */}
                </div>
              </div>
            </div>

            {/* Card content - ALL SAME */}
            <div className="p-5 text-center">
              <h3 className="font-heading text-lg font-semibold mb-1">
                {member.name}
              </h3>
              <p className="text-primary text-sm font-medium mb-2">
                {member.role}
              </p>
              {/* Bio shown for ALL cards */}
              {member.bio && (
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {member.bio}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="pt-24 overflow-hidden">
      {/* HERO */}
      <section className="py-16 bg-gradient-section relative overflow-hidden">
        <motion.div
          className="container mx-auto px-4 relative z-10"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div
            className="max-w-3xl mx-auto text-center"
            variants={fadeUp}
          >
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
              Meet Our <span className="text-gradient">Team</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Passionate individuals dedicated to making a difference.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* EMPTY STATE */}
      {teamMembers.length === 0 && (
        <div className="py-16 text-center text-muted-foreground">
          Team information will be updated soon.
        </div>
      )}

      {/* LEADERSHIP (1 Member) */}
      {leadership.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-heading font-bold mb-12">
              Leadership
            </h2>

            <motion.div
              className="max-w-sm mx-auto"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {leadership.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CORE TEAM */}
      {coreTeam.length > 0 && (
        <section className="py-16 bg-gradient-section">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-heading font-bold mb-12">
              Core Team
            </h2>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {coreTeam.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* BOARD OF DIRECTORS */}
      {bod.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-heading font-bold mb-12">
              Board of Directors
            </h2>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {bod.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2
            className="font-heading text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: "#17a8db" }}
          >
            Want to Join Our Team?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            We're always looking for passionate individuals who share our vision.
          </p>
          <Link to="/membership">
            <Button variant="warm" size="lg">
              Become a Member
            </Button>
          </Link>
        </div>
</section>
    </div>
  );
};