import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCw, Terminal, Code2, Youtube, Sparkles } from 'lucide-react';

export const YouTubeReelScrollerVisualizer: React.FC = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [currentReelIdx, setCurrentReelIdx] = useState(0);
  const [countdown, setCountdown] = useState(5);
  const [scrollCount, setScrollCount] = useState(14);
  const [activeTab, setActiveTab] = useState<'simulator' | 'terminal' | 'code'>('simulator');

  const reels = [
    {
      title: 'Python Automation: Auto-Scroll YouTube Reels & Shorts in 10 lines #coding',
      channel: '@tech_debendra',
      views: '42.8K',
      likes: '3.4K',
      bgGradient: 'from-purple-900/60 via-slate-900 to-black',
      tag: '🔥 Trending #Python',
    },
    {
      title: 'Building a Full-Stack AI Assistant with Gemini 2.0 API #developer #ai',
      channel: '@code_innovator',
      views: '128.5K',
      likes: '14.2K',
      bgGradient: 'from-blue-900/60 via-slate-900 to-black',
      tag: '⚡ AI Tools',
    },
    {
      title: 'Mastering Data Structures: Graph BFS & DFS Made Simple #dsa #cs',
      channel: '@algo_mastery',
      views: '89.1K',
      likes: '8.9K',
      bgGradient: 'from-cyan-900/60 via-slate-900 to-black',
      tag: '💡 DSA Guide',
    },
    {
      title: 'Doctor Strange Mandala 60fps Canvas 2D Particle Engine Showcase',
      channel: '@creative_frontend',
      views: '210.4K',
      likes: '24.6K',
      bgGradient: 'from-fuchsia-900/60 via-slate-900 to-black',
      tag: '✨ Web Dev',
    },
  ];

  // Auto-scroll Timer Simulation
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCurrentReelIdx((idx) => (idx + 1) % reels.length);
          setScrollCount((c) => c + 1);
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, reels.length]);

  const currentReel = reels[currentReelIdx];

  return (
    <div className="w-full h-full flex flex-col justify-between bg-[#0a0c16] rounded-xl p-4 sm:p-5 font-mono text-xs select-none">
      
      {/* Top Bar: Tabs & Telemetry */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] gap-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('simulator')}
            className={`px-2.5 py-1 rounded-md text-[0.72rem] font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'simulator'
                ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                : 'text-text-muted hover:text-white'
            }`}
          >
            <Youtube size={12} />
            <span>Reel Stream</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('terminal')}
            className={`px-2.5 py-1 rounded-md text-[0.72rem] font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'terminal'
                ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40'
                : 'text-text-muted hover:text-white'
            }`}
          >
            <Terminal size={12} />
            <span>Telemetry</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`px-2.5 py-1 rounded-md text-[0.72rem] font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'code'
                ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/40'
                : 'text-text-muted hover:text-white'
            }`}
          >
            <Code2 size={12} />
            <span>ytlimit.py</span>
          </button>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 text-[0.72rem] font-bold bg-white/[0.04] py-1 px-2.5 rounded-lg border border-white/10">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-slate-300">Reels: {scrollCount}</span>
          <span className="text-text-muted">|</span>
          <span className="text-accent-cyan">Next: {countdown}s</span>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="flex-1 flex flex-col justify-center my-2.5 overflow-hidden">
        {activeTab === 'simulator' ? (
          <div className="flex items-center gap-4 h-full">
            
            {/* Simulated Phone Reel Player */}
            <div className={`w-[180px] sm:w-[220px] h-[190px] rounded-xl bg-gradient-to-b ${currentReel.bgGradient} border border-white/15 p-3 flex flex-col justify-between relative overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.7)] transition-all duration-500`}>
              
              {/* Progress Line */}
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mb-1">
                <div
                  style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                  className="h-full bg-red-500 transition-all duration-1000"
                />
              </div>

              {/* Tag & Watermark */}
              <div className="flex items-center justify-between">
                <span className="text-[0.65rem] bg-red-500/30 text-red-300 border border-red-500/40 px-1.5 py-0.5 rounded font-bold">
                  {currentReel.tag}
                </span>
                <span className="text-[0.62rem] text-white/60 font-mono">AUTOSCROLL</span>
              </div>

              {/* Reel Metadata */}
              <div className="mt-auto">
                <div className="text-[0.68rem] text-accent-cyan font-bold mb-0.5">
                  {currentReel.channel}
                </div>
                <div className="text-[0.72rem] font-bold text-white leading-tight line-clamp-2 mb-1">
                  {currentReel.title}
                </div>
                <div className="flex items-center gap-2 text-[0.62rem] text-text-muted">
                  <span>❤️ {currentReel.likes}</span>
                  <span>👁️ {currentReel.views}</span>
                </div>
              </div>

            </div>

            {/* Automation Script Stats */}
            <div className="flex-1 flex flex-col justify-between h-full bg-[#05060b] border border-white/[0.06] rounded-xl p-3 text-[0.72rem] text-slate-300 leading-relaxed">
              <div>
                <div className="text-accent-cyan font-bold mb-1 flex items-center gap-1.5">
                  <Sparkles size={12} />
                  <span>Script: ytlimit.py Active</span>
                </div>
                <p className="text-text-muted text-[0.7rem] mb-2">
                  Automating vertical scroll events via Python script to cycle reels seamlessly.
                </p>
                <div className="flex flex-col gap-1 text-[0.68rem]">
                  <div className="text-slate-400">Target: YouTube Shorts Feed</div>
                  <div className="text-slate-400">Scroll Interval: 5.0 seconds</div>
                  <div className="text-slate-400">Event Hook: pyautogui.scroll(-400)</div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[0.68rem] text-text-muted">
                <span>Total Scrolled: {scrollCount} reels</span>
                <span className="text-emerald-400 font-bold">● Running OK</span>
              </div>
            </div>

          </div>
        ) : activeTab === 'terminal' ? (
          /* Terminal Feed */
          <div className="bg-[#05060b] border border-white/[0.06] rounded-lg p-3 text-[0.72rem] text-slate-300 font-mono overflow-y-auto max-h-[160px] leading-relaxed flex flex-col gap-1">
            <div className="text-emerald-400 font-bold">$ python ytlimit.py</div>
            <div className="text-slate-400">[INIT] Initializing YouTube Reel Automation daemon...</div>
            <div className="text-slate-400">[HOOK] Attaching to active browser viewport</div>
            <div className="text-accent-cyan">[START] Auto-scrolling initiated with 5s countdown delay</div>
            <div className="text-purple-400">[EVENT] Scroll trigger sent to window (Reel #{scrollCount})</div>
            <div className="text-amber-300">[STATUS] Next scroll in: {countdown}s...</div>
          </div>
        ) : (
          /* Code View Tab */
          <div className="bg-[#05060b] border border-white/[0.06] rounded-lg p-3 text-[0.72rem] text-slate-300 font-mono overflow-x-auto leading-relaxed h-full">
            <pre className="text-slate-300">
              <span className="text-purple-400">import</span> time, pyautogui{'\n\n'}
              <span className="text-slate-500"># YouTube Automatic Reel Scrolling in ytlimit.py</span>{'\n'}
              <span className="text-blue-400">def</span> <span className="text-yellow-300">auto_scroll_reels</span>(interval=5, max_reels=50):{'\n'}
              {'    '}print(<span className="text-green-300">"Starting auto reel scroller..."</span>){'\n'}
              {'    '}<span className="text-purple-400">for</span> i <span className="text-purple-400">in</span> range(max_reels):{'\n'}
              {'        '}time.sleep(interval){'\n'}
              {'        '}pyautogui.press(<span className="text-green-300">'down'</span>){'\n'}
              {'        '}print(f<span className="text-green-300">"Scrolled to reel &#123;i+1&#125;"</span>)
            </pre>
          </div>
        )}
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className={`px-3 py-1.5 rounded-lg border text-white transition-all flex items-center gap-1.5 cursor-pointer font-bold ${
              isRunning
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 hover:bg-amber-500/25'
                : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25'
            }`}
          >
            {isRunning ? (
              <>
                <Pause size={12} />
                <span>Pause Auto-Scroll</span>
              </>
            ) : (
              <>
                <Play size={12} />
                <span>Resume Auto-Scroll</span>
              </>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            setCurrentReelIdx((idx) => (idx + 1) % reels.length);
            setCountdown(5);
            setScrollCount((c) => c + 1);
          }}
          className="px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white hover:border-white/30 transition-all flex items-center gap-1.5 cursor-pointer text-[0.7rem]"
        >
          <RotateCw size={12} />
          <span>Next Reel Now</span>
        </button>
      </div>

    </div>
  );
};
