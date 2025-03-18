
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Truck, Calendar, Settings, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/layout/Navbar';
import { vehicles, serviceRecords } from '@/lib/data';
import { Vehicle, ServiceRecord } from '@/lib/types';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [upcomingServices, setUpcomingServices] = useState<ServiceRecord[]>([]);
  
  useEffect(() => {
    // Filter vehicles based on search query
    const filtered = vehicles.filter(vehicle => 
      vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.customName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredVehicles(filtered);
    
    // Get upcoming services
    const today = new Date();
    const upcoming = serviceRecords.filter(service => 
      new Date(service.date) >= today && 
      service.status !== 'completed'
    ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    setUpcomingServices(upcoming.slice(0, 3));
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Zarządzanie flotą pojazdów
          </h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            Kompleksowe narzędzie do zarządzania flotą, serwisami i dokumentacją pojazdów
          </p>
        </div>
        
        <div className="max-w-lg mx-auto mb-16">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              type="text"
              placeholder="Szukaj pojazdu po marce, nazwie własnej lub nr. rejestracyjnym..."
              className="pl-10 py-6 bg-gray-800 border-gray-700 text-white rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Link to="/vehicles">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-xl text-center cursor-pointer shadow-xl"
            >
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold mb-2">Pojazdy</h2>
              <p className="text-blue-100">Zarządzaj flotą pojazdów, przeglądaj szczegóły i dodawaj nowe</p>
            </motion.div>
          </Link>
          
          <Link to="/services">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-8 rounded-xl text-center cursor-pointer shadow-xl"
            >
              <div className="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold mb-2">Serwisy</h2>
              <p className="text-emerald-100">Planuj i śledź serwisy, naprawy i przeglądy pojazdów</p>
            </motion.div>
          </Link>
          
          <Link to="/settings">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-purple-600 to-purple-700 p-8 rounded-xl text-center cursor-pointer shadow-xl"
            >
              <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold mb-2">Ustawienia</h2>
              <p className="text-purple-100">Dostosuj aplikację i zarządzaj preferencjami</p>
            </motion.div>
          </Link>
        </div>
        
        {searchQuery && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Wyniki wyszukiwania</h2>
            
            {filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.map(vehicle => (
                  <Link to={`/vehicles/${vehicle.id}`} key={vehicle.id}>
                    <motion.div 
                      whileHover={{ y: -3 }}
                      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700"
                    >
                      <div className="h-48 overflow-hidden">
                        {vehicle.image ? (
                          <img 
                            src={vehicle.image} 
                            alt={`${vehicle.brand} ${vehicle.customName}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                            <Car className="w-12 h-12 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold mb-1">{vehicle.brand} {vehicle.customName}</h3>
                        <p className="text-gray-400 text-sm">{vehicle.licensePlate}</p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-800 rounded-lg">
                <p>Nie znaleziono pojazdów pasujących do zapytania</p>
              </div>
            )}
          </div>
        )}
        
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Nadchodzące serwisy</h2>
            <Button asChild variant="outline" className="text-white border-gray-600">
              <Link to="/services" className="flex items-center gap-1.5">
                Zobacz wszystkie
              </Link>
            </Button>
          </div>
          
          {upcomingServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingServices.map(service => {
                const vehicle = vehicles.find(v => v.id === service.vehicleId);
                
                if (!vehicle) return null;
                
                return (
                  <Link to={`/services/${service.id}`} key={service.id}>
                    <motion.div 
                      whileHover={{ y: -3 }}
                      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                          {vehicle.image ? (
                            <img 
                              src={vehicle.image}
                              alt={`${vehicle.brand} ${vehicle.customName}`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Car className="w-6 h-6 text-gray-500" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">{vehicle.brand} {vehicle.customName}</h3>
                          <p className="text-gray-400 text-sm mb-1">{service.date} {service.time && `o ${service.time}`}</p>
                          <p className="text-sm">{service.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
              
              <Link to="/services/new">
                <motion.div 
                  whileHover={{ y: -3 }}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 p-4 h-full flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center">
                      <Plus className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-gray-400">Dodaj nowy serwis</p>
                  </div>
                </motion.div>
              </Link>
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-800 rounded-lg">
              <p>Brak nadchodzących serwisów</p>
              <Button asChild className="mt-4">
                <Link to="/services/new" className="flex items-center gap-1.5">
                  <Plus className="h-4 w-4" />
                  Dodaj serwis
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
