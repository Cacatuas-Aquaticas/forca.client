export type PlayContextValues = {
  pressedKeys: PressedKeys
  pushKey: (newKey: CharKey) => void
}

export type PressedKeys = Array<{
  char: CharKey,
  correct: boolean
}>