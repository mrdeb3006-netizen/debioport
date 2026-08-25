import React, { useState, useEffect, useRef } from 'react';

interface BarState {
  value: number;
  status: 'default' | 'comparing' | 'swapping' | 'sorted';
}

export const DsaVisualizer: React.FC = () => {
  const [bars, setBars] = useState<BarState[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [algoName, setAlgoName] = useState('Algorithm: QuickSort / O(N log N)');
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [activeAlgo, setActiveAlgo] = useState<'quick' | 'bubble'>('quick');

  const isSortingRef = useRef(false);
  isSortingRef.current = isSorting;

  const initArray = () => {
    if (isSortingRef.current) return;
    const newBars: BarState[] = [];
    for (let i = 0; i < 16; i++) {
      newBars.push({
        value: Math.floor(Math.random() * 75) + 20,
        status: 'default',
      });
    }
    setBars(newBars);
    setComparisons(0);
    setSwaps(0);
  };

  useEffect(() => {
    initArray();
  }, []);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const runBubbleSort = async () => {
    if (isSortingRef.current) return;
    setIsSorting(true);
    setActiveAlgo('bubble');
    setAlgoName('Algorithm: BubbleSort / O(N²)');

    const arr = [...bars];
    let compCount = 0;
    let swapCount = 0;
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        compCount++;
        setComparisons(compCount);

        arr[j].status = 'comparing';
        arr[j + 1].status = 'comparing';
        setBars([...arr]);
        await sleep(50);

        if (arr[j].value > arr[j + 1].value) {
          swapCount++;
          setSwaps(swapCount);

          arr[j].status = 'swapping';
          arr[j + 1].status = 'swapping';
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setBars([...arr]);
          await sleep(50);
        }

        arr[j].status = 'default';
        arr[j + 1].status = 'default';
      }
      arr[n - 1 - i].status = 'sorted';
      setBars([...arr]);
    }
    arr[0].status = 'sorted';
    setBars([...arr]);
    setIsSorting(false);
    setAlgoName('BubbleSort Complete! ✓');
  };

  const partition = async (arr: BarState[], low: number, high: number): Promise<number> => {
    const pivot = arr[high].value;
    arr[high].status = 'comparing';
    setBars([...arr]);

    let i = low - 1;
    for (let j = low; j < high; j++) {
      setComparisons((prev) => prev + 1);
      arr[j].status = 'comparing';
      setBars([...arr]);
      await sleep(45);

      if (arr[j].value < pivot) {
        i++;
        setSwaps((prev) => prev + 1);
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        arr[i].status = 'swapping';
        setBars([...arr]);
        await sleep(45);
        arr[i].status = 'default';
      }

      arr[j].status = 'default';
    }

    setSwaps((prev) => prev + 1);
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    arr[i + 1].status = 'sorted';
    arr[high].status = 'default';
    setBars([...arr]);
    await sleep(45);

    return i + 1;
  };

  const quickSortHelper = async (arr: BarState[], low: number, high: number) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    } else if (low >= 0 && low < arr.length) {
      arr[low].status = 'sorted';
      setBars([...arr]);
    }
  };

  const runQuickSort = async () => {
    if (isSortingRef.current) return;
    setIsSorting(true);
    setActiveAlgo('quick');
    setAlgoName('Algorithm: QuickSort / O(N log N)');

    const arr: BarState[] = [...bars].map((b) => ({ ...b, status: 'default' }));
    setBars(arr);

    await quickSortHelper(arr, 0, arr.length - 1);

    arr.forEach((b) => (b.status = 'sorted'));
    setBars([...arr]);
    setIsSorting(false);
    setAlgoName('QuickSort Complete! ✓');
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Visualizer Controls */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <button
          type="button"
          onClick={runQuickSort}
          disabled={isSorting}
          className={`font-mono text-[0.76rem] py-1.5 px-3.5 rounded-md border transition-all duration-300 ${
            activeAlgo === 'quick'
              ? 'bg-accent-cyan text-bg-dark font-bold border-accent-cyan shadow-sm'
              : 'border-accent-cyan/30 bg-accent-cyan/10 text-slate-100 hover:bg-accent-cyan/20'
          }`}
        >
          ▶ QuickSort
        </button>

        <button
          type="button"
          onClick={runBubbleSort}
          disabled={isSorting}
          className={`font-mono text-[0.76rem] py-1.5 px-3.5 rounded-md border transition-all duration-300 ${
            activeAlgo === 'bubble'
              ? 'bg-accent-cyan text-bg-dark font-bold border-accent-cyan shadow-sm'
              : 'border-accent-cyan/30 bg-accent-cyan/10 text-slate-100 hover:bg-accent-cyan/20'
          }`}
        >
          ▶ BubbleSort
        </button>

        <button
          type="button"
          onClick={initArray}
          disabled={isSorting}
          className="font-mono text-[0.76rem] py-1.5 px-3.5 rounded-md border border-accent-purple/40 bg-accent-purple/10 text-slate-100 transition-all duration-300 hover:bg-accent-purple hover:text-white"
        >
          ⚡ Shuffle
        </button>
      </div>

      {/* Sorting Bars Container */}
      <div className="h-[125px] flex items-end justify-between gap-1 px-3 py-2 bg-white/[0.02] rounded-xl border border-white/[0.04]">
        {bars.map((bar, idx) => {
          let bgClass = 'bg-gradient-to-t from-accent-violet to-accent-purple';
          if (bar.status === 'comparing') {
            bgClass = 'bg-gradient-to-t from-violet-600 to-accent-purple scale-y-105';
          } else if (bar.status === 'swapping') {
            bgClass = 'bg-gradient-to-t from-accent-cyan to-sky-300';
          } else if (bar.status === 'sorted') {
            bgClass = 'bg-gradient-to-t from-emerald-500 to-teal-400';
          }

          return (
            <div
              key={idx}
              className={`flex-1 rounded-t-sm transition-all duration-150 ${bgClass}`}
              style={{ height: `${bar.value}%` }}
            />
          );
        })}
      </div>

      {/* Telemetry Display */}
      <div className="flex justify-between font-mono text-[0.76rem] text-accent-cyan flex-wrap gap-2">
        <span>{algoName}</span>
        <span>Comparisons: {comparisons} | Swaps: {swaps}</span>
      </div>
    </div>
  );
};
