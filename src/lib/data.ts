
import { v4 as uuidv4 } from 'uuid';
import { Vehicle, ServiceRecord, ServicePart, Tag } from './types';

// Storage keys for localStorage
const STORAGE_KEYS = {
  VEHICLES: 'fleet_manager_vehicles',
  SERVICES: 'fleet_manager_services',
  TAGS: 'fleet_manager_tags'
};

// Create the actual data stores
export const vehicles: Vehicle[] = [];
export const serviceRecords: ServiceRecord[] = [];
export const tags: Tag[] = [];

// Initial mock data for vehicles (will be overridden by localStorage if available)
const initialVehicles: Vehicle[] = [
  {
    id: '1',
    brand: 'Mercedes-Benz',
    customName: 'Actros',
    year: 2020,
    licensePlate: 'KR12345',
    vin: 'WDB1234567890',
    color: 'White',
    fuelType: 'diesel',
    transmission: 'automatic',
    dateAdded: '2023-01-15',
    lastService: '2023-12-01',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Mercedes-Benz_Actros_2545_%284th_gen._%2C_since_2018%29_IMG_6757.jpg/640px-Mercedes-Benz_Actros_2545_%284th_gen._%2C_since_2018%29_IMG_6757.jpg',
    purchaseDate: '2020-02-20',
    insuranceStartDate: '2023-02-20',
    insuranceEndDate: '2024-02-20',
    inspectionStartDate: '2023-03-10',
    inspectionEndDate: '2024-03-10',
    fuelCardNumber: '1234-5678-9012-3456',
    gpsSystemNumber: 'GPS-123',
    driverName: 'Jan Kowalski',
    notes: 'Regularly serviced at authorized dealer',
    attachment: null,
    attachmentFile: null,
    attachmentName: null,
    tags: ['tag1', 'tag2'],
  },
  {
    id: uuidv4(),
    brand: 'MAN',
    customName: 'TGX 18.480',
    year: 2018,
    licensePlate: 'GDA 67890',
    vin: 'MAN0987654321',
    color: 'Blue',
    fuelType: 'diesel',
    transmission: 'automatic',
    dateAdded: '2023-03-20',
    lastService: '2023-11-15',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/MAN_TGX_18.480_BLS_%284th_gen._%2C_since_2020%29_IMG_1787.jpg/640px-MAN_TGX_18.480_BLS_%284th_gen._%2C_since_2020%29_IMG_1787.jpg',
    purchaseDate: '2018-05-10',
    insuranceStartDate: '2023-05-10',
    insuranceEndDate: '2024-05-10',
    inspectionStartDate: '2023-06-01',
    inspectionEndDate: '2024-06-01',
    fuelCardNumber: '9876-5432-1098-7654',
    gpsSystemNumber: 'GPS-456',
    driverName: 'Andrzej Nowak',
    notes: 'Used for international transport',
    attachment: null,
    attachmentFile: null,
    attachmentName: null,
    tags: ['tag3'],
  },
  {
    id: uuidv4(),
    brand: 'Volvo',
    customName: 'FH 500',
    year: 2022,
    licensePlate: 'DW 24680',
    vin: 'VOLVO246813579',
    color: 'Red',
    fuelType: 'diesel',
    transmission: 'automatic',
    dateAdded: '2023-05-01',
    lastService: '2024-01-05',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Volvo_FH_500_Globetrotter_XL_%285th_gen._%2C_since_2020%29_IMG_0874.jpg/640px-Volvo_FH_500_Globetrotter_XL_%285th_gen._%2C_since_2020%29_IMG_0874.jpg',
    purchaseDate: '2022-06-15',
    insuranceStartDate: '2023-06-15',
    insuranceEndDate: '2024-06-15',
    inspectionStartDate: '2023-07-01',
    inspectionEndDate: '2024-07-01',
    fuelCardNumber: '1122-3344-5566-7788',
    gpsSystemNumber: 'GPS-789',
    driverName: 'Marek Wiśniewski',
    notes: 'Equipped with advanced safety systems',
    attachment: null,
    attachmentFile: null,
    attachmentName: null,
    tags: ['tag1', 'tag3'],
  },
  {
    id: uuidv4(),
    brand: 'Scania',
    customName: 'R450',
    year: 2019,
    licensePlate: 'PO 13579',
    vin: 'SCANIA975312468',
    color: 'Green',
    fuelType: 'diesel',
    transmission: 'automatic',
    dateAdded: '2023-07-10',
    lastService: '2023-10-20',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Scania_R_450_%285th_gen._%2C_since_2016%29_IMG_1047.jpg/640px-Scania_R_450_%285th_gen._%2C_since_2016%29_IMG_1047.jpg',
    purchaseDate: '2019-08-01',
    insuranceStartDate: '2023-08-01',
    insuranceEndDate: '2024-08-01',
    inspectionStartDate: '2023-09-10',
    inspectionEndDate: '2024-09-10',
    fuelCardNumber: '4455-6677-8899-0011',
    gpsSystemNumber: 'GPS-012',
    driverName: 'Piotr Zając',
    notes: 'High roof cabin',
    attachment: null,
    attachmentFile: null,
    attachmentName: null,
    tags: ['tag2'],
  },
  {
    id: uuidv4(),
    brand: 'DAF',
    customName: 'XF 480',
    year: 2021,
    licensePlate: 'SL 98765',
    vin: 'DAF1239874560',
    color: 'Silver',
    fuelType: 'diesel',
    transmission: 'automatic',
    dateAdded: '2023-09-15',
    lastService: '2023-11-25',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/DAF_XF_480_FT_%285th_gen._%2C_since_2017%29_IMG_1249.jpg/640px-DAF_XF_480_FT_%285th_gen._%2C_since_2017%29_IMG_1249.jpg',
    purchaseDate: '2021-10-01',
    insuranceStartDate: '2023-10-01',
    insuranceEndDate: '2024-10-01',
    inspectionStartDate: '2023-11-01',
    inspectionEndDate: '2024-11-01',
    fuelCardNumber: '2233-4455-6677-8899',
    gpsSystemNumber: 'GPS-345',
    driverName: 'Ewa Lis',
    notes: 'Economical fuel consumption',
    attachment: null,
    attachmentFile: null,
    attachmentName: null,
    tags: ['tag1'],
  },
];

// Initial mock data for tags (will be overridden by localStorage if available)
const initialTags: Tag[] = [
  {
    id: 'tag1',
    name: 'Ciężarowy',
    color: '#2563eb',
  },
  {
    id: 'tag2',
    name: 'Chłodnia',
    color: '#059669',
  },
  {
    id: 'tag3',
    name: 'Plandeka',
    color: '#7c3aed',
  },
];

// Initial mock data for service records (will be overridden by localStorage if available)
const createInitialServiceRecords = () => {
  return [
    {
      id: '1',
      vehicleId: '1', // This will be updated after loading vehicles
      date: '2024-01-05',
      time: '10:00',
      description: 'Olej i filtry',
      serviceType: 'maintenance',
      status: 'completed',
      cost: 450,
      notes: 'Standardowy przegląd okresowy',
      parts: [
        { id: '1-1', name: 'Olej silnikowy', quantity: 1, price: 150 },
        { id: '1-2', name: 'Filtr oleju', quantity: 1, price: 50 },
        { id: '1-3', name: 'Filtr powietrza', quantity: 1, price: 80 },
      ],
    },
  ];
};

// Load data from localStorage
const loadStoredData = () => {
  try {
    // Load vehicles
    const storedVehicles = localStorage.getItem(STORAGE_KEYS.VEHICLES);
    if (storedVehicles) {
      const parsedVehicles = JSON.parse(storedVehicles);
      vehicles.length = 0; // Clear existing array
      vehicles.push(...parsedVehicles);
    } else {
      // If no stored vehicles, use initial data
      vehicles.push(...initialVehicles);
    }
    
    // Load tags
    const storedTags = localStorage.getItem(STORAGE_KEYS.TAGS);
    if (storedTags) {
      const parsedTags = JSON.parse(storedTags);
      tags.length = 0;
      tags.push(...parsedTags);
    } else {
      // If no stored tags, use initial data
      tags.push(...initialTags);
    }
    
    // Load services
    const storedServices = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (storedServices) {
      const parsedServices = JSON.parse(storedServices);
      serviceRecords.length = 0;
      serviceRecords.push(...parsedServices);
    } else {
      // If no stored services, use initial data with corrected vehicleIds
      const initialServices = createInitialServiceRecords();
      
      // Create additional mock service records
      if (vehicles.length > 0) {
        initialServices.push({
          id: uuidv4(),
          vehicleId: vehicles[1]?.id || vehicles[0].id,
          date: '2024-01-10',
          time: '14:30',
          description: 'Wymiana klocków hamulcowych',
          serviceType: 'repair',
          status: 'completed',
          cost: 600,
          notes: 'Klocki wymienione na nowe',
          parts: [
            { id: uuidv4(), name: 'Klocki hamulcowe', quantity: 4, price: 120 },
          ],
        });
        
        initialServices.push({
          id: uuidv4(),
          vehicleId: vehicles[2]?.id || vehicles[0].id,
          date: '2024-01-15',
          time: '09:00',
          description: 'Przegląd techniczny',
          serviceType: 'inspection',
          status: 'completed',
          cost: 200,
          notes: 'Przegląd przeszedł pomyślnie',
          parts: [],
        });
        
        initialServices.push({
          id: uuidv4(),
          vehicleId: vehicles[3]?.id || vehicles[0].id,
          date: '2024-01-20',
          time: '11:00',
          description: 'Naprawa klimatyzacji',
          serviceType: 'repair',
          status: 'completed',
          cost: 800,
          notes: 'Uzupełnienie czynnika chłodniczego',
          parts: [
            { id: uuidv4(), name: 'Czynnik chłodniczy', quantity: 1, price: 300 },
          ],
        });
        
        initialServices.push({
          id: uuidv4(),
          vehicleId: vehicles[4]?.id || vehicles[0].id,
          date: '2024-01-25',
          time: '13:00',
          description: 'Wymiana opon',
          serviceType: 'maintenance',
          status: 'completed',
          cost: 1200,
          notes: 'Opony zimowe',
          parts: [
            { id: uuidv4(), name: 'Opona zimowa', quantity: 4, price: 300 },
          ],
        });
        
        initialServices.push({
          id: uuidv4(),
          vehicleId: vehicles[0].id,
          date: '2024-02-10',
          time: '16:00',
          description: 'Serwis olejowy',
          serviceType: 'maintenance',
          status: 'scheduled',
          cost: 480,
          notes: 'Wymiana oleju i filtrów',
          parts: [
            { id: uuidv4(), name: 'Olej silnikowy', quantity: 1, price: 180 },
            { id: uuidv4(), name: 'Filtr oleju', quantity: 1, price: 60 },
            { id: uuidv4(), name: 'Filtr powietrza', quantity: 1, price: 90 },
          ],
        });
        
        initialServices.push({
          id: uuidv4(),
          vehicleId: vehicles[1]?.id || vehicles[0].id,
          date: '2024-02-15',
          time: '08:30',
          description: 'Kontrola zawieszenia',
          serviceType: 'inspection',
          status: 'scheduled',
          cost: 150,
          notes: 'Sprawdzenie stanu zawieszenia',
          parts: [],
        });
        
        initialServices.push({
          id: uuidv4(),
          vehicleId: vehicles[2]?.id || vehicles[0].id,
          date: '2024-02-20',
          time: '10:00',
          description: 'Wymiana rozrządu',
          serviceType: 'repair',
          status: 'scheduled',
          cost: 1500,
          notes: 'Wymiana kompletnego zestawu rozrządu',
          parts: [
            { id: uuidv4(), name: 'Zestaw rozrządu', quantity: 1, price: 1200 },
            { id: uuidv4(), name: 'Pompa wody', quantity: 1, price: 300 },
          ],
        });
        
        initialServices.push({
          id: uuidv4(),
          vehicleId: vehicles[3]?.id || vehicles[0].id,
          date: '2024-02-25',
          time: '14:00',
          description: 'Naprawa układu hamulcowego',
          serviceType: 'repair',
          status: 'scheduled',
          cost: 750,
          notes: 'Wymiana tarcz i klocków hamulcowych',
          parts: [
            { id: uuidv4(), name: 'Tarcze hamulcowe', quantity: 2, price: 250 },
            { id: uuidv4(), name: 'Klocki hamulcowe', quantity: 4, price: 50 },
          ],
        });
        
        initialServices.push({
          id: uuidv4(),
          vehicleId: vehicles[4]?.id || vehicles[0].id,
          date: '2024-03-01',
          time: '12:00',
          description: 'Przegląd klimatyzacji',
          serviceType: 'inspection',
          status: 'scheduled',
          cost: 300,
          notes: 'Sprawdzenie szczelności i uzupełnienie czynnika',
          parts: [],
        });
      }
      
      serviceRecords.push(...initialServices);
    }
    
    console.log('Data loaded from localStorage:', {
      vehicles: vehicles.length,
      services: serviceRecords.length,
      tags: tags.length
    });
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    // Fall back to initial data
    vehicles.push(...initialVehicles);
    serviceRecords.push(...createInitialServiceRecords());
    tags.push(...initialTags);
  }
};

// Save data to localStorage
const saveData = () => {
  try {
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(vehicles));
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(serviceRecords));
    localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(tags));
    console.log('Data saved to localStorage');
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

// Initialize data on module load
loadStoredData();

// CRUD operations for vehicles with localStorage persistence
export const addVehicle = (vehicle: Vehicle): Vehicle => {
  const newVehicle: Vehicle = { ...vehicle, id: uuidv4() };
  vehicles.push(newVehicle);
  saveData();
  return newVehicle;
};

export const updateVehicle = (updatedVehicle: Vehicle): void => {
  const index = vehicles.findIndex(vehicle => vehicle.id === updatedVehicle.id);
  if (index !== -1) {
    vehicles[index] = updatedVehicle;
    saveData();
  }
};

export const deleteVehicle = (id: string): void => {
  const index = vehicles.findIndex(vehicle => vehicle.id === id);
  if (index !== -1) {
    vehicles.splice(index, 1);
    // Also delete associated services
    const servicesToDelete = serviceRecords.filter(service => service.vehicleId === id);
    servicesToDelete.forEach(service => {
      const serviceIndex = serviceRecords.findIndex(s => s.id === service.id);
      if (serviceIndex !== -1) {
        serviceRecords.splice(serviceIndex, 1);
      }
    });
    saveData();
  }
};

export const getVehicleById = (id: string): Vehicle | undefined => {
  return vehicles.find(vehicle => vehicle.id === id);
};

// CRUD operations for service records with localStorage persistence
export const addService = (service: ServiceRecord): ServiceRecord => {
  const newService = { ...service, id: uuidv4() };
  serviceRecords.push(newService);
  saveData();
  return newService;
};

export const updateService = (updatedService: ServiceRecord): void => {
  const index = serviceRecords.findIndex(service => service.id === updatedService.id);
  if (index !== -1) {
    serviceRecords[index] = updatedService;
    saveData();
  }
};

export const deleteService = (id: string): void => {
  const index = serviceRecords.findIndex(service => service.id === id);
  if (index !== -1) {
    serviceRecords.splice(index, 1);
    saveData();
  }
};

export const getServiceById = (id: string): ServiceRecord | undefined => {
  return serviceRecords.find(service => service.id === id);
};

export const getServicesByVehicleId = (vehicleId: string): ServiceRecord[] => {
  return serviceRecords.filter(service => service.vehicleId === vehicleId);
};

// Functions for tag management
export const addTag = (tag: Tag): Tag => {
  const newTag = { ...tag, id: tag.id || uuidv4() };
  tags.push(newTag);
  saveData();
  return newTag;
};

export const updateTag = (updatedTag: Tag): void => {
  const index = tags.findIndex(tag => tag.id === updatedTag.id);
  if (index !== -1) {
    tags[index] = updatedTag;
    saveData();
  }
};

export const deleteTag = (id: string): void => {
  const index = tags.findIndex(tag => tag.id === id);
  if (index !== -1) {
    tags.splice(index, 1);
    saveData();
  }
};

export const getTagById = (id: string): Tag | undefined => {
  return tags.find(tag => tag.id === id);
};

// Helper functions
export const getUpcomingServices = (): ServiceRecord[] => {
  const today = new Date();
  return serviceRecords.filter(
    service => new Date(service.date) >= today && service.status !== 'completed'
  );
};

export const getRecentServices = (): ServiceRecord[] => {
  const today = new Date();
  return serviceRecords.filter(
    service => new Date(service.date) < today && service.status === 'completed'
  );
};

export const getUpcomingReminders = () => {
  const today = new Date();
  const result = [];
  
  // Get upcoming services within next 7 days
  const upcomingServices = serviceRecords.filter(service => {
    if (service.status === 'completed') return false;
    
    const serviceDate = new Date(service.date);
    const diffDays = Math.ceil((serviceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  });
  
  // Add upcoming services to reminders
  upcomingServices.forEach(service => {
    const serviceDate = new Date(service.date);
    const daysLeft = Math.ceil((serviceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    result.push({
      type: 'service',
      vehicleId: service.vehicleId,
      serviceId: service.id,
      date: service.date,
      time: service.time,
      description: service.description,
      daysLeft
    });
  });
  
  // Check for insurance expiration
  vehicles.forEach(vehicle => {
    if (vehicle.insuranceEndDate) {
      const endDate = new Date(vehicle.insuranceEndDate);
      const diffDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays >= 0 && diffDays <= 7) {
        result.push({
          type: 'insurance',
          vehicleId: vehicle.id,
          date: vehicle.insuranceEndDate,
          daysLeft: diffDays
        });
      }
    }
  });
  
  // Check for inspection expiration
  vehicles.forEach(vehicle => {
    if (vehicle.inspectionEndDate) {
      const endDate = new Date(vehicle.inspectionEndDate);
      const diffDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays >= 0 && diffDays <= 7) {
        result.push({
          type: 'inspection',
          vehicleId: vehicle.id,
          date: vehicle.inspectionEndDate,
          daysLeft: diffDays
        });
      }
    }
  });
  
  // Sort reminders by days left (ascending)
  return result.sort((a, b) => a.daysLeft - b.daysLeft);
};

// For backward compatibility with existing code, provide these alias functions
export const addVehicleWithStorage = addVehicle;
export const updateVehicleWithStorage = updateVehicle;
export const deleteVehicleWithStorage = deleteVehicle;
export const addServiceWithStorage = addService;
export const updateServiceWithStorage = updateService;
export const addTagWithStorage = addTag;
