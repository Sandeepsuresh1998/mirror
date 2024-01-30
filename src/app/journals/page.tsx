'use client';
import React, { useState } from "react";
// import TipTap from '../components/TipTap'; TODO: Add when ready
import styles from "../page.module.css";
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import AudioRecorder from "../components/AudioRecorder";

export default withPageAuthRequired(
  function Journals() {

    
    const { user, error, isLoading } = useUser();
    const [text, setText] = useState('');


    const handleTranscriptionUpdate = (transcription: string) => {
      setText(transcription);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const response = await axios.post('http://localhost:8000/v1/embeddings/create', { 
          'user_id': user?.sub,
          'text': text,
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <main className={styles.main}>
        Hello {user?.name}
        <AudioRecorder onTranscriptionUpdate={handleTranscriptionUpdate}/>
        <form onSubmit={handleSubmit}>
          <textarea value={text} onChange={e => setText(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
      </main>
    )
  }
);
