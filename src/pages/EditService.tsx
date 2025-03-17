
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import PageHeader from '@/components/layout/PageHeader';
import ServiceForm from '@/components/services/ServiceForm';
import { ServiceRecord } from '@/lib/types';
import { getServiceById, updateService, getVehicleById } from '@/lib/data';

const EditService = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const service = id ? getServiceById(id) : undefined;
  const vehicle = service ? getVehicleById(service.vehicleId) : undefined;
  
  if (!service || !vehicle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Serwis nie został znaleziony</h1>
          </div>
        </main>
      </div>
    );
  }

  const handleSubmit = async (data: ServiceRecord) => {
    try {
      updateService({
        ...service,
        ...data,
      });
      
      toast({
        title: "Sukces!",
        description: "Serwis został zaktualizowany pomyślnie.",
      });
      navigate(`/services/${id}`);
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Wystąpił błąd podczas aktualizacji serwisu.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <PageHeader
          title={`Edytuj serwis: ${service.description}`}
          description={`Pojazd: ${vehicle.brand} ${vehicle.customName}`}
        />
        <div className="max-w-2xl mx-auto">
          <ServiceForm 
            initialService={service} 
            isEdit={true} 
            onSubmit={handleSubmit} 
          />
        </div>
      </main>
    </div>
  );
};

export default EditService;
