import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Cart from './Pages/Cart';
// import ProtectedRoute from './Components/ProtectedRoute';
import Products from './Pages/Products';
// import Table from './Components/Dashboard/Dashboard';
import { Home, ProductDetailsPage } from './Pages';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider } from './Hooks/useAuth';

function App() {
  return (
    <div className="App">
      {/* <Link to="/home">Home</Link>
      <Link to="/profile">Profile</Link> */}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Products" element={<Products />} />
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
