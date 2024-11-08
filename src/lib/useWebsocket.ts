import { useEffect, useState, useRef, useCallback, useContext } from 'react';
import DataContext from './context';
import useTerminal from '@/hooks/useTerminal';
// import useSaveData from '@/hooks/useSaveData';

interface UseWebSocketReturn {
  connect: () => void;
  disconnect: () => void;
  sendData: (data: Record<string, any>) => void;
  togglePause: () => void;
  isPaused: boolean;
}

const useWebSocket = (url: string): UseWebSocketReturn => {
  const {printLine} = useTerminal();
  const { setRawData, setCurrentData, setIsConnected, ws, setWs } = useContext(DataContext);
  const [isPaused, setIsPaused] = useState(false); // New state for pausing data reception
  const [transmitInterval, setTransmitInterval] = useState<NodeJS.Timeout | null>(null);
  // const {saveData} = useSaveData();
  const wsRef = useRef<WebSocket | null>(null);

  // Connect to the WebSocket server
  const connect = useCallback(() => {
    if (wsRef.current) return; // Avoid multiple connections

    const newws = new WebSocket(url);
    setWs(newws);
    wsRef.current = ws;

    
    newws.onopen = () => {
        console.log('WebSocket connection opened');
        printLine("WebSocket connection opened");
        setIsConnected(true);
        setIsConnected(true);
      
        // Start transmitting data every second (or your desired frequency)
        // const interval = setInterval(() => {
        //     const sendDataItems = localStorage.getItem("controlData");
        //   ws.send(JSON.stringify({ message: sendDataItems })); // Replace with your data
        // }, 1000); // Frequency in milliseconds
      
        // setTransmitInterval(interval);
      };
    newws.onmessage = (event:any) => {
      if (!isPaused) {
        try {
          let replaced = event.data?.replace(/'/g, "\"");

          const data = JSON.parse(replaced);
          setRawData((prevData) => [...prevData, data]);
          setCurrentData(data);
          console.log(data);
          //saveData(Date.now().toString(), data, '123');
        } catch (error) {
          console.error("Error parsing WebSocket data:", error);
        }
      }
    };

    
    newws.onclose = (e:any) => {
        console.log('WebSocket connection closed', e);

        setIsConnected(false);

        if (transmitInterval) {
          clearInterval(transmitInterval); // Stop sending data
          setTransmitInterval(null);
        }
      };
    newws.onerror = (error:any) => {
      console.error("WebSocket error:", error);
      printLine("WebSocket error:", 'error');
    };
  }, [url, isPaused]);

  // Disconnect from the WebSocket server
  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
      setIsConnected(false);
      printLine("WebSocket connection closed");
    }
  }, []);

  // Send JSON data to the WebSocket server
  const sendData = useCallback((data: Record<string, any>) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    } else {
      console.error("WebSocket is not open. Cannot send data.");
      printLine("WebSocket is not open. Cannot send data.", 'error');
    }
  }, []);

  // Toggle the data reception pause state
  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  // Clean up the WebSocket connection when the component using the hook unmounts
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return { connect, disconnect, sendData, togglePause, isPaused };
};

export default useWebSocket;
 