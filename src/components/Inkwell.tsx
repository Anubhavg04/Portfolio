"use client";
import { Droplet } from "lucide-react";
import { triggerInkBleed } from "../lib/ink";

export function Inkwell() {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " " || e.key.toLowerCase() === "i") {
      e.preventDefault();
      if (!document.documentElement.classList.contains("ink-transitioning")) {
        triggerInkBleed();
      }
    }
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-[60] p-3 rounded-full bg-background text-foreground border border-foreground/10 shadow-lg hover:scale-110 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="Toggle theme (Ink bleed)"
        onClick={(e) => {
          e.stopPropagation();
          if (!document.documentElement.classList.contains("ink-transitioning")) {
            triggerInkBleed(e as unknown as MouseEvent);
          }
        }}
        onKeyDown={handleKeyDown}
      >
        <Droplet size={20} className="fill-current" />
        <span className="sr-only">Toggle theme</span>
      </button>
      
      {/* Aria live announcer for theme changes */}
      <div id="theme-announcer" aria-live="polite" className="sr-only"></div>
    </>
  );
}
