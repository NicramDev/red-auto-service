
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import PageHeader from '@/components/layout/PageHeader';
import VehicleForm from '@/components/vehicles/VehicleForm';
import { Vehicle } from '@/lib/types';

const AddVehicle = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: Vehicle) => {
    try {
      // Mock API call - in reality this would be a backend call
      console.log('New vehicle data:', data);
      toast({
        title: "Sukces!",
        description: "Pojazd został dodany pomyślnie.",
      });
      navigate('/vehicles');
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Wystąpił błąd podczas dodawania pojazdu.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <PageHeader
          title="Dodaj nowy pojazd"
          description="Wprowadź informacje o nowym pojeździe"
        />
        <div className="max-w-2xl mx-auto">
          <VehicleForm onSubmit={handleSubmit} />
        </div>
      </main>
    </div>
  );
};

export default AddVehicle;
