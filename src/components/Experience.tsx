import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { ExperienceItem } from '../data/portfolioData';

interface ExperienceProps {
  experience: ExperienceItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <section id="experience" className="py-20 md:py-28 border-b border-neutral-800/60">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-semibold text-neutral-400 tracking-wider uppercase mb-2">
            03. Career & Milestones
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3 [text-wrap:balance]">
            Engineering Leadership & Proven Track Record
          </h2>
          <p className="text-base text-neutral-400 max-w-2xl">
            A chronologically organized history of leading engineering teams, solving distributed systems bottlenecks, and delivering mission-critical applications.
          </p>
        </div>

        {/* Editorial Timeline Stack */}
        <div className="space-y-10">
          {experience.map((item, idx) => (
            <div
              key={item.id}
              className="relative p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 transition-colors hover:border-neutral-700"
            >
              {/* Top Row: Role, Company, Period */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {item.role}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-neutral-300 font-medium mt-0.5">
                    <span>{item.company}</span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span className="text-neutral-400 text-xs">{item.location}</span>
                  </div>
                </div>

                {/* Unboxed Metadata (NO PILLS) */}
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{item.period}</span>
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                  <span className="text-neutral-300">{item.type}</span>
                </div>
              </div>

              {/* Role Summary */}
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Quantifiable Achievements */}
              <div className="space-y-2.5 mb-6">
                {item.achievements.map((achieve, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>{achieve}</span>
                  </div>
                ))}
              </div>

              {/* Unboxed Tech Stack */}
              <div className="pt-4 border-t border-neutral-800/80 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-neutral-400">
                <span className="text-neutral-500 font-medium">Core Stack:</span>
                {item.technologies.map((tech, i) => (
                  <React.Fragment key={tech}>
                    <span className="text-neutral-300 font-mono">{tech}</span>
                    {i < item.technologies.length - 1 && (
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
