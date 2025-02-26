import { createContext, PropsWithChildren, useState } from 'react';
import { PlayContextValues, PressedKeys } from './Play.provider.types';
import normalize from '../../utils/normalize';

const PlayContext = createContext<PlayContextValues>({
  pressedKeys: [],
  pushKey: () => { },
  word: ''
});

export const PlayProvider = ({
  word,
  children
}: PropsWithChildren<{ word: string }>) => {

  const [pressedKeys, setPressedKeys] = useState<PressedKeys>([])

  const pushKey = (newKey: CharKey) => {
    setPressedKeys(prevPressedKeys => {
      if (prevPressedKeys.some(key => key.char === newKey)) return prevPressedKeys
      let correct = normalize(word).includes(newKey)
      return [...prevPressedKeys, { char: newKey, correct }]
    })
  }

  return (
    <PlayContext.Provider value={{
      pressedKeys,
      pushKey,
      word,
    }}>
      {children}
    </PlayContext.Provider>
  );
};

export default PlayContext;
