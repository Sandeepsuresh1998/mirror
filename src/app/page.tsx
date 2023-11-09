"use client";
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react'
import MicIcon from '@mui/icons-material/Mic';
import AudioRecorder from './components/AudioRecorder';

export default function Home() {

  const isRecording = useState(false)
  return (
    <main>
      <AudioRecorder />
    </main>
  )
}
