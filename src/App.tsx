/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { MetricsSection } from './components/MetricsSection';
import { CuratedWorks } from './components/CuratedWorks';
import { PrinciplesSection } from './components/PrinciplesSection';
import { ExecutiveTrajectory } from './components/ExecutiveTrajectory';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CommissionModal } from './components/CommissionModal';

export default function App() {
  const [activeRole, setActiveRole] = useState<string>('director');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [commissionModalOpen, setCommissionModalOpen] = useState<boolean>(false);

  const handleExploreWorks = () => {
    const el = document.getElementById('works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#08080C] text-[#EFECE6] font-sans selection:bg-white selection:text-[#08080C] overflow-x-hidden">
        {/* Film Grain Ambient Texture Overlay */}
        <div className="fixed inset-0 grain-overlay pointer-events-none z-50 opacity-40" />

      {/* Ambient Red Aura Accents */}
      <div className="fixed top-1/4 left-1/4 w-[45vw] h-[45vw] bg-[#E62A2A]/4 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-[35vw] h-[35vw] bg-[#E62A2A]/4 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Top Bar Navigation */}
      <Navigation
        onOpenCommission={() => setCommissionModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection
          activeRole={activeRole}
          onChangeRole={(role) => setActiveRole(role)}
          onExploreWorks={handleExploreWorks}
        />

        {/* 4 Core Metrics Section */}
        <MetricsSection />

        {/* Curated Works: 14 Monographs (Visual Bento Gallery default + 5-7 images indicator) */}
        <CuratedWorks
          activeRole={activeRole}
          onOpenProject={(id) => setSelectedProjectId(id)}
        />

        {/* 5 Non-Negotiable Principles */}
        <PrinciplesSection />

        {/* Executive Trajectory & Squad Matrix */}
        <ExecutiveTrajectory
          onOpenCommission={() => setCommissionModalOpen(true)}
        />
      </main>

      {/* Minimalist Editorial Footer */}
      <Footer
        onOpenCommission={() => setCommissionModalOpen(true)}
      />

      {/* Secondary Page: Strict 8-Part Structure + 5-7 Image Visual Archive */}
      <ProjectModal
        projectId={selectedProjectId}
        onClose={() => setSelectedProjectId(null)}
        onSelectProject={(id) => setSelectedProjectId(id)}
      />

      {/* Commission / Inquiry Modal */}
      <CommissionModal
        isOpen={commissionModalOpen}
        onClose={() => setCommissionModalOpen(false)}
      />
      </div>
    </MotionConfig>
  );
}
