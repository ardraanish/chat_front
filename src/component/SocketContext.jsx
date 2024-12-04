import { useContext, useEffect, useState, createContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socketio, setSocketio] = useState(null);

  useEffect(() => {
   
    const newsocket = io("http://localhost:5000");

    setSocketio(newsocket);

    
    return () => {
      newsocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketio}>
      {children}
    </SocketContext.Provider>
  );
};


export const useSocket = () => {
  return useContext(SocketContext);
};
