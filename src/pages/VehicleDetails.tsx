
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import PageHeader from '@/components/layout/PageHeader';
import { getVehicleById, getServicesByVehicleId } from '@/lib/data';
import { ServiceRecord } from '@/lib/types';
import ServiceCard from '@/components/services/ServiceCard';

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const vehicle = id ? getVehicleById(id) : undefined;
  const services = id ? getServicesByVehicleId(id) : [];

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <PageHeader
          title={`${vehicle.brand} ${vehicle.model}`}
          description={`Szczegóły pojazdu i historia serwisowa`}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="rounded-xl overflow-hidden glass-light">
              <div className="aspect-video w-full overflow-hidden">
                {vehicle.image ? (
                  <img 
                    src={vehicle.image}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Brak zdjęcia</span>
                  </div>
                )}
              </div>
              <div className="p-6">
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
                    <dt className="text-sm font-medium text-gray-500">Przebieg</dt>
                    <dd className="mt-1 text-sm text-gray-900">{vehicle.mileage} km</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Rodzaj paliwa</dt>
                    <dd className="mt-1 text-sm text-gray-900">{vehicle.fuelType}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Skrzynia biegów</dt>
                    <dd className="mt-1 text-sm text-gray-900">{vehicle.transmission}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Ostatni serwis</dt>
                    <dd className="mt-1 text-sm text-gray-900">{vehicle.lastService || 'Brak'}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Historia serwisowa</h2>
            <div className="space-y-4">
              {services.map((service: ServiceRecord) => (
                <ServiceCard key={service.id} service={service} vehicle={vehicle} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VehicleDetails;
