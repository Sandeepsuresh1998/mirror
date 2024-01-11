"use client";
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
import LoginButton from './components/LoginButton';
import { useUser } from '@auth0/nextjs-auth0/client';
import LogoutButton from './components/LogoutButton';
import LoadingPage from './components/LoadingPage';

export default function Landing() {

  const { user, error, isLoading } = useUser();
  if (isLoading) return <LoadingPage />;
  if (error) return <div>{error.message}</div>;
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/journals");
    }
  }, [user, isLoading]);

  return (
    <main className={styles.main}>
      
        <div>
          {user?.name}
        </div>
        {user ? <LogoutButton/> : <LoginButton/>}
      
    </main>
  )
}