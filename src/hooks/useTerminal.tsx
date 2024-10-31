import { useState } from 'react';

type UseTerminalReturn = {
  lines: string[];
  printLine: (newLine: string) => void;
  clear: () => void;
};

const useTerminal = (): UseTerminalReturn => {
  const [lines, setLines] = useState<string[]>(localStorage.getItem('terminal') ? JSON.parse(localStorage.getItem('terminal')!) : ["Hello, World!"]);

  const printLine = (newLine: string) => {
    setLines((prevLines) => [...prevLines, newLine]);
    localStorage.setItem('terminal', JSON.stringify([...lines, newLine]))
  };
  const clear = () => {
    setLines([]);
    localStorage.setItem('terminal', JSON.stringify([]))
  }

  return { lines, printLine,clear };
};

export default useTerminal;
