import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, PaperclipIcon, Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Vehicle, FuelType, TransmissionType } from '@/lib/types';
import { vehicles } from '@/lib/data';
import { cn } from '@/lib/utils';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TagSelector from "@/components/tags/TagSelector";
import { Badge } from "@/components/ui/badge";

interface VehicleFormProps {
  initialVehicle?: Vehicle;
  isEdit?: boolean;
  onSubmit?: (data: Vehicle) => Promise<void>;
}

const VehicleForm = ({ initialVehicle, isEdit = false, onSubmit }: VehicleFormProps) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
      purchaseDate: '',
      firstRegistrationDate: '',
      firstInspectionDate: '',
      fuelCardNumber: '',
      gpsSystemNumber: '',
      driverName: '',
      notes: '',
      attachment: '',
      attachmentFile: null,
      attachmentName: '',
      tags: [],
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

  const handleTagChange = (selectedTags: string[]) => {
    setVehicle({ ...vehicle, tags: selectedTags });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileName = file.name;
      
      const fileUrl = URL.createObjectURL(file);
      
      setVehicle({
        ...vehicle,
        attachmentFile: file,
        attachment: fileUrl,
        attachmentName: fileName
      });
      
      toast.success(`Plik "${fileName}" został dodany`);
    }
  };

  const handleRemoveAttachment = () => {
    setVehicle({
      ...vehicle,
      attachment: '',
      attachmentFile: null,
      attachmentName: ''
    });
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    toast.info('Załącznik został usunięty');
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(vehicle as Vehicle);
      } else {
        setTimeout(() => {
          if (isEdit && initialVehicle) {
            toast.success('Pojazd został zaktualizowany');
          } else {
            const newVehicle = {
              ...vehicle,
              id: `v${vehicles.length + 1}`,
            } as Vehicle;
            
            vehicles.push(newVehicle);
            toast.success('Pojazd został dodany');
          }
          
          setIsSubmitting(false);
          navigate('/vehicles');
        }, 1000);
      }
    } catch (error) {
      toast.error('Wystąpił błąd podczas zapisywania pojazdu');
      setIsSubmitting(false);
    }
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
            <h3 className="text-lg font-medium">Podstawowe informacje</h3>
            
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
              <Label htmlFor="driverName">Imię i nazwisko kierowcy</Label>
              <Input
                id="driverName"
                name="driverName"
                value={vehicle.driverName}
                onChange={handleChange}
                placeholder="np. Jan Kowalski"
              />
            </div>

            <div>
              <Label>Tagi</Label>
              <TagSelector 
                selectedTags={vehicle.tags || []} 
                onChange={handleTagChange} 
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Dane techniczne i terminy</h3>
            
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
              <Label htmlFor="purchaseDate">Data zakupu pojazdu</Label>
              <Input
                id="purchaseDate"
                name="purchaseDate"
                type="date"
                value={vehicle.purchaseDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="firstRegistrationDate">Data pierwszej rejestracji</Label>
              <Input
                id="firstRegistrationDate"
                name="firstRegistrationDate"
                type="date"
                value={vehicle.firstRegistrationDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="firstInspectionDate">Data pierwszego przeglądu</Label>
              <Input
                id="firstInspectionDate"
                name="firstInspectionDate"
                type="date"
                value={vehicle.firstInspectionDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="fuelCardNumber">Nr karty paliwowej</Label>
              <Input
                id="fuelCardNumber"
                name="fuelCardNumber"
                value={vehicle.fuelCardNumber}
                onChange={handleChange}
                placeholder="np. FC12345"
              />
            </div>

            <div>
              <Label htmlFor="gpsSystemNumber">Nr systemu GPS</Label>
              <Input
                id="gpsSystemNumber"
                name="gpsSystemNumber"
                value={vehicle.gpsSystemNumber}
                onChange={handleChange}
                placeholder="np. GPS9876"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Dodatkowe informacje</h3>
          
          <div>
            <Label htmlFor="notes">Notatki</Label>
            <Textarea
              id="notes"
              name="notes"
              value={vehicle.notes}
              onChange={handleChange}
              placeholder="Dodatkowe informacje o pojeździe..."
              rows={4}
            />
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
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Unable+to+load+image';
                    setVehicle({ ...vehicle, image: '' });
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="attachment">Załącznik</Label>
            <div className="mt-1 flex items-center gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={triggerFileInput}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Wybierz plik
              </Button>
              
              <input 
                ref={fileInputRef}
                type="file"
                id="attachment"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
              />
              
              {vehicle.attachmentName && (
                <div className="flex items-center gap-2 flex-1">
                  <Badge variant="secondary" className="gap-1 max-w-xs truncate">
                    <PaperclipIcon className="h-3 w-3" />
                    <span className="truncate">{vehicle.attachmentName}</span>
                  </Badge>
                  <Button 
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-red-500"
                    onClick={handleRemoveAttachment}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <p className="text-xs text-gray-500 mt-1">
              Dozwolone formaty: PDF, DOC, DOCX, XLS, XLSX, JPG, JPEG, PNG
            </p>
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

