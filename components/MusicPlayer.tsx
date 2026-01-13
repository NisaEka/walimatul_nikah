import React, { useState, useEffect, useRef } from 'react';
import { Music, PauseCircle } from 'lucide-react';
import { MUSIC_URL } from '../constants';

const MusicPlayer: React.FC<{ autoPlay: boolean }> = ({ autoPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlay) {
      const playPromise = audioRef.current?.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => console.log("Autoplay blocked:", error));
      }
    }
  }, [autoPlay]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = 0.2;
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <audio ref={audioRef} src={MUSIC_URL} loop />
      <button
        onClick={toggleMusic}
        className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
          isPlaying ? 'bg-gold text-white animate-spin-slow' : 'bg-white text-stone-600'
        }`}
        aria-label="Toggle Music"
      >
        {isPlaying ? <Music size={24} /> : <PauseCircle size={24} />}
      </button>
      <style>{`
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;