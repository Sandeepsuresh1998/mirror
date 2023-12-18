'use client';
import React from "react";
import TipTap from '../components/TipTap';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';



export default withPageAuthRequired(
  function Journals() {
    const { user, error, isLoading } = useUser();
    return (
      <main>
        Hello {user?.name}

        <TipTap />
      </main>
    )
  }
);
