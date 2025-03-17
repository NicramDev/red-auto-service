
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import PageHeader from '@/components/layout/PageHeader';
import { serviceRecords, getVehicleById } from '@/lib/data';

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const service = id ? serviceRecords.find(s => s.id === id) : undefined;
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

  const formattedDate = new Date(service.date).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const formattedTime = service.time ? service.time : '';
  
  // Status labels in Polish
  const statusLabels: Record<string, string> = {
    'scheduled': 'Zaplanowany',
    'in-progress': 'W trakcie',
    'completed': 'Zakończony',
    'cancelled': 'Anulowany'
  };
  
  // Service type labels in Polish
  const serviceTypeLabels: Record<string, string> = {
    'maintenance': 'Przegląd',
    'repair': 'Naprawa',
    'inspection': 'Inspekcja',
    'other': 'Inne'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <PageHeader
          title={`Serwis: ${service.description}`}
          description={`Data: ${formattedDate}${formattedTime ? `, Godzina: ${formattedTime}` : ''}`}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="rounded-xl overflow-hidden glass-light">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Informacje o pojeździe</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Pojazd</dt>
                    <dd className="mt-1 text-sm text-gray-900">{vehicle.brand} {vehicle.customName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Numer rejestracyjny</dt>
                    <dd className="mt-1 text-sm text-gray-900">{vehicle.licensePlate}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden glass-light">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Szczegóły serwisu</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Typ serwisu</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {serviceTypeLabels[service.serviceType]}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {statusLabels[service.status]}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Opis</dt>
                    <dd className="mt-1 text-sm text-gray-900">{service.description}</dd>
                  </div>
                  {service.notes && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Notatki</dt>
                      <dd className="mt-1 text-sm text-gray-900">{service.notes}</dd>
                    </div>
                  )}
                  {service.cost && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Koszt</dt>
                      <dd className="mt-1 text-sm text-gray-900">{service.cost} PLN</dd>
                    </div>
                  )}
                </dl>

                {service.parts && service.parts.length > 0 && (
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-4">Części</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Nazwa
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Ilość
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Cena
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {service.parts.map((part) => (
                            <tr key={part.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {part.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {part.quantity}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {part.price} PLN
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServiceDetails;
