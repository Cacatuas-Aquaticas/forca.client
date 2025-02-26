import { useEffect } from 'react';
import KEYS from '../../constants/keys';
import usePlayContext from '../../hooks/usePlayContext';
import normalize from '../../utils/normalize';
import styles from './Keyboard.module.css';

const rows = [10, 19, 26];

const Keyboard = () => {
  const { pushKey, pressedKeys } = usePlayContext();

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = normalize(event.key);
    if (key >= "A" && key <= "Z")
      pushKey(key as CharKey);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <section className={styles.keyboard}>
      {rows.map((end, i) => (
        <div key={i} className={styles.row}>
          {KEYS.slice(rows[i - 1] || 0, end).map(key => (
            <button
              key={key}
              className={`${styles.key} ${pressedKeys.some(pressedKey => pressedKey.char === key && pressedKey.correct) ? styles.correct : ''}`}
              onClick={() => pushKey(normalize(key) as CharKey)}
              disabled={pressedKeys.some(pressedKey => pressedKey.char === key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </section>
  )
}

export default Keyboard;