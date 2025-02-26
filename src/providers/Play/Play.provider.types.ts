export type PlayContextValues = {
  pressedKeys: PressedKeys
  pushKey: (newKey: CharKey) => void
  word: string
  errors: number
  guessedWord: boolean
  lostGame: boolean
}

export type PressedKeys = Array<{
  char: CharKey,
  correct: boolean
}>