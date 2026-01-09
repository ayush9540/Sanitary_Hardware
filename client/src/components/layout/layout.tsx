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
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight">LUXE</span>
              <span className="text-lg font-light text-muted-foreground">
                store
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Luxe Store. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
