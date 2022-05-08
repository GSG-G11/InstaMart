import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import { Cart, ProductDetailsPage } from './Pages';

// import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider } from './Hooks/useAuth';
import Products from './Pages/Products';

function App() {
  return (
    <div className="App">
      {/* <Link to="/home">Home</Link>
      <Link to="/profile">Profile</Link> */}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Products />} />

          {/* <Route path="/home" element={<Home />} /> */}
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
