import React, { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Wand2,
  ScrollText,
} from "lucide-react";

/* ================= DATA ================= */

const categories = [
  { value: "all", label: "All Magic" },
  { value: "events", label: "Grand Events" },
  { value: "workshops", label: "Classes & Spells" },
  { value: "community", label: "The Fellowship" },
  { value: "team", label: "Order of Sambhav" },
];

/* ================= TYPES ================= */

interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: string;
}

/* ================= ANIMATIONS ================= */

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const imageCard: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: "sepia(1)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "sepia(0)",
    transition: { duration: 0.6 },
  },
};

/* ================= COMPONENT ================= */

export const GalleryPage: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Logic: Extract category from filename (Preserved)
  const getCategoryFromFilename = (filename: string): string => {
    const lower = filename.toLowerCase();
    if (lower.includes("event")) return "events";
    if (lower.includes("workshop")) return "workshops";
    if (lower.includes("community")) return "community";
    if (lower.includes("team")) return "team";
    return "events"; 
  };

  // Logic: Generate caption from filename (Preserved)
  const getCaptionFromFilename = (filename: string): string => {
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
    const withSpaces = nameWithoutExt.replace(/[_-]/g, " ");
    return withSpaces
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Fetch images logic (Preserved)
  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      try {
        const imageFilenames = [
          "bugati.jpg",
          "mywall.jpg",
          "shiva.jpeg",
          "workshop2.jpg",
          "community1.jpg",
          "team1.jpg",
        ];

        const images: GalleryImage[] = imageFilenames.map((filename, index) => {
          const category = getCategoryFromFilename(filename);
          const caption = getCaptionFromFilename(filename);
          
          return {
            id: `image-${index + 1}`,
            url: `/assets/gallery/${filename}`,
            caption: caption,
            category: category,
          };
        });

        setGalleryImages(images);
      } catch (error) {
        console.error("Error loading gallery images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((i) => i.category === selectedCategory);

  const currentIndex = selectedImage
    ? filteredImages.findIndex((i) => i.id === selectedImage.id)
    : -1;

  const navigateImage = (dir: "prev" | "next") => {
    if (!selectedImage) return;
    const next =
      dir === "prev"
        ? (currentIndex - 1 + filteredImages.length) %
          filteredImages.length
        : (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[next]);
  };

  return (
    <div className="pt-24 min-h-screen bg-[#1a120b] text-[#f3e5ab] selection:bg-[#741b1b] selection:text-white font-serif relative">
      {/* Background Parchment Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] z-0"></div>

      {/* HERO */}
      <section className="py-16 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-serif font-bold mb-4 text-[#d4af37] drop-shadow-[2px_2px_0px_#741b1b]" style={{ fontFamily: "'Hogwarts', serif" }}>
              The Archive of Memories
            </h1>
            <p className="text-[#f3e5ab]/70 italic flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-[#d4af37]" />
              Capturing magical moments of impact
              <Sparkles className="h-4 w-4 text-[#d4af37]" />
            </p>
        </motion.div>
      </section>

      {/* FILTER */}
      <section className="py-6 border-y border-[#d4af37]/20 bg-[#2d1e12]/50 relative z-10 backdrop-blur-sm">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-[#f3e5ab]/60 font-serif italic">
            {isLoading ? "Consulting the library..." : `Behold, ${filteredImages.length} enchanted captures`}
          </span>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[200px] bg-[#1a120b] border-[#d4af37]/40 text-[#f3e5ab] font-serif">
              <Wand2 className="h-4 w-4 mr-2 text-[#d4af37]" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a120b] border-[#d4af37] text-[#f3e5ab] font-serif">
              {categories.map((c) => (
                <SelectItem key={c.value} value={c.value} className="focus:bg-[#741b1b] focus:text-white">
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* GRID */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37] mx-auto mb-4"></div>
              <p className="font-serif italic text-[#d4af37]">Revelio Gallery...</p>
            </div>
          ) : filteredImages.length > 0 ? (
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredImages.map((img) => (
                <motion.div
                  key={img.id}
                  variants={imageCard}
                  whileHover={{ y: -10, rotate: 1 }}
                >
                  <Card
                    className="cursor-pointer overflow-hidden border-2 border-[#d4af37] bg-[#fdf5e6] shadow-[5px_5px_0px_#3c2a1a] group"
                    onClick={() => setSelectedImage(img)}
                  >
                    <CardContent className="p-0">
                      <div className="aspect-square overflow-hidden bg-[#1a120b] relative">
                        <img
                          src={img.url}
                          alt={img.caption}
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 sepia-[0.2]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 shadow-inner pointer-events-none border-[12px] border-transparent group-hover:border-[#d4af37]/20 transition-all"></div>
                      </div>
                      <div className="p-4 bg-[#fdf5e6] relative">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
                        <p className="text-[#2d1e12] font-serif font-bold truncate flex items-center gap-2">
                            <ScrollText className="h-3 w-3 text-[#741b1b]" />
                            {img.caption}
                        </p>
                        <p className="text-[#5d4037] text-xs font-serif italic uppercase tracking-widest mt-1">
                          {img.category}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16 bg-[#2d1e12]/30 rounded-xl border-2 border-dashed border-[#d4af37]/20">
              <ImageIcon className="h-16 w-16 mx-auto mb-4 text-[#d4af37]/20" />
              <p className="text-[#f3e5ab]/40 font-serif italic text-xl">
                This chapter of the archive is currently blank.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <Dialog open onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-4xl p-0 bg-[#1a120b] border-4 border-[#d4af37] overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.3)]">
              <DialogTitle className="sr-only">
                {selectedImage.caption}
              </DialogTitle>

              <div className="relative">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  className="w-full max-h-[80vh] object-contain sepia-[0.1]"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-[#d4af37] hover:bg-[#741b1b] hover:text-white rounded-none"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-6 w-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d4af37] bg-black/40 hover:bg-[#741b1b] hover:text-white rounded-none border border-[#d4af37]/30"
                  onClick={() => navigateImage("prev")}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#d4af37] bg-black/40 hover:bg-[#741b1b] hover:text-white rounded-none border border-[#d4af37]/30"
                  onClick={() => navigateImage("next")}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>

                {/* Image info (Ancient Ribbon Style) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a120b] via-[#1a120b]/90 to-transparent p-8 border-t border-[#d4af37]/20">
                  <h3 className="text-[#d4af37] text-2xl font-serif font-bold tracking-wide flex items-center gap-3">
                    <Sparkles className="h-5 w-5" />
                    {selectedImage.caption}
                  </h3>
                  <p className="text-[#f3e5ab]/60 font-serif italic text-sm mt-1 uppercase tracking-[0.2em]">
                    Department of {selectedImage.category}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};