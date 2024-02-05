"use client";
import React, { useState, useEffect } from "react";
// import TipTap from '../components/TipTap'; TODO: Add when ready
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import AudioRecorder from "../components/AudioRecorder";
import Navbar from "../components/NavBar";
import styles from "../page.module.css";
import journalStyles from "../components/styles/Journal.module.css";

export default withPageAuthRequired(
  function Journals() {

    const { user, error, isLoading } = useUser();
    const [text, setText] = useState('');
    const [startedRecording, setStartedRecording] = useState(false);


    const handleOnRecordingStart = () => {
      setStartedRecording(true);
    }

    const handleTranscriptionUpdate = (transcription: string) => {
      setText(transcription);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/v1/embeddings/create', { 
          'user_id': user?.sub,
          'text': text,
        });

        console.log(response);

        // TODO: Catch errors with the API
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <main className={`${styles.main} ${styles.theme}`}>
          <Navbar/>
        <div className={journalStyles.container}>
          <div>
            <AudioRecorder onTranscriptionUpdate={handleTranscriptionUpdate} onRecordingStart={handleOnRecordingStart}/>
          </div>

          {startedRecording && 
            <div className={journalStyles.journal}>
              <h1>Journal</h1>
                <p> {text} </p>
                <form onSubmit={handleSubmit}>
                  <button type="submit">Submit</button>
                </form>
            </div>
          }
        </div>
      </main>
    )
  }
);
