'use client';
import React from "react";
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';


export default withPageAuthRequired(
  function Journals() {
    const { user, error, isLoading } = useUser();
    return (
      <main>
        Hello {user?.name}
      </main>
    )
  }
);
