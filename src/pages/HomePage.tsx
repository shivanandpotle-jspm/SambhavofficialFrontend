import React, { useEffect, useState, useRef } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Users,
  Calendar,
  TrendingUp,
  Building2,
  DollarSign,
  Lightbulb,
  HeartHandshake,
  Brain,
  Rocket,
  Quote,
  ScrollText,
  Wand2,
} from "lucide-react";

/* =====================
   ASSETS
===================== */
import slide1 from "@/assets/avinya.jpeg";
// Change the physical filename in your folder to lowercase .png
import slide2 from "@/assets/heroimg6.png"; 
// import slide3 from "@/assets/hero2img.jpeg";
import sambhavLogo from "@/assets/sambhav_logo.png";

const slides = [
  {
    image: slide1,
    link: "/events#entrepreneurship",
    label: "Register for Avinya 4.0",
  },
  {
    image: slide2,
    link: "/events#financial-literacy",
    label: "Register for Aarambh",
  },
  // {
  //   image: slide3,
  //   link: "/events#mental-health",
  //   label: "view Avinya",
  // },
];

const testimonials = [
  {
    name: "Priya Mehta",
    role: "Workshop Guest",
    quote: "Sambhav Foundation creates real impact. Their financial literacy session changed how I manage my money.",
  },
  {
    name: "Rohit Sharma",
    role: "Entrepreneur & Speaker",
    quote: "The energy, vision, and execution of Sambhav is inspiring. A truly purpose-driven organization.",
  },
  {
    name: "Dr. Ananya Kulkarni",
    role: "Mental Health Expert",
    quote: "Their focus on physical and mental well-being is rare and much needed. Sambhav is doing remarkable work.",
  },
];

/* =====================
   ANIMATION VARIANTS
===================== */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const slideVariant: Variants = {
  enter: { opacity: 0, scale: 1.05 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const stats = [
  { value: "10,000+", label: "Lives Impacted", icon: Users },
  { value: "150+", label: "Events Hosted", icon: Calendar },
  { value: "500+", label: "Active Members", icon: TrendingUp },
  { value: "50+", label: "Partner Organizations", icon: Building2 },
];

const pillars = [
  {
    title: "Financial Literacy",
    description: "Helping individuals make informed decisions about savings, income, and financial growth.",
    icon: DollarSign,
    color: "#741b1b",
  },
  {
    title: "Entrepreneurship",
    description: "Supporting founders and innovators to build sustainable businesses.",
    icon: Rocket,
    color: "#d4af37",
  },
  {
    title: "Social Service",
    description: "Driving meaningful change through community-focused initiatives.",
    icon: HeartHandshake,
    color: "#3c2a1a",
  },
  {
    title: "Physical & Mental Well-Being",
    description: "Promoting holistic health by nurturing physical fitness and emotional resilience.",
    icon: Brain,
    color: "#741b1b",
  },
  {
    title: "Innovation",
    description: "Encouraging creative solutions for real-world challenges.",
    icon: Lightbulb,
    color: "#d4af37",
  },
];

export const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % slides.length);
      setCurrentTestimonial((p) => (p + 1) % testimonials.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((p) => (p + 1) % slides.length);
    startAutoPlay();
  };

  const prevSlide = () => {
    setCurrentSlide((p) => (p === 0 ? slides.length - 1 : p - 1));
    startAutoPlay();
  };

  return (
    <div className="relative overflow-hidden bg-[#1a120b] text-[#f3e5ab] selection:bg-[#741b1b] selection:text-white font-serif">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] z-0"></div>

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center relative z-10">
        <div className="container mx-auto px-4 pt-20 pb-12 text-center">
          <motion.div variants={container} initial="hidden" animate="show">
            <div className="relative inline-block mb-2">
              <motion.img
                src={sambhavLogo} 
                alt="Sambhav Logo"
                variants={fadeUp}
                className="h-[9.8rem] w-auto object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] sepia-[0.3]"
              />
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-[#d4af37] blur-[50px] -z-10 rounded-full"
              ></motion.div>
            </div>

            <motion.h1
              className="text-center font-serif font-bold mb-4 flex justify-center whitespace-nowrap leading-tight tracking-[0.2em] text-[#d4af37]"
              style={{ fontSize: "min(2.8vw, 1.1rem)" }}
              variants={fadeUp}
            >
              <span className="flex items-center gap-1">
                <Sparkles className="h-4 w-4" /> INITIATE
              </span>
              <span className="mx-3 flex items-center gap-1 text-[#f3e5ab]">
                <Wand2 className="h-4 w-4" /> CONNECT
              </span>
              <span className="flex items-center gap-1 text-[#741b1b]">
                <Sparkles className="h-4 w-4" /> EVOLVE
              </span>
            </motion.h1>
            
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-10 opacity-60" />

            {/* Slider */}
            <div className="relative w-full max-w-5xl mx-auto h-[26rem] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] border-4 border-[#3c2a1a]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={slides[currentSlide].image}
                  variants={slideVariant}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 w-full h-full object-cover object-center sepia-[0.1]"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-[#741b1b]/60 hover:bg-[#741b1b] text-[#d4af37] p-3 rounded-full backdrop-blur border border-[#d4af37]/30 transition"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-[#741b1b]/60 hover:bg-[#741b1b] text-[#d4af37] p-3 rounded-full backdrop-blur border border-[#d4af37]/30 transition"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-8 flex justify-center">
              <a
                href={slides[currentSlide].link}
                className="inline-flex items-center gap-3 px-10 py-4 rounded-none bg-[#741b1b] text-[#f3e5ab] font-serif font-bold uppercase tracking-widest border-b-4 border-[#3c1010] shadow-[0_5px_15px_rgba(0,0,0,0.4)] hover:bg-[#5a1515] hover:-translate-y-1 active:translate-y-0 transition-all"
              >
                <ScrollText className="h-5 w-5" />
                {slides[currentSlide].label}
              </a>
            </div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="rounded-none bg-[#fdf5e6] border-2 border-[#d4af37] p-8 text-center shadow-[5px_5px_0px_#3c2a1a] relative group"
                  >
                    <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
                    <Icon className="h-8 w-8 mx-auto mb-3 text-[#741b1b] group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-serif font-bold text-[#2d1e12]">{s.value}</div>
                    <div className="text-xs uppercase tracking-widest text-[#5d4037] font-bold">{s.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PILLARS SECTION */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-serif text-5xl font-bold mb-20 text-[#d4af37] drop-shadow-[2px_2px_0px_#741b1b]">
            Five Pillars of <span className="italic">Sambhav</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div
                    className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center border-4 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.3)] group-hover:rotate-[360deg] transition-all duration-1000"
                    style={{ backgroundColor: p.color }}
                  >
                    <Icon className="h-10 w-10 text-[#f3e5ab]" />
                  </div>
                  <h3 className="font-serif font-bold text-xl mb-3 text-[#f3e5ab]">{p.title}</h3>
                  <p className="text-sm text-[#f3e5ab]/70 font-serif italic leading-relaxed">{p.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl font-bold mb-16 text-[#d4af37]">
            Whispers from the <span className="italic">Great Hall</span>
          </h2>

          <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="bg-[#fdf5e6] rounded-none border-l-8 border-[#741b1b] shadow-2xl p-12 relative"
              >
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
                <Quote className="h-12 w-12 mx-auto mb-8 text-[#d4af37]/50" />
                <p className="text-xl text-[#2d1e12] font-serif italic mb-8 leading-loose">
                  “{testimonials[currentTestimonial].quote}”
                </p>
                <div className="w-12 h-0.5 bg-[#d4af37] mx-auto mb-4"></div>
                <div className="font-serif font-bold text-[#741b1b] uppercase tracking-widest">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-xs text-[#5d4037] font-bold mt-1">
                  {testimonials[currentTestimonial].role}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};






