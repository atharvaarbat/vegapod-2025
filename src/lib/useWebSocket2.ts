import { useEffect, useState, useRef, useCallback, useContext } from 'react';
import DataContext from './context';
import useTerminal from '@/hooks/useTerminal';

interface UseWebSocketReturn {
  connect: () => void;
  disconnect: () => void;
  sendData: (data: Record<string, any>) => void;
  togglePause: () => void;
  isPaused: boolean;
  heartbeatStatus: boolean;
}

const useWebSocket = (url: string): UseWebSocketReturn => {
  const { printLine } = useTerminal();
  const { setRawData, setCurrentData, setIsConnected, setWs } = useContext(DataContext);

  const [isPaused, setIsPaused] = useState(false);
  const [heartbeatStatus, setHeartbeatStatus] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const sendDataIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const heartbeatTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sendSensorInterval = 2000;

  const connect = useCallback(() => {
    if (wsRef.current) return; // Prevent duplicate connections

    const newWs = new WebSocket(url);
    setWs(newWs);
    wsRef.current = newWs;

    newWs.onopen = () => {
      console.log('WebSocket connection opened');
      printLine('WebSocket connection opened');
      setIsConnected(true);
      startSendingData();
    };

    newWs.onmessage = (event) => {
      if (isPaused) return; // Ignore messages if paused

      try {
        const data = JSON.parse(event.data);

        if (data.type === 'heartbeat') {
          handleHeartbeat();
        } else {
          setRawData((prev) => [...prev, data]);
          setCurrentData(data);
        }
      } catch (error) {
        console.error('Error parsing WebSocket data:', error);
      }
    };

    newWs.onerror = (error) => {
      console.error('WebSocket error:', error);
      printLine('WebSocket error', 'error');
    };

    newWs.onclose = () => {
      setIsConnected(false);
      clearIntervals();
      console.log('WebSocket connection closed');
      printLine('WebSocket connection closed');
    };
  }, [url, isPaused]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
      setIsConnected(false);
      clearIntervals();
    }
  }, []);

  const sendData = useCallback((data: Record<string, any>) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not open. Cannot send data.');
      printLine('WebSocket is not open. Cannot send data.', 'error');
    }
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const handleHeartbeat = () => {
    setHeartbeatStatus(true);
    clearTimeout(heartbeatTimeoutRef.current);
    heartbeatTimeoutRef.current = setTimeout(() => {
      setHeartbeatStatus(false);
    }, 1000);
  };

  const startSendingData = () => {
    if (sendDataIntervalRef.current) clearInterval(sendDataIntervalRef.current);

    sendDataIntervalRef.current = setInterval(() => {
      sendData({ message: 'Your message data here' });
    }, sendSensorInterval);
  };

  const clearIntervals = () => {
    if (sendDataIntervalRef.current) clearInterval(sendDataIntervalRef.current);
    if (heartbeatTimeoutRef.current) clearTimeout(heartbeatTimeoutRef.current);

    sendDataIntervalRef.current = null;
    heartbeatTimeoutRef.current = null;
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  return { connect, disconnect, sendData, togglePause, isPaused, heartbeatStatus };
};

export default useWebSocket;
