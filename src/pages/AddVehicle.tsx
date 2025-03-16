
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import PageHeader from '@/components/layout/PageHeader';
import VehicleForm from '@/components/vehicles/VehicleForm';
import { Vehicle } from '@/lib/types';
import { addVehicleWithStorage } from '@/lib/data';

const AddVehicle = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: Vehicle) => {
    try {
      // If we have a file, in a real application we would upload it to a server here
      // and get back a URL to store in the database
      
      // For demonstration purposes, we'll just keep the local object URL
      // In a real app, you would upload the file to a server and use the returned URL
      
      const newVehicle = addVehicleWithStorage(data);
      console.log('New vehicle data:', newVehicle);
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
