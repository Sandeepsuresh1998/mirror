'use client';
import React from "react";
import styles from "../page.module.css";
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Navbar from "../components/NavBar";

export default withPageAuthRequired(
  function Reflect() {
    const { user, error, isLoading } = useUser();
    
    return (
      <main className={`${styles.main} ${styles.theme}`}>
        <Navbar/>
        Time to Reflect {user?.name}
      </main>
    )
  }
);
