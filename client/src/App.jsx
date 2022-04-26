import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './Components/SignUp';
import { Home } from './Components';
import Login from './Components/Login';
import Header from './Components/header/Header';
// import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider } from './Hooks/useAuth';
import ProductDetails from './Components/productdetails/ProductDetails';

function App() {
  return (
    <div className="App">
      {/* <Link to="/home">Home</Link>
      <Link to="/profile">Profile</Link> */}
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route
            path="/profile"
            element={(
              <ProtectedRoute redirectPath="/login">
                <Profile />
              </ProtectedRoute>
            )}
          /> */}
          {/* example how to use protected route */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
