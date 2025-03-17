
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, ChevronDown, ChevronUp, Tag, X, List, ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import PageHeader from '@/components/layout/PageHeader';
import Navbar from '@/components/layout/Navbar';
import { serviceRecords, vehicles, deleteService, tags } from '@/lib/data';
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
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import TagBadge from '@/components/tags/TagBadge';

const Services = () => {
  const [services, setServices] = useState([...serviceRecords]);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [showCompletedServices, setShowCompletedServices] = useState(false);
  const [viewMode, setViewMode] = useState<'segregated' | 'all'>('segregated');
  const { toast } = useToast();

  // Get the services with vehicle information
  const servicesWithVehicles = services.map((service, index) => {
    const vehicle = vehicles.find(v => v.id === service.vehicleId);
    return { ...service, vehicle, index };
  });
  
  // Filter services based on search term and selected tags
  const filteredServices = servicesWithVehicles.filter(service => {
    const matchesSearch = service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (service.vehicle?.customName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (service.vehicle?.brand || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = selectedTagIds.length === 0 || 
                      (service.vehicle?.tags && service.vehicle.tags.some(tagId => selectedTagIds.includes(tagId)));
    
    return matchesSearch && matchesTags;
  });
  
  // Separate completed services from other services
  const completedServices = filteredServices.filter(
    service => service.status === 'completed'
  );
  
  const activeServices = filteredServices.filter(
    service => service.status !== 'completed'
  );
  
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

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTagIds([]);
  };

  const toggleTag = (tagId: string) => {
    if (selectedTagIds.includes(tagId)) {
      setSelectedTagIds(selectedTagIds.filter(id => id !== tagId));
    } else {
      setSelectedTagIds([...selectedTagIds, tagId]);
    }
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

        <div className="mb-6 space-y-4">
          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Szukaj serwisów..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <div className="absolute left-3 top-3 text-gray-400">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.5 6.5C9.5 4.84315 8.15685 3.5 6.5 3.5C4.84315 3.5 3.5 4.84315 3.5 6.5C3.5 8.15685 4.84315 9.5 6.5 9.5C8.15685 9.5 9.5 8.15685 9.5 6.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  <path d="M13.8536 13.8536C14.0488 13.6583 14.0488 13.3417 13.8536 13.1464L10.1464 9.43936C9.95118 9.24411 9.63461 9.24411 9.43936 9.43936C9.24411 9.63461 9.24411 9.95118 9.43936 10.1464L13.1464 13.8536C13.3417 14.0488 13.6583 14.0488 13.8536 13.8536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
            
            <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'segregated' | 'all')}>
              <ToggleGroupItem value="segregated" aria-label="Segregacja według statusu">
                <ListFilter className="h-4 w-4 mr-1" />
                Segregowane
              </ToggleGroupItem>
              <ToggleGroupItem value="all" aria-label="Wszystkie serwisy">
                <List className="h-4 w-4 mr-1" />
                Wszystkie
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Tags Filter */}
          <div className="flex flex-wrap gap-2 items-center">
            <Tag className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500 mr-2">Tagi:</span>
            {tags.map(tag => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={`transition-all duration-200 ${
                  selectedTagIds.includes(tag.id) ? 'ring-2 ring-offset-1' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <TagBadge tag={tag} />
              </button>
            ))}
            {(searchTerm || selectedTagIds.length > 0) && (
              <Button variant="outline" size="sm" onClick={clearFilters} className="ml-auto">
                <X className="h-3.5 w-3.5 mr-1" />
                Wyczyść filtry
              </Button>
            )}
          </div>
        </div>

        {viewMode === 'segregated' ? (
          <div className="space-y-6">
            {/* Active Services */}
            {activeServices.length > 0 ? (
              <div>
                <h3 className="text-lg font-medium mb-4">Aktywne serwisy</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeServices.map((service) => (
                    <ServiceCard 
                      key={service.id} 
                      service={service} 
                      vehicle={service.vehicle} 
                      index={service.index}
                      onDelete={() => handleDelete(service.id)}
                    />
                  ))}
                </div>
              </div>
            ) : searchTerm || selectedTagIds.length > 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Brak aktywnych serwisów spełniających kryteria wyszukiwania</p>
              </div>
            ) : null}

            {/* Completed Services */}
            {completedServices.length > 0 && (
              <Collapsible 
                open={showCompletedServices} 
                onOpenChange={setShowCompletedServices}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <CollapsibleTrigger asChild>
                  <div className="flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer">
                    <h3 className="text-lg font-medium">Ukończone serwisy ({completedServices.length})</h3>
                    <Button variant="ghost" size="icon">
                      {showCompletedServices ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    {completedServices.map((service) => (
                      <ServiceCard 
                        key={service.id} 
                        service={service} 
                        vehicle={service.vehicle} 
                        index={service.index}
                        onDelete={() => handleDelete(service.id)}
                      />
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* No Services Message */}
            {activeServices.length === 0 && completedServices.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Brak serwisów spełniających kryteria wyszukiwania</p>
                {(searchTerm || selectedTagIds.length > 0) && (
                  <Button variant="outline" onClick={clearFilters}>
                    Wyczyść filtry
                  </Button>
                )}
              </div>
            )}
          </div>
        ) : (
          /* All Services (not segregated) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  vehicle={service.vehicle} 
                  index={service.index}
                  onDelete={() => handleDelete(service.id)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 mb-4">Brak serwisów spełniających kryteria wyszukiwania</p>
                {(searchTerm || selectedTagIds.length > 0) && (
                  <Button variant="outline" onClick={clearFilters}>
                    Wyczyść filtry
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
        
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
