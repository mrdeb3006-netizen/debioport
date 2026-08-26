import React, { useState } from 'react';

interface ContactProps {
  onOpenCvModal: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenCvModal }) => {
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mrdeb3006@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Debendranath Bera's Live WhatsApp Number
    const whatsappNumber = "916289214258"; 
    
    // Structured WhatsApp Message Formatting
    const structuredMsg = 
      `*New Portfolio Inquiry for Debendranath Bera*\n` +
      `───────────────────────\n` +
      `👤 *Name:* ${formData.name.trim()}\n` +
      `📧 *Email:* ${formData.email.trim()}\n` +
      `📌 *Subject:* ${formData.subject.trim() || 'General Inquiry / Project'}\n` +
      `───────────────────────\n` +
      `📝 *Message:*\n${formData.message.trim()}\n` +
      `───────────────────────\n` +
      `_Sent directly via portfolio contact form_`;

    const encodedText = encodeURIComponent(structuredMsg);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    setFormStatus('✓ Opening WhatsApp with your formatted message...');

    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus(null), 6000);
    }, 400);
  };

  return (
    <section className="pt-10 md:pt-14 pb-20 md:pb-24 px-5 sm:px-8 md:px-12 lg:px-16 relative bg-bg-dark" id="contact">
      <div className="max-w-[1400px] mx-auto">
        
          {/* Section Header */}
        <div className="mb-10 max-w-full overflow-visible">
          <div className="font-mono text-[0.85rem] tracking-[0.18em] text-accent-cyan font-semibold mb-3 inline-block">
            // 06. /CONTACT
          </div>
          <h2 className="font-display text-[1.65rem] xs:text-[2.1rem] sm:text-[3rem] md:text-[4.2rem] lg:text-[5.2rem] font-black leading-[1.14] uppercase tracking-[0.01em] text-white mb-6 overflow-visible">
            <span className="block">LET'S BUILD</span>
            <span className="block sm:inline">SOMETHING </span>
            <span className="block sm:inline text-accent-orange">GREAT.</span>
          </h2>
          <p className="text-[clamp(1.05rem,1.5vw,1.4rem)] text-text-secondary leading-relaxed">
            Have an idea, project or opportunity? Get in touch.
          </p>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col gap-10 sm:gap-14 mt-10">
          
          {/* Direct Channel Cards (5 Channels: Email, WhatsApp, GitHub, LinkedIn, X) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
            
            {/* Copyable Email Card */}
            <div
              role="button"
              tabIndex={0}
              onClick={handleCopyEmail}
              className={`specular-card backdrop-blur-[14px] border rounded-2xl p-4 sm:p-5 flex flex-col relative transition-all duration-300 cursor-pointer ${
                copied
                  ? 'border-emerald-400 shadow-md'
                  : 'border-white/[0.08] hover:border-white/30 hover:shadow-lg hover:-translate-y-1'
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
              href="https://wa.me/916289214258?text=Hi%20Debendra,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect%20regarding%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="specular-card backdrop-blur-[14px] border border-emerald-500/30 bg-emerald-500/[0.04] rounded-2xl p-4 sm:p-5 flex flex-col relative transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-500/[0.08] hover:shadow-lg hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[0.72rem] font-bold text-emerald-400 tracking-[0.16em] uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  WHATSAPP
                </span>
                <span className="text-base text-emerald-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </div>
              <span className="text-[0.92rem] font-bold text-white truncate">+91 62892 14258</span>
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
              className="specular-card backdrop-blur-[14px] border border-white/[0.08] rounded-2xl p-4 sm:p-5 flex flex-col relative transition-all duration-300 hover:border-white/30 hover:shadow-lg hover:-translate-y-1 group"
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
              className="specular-card backdrop-blur-[14px] border border-white/[0.08] rounded-2xl p-4 sm:p-5 flex flex-col relative transition-all duration-300 hover:border-white/30 hover:shadow-lg hover:-translate-y-1 group"
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
              className="specular-card backdrop-blur-[14px] border border-white/[0.08] rounded-2xl p-4 sm:p-5 flex flex-col relative transition-all duration-300 hover:border-white/30 hover:shadow-lg hover:-translate-y-1 group"
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
          <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/20 flex items-start sm:items-center gap-3 mt-0 sm:-mt-6">
            <span className="text-emerald-400 text-lg shrink-0">💬</span>
            <p className="text-[0.80rem] font-mono text-emerald-200/90 leading-relaxed">
              <span className="font-bold text-emerald-400 uppercase">WhatsApp Protocol:</span> Available for project development, engineering collaborations, and career opportunities. Please <span className="underline font-semibold">strictly refrain from spam</span>, promotional broadcasts, or unsolicited marketing.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-7">
            <a
              href="#contact-form"
              className="btn-primary py-4 px-8 sm:px-11 text-base justify-center text-center group"
            >
              <span>SEND A MESSAGE</span>
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

            <button
              type="button"
              onClick={onOpenCvModal}
              className="btn-secondary py-4 px-8 sm:px-11 text-base justify-center text-center"
            >
              <span>DOWNLOAD CV</span>
              <span className="text-xl ml-2">↓</span>
            </button>
          </div>

          {/* Message Form */}
          <div className="bg-bg-glass backdrop-blur-[16px] border border-white/[0.08] rounded-3xl p-6 sm:p-8 md:p-12 max-w-[900px]">
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
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="bg-[#0d0f1c]/80 border border-white/10 rounded-lg p-3.5 text-white font-main text-[0.95rem] transition-all outline-none focus:border-white/40 focus:bg-[#18181b]/95"
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
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="bg-[#0d0f1c]/80 border border-white/10 rounded-lg p-3.5 text-white font-main text-[0.95rem] transition-all outline-none focus:border-white/40 focus:bg-[#18181b]/95"
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
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project collaboration or discussion"
                  className="bg-[#0d0f1c]/80 border border-white/10 rounded-lg p-3.5 text-white font-main text-[0.95rem] transition-all outline-none focus:border-white/40 focus:bg-[#18181b]/95"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-[0.88rem] font-semibold text-slate-200">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  placeholder="Tell me about your idea or project..."
                  className="bg-[#0d0f1c]/80 border border-white/10 rounded-lg p-3.5 text-white font-main text-[0.95rem] transition-all outline-none focus:border-white/40 focus:bg-[#18181b]/95 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 btn-primary py-4 px-10 text-[0.92rem] justify-center flex items-center gap-2.5 cursor-pointer shadow-md"
              >
                <span>{isSubmitting ? 'Formatting Message...' : 'SEND MESSAGE VIA WHATSAPP'}</span>
                <span className="text-lg font-black">→</span>
              </button>

              <div className="flex items-center justify-center gap-2 font-mono text-[0.74rem] text-slate-400 text-center">
                <span>💬 Clicking send directly prepares &amp; opens this message in your WhatsApp chat</span>
              </div>

              {formStatus && (
                <div className="mt-1 font-main text-[0.92rem] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-center animate-in fade-in duration-200">
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
