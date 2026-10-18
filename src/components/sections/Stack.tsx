"use client";
import { useEffect, useRef, useState } from "react";

/* ─── Tool captions ─────────────────────────────────────────────────── */
const CAPTIONS: Record<string, string> = {
  "Java":        "daily driver",
  "Spring Boot": "backend home base",
  "Kafka":       "events after commit",
  "Redis":       "caching layer",
  "PostgreSQL":  "source of truth",
  "Node.js":     "when JS is enough",
};

const CORE = new Set(["Java", "Spring Boot", "PostgreSQL", "Next.js", "Node.js"]);

/* ─── Tool chip ─────────────────────────────────────────────────────── */
function ToolChip({ name }: { name: string }) {
  const [hovered, setHovered] = useState(false);
  const caption = CAPTIONS[name];
  const isCore = CORE.has(name);

  return (
    <span className="relative inline-flex flex-col items-center">
      <button
        className="inline font-serif transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        style={{
          fontSize: "clamp(1.15rem, 1.8vw, 1.5rem)",
          fontWeight: isCore ? 800 : 500,
          color: hovered ? "var(--accent)" : isCore ? "var(--text-color)" : "color-mix(in srgb, var(--text-color) 70%, transparent)",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          lineHeight: 1.3,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label={caption ? `${name} — ${caption}` : name}
      >
        {name}
      </button>
      {caption && (
        <span
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-widest text-accent whitespace-nowrap pointer-events-none transition-opacity duration-200"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          {caption}
        </span>
      )}
    </span>
  );
}

/* ─── Stack card ─────────────────────────────────────────────────────── */
function StackCard({
  label,
  emoji,
  tools,
  rotation,
  delay,
}: {
  label: string;
  emoji: string;
  tools: string[];
  rotation: number;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) { setVisible(true); return; }

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative bg-background border border-foreground/10 p-6 shadow-[0_6px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_6px_32px_rgba(0,0,0,0.35)] transition-all duration-[450ms]"
      style={{
        transform: visible ? `rotate(${rotation}deg)` : `rotate(${rotation}deg) translateY(24px)`,
        opacity: visible ? 1 : 0,
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Tape strip */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-white/55 dark:bg-white/20 border border-black/5 shadow-sm" />

      {/* Card header */}
      <div className="mb-5 pb-4 border-b border-foreground/10 flex items-center justify-between">
        <span className="font-hand text-2xl text-olive">{label}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-olive/60">
          {tools.length} tools
        </span>
      </div>

      {/* Tools */}
      <div className="flex flex-wrap gap-x-2 gap-y-6 items-center">
        {tools.map((name, i) => (
          <span key={i} className="inline-flex items-center">
            <ToolChip name={name} />
            {i < tools.length - 1 && (
              <span
                className="inline-block w-[6px] h-[6px] rounded-full bg-accent/70 shrink-0 mx-2.5 self-center"
                aria-hidden="true"
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Stack Section ─────────────────────────────────────────────────── */
export function Stack({ data }: { data: any }) {
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

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          path.style.transition = "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)";
          path.style.strokeDashoffset = "0";
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(anchor);
    return () => obs.disconnect();
  }, []);

  const cards = [
    {
      label: "Backend",
      emoji: "⚙",
      tools: ["Java", "Spring Boot", "Spring Security", "JPA/Hibernate", "Node.js", "Express", "Kafka", "Redis", "WebSockets", "JWT"],
      rotation: -1.5,
      delay: 0,
    },
    {
      label: "Data",
      emoji: "🗄",
      tools: ["PostgreSQL", "MongoDB", "Prisma", "Schema design", "Query optimization"],
      rotation: 0.5,
      delay: 60,
    },
    {
      label: "Frontend & Ship",
      emoji: "🚀",
      tools: ["Next.js", "React", "TypeScript", "Tailwind", "Docker", "AWS", "GitHub Actions", "Jenkins"],
      rotation: 1.5,
      delay: 120,
    },
  ];

  return (
    <section id="stack" className="pt-12 md:pt-14 pb-12 md:pb-14 bg-background relative z-[50] scroll-mt-20">
      <div className="w-full max-w-[1280px] mx-auto px-[clamp(20px,4vw,48px)]">
        {/* Header */}
        <div ref={headingRef} className="mb-10 md:mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-olive block mb-3">
            02 · Stack
          </span>
          <div className="relative inline-block">
            <h2
              suppressHydrationWarning
              className="font-serif font-bold text-foreground leading-none"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              The toolbelt
            </h2>
            <svg
              className="absolute -bottom-2 left-0 w-full overflow-visible text-accent"
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
            what I reach for first
          </p>
        </div>

        {/* 3-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {cards.map((card) => (
            <StackCard key={card.label} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
