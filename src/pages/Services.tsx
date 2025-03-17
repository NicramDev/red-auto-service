
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import PageHeader from '@/components/layout/PageHeader';
import Navbar from '@/components/layout/Navbar';
import { serviceRecords, vehicles, deleteService } from '@/lib/data';
import ServiceCard from '@/components/services/ServiceCard';
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

const Services = () => {
  const [services, setServices] = useState([...serviceRecords]);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const servicesWithVehicles = services.map((service, index) => {
    const vehicle = vehicles.find(v => v.id === service.vehicleId);
    return { ...service, vehicle, index };
  });
  
  const handleDelete = (serviceId: string) => {
    setServiceToDelete(serviceId);
  };
  
  const confirmDelete = () => {
    if (serviceToDelete) {
      deleteService(serviceToDelete);
      setServices(services.filter(s => s.id !== serviceToDelete));
      
      toast({
        title: "Sukces!",
        description: "Serwis został usunięty pomyślnie.",
      });
      
      setServiceToDelete(null);
    }
  };
  
  const cancelDelete = () => {
    setServiceToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <PageHeader
          title="Serwisy"
          description="Zarządzaj serwisami pojazdów"
        >
          <Button asChild className="brand-gradient">
            <Link to="/services/new" className="flex items-center gap-1.5">
              <Plus className="h-4 w-4" />
              Dodaj serwis
            </Link>
          </Button>
        </PageHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesWithVehicles.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              vehicle={service.vehicle} 
              index={service.index}
              onDelete={() => handleDelete(service.id)}
            />
          ))}
        </div>
        
        <AlertDialog open={!!serviceToDelete} onOpenChange={() => setServiceToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Czy na pewno chcesz usunąć ten serwis?</AlertDialogTitle>
              <AlertDialogDescription>
                Ta akcja jest nieodwracalna i spowoduje trwałe usunięcie danych o serwisie.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancelDelete}>Anuluj</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                Usuń
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
};

export default Services;
