import { useEffect, useState, useRef, useCallback } from 'react';

interface UseWebSocketReturn {
  rawData: Array<Record<string, any>>;
  currentData: Record<string, any> | null;
  connect: () => void;
  disconnect: () => void;
  sendData: (data: Record<string, any>) => void;
  togglePause: () => void;
  isConnected: boolean;
  isPaused: boolean;
}

const useWebSocket = (url: string): UseWebSocketReturn => {
  const [rawData, setRawData] = useState<Array<Record<string, any>>>([]);
  const [currentData, setCurrentData] = useState<Record<string, any> | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // New state for pausing data reception
  const [transmitInterval, setTransmitInterval] = useState<NodeJS.Timeout | null>(null);

  const wsRef = useRef<WebSocket | null>(null);

  // Connect to the WebSocket server
  const connect = useCallback(() => {
    if (wsRef.current) return; // Avoid multiple connections

    const ws = new WebSocket(url);
    wsRef.current = ws;

    
    ws.onopen = () => {
        console.log('WebSocket connection opened');
        setIsConnected(true);
      
        // Start transmitting data every second (or your desired frequency)
        const interval = setInterval(() => {
            const sendDataItems = localStorage.getItem("controlData");
          ws.send(JSON.stringify({ message: sendDataItems })); // Replace with your data
        }, 1000); // Frequency in milliseconds
      
        setTransmitInterval(interval);
      };
    ws.onmessage = (event) => {
      if (!isPaused) {
        try {
          const data = JSON.parse(event.data);
          setRawData((prevData) => [...prevData, data]);
          setCurrentData(data);
        } catch (error) {
          console.error("Error parsing WebSocket data:", error);
        }
      }
    };

    
    ws.onclose = () => {
        console.log('WebSocket connection closed');
        setIsConnected(false);
      
        if (transmitInterval) {
          clearInterval(transmitInterval); // Stop sending data
          setTransmitInterval(null);
        }
      };
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }, [url, isPaused]);

  // Disconnect from the WebSocket server
  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
      setIsConnected(false);
    }
  }, []);

  // Send JSON data to the WebSocket server
  const sendData = useCallback((data: Record<string, any>) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    } else {
      console.error("WebSocket is not open. Cannot send data.");
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

  return { rawData, currentData, connect, disconnect, sendData, togglePause, isConnected, isPaused };
};

export default useWebSocket;
