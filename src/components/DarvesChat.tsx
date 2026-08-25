import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Send, Sparkles, Bot, User, RefreshCw, Key } from 'lucide-react';

interface Message {
  id: string;
  sender: 'darves' | 'user';
  text: string;
  timestamp: string;
}

const DEBENDRA_KNOWLEDGE_BASE = `
You are DARVES, the personal intelligent AI assistant for Debendra (also known as Mr Deb).
Your mission is to represent Debendra professionally, intelligently, warmly, and with a touch of wit (like Jarvis).

Key Information About Debendra:
- Name: Debendra (Mr Deb)
- Age: 19 years old
- Location: Kolkata, India
- Role: First-year Computer Science and Engineering student
- Focus: Programming, Data Structures & Algorithms using Java, exploring different fields of development and Artificial Intelligence, and strengthening computer science fundamentals.
- Other Languages/Tools: Python (basic/intermediate), JavaScript, Canvas 2D, HTML5, CSS3, Tailwind CSS, Git, GitHub, VS Code, Linux/Bash.
- Life Motto: "Be humble, keep smiling, keep learning, keep growing"
- Interests: Technology, Entrepreneurship, Tennis, Philosophy, Coffee, Building Useful Software.
- Personality: A coffee lover with a keen interest in philosophy and deep intellectual curiosity.
- Key Projects:
  1. Snake Water Gun Game (main.py): Interactive Python command-line game against the computer with randomized choices and score-based win logic.
  2. Stone Paper Sciccor Game (sps.py): Classic Python CLI hand game with user input validation, round comparisons, and win-streak tracking.
  3. YouTube Automatic Reel Scrolling (ytlimit.py): Python automation experiment automating desktop YouTube Shorts scrolling with timed event triggers.
- Social Channels: GitHub, LinkedIn, X (formerly Twitter), Email.

Keep your responses concise, engaging, polite, and helpful. Always highlight Debendra's passion for learning, problem-solving, and building software.
`;

const QUICK_PROMPTS = [
  'Who is Debendra?',
  'What is his age & location?',
  'What is his life motto?',
  'What are his tech skills & focus?',
  'Tell me about his projects',
];

export const DarvesChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState<string>(() => {
    try {
      return localStorage.getItem('darves_gemini_key') || '';
    } catch {
      return '';
    }
  });
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');

  // Drag offset relative to default bottom-right position
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; initialOffsetX: number; initialOffsetY: number }>({
    startX: 0,
    startY: 0,
    initialOffsetX: 0,
    initialOffsetY: 0,
  });
  const hasMovedRef = useRef(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'darves',
      text: "Greetings! I'm DARVES, Debendra's AI assistant. Ask me anything about Debendra's skills, age (19), location (Kolkata), motto, or his projects!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll messages to bottom
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Pointer event handlers for drag & click
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialOffsetX: dragOffset.x,
      initialOffsetY: dragOffset.y,
    };
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.startX;
    const deltaY = e.clientY - dragStartRef.current.startY;

    if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
      hasMovedRef.current = true;
    }

    setDragOffset({
      x: dragStartRef.current.initialOffsetX + deltaX,
      y: dragStartRef.current.initialOffsetY + deltaY,
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }
    // If not dragged, toggle chat window
    if (!hasMovedRef.current) {
      setIsOpen((prev) => !prev);
      setIsMinimized(false);
    }
  };

  // Local intelligent reasoning engine
  const getLocalDarvesResponse = (query: string): string => {
    const q = query.toLowerCase().trim();

    if (q.includes('who') || q.includes('about') || q.includes('debendra') || q.includes('mr deb')) {
      return "Debendra (Mr Deb) is a passionate 19-year-old first-year Computer Science and Engineering student from Kolkata, India. He's deeply focused on programming, Data Structures & Algorithms in Java, and exploring emerging fields in AI and software development.";
    }

    if (q.includes('age') || q.includes('old') || q.includes('years')) {
      return "Debendra is 19 years old, currently pursuing his foundational 1st year in Computer Science and Engineering.";
    }

    if (q.includes('city') || q.includes('kolkata') || q.includes('where') || q.includes('live') || q.includes('location')) {
      return "Debendra is located in Kolkata, West Bengal, India 📍.";
    }

    if (q.includes('motto') || q.includes('quote') || q.includes('philosophy') || q.includes('humble')) {
      return 'Debendra lives by the motto: "Be humble, keep smiling, keep learning, keep growing." ✨';
    }

    if (q.includes('project') || q.includes('portfolio') || q.includes('built') || q.includes('work')) {
      return "Debendra has engineered several interactive projects:\n1. Portfolio 2.0 with custom Doctor Strange 60fps Tao Mandala canvas cursor & glassmorphism\n2. Algorithm & DSA Visualizer (Java/Python)\n3. Nexus AI Conversational Hub (Gemini token streaming)\n4. Developer CLI Toolkit & Shell simulator.\nYou can explore all of them right in the Work section below!";
    }

    if (q.includes('skill') || q.includes('language') || q.includes('tech') || q.includes('java') || q.includes('python')) {
      return "Debendra's core technical toolkit includes Java (OOP & Data Structures), Python, JavaScript, Canvas 2D, HTML5/CSS3, Git, GitHub, and developer CLI tools. He is actively expanding into artificial intelligence and practical system design!";
    }

    if (q.includes('interest') || q.includes('hobby') || q.includes('tennis') || q.includes('entrepreneur')) {
      return "Outside of coding, Debendra is passionate about Technology, Entrepreneurship, Tennis 🎾, and Building Useful Software that solves real-world problems.";
    }

    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('linkedin') || q.includes('twitter') || q.includes('x')) {
      return "You can reach Debendra via the Contact form at the bottom of the page, or connect with him directly on GitHub, LinkedIn, and X (Twitter)!";
    }

    if (q.includes('hi') || q.includes('hello') || q.includes('hey')) {
      return "Hello! I am DARVES, Debendra's personal AI agent. How can I assist you in exploring his portfolio, background, or projects today?";
    }

    return "Debendra is a 19-year-old Computer Science & Engineering student from Kolkata, dedicated to mastering Data Structures and Algorithms with Java, exploring AI, and living by his motto: 'Be humble, keep smiling, keep learning, keep growing'. Feel free to ask about his projects, skills, or background!";
  };

  // Gemini API integration
  const queryGeminiApi = async (userPrompt: string): Promise<string> => {
    const key = apiKey || (import.meta as any).env?.VITE_GEMINI_API_KEY;
    if (!key) {
      await new Promise((r) => setTimeout(r, 600));
      return getLocalDarvesResponse(userPrompt);
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${DEBENDRA_KNOWLEDGE_BASE}\n\nUser Question: ${userPrompt}` }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 250,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Gemini API response error');
      }

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      return reply || getLocalDarvesResponse(userPrompt);
    } catch {
      return getLocalDarvesResponse(userPrompt);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const botResponse = await queryGeminiApi(messageText);
      const darvesMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'darves',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, darvesMsg]);
    } catch {
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'darves',
        text: getLocalDarvesResponse(messageText),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSaveApiKey = () => {
    if (tempApiKey.trim()) {
      localStorage.setItem('darves_gemini_key', tempApiKey.trim());
      setApiKey(tempApiKey.trim());
    } else {
      localStorage.removeItem('darves_gemini_key');
      setApiKey('');
    }
    setShowKeyModal(false);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'darves',
        text: "Chat refreshed! I'm DARVES. What would you like to know about Debendra?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Movable Floating DARVES AI Orb Widget */}
      <aside
        id="darves-floating-widget"
        style={{
          position: 'fixed',
          bottom: '96px',
          right: '36px',
          transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0)`,
          zIndex: 99999,
          touchAction: 'none',
        }}
        className="select-none"
        aria-label="DARVES AI Floating Assistant"
      >
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className={`relative flex items-center gap-3 cursor-grab active:cursor-grabbing transition-transform duration-200 ${
            isDragging ? 'scale-110' : 'hover:scale-105'
          }`}
          title="Drag to reposition • Click to chat with DARVES"
        >
          {/* Label Pill (Always clearly visible) */}
          <div className="hidden sm:flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-[#0d0f1f]/95 border border-accent-cyan/40 backdrop-blur-md shadow-[0_4px_20px_rgba(56,189,248,0.25)] text-white text-[0.82rem] font-bold tracking-wide pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
            <span className="font-display tracking-wider text-accent-cyan">DARVES</span>
            <span className="text-white/80 font-normal text-[0.75rem]">AI Chat</span>
          </div>

          {/* Main Floating Orb */}
          <div className="relative">
            {/* Animated Holographic Orbital Rings */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple opacity-50 blur-md animate-pulse" />
            <div className="absolute -inset-1 rounded-full border border-accent-cyan/60 animate-spin [animation-duration:8s]" />
            <div className="absolute -inset-2 rounded-full border border-accent-purple/35 animate-spin [animation-duration:12s] [animation-direction:reverse]" />

            <button
              type="button"
              className="relative w-14 h-14 rounded-full bg-[#0a0b16] border-2 border-accent-cyan/80 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.4),0_0_30px_rgba(99,102,241,0.25)] text-accent-cyan overflow-hidden focus:outline-none"
              aria-label="Open DARVES AI Assistant"
            >
              {/* Holographic Core Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/25 via-transparent to-accent-purple/25" />
              
              {/* Icon */}
              <Bot size={26} className="relative z-10 text-white drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
            </button>
          </div>
        </div>
      </aside>

      {/* Expanded DARVES AI Chat Window */}
      {isOpen && (
        <section
          aria-label="DARVES AI Conversation Window"
          className={`fixed z-[99998] transition-all duration-300 ${
            isMinimized
              ? 'bottom-28 right-8 w-72 h-14 rounded-2xl overflow-hidden'
              : 'bottom-20 md:bottom-28 right-4 md:right-8 w-[calc(100vw-2rem)] md:w-[410px] h-[550px] max-h-[85vh] rounded-3xl'
          } bg-[#0b0d18]/95 backdrop-blur-[24px] border border-accent-cyan/30 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(56,189,248,0.15)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200`}
        >
          {/* Chat Window Header */}
          <div className="h-16 bg-[#121426]/90 border-b border-white/[0.08] px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-accent-cyan/15 border border-accent-cyan/40 flex items-center justify-center shadow-[0_0_10px_rgba(56,189,248,0.3)]">
                <Bot size={18} className="text-accent-cyan" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border border-[#0b0d18] shadow-[0_0_6px_#22c55e]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-[0.95rem] tracking-wider text-white">DARVES</span>
                  <span className="font-mono text-[0.68rem] px-1.5 py-0.5 rounded bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
                    GEMINI
                  </span>
                </div>
                <span className="text-[0.72rem] text-text-muted">Debendra's AI Assistant</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowKeyModal(true)}
                title="Configure Gemini API Key"
                className="p-2 rounded-lg text-text-muted hover:text-accent-cyan hover:bg-white/[0.05] transition-colors"
                aria-label="Settings"
              >
                <Key size={15} />
              </button>
              <button
                type="button"
                onClick={handleResetChat}
                title="Reset Conversation"
                className="p-2 rounded-lg text-text-muted hover:text-accent-cyan hover:bg-white/[0.05] transition-colors"
                aria-label="Reset Chat"
              >
                <RefreshCw size={15} />
              </button>
              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand' : 'Minimize'}
                className="p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/[0.05] transition-colors"
                aria-label="Minimize Chat"
              >
                <Minus size={15} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-2 rounded-lg text-text-muted hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                aria-label="Close Chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 text-[0.9rem]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'darves' && (
                      <div className="w-7 h-7 rounded-full bg-accent-cyan/15 border border-accent-cyan/40 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot size={14} className="text-accent-cyan" />
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] px-4 py-3 rounded-2xl leading-[1.55] ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-accent-cyan/15 to-accent-purple/20 border border-accent-cyan/30 text-white rounded-tr-sm shadow-sm'
                          : 'bg-[#15182a] border border-white/[0.08] text-slate-200 rounded-tl-sm shadow-[0_4px_15px_rgba(0,0,0,0.4)] whitespace-pre-line'
                      }`}
                    >
                      <p className="m-0 text-[0.88rem]">{msg.text}</p>
                      <span className="block text-[0.68rem] text-text-muted mt-1.5 text-right font-mono">
                        {msg.timestamp}
                      </span>
                    </div>

                    {msg.sender === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-accent-purple/20 border border-accent-purple/40 flex items-center justify-center shrink-0 mt-0.5">
                        <User size={14} className="text-accent-purple" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-accent-cyan/15 border border-accent-cyan/40 flex items-center justify-center shrink-0">
                      <Bot size={14} className="text-accent-cyan animate-pulse" />
                    </div>
                    <div className="bg-[#15182a] border border-white/[0.08] px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-bounce [animation-delay:0s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestion Chips */}
              <div className="px-3 py-2 bg-[#0e101f]/80 border-t border-white/[0.05] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {QUICK_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="shrink-0 text-[0.72rem] font-mono py-1 px-2.5 rounded-full bg-white/[0.04] border border-accent-cyan/20 text-slate-300 hover:border-accent-cyan hover:text-accent-cyan hover:bg-accent-cyan/10 transition-all whitespace-nowrap"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-3 bg-[#111324] border-t border-white/[0.08] flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask DARVES about Debendra..."
                  className="flex-1 bg-[#181b30] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-[0.88rem] text-white placeholder-text-muted focus:outline-none focus:border-accent-cyan/80 focus:ring-1 focus:ring-accent-cyan/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="btn-primary w-10 h-10 rounded-xl p-0 justify-center disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  aria-label="Send Message"
                >
                  <Send size={16} />
                </button>
              </form>
            </>
          )}
        </section>
      )}

      {/* Optional Gemini API Key Configuration Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-[100000] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#101222] border border-accent-cyan/40 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,240,255,0.2)] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles size={20} className="text-accent-cyan" />
                <h3 className="font-display text-lg font-bold text-white">Gemini API Assistant</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="text-text-muted hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-[0.85rem] text-text-secondary leading-relaxed">
              DARVES has a built-in neural knowledge engine with full knowledge of Debendra. To connect directly to live Google Gemini 2.0 Flash generation, you can enter your Gemini API Key below (stored locally in your browser).
            </p>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[0.75rem] text-accent-cyan">GEMINI_API_KEY (Optional)</label>
              <input
                type="password"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="bg-[#181a30] border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-[0.88rem] focus:outline-none focus:border-accent-cyan"
              />
            </div>

            <div className="flex items-center justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 text-sm text-text-muted hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveApiKey}
                className="px-5 py-2 rounded-xl bg-btn-primary text-white text-sm font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.7)]"
              >
                Save &amp; Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
