import React, { useState } from 'react';
import { RotateCcw, Terminal, Code2 } from 'lucide-react';

export const SnakeWaterGunVisualizer: React.FC = () => {
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [compChoice, setCompChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [score, setScore] = useState({ user: 0, comp: 0, ties: 0 });
  const [history, setHistory] = useState<string[]>([
    'Python 3.11.8 (main.py: Snake Water Gun Engine)',
    'Type or click a move: [s] Snake, [w] Water, [g] Gun',
    'Ready for player input...',
  ]);
  const [activeTab, setActiveTab] = useState<'terminal' | 'code'>('terminal');

  const choicesMap: Record<string, { name: string; icon: string }> = {
    s: { name: 'Snake', icon: '🐍' },
    w: { name: 'Water', icon: '💧' },
    g: { name: 'Gun', icon: '🔫' },
  };

  const playGame = (choice: 's' | 'w' | 'g') => {
    const options: ('s' | 'w' | 'g')[] = ['s', 'w', 'g'];
    const botChoice = options[Math.floor(Math.random() * options.length)];
    setUserChoice(choice);
    setCompChoice(botChoice);

    let roundResult = '';
    if (choice === botChoice) {
      roundResult = '🤝 It is a Tie!';
      setScore((prev) => ({ ...prev, ties: prev.ties + 1 }));
    } else if (
      (choice === 's' && botChoice === 'w') || // Snake drinks Water
      (choice === 'w' && botChoice === 'g') || // Water drowns Gun
      (choice === 'g' && botChoice === 's')    // Gun shoots Snake
    ) {
      roundResult = '🎉 You Won!';
      setScore((prev) => ({ ...prev, user: prev.user + 1 }));
    } else {
      roundResult = '💻 Computer Won!';
      setScore((prev) => ({ ...prev, comp: prev.comp + 1 }));
    }

    setResult(roundResult);
    setHistory((prev) => [
      ...prev.slice(-4),
      `> Player: ${choicesMap[choice].icon} ${choicesMap[choice].name} vs Bot: ${choicesMap[botChoice].icon} ${choicesMap[botChoice].name} -> ${roundResult}`,
    ]);
  };

  const resetGame = () => {
    setUserChoice(null);
    setCompChoice(null);
    setResult(null);
    setScore({ user: 0, comp: 0, ties: 0 });
    setHistory([
      'Python 3.11.8 (main.py: Snake Water Gun Engine)',
      'Game reset. Scoreboard cleared.',
      'Ready for player input...',
    ]);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-[#0a0c16] rounded-xl p-4 sm:p-5 font-mono text-xs select-none">
      
      {/* Top Bar: Tabs & Scoreboard */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] gap-2">
        <div className="flex items-center gap-1.5">
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
            <span>CLI Output</span>
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
            <span>main.py</span>
          </button>
        </div>

        {/* Live Score Counter */}
        <div className="flex items-center gap-2.5 text-[0.72rem] font-bold bg-white/[0.04] py-1 px-2.5 rounded-lg border border-white/10">
          <span className="text-accent-cyan">You: {score.user}</span>
          <span className="text-text-muted">|</span>
          <span className="text-accent-purple">Bot: {score.comp}</span>
          <span className="text-text-muted">|</span>
          <span className="text-text-muted">Tie: {score.ties}</span>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="flex-1 flex flex-col justify-center my-2.5 overflow-hidden">
        {activeTab === 'terminal' ? (
          <div className="flex flex-col justify-between h-full gap-3">
            
            {/* VS Code Dark Terminal Feed */}
            <div className="bg-[#05060b] border border-white/[0.06] rounded-lg p-3 flex flex-col gap-1 text-[0.75rem] text-slate-300 font-mono overflow-y-auto max-h-[140px] leading-relaxed">
              {history.map((line, idx) => (
                <div
                  key={idx}
                  className={`${
                    line.includes('You Won')
                      ? 'text-accent-cyan font-bold'
                      : line.includes('Computer Won')
                      ? 'text-accent-purple font-bold'
                      : line.includes('Tie')
                      ? 'text-amber-300 font-bold'
                      : 'text-slate-400'
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Visual Round Outcome Display */}
            {userChoice && compChoice && (
              <div className="flex items-center justify-around bg-gradient-to-r from-accent-cyan/[0.06] via-white/[0.03] to-accent-purple/[0.06] p-2.5 rounded-xl border border-white/10">
                <div className="text-center">
                  <div className="text-2xl mb-0.5">{choicesMap[userChoice]?.icon}</div>
                  <div className="text-[0.7rem] text-accent-cyan font-bold uppercase">You: {choicesMap[userChoice]?.name}</div>
                </div>
                
                <div className="text-center">
                  <div className="text-[0.75rem] font-bold text-white bg-white/10 px-2 py-0.5 rounded-full border border-white/15">
                    {result}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl mb-0.5">{choicesMap[compChoice]?.icon}</div>
                  <div className="text-[0.7rem] text-accent-purple font-bold uppercase">Bot: {choicesMap[compChoice]?.name}</div>
                </div>
              </div>
            )}

          </div>
        ) : (
          /* Code Snippet Tab */
          <div className="bg-[#05060b] border border-white/[0.06] rounded-lg p-3 text-[0.72rem] text-slate-300 font-mono overflow-x-auto leading-relaxed h-full">
            <pre className="text-slate-300">
              <span className="text-purple-400">import</span> random{'\n\n'}
              <span className="text-slate-500"># Snake Water Gun Logic in main.py</span>{'\n'}
              <span className="text-blue-400">def</span> <span className="text-yellow-300">play_round</span>(user, comp):{'\n'}
              {'    '}<span className="text-purple-400">if</span> user == comp: <span className="text-purple-400">return</span> <span className="text-green-300">"Draw"</span>{'\n'}
              {'    '}<span className="text-purple-400">win_rules</span> = &#123;<span className="text-green-300">'s'</span>: <span className="text-green-300">'w'</span>, <span className="text-green-300">'w'</span>: <span className="text-green-300">'g'</span>, <span className="text-green-300">'g'</span>: <span className="text-green-300">'s'</span>&#125;{'\n'}
              {'    '}<span className="text-purple-400">if</span> win_rules[user] == comp:{'\n'}
              {'        '}<span className="text-purple-400">return</span> <span className="text-green-300">"Player Wins!"</span>{'\n'}
              {'    '}<span className="text-purple-400">return</span> <span className="text-red-400">"Computer Wins!"</span>
            </pre>
          </div>
        )}
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => playGame('s')}
            className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-white hover:border-accent-cyan hover:bg-accent-cyan/15 hover:text-accent-cyan transition-all flex items-center gap-1.5 cursor-pointer font-bold"
          >
            <span>🐍 Snake</span>
          </button>
          <button
            type="button"
            onClick={() => playGame('w')}
            className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-white hover:border-accent-cyan hover:bg-accent-cyan/15 hover:text-accent-cyan transition-all flex items-center gap-1.5 cursor-pointer font-bold"
          >
            <span>💧 Water</span>
          </button>
          <button
            type="button"
            onClick={() => playGame('g')}
            className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-white hover:border-accent-cyan hover:bg-accent-cyan/15 hover:text-accent-cyan transition-all flex items-center gap-1.5 cursor-pointer font-bold"
          >
            <span>🔫 Gun</span>
          </button>
        </div>

        <button
          type="button"
          onClick={resetGame}
          className="p-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-text-muted hover:text-white hover:border-white/30 transition-all cursor-pointer"
          title="Reset Game"
        >
          <RotateCcw size={14} />
        </button>
      </div>

    </div>
  );
};
