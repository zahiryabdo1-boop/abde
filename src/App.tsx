/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  INITIAL_PROFILE,
  INITIAL_KPIS,
  INITIAL_PROJECTS,
  INITIAL_EXPERIENCE,
  INITIAL_TESTIMONIALS,
  ProfileData,
  Project,
} from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsBento } from './components/ProjectsBento';
import { ProjectModal } from './components/ProjectModal';
import { ScopeEstimator } from './components/ScopeEstimator';
import { Experience } from './components/Experience';
import { SkillsPhilosophy } from './components/SkillsPhilosophy';
import { Testimonials } from './components/Testimonials';
import { ContactStudio } from './components/ContactStudio';
import { CustomizeProfileDrawer } from './components/CustomizeProfileDrawer';
import { Footer } from './components/Footer';

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem('zahira_portfolio_profile');
      return saved ? JSON.parse(saved) : INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  });

  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [scopeBrief, setScopeBrief] = useState('');

  const handleSaveProfile = (updated: ProfileData) => {
    setProfile(updated);
    try {
      localStorage.setItem('zahira_portfolio_profile', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleResetProfile = () => {
    setProfile(INITIAL_PROFILE);
    try {
      localStorage.removeItem('zahira_portfolio_profile');
    } catch {
      // ignore
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToEstimator = () => {
    const el = document.getElementById('estimator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTransferScope = (summary: string) => {
    setScopeBrief(summary);
    scrollToContact();
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-body selection:bg-white selection:text-neutral-950">
      {/* Navigation Top Bar Contract */}
      <Navbar
        name={profile.name}
        onOpenCustomizer={() => setCustomizerOpen(true)}
        onNavigateToContact={scrollToContact}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          profile={profile}
          kpis={INITIAL_KPIS}
          onNavigateToProjects={scrollToProjects}
          onNavigateToEstimator={scrollToEstimator}
        />

        {/* 01. Selected Works Bento Grid */}
        <ProjectsBento
          projects={projects}
          onOpenProject={(proj) => setSelectedProject(proj)}
        />

        {/* 02. Services & Project Scope Estimator */}
        <ScopeEstimator
          onTransferToContact={handleTransferScope}
        />

        {/* 03. Career & Milestones Timeline */}
        <Experience
          experience={INITIAL_EXPERIENCE}
        />

        {/* 04. Engineering Philosophy & Capabilities Matrix */}
        <SkillsPhilosophy />

        {/* Endorsements & Proof */}
        <Testimonials
          testimonials={INITIAL_TESTIMONIALS}
        />

        {/* 05. Contact Studio */}
        <ContactStudio
          initialMessage={scopeBrief}
          recipientEmail={profile.email}
        />
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        onOpenCustomizer={() => setCustomizerOpen(true)}
      />

      {/* Fullscreen Lightbox / Case Study Modal with Interactive Proof Simulator */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(p) => setSelectedProject(p)}
        />
      )}

      {/* Live Customizer Drawer */}
      <CustomizeProfileDrawer
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
        onResetDefaults={handleResetProfile}
      />
    </div>
  );
}
