import React, { useState } from 'react';
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

    height: '100vh',
  },
  img: {
    height: '100%',
    width: '50%',
    objectFit: 'cover',
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

  const call = (error) => {
    if (!error) {
      navigate(`/
      `);
    } else {
      setError(error.data.msg);
    }
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    login({ password, email }, call);
  };

  return (
    <div className={classes.loginContainer}>

      <img className={classes.img} src="https://images.pexels.com/photos/2292919/pexels-photo-2292919.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="img" />
      <form className={classes.formStyle} onSubmit={(e) => handelSubmit(e)}>
        <img className={classes.logo} src={logo} alt="img" />
        <h1 className={classes.head}>welcome to Instashop</h1>
        <TextField className={classes.textFld} variant="outlined" type="email" placeholder=" Enter your email" onChange={(e) => setEmail(e.target.value)} required />
        <TextField className={classes.textFld} variant="outlined" type="password" placeholder=" Password" onChange={(e) => setPassword(e.target.value)} required />
        {errorMsg ? <Typography component="h4" style={{ color: 'red', paddingBottom: '20px' }}>{errorMsg}</Typography> : null}

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
