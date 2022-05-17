import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3001`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  const value = useMemo(() => ({
    socket,
  }), [socket]);
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

SocketProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export const useSocket = () => useContext(SocketContext);
