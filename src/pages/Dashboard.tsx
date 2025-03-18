
import { Link } from 'react-router-dom';
import { Car, Wrench, Plus, PieChart, TrendingUp, Users, Calendar, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/layout/Navbar';
import PageHeader from '@/components/layout/PageHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import UpcomingServices from '@/components/dashboard/UpcomingServices';
import { vehicles, getUpcomingServices, getRecentServices } from '@/lib/data';

const Dashboard = () => {
  const upcomingServices = getUpcomingServices();
  const recentServices = getRecentServices();
  
  const totalVehicles = vehicles.length;
  const scheduledServices = upcomingServices.length;
  const completedServices = recentServices.length;
  const criticalAlerts = upcomingServices.filter(
    service => new Date(service.date) < new Date()
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <PageHeader
            title="Dashboard"
            description="Przegląd twojego serwisu samochodowego"
          >
            <Button asChild className="brand-gradient">
              <Link to="/services/new" className="flex items-center gap-1.5">
                <Plus className="h-4 w-4" />
                Dodaj serwis
              </Link>
            </Button>
          </PageHeader>
        </motion.div>

        <DashboardStats
          totalVehicles={totalVehicles}
          scheduledServices={scheduledServices}
          completedServices={completedServices}
          criticalAlerts={criticalAlerts}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <UpcomingServices services={upcomingServices} vehicles={vehicles} />
          </div>
          
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="rounded-xl overflow-hidden glass-light border border-gray-200/50"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-red-600" />
                  <h2 className="font-semibold">Twoje pojazdy</h2>
                </div>
                <Link to="/vehicles" className="text-sm text-red-600 hover:text-red-700">
                  Zobacz wszystkie
                </Link>
              </div>
              
              <div className="p-4 space-y-4">
                {vehicles.slice(0, 2).map((vehicle, index) => (
                  <Link 
                    key={vehicle.id} 
                    to={`/vehicles/${vehicle.id}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all-300"
                  >
                    <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                      {vehicle.image ? (
                        <img 
                          src={vehicle.image} 
                          alt={`${vehicle.brand} ${vehicle.customName}`} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Car className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{vehicle.brand} {vehicle.customName}</h3>
                      <p className="text-sm text-gray-500">{vehicle.licensePlate}</p>
                    </div>
                  </Link>
                ))}
                
                <Link 
                  to="/vehicles/new" 
                  className="flex items-center justify-center gap-1.5 p-3 rounded-lg border border-dashed border-gray-300 text-gray-500 hover:text-red-600 hover:border-red-300 transition-all-300"
                >
                  <Plus className="h-4 w-4" />
                  <span>Dodaj pojazd</span>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="rounded-xl overflow-hidden glass-light border border-gray-200/50 mt-6"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-red-600" />
                  <h2 className="font-semibold">Ostatnie serwisy</h2>
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                {recentServices.slice(0, 3).map((service) => {
                  const vehicle = vehicles.find(v => v.id === service.vehicleId);
                  if (!vehicle) return null;
                  
                  const formattedDate = new Date(service.date).toLocaleDateString('pl-PL', {
                    day: 'numeric',
                    month: 'short'
                  });
                  
                  return (
                    <Link 
                      key={service.id} 
                      to={`/services/${service.id}`}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-all-300"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full flex items-center justify-center bg-red-100 text-red-500">
                          {vehicle.brand.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">{service.description}</h3>
                          <p className="text-xs text-gray-500">{vehicle.brand} {vehicle.customName}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{formattedDate}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
