import { BrowserRouter, Route, Routes } from "react-router-dom";
import Play from "./pages/Play";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/play/:date" element={<Play />} />
        <Route path="/daily" element={<Play />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;