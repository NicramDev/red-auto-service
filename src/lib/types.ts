
export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  vin?: string;
  color?: string;
  mileage: number;
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid' | 'lpg' | 'other';
  transmission: 'manual' | 'automatic' | 'other';
  dateAdded: string;
  lastService?: string;
  image?: string;
  purchaseDate?: string;
  firstRegistrationDate?: string;
  firstInspectionDate?: string;
  fuelCardNumber?: string;
  gpsSystemNumber?: string;
  driverName?: string;
  notes?: string;
  attachment?: string;
  attachmentFile?: File | null;
  attachmentName?: string;
  tags?: string[];
}

export interface ServiceRecord {
  id: string;
  vehicleId: string;
  date: string;
  mileage: number;
  description: string;
  serviceType: 'maintenance' | 'repair' | 'inspection' | 'other';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  cost?: number;
  notes?: string;
  parts?: ServicePart[];
}

export interface ServicePart {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid' | 'lpg' | 'other';
export type TransmissionType = 'manual' | 'automatic' | 'other';
export type ServiceType = 'maintenance' | 'repair' | 'inspection' | 'other';
export type ServiceStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
