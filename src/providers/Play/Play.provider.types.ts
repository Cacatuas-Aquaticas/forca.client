export type PlayContextValues = {
  pressedKeys: PressedKeys
  pushKey: (newKey: CharKey) => void
  word: string
}

export type PressedKeys = Array<{
  char: CharKey,
  correct: boolean
}>