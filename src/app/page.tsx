"use client";
import { useState } from 'react'
import styles from "./page.module.css";
import AudioRecorder from './components/AudioRecorder';
import LoginButton from './components/LoginButton';
import { useUser } from '@auth0/nextjs-auth0/client';
import LogoutButton from './components/LogoutButton';


export default function Home() {

  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <main className={styles.main}>
      
        <AudioRecorder />
        <div>
          {user?.name}
        </div>
        <LogoutButton/>
      <LoginButton/>
      
    </main>
  )
}
