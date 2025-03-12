
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import PageHeader from '@/components/layout/PageHeader';
import ServiceForm from '@/components/services/ServiceForm';
import { ServiceRecord } from '@/lib/types';

const AddService = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: ServiceRecord) => {
    try {
      // Mock API call - in reality this would be a backend call
      console.log('New service data:', data);
      toast({
        title: "Sukces!",
        description: "Serwis został dodany pomyślnie.",
      });
      navigate('/services');
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Wystąpił błąd podczas dodawania serwisu.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <PageHeader
          title="Dodaj nowy serwis"
          description="Wprowadź informacje o nowym serwisie"
        />
        <div className="max-w-2xl mx-auto">
          <ServiceForm />
        </div>
      </main>
    </div>
  );
};

export default AddService;
