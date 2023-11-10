import React, { useState, useEffect, useRef } from 'react';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [chunks, setChunks] = useState<Blob[]>([]);


  const callWhisperTranscription = async (blob: Blob) => {
    fetch(
      '/api/transcribe', 
      {
           method: 'POST', 
           body: blob,
           headers: {
              'Content-Type': 'audio/wav'
           }
    }).then(resp => {
      console.log(resp)
    });
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
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {audioUrl && <audio src={audioUrl} controls />}
    </div>
  );
};

export default AudioRecorder;