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
} from "lucide-react";

/* ================= DATA ================= */

const categories = [
  { value: "all", label: "All Photos" },
  { value: "events", label: "Events" },
  { value: "workshops", label: "Workshops" },
  { value: "community", label: "Community" },
  { value: "team", label: "Team" },
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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const imageCard: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

/* ================= COMPONENT ================= */

export const GalleryPage: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to extract category from filename
  const getCategoryFromFilename = (filename: string): string => {
    const lower = filename.toLowerCase();
    if (lower.includes("event")) return "events";
    if (lower.includes("workshop")) return "workshops";
    if (lower.includes("community")) return "community";
    if (lower.includes("team")) return "team";
    return "events"; // default category
  };

  // Function to generate caption from filename
  const getCaptionFromFilename = (filename: string): string => {
    // Remove extension and split by underscores/dashes
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
    // Replace underscores/dashes with spaces
    const withSpaces = nameWithoutExt.replace(/[_-]/g, " ");
    // Capitalize first letter of each word
    return withSpaces
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Fetch images from the gallery folder
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
          // Add more as needed
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
    <div className="pt-24">
      {/* HERO */}
      <section className="py-16 text-center">
        <h1 className="font-heading text-4xl font-bold mb-4">
          Our Gallery
        </h1>
        <p className="text-muted-foreground">
          Moments of impact and community
        </p>
      </section>

      {/* FILTER */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-muted-foreground">
            {isLoading ? "Loading..." : `Showing ${filteredImages.length} photos`}
          </span>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* GRID */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading gallery...</p>
            </div>
          ) : filteredImages.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredImages.map((img) => (
                <motion.div
                  key={img.id}
                  variants={imageCard}
                  whileHover={{ y: -8 }}
                >
                  <Card
                    className="cursor-pointer overflow-hidden shadow-card hover:shadow-glow transition-shadow"
                    onClick={() => setSelectedImage(img)}
                  >
                    <CardContent className="p-0">
                      <div className="aspect-square overflow-hidden bg-muted/20">
                        <img
                          src={img.url}
                          alt={img.caption}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium truncate">{img.caption}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {img.category}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <ImageIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-muted-foreground">
                No photos available in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <Dialog open onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-4xl p-0 bg-black border-0 overflow-hidden">
              <DialogTitle className="sr-only">
                {selectedImage.caption}
              </DialogTitle>

              <div className="relative">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  className="w-full max-h-[80vh] object-contain"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-white hover:bg-white/20"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={() => navigateImage("prev")}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={() => navigateImage("next")}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>

                {/* Image info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-white text-lg font-semibold">
                    {selectedImage.caption}
                  </h3>
                  <p className="text-white/80 text-sm capitalize">
                    {selectedImage.category}
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