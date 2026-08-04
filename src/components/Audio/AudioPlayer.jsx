import React, { useRef, useState, useEffect } from 'react';

export default function AudioPlayer({ src }) {
  const audioRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    function onTime() {
      setProgress((a.currentTime / a.duration) * 100 || 0);
    }
    function onEnd() {
      setPlaying(false);
      setProgress(100);
    }
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('ended', onEnd);
    return () => {
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('ended', onEnd);
    };
  }, [src]);

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().catch(() => {});
      setPlaying(true);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button onClick={toggle} className="px-3 py-2 rounded bg-slate-100 dark:bg-slate-700">{playing ? 'Pause' : 'Play'}</button>
      <div className="w-full h-2 bg-slate-200 rounded overflow-hidden">
        <div style={{ width: `${progress}%` }} className="h-full bg-primary" />
      </div>
      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
}
