import type React from "react";
import { Footer } from "@/components/Footer";

export default function LayoutAmbiental({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={
        {
          "--color-service-accent": "#2d6a2d",
          "--color-service-accent-hover": "#1e4d1e",
          "--color-service-surface": "#0b1b12",
          "--color-service-footer": "#07120c",
        } as React.CSSProperties
      }
    >
      {children}
      <Footer />
    </div>
  )
}
