import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Cart from './Pages/Cart';
// import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider } from './Hooks/useAuth';
import Products from './Pages/Products';
// import Table from './Components/Dashboard/Dashboard';
import { Home, ProductDetailsPage } from './Pages';

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
          {/* <Route path="/table" element={<Table />} /> */}
          <Route path="/cart" element={<Cart />} />

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
          <Route path="/product/:id" element={<ProductDetailsPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
