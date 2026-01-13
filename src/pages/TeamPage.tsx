import React from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Users, Sparkles, ScrollText, Wand2 } from "lucide-react";

/* =====================
   TEAM ASSETS (Corrected for src/assets folder)
===================== */
import vikramImg from "@/assets/teams/vikram-khade.jpg";
import sanikaImg from "@/assets/teams/sanika-avhad.jpg";
import siddharthImg from "@/assets/teams/siddharth-gawali.jpg";
import shivanandImg from "@/assets/teams/shivanand-potle.jpg";
import pranavImg from "@/assets/teams/pranav-more.jpg";
import nitinImg from "@/assets/teams/nitin-b.png";
import omImg from "@/assets/teams/om-sonawane.PNG";
import ruchitaImg from "@/assets/team/ruchita-p.jpg";
import rushikeshImg from "@/assets/teamss/rushikesh-z.jpg";
import sarthakImg from "@/assets/teams/sarthak-d.jpg";
import shreyashGImg from "@/assets/teams/shreyas-g.jpg";
import shreyashMImg from "@/assets/teams/shreyash-m.jpg";
import smitaImg from "@/assets/teams/smita-swami.jpg";
import tejaswiniImg from "@/assets/teams/tejaswini-e.jpg";
import vidyaImg from "@/assets/teams/vidya-g.jpg";

const realTeamMembers = [
  {
    id: "1",
    name: "Vikram Khade",
    role: "Founder & President",
    bio: "Visionary leader with 10+ years in social entrepreneurship.",
    image: vikramImg,
    category: "leadership",
    socialLinks: { linkedin: "https://linkedin.com/in/vikramkhade" },
  },
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
  {
    id: "16",
    name: "Nitin B",
    role: "Core Team Member",
    bio: "Dedicated wizard supporting organizational growth.",
    image: nitinImg,
    category: "core",
    socialLinks: { linkedin: "#" },
  },
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
    bio: "Visionary graphics lead for the Order.",
    image: ruchitaImg,
    category: "bod",
    socialLinks: { linkedin: "#" },
  },
  {
    id: "18",
    name: "Rushikesh.Z",
    role: "VIDEO TEAM HEAD",
    bio: "Expert in visual storytelling and social initiatives.",
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
];

/* Animations and Component Logic stay the same... */
const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const fadeUp: Variants = { 
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" }, 
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } } 
};
const cardHover: Variants = { 
  initial: { y: 0, scale: 1 }, 
  hover: { y: -10, scale: 1.04, transition: { type: "spring", stiffness: 220, damping: 18 } } 
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
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 sepia-[0.2]" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                   <Users className="h-12 w-12 text-[#d4af37]/50" />
                </div>
              )}
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
    <div className="pt-24 min-h-screen bg-[#1a120b] text-[#f3e5ab] font-serif relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 text-center relative z-10">
        <h1 className="text-5xl font-bold mb-6 text-[#d4af37]" style={{ fontFamily: "'Hogwarts', serif" }}>The Order of Sambhav</h1>
        {/* Render sections as before... */}
        <section className="mb-16">
          <h2 className="text-3xl mb-8 text-[#d4af37]">Leadership</h2>
          <div className="flex justify-center"><TeamMemberCard member={leadership[0]} /></div>
        </section>
        <section className="mb-16">
          <h2 className="text-3xl mb-8 text-[#d4af37]">Core Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">{coreTeam.map(m => <TeamMemberCard key={m.id} member={m} />)}</div>
        </section>
        <section>
          <h2 className="text-3xl mb-8 text-[#d4af37]">Board of Directors</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">{bod.map(m => <TeamMemberCard key={m.id} member={m} />)}</div>
        </section>
      </div>
    </div>
  );
};

