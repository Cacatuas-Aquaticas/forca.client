import Keyboard from "../../components/Keyboard";
import { PlayProvider } from "../../providers/Play/Play.provider";

const Play = () => {
  return (
    <PlayProvider word="GRANOLA">
      <Keyboard />
    </PlayProvider>
  )
}

export default Play;