import React from 'react';
import styles from './styles/AuthButton.module.css';
import Button from '@mui/material/Button';

const LoginButton = () => {
  return (
    <Button variant="contained" href='/api/auth/login' style={{color: '#131c04' }}>Login</Button>
  );
};

export default LoginButton;