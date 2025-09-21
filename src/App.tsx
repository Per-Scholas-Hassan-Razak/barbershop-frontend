import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import BarberDashboard from "./pages/BarberDashboard";
import { useAuth } from "./contexts/authContext";
import HaircutTemplates from "./components/HaircutTemplates";
import CustomCuts from "./components/CustomCuts";
import BarberHome from "./components/BarberHome";
import CustomerHome from "./components/CustomerHome";
import BarberQueues from "./components/BarberQueues";
import CustomerDashboard from "./pages/CustomerDashboard";
import BarberQueue from "./components/BarberQueue";

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

        {user?.role === "customer" && (
          <Route path="/customer/dashboard" element={<CustomerDashboard />}>
            <Route index element={<CustomerHome />} />
            <Route path="allqueues" element={<BarberQueues />} />
            <Route path="barberqueue/:barberId" element={<BarberQueue />} />
            {/* <Route path="my-active" element={<MyActiveQueue />} /> */}
          </Route>
        )}
        <Route path="*" element={<h1>404 Not found!</h1>} />
      </Routes>
    </>
  );
}

export default App;
