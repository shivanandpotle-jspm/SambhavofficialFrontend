import React from "react";
import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

/* =====================
   DYNAMIC ASSET HELPER
===================== */
const getTeamImage = (name: string) => {
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
    id: "23",
    name: "Shreyas G",
    role: "CSD",
    image: getTeamImage("shreyas-g.jpg"),
    category: "bod",
  },
  {
    id: "14",
    name: "shivanand Potle",
    role: "TECHNICAL HEAD",
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
    id: "22",
    name: "Shreyash M",
    role: "DOCUMENTATION HEAD",
    image: getTeamImage("shreyash-m.jpg"),
    category: "bod",
  },
  {
    id: "17",
    name: "Ruchita P",
    role: "GRAPHICS HEAD",
    image: getTeamImage("ruchita-p.jpg"),
    category: "bod",
  },
  {
    id: "18",
    name: "Rushikesh.Z",
    role: "VIDEO HEAD",
    image: getTeamImage("rushikesh-z.jpg"),
    category: "bod",
  },
  {
    id: "19",
    name: "Tejaswini E",
    role: "PR CO-HEAD",
    image: getTeamImage("tejaswini-e.jpg"),
    category: "bod",
  },

  {
    id: "20",
    name: "Ranjeet K",
    role: "EVENT CO-HEAD",
    image: getTeamImage("ranjeet-k.jpg"),
    category: "bod",
  },
     {
    id: "16",
    name: "Nitin B",
    role: "Core Member",
    image: getTeamImage("nitin-b.png"),
    category: "bod",
  },


];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export const TeamPage: React.FC = () => {
  const leadership = realTeamMembers.filter((m) => m.category === "leadership");
  const coreTeam = realTeamMembers.filter((m) => m.category === "core");
  const bod = realTeamMembers.filter((m) => m.category === "bod");

  const TeamMemberCard = ({ member }: { member: typeof realTeamMembers[number] }) => (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <Card className="group overflow-hidden border border-[#d4af37] shadow-[3px_3px_0px_#3c2a1a] bg-[#fdf5e6] rounded-none relative h-full">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
        <CardContent className="p-0 relative z-10 flex flex-col h-full">
          <div className="aspect-square relative overflow-hidden border-b border-[#d4af37] bg-[#1a120b]">
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/400?text=Member";
                }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Users className="h-8 w-8 text-[#d4af37]/50" />
              </div>
            )}
          </div>
          <div className="p-3 sm:p-4 text-center flex-grow">
            <h3 className="font-serif text-sm sm:text-lg font-bold text-[#2d1e12] leading-tight mb-1">{member.name}</h3>
            <p className="text-[#741b1b] text-[9px] sm:text-xs font-bold uppercase tracking-tighter sm:tracking-widest font-serif italic">{member.role}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="pt-20 min-h-screen bg-[#1a120b] text-[#f3e5ab] font-serif relative overflow-hidden px-2 sm:px-4">
      <div className="container mx-auto py-10 text-center relative z-10">
        <h1 className="text-3xl sm:text-5xl font-bold mb-12 text-[#d4af37]" style={{ fontFamily: "serif" }}>
          The Order of Sambhav
        </h1>
        
        {/* Leadership */}
        <div className="flex justify-center mb-16 px-4">
          {leadership.map(m => (
            <div key={m.id} className="w-full max-w-[280px] sm:max-w-sm">
               <TeamMemberCard member={m} />
            </div>
          ))}
        </div>

        {/* Core Team - 2 Columns Mobile, 3-4 Columns Desktop */}
        <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl mb-6 text-[#d4af37] font-bold border-b border-[#d4af37]/30 pb-2 inline-block">Core Team</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-8">
                {coreTeam.map(m => <TeamMemberCard key={m.id} member={m} />)}
            </div>
        </section>

        {/* BOD - 2 Columns Mobile, 3-4 Columns Desktop */}
        <section className="pb-10">
            <h2 className="text-2xl sm:text-3xl mb-6 text-[#d4af37] font-bold border-b border-[#d4af37]/30 pb-2 inline-block">Board of Directors</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-8">
                {bod.map(m => <TeamMemberCard key={m.id} member={m} />)}
            </div>
        </section>
      </div>
    </div>
  );
};

