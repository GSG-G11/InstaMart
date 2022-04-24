import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Routes, Route, Link } from 'react-router-dom';
import SignUp from './Components/SignUp';
import './App.css';
import { Home } from './Components';
import Login from './Components/Login';
// import ProtectedRoute from './Components/ProtectedRoute ';
import { AuthProvider } from './Hooks/useAuth';

function App() {
  return (
    <div className="App">
      {/* <Link to="/home">Home</Link>
      <Link to="/profile">Profile</Link> */}
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route
            path="/profile"
            element={(
              <ProtectedRoute redirectPath="/login">
                <Profile />
              </ProtectedRoute>
            )}
          /> */}
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
