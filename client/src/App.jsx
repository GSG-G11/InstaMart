import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import './App.css';
import { Home, Profile } from './Components';
import Login from './Components/Login';
import Cart from './Pages/Cart';
import ProtectedRoute from './Components/ProtectedRoute ';
import { AuthProvider } from './useAuth';

function App() {
  return (
    <div className="App">
      <Link to="/home">Home</Link>
      <Link to="/profile">Profile</Link>
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/profile"
            element={(
              <ProtectedRoute redirectPath="/login">
                <Profile />
              </ProtectedRoute>
            )}
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
