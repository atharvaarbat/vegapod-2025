import { useState } from 'react';

interface UseJsonStorage<T> {
  data: T | null;
  saveData: (data: T) => void;
  downloadData: () => void;
  loadData: (file: File) => Promise<void>;
  clearData: () => void;
}

export function useJsonStorage<T>(fileName: string = 'data.json'): UseJsonStorage<T> {
  const [data, setData] = useState<T | null>(null);

  // Function to save data
  const saveData = (newData: T) => {
    setData(newData);
  };

  // Function to download data as a JSON file
  const downloadData = () => {
    if (!data) {
      console.error('No data to download');
      return;
    }
    const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(jsonBlob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to load data from an uploaded JSON file
  const loadData = async (file: File) => {
    if (file.type !== 'application/json') {
      console.error('Please upload a valid JSON file');
      return;
    }

    const fileContent = await file.text();
    try {
      const parsedData = JSON.parse(fileContent);
      setData(parsedData);
    } catch (error) {
      console.error('Failed to parse JSON file:', error);
    }
  };

  // Clear data function
  const clearData = () => {
    setData(null);
  };

  return { data, saveData, downloadData, loadData, clearData };
}
