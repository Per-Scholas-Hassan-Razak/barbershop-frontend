import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>landing!</h1>} />
        <Route path="*" element={<h1>404 Not found!</h1>} />
      </Routes>
    </>
  );
}

export default App;
