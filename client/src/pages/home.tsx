import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { HeroCarousel } from "@/components/layout/hero-carousel";
import { ShieldCheck, Truck, Sparkles, BadgeCheck } from "lucide-react";

const premiumBenefits = [
  {
    title: "Trusted Quality",
    description: "Premium sanitary fittings sourced from reliable brands and crafted for durability.",
    icon: ShieldCheck,
  },
  {
    title: "Fast Local Delivery",
    description: "Get your hardware orders delivered quickly across the region with care.",
    icon: Truck,
  },
  {
    title: "Elegant Finishes",
    description: "Modern product designs and superior finishes for every bathroom style.",
    icon: Sparkles,
  },
  {
    title: "Guaranteed Service",
    description: "Buy with confidence backed by strong support and product recommendations.",
    icon: BadgeCheck,
  },
];

const testimonials = [
  {
    quote: "Excellent range and quick support — perfect for our new bathroom installation.",
    name: "Ravi Sharma",
    role: "Contractor",
  },
  {
    quote: "The products feel premium and the delivery was fast. Highly recommended!",
    name: "Anjali Gupta",
    role: "Homeowner",
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newProducts, setNewProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setNewProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // convert admin products to match ProductCard format
  const formattedAdminProducts = newProducts.map((p) => ({
    id: p.id,
    name: p.name,
    price: Number(p.price),
    description: p.description || "",
    category: p.category || "General",
    images: [p.image],
    rating: 4.5,
    reviews: 0,
    inStock: p.inStock,
  }));

  const allProducts = formattedAdminProducts;
  const categories = Array.from(
    new Set(allProducts.map((p) => p.category).filter(Boolean))
  );

  const filteredProducts = selectedCategory
    ? allProducts.filter((p) => p.category === selectedCategory)
    : allProducts;

  return (
    <Layout>
      <HeroCarousel />

      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr,0.8fr] items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-sm uppercase tracking-[0.4em] text-primary">
                Premium Sanitary Catalogue
              </p>
              <h2 className="max-w-2xl text-4xl md:text-5xl font-bold leading-tight">
                Give your bathroom a stylish and premium look.
              </h2>
              <p className="max-w-2xl text-muted-foreground text-lg leading-8">
                Discover a curated catalogue of premium sanitary hardware, fittings and accessories built for modern homes and commercial spaces.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  className="rounded-full bg-primary px-8 text-primary-foreground shadow-lg hover:bg-primary/90"
                  onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Explore Products
                </Button>
                <Button variant="outline" className="rounded-full border-primary text-primary px-8 hover:bg-primary/5">
                  Contact Support
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-8 shadow-xl"
            >
              <div className="absolute right-0 top-6 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute left-0 bottom-8 h-36 w-36 rounded-full bg-secondary/10 blur-3xl" />

              <div className="relative z-10 space-y-6 text-slate-900">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-primary">
                  Premium Selection
                </div>
                <h3 className="text-3xl md:text-4xl font-semibold leading-tight">
                  Discover bathroom fittings that feel premium and perform beautifully.
                </h3>
                <p className="max-w-xl text-sm text-muted-foreground leading-7">
                  A carefully curated catalogue for modern sanitary spaces, built to look luxurious and stay durable.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-primary/10 bg-primary/5 p-5 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.35em] text-primary">Collection</p>
                    <p className="mt-3 text-lg font-semibold text-foreground">Elegant fittings</p>
                  </div>
                  <div className="rounded-3xl border border-primary/10 bg-primary/5 p-5 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.35em] text-primary">Support</p>
                    <p className="mt-3 text-lg font-semibold text-foreground">Expert purchase guidance</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-3xl border border-primary/10 bg-primary/5 p-4 text-sm shadow-sm">
                    <p className="text-2xl font-semibold text-primary">200+</p>
                    <p className="text-muted-foreground">Premium products</p>
                  </div>
                  <div className="rounded-3xl border border-primary/10 bg-primary/5 p-4 text-sm shadow-sm">
                    <p className="text-2xl font-semibold text-primary">99%</p>
                    <p className="text-muted-foreground">Customer satisfaction</p>
                  </div>
                  <div className="rounded-3xl border border-primary/10 bg-primary/5 p-4 text-sm shadow-sm">
                    <p className="text-2xl font-semibold text-primary">Fast</p>
                    <p className="text-muted-foreground">Local delivery</p>
                  </div>
                </div>

                <Button className="rounded-full bg-primary px-8 text-primary-foreground shadow-lg hover:bg-primary/90">
                  View the range
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col gap-10">
          <div className="space-y-3 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-primary">Explore Collections</p>
            <h2 className="text-4xl font-bold">Shop by trusted product categories</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Browse our catalog with easy filters, discover the right finish and shop with confidence.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div key={category} className="rounded-3xl border border-primary/10 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 shadow-2xl transition hover:-translate-y-1 hover:shadow-xl">
                <p className="text-sm text-primary uppercase tracking-[0.3em] mb-3">{category}</p>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{category}</h3>
                <p className="text-sm text-muted-foreground">{filteredProducts.filter((p) => p.category === category).length} products available</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 text-center mb-12">
            <p className="text-sm uppercase tracking-[0.4em] text-primary">Customer Stories</p>
            <h2 className="text-4xl font-bold">Why businesses choose us</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {testimonials.map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-primary/10 bg-slate-50 p-8 shadow-2xl"
              >
                <p className="text-lg leading-8 text-slate-600 mb-6">“{item.quote}”</p>
                <p className="font-semibold text-slate-900">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-4xl font-bold pt-16 pb-10">Shop By Category</div>
      <section id="products" className="pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="rounded-full whitespace-nowrap cursor-pointer"
              data-testid="button-category-all"
            >
              All Products
            </Button>

            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full whitespace-nowrap cursor-pointer"
                data-testid={`button-category-${category.toLowerCase()}`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="space-y-3">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))
              : filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
