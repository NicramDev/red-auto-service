import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Droplet, Car, Pencil, Trash2 } from 'lucide-react';
import { Vehicle } from '@/lib/types';
import { cn } from '@/lib/utils';
import { deleteVehicle, getTagById } from '@/lib/data';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import TagBadge from '@/components/tags/TagBadge';
import { useState } from 'react';

interface VehicleCardProps {
  vehicle: Vehicle;
  index: number;
  onDeleted?: () => void;
}

const VehicleCard = ({ vehicle, index, onDeleted }: VehicleCardProps) => {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Format date to display in a nice format
  const formattedDate = vehicle.lastService 
    ? new Date(vehicle.lastService).toLocaleDateString('pl-PL', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : 'Brak serwisu';

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/vehicles/edit/${vehicle.id}`);
  };

  const handleDelete = () => {
    deleteVehicle(vehicle.id);
    toast.success(`Pojazd ${vehicle.brand} ${vehicle.customName} został usunięty`);
    setDeleteDialogOpen(false);
    if (onDeleted) onDeleted();
  };

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

  // Check insurance and inspection dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const insuranceEndDate = vehicle.insuranceEndDate ? new Date(vehicle.insuranceEndDate) : null;
  const inspectionEndDate = vehicle.inspectionEndDate ? new Date(vehicle.inspectionEndDate) : null;
  
  const insuranceDaysLeft = insuranceEndDate 
    ? Math.ceil((insuranceEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    : null;
    
  const inspectionDaysLeft = inspectionEndDate
    ? Math.ceil((inspectionEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    : null;
    
  const hasWarnings = (insuranceDaysLeft !== null && insuranceDaysLeft <= 14) || 
                      (inspectionDaysLeft !== null && inspectionDaysLeft <= 14);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className={cn(
          "group overflow-hidden rounded-xl glass-light border border-gray-200/50 hover:shadow-md transition-all-300 relative",
          hasWarnings && "border-amber-200"
        )}
      >
        <Link to={`/vehicles/${vehicle.id}`} className="block">
          <div className="relative h-48 overflow-hidden">
            {vehicle.image ? (
              <img 
                src={vehicle.image} 
                alt={`${vehicle.brand} ${vehicle.customName}`} 
                className="w-full h-full object-cover transition-transform-300 group-hover:scale-105"
                onError={(e) => {
                  const imgElem = e.target as HTMLImageElement;
                  const currentSrc = imgElem.src;
                  
                  if (currentSrc.includes('imgur.com') && !currentSrc.match(/\.(jpeg|jpg|gif|png)$/i)) {
                    imgElem.src = currentSrc + '.jpg';
                  } else {
                    imgElem.src = 'https://via.placeholder.com/400x300?text=No+Image+Available';
                  }
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <Car className="h-12 w-12 text-gray-400" />
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <h3 className="text-white font-bold text-xl">
                {vehicle.brand} {vehicle.customName}
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
              {vehicle.driverName && (
                <div className="text-sm text-gray-600">
                  Kierowca: {vehicle.driverName}
                </div>
              )}
            </div>
            
            {vehicle.tags && vehicle.tags.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-1.5">
                {vehicle.tags.map(tagId => {
                  const tag = getTagById(tagId);
                  if (!tag) return null;
                  return <TagBadge key={tagId} tag={tag} />;
                })}
              </div>
            )}
            
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Ostatni serwis: {formattedDate}</span>
            </div>

            {hasWarnings && (
              <div className="mt-3 pt-3 border-t border-amber-100">
                {insuranceDaysLeft !== null && insuranceDaysLeft <= 14 && (
                  <div className="text-amber-600 text-sm flex items-center gap-1.5">
                    <span className="inline-block h-2 w-2 rounded-full bg-amber-500"></span>
                    {insuranceDaysLeft <= 0 
                      ? <span>Ubezpieczenie wygasło!</span>
                      : <span>Ubezpieczenie wygaśnie za {insuranceDaysLeft} dni</span>
                    }
                  </div>
                )}
                {inspectionDaysLeft !== null && inspectionDaysLeft <= 14 && (
                  <div className="text-amber-600 text-sm flex items-center gap-1.5 mt-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-amber-500"></span>
                    {inspectionDaysLeft <= 0 
                      ? <span>Przegląd wygasł!</span>
                      : <span>Przegląd wygaśnie za {inspectionDaysLeft} dni</span>
                    }
                  </div>
                )}
              </div>
            )}
          </div>
        </Link>
        
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <Button 
            size="icon" 
            variant="secondary" 
            className="h-8 w-8 bg-white/90 hover:bg-white"
            onClick={handleEdit}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="destructive" 
            className="h-8 w-8 bg-white/90 hover:bg-red-500 hover:text-white"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDeleteDialogOpen(true);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Potwierdzenie usunięcia</AlertDialogTitle>
            <AlertDialogDescription>
              Czy na pewno chcesz usunąć pojazd {vehicle.brand} {vehicle.customName}? 
              Ta operacja jest nieodwracalna.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Usuń
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default VehicleCard;
