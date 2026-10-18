"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Project } from "../../../data/content";

/* ─── QuickEat SVG Order Tracker (Risograph style, high-contrast) ──── */
function QuickEatTrackerSvg({ isHovered }: { isHovered: boolean }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-between p-5 md:p-6 select-none relative overflow-hidden"
      style={{ backgroundColor: "color-mix(in srgb, var(--bg-color) 88%, var(--text-color) 12%)" }}
    >
      {/* Blueprint / risograph grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--text-color) 1px, transparent 1px), linear-gradient(to bottom, var(--text-color) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />

      {/* Top status bar */}
      <div className="relative z-10 w-full flex items-center justify-between border-b border-foreground/20 pb-2.5">
        <span className="font-mono text-xs uppercase tracking-widest text-foreground font-bold">
          Order #1042
        </span>
        <span className="font-mono text-[11px] uppercase tracking-wider text-accent border border-accent/60 bg-accent/10 px-2 py-0.5 rounded-xs font-bold">
          Real-Time Socket.io
        </span>
      </div>

      {/* Center tracker strip */}
      <div className="relative z-10 w-full my-auto py-3">
        <svg
          viewBox="0 0 340 70"
          className="w-full max-w-[340px] mx-auto overflow-visible"
          aria-label="Order progress tracker"
        >
          {/* Base track to DELIVERED (clearly visible dashed line) */}
          <line
            x1="34"
            y1="26"
            x2="306"
            y2="26"
            stroke="var(--text-color)"
            strokeWidth="2.5"
            strokeDasharray="5 4"
            strokeOpacity="0.75"
          />

          {/* Active completed track */}
          <line
            x1="34"
            y1="26"
            x2="216"
            y2="26"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          {/* Nodes */}
          {[
            { x: 34, label: "Placed", done: true },
            { x: 125, label: "Preparing", done: true },
            { x: 216, label: "On the way", done: true, active: true },
            { x: 306, label: "Delivered", done: false },
          ].map((node, i) => (
            <g key={i}>
              <circle
                cx={node.x}
                cy={26}
                r={node.active ? 9 : 7}
                fill={node.done ? "var(--accent)" : "color-mix(in srgb, var(--bg-color) 88%, var(--text-color) 12%)"}
                stroke={node.done ? "var(--accent)" : "var(--text-color)"}
                strokeWidth="2.5"
              />
              {node.done && (
                <circle
                  cx={node.x}
                  cy={26}
                  r={node.active ? 4 : 3}
                  fill="#FFFFFF"
                />
              )}
              {node.active && (
                <circle
                  cx={node.x}
                  cy={26}
                  r="14"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  opacity="0.4"
                  className="animate-ping"
                />
              )}
              <text
                x={node.x}
                y={52}
                textAnchor="middle"
                fontSize="12"
                fontFamily="var(--font-jetbrains), monospace"
                fill="var(--text-color)"
                fontWeight="700"
                className="uppercase tracking-wider"
              >
                {node.label}
              </text>
            </g>
          ))}

          {/* Looping dot animation on hover only */}
          {isHovered && (
            <circle r="4.5" fill="var(--accent)">
              <animateMotion
                dur="2.4s"
                repeatCount="indefinite"
                path="M 34 26 L 306 26"
              />
            </circle>
          )}
        </svg>
      </div>

      {/* Bottom meta note */}
      <div className="relative z-10 w-full flex items-center justify-between text-xs md:text-sm font-mono text-foreground font-semibold pt-2 border-t border-foreground/20">
        <span>ETA: 18 mins</span>
        <span>Stripe verified · Role-based API</span>
      </div>
    </div>
  );
}

/* ─── Memory Matrix SVG Fallback (Risograph style) ─────────────────── */
function MemoryMatrixSvg() {
  const cells = Array.from({ length: 16 }, (_, i) => i);
  const lit = [1, 4, 7, 10, 11, 14];

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-between p-5 md:p-6 select-none relative overflow-hidden"
      style={{ backgroundColor: "color-mix(in srgb, var(--bg-color) 88%, var(--text-color) 12%)" }}
    >
      {/* Background dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, var(--text-color) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
        aria-hidden="true"
      />

      {/* Top grid selector chips */}
      <div className="relative z-10 w-full flex items-center justify-between border-b border-foreground/20 pb-2.5">
        <div className="flex gap-2 font-mono text-[10px] md:text-xs uppercase tracking-wider text-olive font-medium">
          <span>3×3</span>
          <span className="text-accent border border-accent/60 bg-accent/10 px-2 py-0.5 rounded-xs font-bold">
            4×4
          </span>
          <span>5×5</span>
          <span>6×6</span>
        </div>
        <span className="font-mono text-[10px] md:text-xs text-foreground uppercase tracking-widest font-semibold">
          Grid Level 2
        </span>
      </div>

      {/* 4x4 matrix board */}
      <div className="relative z-10 my-auto py-2">
        <div className="grid grid-cols-4 gap-2 md:gap-2.5 p-3 rounded-xs border border-foreground/15 bg-background/50 backdrop-blur-xs">
          {cells.map((idx) => {
            const isLit = lit.includes(idx);
            return (
              <div
                key={idx}
                className="w-8 h-8 md:w-10 md:h-10 rounded-xs transition-colors duration-300"
                style={{
                  backgroundColor: isLit ? "var(--accent)" : "var(--bg-color)",
                  border: isLit
                    ? "2px solid var(--accent)"
                    : "1px solid color-mix(in srgb, var(--text-color) 20%, transparent)",
                  boxShadow: isLit
                    ? "0 0 12px color-mix(in srgb, var(--accent) 55%, transparent)"
                    : "none",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom stats HUD */}
      <div className="relative z-10 w-full flex items-center justify-between font-mono text-xs md:text-sm text-foreground border-t border-foreground/20 pt-2 font-semibold">
        <span className="text-accent">♥ ♥ ♥</span>
        <span>TIME: 0:42</span>
        <span>SCORE: 240</span>
      </div>
    </div>
  );
}

/* ─── Project Card ─────────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  isFirst,
}: {
  project: Project;
  index: number;
  isFirst: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isReduced, setIsReduced] = useState(false);

  // Layout calculations
  const cardRotation = isMobile || isReduced ? 0 : index % 2 === 0 ? -0.6 : 0.6;
  const coverBaseRotation = isMobile || isReduced ? 0 : index % 2 === 0 ? 1.8 : -1.8;

  useEffect(() => {
    const checkMotion = () => {
      setIsReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      setIsMobile(window.innerWidth < 768);
    };
    checkMotion();
    window.addEventListener("resize", checkMotion);

    const el = cardRef.current;
    if (!el) return () => window.removeEventListener("resize", checkMotion);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return () => window.removeEventListener("resize", checkMotion);
    }

    // Check if already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      setRevealed(true);
    }

    // Scroll reveal observer: fade and rise 16px, 400ms, once, started at 12% of viewport
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
    );
    obs.observe(el);

    // 1s safety fallback so nothing ever stays hidden
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 1000);

    return () => {
      window.removeEventListener("resize", checkMotion);
      obs.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // Cover straightens to 0deg on hover
  const currentCoverRotation = isHovered && !isMobile && !isReduced ? 0 : coverBaseRotation;

  // Buttons reusable render
  const renderButtons = (isMobileLayout: boolean) => {
    const hasLive = Boolean(project.links?.live);
    const hasGithub = Boolean(project.links?.github);
    if (!hasLive && !hasGithub) return null;

    return (
      <div
        className={
          isMobileLayout
            ? "flex md:hidden items-center gap-3 w-full mt-6 pt-4 border-t border-foreground/10"
            : `hidden md:flex items-center gap-2.5 flex-shrink-0 ${project.featured ? "md:mr-28" : ""}`
        }
      >
        {hasLive && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} on Live site`}
            className={`group/btn inline-flex items-center justify-center gap-1.5 bg-accent text-white px-4 py-2 font-mono text-xs uppercase tracking-wider font-semibold rounded-xs shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(217,72,43,0.35)] active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              isMobileLayout ? "flex-1 min-h-[44px]" : "min-h-[36px]"
            }`}
          >
            <span>Live</span>
            <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
              ↗
            </span>
          </a>
        )}
        {hasGithub && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} on GitHub`}
            className={`group/btn inline-flex items-center justify-center gap-1.5 border border-foreground/30 text-foreground px-4 py-2 font-mono text-xs uppercase tracking-wider font-semibold rounded-xs transition-all duration-200 hover:border-foreground hover:bg-foreground/5 hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              isMobileLayout ? "flex-1 min-h-[44px]" : "min-h-[36px]"
            }`}
          >
            <span>GitHub</span>
            <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
              ↗
            </span>
          </a>
        )}
      </div>
    );
  };

  return (
    <div
      ref={cardRef}
      className="specimen-sheet group relative w-full rounded-sm border border-foreground/15 transition-all"
      style={{
        backgroundColor: "color-mix(in srgb, var(--bg-color) 90%, white 10%)",
        opacity: revealed || isReduced ? 1 : 0,
        transform: isReduced
          ? "none"
          : isMobile
          ? revealed
            ? "translateY(0)"
            : "translateY(16px)"
          : isHovered
          ? `translateY(-4px) rotate(${cardRotation}deg)`
          : `translateY(${revealed ? 0 : 16}px) rotate(${cardRotation}deg)`,
        transition:
          "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), transform 300ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 300ms ease",
        boxShadow: isHovered && !isMobile && !isReduced
          ? "0 14px 38px rgba(22, 19, 15, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)"
          : "0 4px 22px rgba(22, 19, 15, 0.06), 0 1px 3px rgba(0, 0, 0, 0.02)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Paper-grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.025] rounded-sm mix-blend-multiply dark:mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Subtle deckled / torn bottom edge SVG trim */}
      <svg
        className="absolute -bottom-[5px] left-0 w-full h-[6px] pointer-events-none overflow-hidden select-none"
        style={{ color: "color-mix(in srgb, var(--bg-color) 90%, white 10%)" }}
        viewBox="0 0 1200 6"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,0 L1200,0 L1200,2 Q1150,5 1100,2 Q1050,0 1000,3 Q950,5 900,2 Q850,0 800,3 Q750,5 700,2 Q650,0 600,3 Q550,5 500,2 Q450,0 400,3 Q350,5 300,2 Q250,0 200,4 Q150,5 100,2 Q50,0 0,3 Z"
          fill="currentColor"
        />
      </svg>

      {/* Flagship "Featured" rubber-stamp */}
      {project.featured && (
        <div
          className="absolute top-4 right-4 md:top-5 md:right-6 border-[2px] border-accent text-accent px-2.5 py-0.5 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold rounded-xs pointer-events-none select-none z-20 shadow-xs"
          style={{ transform: "rotate(-6deg)" }}
          aria-label="Featured project"
        >
          ★ Featured
        </div>
      )}

      {/* Main card inner content: consistent padding (32px to 40px), vertically centered on desktop */}
      <div className="relative z-10 p-7 md:p-9 lg:p-10 flex flex-col md:flex-row md:items-center gap-8 md:gap-10 lg:gap-12">
        {/* Left Column: Taped Print Cover (~40%) with uniform 4:3 frame */}
        <div className="w-full md:w-[42%] lg:w-[40%] flex-shrink-0 flex flex-col justify-start">
          <div
            className="relative w-full aspect-[4/3] border border-foreground/15 shadow-[0_6px_22px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_28px_rgba(0,0,0,0.45)] overflow-hidden"
            style={{
              transform: `rotate(${currentCoverRotation}deg)`,
              transition: "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
              backgroundColor: "color-mix(in srgb, var(--bg-color) 88%, var(--text-color) 12%)",
            }}
          >
            {/* Tape strips on top corners */}
            <div
              className="absolute -top-2.5 left-5 w-12 md:w-14 h-4 md:h-5 bg-white/75 dark:bg-white/20 backdrop-blur-xs -rotate-3 z-30 shadow-xs border border-black/5 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -top-2.5 right-5 w-12 md:w-14 h-4 md:h-5 bg-white/75 dark:bg-white/20 backdrop-blur-xs rotate-3 z-30 shadow-xs border border-black/5 pointer-events-none"
              aria-hidden="true"
            />

            {/* Cover content - NEVER cover-cropped, using object-contain on paper frame */}
            {project.coverType === "svg-quickeat" ? (
              <QuickEatTrackerSvg isHovered={isHovered} />
            ) : project.coverType === "svg-memorymatrix" ? (
              <MemoryMatrixSvg />
            ) : project.cover ? (
              <div className="relative w-full h-full p-2 flex items-center justify-center overflow-hidden">
                <Image
                  src={project.cover}
                  alt={`${project.title} screenshot`}
                  fill
                  priority={isFirst}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-contain transition-all duration-300"
                  style={{
                    filter:
                      isHovered && !isReduced
                        ? "none"
                        : "sepia(24%) contrast(106%) saturate(90%)",
                  }}
                />
                {/* Duotone risograph tint overlay */}
                <div
                  className="absolute inset-0 bg-accent/10 mix-blend-multiply dark:mix-blend-screen transition-opacity duration-300 pointer-events-none"
                  style={{ opacity: isHovered && !isReduced ? 0 : 0.65 }}
                  aria-hidden="true"
                />
              </div>
            ) : (
              <MemoryMatrixSvg />
            )}
          </div>

          {/* Caveat caption below cover */}
          {project.caption && (
            <div className="font-hand text-base md:text-lg text-olive mt-3 -rotate-1 origin-left select-none text-center md:text-left">
              {project.caption}
            </div>
          )}
        </div>

        {/* Right Column: Details (~60%), vertically centered */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div>
            {/* Top row: Title and Link Buttons */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3
                  suppressHydrationWarning
                  className="font-serif font-bold text-foreground leading-tight tracking-tight"
                  style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.25rem)" }}
                >
                  {project.title}
                </h3>
                {/* Index + Status stamp */}
                <div className="flex items-center flex-wrap gap-2.5 mt-1.5">
                  <span className="font-mono text-xs font-semibold text-olive tracking-widest">
                    {project.index}
                  </span>
                  {project.badge && (
                    <span className="border border-dashed border-olive/50 font-mono text-[10px] uppercase tracking-wider text-olive px-2 py-0.5 rounded-xs">
                      {project.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Desktop action buttons */}
              {renderButtons(false)}
            </div>

            {/* Description - FULL TEXT, NO LINE-CLAMP, clamp(1rem, 1.25vw, 1.125rem) */}
            <p
              className="font-sans text-foreground/80 leading-relaxed mt-3.5"
              style={{ fontSize: "clamp(1rem, 1.25vw, 1.125rem)" }}
            >
              {project.description}
            </p>

            {/* Tech Chips */}
            <div className="mt-4 pt-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-olive/80 block mb-2 font-medium">
                Built with
              </span>
              <div className="flex flex-wrap gap-2">
                {project.chips.slice(0, 6).map((chip) => (
                  <span
                    key={chip}
                    className="border border-foreground/15 dark:border-foreground/20 px-2.5 py-1 font-mono text-[11px] text-foreground/85 rounded-xs bg-foreground/[0.02]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile action buttons (at bottom, side by side, min 44px tall) */}
          {renderButtons(true)}
        </div>
      </div>
    </div>
  );
}

/* ─── Work Section Component ───────────────────────────────────────── */
export function Work({ projects }: { projects: Project[] }) {
  const lineRef = useRef<SVGPathElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = lineRef.current;
    const anchor = headingRef.current;
    if (!path || !anchor) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = isReduced ? "0" : `${len}`;

    if (isReduced) return;

    // Check if already in view
    const rect = anchor.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      path.style.transition = "stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)";
      path.style.strokeDashoffset = "0";
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          path.style.transition = "stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)";
          path.style.strokeDashoffset = "0";
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(anchor);

    const safetyTimer = setTimeout(() => {
      path.style.strokeDashoffset = "0";
    }, 1200);

    return () => {
      obs.disconnect();
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <section id="work" className="pt-12 md:pt-14 pb-12 md:pb-14 bg-background relative z-[50] scroll-mt-20">
      <div className="w-full max-w-[1280px] mx-auto px-[clamp(20px,4vw,48px)]">
        {/* Section Header */}
        <div ref={headingRef} className="mb-10 md:mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-olive block mb-3">
            01 · Work
          </span>
          <div className="relative inline-block">
            <h2
              suppressHydrationWarning
              className="font-serif font-bold text-foreground leading-none"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Selected work
            </h2>
            <svg
              className="absolute -bottom-2 left-0 w-full overflow-visible text-accent pointer-events-none"
              viewBox="0 0 400 12"
              preserveAspectRatio="none"
              height="12"
              aria-hidden="true"
            >
              <path
                ref={lineRef}
                d="M 0 8 Q 100 2 200 9 Q 300 16 400 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="font-hand text-xl md:text-2xl text-olive mt-6 -rotate-1 origin-left">
            six things I built and shipped
          </p>
        </div>

        {/* Project Card List: single column, gap about 32px */}
        <div className="flex flex-col gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              isFirst={i === 0}
            />
          ))}
        </div>

        {/* Footer of the Section: Right-aligned outlined button */}
        <div className="flex justify-end mt-6 md:mt-8">
          <a
            href="https://github.com/Anubhavg04"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border border-foreground/30 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xs"
            aria-label="More projects on GitHub"
          >
            <span>More on GitHub</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
