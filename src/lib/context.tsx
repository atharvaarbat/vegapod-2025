import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

// Create the context with default values
const DataContext = createContext<DataContextType>({} as DataContextType);

export const DataProvider = ({ children }: DataProviderProps) => {
  const [rawData, setRawData] = useState<any[]>([]);
  const [currentData, setCurrentData] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [profile, setProfile] = useState<string>(localStorage.getItem('profile') || 'General');
  const [appState, setAppState] = useState<AppState>({
    setupOpen: false,
    runOpen: false,
    logPage: false,
  });
  const [headerErrors, setHeaderErrors] = useState<HeaderErrors>({
    temprature: true,
    voltage: true,
    bms: true,
    pressure: true,
  });

  return (
    <DataContext.Provider
      value={{
        rawData,
        setRawData,
        currentData,
        setCurrentData,
        isConnected,
        setIsConnected,
        ws,
        setWs,
        appState,
        setAppState,
        headerErrors,
        setHeaderErrors,
        profile,
        setProfile
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

// Define the types for the context values
interface AppState {
  setupOpen: boolean;
  runOpen: boolean;
  logPage: boolean;
}

interface HeaderErrors {
  temprature: boolean;
  voltage: boolean;
  bms: boolean;
  pressure: boolean;
}

interface DataContextType {
  rawData: any[];
  setRawData: Dispatch<SetStateAction<any[]>>;
  currentData: any[];
  setCurrentData: Dispatch<SetStateAction<any[]>>;
  isConnected: boolean;
  setIsConnected: Dispatch<SetStateAction<boolean>>;
  ws: WebSocket | null;
  setWs: Dispatch<SetStateAction<WebSocket | null>>;
  appState: AppState;
  setAppState: Dispatch<SetStateAction<AppState>>;
  headerErrors: HeaderErrors;
  setHeaderErrors: Dispatch<SetStateAction<HeaderErrors>>;
  profile: string;
  setProfile: Dispatch<SetStateAction<string>>
}
interface DataProviderProps {
  children: ReactNode;
}