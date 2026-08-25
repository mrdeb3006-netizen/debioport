import React, { useState } from 'react';
import {
  Camera,
  BookOpen,
  X,
  Feather,
  Sparkles,
  Quote,
  Clock,
  ArrowUpRight,
  Maximize2,
  Share2,
  Check
} from 'lucide-react';

interface PhotoItem {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  cameraSettings: string;
  description: string;
  palette: string[];
  gradientStyle: string;
  aspect: string;
}

interface EssayItem {
  id: string;
  title: string;
  subtitle: string;
  readTime: string;
  date: string;
  topic: string;
  preview: string;
  keyQuote: string;
  fullContent: string[];
  reflections: string[];
}

export const OtherWorks: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [activeEssay, setActiveEssay] = useState<EssayItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [photoFilter, setPhotoFilter] = useState<'all' | 'street' | 'nature' | 'monochrome'>('all');

  const photos: PhotoItem[] = [
    {
      id: 'photo-1',
      title: 'Silent Radiance • Golden Hour Geometry',
      category: 'street',
      location: 'Kolkata, Howrah Riverfront',
      year: '2026',
      cameraSettings: '35mm • f/1.8 • 1/800s • ISO 100',
      description: 'Capturing the golden intersection where morning sunlight cuts through architectural shadows, revealing geometry in daily rhythm.',
      palette: ['#f59e0b', '#d97706', '#78350f', '#18181b'],
      gradientStyle: 'linear-gradient(135deg, #fbbf24 0%, #d97706 40%, #78350f 85%)',
      aspect: 'aspect-[4/5]'
    },
    {
      id: 'photo-2',
      title: 'Monochrome Stillness • The Solitary Thinker',
      category: 'monochrome',
      location: 'Victoria Memorial Grounds',
      year: '2025',
      cameraSettings: '50mm • f/2.0 • 1/400s • ISO 200',
      description: 'High-contrast black & white exploration of texture, marble serenity, and human contemplation in open space.',
      palette: ['#ffffff', '#a1a1aa', '#3f3f46', '#09090b'],
      gradientStyle: 'linear-gradient(145deg, #e4e4e7 0%, #71717a 45%, #18181b 100%)',
      aspect: 'aspect-square'
    },
    {
      id: 'photo-3',
      title: 'Verdant Horizons • Whispering Flora',
      category: 'nature',
      location: 'Botanical Sanctuary',
      year: '2025',
      cameraSettings: '85mm • f/2.8 • 1/640s • ISO 160',
      description: 'Macro perspective on organic leaf vein symmetry and the quiet resilience of green ecosystems.',
      palette: ['#10b981', '#047857', '#064e3b', '#022c22'],
      gradientStyle: 'linear-gradient(135deg, #34d399 0%, #059669 45%, #064e3b 90%)',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 'photo-4',
      title: 'Urban Cadence • Midnight Transit',
      category: 'street',
      location: 'Park Street Crossway',
      year: '2026',
      cameraSettings: '24mm • f/1.4 • 1/60s • ISO 800',
      description: 'Long-exposure light trail mapping urban momentum and the poetic velocity of night city life.',
      palette: ['#f97316', '#dc2626', '#450a0a', '#0a0a0a'],
      gradientStyle: 'linear-gradient(135deg, #fb923c 0%, #b91c1c 50%, #450a0a 100%)',
      aspect: 'aspect-[16/10]'
    },
    {
      id: 'photo-5',
      title: 'Minimalist Horizon • Cloud Tapestry',
      category: 'nature',
      location: 'Suburban Ridge',
      year: '2025',
      cameraSettings: '50mm • f/4.0 • 1/1200s • ISO 100',
      description: 'Soft atmospheric gradients at dusk, where sky and earth merge in deep contemplative calm.',
      palette: ['#93c5fd', '#3b82f6', '#1e3a8a', '#0f172a'],
      gradientStyle: 'linear-gradient(150deg, #bfdbfe 0%, #60a5fa 40%, #1e40af 85%)',
      aspect: 'aspect-[4/5]'
    },
    {
      id: 'photo-6',
      title: 'Architectural Shadows • Modernist Form',
      category: 'monochrome',
      location: 'Civic Arts Pavilion',
      year: '2026',
      cameraSettings: '35mm • f/5.6 • 1/500s • ISO 100',
      description: 'Pure structural lines, repeating concrete cantilevers, and dramatic diagonal shadow cuts.',
      palette: ['#fafafa', '#cbd5e1', '#475569', '#0f172a'],
      gradientStyle: 'linear-gradient(135deg, #f1f5f9 0%, #94a3b8 40%, #1e293b 90%)',
      aspect: 'aspect-square'
    }
  ];

  const filteredPhotos = photoFilter === 'all'
    ? photos
    : photos.filter(p => p.category === photoFilter);

  const essays: EssayItem[] = [
    {
      id: 'essay-1',
      title: 'The Beginner’s Mind: Growth Through Radical Humility',
      subtitle: 'Why dropping the illusion of mastery is the ultimate catalyst for continuous learning.',
      readTime: '3 min read',
      date: 'Feb 2026',
      topic: 'Personal Growth & Mindset',
      preview: 'In a culture that celebrates quick answers and performative expertise, the most powerful advantage an engineer or thinker can possess is the audacity to say: "I do not know, but I am eager to learn."',
      keyQuote: '“To learn genuinely, one must first empty their cup. Humility is not thinking less of yourself; it is thinking of yourself less and observing reality more.”',
      fullContent: [
        'Knowledge often creates a deceptive armor. When we believe we already understand a problem, our curiosity contracts. In Zen philosophy, this is known as Shoshin (初心) — the beginner’s mind.',
        'In programming, as in life, the landscape is perpetual motion. Frameworks evolve, paradigms shift, and new challenges arise. The moment you treat yourself as an expert who has arrived, your learning velocity drops to zero.',
        'Embracing humility allows you to ask the fundamental questions without ego. It makes debugging a discovery process rather than an annoyance. It turns every colleague, book, and error message into a willing teacher.',
        'Keep your foundation grounded in curiosity. The highest form of intellect is not knowing everything, but remaining permanently teachable.'
      ],
      reflections: [
        'Curiosity over defensiveness when facing constructive critique.',
        'Mastering first principles rather than memorizing ephemeral tricks.',
        'Treating every day as Day One in your journey of craft.'
      ]
    },
    {
      id: 'essay-2',
      title: 'The Currency of a Smile: Warmth in an Accelerating World',
      subtitle: 'Reflections on human kindness, presence, and keeping what is truly valuable.',
      readTime: '4 min read',
      date: 'Jan 2026',
      topic: 'Human Connection & Presence',
      preview: 'Efficiency optimizes output, but warmth optimizes human existence. In a hyper-connected world operating at breakneck speed, maintaining a sincere smile and kindness is a profound act of deliberate living.',
      keyQuote: '“Life is very short. Keep your smile because it is the most valuable thing you can share, and keep growing because life is synonymous with growth.”',
      fullContent: [
        'We measure our days in throughput: lines of code, tasks checked off, milestones achieved. Yet at the end of every retrospective, what leaves an indelible mark is how we treated people along the path.',
        'A smile is not naive optimism; it is emotional generosity. It communicates reassurance to teammates, brings levity to high-pressure moments, and grounds you in the immediate present.',
        'When you navigate challenges with a calm, smiling posture, you signal to your own nervous system that obstacles are puzzles to be solved rather than threats to be feared.',
        'Guard your peace, spread goodwill without transaction, and remember that technical skill amplified by genuine warmth is unstoppable.'
      ],
      reflections: [
        'Be kinder than necessary; everyone is fighting their own unseen battles.',
        'Joy is a disciplined practice of gratitude in simple everyday moments.',
        'A supportive, encouraging environment multiplies everyone’s creative potential.'
      ]
    },
    {
      id: 'essay-3',
      title: 'Passion as Compass, Discipline as the Engine',
      subtitle: 'Navigating long-term ambitions when fleeting motivation inevitably fades.',
      readTime: '3 min read',
      date: 'Dec 2025',
      topic: 'Craft & Work Ethic',
      preview: 'Passion discovers the mountain you want to climb, but quiet, unglamorous daily discipline is the only vehicle that will carry you to the summit.',
      keyQuote: '“Follow what you love with intensity, but anchor that love to steady daily habits. Brilliance without consistency is merely potential.”',
      fullContent: [
        'We often romanticize inspiration — the sudden flash of insight, the euphoric start of a new project. But real craftsmanship is forged in the middle chapters: solving edge cases, refining logic, and showing up when no one is watching.',
        'When passion is your compass, you know your direction. But when discipline is your habit, you make progress regardless of mood, weather, or temporary friction.',
        'Do not wait for ideal conditions to build, write, or create. Small, high-quality iterations repeated across hundred-day horizons yield compound results that look like magic from the outside.'
      ],
      reflections: [
        'Honor your commitments to yourself with the same respect you give to others.',
        'Deep work requires eliminating noise to let genuine focus breathe.',
        'Love the craft in its quietest moments.'
      ]
    }
  ];

  const handleCopyQuote = (quote: string, id: string) => {
    navigator.clipboard.writeText(quote);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  return (
    <section
      id="other-works"
      className="w-full relative py-10 md:py-14 bg-[#faf9f6] text-[#18181b] border-y-2 border-[#e7e5e4] transition-colors duration-500 overflow-hidden font-main"
    >
      {/* Editorial Watermark Texture & Subtle Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#d6d3d1_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* =========================================================================
            SECTION HEADER: Clean Editorial Styling
            ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-10 border-b-2 border-[#e7e5e4]">
          <div className="max-w-[720px]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fef3c7] border border-[#f59e0b]/40 text-[#92400e] font-mono text-[0.74rem] font-bold tracking-[0.2em] uppercase mb-3 shadow-xs">
              <Sparkles size={13} className="text-[#d97706]" />
              <span>// 05. /CREATIVE ODYSSEY</span>
            </div>
            
            <h2 className="font-serifDisplay text-[clamp(2.2rem,3.8vw,3.4rem)] font-black text-[#18181b] tracking-tight leading-[1.08] mb-3">
              MY OTHER WORKS.
            </h2>
            
            <p className="text-[0.98rem] md:text-[1.06rem] text-[#57534e] font-normal leading-relaxed">
              Beyond code and algorithms lies the realm of observation and inquiry. A curated showcase of visual framing through the camera lens, alongside philosophical essays on growth, learning, and life.
            </p>
          </div>

          {/* Minimal Metric Tags */}
          <div className="flex items-center gap-6 self-start md:self-end pt-1">
            <div className="border-l-2 border-[#d6d3d1] pl-4">
              <span className="block font-serifDisplay text-2xl font-black text-[#18181b]">06</span>
              <span className="font-mono text-[0.75rem] font-semibold text-[#78716c] uppercase tracking-wider">Visual Captures</span>
            </div>
            <div className="border-l-2 border-[#d6d3d1] pl-4">
              <span className="block font-serifDisplay text-2xl font-black text-[#18181b]">03</span>
              <span className="font-mono text-[0.75rem] font-semibold text-[#78716c] uppercase tracking-wider">Essays &amp; Notes</span>
            </div>
          </div>
        </div>


        {/* =========================================================================
            SUBSECTION 1: PHOTOGRAPHY & ART
            ========================================================================= */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#18181b] text-white flex items-center justify-center shadow-md">
                <Camera size={20} className="text-[#f59e0b]" />
              </div>
              <div>
                <h3 className="font-serifDisplay text-2xl md:text-3xl font-bold text-[#18181b] tracking-tight">
                  Photography &amp; Visual Art
                </h3>
                <p className="text-[0.88rem] text-[#78716c] font-medium">
                  Light, composition, shadow, and timeless urban perspectives.
                </p>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-[#f5f5f4] border border-[#e7e5e4] rounded-xl self-start sm:self-auto">
              {(['all', 'street', 'nature', 'monochrome'] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setPhotoFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-lg text-[0.78rem] font-mono font-bold capitalize transition-all cursor-pointer ${
                    photoFilter === filter
                      ? 'bg-[#18181b] text-white shadow-sm'
                      : 'text-[#78716c] hover:text-[#18181b] hover:bg-white/80'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className="group relative bg-white rounded-2xl border-2 border-[#e7e5e4] hover:border-[#18181b] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)] overflow-hidden cursor-pointer flex flex-col"
              >
                {/* Photo Canvas Artwork Box */}
                <div
                  className={`w-full ${photo.aspect} relative overflow-hidden flex items-center justify-center p-6 transition-transform duration-500 group-hover:scale-[1.02]`}
                  style={{ background: photo.gradientStyle }}
                >
                  {/* Subtle Grain Overlay */}
                  <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />

                  {/* Lens Spec Graphic Centerpiece */}
                  <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 text-white shadow-lg max-w-[85%] transition-all duration-300 group-hover:bg-white/25">
                    <Camera size={26} className="mb-2 text-white drop-shadow-md" />
                    <span className="font-mono text-[0.7rem] tracking-[0.16em] uppercase font-bold text-white/90">
                      {photo.category} ARCHIVE
                    </span>
                    <span className="font-serifDisplay text-base font-bold text-white leading-snug mt-1 line-clamp-2">
                      {photo.title.split('•')[0]}
                    </span>
                  </div>

                  {/* Hover Quick-Inspect Eye Badge */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 text-[#18181b] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md transform translate-y-2 group-hover:translate-y-0">
                    <Maximize2 size={16} />
                  </div>

                  {/* Year Tag */}
                  <div className="absolute bottom-4 left-4 font-mono text-[0.7rem] font-bold px-2.5 py-0.5 rounded-full bg-black/50 text-white backdrop-blur-sm">
                    {photo.year}
                  </div>
                </div>

                {/* Photo Card Intel */}
                <div className="p-5 bg-white flex-1 flex flex-col justify-between border-t border-[#f5f5f4]">
                  <div>
                    <div className="flex items-center justify-between text-[0.74rem] font-mono text-[#78716c] mb-1.5">
                      <span>{photo.location}</span>
                      <span className="font-bold text-[#b45309] capitalize">{photo.category}</span>
                    </div>

                    <h4 className="font-serifDisplay text-lg font-bold text-[#18181b] group-hover:text-[#b45309] transition-colors leading-snug mb-2">
                      {photo.title}
                    </h4>

                    <p className="text-[0.88rem] text-[#57534e] line-clamp-2 leading-relaxed mb-3">
                      {photo.description}
                    </p>
                  </div>

                  {/* Camera Settings Bar */}
                  <div className="pt-3 border-t border-[#f5f5f4] flex items-center justify-between font-mono text-[0.72rem] text-[#78716c]">
                    <span>{photo.cameraSettings}</span>
                    <span className="inline-flex items-center gap-1 font-bold text-[#18181b] group-hover:translate-x-0.5 transition-transform">
                      <span>VIEW</span>
                      <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* =========================================================================
            SUBSECTION 2: PHILOSOPHY & WRITING
            ========================================================================= */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#18181b] text-white flex items-center justify-center shadow-md">
              <BookOpen size={20} className="text-[#f59e0b]" />
            </div>
            <div>
              <h3 className="font-serifDisplay text-2xl md:text-3xl font-bold text-[#18181b] tracking-tight">
                Philosophy, Life &amp; Writing
              </h3>
              <p className="text-[0.88rem] text-[#78716c] font-medium">
                Essays, stoic principles, lessons on growth, and reflective mental models.
              </p>
            </div>
          </div>

          {/* Essays Sequence */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {essays.map((essay) => (
              <article
                key={essay.id}
                className="group bg-white rounded-2xl p-7 border-2 border-[#e7e5e4] hover:border-[#18181b] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] flex flex-col justify-between"
              >
                <div>
                  {/* Essay Top Metadata */}
                  <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-[#f5f5f4]">
                    <span className="font-mono text-[0.74rem] font-bold px-2.5 py-0.5 rounded-full bg-[#f5f5f4] text-[#44403c] border border-[#e7e5e4]">
                      {essay.topic}
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-[0.72rem] text-[#78716c]">
                      <Clock size={12} />
                      <span>{essay.readTime}</span>
                    </div>
                  </div>

                  {/* Essay Title & Subtitle */}
                  <h4 className="font-serifDisplay text-xl md:text-[1.35rem] font-bold text-[#18181b] group-hover:text-[#b45309] transition-colors leading-snug mb-2.5">
                    {essay.title}
                  </h4>

                  <p className="text-[0.9rem] text-[#78716c] font-medium leading-relaxed mb-4">
                    {essay.subtitle}
                  </p>

                  {/* Highlight Quote Box */}
                  <div className="p-4 rounded-xl bg-[#fafaf9] border-l-4 border-[#b45309] mb-5">
                    <p className="font-serifDisplay text-[0.92rem] italic text-[#292524] leading-relaxed">
                      {essay.keyQuote}
                    </p>
                  </div>

                  {/* Preview Text */}
                  <p className="text-[0.92rem] text-[#57534e] leading-relaxed mb-6 line-clamp-3">
                    {essay.preview}
                  </p>
                </div>

                {/* Bottom Read Action */}
                <div className="pt-4 border-t border-[#f5f5f4] flex items-center justify-between">
                  <span className="font-mono text-[0.72rem] text-[#a8a29e]">
                    {essay.date}
                  </span>
                  
                  <button
                    type="button"
                    onClick={() => setActiveEssay(essay)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#18181b] hover:bg-[#b45309] text-white font-mono text-[0.78rem] font-bold transition-all shadow-sm cursor-pointer"
                  >
                    <span>READ ESSAY</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>


      {/* =========================================================================
          LIGHTBOX MODAL: Photography Full Inspection View
          ========================================================================= */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setActivePhoto(null)}
          role="dialog"
          aria-label="Photo Lightbox"
        >
          <div
            className="bg-white rounded-3xl max-w-[840px] w-full overflow-hidden border border-white/20 shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Visual Stage */}
            <div
              className="w-full h-[320px] sm:h-[420px] relative flex items-center justify-center p-8 text-white"
              style={{ background: activePhoto.gradientStyle }}
            >
              <div className="text-center p-8 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 max-w-[85%]">
                <Camera size={36} className="mx-auto mb-3 text-white drop-shadow-lg" />
                <span className="font-mono text-[0.74rem] tracking-[0.2em] font-bold text-white/80 uppercase">
                  {activePhoto.category} EXHIBITION
                </span>
                <h3 className="font-serifDisplay text-2xl sm:text-3xl font-black mt-2 leading-tight">
                  {activePhoto.title}
                </h3>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Lightbox Metadata Panel */}
            <div className="p-6 sm:p-8 bg-white text-[#18181b]">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#e7e5e4]">
                <div>
                  <span className="font-mono text-[0.75rem] font-bold text-[#b45309] uppercase block">
                    {activePhoto.location} • {activePhoto.year}
                  </span>
                  <span className="font-mono text-[0.8rem] text-[#78716c]">
                    Technical Specs: {activePhoto.cameraSettings}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {activePhoto.palette.map((c, i) => (
                    <span
                      key={i}
                      className="w-5 h-5 rounded-full border border-black/15 shadow-xs"
                      style={{ backgroundColor: c }}
                      title={`Color: ${c}`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-[0.98rem] text-[#44403c] leading-relaxed mb-6">
                {activePhoto.description}
              </p>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setActivePhoto(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#18181b] text-white font-mono text-[0.82rem] font-bold hover:bg-[#b45309] transition-all cursor-pointer"
                >
                  CLOSE PREVIEW
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* =========================================================================
          ESSAY MODAL: Deep Reading Thought Drawer
          ========================================================================= */}
      {activeEssay && (
        <div
          className="fixed inset-0 z-[2000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setActiveEssay(null)}
          role="dialog"
          aria-label="Essay Reader"
        >
          <div
            className="bg-[#faf9f6] text-[#18181b] rounded-3xl max-w-[760px] w-full max-h-[90vh] overflow-y-auto border-2 border-[#e7e5e4] shadow-2xl animate-scale-up p-6 sm:p-10 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Top Modal Navigation */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#e7e5e4]">
                <div className="flex items-center gap-2 font-mono text-[0.74rem] text-[#78716c]">
                  <span className="font-bold text-[#b45309] bg-[#fef3c7] px-2.5 py-0.5 rounded-full border border-[#fde68a]">
                    {activeEssay.topic}
                  </span>
                  <span>•</span>
                  <span>{activeEssay.readTime}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveEssay(null)}
                  className="w-9 h-9 rounded-full bg-[#f5f5f4] hover:bg-[#e7e5e4] text-[#18181b] flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Close Essay"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Essay Title */}
              <h3 className="font-serifDisplay text-2xl sm:text-3xl font-black text-[#18181b] leading-tight mb-3">
                {activeEssay.title}
              </h3>
              
              <p className="text-[1rem] text-[#78716c] font-medium leading-relaxed mb-6">
                {activeEssay.subtitle}
              </p>

              {/* Featured Pull Quote */}
              <div className="p-5 rounded-2xl bg-[#ffffff] border-l-4 border-[#b45309] shadow-xs mb-8">
                <Quote className="text-[#b45309] mb-2" size={24} />
                <p className="font-serifDisplay text-[1.05rem] italic text-[#18181b] leading-relaxed">
                  {activeEssay.keyQuote}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-mono text-[0.74rem] text-[#a8a29e]">— Debendranath Bera</span>
                  <button
                    type="button"
                    onClick={() => handleCopyQuote(activeEssay.keyQuote, activeEssay.id)}
                    className="inline-flex items-center gap-1.5 font-mono text-[0.74rem] text-[#b45309] hover:underline cursor-pointer"
                  >
                    {copiedId === activeEssay.id ? (
                      <>
                        <Check size={13} className="text-emerald-600" />
                        <span className="text-emerald-600 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 size={13} />
                        <span>Copy Quote</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Full Content Paragraphs */}
              <div className="flex flex-col gap-4 text-[0.98rem] text-[#44403c] leading-[1.8] font-normal mb-8">
                {activeEssay.fullContent.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Key Takeaway Bullets */}
              <div className="p-6 rounded-2xl bg-white border border-[#e7e5e4] mb-8">
                <h5 className="font-mono text-[0.78rem] font-bold text-[#b45309] tracking-[0.14em] uppercase mb-3 flex items-center gap-2">
                  <Feather size={14} />
                  <span>CORE TAKEAWAYS</span>
                </h5>
                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  {activeEssay.reflections.map((ref, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2 text-[0.92rem] text-[#57534e]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b45309] mt-2 shrink-0" />
                      <span>{ref}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#e7e5e4] flex items-center justify-between">
              <span className="font-mono text-[0.74rem] text-[#a8a29e]">
                Published {activeEssay.date}
              </span>
              <button
                type="button"
                onClick={() => setActiveEssay(null)}
                className="px-6 py-2.5 rounded-xl bg-[#18181b] text-white font-mono text-[0.82rem] font-bold hover:bg-[#b45309] transition-all cursor-pointer"
              >
                DONE READING
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
