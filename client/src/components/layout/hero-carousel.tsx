import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const slides = [
  {
    image: "/hero1.jpg",
    title: "Premium Sanitary Hardware",
    description: "Trusted sanitary and hardware store with genuine brands and fair pricing."
  },
  {
    image: "/hero2.jpg",
    title: "Modern Bathroom Collection",
    description: "Upgrade your bathroom with stylish and durable fittings."
  },
  {
    image: "/hero4.jpg",
    title: "Quality You Can Trust",
    description: "Explore reliable sanitary products for home and commercial use."
  },
];

export function HeroCarousel() {

  const autoplay = Autoplay({
    delay: 4000,
    stopOnInteraction: true
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [autoplay]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <section className="relative overflow-hidden">

      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex">

          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full h-[70vh] max-h-[688px] relative"
            >

              <img
                src={slide.image}
                className="absolute inset-0 w-full h-full object-cover brightness-75"
              />

              <div className="absolute inset-0 bg-black/40 flex items-center">

                <div className="max-w-7xl mx-auto px-6 text-white">

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-6xl font-bold mb-4"
                  >
                    {slide.title}
                  </motion.h1>

                  <p className="max-w-xl mb-6 text-lg">
                    {slide.description}
                  </p>

                  <Button size="lg" className="rounded-full px-8">
                    Shop Collection
                  </Button>

                </div>

              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Arrows */}

      <button
        onClick={scrollPrev}
        className="absolute cursor-pointer left-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow"
      >
        ‹
      </button>

      <button
        onClick={scrollNext}
        className="absolute cursor-pointer right-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow"
      >
        ›
      </button>

      {/* Dots */}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">

        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-3 w-3 rounded-full cursor-pointer ${
              index === selectedIndex
                ? "bg-white"
                : "bg-white/40"
            }`}
          />
        ))}

      </div>

    </section>
  );
}