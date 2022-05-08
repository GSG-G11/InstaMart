import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import {
  Cart, ProductDetailsPage, Products, Dashboard,
} from './Pages';
import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider } from './Hooks/useAuth';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Products />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/dashboard"
            element={(
              <ProtectedRoute redirectPath="/login">
                <Dashboard />
              </ProtectedRoute>
            )}
          />
          {/* example how to use protected route */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
