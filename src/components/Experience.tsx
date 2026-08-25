import React from 'react';
import { Milestone } from '../types';

export const Experience: React.FC = () => {
  const milestones: Milestone[] = [
    {
      number: '01',
      tag: 'BACHELOR OF TECHNOLOGY',
      title: 'Computer Science & Engineering',
      period: '2023 — Present',
      description: 'Building deep fundamentals in Computer Science, object-oriented software engineering, discrete math, data structures & algorithms, and computer systems architecture.',
    },
    {
      number: '02',
      tag: 'HIGHER SECONDARY (12TH)',
      title: 'Higher Secondary Education • Science & Math',
      period: 'Physics • Chemistry • Mathematics',
      description: 'Completed Higher Secondary schooling with strong analytical foundations in advanced mathematics, analytical reasoning, and scientific principles.',
    },
    {
      number: '03',
      tag: 'SECONDARY SCHOOL (10TH)',
      title: 'Secondary School Education',
      period: 'Academic Excellence & Science Olympiads',
      description: 'Graduated with strong academic marks, actively participating in competitive quizzes, mathematics challenges, and technical science exhibitions.',
    },
    {
      number: '04',
      tag: 'TECHNICAL SPECIALIZATION',
      title: 'Self-Directed Engineering & Certifications',
      period: 'Java • Python • DSA • Full-Stack Web Development',
      description: 'Dedicated continuous learning mastering Data Structures & Algorithms, modern React ecosystems, TypeScript architecture, and competitive programming.',
    },
  ];

  return (
    <section className="py-28 px-6 md:px-12 lg:px-16 relative bg-bg-dark" id="journey">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="font-mono text-[0.85rem] tracking-[0.18em] text-accent-orange font-semibold mb-3 inline-block uppercase">
            // 03. /JOURNEY
          </div>
          <h2 className="font-display text-[clamp(2.4rem,4.5vw,3.8rem)] font-black text-white leading-[1.15] mb-3 uppercase tracking-[0.02em]">
            MY<br />JOURNEY.
          </h2>
          <p className="text-[1.1rem] text-text-secondary max-w-[640px] leading-[1.65]">
            A timeline of academic foundations, continuous learning, and self-directed software development milestones.
          </p>
        </div>

        {/* Milestones List */}
        <div className="flex flex-col gap-8">
          {milestones.map((item, idx) => (
            <div
              key={idx}
              className="specular-card backdrop-blur-[14px] border border-white/[0.07] rounded-2xl p-7 md:p-10 grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6 md:gap-8 items-start transition-all duration-300 hover:border-accent-orange/40 hover:translate-x-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(249,115,22,0.15)]"
            >
              <div className="font-display text-4xl font-black text-white/20 [-webkit-text-stroke:1px_rgba(249,115,22,0.4)] leading-none">
                {item.number}
              </div>

              <div className="flex flex-col">
                <span className="font-mono text-[0.78rem] font-semibold text-accent-orange tracking-[0.16em] mb-1 uppercase">
                  {item.tag}
                </span>
                <h3 className="font-display text-[1.4rem] font-extrabold text-white mb-1">
                  {item.title}
                </h3>
                <div className="text-[0.92rem] text-accent-orange/80 font-semibold mb-3.5 font-mono">
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
