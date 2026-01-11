import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, ArrowRight, Sparkles, ScrollText } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

/* ================= Animations ================= */

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/* ================= Component ================= */

const EventsPage: React.FC = () => {
  const { events } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 min-h-screen bg-[#1a120b] selection:bg-[#741b1b] selection:text-white">
      {/* Added pb-20 to ensure the last row of cards isn't blocked by the footer */}
      <section className="container mx-auto px-4 pb-20">
        {/* HEADER SECTION */}
        <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-[#d4af37] mb-2 flex items-center justify-center gap-3">
                <Sparkles />
                Available Scrolls & Events
                <Sparkles />
            </h1>
            <p className="text-[#f3e5ab]/70 font-serif italic">Choose your path and enlist for the upcoming gatherings</p>
        </div>

        {/* FILTERS */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 relative z-10">
          <Input
            placeholder="Search scrolls..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#2d1e12] border-[#d4af37]/30 text-[#f3e5ab] placeholder:text-[#f3e5ab]/30 font-serif"
          />

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48 bg-[#2d1e12] border-[#d4af37]/30 text-[#f3e5ab] font-serif">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-[#2d1e12] border-[#d4af37] text-[#f3e5ab] font-serif">
              <SelectItem value="all">All Halls</SelectItem>
              <SelectItem value="financial">Financial Charms</SelectItem>
              <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
              <SelectItem value="social">Social Gatherings</SelectItem>
              <SelectItem value="mental-health">Mind Arts</SelectItem>
              <SelectItem value="innovation">Innovation Spells</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* EVENTS GRID */}
        {filteredEvents.length === 0 ? (
          <div className="text-center text-[#d4af37] font-serif italic py-20 border-2 border-dashed border-[#d4af37]/20 rounded-xl">
            No scrolls found in the archives.
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredEvents.map((event) => (
              <motion.div key={event.id} variants={fadeUp}>
                <Card className="overflow-hidden bg-[#fdf5e6] border-2 border-[#d4af37] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all group relative">
                  {/* Visual Parchment Texture */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>

                  {/* IMAGE */}
                  <div className="aspect-video bg-[#1a120b] overflow-hidden border-b-2 border-[#d4af37]">
                    {event.image ? (
                      <img
                        src={`/assets/events/${event.image}`}
                        alt={event.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 sepia-[0.2]"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <Calendar className="h-16 w-16 text-[#d4af37]/20" />
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <CardContent className="p-6 relative">
                    <div className="flex items-center gap-2 mb-2">
                        <ScrollText className="h-4 w-4 text-[#741b1b]" />
                        <span className="text-[10px] uppercase tracking-widest text-[#741b1b] font-bold font-serif">
                            {event.category}
                        </span>
                    </div>

                    <h3 className="text-xl font-serif font-bold mb-2 text-[#2d1e12]">
                      {event.title}
                    </h3>

                    <p className="text-[#5d4037] font-serif mb-6 line-clamp-2 italic text-sm">
                      {event.shortDescription}
                    </p>

                    <div className="flex items-center justify-between border-t border-[#d4af37]/30 pt-4">
                      <span className="text-lg font-serif font-bold text-[#741b1b]">
                        {event.ticketPrice > 0
                          ? `₹${event.ticketPrice}`
                          : "Free of Galleons"}
                      </span>

                      <Button asChild size="sm" className="bg-[#741b1b] hover:bg-[#5a1515] text-[#f3e5ab] font-serif rounded-none border-b-2 border-[#3c1010] relative z-20">
                        <Link to={`/events/${event.id}`}>
                          Enlist
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default EventsPage;