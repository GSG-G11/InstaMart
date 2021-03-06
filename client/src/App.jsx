import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { SignUp, Login, ProtectedRoute } from './Components';
import {
  Cart, ProductDetailsPage, Products, Dashboard, Home,
} from './Pages';
import { AuthProvider } from './Hooks/useAuth';
import { CartProvider } from './Hooks/useCart';
import { SocketProvider } from './Hooks/useSocket';

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <CartProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
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
              <Route path="/signup" element={<SignUp />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
            </Routes>
          </AuthProvider>
        </CartProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
