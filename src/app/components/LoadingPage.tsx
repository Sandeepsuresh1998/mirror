import React from "react"
import styles from './styles/AuthButton.module.css';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingPage = () => {
  return (
    <main className={styles.main}>
        <CircularProgress />
    </main>
  )
};

export default LoadingPage
