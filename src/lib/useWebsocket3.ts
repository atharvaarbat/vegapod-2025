import { useState, useCallback, useContext } from "react";
import DataContext from "./context";
import useTerminal from "@/hooks/useTerminal";

interface UseWebSocketReturn {
  connect: () => void;
  disconnect: () => void;
  sendData: (data: Record<string, any>) => void;
  togglePause: () => void;
  isPaused: boolean;
}

const useWebSocket = (): UseWebSocketReturn => {
  const { printLine } = useTerminal();
  const { setRawData, setCurrentData, setIsConnected, ws,setWs } = useContext(DataContext);
  const [isPaused, setIsPaused] = useState(false);
  const [transmitInterval, setTransmitInterval] = useState<NodeJS.Timeout | null>(null);

  // Connect to the WebSocket server
  const connect = useCallback(() => {
    console.log("Connecting to WebSocket server...");
    // console.log(ws);
    if(ws) return;

    const newWs = new WebSocket("ws://172.20.10.2/ws");
    setWs(newWs);
    newWs.onopen = () => {
      console.log("WebSocket connection opened");
      printLine("WebSocket connection opened");
      setIsConnected(true);
    };

    newWs.onmessage = (event: any) => {
      if (!isPaused) {
        try {
          let replaced = event.data?.replace(/'/g, '"');
          const data = JSON.parse(replaced);
          setRawData((prevData) => [...prevData, data]);
          setCurrentData(data);
          console.log(data);
        } catch (error) {
          console.error("Error parsing WebSocket data:", error);
        }
      }
    };

    newWs.onclose = (e: any) => {
      console.log("WebSocket connection closed", e);
      setIsConnected(false);

      if (transmitInterval) {
        clearInterval(transmitInterval);
        setTransmitInterval(null);
      }
    };

    newWs.onerror = (error: any) => {
      console.error("WebSocket error:", error);
      printLine("WebSocket error:", "error");
    };
  }, [ws, isPaused]);

  // Disconnect from the WebSocket server
  const disconnect = useCallback(() => {
    console.log("WebSocket connection closed");
    setWs(null);
    ws.close();
    setIsConnected(false);
    printLine("WebSocket connection closed");
  }, [ws]);

  // Send JSON data to the WebSocket server
  const sendData = useCallback(
    (data: Record<string, any>) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data));
      } else {
        console.error("WebSocket is not open. Cannot send data.");
        printLine("WebSocket is not open. Cannot send data.", "error");
      }
    },
    [ws]
  );

  // Toggle the data reception pause state
  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  return { connect, disconnect, sendData, togglePause, isPaused };
};

export default useWebSocket;