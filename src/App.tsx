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
import QueueProvider from "./providers/QueueProvider";
import Landing from "./pages/Landing";
import NotFound from "./pages/404NotFound";
import { SnackbarProvider } from "./providers/SnackbarProvider";

function App() {
  const { user } = useAuth();
  return (
    <>
      <SnackbarProvider>
        <QueueProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Landing />} />
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
              </Route>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </QueueProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;
