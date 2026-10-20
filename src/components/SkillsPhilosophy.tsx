import React from 'react';
import { ARCHITECTURE_PILLARS } from '../data/portfolioData';
import { Shield, Zap, GitBranch, Terminal } from 'lucide-react';

const TECHNICAL_SKILLS = [
  {
    category: "Frontend Architecture",
    description: "Deep expertise in modern React concurrency, state machines, and micro-interactions.",
    skills: ["React 19", "Next.js (App Router)", "TypeScript (Strict)", "Tailwind CSS v4", "WebWorkers", "State Machines (XState)", "Canvas & WebGL"]
  },
  {
    category: "Backend & Systems",
    description: "Resilient server-side execution, data modelling, and high-concurrency stream processing.",
    skills: ["Node.js / Express", "Go (Golang)", "PostgreSQL", "ClickHouse", "Redis & In-Memory Queues", "gRPC / Protobuf", "WebSockets / SSE"]
  },
  {
    category: "Cloud, Edge & Reliability",
    description: "Containerized environments, automated continuous deployment, and telemetry monitors.",
    skills: ["Docker", "Kubernetes", "AWS / GCP", "Terraform", "Prometheus & Grafana", "Cloudflare Workers", "CI/CD (GitHub Actions)"]
  },
  {
    category: "Methodology & Standards",
    description: "Software hygiene that ensures teams move quickly without accumulating fragile debt.",
    skills: ["Zero-Downtime Migrations", "Automated E2E Testing", "Semantic Versioning", "Design Tokens", "WCAG 2.1 AA Compliance", "Security Hardening"]
  }
];

export const SkillsPhilosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-20 md:py-28 border-b border-neutral-800/60 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-semibold text-neutral-400 tracking-wider uppercase mb-2">
            04. Architecture & Technical Foundations
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3 [text-wrap:balance]">
            Engineering Philosophy & Capabilities Matrix
          </h2>
          <p className="text-base text-neutral-400 max-w-2xl">
            Software architectures built on deterministic principles, uncompromising performance benchmarks, and sustainable team ergonomics.
          </p>
        </div>

        {/* 4 Governing Architecture Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {ARCHITECTURE_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="font-display text-2xl font-bold text-neutral-500 mb-3 font-mono">
                  {pillar.number}
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>

              {/* Unboxed Highlights (NO PILLS) */}
              <div className="pt-4 border-t border-neutral-800/80 space-y-1 text-xs text-neutral-400">
                {pillar.highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-neutral-300">
                    <span className="text-neutral-500 font-mono">·</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Capabilities Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TECHNICAL_SKILLS.map((item) => (
            <div
              key={item.category}
              className="p-6 sm:p-7 rounded-2xl bg-neutral-900/50 border border-neutral-800"
            >
              <h3 className="font-display text-xl font-bold text-white mb-1.5 tracking-tight">
                {item.category}
              </h3>
              <p className="text-xs text-neutral-400 mb-5 leading-relaxed">
                {item.description}
              </p>

              {/* Unboxed Separators (NO PILLS) */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-neutral-300 font-mono pt-3 border-t border-neutral-800/80">
                {item.skills.map((skill, sIdx) => (
                  <React.Fragment key={skill}>
                    <span className="text-neutral-200">{skill}</span>
                    {sIdx < item.skills.length - 1 && (
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
