import { PlayProvider } from "../../providers/Play/Play.provider";
import styles from './Play.module.css'
import Hangman from "../../components/Hangman";
import Keyboard from "../../components/Keyboard";
import Word from "../../components/Word";
import Timer from "../../components/Timer";
import EndgameModal from "../../components/EndgameModal";

const Play = () => {
  return (
    <PlayProvider word="ESPERMATOZOIDE">
      <main className={styles.container}>
        <EndgameModal />
        <Timer />
        <div className={styles.wordHangman}>
          <Hangman />
          <Word />
        </div>
        <Keyboard />
      </main>
    </PlayProvider>
  )
}

export default Play;