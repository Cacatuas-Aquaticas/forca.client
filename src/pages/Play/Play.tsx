import Keyboard from "../../components/Keyboard";
import Word from "../../components/Word";
import { PlayProvider } from "../../providers/Play/Play.provider";

const Play = () => {
  return (
    <PlayProvider word="GRANOLA">
      <Word />
      <Keyboard />
    </PlayProvider>
  )
}

export default Play;