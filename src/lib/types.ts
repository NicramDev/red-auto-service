
export interface Vehicle {
  id: string;
  brand: string;
  customName: string;  // Changed from model to customName
  year: number;
  licensePlate: string;
  vin?: string;
  color?: string;
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid' | 'lpg' | 'other';
  transmission: 'manual' | 'automatic' | 'other';
  dateAdded: string;
  lastService?: string;
  image?: string;
  purchaseDate?: string;
  insuranceStartDate?: string;  // Changed from firstRegistrationDate
  insuranceEndDate?: string;    // Added insurance end date
  inspectionStartDate?: string; // Changed from firstInspectionDate
  inspectionEndDate?: string;   // Added inspection end date
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
  time?: string;  // Added time field
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
