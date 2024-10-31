import { useEffect, useState } from 'react';

type UseControlReturn = {
  setControl: (key: string, value: unknown) => void;
  controls: Record<string, unknown>;
};

const useControls = (): UseControlReturn => {
  const [controls, setControls] = useState({});

  useEffect(() => {
    const storedControls = JSON.parse(localStorage.getItem("controlData") || "{}");
    setControls(storedControls);
  }, []);
  const setControl = (key: string, value: unknown): void => {
    const newControls = JSON.parse(localStorage.getItem("controlData") || "{}") as Record<string, unknown>;
    newControls[key] = value;
    localStorage.setItem("controlData", JSON.stringify(newControls));
    setControls(newControls);
  };


  return { setControl, controls };
};

export default useControls;
