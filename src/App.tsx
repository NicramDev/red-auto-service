import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import AddVehicle from './pages/AddVehicle';
import EditVehicle from './pages/EditVehicle';
import VehicleDetails from './pages/VehicleDetails';
import Services from './pages/Services';
import AddService from './pages/AddService';
import EditService from './pages/EditService';
import ServiceDetails from './pages/ServiceDetails';
import Settings from './pages/Settings';
import { Toaster } from "@/components/ui/toaster"
import ReminderNotification from "./components/dashboard/ReminderNotification";

function App() {
  return (
    <Router>
      <Toaster />
      <ReminderNotification />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicles/new" element={<AddVehicle />} />
        <Route path="/vehicles/edit/:id" element={<EditVehicle />} />
        <Route path="/vehicles/:id" element={<VehicleDetails />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/new" element={<AddService />} />
        <Route path="/services/edit/:id" element={<EditService />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
