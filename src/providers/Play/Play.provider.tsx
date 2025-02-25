import { createContext, PropsWithChildren, useState } from 'react';
import { PlayContextValues, PressedKeys } from './Play.provider.types';

const PlayContext = createContext<PlayContextValues>({
  pressedKeys: [],
  pushKey: () => { }
});

export const PlayProvider = ({
  word,
  children
}: PropsWithChildren<{ word: string }>) => {

  const [pressedKeys, setPressedKeys] = useState<PressedKeys>([])

  const pushKey = (newKey: CharKey) => {
    setPressedKeys(prevPressedKeys => {
      if (prevPressedKeys.some(key => key.char === newKey)) return prevPressedKeys
      let correct = true
      if (!word.includes(newKey)) correct = false
      return [...prevPressedKeys, { char: newKey, correct }]
    })
  }

  return (
    <PlayContext.Provider value={{
      pressedKeys,
      pushKey,
    }}>
      {children}
    </PlayContext.Provider>
  );
};

export default PlayContext;
