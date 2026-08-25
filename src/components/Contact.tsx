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
          
          {/* Direct Channel Cards (5 Channels: Email, WhatsApp, GitHub, LinkedIn, X) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            
            {/* Copyable Email Card */}
            <div
              role="button"
              tabIndex={0}
              onClick={handleCopyEmail}
              className={`specular-card backdrop-blur-[14px] border rounded-2xl p-5 flex flex-col relative transition-all duration-300 cursor-pointer ${
                copied
                  ? 'border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                  : 'border-white/[0.08] hover:border-accent-cyan/40 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(249,115,22,0.15)] hover:-translate-y-1'
              }`}
            >
              <span className="font-mono text-[0.72rem] font-semibold text-accent-cyan tracking-[0.16em] mb-1 uppercase">
                {copied ? '✓ COPIED' : 'EMAIL'}
              </span>
              <span className="text-[0.92rem] font-bold text-white truncate">mrdeb3006@gmail.com</span>
              <span className="absolute top-4 right-5 text-base text-accent-cyan">
                {copied ? '✓' : '📋'}
              </span>
            </div>

            {/* Direct WhatsApp Card with No-Spam Disclaimer */}
            <a
              href="https://wa.me/919876543210?text=Hi%20Debendra,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect%20regarding%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="specular-card backdrop-blur-[14px] border border-emerald-500/30 bg-emerald-500/[0.04] rounded-2xl p-5 flex flex-col relative transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-500/[0.08] hover:shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(16,185,129,0.25)] hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[0.72rem] font-bold text-emerald-400 tracking-[0.16em] uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  WHATSAPP
                </span>
                <span className="text-base text-emerald-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </div>
              <span className="text-[0.92rem] font-bold text-white truncate">Chat on WhatsApp</span>
              <div className="mt-2 pt-1.5 border-t border-emerald-500/20">
                <span className="text-[0.66rem] font-mono text-emerald-300/80 leading-tight block">
                  ⚠️ <span className="font-bold text-emerald-300">NO SPAM</span> • Work &amp; Project Inquiries Only
                </span>
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com/mrdeb3006-netizen"
              target="_blank"
              rel="noopener noreferrer"
              className="specular-card backdrop-blur-[14px] border border-white/[0.08] rounded-2xl p-5 flex flex-col relative transition-all duration-300 hover:border-accent-cyan/40 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(249,115,22,0.15)] hover:-translate-y-1 group"
            >
              <span className="font-mono text-[0.72rem] font-semibold text-accent-cyan tracking-[0.16em] mb-1 uppercase">
                GITHUB
              </span>
              <span className="text-[0.92rem] font-bold text-white truncate">github.com/mrdeb3006-netizen</span>
              <span className="absolute top-4 right-5 text-base text-accent-cyan transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>

            {/* LinkedIn Card */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="specular-card backdrop-blur-[14px] border border-white/[0.08] rounded-2xl p-5 flex flex-col relative transition-all duration-300 hover:border-accent-cyan/40 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(249,115,22,0.15)] hover:-translate-y-1 group"
            >
              <span className="font-mono text-[0.72rem] font-semibold text-accent-cyan tracking-[0.16em] mb-1 uppercase">
                LINKEDIN
              </span>
              <span className="text-[0.92rem] font-bold text-white truncate">linkedin.com/in/mrdeb</span>
              <span className="absolute top-4 right-5 text-base text-accent-cyan transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>

            {/* X Card */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="specular-card backdrop-blur-[14px] border border-white/[0.08] rounded-2xl p-5 flex flex-col relative transition-all duration-300 hover:border-accent-cyan/40 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(249,115,22,0.15)] hover:-translate-y-1 group"
            >
              <span className="font-mono text-[0.72rem] font-semibold text-accent-cyan tracking-[0.16em] mb-1 uppercase">
                X (TWITTER)
              </span>
              <span className="text-[0.92rem] font-bold text-white truncate">x.com/mrdeb</span>
              <span className="absolute top-4 right-5 text-base text-accent-cyan transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>

          </div>

          {/* WhatsApp / Direct Outreach Disclaimer Notice Banner */}
          <div className="p-3.5 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/20 flex items-center gap-3 -mt-6">
            <span className="text-emerald-400 text-lg">💬</span>
            <p className="text-[0.80rem] font-mono text-emerald-200/90 leading-relaxed">
              <span className="font-bold text-emerald-400 uppercase">WhatsApp Protocol:</span> Available for project development, engineering collaborations, and career opportunities. Please <span className="underline font-semibold">strictly refrain from spam</span>, promotional broadcasts, or unsolicited marketing.
            </p>
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
