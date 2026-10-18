"use client";
import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";
import { useReveal } from "../lib/useReveal";

export function SmoothScrolling({ children }: { children: ReactNode }) {
  useReveal();
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
