import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { PlayContextValues, PressedKeys } from './Play.provider.types';
import normalize from '../../utils/normalize';

const PlayContext = createContext<PlayContextValues>({
  pressedKeys: [],
  pushKey: () => { },
  word: '',
  errors: 0,
  guessedWord: false,
  lostGame: false,
});

export const PlayProvider = ({
  word,
  children
}: PropsWithChildren<{ word: string }>) => {

  const [pressedKeys, setPressedKeys] = useState<PressedKeys>([])
  const [errors, setErrors] = useState<number>(0)
  const [guessedWord, setGuessedWord] = useState<boolean>(false)
  const [lostGame, setLostGame] = useState<boolean>(false)

  const pushKey = (newKey: CharKey) => {
    if (pressedKeys.some(pressedKey => pressedKey.char === newKey)) return

    let correct = normalize(word).includes(newKey)
    if (!correct) setErrors(prevErrors => prevErrors + 1)

    setPressedKeys(prevPressedKeys => [...prevPressedKeys, { char: newKey, correct }])
  }

  // Validate Victory
  useEffect(() => {
    const lettersToGuess = new Set(normalize(word)).size;
    const guessedLetters = pressedKeys.filter(k => k.correct).length
    if (lettersToGuess === guessedLetters) setGuessedWord(true)
  }, [pressedKeys]);

  // Validate Lost
  useEffect(() => {
    if (pressedKeys.filter(pressedKey => !pressedKey.correct).length > 5)
      setLostGame(true)
  }, [pressedKeys])

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
