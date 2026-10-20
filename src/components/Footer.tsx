import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { ProfileData } from '../data/portfolioData';

interface FooterProps {
  profile: ProfileData;
  onOpenCustomizer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenCustomizer }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-800/80 bg-neutral-950 py-12 text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          
          {/* Brand & Tagline */}
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-white text-sm tracking-tight">
              {profile.name}
            </span>
            <span aria-hidden="true" className="text-neutral-700">/</span>
            <span className="text-neutral-400">{profile.title}</span>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center gap-6 text-neutral-400">
            <a href="#projects" className="hover:text-white transition-colors">
              Selected Work
            </a>
            <a href="#estimator" className="hover:text-white transition-colors">
              Scope Estimator
            </a>
            <a href="#experience" className="hover:text-white transition-colors">
              Experience
            </a>
            <a href="#philosophy" className="hover:text-white transition-colors">
              Philosophy
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
            <button
              onClick={onOpenCustomizer}
              className="text-neutral-400 hover:text-white transition-colors underline underline-offset-4"
            >
              Personalize
            </button>
          </div>

          {/* Social Icons & Back to top */}
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="text-neutral-400 hover:text-white transition-colors p-1.5"
              aria-label="Send direct email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 hover:text-white transition-colors p-1.5"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 hover:text-white transition-colors p-1.5"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors text-xs font-medium ml-2"
              aria-label="Scroll back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quiet Copyright Sub-Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved. Designed with zero-pill discipline and production typography.
          </div>
          <div className="font-mono text-neutral-400">
            {profile.location}
          </div>
        </div>

      </div>
    </footer>
  );
};
