import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

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
      {" "}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {" "}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/50 via-background to-background" />{" "}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            {" "}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Kanhaiya
              <span className="text-primary block">Sanitary Store</span>{" "}
            </h1>{" "}
            <p className="text-lg text-muted-foreground mb-8">
              Trusted Hardware & Sanitary Store in Chhibramau <br />
              Genuine Brands • Fair Pricing • 20+ Years of Service
            </p>
            <Button
              size="lg"
              className="rounded-full px-8"
              data-testid="button-shop-now"
            >
              Shop Collection
            </Button>
          </motion.div>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="rounded-full whitespace-nowrap"
              data-testid="button-category-all"
            >
              All Products
            </Button>

            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full whitespace-nowrap"
                data-testid={`button-category-${category.toLowerCase()}`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
