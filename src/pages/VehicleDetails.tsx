import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import PageHeader from '@/components/layout/PageHeader';
import { getVehicleById, getServicesByVehicleId, getTagById, deleteVehicle, deleteService } from '@/lib/data';
import { ServiceRecord } from '@/lib/types';
import ServiceCard from '@/components/services/ServiceCard';
import { Button } from '@/components/ui/button';
import { Download, FileText, Pencil, PaperclipIcon, Trash2 } from 'lucide-react';
import TagBadge from '@/components/tags/TagBadge';
import { useState } from 'react';
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

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  
  const vehicle = id ? getVehicleById(id) : undefined;
  const [services, setServices] = useState<ServiceRecord[]>(id ? getServicesByVehicleId(id) : []);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Pojazd nie został znaleziony</h1>
          </div>
        </main>
      </div>
    );
  }

  const handleDeleteVehicle = () => {
    if (id) {
      deleteVehicle(id);
      toast({
        title: "Pojazd usunięty",
        description: `Pojazd ${vehicle.brand} ${vehicle.customName} został usunięty.`,
      });
      navigate('/vehicles');
    }
  };

  const handleDeleteService = (serviceId: string) => {
    setServiceToDelete(serviceId);
  };
  
  const confirmDeleteService = () => {
    if (serviceToDelete) {
      deleteService(serviceToDelete);
      setServices(services.filter(s => s.id !== serviceToDelete));
      toast({
        title: "Serwis usunięty",
        description: "Serwis został usunięty pomyślnie.",
      });
      setServiceToDelete(null);
    }
  };
  
  const cancelDeleteService = () => {
    setServiceToDelete(null);
  };

  const handleViewAttachment = () => {
    if (vehicle.attachment) {
      window.open(vehicle.attachment, '_blank');
    }
  };

  const getFileIcon = () => {
    const fileName = vehicle.attachmentName?.toLowerCase() || '';
    if (fileName.endsWith('.pdf')) return <FileText className="h-4 w-4" />;
    if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) return <FileText className="h-4 w-4" />;
    if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) return <FileText className="h-4 w-4" />;
    return <PaperclipIcon className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <PageHeader
          title={`${vehicle?.brand} ${vehicle?.customName}`}
          description={`Szczegóły pojazdu i historia serwisowa`}
        >
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-1"
              onClick={() => navigate(`/vehicles/${id}/edit`)}
            >
              <Pencil className="h-4 w-4" />
              Edytuj
            </Button>
            <Button
              variant="destructive"
              className="gap-1"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
              Usuń
            </Button>
          </div>
        </PageHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="rounded-xl overflow-hidden glass-light">
              <div className="aspect-video w-full overflow-hidden">
                {vehicle.image ? (
                  <img 
                    src={vehicle.image}
                    alt={`${vehicle.brand} ${vehicle.customName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Brak zdjęcia</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                {vehicle.tags && vehicle.tags.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {vehicle.tags.map(tagId => {
                      const tag = getTagById(tagId);
                      if (!tag) return null;
                      return <TagBadge key={tagId} tag={tag} />;
                    })}
                  </div>
                )}
                
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Numer rejestracyjny</dt>
                    <dd className="mt-1 text-sm text-gray-900">{vehicle.licensePlate}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">VIN</dt>
                    <dd className="mt-1 text-sm text-gray-900">{vehicle.vin || 'Nie podano'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Rok produkcji</dt>
                    <dd className="mt-1 text-sm text-gray-900">{vehicle.year}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Rodzaj paliwa</dt>
                    <dd className="mt-1 text-sm text-gray-900">{vehicle.fuelType}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Skrzynia biegów</dt>
                    <dd className="mt-1 text-sm text-gray-900">{vehicle.transmission}</dd>
                  </div>
                  {vehicle.driverName && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Kierowca</dt>
                      <dd className="mt-1 text-sm text-gray-900">{vehicle.driverName}</dd>
                    </div>
                  )}
                  {vehicle.purchaseDate && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Data zakupu</dt>
                      <dd className="mt-1 text-sm text-gray-900">{vehicle.purchaseDate}</dd>
                    </div>
                  )}
                  {vehicle.insuranceStartDate && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Data rozpoczęcia ubezpieczenia</dt>
                      <dd className="mt-1 text-sm text-gray-900">{vehicle.insuranceStartDate}</dd>
                    </div>
                  )}
                  {vehicle.insuranceEndDate && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Data zakończenia ubezpieczenia</dt>
                      <dd className="mt-1 text-sm text-gray-900">{vehicle.insuranceEndDate}</dd>
                    </div>
                  )}
                  {vehicle.inspectionStartDate && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Data rozpoczęcia przeglądu</dt>
                      <dd className="mt-1 text-sm text-gray-900">{vehicle.inspectionStartDate}</dd>
                    </div>
                  )}
                  {vehicle.inspectionEndDate && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Data zakończenia przeglądu</dt>
                      <dd className="mt-1 text-sm text-gray-900">{vehicle.inspectionEndDate}</dd>
                    </div>
                  )}
                  {vehicle.fuelCardNumber && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Nr karty paliwowej</dt>
                      <dd className="mt-1 text-sm text-gray-900">{vehicle.fuelCardNumber}</dd>
                    </div>
                  )}
                  {vehicle.gpsSystemNumber && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Nr systemu GPS</dt>
                      <dd className="mt-1 text-sm text-gray-900">{vehicle.gpsSystemNumber}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Ostatni serwis</dt>
                    <dd className="mt-1 text-sm text-gray-900">{vehicle.lastService || 'Brak'}</dd>
                  </div>
                  
                  {vehicle.attachment && vehicle.attachmentName && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Załącznik</dt>
                      <dd className="mt-1">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-1 flex items-center gap-2 w-full justify-start"
                          onClick={handleViewAttachment}
                        >
                          {getFileIcon()}
                          <span className="truncate max-w-[200px]">{vehicle.attachmentName}</span>
                          <Download className="h-3 w-3 ml-auto" />
                        </Button>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Historia serwisowa</h2>
            <div className="space-y-4">
              {services.map((service: ServiceRecord, index: number) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  vehicle={vehicle} 
                  index={index}
                  onDelete={() => handleDeleteService(service.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Potwierdzenie usunięcia</AlertDialogTitle>
            <AlertDialogDescription>
              Czy na pewno chcesz usunąć pojazd {vehicle?.brand} {vehicle?.customName}? 
              Ta operacja jest nieodwracalna.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteVehicle} className="bg-red-500 hover:bg-red-600">
              Usuń
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <AlertDialog open={!!serviceToDelete} onOpenChange={() => setServiceToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Potwierdzenie usunięcia serwisu</AlertDialogTitle>
            <AlertDialogDescription>
              Czy na pewno chcesz usunąć ten serwis?
              Ta operacja jest nieodwracalna.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDeleteService}>Anuluj</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteService} className="bg-red-500 hover:bg-red-600">
              Usuń
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default VehicleDetails;
