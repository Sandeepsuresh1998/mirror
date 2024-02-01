import React from 'react';
import styles from './styles/AuthButton.module.css';
import Link from 'next/link';
import CircularProgress from '@mui/material/CircularProgress';

const LoginButton = () => {
  const [isLoading, setLoading] = React.useState(false);
  return (
    <div>
      {isLoading ? <CircularProgress /> : 
        <Link href='/api/auth/login'>
          <button className={styles.authButton} onClick={() => setLoading(true)}>
            {isLoading ? <CircularProgress /> : "Login"}
          </button>
        </Link>
      }
    </div>
  );
};

export default LoginButton;