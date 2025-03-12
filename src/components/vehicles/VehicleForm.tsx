
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { Vehicle, FuelType, TransmissionType } from '@/lib/types';
import { vehicles } from '@/lib/data';
import { cn } from '@/lib/utils';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VehicleFormProps {
  initialVehicle?: Vehicle;
  isEdit?: boolean;
}

const VehicleForm = ({ initialVehicle, isEdit = false }: VehicleFormProps) => {
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Partial<Vehicle>>(
    initialVehicle || {
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      licensePlate: '',
      vin: '',
      color: '',
      mileage: 0,
      fuelType: 'petrol' as FuelType,
      transmission: 'manual' as TransmissionType,
      dateAdded: new Date().toISOString().split('T')[0],
      image: '',
    }
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setVehicle({ ...vehicle, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // In a real application, this would be an API call to save the data
      // For now, just show a success message and navigate back

      if (isEdit && initialVehicle) {
        toast.success('Pojazd został zaktualizowany');
      } else {
        // Add new vehicle to the list (in a real app, this would be handled by API)
        const newVehicle = {
          ...vehicle,
          id: `v${vehicles.length + 1}`,
        } as Vehicle;
        
        toast.success('Pojazd został dodany');
      }

      setIsSubmitting(false);
      navigate('/vehicles');
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
              <Label htmlFor="brand">Marka</Label>
              <Input
                id="brand"
                name="brand"
                value={vehicle.brand}
                onChange={handleChange}
                placeholder="np. Audi, BMW, Mercedes"
                required
              />
            </div>

            <div>
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                name="model"
                value={vehicle.model}
                onChange={handleChange}
                placeholder="np. A4, 3 Series, C-Class"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year">Rok produkcji</Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  value={vehicle.year}
                  onChange={handleChange}
                  min={1900}
                  max={new Date().getFullYear() + 1}
                  required
                />
              </div>
              <div>
                <Label htmlFor="color">Kolor</Label>
                <Input
                  id="color"
                  name="color"
                  value={vehicle.color}
                  onChange={handleChange}
                  placeholder="np. Czarny, Biały"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="licensePlate">Numer rejestracyjny</Label>
              <Input
                id="licensePlate"
                name="licensePlate"
                value={vehicle.licensePlate}
                onChange={handleChange}
                placeholder="np. WA12345"
                required
              />
            </div>

            <div>
              <Label htmlFor="vin">Numer VIN</Label>
              <Input
                id="vin"
                name="vin"
                value={vehicle.vin}
                onChange={handleChange}
                placeholder="np. WAUZZZ8K9BA123456"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="mileage">Przebieg (km)</Label>
              <Input
                id="mileage"
                name="mileage"
                type="number"
                value={vehicle.mileage}
                onChange={handleChange}
                min={0}
                required
              />
            </div>

            <div>
              <Label htmlFor="fuelType">Rodzaj paliwa</Label>
              <Select 
                value={vehicle.fuelType} 
                onValueChange={(value) => handleSelectChange('fuelType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz rodzaj paliwa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="petrol">Benzyna</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="electric">Elektryczny</SelectItem>
                  <SelectItem value="hybrid">Hybryda</SelectItem>
                  <SelectItem value="lpg">LPG</SelectItem>
                  <SelectItem value="other">Inny</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="transmission">Skrzynia biegów</Label>
              <Select 
                value={vehicle.transmission} 
                onValueChange={(value) => handleSelectChange('transmission', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz skrzynię biegów" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manualna</SelectItem>
                  <SelectItem value="automatic">Automatyczna</SelectItem>
                  <SelectItem value="other">Inna</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="image">URL zdjęcia</Label>
              <Input
                id="image"
                name="image"
                value={vehicle.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
              {vehicle.image && (
                <div className="mt-2 rounded-md overflow-hidden h-32 relative">
                  <img 
                    src={vehicle.image} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // If image fails to load, clear the URL
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Unable+to+load+image';
                      setVehicle({ ...vehicle, image: '' });
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/vehicles')}
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
                {isEdit ? 'Zaktualizuj pojazd' : 'Dodaj pojazd'}
              </div>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default VehicleForm;
