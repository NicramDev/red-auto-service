
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
    toast.success(`Pojazd ${vehicle.brand} ${vehicle.model} został usunięty`);
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

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="group overflow-hidden rounded-xl glass-light border border-gray-200/50 hover:shadow-md transition-all-300 relative"
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
              Czy na pewno chcesz usunąć pojazd {vehicle.brand} {vehicle.model}? 
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
