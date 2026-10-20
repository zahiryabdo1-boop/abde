import React, { useState } from 'react';
import { ArrowDown, Copy, Check, Calculator, Sparkles, MapPin } from 'lucide-react';
import { ProfileData } from '../data/portfolioData';

interface HeroProps {
  profile: ProfileData;
  kpis: Array<{ value: string; label: string; context: string }>;
  onNavigateToProjects: () => void;
  onNavigateToEstimator: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  kpis,
  onNavigateToProjects,
  onNavigateToEstimator,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="top" className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-neutral-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Split Screen 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Unboxed Kicker */}
            <div className="flex items-center gap-2.5 text-xs font-medium text-neutral-400 mb-5 tracking-wide uppercase">
              <span>{profile.kicker}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Architecture & Full-Stack</span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-6 [text-wrap:balance]">
              Engineering durable systems & expressive digital experiences.
            </h1>

            {/* Lead Copy */}
            <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed max-w-2xl mb-8">
              {profile.shortBio}
            </p>

            {/* Availability & Location metadata (clean unboxed text with separators) */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-neutral-400 mb-8 border-y border-neutral-800/80 py-3">
              <div className="flex items-center gap-1.5 text-neutral-300">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>{profile.location}</span>
              </div>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-300 font-medium">{profile.availability}</span>
            </div>

            {/* Action buttons & Email Copy */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onNavigateToProjects}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-neutral-950 bg-white hover:bg-neutral-200 rounded-lg transition-colors shadow-sm whitespace-nowrap"
              >
                <span>Explore Selected Work</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onNavigateToEstimator}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors whitespace-nowrap"
              >
                <Calculator className="w-4 h-4 text-neutral-400" />
                <span>Calculate Project Scope</span>
              </button>

              {/* Instant Copy Email */}
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs font-mono text-neutral-400 hover:text-white bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/80 rounded-lg transition-colors"
                title="Copy direct email address"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Email Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{profile.email}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Container at Matching Height */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative group w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
              <img
                src="/src/assets/images/hero_portrait_architect_1792528067313.jpg"
                alt="Portrait of Zahir Abdo, Product Architect & Full-Stack Engineer"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 lg:h-[460px] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              {/* Measured contrast scrim and metadata caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center justify-between text-xs text-neutral-300 font-medium">
                  <div>
                    <span className="text-white font-semibold">{profile.name}</span>
                    <span aria-hidden="true" className="mx-2 text-neutral-500">·</span>
                    <span className="text-neutral-400">Digital Product Architect</span>
                  </div>
                  <span className="text-neutral-400 font-mono text-[11px]">Est. 2018</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width 4-Column KPI Strip below the split */}
        <div className="mt-16 pt-10 border-t border-neutral-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-1.5 tabular-nums">
                {kpi.value}
              </div>
              <div className="text-sm font-semibold text-neutral-200 mb-0.5">
                {kpi.label}
              </div>
              <div className="text-xs text-neutral-400">
                {kpi.context}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
