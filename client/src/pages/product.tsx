import { useState } from "react";
import { useParams, Link } from "wouter";
import { Layout } from "@/components/layout/layout";
import { ImageGallery } from "@/components/image-gallery";
import { getProductById } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Star, Minus, Plus, ArrowLeft, Check, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const productId = parseInt(params.id || "0");
  const product = getProductById(productId);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/">
            <a className="text-primary hover:underline">Return to shop</a>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} added to your cart.`,
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Link href="/">
          <a
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            data-testid="link-back"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to shop
          </a>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ImageGallery images={product.images} productName={product.name} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
              {product.category}
            </p>
            <h1
              className="text-3xl md:text-4xl font-bold mb-4"
              data-testid="text-product-name"
            >
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>

            <p
              className="text-3xl font-bold mb-6"
              data-testid="text-product-price"
            >
              ${product.price}
            </p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium">Quantity</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-muted transition-colors"
                  data-testid="button-quantity-decrease"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span
                  className="px-4 font-medium min-w-[3rem] text-center"
                  data-testid="text-quantity"
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-muted transition-colors"
                  data-testid="button-quantity-increase"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full rounded-xl mb-6"
              onClick={handleAddToCart}
              data-testid="button-add-to-cart"
            >
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </Button>

            <div className="space-y-3 pt-6 border-t">
              <div className="flex items-center gap-3 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                <span>{product.inStock ? "In Stock" : "Out of Stock"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Truck className="h-4 w-4" />
                <span>Free shipping on orders over $100</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
