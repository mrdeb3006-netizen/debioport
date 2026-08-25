import React, { useState } from 'react';

interface ContactProps {
  onOpenCvModal: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenCvModal }) => {
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mrdeb3006@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setFormStatus('✓ Message received! Debendra will get back to you shortly.');
      setIsSubmitting(false);
      const form = e.target as HTMLFormElement;
      form.reset();

      setTimeout(() => setFormStatus(null), 4000);
    }, 1000);
  };

  return (
    <section className="pt-10 md:pt-14 pb-20 md:pb-24 px-6 md:px-12 lg:px-16 relative bg-bg-dark" id="contact">
      <div className="max-w-[1400px] mx-auto">
        
          {/* Section Header */}
        <div className="mb-10">
          <div className="font-mono text-[0.85rem] tracking-[0.18em] text-accent-cyan font-semibold mb-3 inline-block">
            // 06. /CONTACT
          </div>
          <h2 className="font-display text-[clamp(3.2rem,6.8vw,6.2rem)] font-black leading-[1.08] uppercase tracking-[0.01em] bg-hero-name bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(249,115,22,0.2)] mb-6">
            LET'S BUILD<br />SOMETHING GREAT.
          </h2>
          <p className="text-[clamp(1.15rem,1.6vw,1.45rem)] text-text-secondary leading-relaxed">
            Have an idea, project or opportunity? Get in touch.
          </p>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col gap-14 mt-10">
          
          {/* Direct Channel Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Copyable Email Card */}
            <div
              role="button"
              tabIndex={0}
              onClick={handleCopyEmail}
              className={`specular-card backdrop-blur-[14px] border rounded-2xl p-6 flex flex-col relative transition-all duration-300 cursor-pointer ${
                copied
                  ? 'border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                  : 'border-white/[0.08] hover:border-accent-cyan/40 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(249,115,22,0.15)] hover:-translate-y-1'
              }`}
            >
              <span className="font-mono text-[0.75rem] font-semibold text-accent-cyan tracking-[0.16em] mb-1.5 uppercase">
                {copied ? '✓ COPIED' : 'EMAIL'}
              </span>
              <span className="text-[0.98rem] font-bold text-white truncate">mrdeb3006@gmail.com</span>
              <span className="absolute top-5 right-6 text-lg text-accent-cyan">
                {copied ? '✓' : '📋'}
              </span>
            </div>

            {/* GitHub Card */}
            <a
              href="https://github.com/mrdeb3006-netizen"
              target="_blank"
              rel="noopener noreferrer"
              className="specular-card backdrop-blur-[14px] border border-white/[0.08] rounded-2xl p-6 flex flex-col relative transition-all duration-300 hover:border-accent-cyan/40 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(249,115,22,0.15)] hover:-translate-y-1 group"
            >
              <span className="font-mono text-[0.75rem] font-semibold text-accent-cyan tracking-[0.16em] mb-1.5 uppercase">
                GITHUB
              </span>
              <span className="text-[0.98rem] font-bold text-white truncate">github.com/mrdeb3006-netizen</span>
              <span className="absolute top-5 right-6 text-lg text-accent-cyan transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>

            {/* LinkedIn Card */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="specular-card backdrop-blur-[14px] border border-white/[0.08] rounded-2xl p-6 flex flex-col relative transition-all duration-300 hover:border-accent-cyan/40 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(249,115,22,0.15)] hover:-translate-y-1 group"
            >
              <span className="font-mono text-[0.75rem] font-semibold text-accent-cyan tracking-[0.16em] mb-1.5 uppercase">
                LINKEDIN
              </span>
              <span className="text-[0.98rem] font-bold text-white truncate">linkedin.com/in/mrdeb</span>
              <span className="absolute top-5 right-6 text-lg text-accent-cyan transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>

            {/* X Card */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="specular-card backdrop-blur-[14px] border border-white/[0.08] rounded-2xl p-6 flex flex-col relative transition-all duration-300 hover:border-accent-cyan/40 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(249,115,22,0.15)] hover:-translate-y-1 group"
            >
              <span className="font-mono text-[0.75rem] font-semibold text-accent-cyan tracking-[0.16em] mb-1.5 uppercase">
                X (TWITTER)
              </span>
              <span className="text-[0.98rem] font-bold text-white truncate">x.com/mrdeb</span>
              <span className="absolute top-5 right-6 text-lg text-accent-cyan transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>

          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-7 flex-wrap">
            <a
              href="#contact-form"
              className="btn-primary py-4 px-11 text-base group"
            >
              <span>SEND A MESSAGE</span>
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

            <button
              type="button"
              onClick={onOpenCvModal}
              className="btn-secondary py-4 px-11 text-base"
            >
              <span>DOWNLOAD CV</span>
              <span className="text-xl ml-2">↓</span>
            </button>
          </div>

          {/* Message Form */}
          <div className="bg-bg-glass backdrop-blur-[16px] border border-white/[0.08] rounded-3xl p-8 md:p-12 max-w-[900px]">
            <form className="flex flex-col gap-6" id="contact-form" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="text-[0.88rem] font-semibold text-slate-200">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="bg-[#0d0f1c]/80 border border-white/10 rounded-lg p-3.5 text-white font-main text-[0.95rem] transition-all outline-none focus:border-accent-cyan/80 focus:shadow-[0_0_14px_rgba(249,115,22,0.3)] focus:bg-[#18181b]/95"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="text-[0.88rem] font-semibold text-slate-200">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="bg-[#0d0f1c]/80 border border-white/10 rounded-lg p-3.5 text-white font-main text-[0.95rem] transition-all outline-none focus:border-accent-cyan/80 focus:shadow-[0_0_14px_rgba(249,115,22,0.3)] focus:bg-[#18181b]/95"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-subject" className="text-[0.88rem] font-semibold text-slate-200">
                  Subject / Opportunity
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  placeholder="Project collaboration or discussion"
                  className="bg-[#0d0f1c]/80 border border-white/10 rounded-lg p-3.5 text-white font-main text-[0.95rem] transition-all outline-none focus:border-accent-cyan/80 focus:shadow-[0_0_14px_rgba(249,115,22,0.3)] focus:bg-[#18181b]/95"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-[0.88rem] font-semibold text-slate-200">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell me about your idea or project..."
                  className="bg-[#0d0f1c]/80 border border-white/10 rounded-lg p-3.5 text-white font-main text-[0.95rem] transition-all outline-none focus:border-accent-cyan/80 focus:shadow-[0_0_14px_rgba(249,115,22,0.3)] focus:bg-[#18181b]/95 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 btn-primary py-4 px-10 text-[0.92rem] justify-center"
              >
                <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
                <span className="text-lg">→</span>
              </button>

              {formStatus && (
                <div className="mt-2 font-main text-[0.92rem] font-semibold text-accent-cyan text-center">
                  {formStatus}
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
