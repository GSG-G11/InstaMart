import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import {
  Cart, ProductDetailsPage, Products, Dashboard, Home, OrdersTables,
} from './Pages';
import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider } from './Hooks/useAuth';
import { CartProvider } from './Hooks/useCart';

function App() {
  return (
    <div className="App">
      <CartProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<OrdersTables />} />
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
    </div>
  );
}

export default App;
