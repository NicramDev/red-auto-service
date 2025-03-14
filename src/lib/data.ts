
import { Vehicle, ServiceRecord, Tag } from "./types";

// Load data from localStorage or use defaults
const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
};

// Save data to localStorage
const saveToStorage = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Default data
const defaultTags: Tag[] = [
  { id: "tag1", name: "Służbowy", color: "#FF5A5A" },
  { id: "tag2", name: "Prywatny", color: "#5B8FF9" },
  { id: "tag3", name: "Leasing", color: "#5AD8A6" },
  { id: "tag4", name: "Wynajem", color: "#F6BD16" },
  { id: "tag5", name: "Ciężarowy", color: "#8D00E1" },
];

const defaultVehicles: Vehicle[] = [
  {
    id: "v1",
    brand: "Audi",
    customName: "Reprezentacyjne A4",
    year: 2019,
    licensePlate: "WA12345",
    vin: "WAUZZZ8K9BA123456",
    color: "Black",
    fuelType: "petrol",
    transmission: "automatic",
    dateAdded: "2023-01-15",
    lastService: "2023-10-05",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0cb6?q=80&w=2070&auto=format&fit=crop",
    insuranceStartDate: "2023-01-15",
    insuranceEndDate: "2024-01-14",
    inspectionStartDate: "2023-02-20",
    inspectionEndDate: "2024-02-19",
    tags: ["tag1", "tag3"]
  },
  {
    id: "v2",
    brand: "BMW",
    customName: "Seria 3 Biała",
    year: 2021,
    licensePlate: "GD98765",
    vin: "WBA8E9C5XKB123789",
    color: "White",
    fuelType: "diesel",
    transmission: "automatic",
    dateAdded: "2023-05-20",
    lastService: "2023-11-12",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
    insuranceStartDate: "2023-05-20",
    insuranceEndDate: "2024-05-19",
    tags: ["tag2"]
  },
  {
    id: "v3",
    brand: "Tesla",
    customName: "Model 3 Czerwony",
    year: 2022,
    licensePlate: "EL22222",
    vin: "5YJ3E1EAXNF123456",
    color: "Red",
    fuelType: "electric",
    transmission: "automatic",
    dateAdded: "2023-07-10",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop",
    inspectionStartDate: "2023-07-10",
    inspectionEndDate: "2024-07-09",
    tags: ["tag1", "tag4"]
  },
];

const defaultServiceRecords: ServiceRecord[] = [
  {
    id: "s1",
    vehicleId: "v1",
    date: "2023-10-05",
    time: "10:00",
    description: "Regular maintenance service",
    serviceType: "maintenance",
    status: "completed",
    cost: 850,
    notes: "Changed oil, air filter, and brake pads",
    parts: [
      { id: "p1", name: "Oil Filter", quantity: 1, price: 120 },
      { id: "p2", name: "Air Filter", quantity: 1, price: 95 },
      { id: "p3", name: "Brake Pads", quantity: 4, price: 450 },
    ],
  },
  {
    id: "s2",
    vehicleId: "v2",
    date: "2023-11-12",
    time: "14:30",
    description: "First scheduled maintenance",
    serviceType: "maintenance",
    status: "completed",
    cost: 550,
    notes: "Changed oil and general inspection",
    parts: [
      { id: "p4", name: "Oil Filter", quantity: 1, price: 150 },
      { id: "p5", name: "Engine Oil", quantity: 1, price: 300 },
    ],
  },
  {
    id: "s3",
    vehicleId: "v1",
    date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 6 days from now
    time: "09:15",
    description: "Brake system repair",
    serviceType: "repair",
    status: "scheduled",
    cost: 1200,
    notes: "Front brake caliper replacement needed",
  },
  {
    id: "s4",
    vehicleId: "v3",
    date: "2024-01-15",
    time: "11:45",
    description: "Battery check and software update",
    serviceType: "inspection",
    status: "completed",
    cost: 100,
    notes: "Everything working properly, software updated to latest version",
  },
];

// Load or initialize data
export let tags: Tag[] = loadFromStorage<Tag[]>("constrack_tags", defaultTags);
export let vehicles: Vehicle[] = loadFromStorage<Vehicle[]>("constrack_vehicles", defaultVehicles);
export let serviceRecords: ServiceRecord[] = loadFromStorage<ServiceRecord[]>("constrack_services", defaultServiceRecords);

// Functions to manipulate data with persistence
export const addVehicle = (vehicle: Vehicle) => {
  const newVehicle = {
    ...vehicle,
    id: `v${vehicles.length + 1}`,
    dateAdded: new Date().toISOString().split('T')[0]
  };
  vehicles.push(newVehicle);
  saveToStorage("constrack_vehicles", vehicles);
  return newVehicle;
};

export const deleteVehicle = (id: string) => {
  const index = vehicles.findIndex(v => v.id === id);
  if (index !== -1) {
    vehicles.splice(index, 1);
    saveToStorage("constrack_vehicles", vehicles);
    
    // Also delete related services
    serviceRecords = serviceRecords.filter(s => s.vehicleId !== id);
    saveToStorage("constrack_services", serviceRecords);
    return true;
  }
  return false;
};

export const updateVehicle = (updatedVehicle: Vehicle) => {
  const index = vehicles.findIndex(v => v.id === updatedVehicle.id);
  if (index !== -1) {
    vehicles[index] = updatedVehicle;
    saveToStorage("constrack_vehicles", vehicles);
    return true;
  }
  return false;
};

export const addTag = (name: string, color: string) => {
  const newTag = {
    id: `tag${tags.length + 1}`,
    name,
    color
  };
  tags.push(newTag);
  saveToStorage("constrack_tags", tags);
  return newTag;
};

export const addService = (service: ServiceRecord) => {
  const newService = {
    ...service,
    id: `s${serviceRecords.length + 1}`,
  };
  serviceRecords.push(newService);
  
  // Update last service date on the vehicle
  const vehicleIndex = vehicles.findIndex(v => v.id === service.vehicleId);
  if (vehicleIndex !== -1) {
    vehicles[vehicleIndex].lastService = service.date;
    saveToStorage("constrack_vehicles", vehicles);
  }
  
  saveToStorage("constrack_services", serviceRecords);
  return newService;
};

export const updateService = (updatedService: ServiceRecord) => {
  const index = serviceRecords.findIndex(s => s.id === updatedService.id);
  if (index !== -1) {
    serviceRecords[index] = updatedService;
    saveToStorage("constrack_services", serviceRecords);
    
    // Update last service date on the vehicle if status is completed
    if (updatedService.status === 'completed') {
      const vehicleIndex = vehicles.findIndex(v => v.id === updatedService.vehicleId);
      if (vehicleIndex !== -1) {
        vehicles[vehicleIndex].lastService = updatedService.date;
        saveToStorage("constrack_vehicles", vehicles);
      }
    }
    
    return true;
  }
  return false;
};

export const deleteService = (id: string) => {
  const index = serviceRecords.findIndex(s => s.id === id);
  if (index !== -1) {
    serviceRecords.splice(index, 1);
    saveToStorage("constrack_services", serviceRecords);
    return true;
  }
  return false;
};

export const getTagById = (id: string): Tag | undefined => {
  return tags.find(tag => tag.id === id);
};

export const getVehicleById = (id: string): Vehicle | undefined => {
  return vehicles.find(vehicle => vehicle.id === id);
};

export const getServicesByVehicleId = (vehicleId: string): ServiceRecord[] => {
  return serviceRecords.filter(record => record.vehicleId === vehicleId);
};

export const getUpcomingServices = (): ServiceRecord[] => {
  return serviceRecords.filter(record => record.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getRecentServices = (): ServiceRecord[] => {
  return serviceRecords.filter(record => record.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getUpcomingReminders = (): {type: 'service' | 'insurance' | 'inspection', vehicleId: string, date: string, time?: string, daysLeft: number}[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const reminders = [];
  
  // Check upcoming services (within 7 days)
  for (const service of serviceRecords) {
    if (service.status === 'scheduled') {
      const serviceDate = new Date(service.date);
      serviceDate.setHours(0, 0, 0, 0);
      
      const diffDays = Math.floor((serviceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays >= 0 && diffDays <= 7) {
        reminders.push({
          type: 'service',
          vehicleId: service.vehicleId,
          date: service.date,
          time: service.time,
          daysLeft: diffDays
        });
      }
    }
  }
  
  // Check insurance expiry (within 14 days)
  for (const vehicle of vehicles) {
    if (vehicle.insuranceEndDate) {
      const expiryDate = new Date(vehicle.insuranceEndDate);
      expiryDate.setHours(0, 0, 0, 0);
      
      const diffDays = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays >= 0 && diffDays <= 14) {
        reminders.push({
          type: 'insurance',
          vehicleId: vehicle.id,
          date: vehicle.insuranceEndDate,
          daysLeft: diffDays
        });
      }
    }
  }
  
  // Check inspection expiry (within 14 days)
  for (const vehicle of vehicles) {
    if (vehicle.inspectionEndDate) {
      const expiryDate = new Date(vehicle.inspectionEndDate);
      expiryDate.setHours(0, 0, 0, 0);
      
      const diffDays = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays >= 0 && diffDays <= 14) {
        reminders.push({
          type: 'inspection',
          vehicleId: vehicle.id,
          date: vehicle.inspectionEndDate,
          daysLeft: diffDays
        });
      }
    }
  }
  
  return reminders.sort((a, b) => a.daysLeft - b.daysLeft);
};
