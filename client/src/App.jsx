import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './Components/SignUp';
import './App.css';
import { Home } from './Components';
import Login from './Components/Login';
// eslint-disable-next-line no-unused-vars
import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider } from './Hooks/useAuth';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
