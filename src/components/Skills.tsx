import React from 'react';

interface SkillsProps {
  activeFilter: string | null;
  onSelectFilter: (filterKey: string | null) => void;
}

export const Skills: React.FC<SkillsProps> = ({ activeFilter, onSelectFilter }) => {
  // Only the exact 9 skills requested by the user, with alternating orange and dark pill styling
  const skillsList = [
    { label: 'Python', filterKey: 'python', isPrimary: true },
    { label: 'Java', filterKey: 'java', isPrimary: false },
    { label: 'DSA', filterKey: 'dsa', isPrimary: false },
    { label: 'Problem Solving', filterKey: 'problem solving', isPrimary: true },
    { label: 'Canva', filterKey: 'canva', isPrimary: false },
    { label: 'Photography', filterKey: 'photography', isPrimary: true },
    { label: 'Leadership', filterKey: 'leadership', isPrimary: false },
    { label: 'Team Management', filterKey: 'team management', isPrimary: false },
    { label: 'Good Cooperator', filterKey: 'cooperator', isPrimary: true },
  ];

  const handleTagClick = (filterKey: string) => {
    if (activeFilter === filterKey) {
      onSelectFilter(null);
    } else {
      onSelectFilter(filterKey);
    }
  };

  return (
    <section className="pt-6 md:pt-8 pb-20 md:pb-24 px-6 md:px-12 lg:px-16 relative bg-bg-dark" id="skills">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="font-mono text-[0.82rem] tracking-[0.2em] text-accent-orange font-semibold mb-2 inline-block uppercase">
            // 04. /SKILLS
          </div>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-black text-white leading-[1.15] mb-2 uppercase tracking-[0.02em]">
            SKILLS<span className="text-accent-orange">.</span>
          </h2>
        </div>

        {/* Floating Organic Pill Badge Cloud (Matching Reference Image) */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 md:gap-4 max-w-[960px] mx-auto py-4">
          {skillsList.map((skill) => {
            const isActive = activeFilter === skill.filterKey;

            return (
              <button
                key={skill.label}
                type="button"
                onClick={() => handleTagClick(skill.filterKey)}
                className={`px-6 md:px-8 py-3 md:py-3.5 rounded-full font-main text-[0.95rem] md:text-[1.05rem] font-bold tracking-wide transition-all duration-300 cursor-pointer select-none shadow-md ${
                  isActive
                    ? 'scale-105 ring-2 ring-white bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.6)]'
                    : skill.isPrimary
                    ? 'bg-accent-orange text-black font-extrabold shadow-[0_0_20px_rgba(249,115,22,0.35)] hover:shadow-[0_0_30px_rgba(249,115,22,0.65)] hover:-translate-y-1 hover:scale-[1.03]'
                    : 'bg-[#10121d] border border-white/15 text-white hover:border-accent-orange/60 hover:text-accent-orange hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:-translate-y-1 hover:scale-[1.03]'
                }`}
              >
                {skill.label}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
