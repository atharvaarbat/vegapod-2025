import React, { useContext, useState } from 'react';
import useWebSocket from '@/lib/useWebsocket3';
import DataContext from '@/lib/context';

const WebSocketComponent: React.FC = () => {
  const {currentData, rawData, isConnected} = useContext(DataContext);
  const { connect, disconnect, sendData, togglePause, isPaused } = useWebSocket();
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message) {
      sendData({ message });
      setMessage("");
    }
  };

  return (
    <div>
      <h1>WebSocket Connection</h1>
      <button onClick={connect} >
        Connect
      </button>
      <button onClick={disconnect} >
        Disconnect
      </button>
      <button onClick={togglePause} >
        {isPaused ? "Resume Receiving Data" : "Pause Receiving Data"}
      </button>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
        />
        <button onClick={handleSend} >
          Send Message
        </button>
      </div>
      <div>
        <h2>Status: {isConnected ? "Connected" : "Disconnected"}</h2>
        <h2>Receiving Data: {isPaused ? "Paused" : "Active"}</h2>
      </div>

      <h2>Current Data</h2>
      <pre>{JSON.stringify(currentData, null, 2)}</pre>
      {/* {currentData} */}

      <h3>All Data Received</h3>
      <ul>
        {rawData.map((data, index) => (
          <li key={index}>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </li>
        ))}
      </ul>

      
    </div>
  );
};

export default WebSocketComponent;
