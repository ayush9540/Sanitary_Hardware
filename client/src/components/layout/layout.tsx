import { ReactNode } from "react";
import { Header } from "./header";
import { MapPin, Phone, MessageCircle, Home, ShoppingBag, User } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <footer className="mt-20 bg-muted border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* LEFT SIDE — MAP */}

            <div className="rounded-xl overflow-hidden border shadow-md">
              <iframe
                src="https://www.google.com/maps?q=27.150762464327833,79.49618920615458&output=embed"
                width="100%"
                height="250"
                loading="lazy"
                style={{ border: 0 }}
              />
            </div>

            {/* RIGHT SIDE */}

            <div className="flex flex-col gap-8">
              {/* Store Info */}

              <div>
                <h3 className="text-xl font-bold mb-3">
                  Kanhaiya Sanitary Store
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed tracking-wide max-w-md">
                  Trusted Hardware & Sanitary Store in Chhibramau. Genuine Brands • Fair Pricing • 20+ Years of Service.
                </p>
              </div>

              {/* Contact + Quick Links */}

              <div className="grid grid-cols-2 gap-8">
                {/* Contact */}

                <div>
                  <h4 className="font-semibold mb-3">Contact</h4>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      Chhibramau, Uttar Pradesh
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      +91 9540772145
                    </div>

                    <a
                      href="https://wa.me/919540772145"
                      target="_blank"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp Orders
                    </a>
                  </div>
                </div>

                {/* Quick Links */}

                <div>
                  <h4 className="font-semibold mb-3">Quick Links</h4>

                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      <a href="/" className="hover:text-foreground flex items-center gap-2">
                        <Home className="w-4 h-4 text-primary" /> <span>Home</span>
                      </a>
                    </li>

                    <li>
                      <a href="/cart" className="hover:text-foreground flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-primary" /> <span>Cart</span>
                      </a>
                    </li>

                    <li>
                      <a href="/login" className="hover:text-foreground flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" /> <span>Admin</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}

          <div className="border-t border-border mt-10 pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Kanhaiya Sanitary Store. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
