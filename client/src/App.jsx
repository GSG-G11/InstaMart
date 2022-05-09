import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './Components/SignUp';
import { Home } from './Components';
import Login from './Components/Login';
import Cart from './Pages/Cart';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider } from './Hooks/useAuth';
import Products from './Pages/Products';
import ProductDetailsPage from './Pages/ProductDetails';
import { CartProvider } from './Hooks/useCart';

function App() {
  return (
    <div className="App">
      {/* <Link to="/home">Home</Link>
      <Link to="/profile">Profile</Link> */}
      <CartProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/home" element={<Home />} />
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
      </CartProvider>
    </div>
  );
}

export default App;
