import React, { useState } from 'react';
import { Settings, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  name: string;
  onOpenCustomizer: () => void;
  onNavigateToContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  name,
  onOpenCustomizer,
  onNavigateToContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark in display face */}
        <a
          href="#top"
          className="font-display text-xl font-bold tracking-tight text-white hover:text-neutral-200 transition-colors whitespace-nowrap shrink-0"
        >
          {name}
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
          <a
            href="#projects"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Selected Work
          </a>
          <a
            href="#estimator"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Scope Estimator
          </a>
          <a
            href="#experience"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Experience
          </a>
          <a
            href="#philosophy"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Philosophy
          </a>
          <a
            href="#contact"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCustomizer}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 rounded-lg transition-colors"
            title="Personalize Profile & Edit Information"
            aria-label="Personalize Profile"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={onNavigateToContact}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenCustomizer}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 rounded-lg"
            aria-label="Edit Profile"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950 px-6 py-5 flex flex-col gap-4 text-sm font-medium">
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-white py-1"
          >
            Selected Work
          </a>
          <a
            href="#estimator"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-white py-1"
          >
            Scope Estimator
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-white py-1"
          >
            Experience
          </a>
          <a
            href="#philosophy"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-white py-1"
          >
            Philosophy
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-white py-1"
          >
            Contact
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateToContact();
            }}
            className="mt-2 w-full py-2.5 text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-200 rounded-lg text-center transition-colors"
          >
            Get in Touch
          </button>
        </div>
      )}
    </header>
  );
};
