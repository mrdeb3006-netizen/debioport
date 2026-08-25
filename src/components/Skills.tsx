import React from 'react';
import { SkillCategory } from '../types';

interface SkillsProps {
  activeFilter: string | null;
  onSelectFilter: (filterKey: string | null) => void;
}

export const Skills: React.FC<SkillsProps> = ({ activeFilter, onSelectFilter }) => {
  const categories: SkillCategory[] = [
    {
      number: '01',
      title: 'PROGRAMMING',
      tags: [
        { label: 'Java', filterKey: 'java' },
        { label: 'Python', filterKey: 'python' },
        { label: 'C', filterKey: 'c' },
      ],
    },
    {
      number: '02',
      title: 'COMPUTER SCIENCE',
      tags: [
        { label: 'Data Structures', filterKey: 'data structures' },
        { label: 'Algorithms', filterKey: 'algorithms' },
        { label: 'OOP', filterKey: 'oop' },
        { label: 'Problem Solving', filterKey: 'problem solving' },
      ],
    },
    {
      number: '03',
      title: 'WEB',
      tags: [
        { label: 'HTML', filterKey: 'html' },
        { label: 'CSS', filterKey: 'css' },
        { label: 'JavaScript', filterKey: 'javascript' },
        { label: 'Git', filterKey: 'git' },
        { label: 'GitHub', filterKey: 'github' },
      ],
    },
    {
      number: '04',
      title: 'TOOLS',
      tags: [
        { label: 'VS Code', filterKey: 'vscode' },
        { label: 'Figma', filterKey: 'figma' },
        { label: 'AI Tools', filterKey: 'ai' },
      ],
    },
  ];

  const handleTagClick = (filterKey: string) => {
    if (activeFilter === filterKey) {
      onSelectFilter(null);
    } else {
      onSelectFilter(filterKey);
    }
  };

  return (
    <section className="py-28 px-6 md:px-12 lg:px-16 relative bg-bg-dark" id="skills">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="font-mono text-[0.85rem] tracking-[0.18em] text-accent-cyan font-semibold mb-3 inline-block">
            // 04. /SKILLS
          </div>
          <h2 className="font-display text-[clamp(2.4rem,4.5vw,3.8rem)] font-black text-white leading-[1.15] mb-3 uppercase tracking-[0.02em]">
            TECHNICAL<br />COMPETENCIES
          </h2>
          <p className="text-[1.1rem] text-text-secondary max-w-[640px] leading-[1.65]">
            Core technical tools and foundations I work with daily (Click any tag to highlight matching projects).
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.number}
              className="specular-card backdrop-blur-[14px] border border-white/[0.07] rounded-2xl p-7 flex flex-col transition-all duration-300 hover:border-accent-cyan/40 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(56,189,248,0.12)]"
            >
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-white/[0.06]">
                <span className="font-mono text-[0.8rem] text-accent-cyan font-bold">{cat.number}</span>
                <h3 className="font-display text-[1.15rem] font-extrabold text-white tracking-[0.06em]">
                  {cat.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {cat.tags.map((t) => {
                  const isActive = activeFilter === t.filterKey;
                  return (
                    <button
                      key={t.filterKey}
                      type="button"
                      onClick={() => handleTagClick(t.filterKey)}
                      className={`py-2 px-4 rounded-lg font-main text-[0.9rem] font-medium transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-accent-cyan text-slate-950 font-bold border border-accent-cyan shadow-[0_0_14px_rgba(56,189,248,0.4)] -translate-y-0.5'
                          : 'bg-white/[0.04] border border-white/10 text-slate-200 hover:bg-accent-cyan/15 hover:border-accent-cyan/40 hover:text-white hover:shadow-[0_0_12px_rgba(56,189,248,0.25)] hover:-translate-y-0.5'
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
