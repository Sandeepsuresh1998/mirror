"use client";
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
import LoginButton from './components/LoginButton';
import { useUser } from '@auth0/nextjs-auth0/client';
import LogoutButton from './components/LogoutButton';
import LoadingPage from './components/LoadingPage';

export default function Landing() {

  const router = useRouter();
  const { user, error, isLoading } = useUser();
  
  useEffect(() => {
    if (!isLoading && user) {
      router.push("/journal");
    }
  }, [user, isLoading]);
  
  if (isLoading) return <LoadingPage />;
  if (error) return <div>{error.message}</div>;
  
  return (
    <main className={styles.main}>
        <div>
          {user?.name}
        </div>
        {user ? <LogoutButton/> : <LoginButton/>}
    </main>
  )
}