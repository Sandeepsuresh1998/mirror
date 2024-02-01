import React from 'react';
import styles from './styles/AuthButton.module.css';
import Link from 'next/link';
import CircularProgress from '@mui/material/CircularProgress';

const LoginButton = () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <Link href='/api/auth/login'>
      <button className={styles.authButton} onClick={() => setLoading(true)}>
        {loading ? <CircularProgress /> : "Login"}
      </button>
    </Link>
  );
};

export default LoginButton;