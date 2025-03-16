import { v4 as uuidv4 } from 'uuid';
import { Vehicle, ServiceRecord, ServicePart, Tag } from './types';

// Mock data for vehicles
export const vehicles: Vehicle[] = [
  {
    id: uuidv4(),
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

// Mock data for service records
export const serviceRecords: ServiceRecord[] = [
  {
    id: uuidv4(),
    vehicleId: vehicles[0].id,
    date: '2024-01-05',
    time: '10:00',
    description: 'Olej i filtry',
    serviceType: 'maintenance',
    status: 'completed',
    cost: 450,
    notes: 'Standardowy przegląd okresowy',
    parts: [
      { id: uuidv4(), name: 'Olej silnikowy', quantity: 1, price: 150 },
      { id: uuidv4(), name: 'Filtr oleju', quantity: 1, price: 50 },
      { id: uuidv4(), name: 'Filtr powietrza', quantity: 1, price: 80 },
    ],
  },
  {
    id: uuidv4(),
    vehicleId: vehicles[1].id,
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
  },
  {
    id: uuidv4(),
    vehicleId: vehicles[2].id,
    date: '2024-01-15',
    time: '09:00',
    description: 'Przegląd techniczny',
    serviceType: 'inspection',
    status: 'completed',
    cost: 200,
    notes: 'Przegląd przeszedł pomyślnie',
    parts: [],
  },
  {
    id: uuidv4(),
    vehicleId: vehicles[3].id,
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
  },
  {
    id: uuidv4(),
    vehicleId: vehicles[4].id,
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
  },
  {
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
  },
  {
    id: uuidv4(),
    vehicleId: vehicles[1].id,
    date: '2024-02-15',
    time: '08:30',
    description: 'Kontrola zawieszenia',
    serviceType: 'inspection',
    status: 'scheduled',
    cost: 150,
    notes: 'Sprawdzenie stanu zawieszenia',
    parts: [],
  },
  {
    id: uuidv4(),
    vehicleId: vehicles[2].id,
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
  },
  {
    id: uuidv4(),
    vehicleId: vehicles[3].id,
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
  },
  {
    id: uuidv4(),
    vehicleId: vehicles[4].id,
    date: '2024-03-01',
    time: '12:00',
    description: 'Przegląd klimatyzacji',
    serviceType: 'inspection',
    status: 'scheduled',
    cost: 300,
    notes: 'Sprawdzenie szczelności i uzupełnienie czynnika',
    parts: [],
  },
];

// Mock data for tags
export const tags: Tag[] = [
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

// Function to add a new vehicle
export const addVehicle = (vehicle: Vehicle): Vehicle => {
  const newVehicle: Vehicle = { ...vehicle, id: uuidv4() };
  vehicles.push(newVehicle);
  return newVehicle;
};

// Function to update an existing vehicle
export const updateVehicle = (updatedVehicle: Vehicle): void => {
  const index = vehicles.findIndex(vehicle => vehicle.id === updatedVehicle.id);
  if (index !== -1) {
    vehicles[index] = updatedVehicle;
  }
};

// Function to delete a vehicle by ID
export const deleteVehicle = (id: string): void => {
  const index = vehicles.findIndex(vehicle => vehicle.id === id);
  if (index !== -1) {
    vehicles.splice(index, 1);
  }
};

// Function to get a vehicle by ID
export const getVehicleById = (id: string): Vehicle | undefined => {
  return vehicles.find(vehicle => vehicle.id === id);
};

// Function to add a new service record
export const addService = (service: ServiceRecord): void => {
  serviceRecords.push({ ...service, id: uuidv4() });
};

// Function to update an existing service record
export const updateService = (updatedService: ServiceRecord): void => {
  const index = serviceRecords.findIndex(service => service.id === updatedService.id);
  if (index !== -1) {
    serviceRecords[index] = updatedService;
  }
};

// Function to get services by vehicle ID
export const getServicesByVehicleId = (vehicleId: string): ServiceRecord[] => {
  return serviceRecords.filter(service => service.vehicleId === vehicleId);
};

// Function to get upcoming services
export const getUpcomingServices = (): ServiceRecord[] => {
  const today = new Date();
  return serviceRecords.filter(
    service => new Date(service.date) >= today && service.status !== 'completed'
  );
};

// Function to get recent services
export const getRecentServices = (): ServiceRecord[] => {
  const today = new Date();
  return serviceRecords.filter(
    service => new Date(service.date) < today && service.status === 'completed'
  );
};

// Function to get a tag by ID
export const getTagById = (id: string): Tag | undefined => {
  return tags.find(tag => tag.id === id);
};

// Ensure we have a getServiceById function
export const getServiceById = (id: string) => {
  return serviceRecords.find(service => service.id === id);
};
