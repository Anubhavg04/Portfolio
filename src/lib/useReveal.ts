"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useReveal() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const elements = document.querySelectorAll(".reveal");

    elements.forEach((el) => {
      if (isReduced) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Safety fallback
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                if (window.getComputedStyle(el).opacity !== "1") {
                  gsap.set(el, { opacity: 1, y: 0 });
                }
              }, 1500);
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger && (t.vars.trigger as HTMLElement).classList?.contains("reveal")) {
          t.kill();
        }
      });
      // Clear inline styles injected by GSAP to prevent Next.js hydration mismatch on Fast Refresh
      elements.forEach((el) => {
        gsap.set(el, { clearProps: "all" });
      });
    };
  }, []);
}
