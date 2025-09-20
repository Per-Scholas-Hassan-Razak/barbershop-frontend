import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import BarberDashboard from "./pages/BarberDashboard";
import { useAuth } from "./contexts/authContext";
import HaircutTemplates from "./components/HaircutTemplates";

function App() {
  const { user } = useAuth();
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>landing!</h1>} />
        {user?.role === "barber" && (
          <Route path="/barber/dashboard" element={<BarberDashboard />} />
        )}
        {user?.role === "barber" && (
          <Route
            path="/barber/dashboard/haircuts/templates"
            element={<HaircutTemplates />}
          />
        )}
        {user?.role === "barber" && (
          <Route
            path="/barber/dashboard/haircuts/custom"
            element={<h1>custom barber cuts</h1>}
          />
        )}
        <Route path="*" element={<h1>404 Not found!</h1>} />
      </Routes>
    </>
  );
}

export default App;
