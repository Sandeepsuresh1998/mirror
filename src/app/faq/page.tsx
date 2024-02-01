'use client';
import React from "react";
import styles from "../page.module.css";
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Navbar from "../components/NavBar";

export default withPageAuthRequired(
  function FAQ() {
    const { user, error, isLoading } = useUser();
    
    return (
      <main className={`${styles.main} ${styles.theme}`}>
        <Navbar/>
        <h1>FAQ</h1>
        <h2>Question 1</h2>
        <p>Answer 1</p>
        <h2>Question 2</h2>
        <p>Answer 2</p>
        <h2>Question 3</h2>
        <p>Answer 3</p>
      </main>
    )
  }
);
