"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

/* ─── Ink Drop Intro Component (first load of session only) ───────── */
function InkDropIntro({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Start near monogram (top-left)
    const startX = 64;
    const startY = 48;
    // Target near "click anywhere to spill ink" hint (bottom-right)
    const endX = window.innerWidth - 140;
    const endY = window.innerHeight - 60;

    const startTime = performance.now();
    const dropDuration = 550; // Drop falls in 550ms
    const totalDuration = 1550; // Total duration under 1.6s
    let animId: number;

    const render = (now: number) => {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (elapsed < dropDuration) {
        // Falling droplet
        const p = elapsed / dropDuration;
        const easeIn = p * p;
        const curX = startX + (endX - startX) * p;
        const curY = startY + (endY - startY) * easeIn;

        ctx.save();
        ctx.fillStyle = "#D9482B";
        ctx.beginPath();
        ctx.arc(curX, curY, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        animId = requestAnimationFrame(render);
      } else if (elapsed < totalDuration) {
        // Splash expands and fades
        const splashElapsed = elapsed - dropDuration;
        const splashProgress = Math.min(splashElapsed / 950, 1);
        const maxRadius = 70; // 140px diameter
        const curRadius = maxRadius * (1 - Math.pow(1 - splashProgress, 3));
        const alpha = 0.25 * (1 - splashProgress);

        ctx.save();
        ctx.fillStyle = `rgba(217, 72, 43, ${alpha})`;
        ctx.beginPath();
        // Organic noise-edged splash
        const points = 32;
        for (let i = 0; i < points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const noise = Math.sin(angle * 4 + 1.2) * 6 + Math.cos(angle * 3) * 4;
          const r = Math.max(0, curRadius + noise);
          const px = endX + Math.cos(angle) * r;
          const py = endY + Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        animId = requestAnimationFrame(render);
      } else {
        onComplete();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40 select-none"
      aria-hidden="true"
    />
  );
}

/* ─── Hero Section ─────────────────────────────────────────────────── */
export function Hero({ content }: { content: any }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const [showIntro, setShowIntro] = useState(false);
  const [pulseHint, setPulseHint] = useState(false);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Check session storage for intro
    if (!isReduced && window.innerWidth >= 768) {
      try {
        const seen = sessionStorage.getItem("hero_intro_seen");
        if (!seen) {
          sessionStorage.setItem("hero_intro_seen", "true");
          setShowIntro(true);
        }
      } catch (e) {}
    }

    if (!isReduced && titleRef.current) {
      const chars = titleRef.current.querySelectorAll(".char");
      gsap.fromTo(
        chars,
        { y: 35, opacity: 0, rotateZ: 8 },
        {
          y: 0,
          opacity: 1,
          rotateZ: 0,
          duration: 1.0,
          stagger: 0.035,
          ease: "power3.out",
          delay: 0.1,
        }
      );
    } else if (titleRef.current) {
      gsap.set(titleRef.current.querySelectorAll(".char"), {
        opacity: 1,
        y: 0,
        rotateZ: 0,
      });
    }

    if (!isReduced && circleRef.current) {
      const length = circleRef.current.getTotalLength();
      gsap.set(circleRef.current, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(circleRef.current, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 0.7,
      });
    } else if (circleRef.current) {
      const length = circleRef.current.getTotalLength();
      gsap.set(circleRef.current, { strokeDasharray: length, strokeDashoffset: 0 });
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setPulseHint(true);
    setTimeout(() => setPulseHint(false), 1200);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-center pt-[clamp(48px,6.5vh,64px)] pb-[clamp(16px,2.5vh,28px)] overflow-hidden"
    >
      {/* Ink Drop Intro Overlay */}
      {showIntro && <InkDropIntro onComplete={handleIntroComplete} />}

      {/* Background Graphic */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 pointer-events-none opacity-5 dark:opacity-10 w-full max-w-4xl">
        <svg
          viewBox="0 0 500 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto text-accent"
        >
          <circle
            ref={circleRef}
            cx="250"
            cy="100"
            r="90"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="transform origin-center -rotate-12"
          />
        </svg>
      </div>

      <div className="w-full max-w-[1280px] mx-auto px-[clamp(20px,4vw,48px)] relative flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-10 items-center">
          {/* Left Column (7 cols) - compact vertical rhythm */}
          <div className="md:col-span-7 flex flex-col items-start z-10 space-y-3 sm:space-y-3.5 md:space-y-[clamp(11px,1.5vh,16px)]">
            {/* Handwritten Note - 20 to 24px vertical space below AG monogram */}
            <div className="font-hand text-base sm:text-lg md:text-xl text-accent -rotate-2 origin-left inline-flex items-center gap-2 select-none max-w-full leading-tight mt-5 md:mt-6">
              <span>{content.marginNote}</span>
              <svg
                className="w-4 h-4 md:w-5 md:h-5 shrink-0 -rotate-12 inline-block"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>

            {/* Label - tightened gap above name */}
            <span className="font-mono text-xs uppercase tracking-widest text-olive block !mt-2 md:!mt-2.5">
              Portfolio · 2026
            </span>

            {/* Name - reduced by 8-10% to clamp(3rem, 7.2vw, 7.1rem) */}
            <h1
              ref={titleRef}
              className="font-serif font-bold tracking-tighter uppercase text-foreground !mt-1.5 md:!mt-2"
              style={{
                fontSize: "clamp(3rem, 7.2vw, 7.1rem)",
                lineHeight: 0.92,
              }}
            >
              {content.name.split(" ").map((word: string, i: number) => (
                <span
                  key={i}
                  className="block overflow-hidden pb-1 -mb-1 whitespace-nowrap"
                >
                  {i > 0 && <span className="sr-only">{" "}</span>}
                  {word.split("").map((char: string, j: number) => (
                    <span key={j} className="char inline-block opacity-0">
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            {/* Role line - balanced, separators attached to the end of each preceding item so no line begins with '·' */}
            <h2
              className="font-mono text-xs sm:text-sm md:text-[15px] uppercase tracking-wider text-olive max-w-[48ch]"
              style={{ textWrap: "balance" }}
            >
              <span className="inline-block whitespace-nowrap">Backend engineer&nbsp;·&nbsp;</span>
              <span className="inline-block whitespace-nowrap">Java &amp; Spring Boot&nbsp;·&nbsp;</span>
              <span className="inline-block whitespace-nowrap">Node.js&nbsp;·&nbsp;</span>
              <span className="inline-block whitespace-nowrap">Full-stack when it matters</span>
            </h2>

            {/* Italic statement - ~16px more space from the role line */}
            <p className="font-serif italic text-lg sm:text-xl md:text-2xl leading-snug text-foreground max-w-[32ch] text-balance !mt-[clamp(26px,3.2vh,32px)]">
              {content.tagline}
            </p>

            {/* CTAs and Open to Work */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-0.5 w-full">
              <div className="flex items-center gap-3">
                <a
                  href="#work"
                  className="group flex items-center gap-2 bg-accent text-white px-5 py-2.5 font-mono text-xs uppercase tracking-widest transition-all hover:shadow-[0_4px_12px_rgba(217,72,43,0.4)] hover:-translate-y-0.5 active:translate-y-0 rounded-xs"
                >
                  <span>See the work</span>
                  <svg
                    className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="group border border-foreground/25 text-foreground px-5 py-2.5 font-mono text-xs uppercase tracking-widest transition-all hover:border-foreground hover:bg-foreground/5 hover:-translate-y-0.5 active:translate-y-0 rounded-xs"
                >
                  Say hello
                </a>
              </div>

              <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-olive">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping-once absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span>{content.location} · {content.availability}</span>
              </div>
            </div>

            {/* Mini Social Row - 16 to 20px under the CTA row */}
            <div className="flex flex-wrap items-center gap-5 md:gap-6 !mt-[clamp(16px,2vh,20px)] font-mono text-xs uppercase tracking-widest text-olive">
              <a
                href="https://github.com/Anubhavg04"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Anubhav Gupta on GitHub"
                className="group/link flex items-center gap-1 hover:text-accent transition-colors"
              >
                <span>GitHub</span>
                <span className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                  ↗
                </span>
              </a>
              <a
                href="https://linkedin.com/in/Anubhavg23"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Anubhav Gupta on LinkedIn"
                className="group/link flex items-center gap-1 hover:text-accent transition-colors"
              >
                <span>LinkedIn</span>
                <span className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                  ↗
                </span>
              </a>
              <a
                href="https://x.com/Dev_code_04"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Anubhav Gupta on X"
                className="group/link flex items-center gap-1 hover:text-accent transition-colors"
              >
                <span>X</span>
                <span className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Right Column (5 cols) - limited to max-h-[50vh] so it never pushes hero taller */}
          <div className="md:col-span-5 relative mt-6 md:mt-0 max-h-[52vh] flex items-center justify-center">
            <div className="group relative w-full max-w-[340px] md:max-w-[380px] aspect-[4/5] max-h-[48vh] transform rotate-2 md:rotate-3 transition-transform duration-700 hover:rotate-0 hover:-translate-y-1">
              {/* Tape Strips */}
              <div
                className="absolute -top-3 -left-3 w-12 h-4 bg-white/40 dark:bg-white/10 backdrop-blur-sm -rotate-45 z-20 shadow-xs border border-black/5"
                aria-hidden="true"
              />
              <div
                className="absolute -top-3 -right-3 w-12 h-4 bg-white/40 dark:bg-white/10 backdrop-blur-sm rotate-45 z-20 shadow-xs border border-black/5"
                aria-hidden="true"
              />

              {/* Image Container with ragged edge effect */}
              <div className="absolute inset-0 bg-background border border-foreground/10 p-2 shadow-xl dark:shadow-2xl dark:shadow-black/50">
                <div className="relative w-full h-full overflow-hidden filter sepia-[0.1] contrast-[1.05]">
                  <Image
                    src="/assets/hero-desk.jpg"
                    alt="Desk workspace"
                    fill
                    priority
                    sizes="(max-width: 768px) 90vw, 640px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Caption */}
              <div className="absolute -bottom-7 right-3 font-hand text-lg text-olive -rotate-2 select-none">
                desk, 2 a.m.
              </div>

              {/* Index Card */}
              <div className="absolute -bottom-3 -left-3 md:-left-8 bg-background text-foreground p-3 shadow-lg border border-foreground/10 max-w-[190px] -rotate-6 transform transition-transform group-hover:-rotate-3 z-30 select-none">
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent/80 shadow-inner" />
                <p className="font-mono text-[11px] leading-relaxed mt-1">
                  Backend first.<br />Full-stack when it matters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
