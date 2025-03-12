
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import PageHeader from '@/components/layout/PageHeader';
import VehicleForm from '@/components/vehicles/VehicleForm';
import { Vehicle } from '@/lib/types';
import { getVehicleById, updateVehicle } from '@/lib/data';

const EditVehicle = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const vehicle = id ? getVehicleById(id) : undefined;
  
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

  const handleSubmit = async (data: Vehicle) => {
    try {
      updateVehicle({
        ...vehicle,
        ...data,
      });
      
      toast({
        title: "Sukces!",
        description: "Pojazd został zaktualizowany pomyślnie.",
      });
      navigate(`/vehicles/${id}`);
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Wystąpił błąd podczas aktualizacji pojazdu.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <PageHeader
          title={`Edytuj: ${vehicle.brand} ${vehicle.model}`}
          description="Aktualizacja informacji o pojeździe"
        />
        <div className="max-w-2xl mx-auto">
          <VehicleForm 
            initialVehicle={vehicle} 
            isEdit={true} 
            onSubmit={handleSubmit} 
          />
        </div>
      </main>
    </div>
  );
};

export default EditVehicle;
