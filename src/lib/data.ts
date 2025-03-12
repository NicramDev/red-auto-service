
import { Vehicle, ServiceRecord } from "./types";

export const vehicles: Vehicle[] = [
  {
    id: "v1",
    brand: "Audi",
    model: "A4",
    year: 2019,
    licensePlate: "WA12345",
    vin: "WAUZZZ8K9BA123456",
    color: "Black",
    mileage: 45000,
    fuelType: "petrol",
    transmission: "automatic",
    dateAdded: "2023-01-15",
    lastService: "2023-10-05",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0cb6?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "v2",
    brand: "BMW",
    model: "3 Series",
    year: 2021,
    licensePlate: "GD98765",
    vin: "WBA8E9C5XKB123789",
    color: "White",
    mileage: 15000,
    fuelType: "diesel",
    transmission: "automatic",
    dateAdded: "2023-05-20",
    lastService: "2023-11-12",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "v3",
    brand: "Tesla",
    model: "Model 3",
    year: 2022,
    licensePlate: "EL22222",
    vin: "5YJ3E1EAXNF123456",
    color: "Red",
    mileage: 8000,
    fuelType: "electric",
    transmission: "automatic",
    dateAdded: "2023-07-10",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop",
  },
];

export const serviceRecords: ServiceRecord[] = [
  {
    id: "s1",
    vehicleId: "v1",
    date: "2023-10-05",
    mileage: 45000,
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
    mileage: 15000,
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
    date: "2024-02-20",
    mileage: 48000,
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
    mileage: 10000,
    description: "Battery check and software update",
    serviceType: "inspection",
    status: "completed",
    cost: 100,
    notes: "Everything working properly, software updated to latest version",
  },
];

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
