import { Link } from "wouter";
import { Product } from "@/lib/cart-context";
import { Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/product/${product.id}`} className="group block bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300"
          data-testid={`card-product-${product.id}`}>        
          <div className="aspect-square overflow-hidden bg-muted/30">
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-4 md:p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              {product.category}
            </p>
            <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 mb-3">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">₹ {product.price}</span>
              <Button
                size="sm"
                variant="secondary"
                onClick={handleAddToCart}
                className="group-hover:bg-primary cursor-pointer group-hover:text-primary-foreground transition-colors"
                data-testid={`button-add-to-cart-${product.id}`}
              >
                <ShoppingBag className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
      </Link>
    </motion.div>
  );
}
