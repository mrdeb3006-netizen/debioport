import React, { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  text: string;
  type: 'user' | 'info' | 'success' | 'cyan' | 'green' | 'dim';
}

export const TerminalSimulator: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: '$ ./automate_pipeline.sh --target=all', type: 'user' },
    { text: '[INFO] Scanning workspace directory trees...', type: 'dim' },
    { text: '[INFO] Executing batch transforms on 184 files...', type: 'dim' },
    { text: '[SUCCESS] Pipeline completed in 0.42s (0 errors).', type: 'cyan' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const historyRef = useRef<HTMLDivElement | null>(null);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    const newLines: TerminalLine[] = [...history, { text: `$ ${rawCmd}`, type: 'user' }];

    switch (cmd) {
      case 'status':
        newLines.push({ text: '[OK] All services running at 100% efficiency. 0 active alerts.', type: 'cyan' });
        break;
      case 'benchmark':
      case 'bench':
        newLines.push({ text: '[BENCH] Execution time: 1.4ms | Memory: 42MB | CPU: 0.8%', type: 'dim' });
        break;
      case 'clean':
        newLines.push({ text: '[CLEAN] Workspace cache cleared (18 temporary artifacts removed).', type: 'green' });
        break;
      case 'help':
        newLines.push({ text: 'Available commands: status, benchmark, clean, clear, whoami, skills, help', type: 'dim' });
        break;
      case 'whoami':
        newLines.push({ text: 'Debendra (MR DEB) • Developer • Problem Solver', type: 'cyan' });
        break;
      case 'skills':
        newLines.push({ text: 'Java, Python, C, DSA, Algorithms, Web Dev, Canvas 2D, Git', type: 'dim' });
        break;
      case 'clear':
        setHistory([]);
        return;
      default:
        newLines.push({ text: `Command '${rawCmd}' executed. Type 'help' for available commands.`, type: 'dim' });
        break;
    }

    setHistory(newLines);
  };

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
      setInputVal('');
    }
  };

  return (
    <div className="w-full font-mono text-[0.82rem] flex flex-col gap-2.5 bg-black/50 p-4 rounded-xl border border-white/[0.06]">
      {/* Quick Command Chips */}
      <div className="flex gap-2 flex-wrap">
        {['status', 'benchmark', 'clean', 'help'].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => executeCommand(cmd)}
            className="font-mono text-[0.72rem] bg-white/[0.06] border border-white/[0.15] text-accent-cyan py-1 px-2.5 rounded transition-all duration-300 hover:bg-accent-cyan/20 hover:border-accent-cyan"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal History */}
      <div ref={historyRef} className="flex flex-col gap-1 max-h-[120px] overflow-y-auto scrollbar-thin">
        {history.map((line, idx) => {
          let textClass = 'text-slate-300';
          if (line.type === 'user') textClass = 'text-emerald-400 font-semibold';
          else if (line.type === 'cyan') textClass = 'text-accent-cyan font-semibold';
          else if (line.type === 'green') textClass = 'text-green-400';
          else if (line.type === 'dim') textClass = 'text-slate-400';

          return (
            <div key={idx} className={`leading-relaxed ${textClass}`}>
              {line.text}
            </div>
          );
        })}
      </div>

      {/* Terminal Input Line */}
      <div className="flex items-center gap-2 border-t border-white/[0.08] pt-2.5">
        <span className="text-emerald-400 font-bold">$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a command (e.g. status, bench, clean)..."
          className="flex-1 bg-transparent border-none text-white font-mono text-[0.82rem] outline-none"
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
};
