import React, { useState } from 'react';
import { RotateCcw, Terminal, Code2 } from 'lucide-react';

export const StonePaperScissorVisualizer: React.FC = () => {
  const [userMove, setUserMove] = useState<string | null>(null);
  const [botMove, setBotMove] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [stats, setStats] = useState({ wins: 0, losses: 0, draws: 0, streak: 0 });
  const [history, setHistory] = useState<string[]>([
    'Python 3.11.8 (sps.py: Stone Paper Scissor Engine)',
    'Choose your move: [r] Rock/Stone, [p] Paper, [s] Scissor',
    'Ready for input...',
  ]);
  const [activeTab, setActiveTab] = useState<'terminal' | 'code'>('terminal');

  const moves: Record<string, { label: string; icon: string }> = {
    r: { label: 'Stone', icon: '🪨' },
    p: { label: 'Paper', icon: '📄' },
    s: { label: 'Scissor', icon: '✂️' },
  };

  const playRound = (playerChoice: 'r' | 'p' | 's') => {
    const keys: ('r' | 'p' | 's')[] = ['r', 'p', 's'];
    const comp = keys[Math.floor(Math.random() * keys.length)];
    setUserMove(playerChoice);
    setBotMove(comp);

    let res = '';
    if (playerChoice === comp) {
      res = 'Draw Round!';
      setStats((s) => ({ ...s, draws: s.draws + 1, streak: 0 }));
    } else if (
      (playerChoice === 'r' && comp === 's') ||
      (playerChoice === 'p' && comp === 'r') ||
      (playerChoice === 's' && comp === 'p')
    ) {
      res = 'Victory! Point to Player';
      setStats((s) => ({ ...s, wins: s.wins + 1, streak: s.streak + 1 }));
    } else {
      res = 'Computer Takes Point!';
      setStats((s) => ({ ...s, losses: s.losses + 1, streak: 0 }));
    }

    setResult(res);
    setHistory((prev) => [
      ...prev.slice(-4),
      `> Round: ${moves[playerChoice].icon} ${moves[playerChoice].label} vs ${moves[comp].icon} ${moves[comp].label} => ${res}`,
    ]);
  };

  const resetGame = () => {
    setUserMove(null);
    setBotMove(null);
    setResult(null);
    setStats({ wins: 0, losses: 0, draws: 0, streak: 0 });
    setHistory([
      'Python 3.11.8 (sps.py: Stone Paper Scissor Engine)',
      'Game reset. Scoreboard cleared.',
      'Ready for input...',
    ]);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-[#0a0c16] rounded-xl p-4 sm:p-5 font-mono text-xs select-none">
      
      {/* Top Bar: Tabs & Stats */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] gap-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('terminal')}
            className={`px-2.5 py-1 rounded-md text-[0.72rem] font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'terminal'
                ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/40'
                : 'text-text-muted hover:text-white'
            }`}
          >
            <Terminal size={12} />
            <span>CLI Output</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`px-2.5 py-1 rounded-md text-[0.72rem] font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'code'
                ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40'
                : 'text-text-muted hover:text-white'
            }`}
          >
            <Code2 size={12} />
            <span>sps.py</span>
          </button>
        </div>

        {/* Live Score Counter */}
        <div className="flex items-center gap-2 text-[0.72rem] font-bold bg-white/[0.04] py-1 px-2.5 rounded-lg border border-white/10">
          <span className="text-purple-400">Wins: {stats.wins}</span>
          <span className="text-text-muted">|</span>
          <span className="text-accent-purple">Losses: {stats.losses}</span>
          <span className="text-text-muted">|</span>
          <span className="text-accent-cyan">Streak: {stats.streak}🔥</span>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="flex-1 flex flex-col justify-center my-2.5 overflow-hidden">
        {activeTab === 'terminal' ? (
          <div className="flex flex-col justify-between h-full gap-3">
            
            {/* Terminal Feed */}
            <div className="bg-[#05060b] border border-white/[0.06] rounded-lg p-3 flex flex-col gap-1 text-[0.75rem] text-slate-300 font-mono overflow-y-auto max-h-[140px] leading-relaxed">
              {history.map((line, idx) => (
                <div
                  key={idx}
                  className={`${
                    line.includes('Victory')
                      ? 'text-purple-400 font-bold'
                      : line.includes('Computer Takes')
                      ? 'text-accent-purple font-bold'
                      : line.includes('Draw')
                      ? 'text-amber-300 font-bold'
                      : 'text-slate-400'
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Visual Round Confrontation */}
            {userMove && botMove && (
              <div className="flex items-center justify-around bg-gradient-to-r from-accent-purple/[0.08] via-white/[0.03] to-accent-cyan/[0.08] p-2.5 rounded-xl border border-white/10">
                <div className="text-center">
                  <div className="text-2xl mb-0.5">{moves[userMove]?.icon}</div>
                  <div className="text-[0.7rem] text-purple-400 font-bold uppercase">Player: {moves[userMove]?.label}</div>
                </div>
                
                <div className="text-center">
                  <div className="text-[0.75rem] font-bold text-white bg-white/10 px-2 py-0.5 rounded-full border border-white/15">
                    {result}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl mb-0.5">{moves[botMove]?.icon}</div>
                  <div className="text-[0.7rem] text-accent-cyan font-bold uppercase">Bot: {moves[botMove]?.label}</div>
                </div>
              </div>
            )}

          </div>
        ) : (
          /* Code View Tab */
          <div className="bg-[#05060b] border border-white/[0.06] rounded-lg p-3 text-[0.72rem] text-slate-300 font-mono overflow-x-auto leading-relaxed h-full">
            <pre className="text-slate-300">
              <span className="text-purple-400">import</span> random{'\n\n'}
              <span className="text-slate-500"># Stone Paper Scissor comparison in sps.py</span>{'\n'}
              <span className="text-blue-400">def</span> <span className="text-yellow-300">check_win</span>(player, comp):{'\n'}
              {'    '}<span className="text-purple-400">if</span> player == comp:{'\n'}
              {'    '}<span className="text-purple-400">rules</span> = &#123;<span className="text-green-300">'r'</span>: <span className="text-green-300">'s'</span>, <span className="text-green-300">'p'</span>: <span className="text-green-300">'r'</span>, <span className="text-green-300">'s'</span>: <span className="text-green-300">'p'</span>&#125;{'\n'}
              {'    '}<span className="text-purple-400">if</span> rules[player] == comp:{'\n'}
              {'        '}<span className="text-purple-400">return</span> <span className="text-green-300">"Win"</span>{'\n'}
              {'    '}<span className="text-purple-400">return</span> <span className="text-red-400">"Loss"</span>
            </pre>
          </div>
        )}
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => playRound('r')}
            className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-white hover:border-purple-400 hover:bg-purple-500/15 hover:text-purple-300 transition-all flex items-center gap-1.5 cursor-pointer font-bold"
          >
            <span>🪨 Stone</span>
          </button>
          <button
            type="button"
            onClick={() => playRound('p')}
            className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-white hover:border-purple-400 hover:bg-purple-500/15 hover:text-purple-300 transition-all flex items-center gap-1.5 cursor-pointer font-bold"
          >
            <span>📄 Paper</span>
          </button>
          <button
            type="button"
            onClick={() => playRound('s')}
            className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-white hover:border-purple-400 hover:bg-purple-500/15 hover:text-purple-300 transition-all flex items-center gap-1.5 cursor-pointer font-bold"
          >
            <span>✂️ Scissor</span>
          </button>
        </div>

        <button
          type="button"
          onClick={resetGame}
          className="p-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-text-muted hover:text-white hover:border-white/30 transition-all cursor-pointer"
          title="Reset Score"
        >
          <RotateCcw size={14} />
        </button>
      </div>

    </div>
  );
};
