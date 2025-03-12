
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/layout/Navbar';
import PageHeader from '@/components/layout/PageHeader';
import VehicleCard from '@/components/vehicles/VehicleCard';
import { vehicles } from '@/lib/data';

const Vehicles = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter vehicles based on search query
  const filteredVehicles = vehicles.filter(vehicle => {
    const searchString = `${vehicle.brand} ${vehicle.model} ${vehicle.licensePlate}`.toLowerCase();
    return searchString.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <PageHeader
          title="Pojazdy"
          description="Zarządzaj swoimi pojazdami"
        >
          <Button asChild className="brand-gradient">
            <Link to="/vehicles/new" className="flex items-center gap-1.5">
              <Plus className="h-4 w-4" />
              Dodaj pojazd
            </Link>
          </Button>
        </PageHeader>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Szukaj pojazdów..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 mb-4">Nie znaleziono pojazdów</p>
            {searchQuery ? (
              <Button 
                onClick={() => setSearchQuery('')}
                variant="outline"
              >
                Wyczyść wyszukiwanie
              </Button>
            ) : (
              <Button asChild className="brand-gradient">
                <Link to="/vehicles/new">
                  Dodaj pierwszy pojazd
                </Link>
              </Button>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Vehicles;
