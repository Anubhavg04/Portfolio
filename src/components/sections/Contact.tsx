"use client";
import { useState } from "react";

function WaxSeal({
  name,
  url,
  mark,
}: {
  name: string;
  url: string;
  mark: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="group flex flex-col items-center gap-2.5 focus:outline-none"
    >
      <div
        className="relative flex items-center justify-center transition-all duration-300 ease-out group-hover:scale-95 group-focus-visible:scale-95 group-focus-visible:ring-4 group-focus-visible:ring-accent group-focus-visible:ring-offset-4 group-focus-visible:ring-offset-background rounded-full"
        style={{ width: "96px", height: "96px" }}
      >
        {/* Irregular wavy seal edge SVG */}
        <svg
          className="absolute inset-0 w-full h-full text-[#d9482b] dark:text-[#eb5e41] drop-shadow-md group-hover:drop-shadow-sm transition-all duration-300"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M50 2 C55 3 60 1 65 3 C70 5 73 8 78 12 C82 15 86 19 88 24 C90 29 93 33 93 38 C94 43 97 48 95 53 C93 58 95 63 93 68 C91 73 88 77 84 81 C80 85 75 88 70 91 C65 93 60 97 55 97 C50 98 45 96 40 97 C35 98 30 96 25 93 C20 90 15 87 11 82 C8 78 4 73 3 68 C2 63 0 58 2 53 C4 48 2 43 3 38 C4 33 6 28 9 24 C12 19 15 15 20 12 C25 9 30 5 35 3 C40 1 45 1 50 2 Z" />
        </svg>

        {/* Inner embossed rim */}
        <div
          className="absolute rounded-full border-2 border-white/20 dark:border-white/30"
          style={{
            width: "68%",
            height: "68%",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(255,255,255,0.2)",
          }}
        />

        {/* Stamped Mark */}
        <span
          className="relative z-10 font-serif font-bold text-white/90 text-2xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
          style={{ letterSpacing: "-0.05em" }}
        >
          {mark}
        </span>
      </div>

      {/* Label under seal */}
      <span className="font-mono text-[10px] uppercase tracking-widest text-olive opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        {name}
      </span>
    </a>
  );
}

export function Contact({ content }: { content: any }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(content.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sealMarks: Record<string, string> = {
    "GitHub": "GH",
    "LinkedIn": "in",
    "X": "X",
  };

  return (
    <section
      id="contact"
      className="pt-12 md:pt-14 pb-8 bg-background relative z-[50] min-h-[100svh] flex flex-col justify-between border-t border-foreground/10 scroll-mt-20"
    >
      <div className="w-full max-w-[1280px] mx-auto px-[clamp(20px,4vw,48px)] flex-1 flex flex-col justify-center">
        {/* Header: mono "04 · Contact", bold Fraunces heading, Caveat note */}
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-olive block mb-3">
            04 · Contact
          </span>
          <h2
            suppressHydrationWarning
            className="font-serif font-bold tracking-tight text-foreground"
            style={{
              fontSize: "clamp(2.5rem, 5.6vw, 5.25rem)",
              lineHeight: 1.0,
            }}
          >
            <span className="max-[599px]:inline min-[600px]:block">Let&apos;s build </span>
            <span className="max-[599px]:inline min-[600px]:block">something that </span>
            <span className="max-[599px]:inline min-[600px]:block">holds up.</span>
          </h2>
          <p className="font-hand text-2xl md:text-3xl text-accent -rotate-2 mt-2 md:mt-2.5 origin-left">
            say hi, I reply fast
          </p>
        </div>

        {/* Availability Line (~16-20px gap) */}
        <div className="mt-4 md:mt-5 font-mono text-xs uppercase tracking-widest text-olive flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Open to work
          </span>
          <span aria-hidden="true">·</span>
          <span>Noida, India</span>
          <span aria-hidden="true">·</span>
          <span>replies within a day</span>
        </div>

        {/* Email Container (~16-20px gap) */}
        <div className="mt-4 md:mt-5">
          <div className="relative inline-block group">
            {/* Screen reader announcement for copy */}
            <div aria-live="polite" className="sr-only">
              {copied ? "Email copied to clipboard" : ""}
            </div>

            <button
              onClick={copyEmail}
              className="font-mono text-foreground hover:text-accent transition-colors relative z-10 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              style={{
                fontSize: "clamp(1.5rem, 3.2vw, 2.75rem)",
                overflowWrap: "anywhere",
                wordBreak: "break-word",
              }}
              aria-label="Copy email address to clipboard"
            >
              {content.email}
            </button>

            {/* Hand-drawn SVG underline - ends exactly at right edge with no hover overshoot */}
            <svg
              className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-3 md:h-4 text-accent pointer-events-none"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M 0 5 Q 50 10 100 2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="group-hover:stroke-[3.5px] transition-all duration-300"
              />
            </svg>

            {/* Copied Toast */}
            <span
              className="absolute -top-10 md:-top-12 right-0 font-hand text-2xl md:text-3xl text-olive animate-bounce pointer-events-none transition-opacity duration-300"
              style={{ opacity: copied ? 1 : 0 }}
              aria-hidden="true"
            >
              copied ✓
            </span>
          </div>

          <div className="mt-2.5">
            <a
              href={`mailto:${content.email}`}
              className="font-mono text-xs uppercase tracking-widest text-olive hover:text-accent transition-colors"
            >
              or open in mail ↗
            </a>
          </div>
        </div>

        {/* Wax Seals Row (~28-36px gap, 96px seals, left-aligned) */}
        <div className="mt-7 md:mt-9 flex flex-wrap gap-6 md:gap-8">
          {content.links.map((link: any, i: number) => (
            <WaxSeal
              key={i}
              name={link.name}
              url={link.url}
              mark={sealMarks[link.name] || link.name.charAt(0)}
            />
          ))}
        </div>
      </div>

      {/* Footer - horizontal rule inside the shared container */}
      <footer className="w-full max-w-[1280px] mx-auto mt-16 md:mt-20 px-[clamp(20px,4vw,48px)]">
        <div className="border-t border-foreground/10 pt-8 flex flex-col gap-6 md:flex-row md:items-end justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-olive">
          <div className="flex flex-col gap-2">
            <p>{content.footer}</p>
            <p>© 2026 Anubhav Gupta</p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-6 md:gap-2">
            <button
              onClick={scrollToTop}
              className="hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </footer>
    </section>
  );
}

// BusinessCard component
function BusinessCard({ content }: { content: any }) {
  const [flipped, setFlipped] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hovered, setHovered] = useState(false);
  const copyEmail = () => {
    navigator.clipboard.writeText(content.email);
    // Trigger existing toast via copied state perhaps
    const event = new CustomEvent('email-copied');
    window.dispatchEvent(event);
  };

  const downloadVCard = () => {
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Anubhav Gupta',
      'N:Gupta;Anubhav;;;',
      'TITLE:Backend Engineer',
      `TEL;TYPE=CELL:${content.phone}`,
      `EMAIL;TYPE=INTERNET:${content.email}`,
      'ADR;TYPE=HOME:;;;Noida;Uttar Pradesh;;India',
      `URL:${content.links.find((l: any) => l.name === 'GitHub')?.url || ''}`,
      `URL:${content.links.find((l: any) => l.name === 'LinkedIn')?.url || ''}`,
      'END:VCARD'
    ].join('\r\n');
    const blob = new Blob([lines], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Anubhav-Gupta.vcf';
    a.click();
    URL.revokeObjectURL(url);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setFlipped(!flipped);
    } else if (e.key === 'Escape' && flipped) {
      setFlipped(false);
    }
  };

  return (
    <div
      className="relative w-full h-auto aspect-[7/4] perspective-1000 group motion-reduce:transform-none"
      tabIndex={0}
      role="button"
      aria-pressed={flipped}
      onClick={() => setFlipped(!flipped)}
      onKeyDown={handleKey}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 600ms',
        transform: flipped
          ? 'rotateY(180deg)'
          : hovered
            ? 'rotateY(0deg) translateY(-4px)'
            : 'rotateY(0deg)'
      }}
    >
      {/* Front Face */}
      <div
        className="absolute inset-0 bg-[color:var(--paper)] rounded-[3px] shadow-lg overflow-visible"
        style={{
          backfaceVisibility: 'hidden',
          transition: 'transform 600ms',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Tape strips */}
        <div className="absolute -top-3 -left-3 w-12 h-4 bg-white/40 dark:bg-white/10 backdrop-blur-sm -rotate-45 z-20 shadow-xs border border-black/5" aria-hidden="true"></div>
        <div className="absolute -top-3 -right-3 w-12 h-4 bg-white/40 dark:bg-white/10 backdrop-blur-sm rotate-45 z-20 shadow-xs border border-black/5" aria-hidden="true"></div>
        {/* Monogram (reuse Nav monogram SVG) */}
        <div className="absolute left-4 top-4 w-6 h-9 flex items-center justify-center pointer-events-none">
          <svg viewBox="0 0 30 46" className="w-full h-full text-accent" fill="currentColor" aria-hidden="true">
            <path d="M 15 2 C 15 2 30 21 30 30.5 C 30 39 23.3 45.5 15 45.5 C 6.7 45.5 0 39 0 30.5 C 0 21 15 2 15 2 Z" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center pt-2 font-serif font-bold text-white text-xs tracking-tighter drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]" style={{ letterSpacing: "-0.05em" }}>AG</span>
        </div>
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          <h2 className="font-serif text-2xl font-bold mb-1" style={{ fontFamily: 'Fraunces, serif' }}>Anubhav Gupta</h2>
          <p className="font-mono text-sm text-foreground/80 mb-1">Backend engineer</p>
          <p className="font-mono text-xs text-foreground/60 mb-2">Java · Spring Boot · Node.js</p>
          <div className="flex items-center gap-1 text-olive">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span>Noida, India</span>
          </div>
          <div className="absolute bottom-2 right-2 text-xs font-hand text-foreground/50 flex items-center">
            flip me ↻
            <svg className="w-3 h-3 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </div>
          {/* Deckle edge */}
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
        </div>
      </div>
      {/* Back Face */}
      <div
        className="absolute inset-0 bg-[color:var(--paper)] rounded-[3px] shadow-lg overflow-visible"
        style={{
          backfaceVisibility: 'hidden',
          transition: 'transform 600ms',
          transform: flipped ? 'rotateY(0deg)' : 'rotateY(-180deg)'
        }}
        aria-hidden={!flipped}
      >
        <div className="p-4 flex flex-col h-full justify-between">
          <div className="flex flex-col gap-2">
            <button onClick={copyEmail} className="font-mono text-left text-foreground hover:text-accent focus:outline-none" tabIndex={flipped ? 0 : -1}> {content.email} </button>
            {content.links.map((link: any, i: number) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="font-mono text-left text-foreground hover:text-accent focus:outline-none" tabIndex={flipped ? 0 : -1}>
                {link.name}
              </a>
            ))}
            <button onClick={downloadVCard} className="mt-2 bg-vermillion-600 text-white py-1 px-3 rounded hover:bg-vermillion-700 focus:outline-none" tabIndex={flipped ? 0 : -1}>Save contact ↓</button>
          </div>
          {saved && (
            <span className="absolute -top-10 right-0 text-olive font-hand text-xl" aria-hidden="true">saved ✓</span>
          )}
          <p className="text-xs text-foreground/60 font-hand text-right">no spam, promise</p>
        </div>
      </div>
    </div>
  );
}

