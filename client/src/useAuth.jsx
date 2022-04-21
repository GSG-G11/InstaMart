/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  createContext, useState, useContext, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    setIsAuth(Cookies.get('token'));
  });
  if (isAuth === null) {
    return <h1>Loading</h1>;
  }
  return (
    <AuthContext.Provider value={{ isAuth }}>
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
