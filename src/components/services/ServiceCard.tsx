
import { Link } from 'react-router-dom';
import { MoreHorizontal, Pencil, Trash2, Car, Calendar } from 'lucide-react';
import { ServiceRecord } from '@/lib/types';
import { Vehicle } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  service: ServiceRecord & { index?: number };
  vehicle?: Vehicle;
  index?: number;
  onDelete: () => void;
}

const ServiceCard = ({ service, vehicle, index, onDelete }: ServiceCardProps) => {
  // Format date to a nicer display
  const formattedDate = new Date(service.date).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  // Status labels in Polish
  const statusLabels: Record<string, string> = {
    'scheduled': 'Zaplanowany',
    'in-progress': 'W trakcie',
    'completed': 'Zakończony',
    'cancelled': 'Anulowany'
  };
  
  // Service type labels in Polish
  const serviceTypeLabels: Record<string, string> = {
    'maintenance': 'Przegląd',
    'repair': 'Naprawa',
    'inspection': 'Inspekcja',
    'other': 'Inne'
  };
  
  // Status colors
  const statusColors: Record<string, string> = {
    'scheduled': 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow glass-light">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">{service.description}</h3>
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusColors[service.status]}`}>
              {statusLabels[service.status]}
            </span>
            <span className="ml-2 text-sm text-gray-500">{serviceTypeLabels[service.serviceType]}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/services/${service.id}`} className="cursor-pointer w-full flex items-center">
                  <span>Szczegóły</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/services/${service.id}/edit`} className="cursor-pointer w-full flex items-center">
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Edytuj</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600 cursor-pointer focus:text-red-700"
                onClick={onDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Usuń</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span>{formattedDate}{service.time ? `, ${service.time}` : ''}</span>
          </div>
          
          {vehicle && (
            <div className="flex items-center text-sm text-gray-600">
              <Car className="h-4 w-4 mr-2 text-gray-400" />
              <span>{vehicle.brand} {vehicle.customName}</span>
            </div>
          )}
          
          {service.cost && (
            <div className="mt-4 text-right">
              <span className="text-lg font-semibold">{service.cost} PLN</span>
            </div>
          )}
        </div>
      </div>
      
      <Link 
        to={`/services/${service.id}`} 
        className="block p-3 text-center text-sm bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        Zobacz szczegóły
      </Link>
    </div>
  );
};

export default ServiceCard;
