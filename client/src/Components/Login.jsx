import React, { useEffect, useState } from 'react';
import {
  Link, useNavigate,
} from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import logo from '../assets/logo.png';
import { useAuth } from '../useAuth';

const useStyles = makeStyles({
  head: {
    height: '80px',
  },
  signInBtn: {

    width: '200px',
  },

  loginContainer: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
  },
  img: {
    height: '100%',
    width: '50%',
  },
  logo: {
    height: '300px',
    width: '500px',
  },
  formStyle: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  textFld: {
    width: '400px',
    height: '100px',
  },
});

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMsg, setError] = useState(null);
  const [data, setData] = useState({
    email: null,
    password: null,
  });

  const handelSubmit = (e) => {
    e.preventDefault();
    setData({
      email,
      password,
    });
  };

  const call = (loginPayload) => {
    if (loginPayload.data.msg === 'logIn successfully') {
      navigate(`/
      `);
    } else {
      setError(loginPayload.data.msg);
      console.log(errorMsg);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    data.email ? login({ password: data.password, email: data.email }, call) : null;
  }, [data]);

  return (
    <div className={classes.loginContainer}>

      <img className={classes.img} src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="img" />
      <form className={classes.formStyle} onSubmit={(e) => handelSubmit(e)}>
        <img className={classes.logo} src={logo} alt="img" />
        <h1 className={classes.head}>welcome to Instashop</h1>
        <TextField className={classes.textFld} variant="outlined" type="email" placeholder=" Enter your email" onChange={(e) => setEmail(e.target.value)} required />
        <TextField className={classes.textFld} variant="outlined" type="password" placeholder=" Password" onChange={(e) => setPassword(e.target.value)} required />
        {errorMsg ? <Typography component="h4" style={{ color: 'red', paddingBottom: '20' }}>{errorMsg}</Typography> : null}

        <Button type="submit" className={classes.signInBtn} style={{ backgroundColor: '#3AB77D' }} variant="contained" size="large">Sign In </Button>
        <Typography component="h2" style={{ margin: '15px' }}>
          {' '}
          Create new account
          {' '}
          <Link to="/signup">
            Sign Up
          </Link>
        </Typography>
      </form>
    </div>
  );
}

export default Login;
