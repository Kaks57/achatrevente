
import { Car, User } from "./types";
import { toast } from "sonner";

// Initialize localStorage with demo data if empty
const initializeDatabase = () => {
  if (!localStorage.getItem("cars")) {
    const demoCars: Car[] = [
      {
        id: "1",
        make: "BMW",
        model: "X5",
        year: 2023,
        price: 65000,
        mileage: 1500,
        color: "Black",
        transmission: "automatic",
        fuelType: "petrol",
        description: "Luxurious BMW X5 with premium features and excellent condition.",
        features: ["Leather Seats", "Panoramic Roof", "360 Camera", "Navigation", "Heated Seats"],
        images: [
          "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=3270&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1556800572-1b8aedf82198?q=80&w=3270&auto=format&fit=crop",
        ],
        inStock: true,
        createdAt: Date.now(),
      },
      {
        id: "2",
        make: "Mercedes-Benz",
        model: "E-Class",
        year: 2022,
        price: 58000,
        mileage: 5000,
        color: "Silver",
        transmission: "automatic",
        fuelType: "diesel",
        description: "Elegant Mercedes-Benz E-Class with advanced features and comfort.",
        features: ["Premium Sound System", "Lane Assist", "Leather Seats", "Heated Steering Wheel"],
        images: [
          "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=3336&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1551634979-2b11f8c946fe?q=80&w=3270&auto=format&fit=crop",
        ],
        inStock: true,
        createdAt: Date.now() - 86400000, // 1 day ago
      },
      {
        id: "3",
        make: "Audi",
        model: "Q7",
        year: 2023,
        price: 72000,
        mileage: 2000,
        color: "White",
        transmission: "automatic",
        fuelType: "hybrid",
        description: "Powerful Audi Q7 with spacious interior and cutting-edge technology.",
        features: ["7 Seats", "Matrix LED Lights", "Virtual Cockpit", "Bang & Olufsen Sound"],
        images: [
          "https://images.unsplash.com/photo-1541348263662-e068662d82af?q=80&w=3271&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1522932467653-e48f79727abf?q=80&w=2850&auto=format&fit=crop",
        ],
        inStock: true,
        createdAt: Date.now() - 172800000, // 2 days ago
      },
    ];
    localStorage.setItem("cars", JSON.stringify(demoCars));
  }

  if (!localStorage.getItem("users")) {
    const users: User[] = [
      {
        username: "admin",
        // In a real app, this would be properly hashed
        password: "admin123",
        isAdmin: true,
      },
    ];
    localStorage.setItem("users", JSON.stringify(users));
  }
};

// Get all cars
export const getCars = (): Car[] => {
  initializeDatabase();
  const cars = localStorage.getItem("cars");
  return cars ? JSON.parse(cars) : [];
};

// Get a car by ID
export const getCarById = (id: string): Car | undefined => {
  const cars = getCars();
  return cars.find((car) => car.id === id);
};

// Add a new car (admin only)
export const addCar = (car: Omit<Car, "id" | "createdAt">): Car => {
  const cars = getCars();
  const newCar: Car = {
    ...car,
    id: Date.now().toString(),
    createdAt: Date.now(),
  };
  localStorage.setItem("cars", JSON.stringify([...cars, newCar]));
  toast.success("Vehicle added successfully");
  return newCar;
};

// Update a car (admin only)
export const updateCar = (id: string, updatedCar: Partial<Omit<Car, "id" | "createdAt">>): Car | undefined => {
  const cars = getCars();
  const index = cars.findIndex((car) => car.id === id);
  
  if (index === -1) {
    toast.error("Vehicle not found");
    return undefined;
  }
  
  const updatedCars = [...cars];
  updatedCars[index] = { ...updatedCars[index], ...updatedCar };
  
  localStorage.setItem("cars", JSON.stringify(updatedCars));
  toast.success("Vehicle updated successfully");
  return updatedCars[index];
};

// Delete a car (admin only)
export const deleteCar = (id: string): boolean => {
  const cars = getCars();
  const filteredCars = cars.filter((car) => car.id !== id);
  
  if (filteredCars.length === cars.length) {
    toast.error("Vehicle not found");
    return false;
  }
  
  localStorage.setItem("cars", JSON.stringify(filteredCars));
  toast.success("Vehicle deleted successfully");
  return true;
};

// Authentication utilities
export const authenticateUser = (username: string, password: string): User | null => {
  initializeDatabase();
  const users = localStorage.getItem("users");
  const parsedUsers: User[] = users ? JSON.parse(users) : [];
  
  const user = parsedUsers.find(
    (u) => u.username === username && u.password === password
  );
  
  return user || null;
};
