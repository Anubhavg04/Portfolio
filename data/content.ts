export interface Project {
  id: string;
  index: string;
  title: string;
  description: string;
  chips: string[];
  links: {
    live?: string;
    github?: string;
  };
  cover?: string;
  caption?: string;
  featured?: boolean;
  badge?: string;
  coverType?: "image" | "svg-quickeat" | "svg-memorymatrix";
}

export const content = {
  hero: {
    name: "Anubhav Gupta",
    role: "Backend engineer · Java & Spring Boot · Node.js · Full-stack when it matters",
    tagline: "I build backends that don't break under pressure, and the interfaces that make them feel effortless.",
    marginNote: "I break things locally so they work globally.",
    location: "Noida, India",
    availability: "open to work"
  },
  projects: [
    {
      id: "stockpilot",
      index: "01",
      title: "StockPilot",
      description: "A production-style inventory and order backend that never oversells: JWT auth with RBAC, an order state machine, optimistic locking, Redis caching and Kafka events.",
      chips: ["Java 17", "Spring Boot 3", "PostgreSQL", "Redis", "Kafka", "Docker"],
      links: {
        github: "https://github.com/Anubhavg04/StockPilot"
      },
      cover: "/assets/projects/stockpilot-cover.jpg",
      caption: "backend only, no UI, all engine",
      featured: true,
      badge: "Backend only · no UI",
      coverType: "image"
    },
    {
      id: "patternflow",
      index: "02",
      title: "AI-Powered PatternFlow",
      description: "An AI platform that teaches DSA patterns through guided hints instead of direct solutions.",
      chips: ["Next.js", "TypeScript", "LLM", "PostgreSQL", "Clerk"],
      links: {
        live: "https://patternflowdsa.in"
      },
      cover: "/assets/projects/patternflow.jpg",
      caption: "hints, not answers",
      coverType: "image"
    },
    {
      id: "devtrack",
      index: "03",
      title: "DevTrack Learning Tracker",
      description: "A developer learning tracker with sessions, goals and analytics, plus a 365-day activity heatmap.",
      chips: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Auth.js"],
      links: {
        live: "https://devtrackapp-orcin.vercel.app/",
        github: "https://github.com/Anubhavg04/Devtrack"
      },
      cover: "/assets/projects/devtrack.jpg",
      caption: "my own streak lives here",
      coverType: "image"
    },
    {
      id: "ai-support",
      index: "04",
      title: "AI.Support",
      description: "An embeddable AI support chatbot you add to any website with one script tag.",
      chips: ["Next.js", "TypeScript", "AI/LLM"],
      links: {
        live: "https://ai-support-omega.vercel.app",
        github: "https://github.com/Anubhavg04/AI-Support"
      },
      cover: "/assets/projects/ai-support.jpg",
      caption: "one script tag, fully working",
      coverType: "image"
    },
    {
      id: "quickeat",
      index: "05",
      title: "QuickEat Food Delivery Platform",
      description: "A food delivery app with real-time order tracking, role-based access and Stripe payments.",
      chips: ["Node.js", "Express", "MongoDB", "Socket.io", "Stripe", "React"],
      links: {
        github: "https://github.com/Anubhavg04/QuicEat---Food-Delivery"
      },
      caption: "real-time order tracking strip",
      coverType: "svg-quickeat"
    },
    {
      id: "memory-matrix",
      index: "06",
      title: "Memory Matrix Challenge",
      description: "A browser memory game with 4 difficulty grids and a performance analytics panel.",
      chips: ["JavaScript", "HTML/CSS"],
      links: {
        live: "https://m3challenge.netlify.app"
      },
      caption: "4 grid levels · cognitive analytics",
      coverType: "svg-memorymatrix"
    }
  ] as Project[],
  stack: {
    backend: ["Java", "Spring Boot", "Spring Security", "JPA/Hibernate", "Node.js", "Express", "Kafka", "Redis", "WebSockets"],
    data: ["PostgreSQL", "MongoDB", "Prisma"],
    frontendShip: ["Next.js", "React", "TypeScript", "Tailwind", "Docker", "AWS", "GitHub Actions", "Jenkins"]
  },
  about: {
    paragraphs: [
      "I love hard backend problems—concurrency, data integrity, performance—but I also care deeply about the interfaces that wrap them. I ship complete products end-to-end, making sure the engine runs flawlessly and the surface feels effortless.",
      "Currently deep-diving into system design and scalable architectures. I'm usually serious when coding, but I get funnier once I'm comfortable."
    ],
    education: "B.Tech, Electronics & Communication, IIITDM Jabalpur",
    now: {
      building: "backend-heavy products",
      learning: "System Design",
      status: "open to work"
    }
  },
  contact: {
    title: "Let's build something that holds up.",
    email: "theanubhav333@gmail.com",
    links: [
      { name: "GitHub", url: "https://github.com/Anubhavg04" },
      { name: "LinkedIn", url: "https://linkedin.com/in/Anubhavg23" },
      { name: "X", url: "https://x.com/Dev_code_04" }
    ],
    footer: "Set in Fraunces & JetBrains Mono. I break things locally so they work globally."
  }
};
