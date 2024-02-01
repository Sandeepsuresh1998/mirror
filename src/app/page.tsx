"use client";
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
import LoginButton from './components/LoginButton';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Landing() {

  const router = useRouter();
  const { user, error, isLoading } = useUser();
  
  useEffect(() => {
    if (!isLoading && user) {
      router.push("/journal");
    }
  }, [user, isLoading]);
  
  // TODO: Loading Page
  if (error) return <div>{error.message}</div>;
  
  return (
    <main className={`${styles.main} ${styles.theme}`}>
        {!user && <LoginButton/>}
    </main>
  )
}