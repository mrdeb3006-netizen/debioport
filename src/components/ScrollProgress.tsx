import React, { useEffect, useRef } from 'react';

export const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(() => {
        if (!barRef.current) return;
        const scrollY = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
        barRef.current.style.transform = `scaleX(${progress})`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar"
      style={{
        transform: 'scaleX(0)',
        transformOrigin: 'left',
        width: '100%',
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
};
