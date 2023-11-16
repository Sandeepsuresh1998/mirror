import React from 'react';
import styles from './styles/AuthButton.module.css';

const LoginButton = () => {
  return (
    <a href='/api/auth/login' className={styles.authButton}>Login</a>
  );
};

export default LoginButton;