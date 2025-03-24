
export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color: string;
  transmission: "automatic" | "manual";
  fuelType: "petrol" | "diesel" | "electric" | "hybrid";
  description: string;
  features: string[];
  images: string[];
  inStock: boolean;
  createdAt: number;
  updatedAt: number;
}

export type User = {
  username: string;
  password: string;
  isAdmin: boolean;
};
