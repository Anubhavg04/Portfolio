"use client";
import Image from "next/image";

/* ─── Marker underline ──────────────────────────────────────────────── */
function Marker({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline">
      {children}
      <span
        className="absolute bottom-0 left-0 w-full h-[3px] rounded-full pointer-events-none"
        style={{ background: "var(--accent)", opacity: 0.5, transform: "rotate(-0.4deg) scaleX(1.02)" }}
        aria-hidden="true"
      />
    </span>
  );
}

/* ─── About Section ─────────────────────────────────────────────────── */
export function About({ content }: { content: any }) {
  return (
    <section
      id="about"
      className="pt-12 md:pt-14 pb-12 md:pb-14 bg-background relative z-[50] scroll-mt-20"
    >
      {/* Notebook dot grid — contained within section */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: 0.04,
          backgroundImage: "radial-gradient(circle, var(--text-color) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div
        className="w-full max-w-[1280px] mx-auto px-[clamp(20px,4vw,48px)] relative"
      >
        {/* Section header */}
        <div className="mb-10 md:mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-olive block mb-3">
            03 · About
          </span>
          <h2
            suppressHydrationWarning
            className="font-serif font-bold text-foreground leading-none"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Margin notes
          </h2>
        </div>

        {/* 5 / 7 grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start relative">
          {/* ── Left: Portrait (5 cols) ── */}
          <div className="md:col-span-5 relative pt-4">
            {/* "hi" annotation — left side of the photo */}
            <div
              className="absolute top-16 -left-8 md:-left-12 font-hand text-4xl text-accent -rotate-12 hidden sm:block z-20"
              aria-hidden="true"
            >
              hi →
            </div>

            {/* Taped print frame */}
            <div
              className="relative group"
              style={{ transform: "rotate(-2deg)", transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "rotate(0deg) translateY(-4px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "rotate(-2deg)"; }}
            >
              {/* Tape strips */}
              <div className="absolute -top-3 left-8 w-14 h-5 bg-white/50 dark:bg-white/15 -rotate-2 z-20 shadow-sm border border-black/5" />
              <div className="absolute -top-3 right-8 w-14 h-5 bg-white/50 dark:bg-white/15 rotate-2 z-20 shadow-sm border border-black/5" />

              {/* Paper frame */}
              <div className="relative p-2 bg-background border border-foreground/10 shadow-[0_8px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.45)]">
                <div className="relative aspect-[3/4] overflow-hidden">
                  {/* Duotone overlay — fades on hover */}
                  <div
                    className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-0"
                    style={{
                      background: "linear-gradient(135deg, color-mix(in srgb, var(--accent) 12%, transparent) 0%, color-mix(in srgb, var(--text-color) 8%, transparent) 100%)",
                      mixBlendMode: "multiply",
                    }}
                    aria-hidden="true"
                  />
                  <Image
                    src="/assets/anubhav-portrait.jpg"
                    alt="Anubhav Gupta — backend engineer, mid-debug"
                    fill
                    priority
                    sizes="(max-width: 768px) 90vw, 35vw"
                    className="object-cover object-top sepia-[0.06]"
                  />
                </div>
              </div>

              {/* Caption */}
              <div className="mt-2 text-right font-hand text-lg text-olive -rotate-1 pr-2">
                that&apos;s me, mid-debug
              </div>
            </div>
          </div>

          {/* ── Right: Text (7 cols) ── */}
          <div className="md:col-span-7 flex flex-col space-y-7 pt-4 md:pt-16">

            {/* Paragraph 1 */}
            <p
              suppressHydrationWarning
              className="font-sans leading-[1.7] text-foreground"
              style={{ fontSize: "clamp(1.05rem, 1.2vw, 1.25rem)", maxWidth: "60ch" }}
            >
              I love hard backend problems—
              <Marker>concurrency, data integrity, performance</Marker>
              —but I also care deeply about the interfaces that wrap them. I ship complete products{" "}
              <Marker>end-to-end</Marker>
              , making sure the engine runs flawlessly and the surface feels effortless.
            </p>

            {/* Paragraph 2 — annotation is BELOW the paragraph, never absolute over text */}
            <div className="space-y-2">
              <p
                className="font-sans leading-[1.7] text-foreground"
                style={{ fontSize: "clamp(1.05rem, 1.2vw, 1.25rem)", maxWidth: "60ch" }}
              >
                Currently deep-diving into system design and scalable architectures. I&apos;m usually serious when coding, but I get funnier once I&apos;m comfortable.
              </p>
              {/* Annotation as inline note — always in flow, never overlapping */}
              <p className="font-hand text-2xl text-accent -rotate-2 origin-left mt-1 ml-4">
                ↑ focus: system design
              </p>
            </div>

            {/* Now card — in flow, after text, never over it */}
            <div
              className="relative bg-background border border-foreground/10 p-5 shadow-md self-start"
              style={{ transform: "rotate(2deg)", maxWidth: "280px" }}
              aria-label="Current status card"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/50 dark:bg-white/15 border border-black/5 shadow-sm" />
              <ul className="space-y-2 font-mono text-xs uppercase tracking-widest text-foreground mt-1">
                <li><span className="text-olive">Building:</span> backend-heavy products</li>
                <li><span className="text-olive">Learning:</span> System Design</li>
                <li className="flex items-center gap-2">
                  <span className="text-olive">Status:</span>
                  <span className="relative flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  open to work
                </li>
              </ul>
            </div>

            {/* Education */}
            <div className="pt-4 border-t border-foreground/10">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-olive mb-2">
                Education
              </p>
              <p
                className="font-sans text-foreground leading-snug"
                style={{ fontSize: "clamp(1rem, 1.1vw, 1.1rem)" }}
              >
                {content.education}
              </p>
              <p className="font-mono text-xs text-olive mt-1 tracking-widest">2021 – 2025</p>
            </div>

            {/* Say hello */}
            <div>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-olive hover:text-accent transition-colors"
              >
                Say hello
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
