import React from "react"
import styles from './styles/AuthButton.module.css';

const LogoutButton = () => {
    return (
        <a href='/api/auth/logout' className={styles.authButton}>Logout</a>
    );
};

export default LogoutButton