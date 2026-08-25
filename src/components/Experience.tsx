import React, { useEffect, useRef, useState } from 'react';
import { Milestone } from '../types';
import { Award, Globe2, BookOpen, CheckCircle2, Sparkles, MapPin } from 'lucide-react';

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getSlideUpStyle = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(40px)',
    transition: `opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
    willChange: 'opacity, transform',
  });

  const educationMilestones: Milestone[] = [
    {
      number: '01',
      tag: 'CURRENT DEGREE',
      title: 'B.Tech in Computer Science & Engineering',
      institution: 'Future Institute of Engineering and Management (FIEM)',
      period: '2023 — Present (Active)',
      badge: 'PRESENT',
      score: 'Undergraduate',
      description: 'Pursuing Computer Science & Engineering with a strong focus on core algorithms, Java Object-Oriented Programming (OOP), Data Structures & Algorithms (DSA), and hands-on software development.',
      highlights: [
        'Core algorithms, data structures & computational problem solving.',
        'Learning Java OOP and practicing algorithm optimization.',
        'Active development in Python and building modern software projects.',
      ],
    },
    {
      number: '02',
      tag: 'HIGHER SECONDARY',
      title: 'Class 12 — Science Stream',
      institution: 'Jadavpur Vidyapith',
      period: 'Completed • 77.81%',
      badge: '77.81%',
      score: '77.81% Score',
      description: 'Completed Higher Secondary Science education with 77.81%, establishing robust analytical foundations in advanced mathematics, logical reasoning, and scientific methodology.',
      highlights: [
        'Physics, Chemistry, and Higher Mathematics.',
        'Rigorous analytical foundations and quantitative problem solving.',
      ],
    },
    {
      number: '03',
      tag: 'SECONDARY EDUCATION',
      title: 'Class 10 — Secondary School',
      institution: 'Jadavpur High School',
      period: 'Completed • 88.71%',
      badge: '88.71% TOPPER',
      score: 'School Topper (88.71%)',
      description: 'Graduated as School Topper with 88.71%, demonstrating academic excellence and a passion for science, mathematics, and logic.',
      highlights: [
        'Ranked as Class 10 School Topper with 88.71%.',
        'Built early foundations in computational thinking and scientific inquiry.',
      ],
    },
  ];

  const academicDistinctions = [
    {
      title: 'Class 10 School Topper — 88.71%',
      institution: 'Jadavpur High School',
      type: 'Rank #1 School Topper',
    },
    {
      title: 'Class 12 Science Stream — 77.81%',
      institution: 'Jadavpur Vidyapith',
      type: 'Academic Excellence in Science',
    },
  ];

  const learningHighlights = [
    'Pursuing Computer Science & Engineering with focus on core algorithms & practical development',
    'Coding actively in Python & automating workflows',
    'Mastering Java Object-Oriented Programming (OOP)',
    'Practicing Data Structures & Algorithms (DSA) daily',
    'Building projects and exploring modern web & software stacks',
  ];

  const languages = [
    { name: 'English', level: 'Fluent', badge: 'Fluent' },
    { name: 'Hindi', level: 'Fluent', badge: 'Fluent' },
    { name: 'Bengali', level: 'Native', badge: 'Native' },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-24 px-6 md:px-12 lg:px-16 relative bg-bg-dark overflow-hidden"
      id="journey"
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-12" style={getSlideUpStyle(0.15)}>
          <div className="font-mono text-[0.82rem] tracking-[0.2em] text-accent-orange font-semibold mb-2 inline-flex items-center gap-2 uppercase">
            <span>// 03. /JOURNEY</span>
            <span className="text-text-muted">•</span>
            <span className="text-text-secondary text-[0.74rem]">EDUCATIONAL &amp; ACHIEVEMENT PROFILE</span>
          </div>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-black text-white leading-[1.15] mb-2 uppercase tracking-[0.02em]">
            MY JOURNEY<span className="text-accent-orange">.</span>
          </h2>
          <p className="text-[1.05rem] text-text-secondary max-w-[680px] leading-[1.6]">
            Academic milestones, distinctions, and technical foundations from school to Computer Science Engineering.
          </p>
        </div>

        {/* Compact 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Education Milestones Timeline */}
          <div className="flex flex-col gap-5">
            {educationMilestones.map((item, idx) => (
              <div
                key={idx}
                className="specular-card backdrop-blur-[16px] border border-white/[0.08] rounded-2xl p-6 md:p-7 relative overflow-hidden transition-all duration-300 hover:border-accent-orange/50 hover:translate-x-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(249,115,22,0.15)] group"
                style={getSlideUpStyle(0.25 + idx * 0.15)}
              >
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono text-[0.72rem] font-bold text-accent-orange bg-accent-orange/15 px-2.5 py-0.5 rounded-full border border-accent-orange/30 uppercase tracking-wider">
                      {item.tag}
                    </span>
                    <span className="font-mono text-[0.72rem] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25">
                      {item.badge}
                    </span>
                  </div>
                  <div className="font-display text-3xl md:text-4xl font-black text-white/15 [-webkit-text-stroke:1px_rgba(249,115,22,0.3)] leading-none select-none">
                    {item.number}
                  </div>
                </div>

                {/* Degree / School Title */}
                <h3 className="font-display text-[1.25rem] md:text-[1.35rem] font-black text-white leading-snug mb-1">
                  {item.title}
                </h3>

                {/* Institution & Location */}
                <div className="flex items-center gap-2 text-[0.92rem] text-accent-orange/90 font-medium mb-3">
                  <MapPin size={14} className="shrink-0 text-accent-orange" />
                  <span>{item.institution}</span>
                </div>

                {/* Description */}
                <p className="text-[0.92rem] text-text-secondary leading-relaxed mb-3">
                  {item.description}
                </p>

                {/* Key Takeaways */}
                {item.highlights && (
                  <div className="flex flex-col gap-1.5 pt-2 border-t border-white/[0.06]">
                    {item.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-[0.84rem] text-slate-300">
                        <CheckCircle2 size={13} className="text-accent-orange shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Column: Distinctions, Highlights & Languages */}
          <div className="flex flex-col gap-5">
            
            {/* 1. Academic Distinctions Spotlight */}
            <div
              className="specular-card backdrop-blur-[16px] border border-accent-orange/30 bg-gradient-to-b from-accent-orange/[0.06] to-transparent rounded-2xl p-6 md:p-7 shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_25px_rgba(249,115,22,0.12)] transition-all duration-300 hover:border-accent-orange/60"
              style={getSlideUpStyle(0.35)}
            >
              <div className="flex items-center gap-2 mb-3">
                <Award className="text-accent-orange" size={20} />
                <h4 className="font-mono text-[0.8rem] font-bold text-accent-orange tracking-[0.16em] uppercase">
                  ACADEMIC DISTINCTIONS
                </h4>
              </div>

              <div className="flex flex-col gap-3.5">
                {academicDistinctions.map((dist, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col gap-1 hover:border-accent-orange/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[0.95rem] text-white">
                        {dist.title}
                      </span>
                      <Sparkles size={14} className="text-accent-orange shrink-0" />
                    </div>
                    <span className="text-[0.82rem] text-text-muted">
                      📍 {dist.institution}
                    </span>
                    <span className="font-mono text-[0.72rem] text-accent-orange font-semibold">
                      {dist.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Core Learning & Technical Highlights */}
            <div
              className="specular-card backdrop-blur-[16px] border border-white/[0.08] rounded-2xl p-6 md:p-7 transition-all duration-300 hover:border-accent-orange/40"
              style={getSlideUpStyle(0.50)}
            >
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="text-accent-orange" size={18} />
                <h4 className="font-mono text-[0.8rem] font-bold text-accent-orange tracking-[0.16em] uppercase">
                  LEARNING &amp; SKILL FOCUS
                </h4>
              </div>

              <ul className="list-none flex flex-col gap-2.5 p-0 m-0">
                {learningHighlights.map((hl, hlIdx) => (
                  <li
                    key={hlIdx}
                    className="relative pl-5 text-[0.88rem] text-slate-300 leading-relaxed before:content-['▹'] before:absolute before:left-0 before:text-accent-orange before:font-bold"
                  >
                    {hl}
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Spoken Languages */}
            <div
              className="specular-card backdrop-blur-[16px] border border-white/[0.08] rounded-2xl p-6 transition-all duration-300 hover:border-accent-orange/40"
              style={getSlideUpStyle(0.65)}
            >
              <div className="flex items-center gap-2 mb-3">
                <Globe2 className="text-accent-orange" size={18} />
                <h4 className="font-mono text-[0.8rem] font-bold text-accent-orange tracking-[0.16em] uppercase">
                  LANGUAGES
                </h4>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {languages.map((lang, lIdx) => (
                  <div
                    key={lIdx}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center flex flex-col gap-1 hover:border-accent-orange/40 transition-colors"
                  >
                    <span className="font-bold text-[0.9rem] text-white">
                      {lang.name}
                    </span>
                    <span className="font-mono text-[0.72rem] text-accent-orange font-semibold">
                      {lang.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
