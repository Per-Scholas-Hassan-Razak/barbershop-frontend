import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import BarberDashboard from "./pages/BarberDashboard";
import { useAuth } from "./contexts/authContext";
import HaircutTemplates from "./components/HaircutTemplates";
import CustomCuts from "./components/CustomCuts";
import BarberHome from "./components/BarberHome";

function App() {
  const { user } = useAuth();
  return (
    <>
      <NavBar />
      <Routes>
        
        <Route path="/" element={<h1>landing!</h1>} />
        {user?.role === "barber" && (
          <Route path="/barber/dashboard" element={<BarberDashboard />}>
            {/* nested inside BarberDashboard */}
            <Route index element={<BarberHome />} />
            <Route path="templates" element={<HaircutTemplates />} />
            <Route path="custom-cuts" element={<CustomCuts />} />
          </Route>
        )}
        <Route path="*" element={<h1>404 Not found!</h1>} />
      </Routes>
    </>
  );
}

export default App;
