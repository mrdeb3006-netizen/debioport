import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Work } from './components/Work';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { OtherWorks } from './components/OtherWorks';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { DoctorStrangeCursor } from './components/DoctorStrangeCursor';
import { CVModal } from './components/CVModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { DarvesChat } from './components/DarvesChat';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Scroll Spy Observer
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const sections = document.querySelectorAll<HTMLElement>('section[id]');

      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id') || 'home';

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Specular Mouse Lighting (Per-Card Event Listener: 0 global layout thrashing)
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.specular-card');
    const cleanups: (() => void)[] = [];

    cards.forEach((card) => {
      const handlePointerMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      };

      card.addEventListener('mousemove', handlePointerMove, { passive: true });
      cleanups.push(() => card.removeEventListener('mousemove', handlePointerMove));
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary relative selection:bg-accent-cyan/30 selection:text-white">
      {/* Top HUD Scroll Progress Bar */}
      <ScrollProgress />

      {/* Doctor Strange 60fps Magic Ring Canvas Cursor */}
      <DoctorStrangeCursor />

      {/* Fixed Site Header */}
      <Header activeSection={activeSection} />

      {/* Main Page Layout */}
      <main className="w-full relative z-10">
        <Hero onOpenCvModal={() => setCvModalOpen(true)} />
        <About />
        <Work
          onOpenProjectModal={(id) => setSelectedProjectId(id)}
          activeFilter={activeFilter}
        />
        <Experience />
        <Skills
          activeFilter={activeFilter}
          onSelectFilter={(filterKey) => setActiveFilter(filterKey)}
        />
        <OtherWorks />
        <Contact onOpenCvModal={() => setCvModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* CV Modal */}
      <CVModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
      />

      {/* Project Deep-Dive Modal */}
      <ProjectDetailModal
        projectId={selectedProjectId}
        onClose={() => setSelectedProjectId(null)}
      />

      {/* Movable Floating DARVES AI Assistant */}
      <DarvesChat />
    </div>
  );
};
