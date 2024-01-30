import React, { useState, useEffect, useRef } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import IconButton from '@mui/material/IconButton';
import { NextResponse } from 'next/server';

type AudioRecorderProps = {
  onTranscriptionUpdate: (transcription: string) => void;
};



const AudioRecorder = ({onTranscriptionUpdate}: AudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [chunks, setChunks] = useState<Blob[]>([]);


  const callWhisperTranscription = async (blob: Blob) => {
    const resp = await fetch(
      '/api/transcribe', 
      {
           method: 'POST', 
           body: blob,
           headers: {
              'Content-Type': 'audio/wav'
           }
    })
    const data = await resp.json();
    console.log(data);
    onTranscriptionUpdate(data.transcription);
  }

  useEffect(() => {
    // Request permissions to record audio
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const newMediaRecorder = new MediaRecorder(stream);
        setMediaRecorder(newMediaRecorder);
        
        newMediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setChunks((prev) => [...prev, event.data]);
          }
        };
      })
      .catch(error => {
        console.log("Unable to get the media stream for the device")
      });
  }, []);   


  useEffect(() => {
    if (chunks.length > 0) {
      const blob = new Blob(chunks, { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      callWhisperTranscription(blob);
    }
  }, [chunks])

  const startRecording = () => {
    if (mediaRecorder) {
      setChunks([]);
      /*
       * Important context: By not passing in any time variable into the start call
       * the media recorder will only send the data to the ondataavaiable event listener
       * after you actually click start. So in this kind of functionality, the useEffect
       * on chunks only actually gets fired once. If you wanted to have live transcription
       * you could do it by setting some kind of frequency here. 
       */
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      // Make API request here with the url
      const blob = new Blob(chunks, { type: 'audio/wav' });
    }
  };

  return (
    <div>
      <IconButton onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? <StopIcon /> : <MicIcon />}
      </IconButton>
      {audioUrl && <audio src={audioUrl} controls />}
    </div>
  );
};

export default AudioRecorder;