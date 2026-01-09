import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      <div className="aspect-square rounded-2xl overflow-hidden bg-muted/30 relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedImage}
            src={images[selectedImage]}
            alt={`${productName} - Image ${selectedImage + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-testid={`img-product-main-${selectedImage}`}
          />
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
              selectedImage === index
                ? "border-primary ring-2 ring-primary/20"
                : "border-transparent hover:border-border"
            }`}
            data-testid={`button-thumbnail-${index}`}
          >
            <img
              src={image}
              alt={`${productName} - Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      <Accordion type="single" collapsible className="mt-6">
        <AccordionItem value="gallery" className="border rounded-xl px-4">
          <AccordionTrigger className="text-sm font-medium" data-testid="accordion-gallery">
            View All Images
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-4 pb-4">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`${productName} - Gallery ${index + 1}`}
                    className="w-full h-auto object-cover"
                    data-testid={`img-gallery-${index}`}
                  />
                </motion.div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
