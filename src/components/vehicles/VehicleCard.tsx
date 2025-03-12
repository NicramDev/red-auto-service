
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Droplet, Car } from 'lucide-react';
import { Vehicle } from '@/lib/types';
import { cn } from '@/lib/utils';

interface VehicleCardProps {
  vehicle: Vehicle;
  index: number;
}

const VehicleCard = ({ vehicle, index }: VehicleCardProps) => {
  // Format date to display in a nice format
  const formattedDate = vehicle.lastService 
    ? new Date(vehicle.lastService).toLocaleDateString('pl-PL', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : 'Brak serwisu';

  const fuelTypeIcons: Record<string, JSX.Element> = {
    'petrol': <Droplet className="h-4 w-4 text-red-500" />,
    'diesel': <Droplet className="h-4 w-4 text-gray-800" />,
    'electric': <Droplet className="h-4 w-4 text-green-500" />,
    'hybrid': <Droplet className="h-4 w-4 text-blue-500" />,
    'lpg': <Droplet className="h-4 w-4 text-amber-500" />,
    'other': <Droplet className="h-4 w-4 text-gray-500" />,
  };

  const fuelTypeLabels: Record<string, string> = {
    'petrol': 'Benzyna',
    'diesel': 'Diesel',
    'electric': 'Elektryczny',
    'hybrid': 'Hybryda',
    'lpg': 'LPG',
    'other': 'Inny',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group overflow-hidden rounded-xl glass-light border border-gray-200/50 hover:shadow-md transition-all-300"
    >
      <Link to={`/vehicles/${vehicle.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          {vehicle.image ? (
            <img 
              src={vehicle.image} 
              alt={`${vehicle.brand} ${vehicle.model}`} 
              className="w-full h-full object-cover transition-transform-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <Car className="h-12 w-12 text-gray-400" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h3 className="text-white font-bold text-xl">
              {vehicle.brand} {vehicle.model}
            </h3>
            <p className="text-white/90 text-sm">{vehicle.year} • {vehicle.licensePlate}</p>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              {fuelTypeIcons[vehicle.fuelType]}
              <span className="text-sm text-gray-600">{fuelTypeLabels[vehicle.fuelType]}</span>
            </div>
            <div className="text-sm text-gray-600">
              {new Intl.NumberFormat('pl-PL').format(vehicle.mileage)} km
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>Ostatni serwis: {formattedDate}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default VehicleCard;
