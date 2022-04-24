import React from 'react';
import { useAuth } from '../useAuth';

function Login() {
  const { login } = useAuth();
  const loginClick = () => {
    login({ password: 'password', email: 'salma1@gmail.com' });
  };
  return (
    <button type="submit" onClick={loginClick}>Login</button>
  );
}

export default Login;
