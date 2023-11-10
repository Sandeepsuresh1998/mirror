"use client";
import { useState } from 'react'
import styles from "./page.module.css";
import AudioRecorder from './components/AudioRecorder';

export default function Home() {

  const isRecording = useState(false)
  return (
    <main className={styles.main}>
      <AudioRecorder />
    </main>
  )
}
