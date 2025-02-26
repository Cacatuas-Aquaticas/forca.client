import { useState, useEffect } from 'react';
import usePlayContext from '../../hooks/usePlayContext';


const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const { guessedWord, lostGame } = usePlayContext();

  useEffect(() => {
    if (guessedWord || lostGame) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [guessedWord, lostGame]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return <div>{formatTime(seconds)}</div>;
};

export default Timer;