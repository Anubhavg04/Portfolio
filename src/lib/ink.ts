"use client";
import { ScrollTrigger } from "gsap/ScrollTrigger";

class SimplexNoise {
  private perm: number[];
  constructor() {
    this.perm = new Array(512);
    for (let i = 0; i < 512; i++) {
      this.perm[i] = Math.floor(Math.random() * 256);
    }
  }
  noise2D(x: number, y: number) {
    const dot = (x * 12.0) + (y * 54.0);
    return Math.sin(dot) * Math.cos(x * 1.5) * Math.sin(y * 1.5);
  }
}

const noise = new SimplexNoise();

let isAnimating = false;

export function triggerInkBleed(event?: MouseEvent | TouchEvent | KeyboardEvent) {
  if (isAnimating) return;
  isAnimating = true;

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;

  if (event) {
    if ("clientX" in event && event.clientX !== undefined) {
      x = event.clientX;
      y = event.clientY;
    } else if ("changedTouches" in event && event.changedTouches.length > 0) {
      x = event.changedTouches[0].clientX;
      y = event.changedTouches[0].clientY;
    }
  }

  const isDark = document.documentElement.classList.contains("dark");
  const nextTheme = isDark ? "light" : "dark";
  const announcer = document.getElementById("theme-announcer");
  
  const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isReduced) {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", nextTheme);
    if (announcer) announcer.textContent = `Theme changed to ${nextTheme}`;
    isAnimating = false;
    return;
  }

  const maxRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  const duration = 1400;
  const startTime = performance.now();
  let animationFrameId: number;

  // View Transitions Support
  if (document.startViewTransition) {
    document.documentElement.classList.add("ink-transitioning");
    
    const updateClipPath = (time: number) => {
      const elapsed = time - startTime;
      const progress = elapsed / duration;
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);
      const easedProgress = easeOut(Math.min(progress, 1));
      const baseRadius = maxRadius * easedProgress;
      
      const points = [];
      const numPoints = 64;
      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const noiseVal = noise.noise2D(Math.cos(angle) * 3, time * 0.002);
        const radius = Math.max(0, baseRadius * (1 + noiseVal * 0.18));
        points.push(`${x + Math.cos(angle) * radius}px ${y + Math.sin(angle) * radius}px`);
      }
      
      document.documentElement.style.setProperty("--ink-clip", `polygon(${points.join(", ")})`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateClipPath);
      } else {
        document.documentElement.style.removeProperty("--ink-clip");
        document.documentElement.classList.remove("ink-transitioning");
        if (announcer) announcer.textContent = `Theme changed to ${nextTheme}`;
        setTimeout(() => { ScrollTrigger.refresh(); isAnimating = false; }, 50);
      }
    };

    const transition = document.startViewTransition(() => {
      document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", nextTheme);
    });

    transition.ready.then(() => {
      animationFrameId = requestAnimationFrame(updateClipPath);
      transition.finished.finally(() => {
        cancelAnimationFrame(animationFrameId);
        document.documentElement.style.removeProperty("--ink-clip");
        document.documentElement.classList.remove("ink-transitioning");
        isAnimating = false;
      });
    });

    return;
  }

  // Canvas Fallback
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.cssText = "position:fixed;top:0;left:0;pointer-events:none;z-index:99999;";
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", nextTheme);
    if (announcer) announcer.textContent = `Theme changed to ${nextTheme}`;
    document.body.removeChild(canvas);
    isAnimating = false;
    return;
  }

  const computedStyle = getComputedStyle(document.documentElement);
  // Get the *target* background color (approximate based on standard classes)
  const targetColor = nextTheme === "dark" ? "#1e1e1e" : "#f4f1ea"; // Hardcode standard fallback colors for ink

  document.documentElement.classList.add("ink-transitioning");
  let swapped = false;

  const drawFallback = (time: number) => {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);
    const baseRadius = maxRadius * easeOut(progress);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = targetColor;
    ctx.beginPath();
    
    for (let i = 0; i < 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      const noiseVal = noise.noise2D(Math.cos(angle) * 3, time * 0.002);
      const radius = Math.max(0, baseRadius * (1 + noiseVal * 0.18));
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();

    if (progress > 0.6 && !swapped) {
      document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", nextTheme);
      if (announcer) announcer.textContent = `Theme changed to ${nextTheme}`;
      swapped = true;
    }

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(drawFallback);
    } else {
      document.documentElement.classList.remove("ink-transitioning");
      document.body.removeChild(canvas);
      setTimeout(() => { ScrollTrigger.refresh(); isAnimating = false; }, 50);
    }
  };

  animationFrameId = requestAnimationFrame(drawFallback);
}
