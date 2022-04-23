/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  createContext, useState, useContext, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async ({ password, email }, callback = null) => {
    try {
      const result = await axios.post('/api/v1/login', {
        password,
        email,
      });
      setUser(result.data.rows);
      if (callback) callback(null);
    } catch (error) {
      if (callback) callback(error);
    }
  };

  useEffect(() => {});

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
}
AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export const useAuth = () => useContext(AuthContext);
