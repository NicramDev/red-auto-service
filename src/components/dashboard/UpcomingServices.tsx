
import { Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ServiceRecord, Vehicle } from '@/lib/types';
import { cn } from '@/lib/utils';

interface UpcomingServicesProps {
  services: ServiceRecord[];
  vehicles: Vehicle[];
}

const UpcomingServices = ({ services, vehicles }: UpcomingServicesProps) => {
  // Get vehicle details for each service
  const servicesWithVehicles = services.map(service => {
    const vehicle = vehicles.find(v => v.id === service.vehicleId);
    return { ...service, vehicle };
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-xl overflow-hidden glass-light border border-gray-200/50"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-red-600" />
          <h2 className="font-semibold">Nadchodzące serwisy</h2>
        </div>
        <Link to="/services" className="text-sm text-red-600 hover:text-red-700 flex items-center">
          Zobacz wszystkie <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <div className="divide-y divide-gray-100">
        {servicesWithVehicles.length > 0 ? (
          servicesWithVehicles.map((service, index) => (
            <ServiceItem 
              key={service.id} 
              service={service} 
              vehicle={service.vehicle}
              index={index}
            />
          ))
        ) : (
          <div className="py-8 text-center text-gray-500">
            <p>Brak zaplanowanych serwisów.</p>
            <Link to="/services/new" className="mt-2 text-sm text-red-600 hover:underline inline-block">
              Zaplanuj serwis
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

interface ServiceItemProps {
  service: ServiceRecord;
  vehicle?: Vehicle;
  index: number;
}

const ServiceItem = ({ service, vehicle, index }: ServiceItemProps) => {
  if (!vehicle) return null;
  
  // Format date to display in a nice format
  const formattedDate = new Date(service.date).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const serviceTypeLabels: Record<string, string> = {
    'maintenance': 'Przegląd',
    'repair': 'Naprawa',
    'inspection': 'Inspekcja',
    'other': 'Inne'
  };

  const serviceTypeColors: Record<string, string> = {
    'maintenance': 'bg-blue-100 text-blue-800',
    'repair': 'bg-amber-100 text-amber-800',
    'inspection': 'bg-green-100 text-green-800',
    'other': 'bg-gray-100 text-gray-800'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
      className="p-4 hover:bg-gray-50 transition-all-300"
    >
      <Link to={`/services/${service.id}`} className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden text-xl font-bold text-gray-400">
            {vehicle.image ? (
              <img 
                src={vehicle.image} 
                alt={`${vehicle.brand} ${vehicle.customName}`} 
                className="h-full w-full object-cover"
                onError={(e) => {
                  const imgElem = e.target as HTMLImageElement;
                  const currentSrc = imgElem.src;
                  
                  if (currentSrc.includes('imgur.com') && !currentSrc.match(/\.(jpeg|jpg|gif|png)$/i)) {
                    imgElem.src = currentSrc + '.jpg';
                  } else {
                    imgElem.src = 'https://via.placeholder.com/100x100?text=Auto';
                  }
                }}
              />
            ) : (
              vehicle.brand.charAt(0)
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{vehicle.brand} {vehicle.customName}</h3>
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <span>{formattedDate}</span>
              {service.time && (
                <>
                  <span className="inline-block h-1 w-1 rounded-full bg-gray-300"></span>
                  <span>godz. {service.time}</span>
                </>
              )}
              <span className="inline-block h-1 w-1 rounded-full bg-gray-300"></span>
              <span>{service.description}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-xs px-2 py-1 rounded-full",
            serviceTypeColors[service.serviceType]
          )}>
            {serviceTypeLabels[service.serviceType]}
          </span>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
      </Link>
    </motion.div>
  );
};

export default UpcomingServices;
