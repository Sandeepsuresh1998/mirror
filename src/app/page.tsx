"use client";
import { useState } from 'react'

import AudioRecorder from './components/AudioRecorder';

export default function Home() {

  const isRecording = useState(false)
  return (
    <main>
      <AudioRecorder />
    </main>
  )
}
