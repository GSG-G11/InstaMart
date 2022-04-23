/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  createContext, useState, useContext, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const signup = async (
    {
      name, address, mobile, email, password, confirmPassword,
    },
    callback = null,
  ) => {
    try {
      const result = await axios.post('/api/v1/signup', {
        name,
        address,
        mobile,
        email,
        password,
        confirmPassword,
      });
      setUser(result.data.rows);
      if (callback) callback(null);
    } catch (error) {
      if (callback) callback(error);
    }
  };

  const logout = async (callback = null) => {
    try {
      await axios.post('/api/v1/logout');
      setUser(null);
      if (callback) callback(null);
    } catch (error) {
      if (callback) callback(error);
    }
  };

  const authUser = async (signal) => {
    try {
      const result = await axios.get('/api/v1/auth/user', { signal });
      setUser(result.data);
      setLoading(false);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    authUser(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
      }}
    >
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
