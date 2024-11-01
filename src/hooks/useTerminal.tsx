import { useState, useEffect } from 'react';

type UseTerminalReturn = {
  lines: any[];
  printLine: (newLine: string, type?: string) => void;
  clear: () => void;
};

const useTerminal = (): UseTerminalReturn => {
  const [lines, setLines] = useState(
    localStorage.getItem('terminal') ? JSON.parse(localStorage.getItem('terminal')!) : [{text:"Hello! World", type:"log", tt: new Date().getTime()}]
  );

  const printLine = (newLine: string, type?: string) => {
    const oldLines = localStorage.getItem('terminal') ? JSON.parse(localStorage.getItem('terminal')!) : [];
    const updatedLines = [...oldLines, { text: newLine, type: type || 'log', tt: new Date().getTime() }];
    setLines(updatedLines);
    localStorage.setItem('terminal', JSON.stringify(updatedLines));
  };

  const clear = () => {
    setLines([{text:"Hello! World", type:"log", tt: new Date().getTime()}]);
    localStorage.setItem('terminal', JSON.stringify([{text:"Hello! World", type:"log", tt: new Date().getTime()}]));
  };

  // Sync lines with localStorage "terminal" item if it changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'terminal') {
        setLines(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return { lines, printLine, clear };
};

export default useTerminal;
