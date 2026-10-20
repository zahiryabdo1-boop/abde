export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'web' | 'systems' | 'creative' | 'mobile';
  categoryLabel: string;
  year: string;
  stack: string[];
  summary: string;
  challenge: string;
  architecture: string;
  impact: string[];
  image: string;
  simulatorType: 'fintech' | 'design-system' | 'cloud-nodes' | 'crdt';
  githubUrl?: string;
  liveUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Contract' | 'Advisory';
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  outcome: string;
}

export interface ProfileData {
  name: string;
  title: string;
  kicker: string;
  email: string;
  location: string;
  availability: string;
  shortBio: string;
  fullBio: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export const INITIAL_PROFILE: ProfileData = {
  name: "Zahir Abdo",
  title: "Full-Stack Engineer & Product Architect",
  kicker: "Software Engineering & System Architecture",
  email: "zahiryabdo1@gmail.com",
  location: "London, UK (Available Globally / Remote)",
  availability: "Accepting select technical advisory & engineering projects",
  shortBio: "Engineering durable distributed software systems, high-performance full-stack web applications, and intuitive digital interfaces with unyielding attention to craftsmanship.",
  fullBio: "Over eight years building scalable digital platforms, real-time reactive architectures, and developer ecosystems. Focused on end-to-end software quality: from zero-downtime database migrations and microservice telemetry to fluid 60fps web interfaces and headless component libraries.",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
};

export const INITIAL_KPIS = [
  { value: "08+", label: "Years Engineering Craft", context: "Production-grade distributed software" },
  { value: "42+", label: "Shipped Systems & Apps", context: "From MVP prototypes to global scale" },
  { value: "99.98%", label: "System Availability SLA", context: "Fault-tolerant zero-downtime uptime" },
  { value: "1.4M+", label: "Global Users Served", context: "Daily active consumer & enterprise traffic" },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "apex-analytics",
    title: "Apex Global Financial Terminal",
    tagline: "High-throughput real-time portfolio analytics & market streaming platform",
    category: "web",
    categoryLabel: "Fintech & Web Platform",
    year: "2025",
    stack: ["TypeScript", "Next.js", "WebSockets", "Go", "ClickHouse", "Tailwind CSS"],
    summary: "Engineered a low-latency financial intelligence platform handling sub-50ms tick updates for institutional portfolio managers, featuring streaming chart telemetry and risk models.",
    challenge: "Existing charting tools suffered from memory leaks under sustained 10,000 msg/sec WebSocket streams, causing browser UI thread lag and delayed order execution notifications.",
    architecture: "Decoupled rendering into an offscreen WebWorker with shared ArrayBuffers for zero-copy binary data transfers. Applied ring buffers for time-series aggregation before RAF rendering.",
    impact: [
      "Reduced client-side memory footprint by 64% during high-volatility market sessions",
      "Achieved sub-16ms smooth frame budget under 12,000 continuous live ticks/second",
      "Adopted by 18 enterprise hedge funds and proprietary trading groups in 90 days"
    ],
    image: "/src/assets/images/showcase_fintech_platform_1792528083714.jpg",
    simulatorType: "fintech",
    githubUrl: "https://github.com/zahiryabdo/apex-analytics",
    liveUrl: "https://apex-analytics.example.com",
  },
  {
    id: "strata-design-system",
    title: "Strata Token Design Architecture",
    tagline: "Headless, accessible design engine & token synchronization toolchain",
    category: "creative",
    categoryLabel: "Creative Tech & UI Systems",
    year: "2025",
    stack: ["React 19", "Tailwind CSS", "TypeScript", "Figma REST API", "Radix Primitives"],
    summary: "Architected a multi-brand design system with automated bidirectional sync between Figma variables and production Tailwind theme tokens, serving 6 cross-functional engineering teams.",
    challenge: "Designers frequently introduced unverified CSS deviations, leading to fragmented visual standards, duplicate components, and painful design handoffs across web and mobile codebases.",
    architecture: "Built an AST-based token parser that compiles semantic JSON design tokens directly into typed Tailwind plugins, CSS custom properties, and automated contrast verification tests in CI.",
    impact: [
      "Cut feature UI implementation time from 14 days to 3.5 days across 4 squads",
      "Eliminated 100% of contrast accessibility violations with automated static analysis",
      "Maintained zero-breaking changes across 28 minor releases using semantic versioning"
    ],
    image: "/src/assets/images/showcase_creative_studio_1792528084540.jpg",
    simulatorType: "design-system",
    githubUrl: "https://github.com/zahiryabdo/strata-design-system",
    liveUrl: "https://strata-system.example.com",
  },
  {
    id: "hyperion-cloud-mesh",
    title: "Hyperion Edge Service Mesh",
    tagline: "Autonomous zero-trust traffic controller and distributed telemetry router",
    category: "systems",
    categoryLabel: "Cloud & Distributed Systems",
    year: "2024",
    stack: ["Go", "Docker", "Kubernetes", "gRPC", "Prometheus", "Envoy"],
    summary: "Constructed an edge routing proxy that transparently orchestrates multi-region failovers, dynamic rate-limiting, and end-to-end mTLS authentication for 38 microservices.",
    challenge: "Cross-region network latency spikes during database replication windows caused cascading 504 timeouts across dependent downstream microservices.",
    architecture: "Implemented token-bucket circuit breakers with adaptive exponential backoff and localized cache warming at edge PoPs, preventing thundering herd spikes during regional cold starts.",
    impact: [
      "Guaranteed 99.98% uptime SLA across 4 cloud geographical regions",
      "Dropped cross-continental median response latency from 320ms to 42ms via edge caching",
      "Automated automated disaster recovery failover in under 4 seconds without manual human intervention"
    ],
    image: "/src/assets/images/showcase_cloud_infrastructure_1792528084154.jpg",
    simulatorType: "cloud-nodes",
    githubUrl: "https://github.com/zahiryabdo/hyperion-mesh",
    liveUrl: "https://hyperion-mesh.example.com",
  },
  {
    id: "chrono-collaborative-engine",
    title: "Chrono Real-Time Document Engine",
    tagline: "Conflict-free replicated data type (CRDT) engine with offline-first sync",
    category: "web",
    categoryLabel: "Collaborative Software",
    year: "2024",
    stack: ["TypeScript", "Yjs", "WebRTC", "IndexedDB", "React"],
    summary: "Crafted a local-first collaborative rich-text editor engine supporting peer-to-peer document synchronization, cursor presence indicators, and seamless offline-to-online reconciliation.",
    challenge: "Handling concurrent document modifications across flaky mobile connections without central server latency bottlenecks or losing user keystrokes during network partitions.",
    architecture: "Integrated state-based CRDT structures persisted in client IndexedDB with delta-compression network protocols over encrypted WebRTC data channels.",
    impact: [
      "Zero lost edits across 50,000+ simulated concurrent partition stress tests",
      "Instantaneous local keystroke response with 0ms perceived input latency",
      "Full offline functionality with automatic instant background reconciliation upon reconnect"
    ],
    image: "/src/assets/images/showcase_creative_studio_1792528084540.jpg",
    simulatorType: "crdt",
    githubUrl: "https://github.com/zahiryabdo/chrono-crdt",
    liveUrl: "https://chrono-engine.example.com",
  }
];

export const INITIAL_EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Lead Full-Stack Architect",
    company: "Vanguard Tech Labs",
    location: "London, UK / Remote",
    period: "2023 — Present",
    type: "Full-time",
    description: "Guiding the architectural evolution of enterprise web applications and distributed backend microservices. Mentoring senior engineering staff and driving high-reliability cloud standards.",
    achievements: [
      "Spearheaded migration of legacy monolith to modular TypeScript & Go microservices, improving deployment frequency from bi-weekly to 8x daily",
      "Instituted unified frontend performance budgets, driving Core Web Vitals pass rate from 48% to 98% across 12 public properties",
      "Architected real-time notification and telemetry pipeline servicing 1.4M active sessions"
    ],
    technologies: ["TypeScript", "React", "Next.js", "Node.js", "Go", "PostgreSQL", "Docker", "AWS"],
  },
  {
    id: "exp-2",
    role: "Senior Software Engineer",
    company: "Aether Systems",
    location: "San Francisco / Remote",
    period: "2020 — 2023",
    type: "Full-time",
    description: "Designed core transactional engines, real-time analytics dashboards, and developer SDKs for high-growth SaaS clients in fintech and logistics.",
    achievements: [
      "Led engineering team of 6 building a high-frequency telemetry dashboard handling 5M daily queries",
      "Reduced p99 API response latencies by 41% via Redis caching layers and PostgreSQL query plan optimizations",
      "Authored internal UI component library adopted across 14 internal product squads"
    ],
    technologies: ["React", "TypeScript", "Node.js", "GraphQL", "Redis", "PostgreSQL", "Tailwind CSS"],
  },
  {
    id: "exp-3",
    role: "Software Engineer",
    company: "Horizon Digital Studio",
    location: "London, UK",
    period: "2018 — 2020",
    type: "Full-time",
    description: "Built responsive web applications, headless e-commerce architectures, and bespoke client portals for high-profile digital brands and startups.",
    achievements: [
      "Delivered 18 custom full-stack web applications on time and within budget",
      "Implemented comprehensive CI/CD automated test suites covering unit, integration, and visual regression tests",
      "Reduced average page bundle sizes by 55% using tree-shaking and dynamic code-splitting"
    ],
    technologies: ["JavaScript / TypeScript", "React", "REST APIs", "Express", "MongoDB", "CSS3 / Sass"],
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    quote: "Zahir transformed our core application from an unstable, sluggish prototype into an ultra-fast, rock-solid enterprise platform. His deep mastery of both low-level backend concurrency and fluid frontend architecture is genuinely rare.",
    author: "Elena Rostova",
    role: "Chief Technology Officer",
    company: "Novus Financial Technologies",
    outcome: "Saved $140K in cloud infrastructure costs while reducing user crash rates to 0.01% in 6 months."
  },
  {
    id: "test-2",
    quote: "Working alongside Zahir set a new engineering benchmark for our organization. He doesn't merely write pristine code; he builds clear systems, communicates trade-offs transparently, and accelerates the entire product team.",
    author: "Marcus Sterling",
    role: "VP of Product",
    company: "Strata Intelligence",
    outcome: "Cut quarterly release cycle from 6 weeks to 9 business days with zero regression rollbacks."
  },
  {
    id: "test-3",
    quote: "Zahir delivered our real-time streaming dashboard ahead of schedule. The interface feels weightless, responsive, and meticulously crafted down to the exact millisecond of animation settling.",
    author: "Dr. Aris Thorne",
    role: "Head of Infrastructure",
    company: "Helios Distributed Cloud",
    outcome: "Scaled platform to 450,000 concurrent connected devices with flawless 99.99% availability."
  }
];

export const ARCHITECTURE_PILLARS = [
  {
    number: "01",
    title: "Durability & Zero-Degradation",
    description: "Systems must fail gracefully, isolate errors, and self-heal. I design every state machine and network boundary to assume dropped packets, network partitions, and unexpected payloads.",
    highlights: ["Graceful degradation", "Circuit breakers & retries", "Strict type invariants"]
  },
  {
    number: "02",
    title: "Performance as a Fundamental Feature",
    description: "Sub-100ms interactions and instant perceived response are not aesthetic luxuries; they directly dictate user retention, mental clarity, and conversion velocity.",
    highlights: ["Sub-16ms frame budget", "Zero-copy worker threads", "Aggressive bundle pruning"]
  },
  {
    number: "03",
    title: "Clean Ergonomics & Token Discipline",
    description: "A codebase is read ten times more often than it is written. Clean component contracts, deterministic state models, and unified design token systems prevent technical debt before it manifests.",
    highlights: ["Single source of truth", "Deterministic state", "Uncompromising accessibility"]
  },
  {
    number: "04",
    title: "Pragmatic Business Alignment",
    description: "Great architecture serves human goals. I prioritize high-leverage solutions that ship rapidly, scale predictably, and empower teams to innovate without perpetual rewrites.",
    highlights: ["Time-to-market focus", "Sensible tech choices", "Measurable ROI"]
  }
];

export const SCOPE_TIERS = [
  {
    id: "mvp",
    name: "Rapid MVP & Launch Prototype",
    timelineWeeks: 3,
    baseCost: 6500,
    idealFor: "Startups and founders seeking to validate product-market fit with an impeccable production-ready v1.",
    deliverables: [
      "Full-stack web application with responsive UI",
      "Authentication & role-based permissions",
      "Primary database schema & ORM setup",
      "Automated CI/CD deployment pipeline",
      "Source code & architecture documentation"
    ]
  },
  {
    id: "modernization",
    name: "Architecture & Frontend Modernization",
    timelineWeeks: 6,
    baseCost: 12000,
    idealFor: "Established teams with legacy performance bottlenecks, messy codebases, or sluggish interfaces.",
    deliverables: [
      "Comprehensive performance & security audit",
      "Component library refactoring & design token setup",
      "State management & API layer overhaul",
      "Core Web Vitals optimization (>90 score guarantee)",
      "Developer documentation & squad mentoring"
    ]
  },
  {
    id: "enterprise",
    name: "End-to-End Scalable Platform",
    timelineWeeks: 10,
    baseCost: 22000,
    idealFor: "Companies needing a robust, multi-tenant system with real-time capabilities and strict uptime requirements.",
    deliverables: [
      "Distributed backend services & database sharding",
      "Real-time WebSockets / streaming data integration",
      "Comprehensive automated test coverage (Unit + E2E)",
      "Telemetry, observability & alerting setup",
      "Production deployment with zero-downtime cutover"
    ]
  }
];

export const SCOPE_ADDONS = [
  { id: "websockets", name: "Real-Time Streaming / WebSockets", cost: 2500, timeDays: 5 },
  { id: "payments", name: "Stripe / Payment Gateway Integration", cost: 1800, timeDays: 4 },
  { id: "ai", name: "LLM / AI Model Integration & Streaming", cost: 2800, timeDays: 6 },
  { id: "analytics", name: "High-Throughput Analytics Dashboard", cost: 3200, timeDays: 7 },
  { id: "offline", name: "Offline-First Local Sync (PWA / IndexedDB)", cost: 2400, timeDays: 5 }
];
