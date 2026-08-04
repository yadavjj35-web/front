import { useEffect, useRef, useState } from 'react';

export default function useAudioRecorder() {
  const [recording, setRecording] = useState(false);
  const mediaRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    return () => {
      if (mediaRef.current) mediaRef.current.stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  async function start() {
    if (!navigator.mediaDevices) throw new Error('Media devices not available');
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    mediaRef.current = recorder;
    chunksRef.current = [];
    recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    recorder.start();
    setRecording(true);
  }

  function stop() {
    return new Promise((resolve) => {
      const recorder = mediaRef.current;
      if (!recorder) return resolve(null);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setRecording(false);
        resolve(blob);
      };
      recorder.stop();
    });
  }

  function cancel() {
    if (mediaRef.current) {
      mediaRef.current.stream.getTracks().forEach((t) => t.stop());
      mediaRef.current = null;
      setRecording(false);
    }
  }

  return { recording, start, stop, cancel };
}
