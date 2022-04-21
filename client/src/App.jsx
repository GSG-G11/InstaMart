import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import './App.css';
import { Home, Profile } from './Components';
import ProtectedRoute from './Components/ProtectedRoute ';
import { AuthProvider } from './useAuth';

function App() {
  return (
    <div className="App">
      <Link to="home">Home</Link>
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            path="/profile"
            element={(
              <ProtectedRoute redirectPath="/">
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
