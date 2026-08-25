import React, { useState } from 'react';

export const NexusAiStreamer: React.FC = () => {
  const [userPrompt, setUserPrompt] = useState('> Click a prompt pill or query Nexus AI');
  const [aiResponse, setAiResponse] = useState('Ready to stream insights, code reviews, and architectural patterns. Select a topic above.');
  const [metrics, setMetrics] = useState('Latency: 12ms • Tokens/s: 142.6 • Status: Stream Idle');
  const [isTyping, setIsTyping] = useState(false);

  const prompts: Record<string, { prompt: string; response: string }> = {
    dsa: {
      prompt: '> Explain Data Structures in 1 sentence',
      response: 'Data Structures organize memory efficiently so algorithms can process, query, and transform information with optimal time and space complexity.',
    },
    'clean-code': {
      prompt: '> What is Clean Code Rule #1?',
      response: 'Write code for humans first: clarity, readability, and predictable behavior always trump cleverness or unnecessary obscurity.',
    },
    future: {
      prompt: '> What defines the future of software engineering?',
      response: 'Engineers orchestrating intelligent multi-agent systems, designing resilient architectures, and combining algorithmic depth with fluid human experiences.',
    },
  };

  const handlePromptClick = async (key: string) => {
    if (isTyping || !prompts[key]) return;
    setIsTyping(true);

    const data = prompts[key];
    setUserPrompt(data.prompt);
    setAiResponse('');
    setMetrics('Latency: 8ms • Status: Streaming Response...');

    const text = data.response;
    for (let i = 0; i < text.length; i++) {
      setAiResponse(text.slice(0, i + 1));
      await new Promise((r) => setTimeout(r, 14));
    }

    setMetrics('Latency: 8ms • Tokens/s: 154.2 • Status: Complete ✓');
    setIsTyping(false);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Prompt Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => handlePromptClick('dsa')}
          disabled={isTyping}
          className="font-mono text-[0.74rem] bg-accent-purple/10 border border-accent-purple/30 text-slate-100 py-1 px-3 rounded-full transition-all duration-300 hover:bg-accent-purple/25 hover:border-accent-purple hover:-translate-y-0.5"
        >
          ⚡ Explain DSA in 1 sentence
        </button>

        <button
          type="button"
          onClick={() => handlePromptClick('clean-code')}
          disabled={isTyping}
          className="font-mono text-[0.74rem] bg-accent-purple/10 border border-accent-purple/30 text-slate-100 py-1 px-3 rounded-full transition-all duration-300 hover:bg-accent-purple/25 hover:border-accent-purple hover:-translate-y-0.5"
        >
          ✨ Clean Code Rule #1
        </button>

        <button
          type="button"
          onClick={() => handlePromptClick('future')}
          disabled={isTyping}
          className="font-mono text-[0.74rem] bg-accent-purple/10 border border-accent-purple/30 text-slate-100 py-1 px-3 rounded-full transition-all duration-300 hover:bg-accent-purple/25 hover:border-accent-purple hover:-translate-y-0.5"
        >
          🚀 Future of Software
        </button>
      </div>

      {/* User Bubble */}
      <div className="self-start bg-accent-purple/15 border border-accent-purple/35 py-2 px-4 rounded-xl rounded-bl-sm text-[0.88rem] text-slate-100 font-mono">
        {userPrompt}
      </div>

      {/* AI Bubble */}
      <div className="self-start bg-accent-cyan/10 border border-accent-cyan/30 py-3 px-4 rounded-xl rounded-tl-sm text-[0.92rem] text-slate-200 leading-relaxed w-full">
        <span className="font-mono text-[0.75rem] text-accent-cyan font-bold block mb-1">
          NEXUS AGENT (ONLINE):
        </span>
        <span>{aiResponse}</span>
      </div>

      {/* Metrics Bar */}
      <div className="font-mono text-[0.72rem] text-slate-400 flex gap-2.5 flex-wrap">
        <span>{metrics}</span>
      </div>
    </div>
  );
};
