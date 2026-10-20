import React from 'react';
import { Quote, TrendingUp } from 'lucide-react';
import { Testimonial } from '../data/portfolioData';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section className="py-20 md:py-28 border-b border-neutral-800/60">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-semibold text-neutral-400 tracking-wider uppercase mb-2">
            Endorsements & Engineering Proof
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3 [text-wrap:balance]">
            Trusted by Engineering Leaders & Founders
          </h2>
          <p className="text-base text-neutral-400 max-w-2xl">
            Real feedback from technical executives, product managers, and engineering partners on delivered software systems.
          </p>
        </div>

        {/* 3-Column Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-2xl bg-neutral-900/70 border border-neutral-800 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-6 h-6 text-neutral-600 mb-4 stroke-1" />
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-5 border-t border-neutral-800/80 space-y-3">
                {/* Attributable Outcome Claim */}
                <div className="flex items-start gap-2 text-xs text-neutral-300 bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                  <TrendingUp className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                  <span className="leading-snug">{item.outcome}</span>
                </div>

                {/* Author Info */}
                <div>
                  <div className="text-sm font-semibold text-white">{item.author}</div>
                  <div className="text-xs text-neutral-400">
                    {item.role} · <span className="text-neutral-300">{item.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
