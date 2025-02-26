import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { PlayContextValues, PressedKeys } from './Play.provider.types';
import normalize from '../../utils/normalize';


const getCurrentDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const currentDate = getCurrentDate();
const savedData = JSON.parse(localStorage.getItem(`game-${currentDate}`) || '{}')

const PlayContext = createContext<PlayContextValues>({
  pressedKeys: savedData?.pressedKeys || [],
  pushKey: () => { },
  word: '',
  errors: savedData?.errors || 0,
  guessedWord: savedData?.guessedWord || false,
  lostGame: savedData?.guessedWord || false,
});

export const PlayProvider = ({
  word,
  children
}: PropsWithChildren<{ word: string }>) => {
  const [pressedKeys, setPressedKeys] = useState<PressedKeys>(savedData?.pressedKeys || [])
  const [errors, setErrors] = useState<number>(savedData?.errors || 0)
  const [guessedWord, setGuessedWord] = useState<boolean>(savedData?.guessedWord || false)
  const [lostGame, setLostGame] = useState<boolean>(savedData?.guessedWord || false)

  const saveToLocalStorage = () => {
    const gameData = {
      pressedKeys,
      guessedWord,
      lostGame
    };
    localStorage.setItem(`game-${currentDate}`, JSON.stringify(gameData));
  };

  const pushKey = (newKey: CharKey) => {
    if (pressedKeys.some(pressedKey => pressedKey.char === newKey)) return
    let correct = normalize(word).includes(newKey)
    setPressedKeys(prevPressedKeys => [...prevPressedKeys, { char: newKey, correct }])
  }

  // Validate Victory
  useEffect(() => {
    const lettersToGuess = new Set(normalize(word).split('-').join('')).size;
    const guessedLetters = pressedKeys.filter(k => k.correct && k.char !== '-').length
    if (lettersToGuess === guessedLetters) setGuessedWord(true)
    saveToLocalStorage();
  }, [pressedKeys]);

  // Validate Lost
  useEffect(() => {
    if (pressedKeys.filter(pressedKey => !pressedKey.correct).length > 5)
      setLostGame(true)
    saveToLocalStorage();
  }, [pressedKeys])

  // Track errors
  useEffect(() => {
    const errorsQuantity = pressedKeys.filter(k => !k.correct).length
    setErrors(errorsQuantity)
  }, [pressedKeys])

  // Handles hyphen
  useEffect(() => {
    if (normalize(word).includes('-') && !pressedKeys.some(k => k.char === '-'))
      pushKey('-')
  }, [word])

  return (
    <PlayContext.Provider value={{
      pressedKeys,
      pushKey,
      word,
      errors,
      guessedWord,
      lostGame,
    }}>
      {children}
    </PlayContext.Provider>
  );
};

export default PlayContext;
