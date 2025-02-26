import KEYS from '../../constants/keys';
import usePlayContext from '../../hooks/usePlayContext';
import styles from './Keyboard.module.css';

const rows = [10, 19, 26];

const Keyboard = () => {
  const { pushKey, pressedKeys } = usePlayContext();

  return (
    <section className={styles.keyboard}>
      {rows.map((end, i) => (
        <div key={i} className={styles.row}>
          {KEYS.slice(rows[i - 1] || 0, end).map(key => (
            <button
              key={key}
              className={`${styles.key} ${pressedKeys.some(pressedKey => pressedKey.char === key && pressedKey.correct) ? styles.correct : ''}`}
              onClick={() => pushKey(key)}
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