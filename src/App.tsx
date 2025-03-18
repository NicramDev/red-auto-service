
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import PageTransition from './components/ui/PageTransition';
import { Toaster } from './components/ui/toaster';
import { useToast } from './hooks/use-toast';

// Pages
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import VehicleDetails from './pages/VehicleDetails';
import AddVehicle from './pages/AddVehicle';
import EditVehicle from './pages/EditVehicle';
import Services from './pages/Services';
import AddService from './pages/AddService';
import EditService from './pages/EditService';
import ServiceDetails from './pages/ServiceDetails';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import Tags from './pages/Tags';
import Index from './pages/Index';

import './App.css';

function App() {
  const { toast } = useToast();
  
  // Check if mobile app is installed
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    
    const hasSeenInstallPrompt = localStorage.getItem('hasSeenInstallPrompt');
    
    if ((isIOS || isAndroid) && !isStandalone && !hasSeenInstallPrompt) {
      toast({
        title: "Zainstaluj aplikację",
        description: "Możesz zainstalować tę aplikację na swoim urządzeniu mobilnym. Dodaj ją do ekranu głównego.",
        duration: 8000,
      });
      localStorage.setItem('hasSeenInstallPrompt', 'true');
    }
  }, [toast]);
  
  return (
    <Router>
      <PageTransition>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/index" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Vehicle Routes */}
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/new" element={<AddVehicle />} />
          <Route path="/vehicles/:id" element={<VehicleDetails />} />
          <Route path="/vehicles/:id/edit" element={<EditVehicle />} />
          
          {/* Service Routes */}
          <Route path="/services" element={<Services />} />
          <Route path="/services/new" element={<AddService />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/services/:id/edit" element={<EditService />} />
          
          {/* Tags Route */}
          <Route path="/tags" element={<Tags />} />
          
          {/* Settings */}
          <Route path="/settings" element={<Settings />} />
          
          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
      <Toaster />
    </Router>
  );
}

export default App;
