import React from 'react';
import { Milestone } from '../types';

export const Experience: React.FC = () => {
  const milestones: Milestone[] = [
    {
      number: '01',
      tag: 'EDUCATION',
      title: 'Computer Science / Engineering',
      period: '2026 — Present',
      description: 'Building core fundamentals in Computer Science, object-oriented software engineering, discrete math, data structures, and computer systems architecture.',
    },
    {
      number: '02',
      tag: 'PERSONAL DEVELOPMENT',
      title: 'Programming & Problem Solving',
      period: 'Java • Python • DSA • Web Development',
      description: 'Dedicated daily hands-on practice solving algorithmic challenges, implementing core data structures from scratch, and building real-world software tools.',
    },
    {
      number: '03',
      tag: 'PROJECT EXPERIENCE',
      title: 'Independent Engineering & Web Applications',
      period: 'Continuous Learning & Prototyping',
      description: 'Building projects and experimenting with new technologies, modern browser APIs, responsive UI engineering, and testing algorithmic workflows.',
    },
    {
      number: '04',
      tag: 'COMPETITIONS',
      title: 'Portfolio, Coding & College Competitions',
      period: 'Hackathons & Technical Events',
      description: 'Participating in coding challenges, technical hackathons, and design sprints to test speed, algorithmic accuracy, and creative problem-solving agility.',
    },
  ];

  return (
    <section className="py-28 px-6 md:px-12 lg:px-16 relative bg-bg-dark" id="experience">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="font-mono text-[0.85rem] tracking-[0.18em] text-accent-cyan font-semibold mb-3 inline-block">
            // 03. /EXPERIENCE
          </div>
          <h2 className="font-display text-[clamp(2.4rem,4.5vw,3.8rem)] font-black text-white leading-[1.15] mb-3 uppercase tracking-[0.02em]">
            WORK<br />HISTORY
          </h2>
          <p className="text-[1.1rem] text-text-secondary max-w-[640px] leading-[1.65]">
            My educational foundation and practical technical milestones as an aspiring engineer.
          </p>
        </div>

        {/* Milestones List */}
        <div className="flex flex-col gap-8">
          {milestones.map((item, idx) => (
            <div
              key={idx}
              className="specular-card backdrop-blur-[14px] border border-white/[0.07] rounded-2xl p-7 md:p-10 grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6 md:gap-8 items-start transition-all duration-300 hover:border-accent-cyan/40 hover:translate-x-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(249,115,22,0.15)]"
            >
              <div className="font-display text-4xl font-black text-white/20 [-webkit-text-stroke:1px_rgba(249,115,22,0.4)] leading-none">
                {item.number}
              </div>

              <div className="flex flex-col">
                <span className="font-mono text-[0.78rem] font-semibold text-accent-cyan tracking-[0.16em] mb-1 uppercase">
                  {item.tag}
                </span>
                <h3 className="font-display text-[1.4rem] font-extrabold text-white mb-1">
                  {item.title}
                </h3>
                <div className="text-[0.92rem] text-accent-purple font-semibold mb-3.5">
                  {item.period}
                </div>
                <p className="text-[1.02rem] text-text-secondary leading-[1.7]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
