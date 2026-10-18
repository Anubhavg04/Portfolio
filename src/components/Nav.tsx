"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    let rafId: number | null = null;

    const updateActiveSection = () => {
      setScrolled(window.scrollY > 20);

      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollBottom = window.scrollY + windowHeight;

      // 1. If scrolled within 80px of the bottom, force the last section (Contact) to be active
      if (docHeight - scrollBottom <= 80) {
        setActiveSection("contact");
        return;
      }

      const refLine = windowHeight * 0.35; // 35% of viewport height
      const workEl = document.getElementById("work");

      // 2. When scrollY is above Work section's top minus reference line (hero in view), no link is active
      if (workEl) {
        const workRect = workEl.getBoundingClientRect();
        if (workRect.top > refLine) {
          setActiveSection("");
          return;
        }
      } else if (window.scrollY < 200) {
        setActiveSection("");
        return;
      }

      // 3. Determine active section as the LAST section whose top edge has passed the reference line (top <= refLine)
      const sections = ["work", "stack", "about", "contact"];
      let current = "";

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= refLine) {
            current = id;
          }
        }
      }

      setActiveSection(current);
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateActiveSection();
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const links = [
    { id: "01", label: "Work", href: "#work" },
    { id: "02", label: "Stack", href: "#stack" },
    { id: "03", label: "About", href: "#about" },
    { id: "04", label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, "", href);
    }
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.pushState(null, "", " ");
  };

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-[60] transition-all duration-300 hidden md:flex items-center py-4 ${
          scrolled ? "border-b border-foreground/10" : ""
        }`}
        style={
          scrolled
            ? {
                backgroundColor: "color-mix(in srgb, var(--bg-color) 92%, transparent)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }
            : {}
        }
      >
        <div className="w-full max-w-[1280px] mx-auto px-[clamp(20px,4vw,48px)] flex items-center justify-between">
          {/* Monogram (top-left) - hand-drawn vermilion ink drop containing "AG" */}
          <a
            href="#"
            id="monogram"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group relative flex items-center justify-center w-[26px] h-10 transition-transform duration-200 hover:scale-[0.96] hover:-rotate-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full select-none"
          >
            {/* Ink drop SVG outline & paper stamp shadow */}
            <svg
              viewBox="0 0 30 46"
              className="w-full h-full text-accent drop-shadow-sm transition-transform duration-200 group-hover:scale-y-[0.96]"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M 15 2 C 15 2 30 21 30 30.5 C 30 39 23.3 45.5 15 45.5 C 6.7 45.5 0 39 0 30.5 C 0 21 15 2 15 2 Z" />
            </svg>
            <span
              className="absolute inset-0 flex items-center justify-center pt-2 font-serif font-bold text-white text-xs tracking-tighter drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]"
              style={{ letterSpacing: "-0.05em" }}
            >
              AG
            </span>
          </a>

          {/* Desktop nav links */}
          <ul className="flex space-x-8 font-mono text-xs uppercase tracking-widest">
            {links.map((link) => {
              const targetId = link.href.slice(1);
              const isActive = activeSection === targetId;

              return (
                <li key={link.id} className="relative py-1">
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`flex items-center gap-2 transition-colors duration-200 ${
                      isActive
                        ? "text-foreground font-semibold"
                        : "text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`text-[10px] ${
                        isActive ? "text-accent font-semibold" : "text-foreground/70"
                      }`}
                    >
                      {link.id}
                    </span>
                    <span>{link.label}</span>
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="fixed top-5 left-0 right-0 z-[70] md:hidden px-6 flex items-center justify-between pointer-events-none">
        <a
          href="#"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="pointer-events-auto relative flex items-center justify-center w-[24px] h-9 transition-transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full"
        >
          <svg
            viewBox="0 0 30 46"
            className="w-full h-full text-accent drop-shadow-sm"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M 15 2 C 15 2 30 21 30 30.5 C 30 39 23.3 45.5 15 45.5 C 6.7 45.5 0 39 0 30.5 C 0 21 15 2 15 2 Z" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center pt-1.5 font-serif font-bold text-white text-[11px]">
            AG
          </span>
        </a>

        {/* Mobile Toggle */}
        <button
          className="pointer-events-auto font-mono uppercase text-xs text-foreground bg-background/85 backdrop-blur-sm px-3 py-1.5 border border-foreground/15 rounded-xs shadow-xs"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: isOpen ? 0 : "-100%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[65] bg-background flex flex-col justify-center items-center md:hidden"
      >
        <ul className="flex flex-col space-y-8 font-serif text-4xl text-center">
          {links.map((link) => {
            const targetId = link.href.slice(1);
            const isActive = activeSection === targetId;

            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`transition-colors flex flex-col items-center gap-1 ${
                    isActive ? "text-accent font-bold" : "text-foreground hover:text-accent"
                  }`}
                  onClick={(e) => {
                    handleLinkClick(e, link.href);
                    setIsOpen(false);
                  }}
                >
                  <span className="font-mono text-sm opacity-50">{link.id}</span>
                  <span>{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </>
  );
}
