/**
 * ============================================================================
 *  PORTFOLIO DATA CONFIGURATION (SINGLE SOURCE OF TRUTH)
 * ============================================================================
 *  Edit this file to update any text, links, images, CV path, or folder items.
 *
 *  ASSETS GUIDE (`/public` folder):
 *  - Profile photo: Put photo in `public/tharaka.jpeg` -> `profileImage: "/tharaka.jpeg"`
 *  - Contact photo: Put photo in `public/tharaka-verified.png` -> `contactImage: "/tharaka-verified.png"`
 *  - CV PDF:        Put `cv.pdf` at `public/cv.pdf` -> `cvUrl: "/cv.pdf"`
 *  - Project imgs:  Put images in `public/images/projects/...` -> `"/images/projects/..."`
 *  - Company logos: Put images/logos in `public/images/companies/...` -> `image` / `companyLogo`
 *  - Blog covers:   Put covers in `public/images/blogs/...` -> `"/images/blogs/..."`
 *  - Skill visuals: Put visuals in `public/images/skills/...` -> `"/images/skills/..."`
 *
 *  Tip: Leave `image: ""` until you upload the file to `public/` — the UI
 *  automatically renders a clean glassmorphic fallback with zero broken images.
 * ============================================================================
 */

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  period: string;
  status: string;
  image?: string;
  summary: string;
  story: {
    heading: string;
    detail: string;
  }[];
  metrics: {
    label: string;
    value: string;
  }[];
  capabilities: string[];
  technologies: string[];
  links: {
    live?: string;
    github?: string;
  };
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  image?: string;
  companyLogo?: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface BlogItem {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
  summary: string;
  body: string[];
  takeaways: string[];
  tags: string[];
  href?: string;
}

export interface SoftSkillItem {
  id: string;
  num: string;
  title: string;
  tagline: string;
  description: string;
  image?: string;
  tags: string[];
  workflowTitle: string;
  workflowSubtitle: string;
  points: {
    heading: string;
    detail: string;
  }[];
}

export interface TechnicalSkillItem {
  id: string;
  category: string;
  eyebrow: string;
  summary: string;
  experienceLevel: string;
  primaryStack: string[];
  architectureFocus: string[];
  ecosystemTools: string[];
}

export interface SocialLink {
  name: "Facebook" | "GitHub" | "LinkedIn" | "Email";
  handle: string;
  url: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Tharaka Dharmasiri",
    alternateName: "Supun",
    initials: "TD",
    role: "Associate Software Engineer",
    company: "Nexone World",
    profileImage: "/tharaka.jpeg",
    contactImage: "/tharaka-verified.png",
    introTitle: "Built in quiet focus.",
    introHint: "Scroll or tap to enter",
    heroQuote: "Precision in thought. Calm in execution.",
    heroSummary:
      "Tharaka Dharmasiri (Supun) — Associate Software Engineer at Nexone World engineering production SaaS platforms, cloud APIs, and enterprise integrations.",
    location: "Colombo, Sri Lanka",
    availability: "Open to new opportunities",
    email: "supuntharaka.personal@gmail.com",
    cvUrl: "/cv.pdf",
    siteUrl: "https://www.supun.me",
    copyrightYear: "2026",
  },

  about: {
    headline: "Associate Software Engineer at Nexone World.",
    bio: "Working as an Associate Software Engineer at Nexone World alongside my B.Sc. (Hons) in Information Technology at SLIIT. Known professionally as Tharaka Dharmasiri (Supun), I craft high-performance SaaS applications, reliable cloud APIs, and enterprise payment integrations.",
    highlights: [
      {
        label: "Current Role",
        value: "Associate SE",
      },
      {
        label: "Past Experience",
        value: "SKYREK (Pvt) Ltd.",
      },
      {
        label: "Flagship SaaS",
        value: "BusSeatBooking.com",
      },
      {
        label: "Specialty",
        value: "Next.js, React",
      },
    ],
  },

  projects: [
    {
      id: "bus-seat-booking",
      title: "Bus Seat Booking",
      tagline: "Production Transit SaaS Platform",
      period: "2025 — Present",
      status: "Live Production",
      image: "", // e.g. "/images/projects/bus-seat-booking.webp"
      summary:
        "A real-world digital reservation SaaS platform transforming long-distance bus transit with 5-second real-time seat sync, 15-minute concurrency locking, and HNB Bank Cybersource payments.",
      story: [
        {
          heading: "Commuter Friction to Client Buy-In",
          detail:
            "Built after repeatedly calling bus operators to check availability. Designed the prototype, pitched directly to bus owners, and digitized fleet reservations end-to-end.",
        },
        {
          heading: "HNB Cybersource Gateway Integration",
          detail:
            "Migrated checkout from PayHere to HNB Bank Cybersource Gateway—implementing HMAC cryptographic signature generation and secure server callback webhooks.",
        },
        {
          heading: "5s Polling & 15-Minute Seat Locks",
          detail:
            "Engineered automatic 5-second seat state synchronization paired with 15-minute concurrency locking to guarantee zero double-bookings under load.",
        },
        {
          heading: "Dynamic Admin Layout Designer",
          detail:
            "Built a drag-and-drop visual bus seat designer supporting 2x2, 2x1, sleeper, and luxury coach geometries directly rendered for passengers.",
        },
      ],
      metrics: [
        { label: "Active Users", value: "1,000+" },
        { label: "Total Bookings", value: "10,000+" },
        { label: "Live State Sync", value: "5s Sync" },
        { label: "Seat Concurrency", value: "15-Min Lock" },
      ],
      capabilities: [
        "5-second real-time seat layout state auto-sync",
        "Automated 15-minute seat locking concurrency control",
        "Dynamic Admin visual bus seat layout designer",
        "HNB Bank Cybersource Payment Gateway integration",
        "Automated Twilio SMS booking & digital ticket pipeline",
        "Operator Admin Dashboard for fleet & revenue control",
      ],
      technologies: [
        "Next.js",
        "TypeScript",
        "Node.js",
        "Express",
        "MongoDB",
        "Tailwind CSS",
        "HNB Cybersource",
        "Twilio SMS",
      ],
      links: {
        live: "https://www.busseatbooking.com/",
        github: "https://github.com/chooty-dev",
      },
    },
    {
      id: "newgen-erp",
      title: "Newgen Online School",
      tagline: "Next.js & PostgreSQL Learning Platform",
      period: "2026",
      status: "Enterprise Shipped",
      image: "/newgen.png",
      summary:
        "Enterprise-grade Learning Management System and executive reporting dashboards engineered with Next.js, TypeScript, Prisma, and PostgreSQL.",
      story: [
        {
          heading: "Scalable Dashboard Architecture",
          detail:
            "Architected responsive administrative workflows for course administration, student tracking, and role-scoped permissions.",
        },
        {
          heading: "Automated Report Generation",
          detail:
            "Implemented structured analytics and automated operational report exports backed by relational PostgreSQL queries via Prisma.",
        },
      ],
      metrics: [
        { label: "Core Stack", value: "Next.js" },
        { label: "Database", value: "PostgreSQL" },
        { label: "ORM Layer", value: "Prisma" },
        { label: "Deployment", value: "Vercel" },
      ],
      capabilities: [
        "Full-stack LMS workflows and role-based admin dashboards",
        "Relational PostgreSQL schema design with Prisma ORM",
        "Automated report generation and operational exports",
        "Type-safe Next.js App Router API endpoints",
      ],
      technologies: [
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "Node.js",
        "Vercel",
      ],
      links: {
        github: "https://github.com/chooty-dev",
      },
    },
  ] satisfies ProjectItem[],

  experience: [

    {
      id: "exp-skyrek",
      company: "SKYREK (Pvt) Ltd.",
      position: "Full-Stack Developer — Intern",
      duration: "November 2024 — May 2025",
      location: "Remote",
      image: "/skyrek.jpg", // e.g. "/images/companies/skyrek-cover.webp"
      companyLogo: "/skyrek.jpg", // e.g. "/images/companies/skyrek-logo.png"
      description:
        "Engineered enterprise-grade web applications, administrative control surfaces, and relational database backends.",
      achievements: [
        "Built production Admin dashboards using Next.js and TypeScript",
        "Designed relational data models and queries with Prisma and PostgreSQL",
        "Implemented automated operational report generation features",
        "Developed and shipped a full-stack LMS web application",
      ],
      technologies: [
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "Node.js",
        "Vercel",
        "Git",
      ],
    },
    {
      id: "exp-nexone-world",
      company: "Nexone World",
      position: "Associate Software Engineer",
      duration: "Present",
      location: "Hybrid",
      image: "/nexone.webp",
      companyLogo: "/nexone.webp",
      description:
        "Engineering full-stack production web systems, scalable backend services, and responsive product interfaces as part of the core software engineering team.",
      achievements: [
        "Developing end-to-end web features with Next.js, React, and TypeScript",
        "Architecting maintainable APIs and reliable relational database workflows",
        "Optimizing frontend load speed, responsive behavior, and system stability",
        "Collaborating with cross-functional teams to ship production software on time",
      ],
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Tailwind CSS",
        "Git",
      ],
    },
  ] satisfies ExperienceItem[],

  blogs: [
    {
      id: "blog-cybersource",
      title: "Integrating HNB Cybersource Payment Gateway in Next.js",
      category: "Payments & Security",
      date: "2025",
      readTime: "6 min read",
      image: "", // e.g. "/images/blogs/cybersource.webp"
      summary:
        "Lessons from migrating a live transit SaaS platform from PayHere to HNB Bank's enterprise Cybersource Gateway.",
      body: [
        "Enterprise banking gateways enforce strict cryptographic verification, deterministic field ordering, and tamper-proof HMAC-SHA256 signatures on every checkout request.",
        "By isolating signing keys on server-only routes, validating callback webhook payloads asynchronously, and reconciling pending seat locks idempotently, checkout failures dropped to zero across thousands of live passenger bookings.",
      ],
      takeaways: [
        "Sign every transaction payload server-side with strict field ordering",
        "Verify bank webhook signatures before confirming inventory",
        "Design idempotent payment reconciliation for flaky mobile networks",
      ],
      tags: ["Next.js", "Cybersource", "HMAC Security", "Payments"],
      href: "",
    },
    {
      id: "blog-seat-locking",
      title: "Zero Double-Booking with 15-Minute Seat Concurrency Locks",
      category: "System Architecture",
      date: "2025",
      readTime: "5 min read",
      image: "", // e.g. "/images/blogs/concurrency.webp"
      summary:
        "How 5-second state polling and TTL seat reservations prevent race conditions on high-demand routes.",
      body: [
        "When multiple passengers tap the exact same bus seat within seconds of each other, naive client state breaks down immediately.",
        "Combining atomic seat reservation locks with a 15-minute checkout expiry window and lightweight 5-second layout synchronization keeps seat maps accurate without heavy WebSocket infrastructure overhead.",
      ],
      takeaways: [
        "Use atomic reservation locks prior to payment initiation",
        "Expire stale holds automatically at 15 minutes",
        "Keep client polling payloads minimal for 3G/4G transit networks",
      ],
      tags: ["Concurrency", "MongoDB", "Real-Time Sync", "SaaS"],
      href: "",
    },
    {
      id: "blog-layout-designer",
      title: "Modeling Dynamic Bus Seat Geometries Visually",
      category: "Product Engineering",
      date: "2024",
      readTime: "4 min read",
      image: "", // e.g. "/images/blogs/layout-designer.webp"
      summary:
        "Replacing rigid hardcoded bus grids with an operator-driven drag-and-drop seat geometry builder.",
      body: [
        "Every bus fleet varies wildly—2x2 coaches, 2x1 VIP layouts, rear bench rows, and sleeper decks cannot fit a single static template.",
        "Representing each coach floorplan as a compact coordinate matrix lets operators assemble true-to-life maps visually while passengers book against the exact physical seat numbers.",
      ],
      takeaways: [
        "Store fleet layouts as declarative coordinate schemas",
        "Separate visual geometry from pricing and lock state",
        "Build operator tooling first to unlock real-world adoption",
      ],
      tags: ["React", "UI Architecture", "Operator Tools"],
      href: "",
    },
  ] satisfies BlogItem[],

  softSkills: [
    {
      id: "soft-critical-thinking",
      num: "01.",
      title: "Critical Thinking",
      tagline: "Problem-Solving Mindset",
      description:
        "I analyze root constraints deeply, question assumptions, and architect systems built to scale cleanly.",
      image: "", // e.g. "/images/skills/brain.png"
      tags: ["Strategic Planning", "Root Cause Analysis", "System Trade-Offs"],
      workflowTitle: "How I Think",
      workflowSubtitle: "Analytical Workflow",
      points: [
        {
          heading: "Root-Cause Discovery",
          detail:
            "Deconstruct problems to their core constraints instead of patching surface symptoms.",
        },
        {
          heading: "Scalable Architecture",
          detail:
            "Design modular system boundaries ready to support 10x user and booking growth.",
        },
        {
          heading: "Trade-Off Evaluation",
          detail:
            "Measure latency, concurrency safety, and maintenance cost before committing to an approach.",
        },
      ],
    },
    {
      id: "soft-ontime-delivery",
      num: "02.",
      title: "On-Time Delivery",
      tagline: "Reliable & Punctual",
      description:
        "Consistent execution ahead of schedule through disciplined milestone tracking and risk buffering.",
      image: "", // e.g. "/images/skills/deve.png"
      tags: ["Time Management", "Milestone Tracking", "Buffer Planning"],
      workflowTitle: "Delivery Process",
      workflowSubtitle: "Engineering Efficiency",
      points: [
        {
          heading: "Sprint & Milestone Clarity",
          detail:
            "Break complex deliverables into crisp shippable milestones with built-in risk buffers.",
        },
        {
          heading: "Agile Feedback Loops",
          detail:
            "Ship continuously with early stakeholder demos and automated verification checks.",
        },
        {
          heading: "100% Deadline Track Record",
          detail:
            "Every client and internship deliverable shipped on or ahead of committed target dates.",
        },
      ],
    },
    {
      id: "soft-ai-coding",
      num: "03.",
      title: "AI-Assisted Coding",
      tagline: "Modern Workflow",
      description:
        "Leveraging AI engineering workflows to accelerate prototyping, harden edge cases, and keep code clean.",
      image: "", // e.g. "/images/skills/ai.png"
      tags: ["Claude AI", "GitHub Copilot", "Automated Review"],
      workflowTitle: "Modern Tech Integration",
      workflowSubtitle: "AI-Augmented Engineering",
      points: [
        {
          heading: "Rapid Prototyping",
          detail:
            "Validate product schemas, interfaces, and APIs in hours rather than weeks.",
        },
        {
          heading: "Boundary & Quality Hardening",
          detail:
            "Pair AI-generated edge-case coverage with strict human architectural review.",
        },
        {
          heading: "Continuous Refactoring",
          detail:
            "Keep production modules concise, strongly typed, and maintainable.",
        },
      ],
    },
    {
      id: "soft-product-ownership",
      num: "04.",
      title: "Product Ownership",
      tagline: "Idea to Live Revenue",
      description:
        "Bridging engineering and business—identifying real friction, pitching stakeholders, and shipping live SaaS.",
      image: "",
      tags: ["Client Pitching", "SaaS Strategy", "User Empathy"],
      workflowTitle: "Ownership Loop",
      workflowSubtitle: "Business Impact",
      points: [
        {
          heading: "Field Discovery",
          detail:
            "Observe real-world user friction firsthand and validate solutions before writing heavy code.",
        },
        {
          heading: "Direct Stakeholder Pitching",
          detail:
            "Translate technical architecture into clear operational ROI for non-technical clients.",
        },
        {
          heading: "End-to-End Accountability",
          detail:
            "Own uptime, payment security, SMS reliability, and UX polish post-launch.",
        },
      ],
    },
  ] satisfies SoftSkillItem[],

  technicalSkills: [
    {
      id: "tech-frontend",
      category: "Frontend Engineering",
      eyebrow: "UI & Client Systems",
      summary:
        "Building responsive, accessible, motion-refined interfaces with modern React and Next.js App Router.",
      experienceLevel: "Production Primary",
      primaryStack: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
      architectureFocus: [
        "Server & Client Component boundary optimization",
        "Component design systems with Shadcn UI & Base UI",
        "Interactive drag-and-drop canvas & layout tooling",
      ],
      ecosystemTools: ["Framer Motion", "Vite.js", "Figma", "CSS Tokens"],
    },
    {
      id: "tech-backend",
      category: "Backend & APIs",
      eyebrow: "Services & Logic",
      summary:
        "Architecting high-throughput REST & GraphQL backends, concurrency locks, and webhook pipelines.",
      experienceLevel: "Production Primary",
      primaryStack: ["Node.js", "Express", "Java", "Python", "GraphQL"],
      architectureFocus: [
        "Cryptographic payment gateway & webhook verification",
        "Concurrency-safe seat locking & TTL state pipelines",
        "Modular API design with strict schema validation",
      ],
      ecosystemTools: ["REST APIs", "Webhooks", "HMAC-SHA256", "Postman"],
    },
    {
      id: "tech-data-cloud",
      category: "Databases & Cloud",
      eyebrow: "Persistence & Scale",
      summary:
        "Modeling relational and document schemas for transactional integrity, fast queries, and cloud deployment.",
      experienceLevel: "Production Ready",
      primaryStack: ["PostgreSQL", "MongoDB", "Prisma", "Vercel"],
      architectureFocus: [
        "Relational schema modeling & reporting queries in PostgreSQL",
        "High-frequency document state sync in MongoDB",
        "Zero-downtime edge & serverless deployments on Vercel",
      ],
      ecosystemTools: ["Prisma ORM", "Indexing", "Serverless Functions", "GitHub Actions"],
    },
    {
      id: "tech-integrations",
      category: "Tooling & Integrations",
      eyebrow: "Enterprise Ecosystem",
      summary:
        "Connecting payment banks, messaging APIs, and modern developer tooling into reliable production workflows.",
      experienceLevel: "Production Ready",
      primaryStack: ["HNB Cybersource", "Twilio SMS", "Git", "GitHub"],
      architectureFocus: [
        "Enterprise banking integration (HNB Cybersource Gateway)",
        "Automated transactional SMS ticketing via Twilio",
        "Clean Git workflows, code review, and API verification",
      ],
      ecosystemTools: ["VS Code", "Postman", "Figma", "ESLint / TypeScript"],
    },
  ] satisfies TechnicalSkillItem[],

  socials: [
    {
      name: "Facebook",
      handle: "Tharaka Dharmasiri",
      url: "https://web.facebook.com/supun.tharaka.9277",
    },
    {
      name: "GitHub",
      handle: "Chooty Dev",
      url: "https://github.com/chooty-dev",
    },
    {
      name: "LinkedIn",
      handle: "Tharaka Dharmasiri",
      url: "https://www.linkedin.com/in/tharaka-dharmasiri-3ba950204?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    },
    {
      name: "Email",
      handle: "supuntharaka.personal@gmail.com",
      url: "mailto:supuntharaka.personal@gmail.com",
    },
  ] satisfies SocialLink[],
} as const;

export type PortfolioData = typeof PORTFOLIO_DATA;

