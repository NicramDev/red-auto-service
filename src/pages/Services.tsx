
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/layout/PageHeader';
import Navbar from '@/components/layout/Navbar';
import { serviceRecords, vehicles } from '@/lib/data';
import ServiceCard from '@/components/services/ServiceCard';

const Services = () => {
  const servicesWithVehicles = serviceRecords.map((service, index) => {
    const vehicle = vehicles.find(v => v.id === service.vehicleId);
    return { ...service, vehicle, index };
  });

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
            <ServiceCard key={service.id} service={service} vehicle={service.vehicle} index={service.index} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Services;
