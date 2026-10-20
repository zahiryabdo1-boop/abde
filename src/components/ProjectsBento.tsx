import React, { useState } from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectsBentoProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
}

export const ProjectsBento: React.FC<ProjectsBentoProps> = ({
  projects,
  onOpenProject,
}) => {
  const [filter, setFilter] = useState<'all' | 'web' | 'systems' | 'creative'>('all');

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <section id="projects" className="py-20 md:py-28 border-b border-neutral-800/60">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold text-neutral-400 tracking-wider uppercase mb-2">
              01. Selected Works & Case Studies
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              Production Systems & High-Fidelity Platforms
            </h2>
          </div>

          {/* Interactive Filter Tabs (Segmented Control - Functional Buttons) */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl shrink-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-white text-neutral-950 font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Works
            </button>
            <button
              onClick={() => setFilter('web')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                filter === 'web'
                  ? 'bg-white text-neutral-950 font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Web Platforms
            </button>
            <button
              onClick={() => setFilter('systems')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                filter === 'systems'
                  ? 'bg-white text-neutral-950 font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Cloud & Distributed
            </button>
            <button
              onClick={() => setFilter('creative')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                filter === 'creative'
                  ? 'bg-white text-neutral-950 font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Design Systems
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {filteredProjects.map((project, idx) => {
            // Bento configuration: First item is wide 8-col hero, second is 4-col, subsequent follow alternating patterns
            const isWide = idx === 0 || idx === 3;
            const colSpan = isWide ? 'md:col-span-8' : 'md:col-span-4';

            return (
              <div
                key={project.id}
                onClick={() => onOpenProject(project)}
                className={`${colSpan} group relative bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between`}
              >
                {/* Image Container with Fallback */}
                <div className="relative overflow-hidden bg-neutral-950 h-56 sm:h-64">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  {/* Subtle Top-Edge Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/20" />
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Unboxed Metadata (NO PILLS) */}
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2.5">
                      <span>{project.categoryLabel}</span>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span>{project.year}</span>
                    </div>

                    {/* Primary Title */}
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-neutral-100 transition-colors tracking-tight mb-2">
                      {project.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm text-neutral-300 line-clamp-2 leading-relaxed mb-4">
                      {project.summary}
                    </p>
                  </div>

                  {/* Card Bottom: Unboxed Stack & CTA */}
                  <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                    <div className="text-xs text-neutral-400 truncate max-w-[70%]">
                      {project.stack.slice(0, 3).join(' · ')}
                    </div>

                    <div className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:text-neutral-300 transition-colors whitespace-nowrap">
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
