import { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import { BatteryWarning, Thermometer, Wind, Zap } from "lucide-react";

// Define the types for the context values
interface AppState {
  setupOpen: boolean;
  runOpen: boolean;
  logPage: boolean;
}

// Define possible statuses for the header errors
export type ErrorStatus = "warning" | "error" | "normal";

// Define the structure of each header error detail
interface ErrorDetail {
  name: string;
  status: ErrorStatus;
  icon: JSX.Element;
}

// Define the structure of headerErrors, which is an object with keys as strings and values as ErrorDetail
type HeaderErrors = Record<string, ErrorDetail>;

interface DataContextType {
  rawData: any[];
  setRawData: Dispatch<SetStateAction<any[]>>;
  currentData: any[];
  setCurrentData: Dispatch<SetStateAction<any[]>>;
  isConnected: boolean;
  setIsConnected: Dispatch<SetStateAction<boolean>>;
  ws: any;
  setWs: Dispatch<SetStateAction<any>>;
  // wsRef: any;
  // setWsRef: Dispatch<SetStateAction<any>>;
  appState: AppState;
  setAppState: Dispatch<SetStateAction<AppState>>;
  headerErrors: HeaderErrors;
  setHeaderErrors: Dispatch<SetStateAction<HeaderErrors>>;
  profile: string;
  setProfile: Dispatch<SetStateAction<string>>;
}

interface DataProviderProps {
  children: ReactNode;
}

// Create the context with default values
const DataContext = createContext<DataContextType>({} as DataContextType);

export const DataProvider = ({ children }: DataProviderProps) => {
  const [rawData, setRawData] = useState<any[]>([]);
  const [currentData, setCurrentData] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  // useEffect(() => {
  //   // const myWs
  //   setWs(new WebSocket("ws://172.20.10.2/ws"));
  //   // const MyRef = useRef<WebSocket | null>(null);
  //   // MyRef.current = myWs;
  //   // setWsRef(MyRef);
  // }, [])
  const [profile, setProfile] = useState<string>(localStorage.getItem('profile') || 'General');
  const [appState, setAppState] = useState<AppState>({
    setupOpen: false,
    runOpen: false,
    logPage: false,
  });

  const [headerErrors, setHeaderErrors] = useState<HeaderErrors>({
    temprature: {
      name: "Temprature",
      status: "warning",
      icon: <Thermometer size={22} />,
    },
    voltage: {
      name: "Voltage",
      status: "error",
      icon: <BatteryWarning size={22} />,
    },
    bms: {
      name: "BMS",
      status: "normal",
      icon: <Wind size={22} />,
    },
    pressure: {
      name: "Pressure",
      status: "normal",
      icon: <Zap size={22} />,
    },
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
        setProfile,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
