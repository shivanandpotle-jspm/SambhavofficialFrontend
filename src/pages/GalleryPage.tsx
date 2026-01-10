import React, { useState } from "react";
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
import { useAdmin } from "@/contexts/AdminContext";

/* ================= DATA ================= */

const categories = [
  { value: "all", label: "All Photos" },
  { value: "events", label: "Events" },
  { value: "workshops", label: "Workshops" },
  { value: "community", label: "Community" },
  { value: "team", label: "Team" },
];

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
  const { galleryImages } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] =
    useState<typeof galleryImages[0] | null>(null);

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
        <div className="container mx-auto px-4 flex justify-between">
          <span className="text-muted-foreground">
            Showing {filteredImages.length} photos
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
          {filteredImages.length > 0 ? (
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
                    className="cursor-pointer overflow-hidden shadow-card"
                    onClick={() => setSelectedImage(img)}
                  >
                    <CardContent className="p-0">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={img.url}
                          alt={img.caption}
                          className="w-full h-full object-cover"
                        />
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
                No photos available.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <Dialog open onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-4xl p-0 bg-black border-0">
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
                  className="absolute top-4 right-4 text-white"
                  onClick={() => setSelectedImage(null)}
                >
                  <X />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white"
                  onClick={() => navigateImage("prev")}
                >
                  <ChevronLeft />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
                  onClick={() => navigateImage("next")}
                >
                  <ChevronRight />
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};
