import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Wrench, Clock, DollarSign } from 'lucide-react';
import { ServiceRecord, Vehicle } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  service: ServiceRecord;
  vehicle?: Vehicle;
  index: number;
}

const ServiceCard = ({ service, vehicle, index }: ServiceCardProps) => {
  if (!vehicle) return null;
  
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

  const statusLabels: Record<string, string> = {
    'scheduled': 'Zaplanowany',
    'in-progress': 'W trakcie',
    'completed': 'Ukończony',
    'cancelled': 'Anulowany'
  };

  const statusColors: Record<string, string> = {
    'scheduled': 'bg-blue-100 text-blue-800 border-blue-200',
    'in-progress': 'bg-amber-100 text-amber-800 border-amber-200',
    'completed': 'bg-green-100 text-green-800 border-green-200',
    'cancelled': 'bg-red-100 text-red-800 border-red-200'
  };

  const isUpcoming = service.status === 'scheduled' && new Date(service.date) > new Date();
  const isPast = service.status === 'scheduled' && new Date(service.date) < new Date();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        "overflow-hidden rounded-xl glass-light border hover:shadow-md transition-all-300",
        isPast ? "border-amber-200" : "border-gray-200/50"
      )}
    >
      <Link to={`/services/${service.id}`} className="block">
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
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
                        imgElem.src = 'https://via.placeholder.com/400x300?text=No+Image';
                      }
                    }}
                  />
                ) : (
                  vehicle.brand.charAt(0)
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{vehicle.brand} {vehicle.customName}</h3>
                <p className="text-sm text-gray-500">{vehicle.licensePlate}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className={cn(
                "text-xs px-2 py-1 rounded-full",
                serviceTypeColors[service.serviceType]
              )}>
                {serviceTypeLabels[service.serviceType]}
              </span>
              <span className={cn(
                "text-xs px-2 py-1 rounded-full border",
                statusColors[service.status]
              )}>
                {statusLabels[service.status]}
              </span>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="font-medium mb-1">{service.description}</h3>
            {service.notes && (
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{service.notes}</p>
            )}
            
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{formattedDate}{service.time ? ` ${service.time}` : ''}</span>
              </div>
              {service.cost && (
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span>{service.cost} PLN</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Wrench className="h-4 w-4 text-gray-400" />
                <span>{service.parts?.length || 0} części</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;

