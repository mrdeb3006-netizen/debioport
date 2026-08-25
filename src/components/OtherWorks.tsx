import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  BookOpen,
  X,
  Feather,
  Sparkles,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Download,
  Play,
  Pause,
  MapPin,
  Calendar
} from 'lucide-react';

interface PhotoItem {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  imageSrc: string;
  downloadFileName: string;
  aspectRatio: string;
}

export const OtherWorks: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 5 Authentic User Photographs
  const photos: PhotoItem[] = [
    {
      id: 'photo-1',
      title: 'Sunlight Through The Window Grill',
      category: 'Light & Shadows',
      location: 'Morning Rays & Green Canopy',
      year: '2026',
      description: 'Luminous morning sunbeams piercing through window geometry, illuminating lush treetops against an open azure sky.',
      imageSrc: '/photography/photo1_window_sunlight.jpg',
      downloadFileName: 'debendra_sunlight_window.jpg',
      aspectRatio: 'aspect-[3/4]'
    },
    {
      id: 'photo-2',
      title: 'Victoria Memorial & Lake Reflection',
      category: 'Heritage & Nature',
      location: 'Victoria Memorial Grounds, Kolkata',
      year: '2025',
      description: 'A picturesque perspective of the historic Victoria Memorial mirrored across serene waters, framed by vibrant yellow wildflowers and dynamic cloud formations.',
      imageSrc: '/photography/photo2_victoria_memorial.jpg',
      downloadFileName: 'debendra_victoria_memorial_reflection.jpg',
      aspectRatio: 'aspect-[4/3]'
    },
    {
      id: 'photo-3',
      title: 'Serenade On Water • Two Ducks',
      category: 'Wildlife & Stillness',
      location: 'Quiet Lake Horizon',
      year: '2025',
      description: 'A study of quiet tranquility as two ducks glide across gentle concentric water ripples in soft overcast daylight.',
      imageSrc: '/photography/photo3_ducks_lake.jpg',
      downloadFileName: 'debendra_ducks_lake_serenade.jpg',
      aspectRatio: 'aspect-[3/4]'
    },
    {
      id: 'photo-4',
      title: 'Moonlight Over Ocean Waves',
      category: 'Nightscape & Ocean',
      location: 'Sea Horizon at Night',
      year: '2025',
      description: 'Dramatic moonlight illuminating rolling ocean tide crests and sea spray under deep nocturnal clouds with distant horizon lights.',
      imageSrc: '/photography/photo4_moonlight_ocean.jpg',
      downloadFileName: 'debendra_moonlight_ocean_waves.jpg',
      aspectRatio: 'aspect-[4/3]'
    },
    {
      id: 'photo-5',
      title: 'Golden Sunflower In Bloom',
      category: 'Botanical & Macro',
      location: 'Garden Sunlight',
      year: '2026',
      description: 'Vibrant golden sunflower petals reaching outward in radiant bloom, highlighting intricate seed spiral symmetry.',
      imageSrc: '/photography/photo5_sunflower.jpg',
      downloadFileName: 'debendra_golden_sunflower.jpg',
      aspectRatio: 'aspect-[3/4]'
    }
  ];

  // Automatic Side-Wise Slide Show Interval (Every 3.8s)
  useEffect(() => {
    if (isAutoPlaying && !isHovered && !activePhoto) {
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
      }, 3800);
    }
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlaying, isHovered, activePhoto, photos.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
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
            SECTION HEADER: Clean Editorial Title
            ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-10 border-b-2 border-[#e7e5e4]">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fef3c7] border border-[#f59e0b]/40 text-[#92400e] font-mono text-[0.74rem] font-bold tracking-[0.2em] uppercase mb-3 shadow-xs">
              <Sparkles size={13} className="text-[#d97706]" />
              <span>// 05. /CREATIVE ODYSSEY</span>
            </div>
            
            <h2 className="font-serifDisplay text-[clamp(2.2rem,3.8vw,3.4rem)] font-black text-[#18181b] tracking-tight leading-[1.08]">
              MY OTHER WORKS.
            </h2>
          </div>

          {/* Minimal Telemetry Tag */}
          <div className="flex items-center gap-6 self-start md:self-end pt-1">
            <div className="border-l-2 border-[#d6d3d1] pl-4">
              <span className="block font-serifDisplay text-2xl font-black text-[#18181b]">05</span>
              <span className="font-mono text-[0.75rem] font-semibold text-[#78716c] uppercase tracking-wider">Original Captures</span>
            </div>
            <div className="border-l-2 border-[#d6d3d1] pl-4">
              <span className="block font-serifDisplay text-2xl font-black text-[#18181b]">01</span>
              <span className="font-mono text-[0.75rem] font-semibold text-[#78716c] uppercase tracking-wider">Philosophy Hub</span>
            </div>
          </div>
        </div>


        {/* =========================================================================
            SUBSECTION 1: PHOTOGRAPHY (AUTOMATIC SIDE-WISE SLIDESHOW)
            ========================================================================= */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#18181b] text-white flex items-center justify-center shadow-md">
                <Camera size={20} className="text-[#f59e0b]" />
              </div>
              <div>
                <h3 className="font-serifDisplay text-2xl md:text-3xl font-bold text-[#18181b] tracking-tight">
                  Photography &amp; Visual Art
                </h3>
                <p className="text-[0.88rem] text-[#78716c] font-medium">
                  Tap on any photograph to view high-res pop-up and download.
                </p>
              </div>
            </div>

            {/* Slideshow Controls Bar */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="p-2 rounded-xl bg-white border border-[#e7e5e4] hover:bg-[#18181b] hover:text-white text-[#57534e] transition-all cursor-pointer shadow-xs text-[0.75rem] font-mono flex items-center gap-1.5"
                title={isAutoPlaying ? 'Pause Slideshow' : 'Resume Auto Slideshow'}
              >
                {isAutoPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span className="hidden sm:inline font-bold">{isAutoPlaying ? 'AUTOPLAY ON' : 'PAUSED'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrev}
                className="w-9 h-9 rounded-xl bg-white border border-[#e7e5e4] hover:bg-[#18181b] hover:text-white text-[#18181b] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="w-9 h-9 rounded-xl bg-white border border-[#e7e5e4] hover:bg-[#18181b] hover:text-white text-[#18181b] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                aria-label="Next Slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Side-Wise Automatic Slideshow Viewport */}
          <div
            className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-[#f5f5f4] border-2 border-[#e7e5e4] shadow-[0_8px_30px_rgba(0,0,0,0.06)] group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Horizontal Slide Carousel Track */}
            <div
              className="flex transition-transform duration-700 ease-out will-change-transform"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {photos.map((photo, pIdx) => (
                <div
                  key={photo.id}
                  className="w-full shrink-0 p-4 sm:p-6 md:p-8 flex flex-col lg:flex-row items-center gap-6 md:gap-10 cursor-pointer"
                  onClick={() => setActivePhoto(photo)}
                >
                  {/* Photo Display Card */}
                  <div className="w-full lg:w-[58%] h-[320px] sm:h-[400px] md:h-[460px] relative rounded-2xl overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.18)] bg-[#18181b] group/img">
                    <img
                      src={photo.imageSrc}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Hover Inspect Pill */}
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#18181b] font-mono text-[0.82rem] font-bold shadow-2xl transform translate-y-3 group-hover/img:translate-y-0 transition-transform duration-300">
                        <Maximize2 size={16} />
                        <span>TAP TO OPEN &amp; DOWNLOAD</span>
                      </div>
                    </div>

                    {/* Badge on Photo */}
                    <div className="absolute top-4 left-4 font-mono text-[0.72rem] font-bold px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20">
                      0{pIdx + 1} / 0{photos.length}
                    </div>
                  </div>

                  {/* Photo Intel & Details (Side-wise) */}
                  <div className="w-full lg:w-[42%] flex flex-col justify-between py-2 text-[#18181b]">
                    <div>
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="font-mono text-[0.75rem] font-bold px-3 py-1 rounded-full bg-[#fef3c7] text-[#92400e] border border-[#fde68a] uppercase">
                          {photo.category}
                        </span>
                        <span className="font-mono text-[0.72rem] text-[#78716c] flex items-center gap-1">
                          <Calendar size={12} />
                          {photo.year}
                        </span>
                      </div>

                      <h4 className="font-serifDisplay text-2xl sm:text-3xl md:text-4xl font-bold text-[#18181b] leading-tight mb-3">
                        {photo.title}
                      </h4>

                      <div className="flex items-center gap-1.5 font-mono text-[0.8rem] text-[#78716c] mb-4">
                        <MapPin size={14} className="text-[#b45309]" />
                        <span>{photo.location}</span>
                      </div>

                      <p className="text-[0.96rem] md:text-[1.04rem] text-[#57534e] leading-relaxed mb-6 font-normal">
                        {photo.description}
                      </p>
                    </div>

                    {/* Action Bar: Tap to Expand & Quick Download */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#e7e5e4]">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePhoto(photo);
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#18181b] hover:bg-[#b45309] text-white font-mono text-[0.82rem] font-bold transition-all shadow-sm cursor-pointer"
                      >
                        <Maximize2 size={15} />
                        <span>POP-UP VIEW</span>
                      </button>

                      <a
                        href={photo.imageSrc}
                        download={photo.downloadFileName}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border-2 border-[#18181b]/20 hover:border-[#18181b] text-[#18181b] font-mono text-[0.82rem] font-bold transition-all shadow-xs cursor-pointer"
                        title="Download full photograph file"
                      >
                        <Download size={15} />
                        <span>DOWNLOAD PHOTO</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slide Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#e7e5e4] shadow-sm z-20">
              {photos.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setCurrentIndex(dotIdx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === dotIdx
                      ? 'w-7 bg-[#18181b]'
                      : 'w-2.5 bg-[#d6d3d1] hover:bg-[#78716c]'
                  }`}
                  aria-label={`Go to photo ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>


        {/* =========================================================================
            SUBSECTION 2: PHILOSOPHY (COMING SOON BANNER)
            ========================================================================= */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#18181b] text-white flex items-center justify-center shadow-md">
              <BookOpen size={20} className="text-[#f59e0b]" />
            </div>
            <div>
              <h3 className="font-serifDisplay text-2xl md:text-3xl font-bold text-[#18181b] tracking-tight">
                Philosophy &amp; Writing
              </h3>
              <p className="text-[0.88rem] text-[#78716c] font-medium">
                Reflections on learning, growth, life, and mental models.
              </p>
            </div>
          </div>

          {/* Clean Coming Soon Banner */}
          <div className="w-full rounded-2xl md:rounded-3xl bg-white border-2 border-dashed border-[#d6d3d1] p-8 md:p-12 text-center flex flex-col items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden transition-all hover:border-[#18181b]/50">
            <div className="w-14 h-14 rounded-2xl bg-[#fafaf9] border border-[#e7e5e4] flex items-center justify-center text-[#b45309] mb-4 shadow-sm">
              <Feather size={26} />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fef3c7] border border-[#fde68a] text-[#92400e] font-mono text-[0.74rem] font-bold uppercase tracking-wider mb-3">
              <Sparkles size={13} className="text-[#d97706]" />
              <span>COMING SOON</span>
            </div>

            <h4 className="font-serifDisplay text-2xl md:text-3xl font-black text-[#18181b] tracking-tight leading-snug max-w-[580px] mb-2">
              Philosophical Writings &amp; Essays in Progress
            </h4>

            <p className="text-[0.95rem] md:text-[1rem] text-[#78716c] font-normal leading-relaxed max-w-[520px]">
              Essays on continuous learning, personal growth, and reflective mental models are currently being written and will be published here soon.
            </p>
          </div>
        </div>

      </div>


      {/* =========================================================================
          POP-UP LIGHTBOX MODAL (WITH DOWNLOAD IN RIGHT CORNER)
          ========================================================================= */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[2000] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setActivePhoto(null)}
          role="dialog"
          aria-label="Photo Pop-up View"
        >
          <div
            className="bg-white rounded-3xl max-w-[960px] w-full max-h-[92vh] overflow-y-auto border border-white/25 shadow-2xl animate-scale-up flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Header with DOWNLOAD in RIGHT CORNER */}
            <div className="p-4 sm:p-5 bg-white border-b border-[#e7e5e4] flex items-center justify-between gap-4 sticky top-0 z-30">
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="font-mono text-[0.75rem] font-bold px-2.5 py-1 rounded-full bg-[#fef3c7] text-[#92400e] border border-[#fde68a] uppercase shrink-0">
                  {activePhoto.category}
                </span>
                <h3 className="font-serifDisplay text-lg sm:text-xl font-bold text-[#18181b] truncate">
                  {activePhoto.title}
                </h3>
              </div>

              {/* RIGHT CORNER CONTROLS: DOWNLOAD & CLOSE BUTTONS */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activePhoto.imageSrc}
                  download={activePhoto.downloadFileName}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#18181b] hover:bg-[#b45309] text-white font-mono text-[0.8rem] font-bold shadow-md transition-all cursor-pointer"
                  title="Download full resolution photo"
                >
                  <Download size={16} />
                  <span className="hidden sm:inline">DOWNLOAD PHOTO</span>
                </a>

                <button
                  type="button"
                  onClick={() => setActivePhoto(null)}
                  className="w-10 h-10 rounded-xl bg-[#f5f5f4] hover:bg-[#e7e5e4] text-[#18181b] flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Close Pop-up"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* High-Resolution Pop-Up Image Stage */}
            <div className="w-full bg-[#0c0d14] flex items-center justify-center p-2 sm:p-4 min-h-[300px] max-h-[580px] overflow-hidden">
              <img
                src={activePhoto.imageSrc}
                alt={activePhoto.title}
                className="max-h-[560px] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* Bottom Metadata Intel Panel */}
            <div className="p-5 sm:p-6 bg-white text-[#18181b]">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#e7e5e4]">
                <div className="flex items-center gap-2 font-mono text-[0.8rem] text-[#78716c]">
                  <MapPin size={15} className="text-[#b45309]" />
                  <span className="font-bold text-[#18181b]">{activePhoto.location}</span>
                  <span>•</span>
                  <span>{activePhoto.year}</span>
                </div>

                <span className="font-mono text-[0.74rem] text-[#a8a29e]">
                  Captured by Debendranath Bera
                </span>
              </div>

              <p className="text-[0.96rem] text-[#57534e] leading-relaxed">
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
