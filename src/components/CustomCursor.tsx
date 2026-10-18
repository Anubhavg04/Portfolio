"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only run on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let mouse = { x: width / 2, y: height / 2 };
    let lastMouse = { x: width / 2, y: height / 2 };
    let points: {x: number, y: number, age: number}[] = [];
    
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      points.push({ x: e.clientX, y: e.clientY, age: 0 });
      // cap points
      if (points.length > 50) points.shift();
    };

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");
      const inkColor = isDark ? "#EDE6D6" : "#16130F"; // bone or ink
      
      // Draw trail
      ctx.beginPath();
      if (points.length > 0) {
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
          points[i].age++;
        }
        ctx.strokeStyle = inkColor;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = 0.2;
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // Draw cursor dot (lerping for smoothness)
      lastMouse.x += (mouse.x - lastMouse.x) * 0.2;
      lastMouse.y += (mouse.y - lastMouse.y) * 0.2;

      ctx.beginPath();
      ctx.arc(lastMouse.x, lastMouse.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = inkColor;
      ctx.fill();

      // Clean old points
      points = points.filter(p => p.age < 20);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[100] hidden lg:block"
      aria-hidden="true"
    />
  );
}
