'use client';
import React from "react"
import styles from "../page.module.css";
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';

export default withPageAuthRequired(
    function Home() {
        const { user, error, isLoading } = useUser();
        return (
            <main className={styles.main}>
                Welcome home {user?.name}
            </main>
        )
    }
      
);
