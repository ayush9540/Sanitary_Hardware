import { Link } from "wouter";
import { Layout } from "@/components/layout/layout";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } =
    useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link href="/">
              <a>
                <Button className="rounded-full px-8" data-testid="button-start-shopping">
                  Start Shopping
                </Button>
              </a>
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8"
        >
          Shopping Cart
          <span className="text-muted-foreground font-normal text-lg ml-3">
            ({totalItems} {totalItems === 1 ? "item" : "items"})
          </span>
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex gap-4 p-4 bg-card rounded-2xl border border-border/50"
                  data-testid={`cart-item-${item.product.id}`}
                >
                  <Link href={`/product/${item.product.id}`}>
                    <a className="flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl"
                      />
                    </a>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                          {item.product.category}
                        </p>
                        <Link href={`/product/${item.product.id}`}>
                          <a className="font-semibold hover:text-primary transition-colors">
                            {item.product.name}
                          </a>
                        </Link>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                        data-testid={`button-remove-${item.product.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <p
                      className="font-bold mt-2"
                      data-testid={`text-price-${item.product.id}`}
                    >
                      ₹ {item.product.price}
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="p-1.5 rounded-lg border hover:bg-muted transition-colors cursor-pointer"
                        data-testid={`button-decrease-${item.product.id}`}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span
                        className="min-w-[2rem] text-center font-medium"
                        data-testid={`text-quantity-${item.product.id}`}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="p-1.5 rounded-lg border hover:bg-muted transition-colors cursor-pointer"
                        data-testid={`button-increase-${item.product.id}`}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-card rounded-2xl border border-border/50 p-6 sticky top-24">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span data-testid="text-subtotal">₹ {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span data-testid="text-total">₹ {totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout">
                <a className="block w-full">
                  <Button
                    className="w-full rounded-xl"
                    size="lg"
                    data-testid="button-checkout"
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </Link>

              <Link href="/">
                <a className="block text-center mt-4 text-sm text-muted-foreground hover:text-primary transition-colors">
                  Continue Shopping
                </a>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
