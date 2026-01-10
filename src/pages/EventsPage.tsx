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
import { Calendar, ArrowRight } from "lucide-react";
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
    <div className="pt-24 min-h-screen bg-background">
      <section className="container mx-auto px-4">
        {/* FILTERS */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="financial">Financial</SelectItem>
              <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
              <SelectItem value="social">Social</SelectItem>
              <SelectItem value="mental-health">Mental Health</SelectItem>
              <SelectItem value="innovation">Innovation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* EVENTS GRID */}
        {filteredEvents.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">
            No events found
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredEvents.map((event) => (
              <motion.div key={event.id} variants={fadeUp}>
                <Card className="overflow-hidden hover:shadow-lg transition">
                  {/* IMAGE */}
                  <div className="aspect-video bg-muted">
                    {event.image ? (
                      <img
                        src={`/assets/events/${event.image}`}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <Calendar className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      {event.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {event.shortDescription}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        {event.ticketPrice > 0
                          ? `₹${event.ticketPrice}`
                          : "Free"}
                      </span>

                      {/* ✅ CORRECT NAVIGATION */}
                      <Button asChild size="sm">
                        <Link to={`/events/${event.id}`}>
                          Register
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
