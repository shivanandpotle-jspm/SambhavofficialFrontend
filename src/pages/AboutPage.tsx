import React from "react";
import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  Globe,
  TrendingUp,
  Lightbulb,
  CheckCircle,
  Sparkles,
  ScrollText,
  Wand2,
} from "lucide-react";

/* =======================
   Animation Variants (Preserved)
======================= */

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const cardHover: Variants = {
  hover: {
    y: -10,
    scale: 1.04,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 18,
    },
  },
};

/* =======================
   Data (Preserved)
======================= */

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We lead with empathy and understanding in everything we do.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building strong bonds that lift everyone together.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Striving for the highest standards in all our programs.",
  },
  {
    icon: Globe,
    title: "Inclusivity",
    description: "Welcoming all backgrounds and perspectives.",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    description: "Fostering continuous learning and development.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Embracing new ideas to solve old challenges.",
  },
];

const timeline = [
  {
    year: "2020",
    title: "Foundation Established",
    description: "Started with a vision to empower communities through education.",
  },
  {
    year: "2021",
    title: "Financial Literacy Program",
    description: "Launched our first large-scale financial education workshops.",
  },
  {
    year: "2022",
    title: "Mental Health Initiative",
    description: "Expanded into mental wellness and emotional health programs.",
  },
  {
    year: "2023",
    title: "Entrepreneurship Hub",
    description: "Built a platform for aspiring entrepreneurs.",
  },
  {
    year: "2024",
    title: "10,000 Lives Impacted",
    description: "Achieved a major milestone of social impact.",
  },
];

/* =======================
   Component
======================= */

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 overflow-hidden bg-[#1a120b] text-[#f3e5ab] selection:bg-[#741b1b] selection:text-white font-serif">
      {/* Background Parchment Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] z-0"></div>

      {/* Hero Section */}
      <section className="py-24 relative z-10">
        <motion.div
          className="container mx-auto px-4 relative z-10"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={fadeUp}
          >
            <h1 
              className="font-serif text-4xl sm:text-6xl font-bold mb-10 text-[#d4af37] drop-shadow-[2px_2px_0px_#741b1b]"
              style={{ fontFamily: "'Hogwarts', serif" }}
            >
              About <span className="italic">Sambhav Impact</span> Foundation
            </h1>

            <Card className="rounded-none border-l-8 border-[#741b1b] bg-[#fdf5e6] shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
              <CardContent className="p-8 text-left relative z-10">
                <div className="flex justify-center mb-6 opacity-20">
                    <ScrollText className="h-12 w-12 text-[#741b1b]" />
                </div>
                <p className="text-lg text-[#2d1e12] leading-relaxed whitespace-pre-line italic">
                  With a strong team of 95+ volunteers, primarily engineering students from different colleges, Sambhav works in diverse domains such as innovation, social service, youth empowerment, entrepreneurship, financial literacy, and mental & physical fitness.
                  {"\n\n"}
                  <span className="font-bold text-[#741b1b] not-italic uppercase tracking-widest text-sm">Our Key Work Areas</span>
                  {"\n"}🌱 Social Service: Donation drives, awareness campaigns, and rural outreach activities for the underprivileged.  
                  {"\n"}💡 Innovation & Entrepreneurship: Hackathons, idea challenges, and summits promoting creative problem-solving.  
                  {"\n"}💬 Youth Empowerment: Skill development sessions, motivational talks, and leadership programs.  
                  {"\n"}🧠 Mental & Physical Fitness: Activities promoting mindfulness, fitness, and emotional well-being.  
                  {"\n"}💰 Financial Literacy: Sessions and content aimed at improving financial awareness among students.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* Mission & Vision - Medieval Shield Style */}
      <section className="py-24 relative z-10">
        <motion.div
          className="container mx-auto px-4 grid md:grid-cols-2 gap-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {[{ icon: Target, title: "Our Mission" }, { icon: Eye, title: "Our Vision" }].map(
            (item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover="hover"
                >
                  <motion.div variants={cardHover}>
                    <Card className="rounded-none border-2 border-[#d4af37] bg-[#2d1e12] shadow-[10px_10px_0px_#741b1b]">
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 mx-auto rounded-full border-4 border-[#d4af37] bg-[#741b1b] flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                          <Icon className="h-8 w-8 text-[#f3e5ab]" />
                        </div>
                        <h2 className="font-serif text-3xl font-bold mb-4 text-[#d4af37]" style={{ fontFamily: "'Hogwarts', serif" }}>
                          {item.title}
                        </h2>
                        <p className="text-[#f3e5ab]/80 leading-relaxed italic">
                          Empowering individuals and communities to reach their
                          full potential through sustainable programs.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              );
            }
          )}
        </motion.div>
      </section>

      {/* Core Values - Wax Seal Style */}
      <section className="py-24 relative z-10 bg-[#120c08]">
        <motion.div
          className="container mx-auto px-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2
            className="font-serif text-4xl font-bold text-center mb-16 text-[#d4af37]"
            style={{ fontFamily: "'Hogwarts', serif" }}
            variants={fadeUp}
          >
            The Sacred Values
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover="hover"
                >
                  <motion.div variants={cardHover}>
                    <Card className="rounded-none border-b-4 border-[#741b1b] bg-[#fdf5e6] group">
                      <CardContent className="p-8 text-center">
                        <div className="w-14 h-14 mx-auto rounded-full bg-[#741b1b] flex items-center justify-center mb-4 border-2 border-[#d4af37] group-hover:rotate-[360deg] transition-transform duration-700">
                          <Icon className="h-6 w-6 text-[#f3e5ab]" />
                        </div>
                        <h3 className="font-serif text-xl font-bold mb-2 text-[#2d1e12]">
                          {value.title}
                        </h3>
                        <p className="text-[#5d4037] text-sm italic">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Timeline - Ancient Scroll Style */}
      <section className="py-24 relative z-10">
        <motion.div
          className="container mx-auto px-4 max-w-3xl"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2
            className="font-serif text-4xl font-bold text-center mb-16 text-[#d4af37]"
            style={{ fontFamily: "'Hogwarts', serif" }}
            variants={fadeUp}
          >
            Our Chronicle
          </motion.h2>

          <div className="space-y-12 relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#d4af37]/30"></div>

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="relative z-10"
              >
                 <div className="flex items-center justify-center mb-4">
                    <div className="bg-[#741b1b] border-2 border-[#d4af37] text-[#f3e5ab] px-4 py-1 rounded-none font-bold font-serif tracking-widest">
                        {item.year}
                    </div>
                 </div>
                 <Card className="rounded-none bg-[#fdf5e6] border-t-4 border-[#d4af37] shadow-xl">
                    <CardContent className="p-6 text-center">
                        <h3 className="font-serif text-2xl font-bold mb-2 text-[#2d1e12]">
                            {item.title}
                        </h3>
                        <p className="text-[#5d4037] italic">{item.description}</p>
                    </CardContent>
                 </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* What Sets Us Apart - The Great Seal */}
      <section className="py-24 relative z-10 bg-[#741b1b] text-[#f3e5ab] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
        <motion.div
          className="container mx-auto px-4 max-w-4xl relative z-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2
            className="font-serif text-4xl font-bold text-center mb-12 text-[#d4af37] uppercase tracking-[0.2em]"
            variants={fadeUp}
          >
            The Distinction of Sambhav
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-8">
            {[
              "Holistic approach to community development",
              "Expert-led workshops and seminars",
              "Personalized mentorship programs",
              "Strong industry network",
              "Transparent and accountable governance",
              "Data-driven impact measurement",
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 p-5 border border-[#d4af37]/40 bg-black/20 backdrop-blur-md"
              >
                <Wand2 className="h-6 w-6 text-[#d4af37]" />
                <span className="font-serif italic text-lg">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};