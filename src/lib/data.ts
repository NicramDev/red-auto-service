import { v4 as uuidv4 } from 'uuid';
import { Vehicle, ServiceRecord, Tag, ServiceType, ServiceStatus } from './types';

// Mock data storage
// In a real application, this would be stored in a database

// Tags data
export const tags: Tag[] = [
  { id: '1', name: 'Osobowy', color: '#ef4444' },
  { id: '2', name: 'Dostawczy', color: '#3b82f6' },
  { id: '3', name: 'Służbowy', color: '#10b981' },
  { id: '4', name: 'Prywatny', color: '#f59e0b' },
  { id: '5', name: 'Leasing', color: '#8b5cf6' },
];

// Vehicles data
export const vehicles: Vehicle[] = [
  {
    id: '1',
    brand: 'Toyota',
    customName: 'Corolla',
    licensePlate: 'WA12345',
    vin: 'JT2BF22K1W0123456',
    year: 2020,
    fuelType: 'petrol',
    transmission: 'automatic',
    lastService: '2023-05-15',
    driverName: 'Jan Kowalski',
    purchaseDate: '2020-03-10',
    insuranceStartDate: '2023-01-01',
    insuranceEndDate: '2023-12-31',
    inspectionStartDate: '2023-01-15',
    inspectionEndDate: '2024-01-14',
    fuelCardNumber: 'FC123456',
    gpsSystemNumber: 'GPS789012',
    image: 'https://i.imgur.com/uoSDRGP.jpg',
    tags: ['1', '3'],
    dateAdded: '2020-03-10'
  },
  {
    id: '2',
    brand: 'Ford',
    customName: 'Transit',
    licensePlate: 'WA54321',
    vin: '1FTNS24W2WHB12345',
    year: 2021,
    fuelType: 'diesel',
    transmission: 'manual',
    lastService: '2023-06-20',
    driverName: 'Anna Nowak',
    purchaseDate: '2021-02-15',
    insuranceStartDate: '2023-02-01',
    insuranceEndDate: '2023-07-30',
    inspectionStartDate: '2023-02-15',
    inspectionEndDate: '2024-02-14',
    fuelCardNumber: 'FC654321',
    gpsSystemNumber: 'GPS210987',
    image: 'https://i.imgur.com/zJFrViY.jpg',
    tags: ['2', '5'],
    dateAdded: '2021-02-15'
  },
  {
    id: '3',
    brand: 'Volkswagen',
    customName: 'Passat',
    licensePlate: 'WB98765',
    vin: 'WVWZZZ3CZLE012345',
    year: 2019,
    fuelType: 'hybrid',
    transmission: 'automatic',
    lastService: '2023-04-10',
    driverName: 'Piotr Wiśniewski',
    purchaseDate: '2019-11-20',
    insuranceStartDate: '2023-03-15',
    insuranceEndDate: '2024-03-14',
    inspectionStartDate: '2023-03-01',
    inspectionEndDate: '2024-02-28',
    fuelCardNumber: 'FC987654',
    gpsSystemNumber: 'GPS345678',
    image: 'https://i.imgur.com/yvLvtrc.jpg',
    tags: ['1', '4'],
    dateAdded: '2019-11-20'
  }
];

// Service records data
export const serviceRecords: ServiceRecord[] = [
  {
    id: '1',
    vehicleId: '1',
    date: '2023-08-15',
    time: '10:00',
    description: 'Wymiana oleju i filtrów',
    serviceType: 'maintenance' as ServiceType,
    status: 'completed' as ServiceStatus,
    notes: 'Wymieniono olej silnikowy, filtr oleju, filtr powietrza',
    cost: 650,
    parts: [
      { id: 'p1', name: 'Olej silnikowy 5W30', quantity: 5, price: 50 },
      { id: 'p2', name: 'Filtr oleju', quantity: 1, price: 80 },
      { id: 'p3', name: 'Filtr powietrza', quantity: 1, price: 120 }
    ]
  },
  {
    id: '2',
    vehicleId: '2',
    date: '2023-09-05',
    time: '14:30',
    description: 'Naprawa układu hamulcowego',
    serviceType: 'repair' as ServiceType,
    status: 'completed' as ServiceStatus,
    notes: 'Wymieniono klocki hamulcowe i tarcze hamulcowe na przedniej osi',
    cost: 1200,
    parts: [
      { id: 'p4', name: 'Klocki hamulcowe przód', quantity: 1, price: 350 },
      { id: 'p5', name: 'Tarcze hamulcowe przód', quantity: 2, price: 380 }
    ]
  },
  {
    id: '3',
    vehicleId: '3',
    date: '2023-07-20',
    time: '09:15',
    description: 'Przegląd techniczny',
    serviceType: 'inspection' as ServiceType,
    status: 'completed' as ServiceStatus,
    notes: 'Wykonano pełny przegląd techniczny pojazdu, uzupełniono płyn do spryskiwaczy',
    cost: 300
  },
  {
    id: '4',
    vehicleId: '1',
    date: '2023-10-12',
    time: '11:00',
    description: 'Wymiana opon na zimowe',
    serviceType: 'repair' as ServiceType,
    status: 'scheduled' as ServiceStatus,
    notes: 'Wymagana wymiana opon na zimowe przed sezonem',
    cost: 100
  },
  {
    id: '5',
    vehicleId: '2',
    date: '2023-11-05',
    time: '15:45',
    description: 'Przegląd okresowy 30 000 km',
    serviceType: 'maintenance' as ServiceType,
    status: 'scheduled' as ServiceStatus,
    notes: 'Standardowy przegląd okresowy przy przebiegu 30 000 km'
  },
  {
    id: '6',
    vehicleId: '3',
    date: '2023-12-18',
    time: '13:30',
    description: 'Kontrola stanu akumulatora hybrydowego',
    serviceType: 'inspection' as ServiceType,
    status: 'scheduled' as ServiceStatus,
    notes: 'Rutynowa kontrola stanu akumulatora hybrydowego przed zimą'
  },
  {
    id: '7',
    vehicleId: '1',
    date: '2024-01-10',
    time: '09:00',
    description: 'Wymiana płynu chłodniczego',
    serviceType: 'repair' as ServiceType,
    status: 'scheduled' as ServiceStatus,
    notes: 'Zaplanowana wymiana płynu chłodniczego'
  },
  {
    id: '8',
    vehicleId: '2',
    date: '2024-02-05',
    time: '16:00',
    description: 'Kontrola układu zawieszenia',
    serviceType: 'repair' as ServiceType,
    status: 'scheduled' as ServiceStatus,
    notes: 'Kontrola i ewentualna naprawa układu zawieszenia'
  },
  {
    id: '9',
    vehicleId: '3',
    date: '2024-03-15',
    time: '10:30',
    description: 'Kontrola układu klimatyzacji',
    serviceType: 'inspection' as ServiceType,
    status: 'scheduled' as ServiceStatus,
    notes: 'Kontrola i ewentualne uzupełnienie czynnika chłodniczego'
  }
];

// Helper functions for data operations

// Tags
export const getTagById = (id: string): Tag | undefined => {
  return tags.find(tag => tag.id === id);
};

export const addTag = (tag: Tag): void => {
  tags.push(tag);
};

export const updateTag = (updatedTag: Tag): void => {
  const index = tags.findIndex(tag => tag.id === updatedTag.id);
  if (index !== -1) {
    tags[index] = updatedTag;
  }
};

export const deleteTag = (id: string): void => {
  const index = tags.findIndex(tag => tag.id === id);
  if (index !== -1) {
    tags.splice(index, 1);
  }
};

// For compatibility with existing code
export const addTagWithStorage = addTag;

// Vehicles
export const getVehicleById = (id: string): Vehicle | undefined => {
  return vehicles.find(vehicle => vehicle.id === id);
};

export const addVehicle = (vehicle: Vehicle): Vehicle => {
  const newVehicle = {
    ...vehicle,
    id: vehicle.id || uuidv4(),
  };
  vehicles.push(newVehicle);
  return newVehicle;
};

export const updateVehicle = (updatedVehicle: Vehicle): void => {
  const index = vehicles.findIndex(vehicle => vehicle.id === updatedVehicle.id);
  if (index !== -1) {
    vehicles[index] = updatedVehicle;
  }
};

export const deleteVehicle = (id: string): void => {
  const index = vehicles.findIndex(vehicle => vehicle.id === id);
  if (index !== -1) {
    vehicles.splice(index, 1);
    
    // Also remove any services associated with this vehicle
    const servicesToRemove = serviceRecords.filter(service => service.vehicleId === id);
    servicesToRemove.forEach(service => {
      deleteService(service.id);
    });
  }
};

// Services
export const getServiceById = (id: string): ServiceRecord | undefined => {
  return serviceRecords.find(service => service.id === id);
};

export const getServicesByVehicleId = (vehicleId: string): ServiceRecord[] => {
  return serviceRecords.filter(service => service.vehicleId === vehicleId);
};

export const addService = (service: ServiceRecord): ServiceRecord => {
  const newService = {
    ...service,
    id: service.id || uuidv4(),
  };
  serviceRecords.push(newService);
  
  // Update the last service date on the vehicle
  const vehicle = getVehicleById(service.vehicleId);
  if (vehicle) {
    vehicle.lastService = service.date;
    updateVehicle(vehicle);
  }
  
  return newService;
};

export const updateService = (updatedService: ServiceRecord): void => {
  const index = serviceRecords.findIndex(service => service.id === updatedService.id);
  if (index !== -1) {
    serviceRecords[index] = updatedService;
    
    // If the service is completed, update the vehicle's last service date
    if (updatedService.status === 'completed') {
      const vehicle = getVehicleById(updatedService.vehicleId);
      if (vehicle) {
        vehicle.lastService = updatedService.date;
        updateVehicle(vehicle);
      }
    }
  }
};

export const deleteService = (id: string): void => {
  const index = serviceRecords.findIndex(service => service.id === id);
  if (index !== -1) {
    serviceRecords.splice(index, 1);
  }
};

// Dashboard and reporting functions
export const getUpcomingServices = (days: number = 30): ServiceRecord[] => {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + days);
  
  return serviceRecords
    .filter(service => {
      const serviceDate = new Date(service.date);
      return serviceDate >= today && serviceDate <= futureDate && service.status !== 'completed';
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getRecentServices = (days: number = 30): ServiceRecord[] => {
  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - days);
  
  return serviceRecords
    .filter(service => {
      const serviceDate = new Date(service.date);
      return serviceDate <= today && serviceDate >= pastDate && service.status === 'completed';
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Reminder and notification system
export interface Reminder {
  type: 'service' | 'insurance' | 'inspection';
  vehicleId: string;
  date: string;
  time?: string;
  daysLeft: number;
}

export const getUpcomingReminders = (): Reminder[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const reminders: Reminder[] = [];
  
  // Check for upcoming services
  const upcomingServices = serviceRecords.filter(
    service => service.status !== 'completed' && service.status !== 'cancelled'
  );
  
  upcomingServices.forEach(service => {
    const serviceDate = new Date(service.date);
    serviceDate.setHours(0, 0, 0, 0);
    
    const daysLeft = Math.ceil((serviceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLeft <= 14) { // Only include reminders for the next 14 days
      reminders.push({
        type: 'service',
        vehicleId: service.vehicleId,
        date: service.date,
        time: service.time,
        daysLeft,
      });
    }
  });
  
  // Check for insurance expiry
  vehicles.forEach(vehicle => {
    if (vehicle.insuranceEndDate) {
      const insuranceEnd = new Date(vehicle.insuranceEndDate);
      insuranceEnd.setHours(0, 0, 0, 0);
      
      const daysLeft = Math.ceil((insuranceEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysLeft <= 14) {
        reminders.push({
          type: 'insurance',
          vehicleId: vehicle.id,
          date: vehicle.insuranceEndDate,
          daysLeft,
        });
      }
    }
    
    // Check for inspection expiry
    if (vehicle.inspectionEndDate) {
      const inspectionEnd = new Date(vehicle.inspectionEndDate);
      inspectionEnd.setHours(0, 0, 0, 0);
      
      const daysLeft = Math.ceil((inspectionEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysLeft <= 14) {
        reminders.push({
          type: 'inspection',
          vehicleId: vehicle.id,
          date: vehicle.inspectionEndDate,
          daysLeft,
        });
      }
    }
  });
  
  // Sort reminders by days left (ascending)
  return reminders.sort((a, b) => a.daysLeft - b.daysLeft);
};
