import { ReactNode } from "react";
import { Header } from "./header";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <footer className="border-t border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-bold tracking-tight">Kanhaiya Sanitary</span>
                <span className="text-lg font-light text-muted-foreground">
                  store
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Trusted Hardware & Sanitary Store in Chhibramau<br />
                Genuine Brands • Fair Pricing • 20+ Years of Service
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <p className="text-sm text-muted-foreground mb-2">
                📍 Chhibramau, Uttar Pradesh
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                📞 +91 9540772145
              </p>
              <a
                href="https://wa.me/919540772145"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                💬 WhatsApp for Orders
              </a>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/" className="hover:text-foreground">Home</a></li>
                <li><a href="/cart" className="hover:text-foreground">Cart</a></li>
                <li><a href="/login" className="hover:text-foreground">Admin</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Kanhaiya Sanitary Store. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
