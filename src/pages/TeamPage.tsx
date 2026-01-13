import React from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Users, Sparkles, ScrollText, Wand2 } from "lucide-react";

/* =====================
   TEAM ASSETS (Corrected Paths for Vite Production)
===================== */
// We use "/assets/..." to point to the public folder correctly
import vikramImg from "/assets/team/vikram-khade.jpg";
import sanikaImg from "/assets/team/sanika-avhad.jpg";
import siddharthImg from "/assets/team/siddharth-gawali.jpg";
import shivanandImg from "/assets/team/shivanand-potle.jpg";
import pranavImg from "/assets/team/pranav-more.jpg";

import nitinImg from "/assets/team/nitin-b.png";
import omImg from "/assets/team/om-sonawane.PNG";
import ruchitaImg from "/assets/team/ruchita-p.jpg";
import rushikeshImg from "/assets/team/rushikesh-z.jpg";
import sarthakImg from "/assets/team/sarthak-d.jpg";
import shreyashGImg from "/assets/team/shreyas-g.jpg";
import shreyashMImg from "/assets/team/shreyash-m.jpg";
import smitaImg from "/assets/team/smita-swami.jpg";
import tejaswiniImg from "/assets/team/tejaswini-e.jpg";
import vidyaImg from "/assets/team/vidya-g.jpg";

/* =====================
   REAL TEAM DATA
===================== */
const realTeamMembers = [
  /* ===== LEADERSHIP ===== */
  {
    id: "1",
    name: "Vikram Khade",
    role: "Founder & President",
    bio: "Visionary leader with 10+ years in social entrepreneurship.",
    image: vikramImg,
    category: "leadership",
    socialLinks: { linkedin: "https://linkedin.com/in/vikramkhade" },
  },
  
  /* ===== CORE TEAM ===== */
  {
    id: "2",
    name: "Pranav More",
    role: "Current President",
    bio: "Manages day-to-day operations and ensures smooth functioning.",
    image: pranavImg, 
    category: "core",
    socialLinks: { linkedin: "https://linkedin.com/in/pranavmore" },
  },
  {
    id: "3",
    name: "Tejas Ghondge",
    role: "Vice President",
    bio: "Oversees educational programs and workshop delivery.",
    image: "", // Updated to fallback if no specific image
    category: "core",
    socialLinks: { linkedin: "https://linkedin.com/in/tejasghondge" },
  },
  {
    id: "4",
    name: "Sanika Avhad",
    role: "Secretary",
    bio: "Drives brand awareness and digital marketing campaigns.",
    image: sanikaImg,
    category: "core",
    socialLinks: { linkedin: "https://linkedin.com/in/sanikaavhad" },
  },
  {
    id: "5",
    name: "Siddharth Gawali",
    role: "Treasurer",
    bio: "Handles budgeting and financial reporting.",
    image: siddharthImg,
    category: "core",
    socialLinks: { linkedin: "https://linkedin.com/in/siddharthgawali" },
  },
  {
    id: "6",
    name: "OM Sonawane",
    role: "Core Team Member",
    bio: "Plans and executes community events and fundraisers.",
    image: omImg, 
    category: "core",
    socialLinks: { linkedin: "https://linkedin.com/in/omsonawane" },
  },

  /* ===== BOARD OF DIRECTORS ===== */
  {
    id: "7",
    name: "Smita Swami",
    role: "PR HEAD",
    bio: "Education specialist focusing on youth development.",
    image: smitaImg, 
    category: "bod",
    socialLinks: { linkedin: "https://linkedin.com/in/smitaswami" },
  },
  {
    id: "9",
    name: "Shreyash Giramkar",
    role: "CSD",
    bio: "Finance expert with background in non-profit management.",
    image: shreyashGImg, 
    category: "bod",
    socialLinks: { linkedin: "https://linkedin.com/in/shreyashgiramkar" },
  },
  {
    id: "10",
    name: "Shreyash Mangle",
    role: "DOCUMENTATION HEAD",
    bio: "Community relations specialist with extensive network.",
    image: shreyashMImg, 
    category: "bod",
    socialLinks: { linkedin: "https://linkedin.com/in/shreyashmangle" },
  },
  {
    id: "11",
    name: "Sarthak D",
    role: "EVENT MANAGEMENT HEAD",
    bio: "Expert in orchestrating grand gatherings and events.",
    image: sarthakImg, 
    category: "bod",
    socialLinks: { linkedin: "https://linkedin.com/in/sarthakd" },
  },
  {
    id: "12",
    name: "Vidya Ghodke",
    role: "MEMBERSHIP DIRECTOR",
    bio: "Focuses on community outreach and wizard enlistment.",
    image: vidyaImg, 
    category: "bod",
    socialLinks: { linkedin: "https://linkedin.com/in/vidyaghodke" },
  },
  {
    id: "14",
    name: "shivanand Potle",
    role: "TECHNICAL TEAM Head",
    bio: "Master of digital scrolls and technical infrastructure.",
    image: shivanandImg,
    category: "bod",
    socialLinks: { linkedin: "https://linkedin.com/in/shivanandpotle" },
  },
  {
    id: "17",
    name: "Ruchita P",
    role: "GRAPHICS TEAM HEAD",
    bio: "Strategic oversight and community development.",
    image: ruchitaImg,
    category: "bod",
    socialLinks: { linkedin: "#" },
  },
  {
    id: "18",
    name: "Rushikesh.Z",
    role: "VIDEO TEAM HEAD",
    bio: "Expert in coordinating specialized social initiatives.",
    image: rushikeshImg,
    category: "bod",
    socialLinks: { linkedin: "#" },
  },
  {
    id: "19",
    name: "Tejaswini E",
    role: "PR TEAM CO-HEAD",
    bio: "Committed to mental health and well-being advocacy.",
    image: tejaswiniImg,
    category: "bod",
    socialLinks: { linkedin: "#" },
  },
  {
    id: "16",
    name: "Nitin B",
    role: "Core Team Member",
    bio: "Dedicated wizard supporting organizational growth.",
    image: nitinImg,
    category: "core",
    socialLinks: { linkedin: "#" },
  },
];

/* =====================
   Animations & Component Logic
===================== */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
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

const cardHover: Variants = {
  initial: { y: 0, scale: 1 },
  hover: {
    y: -10,
    scale: 1.04,
    transition: { type: "spring", stiffness: 220, damping: 18 },
  },
};

export const TeamPage: React.FC = () => {
  const leadership = realTeamMembers.filter((m) => m.category === "leadership");
  const coreTeam = realTeamMembers.filter((m) => m.category === "core");
  const bod = realTeamMembers.filter((m) => m.category === "bod");

  const TeamMemberCard = ({ member }: { member: typeof realTeamMembers[number] }) => (
    <motion.div variants={fadeUp} initial="initial" whileHover="hover" animate="initial">
      <motion.div variants={cardHover}>
        <Card className="group overflow-hidden border-2 border-[#d4af37] shadow-[5px_5px_0px_#3c2a1a] transition-all duration-500 bg-[#fdf5e6] rounded-none relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
          <CardContent className="p-0 relative z-10">
            <div className="aspect-square relative overflow-hidden border-b-2 border-[#d4af37] bg-[#1a120b]">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 sepia-[0.2]"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-2 border-[#d4af37]/30 flex items-center justify-center">
                    <Users className="h-12 w-12 text-[#d4af37]/50" />
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#741b1b]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <div className="flex items-center gap-2">
                  {member.socialLinks?.linkedin && (
                    <a href={member.socialLinks.linkedin} target="_blank" rel="noreferrer">
                      <Button className="bg-[#d4af37] hover:bg-[#f3e5ab] text-[#1a120b] h-9 w-9 rounded-none">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="p-5 text-center">
              <h3 className="font-serif text-xl font-bold mb-1 text-[#2d1e12]">{member.name}</h3>
              <p className="text-[#741b1b] text-xs font-bold uppercase tracking-widest mb-2 font-serif italic">{member.role}</p>
              {member.bio && <p className="text-[#5d4037] text-sm font-serif italic line-clamp-2 leading-relaxed">{member.bio}</p>}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="pt-24 min-h-screen bg-[#1a120b] text-[#f3e5ab] selection:bg-[#741b1b] selection:text-white font-serif relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
      <section className="py-16 relative z-10">
        <motion.div className="container mx-auto px-4 text-center" variants={container} initial="hidden" animate="show">
          <motion.div className="max-w-3xl mx-auto" variants={fadeUp}>
            <h1 className="text-5xl font-bold mb-6 text-[#d4af37] drop-shadow-[2px_2px_0px_#741b1b]" style={{ fontFamily: "'Hogwarts', serif" }}>
              The Order of <span className="italic">Sambhav</span>
            </h1>
            <p className="text-lg italic text-[#f3e5ab]/70 flex items-center justify-center gap-2">
              <Wand2 className="h-5 w-5 text-[#d4af37]" /> Dedicated wizards committed to transforming the realm. <Wand2 className="h-5 w-5 text-[#d4af37]" />
            </p>
          </motion.div>
        </motion.div>
      </section>

      {leadership.length > 0 && (
        <section className="py-16 relative z-10">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-4xl font-bold mb-12 text-[#d4af37] flex items-center justify-center gap-4" style={{ fontFamily: "'Hogwarts', serif" }}>
              <Sparkles className="h-6 w-6" /> Leadership <Sparkles className="h-6 w-6" />
            </h2>
            <motion.div className="max-w-sm mx-auto" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {leadership.map((member) => <TeamMemberCard key={member.id} member={member} />)}
            </motion.div>
          </div>
        </section>
      )}

      {coreTeam.length > 0 && (
        <section className="py-16 relative z-10 border-y border-[#d4af37]/10 bg-[#2d1e12]/30">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-4xl font-bold mb-12 text-[#d4af37]" style={{ fontFamily: "'Hogwarts', serif" }}>The Core Guardians</h2>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {coreTeam.map((member) => <TeamMemberCard key={member.id} member={member} />)}
            </motion.div>
          </div>
        </section>
      )}

      {bod.length > 0 && (
        <section className="py-16 relative z-10">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-4xl font-bold mb-12 text-[#d4af37]" style={{ fontFamily: "'Hogwarts', serif" }}>The Council of Directors</h2>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {bod.map((member) => <TeamMemberCard key={member.id} member={member} />)}
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-24 relative z-10 bg-[#741b1b] text-[#f3e5ab] overflow-hidden border-t-4 border-[#d4af37]">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-[#d4af37]" style={{ fontFamily: "'Hogwarts', serif" }}>Answer the Call of the Order</h2>
          <p className="text-[#f3e5ab]/80 max-w-xl mx-auto mb-10 italic text-lg leading-relaxed">We seek brave souls who share our vision to empower and evolve the realm.</p>
          <Link to="/membership">
            <Button className="bg-[#d4af37] hover:bg-[#f3e5ab] text-[#1a120b] font-bold py-6 px-10 rounded-none shadow-[4px_4px_0px_#3c1010] active:shadow-none transition-all uppercase tracking-[0.2em] font-serif">
              <ScrollText className="h-5 w-5 mr-3" /> Sign the Membership Scroll
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
