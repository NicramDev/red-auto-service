
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Trash2, Check } from 'lucide-react';
import { toast } from 'sonner';
import { ServiceRecord, Vehicle, ServiceType, ServiceStatus, ServicePart } from '@/lib/types';
import { vehicles, serviceRecords } from '@/lib/data';
import { cn } from '@/lib/utils';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ServiceFormProps {
  initialService?: ServiceRecord;
  preselectedVehicleId?: string;
  isEdit?: boolean;
}

const ServiceForm = ({ initialService, preselectedVehicleId, isEdit = false }: ServiceFormProps) => {
  const navigate = useNavigate();
  
  const [service, setService] = useState<Partial<ServiceRecord>>(
    initialService || {
      vehicleId: preselectedVehicleId || '',
      date: new Date().toISOString().split('T')[0],
      mileage: 0,
      description: '',
      serviceType: 'maintenance' as ServiceType,
      status: 'scheduled' as ServiceStatus,
      notes: '',
      cost: 0,
      parts: [],
    }
  );

  const [parts, setParts] = useState<ServicePart[]>(initialService?.parts || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setService({ ...service, [name]: value });
  };

  // Add new empty part
  const addPart = () => {
    const newPart: ServicePart = {
      id: `p${new Date().getTime()}`,
      name: '',
      quantity: 1,
      price: 0,
    };
    setParts([...parts, newPart]);
  };

  // Update part
  const updatePart = (id: string, field: keyof ServicePart, value: string | number) => {
    setParts(parts.map(part => 
      part.id === id ? { ...part, [field]: value } : part
    ));
  };

  // Remove part
  const removePart = (id: string) => {
    setParts(parts.filter(part => part.id !== id));
  };

  // Calculate total cost from parts
  const calculateTotalCost = (): number => {
    return parts.reduce((total, part) => total + (part.quantity * part.price), 0);
  };

  // Select vehicle's current mileage when vehicle is selected
  const handleVehicleChange = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (vehicle) {
      setService({
        ...service,
        vehicleId,
        mileage: vehicle.mileage,
      });
    } else {
      setService({
        ...service,
        vehicleId,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Update total cost from parts
    const totalCost = calculateTotalCost();
    const updatedService = {
      ...service,
      cost: totalCost,
      parts: parts,
    };

    // Simulate API call
    setTimeout(() => {
      // In a real application, this would be an API call to save the data
      if (isEdit && initialService) {
        toast.success('Serwis został zaktualizowany');
      } else {
        // Add new service to the list (in a real app, this would be handled by API)
        const newService = {
          ...updatedService,
          id: `s${serviceRecords.length + 1}`,
        } as ServiceRecord;
        
        toast.success('Serwis został dodany');
      }

      setIsSubmitting(false);
      navigate('/services');
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="vehicleId">Pojazd</Label>
              <Select 
                value={service.vehicleId} 
                onValueChange={handleVehicleChange}
                disabled={!!preselectedVehicleId || isEdit}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz pojazd" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map(vehicle => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.brand} {vehicle.model} ({vehicle.licensePlate})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Data serwisu</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={service.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="mileage">Przebieg (km)</Label>
                <Input
                  id="mileage"
                  name="mileage"
                  type="number"
                  value={service.mileage}
                  onChange={handleChange}
                  min={0}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Opis serwisu</Label>
              <Input
                id="description"
                name="description"
                value={service.description}
                onChange={handleChange}
                placeholder="np. Wymiana oleju, Naprawa hamulców"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="serviceType">Typ serwisu</Label>
                <Select 
                  value={service.serviceType} 
                  onValueChange={(value) => handleSelectChange('serviceType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz typ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maintenance">Przegląd</SelectItem>
                    <SelectItem value="repair">Naprawa</SelectItem>
                    <SelectItem value="inspection">Inspekcja</SelectItem>
                    <SelectItem value="other">Inne</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={service.status} 
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Zaplanowany</SelectItem>
                    <SelectItem value="in-progress">W trakcie</SelectItem>
                    <SelectItem value="completed">Ukończony</SelectItem>
                    <SelectItem value="cancelled">Anulowany</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notatki</Label>
              <Textarea
                id="notes"
                name="notes"
                value={service.notes || ''}
                onChange={handleChange}
                placeholder="Dodatkowe informacje o serwisie"
                className="min-h-24"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Części i materiały</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={addPart}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Dodaj część
              </Button>
            </div>

            {parts.length === 0 ? (
              <div className="border border-dashed rounded-md p-6 text-center text-gray-500">
                <p>Brak dodanych części</p>
                <Button 
                  type="button" 
                  variant="link" 
                  onClick={addPart}
                  className="mt-2 text-brand-600"
                >
                  Dodaj pierwszą część
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {parts.map((part, index) => (
                  <div 
                    key={part.id} 
                    className="grid grid-cols-6 gap-2 items-end border border-gray-100 rounded-md p-3"
                  >
                    <div className="col-span-3">
                      <Label htmlFor={`part-name-${part.id}`} className="text-xs">Nazwa</Label>
                      <Input
                        id={`part-name-${part.id}`}
                        value={part.name}
                        onChange={(e) => updatePart(part.id, 'name', e.target.value)}
                        placeholder="np. Filtr oleju"
                        size={1}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`part-quantity-${part.id}`} className="text-xs">Ilość</Label>
                      <Input
                        id={`part-quantity-${part.id}`}
                        type="number"
                        value={part.quantity}
                        onChange={(e) => updatePart(part.id, 'quantity', parseInt(e.target.value))}
                        min={1}
                        size={1}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`part-price-${part.id}`} className="text-xs">Cena</Label>
                      <Input
                        id={`part-price-${part.id}`}
                        type="number"
                        value={part.price}
                        onChange={(e) => updatePart(part.id, 'price', parseFloat(e.target.value))}
                        min={0}
                        step={0.01}
                        size={1}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removePart(part.id)}
                        className="h-9 w-9 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between items-center pt-3 border-t">
                  <span className="text-sm text-gray-500">Suma:</span>
                  <span className="font-medium">
                    {calculateTotalCost().toLocaleString('pl-PL')} PLN
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/services')}
          >
            Anuluj
          </Button>
          <Button 
            type="submit" 
            className="brand-gradient"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <span className="animate-spin mr-2">◌</span>
                Zapisywanie...
              </div>
            ) : (
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                {isEdit ? 'Zaktualizuj serwis' : 'Dodaj serwis'}
              </div>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ServiceForm;
