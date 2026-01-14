import React from "react";
import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

/* =====================
   DYNAMIC ASSET HELPER
===================== */
const getTeamImage = (name: string) => {
  // If this file is in src/pages/, use ../assets/teams/
  // If this file is in src/, use ./assets/teams/
  return new URL(`../assets/teams/${name}`, import.meta.url).href;
};

/* =====================
   REAL TEAM DATA
===================== */
const realTeamMembers = [
  {
    id: "1",
    name: "Vikram Khade",
    role: "Founder & President",
    bio: "Visionary leader with 10+ years in social entrepreneurship.",
    image: getTeamImage("vikram-khade.jpg"),
    category: "leadership",
  },
  {
    id: "2",
    name: "Pranav More",
    role: "Current President",
    bio: "Manages day-to-day operations and ensures smooth functioning.",
    image: getTeamImage("pranav-more.jpeg"), 
    category: "core",
  },
  {
    id: "4",
    name: "Sanika Avhad",
    role: "Secretary",
    image: getTeamImage("sanika-avhad.jpg"),
    category: "core",
  },
  {
    id: "5",
    name: "Siddharth Gawali",
    role: "Treasurer",
    image: getTeamImage("siddharth-gawali.jpg"),
    category: "core",
  },
  {
    id: "6",
    name: "OM Sonawane",
    role: "Core Team Member",
    image: getTeamImage("om-sonawane.PNG"), 
    category: "core",
  },
  {
    id: "14",
    name: "shivanand Potle",
    role: "TECHNICAL TEAM Head",
    image: getTeamImage("shivanand-potle.jpg"),
    category: "bod",
  },
    {
    id: "21",
    name: "Adityaraj K",
    role: "JR. CSD",
    image: getTeamImage("adityaraj-k.jpg"),
    category: "bod",
  },
  {
    id: "17",
    name: "Ruchita P",
    role: "GRAPHICS TEAM HEAD",
    image: getTeamImage("ruchita-p.jpg"),
    category: "bod",
  },
  {
    id: "18",
    name: "Rushikesh.Z",
    role: "VIDEO TEAM HEAD",
    image: getTeamImage("rushikesh-z.jpg"),
    category: "bod",
  },
  {
    id: "19",
    name: "Tejaswini E",
    role: "PR TEAM CO-HEAD",
    image: getTeamImage("tejaswini-e.jpg"),
    category: "bod",
  },
  {
    id: "16",
    name: "Nitin B",
    role: "Core Team Member",
    image: getTeamImage("nitin-b.png"),
    category: "core",
  },
  {
    id: "20",
    name: "Ranjeet K",
    role: "EVENT MANAGEMENT CO-HEAD",
    image: getTeamImage("ranjeet-k.jpg"),
    category: "bod",
  },
 
];

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
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <motion.div variants={cardHover} initial="initial" whileHover="hover">
        <Card className="group overflow-hidden border-2 border-[#d4af37] shadow-[5px_5px_0px_#3c2a1a] transition-all duration-500 bg-[#fdf5e6] rounded-none relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
          <CardContent className="p-0 relative z-10">
            <div className="aspect-square relative overflow-hidden border-b-2 border-[#d4af37] bg-[#1a120b]">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 sepia-[0.2]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/400?text=Member";
                  }}
                />
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
        <h1 className="text-5xl font-bold mb-12 text-[#d4af37]" style={{ fontFamily: "serif" }}>The Order of Sambhav</h1>
        
        {/* Leadership */}
        <div className="flex justify-center mb-16">
          {leadership.map(m => <div key={m.id} className="w-full max-w-sm"><TeamMemberCard member={m} /></div>)}
        </div>

        {/* Core Team */}
        <h2 className="text-3xl mb-8 text-[#d4af37]">Core Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {coreTeam.map(m => <TeamMemberCard key={m.id} member={m} />)}
        </div>

        {/* BOD */}
        <h2 className="text-3xl mb-8 text-[#d4af37]">Board of Directors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {bod.map(m => <TeamMemberCard key={m.id} member={m} />)}
        </div>
      </div>
    </div>
  );
};
