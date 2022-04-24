import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo1.png';
import './SignUp.css';
import image from '../../images/image.png';
import { useAuth } from '../../Hooks/useAuth';

function SignUp() {
  const navigate = useNavigate();
  const [userError, setUserError] = useState(null);
  const [value, setValue] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    address: '',
    mobile: '',
    email: '',
  });
  const { signup } = useAuth();

  const handleClick = (e) => {
    e.preventDefault();
    signup(value, (error) => {
      if (error) {
        setUserError(error.data.message);
      } else {
        navigate('/');
      }
    });
  };

  return (
    <div className="container">
      <div className="signupImage">
        <img src={image} alt="error loading images" className="signupimage" />
      </div>
      <div className="rightContainer">
        <div className="logoPart">
          <img
            src={logo}
            alt="img"
          />
        </div>
        <p className="welomeParagraph">welcome to Instashop</p>
        <div className="inputContainer">
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            className="inputField"
            onChange={(e) => {
              setValue({ ...value, name: e.target.value });
            }}
          />
          <TextField
            id="email"
            label="email"
            variant="outlined"
            className="inputField"
            onChange={(e) => {
              setValue({ ...value, email: e.target.value });
            }}
          />
          <TextField
            id="mobile"
            label="mobile"
            variant="outlined"
            className="inputField"
            onChange={(e) => {
              setValue({ ...value, mobile: e.target.value });
            }}
          />
          <TextField
            id="password"
            label="password"
            variant="outlined"
            className="inputField"
            type="password"
            onChange={(e) => {
              setValue({ ...value, password: e.target.value });
            }}
          />
          <TextField
            id="confirmPassword"
            label="confirmPassword"
            className="inputField"
            type="password"
            onChange={(e) => {
              setValue({ ...value, confirmPassword: e.target.value });
            }}
          />
          <TextField
            id="address"
            label="address"
            className="inputField"
            onChange={(e) => {
              setValue({ ...value, address: e.target.value });
            }}
          />
        </div>
        {userError ? <Typography component="h4" style={{ color: 'red', paddingBottom: '20' }}>{userError}</Typography> : null}
        <Button
          variant="contained"
          onClick={handleClick}
          style={{
            backgroundColor: '#3AB77D',
            width: '189px',
            height: '53px',
          }}
        >
          Sign Up

        </Button>
      </div>
    </div>
  );
}
export default SignUp;
