
import { Car, User } from "./types";
import { toast } from "sonner";

// Nom de la base de données IndexedDB
const DB_NAME = "luxuryRentalWorldDB";
const DB_VERSION = 1;
const CARS_STORE = "cars";
const USERS_STORE = "users";

// Initialiser la base de données IndexedDB
const initializeDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Vérifier si IndexedDB est disponible
    if (!window.indexedDB) {
      console.error("Votre navigateur ne supporte pas IndexedDB.");
      // Fallback à localStorage si IndexedDB n'est pas disponible
      initializeLocalStorage();
      resolve();
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error("Erreur d'ouverture de la base de données:", event);
      // Fallback à localStorage en cas d'erreur
      initializeLocalStorage();
      resolve();
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Créer le magasin de données pour les voitures
      if (!db.objectStoreNames.contains(CARS_STORE)) {
        const carsStore = db.createObjectStore(CARS_STORE, { keyPath: "id" });
        carsStore.createIndex("createdAt", "createdAt", { unique: false });
      }
      
      // Créer le magasin de données pour les utilisateurs
      if (!db.objectStoreNames.contains(USERS_STORE)) {
        db.createObjectStore(USERS_STORE, { keyPath: "username" });
      }
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Vérifier si des données existent déjà, sinon ajouter des données de démo
      const transaction = db.transaction([CARS_STORE, USERS_STORE], "readwrite");
      const carsStore = transaction.objectStore(CARS_STORE);
      const usersStore = transaction.objectStore(USERS_STORE);
      
      const carsCountRequest = carsStore.count();
      carsCountRequest.onsuccess = () => {
        if (carsCountRequest.result === 0) {
          // Ajouter des voitures de démo
          const demoCars: Car[] = [
            {
              id: "1",
              make: "BMW",
              model: "X5",
              year: 2023,
              price: 65000,
              mileage: 1500,
              color: "Noir",
              transmission: "automatic",
              fuelType: "petrol",
              description: "BMW X5 luxueux avec caractéristiques premium et excellent état.",
              features: ["Sièges en cuir", "Toit panoramique", "Caméra 360°", "Navigation", "Sièges chauffants"],
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
              model: "Classe E",
              year: 2022,
              price: 58000,
              mileage: 5000,
              color: "Argent",
              transmission: "automatic",
              fuelType: "diesel",
              description: "Mercedes-Benz Classe E élégante avec fonctionnalités avancées et confort.",
              features: ["Système audio premium", "Assistance de voie", "Sièges en cuir", "Volant chauffant"],
              images: [
                "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=3336&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1551634979-2b11f8c946fe?q=80&w=3270&auto=format&fit=crop",
              ],
              inStock: true,
              createdAt: Date.now() - 86400000, // 1 jour avant
            },
            {
              id: "3",
              make: "Audi",
              model: "Q7",
              year: 2023,
              price: 72000,
              mileage: 2000,
              color: "Blanc",
              transmission: "automatic",
              fuelType: "hybrid",
              description: "Audi Q7 puissant avec intérieur spacieux et technologie de pointe.",
              features: ["7 Places", "Phares LED Matrix", "Cockpit virtuel", "Son Bang & Olufsen"],
              images: [
                "https://images.unsplash.com/photo-1541348263662-e068662d82af?q=80&w=3271&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1522932467653-e48f79727abf?q=80&w=2850&auto=format&fit=crop",
              ],
              inStock: true,
              createdAt: Date.now() - 172800000, // 2 jours avant
            },
          ];
          
          demoCars.forEach(car => {
            carsStore.add(car);
          });
        }
      };
      
      const usersCountRequest = usersStore.count();
      usersCountRequest.onsuccess = () => {
        if (usersCountRequest.result === 0) {
          // Ajouter un utilisateur admin par défaut
          const users: User[] = [
            {
              username: "admin",
              // Dans une application réelle, ce mot de passe serait correctement hashé
              password: "admin123",
              isAdmin: true,
            },
          ];
          
          users.forEach(user => {
            usersStore.add(user);
          });
        }
      };
      
      transaction.oncomplete = () => {
        resolve();
      };
      
      transaction.onerror = (event) => {
        console.error("Erreur lors de l'initialisation des données:", event);
        // Fallback à localStorage en cas d'erreur
        initializeLocalStorage();
        resolve();
      };
    };
  });
};

// Fallback à localStorage si IndexedDB n'est pas disponible
const initializeLocalStorage = () => {
  if (!localStorage.getItem("cars")) {
    const demoCars: Car[] = [
      {
        id: "1",
        make: "BMW",
        model: "X5",
        year: 2023,
        price: 65000,
        mileage: 1500,
        color: "Noir",
        transmission: "automatic",
        fuelType: "petrol",
        description: "BMW X5 luxueux avec caractéristiques premium et excellent état.",
        features: ["Sièges en cuir", "Toit panoramique", "Caméra 360°", "Navigation", "Sièges chauffants"],
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
        model: "Classe E",
        year: 2022,
        price: 58000,
        mileage: 5000,
        color: "Argent",
        transmission: "automatic",
        fuelType: "diesel",
        description: "Mercedes-Benz Classe E élégante avec fonctionnalités avancées et confort.",
        features: ["Système audio premium", "Assistance de voie", "Sièges en cuir", "Volant chauffant"],
        images: [
          "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=3336&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1551634979-2b11f8c946fe?q=80&w=3270&auto=format&fit=crop",
        ],
        inStock: true,
        createdAt: Date.now() - 86400000, // 1 jour avant
      },
      {
        id: "3",
        make: "Audi",
        model: "Q7",
        year: 2023,
        price: 72000,
        mileage: 2000,
        color: "Blanc",
        transmission: "automatic",
        fuelType: "hybrid",
        description: "Audi Q7 puissant avec intérieur spacieux et technologie de pointe.",
        features: ["7 Places", "Phares LED Matrix", "Cockpit virtuel", "Son Bang & Olufsen"],
        images: [
          "https://images.unsplash.com/photo-1541348263662-e068662d82af?q=80&w=3271&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1522932467653-e48f79727abf?q=80&w=2850&auto=format&fit=crop",
        ],
        inStock: true,
        createdAt: Date.now() - 172800000, // 2 jours avant
      },
    ];
    localStorage.setItem("cars", JSON.stringify(demoCars));
  }

  if (!localStorage.getItem("users")) {
    const users: User[] = [
      {
        username: "admin",
        // Dans une application réelle, ce mot de passe serait correctement hashé
        password: "admin123",
        isAdmin: true,
      },
    ];
    localStorage.setItem("users", JSON.stringify(users));
  }
};

// Obtenir toutes les voitures
export const getCars = async (): Promise<Car[]> => {
  await initializeDatabase();
  
  return new Promise((resolve, reject) => {
    // Essayer d'abord avec IndexedDB
    if (window.indexedDB) {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
      
      request.onerror = () => {
        // Fallback à localStorage
        const cars = localStorage.getItem("cars");
        resolve(cars ? JSON.parse(cars) : []);
      };
      
      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction(CARS_STORE, "readonly");
        const store = transaction.objectStore(CARS_STORE);
        const index = store.index("createdAt");
        
        const request = index.getAll();
        
        request.onsuccess = () => {
          // Trier les voitures par date de création (les plus récentes d'abord)
          const cars = request.result.sort((a, b) => b.createdAt - a.createdAt);
          resolve(cars);
        };
        
        request.onerror = () => {
          // Fallback à localStorage
          const cars = localStorage.getItem("cars");
          resolve(cars ? JSON.parse(cars) : []);
        };
      };
    } else {
      // Fallback à localStorage
      const cars = localStorage.getItem("cars");
      resolve(cars ? JSON.parse(cars) : []);
    }
  });
};

// Obtenir une voiture par ID
export const getCarById = async (id: string): Promise<Car | undefined> => {
  const cars = await getCars();
  return cars.find((car) => car.id === id);
};

// Ajouter une nouvelle voiture (admin uniquement)
export const addCar = async (car: Omit<Car, "id" | "createdAt">): Promise<Car> => {
  const newCar: Car = {
    ...car,
    id: Date.now().toString(),
    createdAt: Date.now(),
  };
  
  return new Promise((resolve, reject) => {
    // Essayer d'abord avec IndexedDB
    if (window.indexedDB) {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
      
      request.onerror = () => {
        // Fallback à localStorage
        const cars = localStorage.getItem("cars");
        const existingCars = cars ? JSON.parse(cars) : [];
        localStorage.setItem("cars", JSON.stringify([...existingCars, newCar]));
        toast.success("Véhicule ajouté avec succès");
        resolve(newCar);
      };
      
      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction(CARS_STORE, "readwrite");
        const store = transaction.objectStore(CARS_STORE);
        
        const addRequest = store.add(newCar);
        
        addRequest.onsuccess = () => {
          toast.success("Véhicule ajouté avec succès");
          resolve(newCar);
        };
        
        addRequest.onerror = () => {
          // Fallback à localStorage
          const cars = localStorage.getItem("cars");
          const existingCars = cars ? JSON.parse(cars) : [];
          localStorage.setItem("cars", JSON.stringify([...existingCars, newCar]));
          toast.success("Véhicule ajouté avec succès");
          resolve(newCar);
        };
      };
    } else {
      // Fallback à localStorage
      const cars = localStorage.getItem("cars");
      const existingCars = cars ? JSON.parse(cars) : [];
      localStorage.setItem("cars", JSON.stringify([...existingCars, newCar]));
      toast.success("Véhicule ajouté avec succès");
      resolve(newCar);
    }
  });
};

// Mettre à jour une voiture (admin uniquement)
export const updateCar = async (id: string, updatedCar: Partial<Omit<Car, "id" | "createdAt">>): Promise<Car | undefined> => {
  return new Promise(async (resolve, reject) => {
    // Essayer d'abord avec IndexedDB
    if (window.indexedDB) {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
      
      request.onerror = async () => {
        // Fallback à localStorage
        const cars = localStorage.getItem("cars");
        const existingCars = cars ? JSON.parse(cars) : [];
        const index = existingCars.findIndex((car: Car) => car.id === id);
        
        if (index === -1) {
          toast.error("Véhicule non trouvé");
          resolve(undefined);
          return;
        }
        
        const updatedCars = [...existingCars];
        updatedCars[index] = { ...updatedCars[index], ...updatedCar };
        localStorage.setItem("cars", JSON.stringify(updatedCars));
        toast.success("Véhicule mis à jour avec succès");
        resolve(updatedCars[index]);
      };
      
      request.onsuccess = async (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction(CARS_STORE, "readwrite");
        const store = transaction.objectStore(CARS_STORE);
        
        // D'abord, obtenir la voiture existante
        const getRequest = store.get(id);
        
        getRequest.onsuccess = () => {
          if (!getRequest.result) {
            toast.error("Véhicule non trouvé");
            resolve(undefined);
            return;
          }
          
          // Mettre à jour la voiture
          const updatedCarObject = { ...getRequest.result, ...updatedCar };
          const updateRequest = store.put(updatedCarObject);
          
          updateRequest.onsuccess = () => {
            toast.success("Véhicule mis à jour avec succès");
            resolve(updatedCarObject);
          };
          
          updateRequest.onerror = async () => {
            // Fallback à localStorage
            const cars = localStorage.getItem("cars");
            const existingCars = cars ? JSON.parse(cars) : [];
            const index = existingCars.findIndex((car: Car) => car.id === id);
            
            if (index === -1) {
              toast.error("Véhicule non trouvé");
              resolve(undefined);
              return;
            }
            
            const updatedCars = [...existingCars];
            updatedCars[index] = { ...updatedCars[index], ...updatedCar };
            localStorage.setItem("cars", JSON.stringify(updatedCars));
            toast.success("Véhicule mis à jour avec succès");
            resolve(updatedCars[index]);
          };
        };
        
        getRequest.onerror = async () => {
          // Fallback à localStorage
          const cars = localStorage.getItem("cars");
          const existingCars = cars ? JSON.parse(cars) : [];
          const index = existingCars.findIndex((car: Car) => car.id === id);
          
          if (index === -1) {
            toast.error("Véhicule non trouvé");
            resolve(undefined);
            return;
          }
          
          const updatedCars = [...existingCars];
          updatedCars[index] = { ...updatedCars[index], ...updatedCar };
          localStorage.setItem("cars", JSON.stringify(updatedCars));
          toast.success("Véhicule mis à jour avec succès");
          resolve(updatedCars[index]);
        };
      };
    } else {
      // Fallback à localStorage
      const cars = localStorage.getItem("cars");
      const existingCars = cars ? JSON.parse(cars) : [];
      const index = existingCars.findIndex((car: Car) => car.id === id);
      
      if (index === -1) {
        toast.error("Véhicule non trouvé");
        resolve(undefined);
        return;
      }
      
      const updatedCars = [...existingCars];
      updatedCars[index] = { ...updatedCars[index], ...updatedCar };
      localStorage.setItem("cars", JSON.stringify(updatedCars));
      toast.success("Véhicule mis à jour avec succès");
      resolve(updatedCars[index]);
    }
  });
};

// Supprimer une voiture (admin uniquement)
export const deleteCar = async (id: string): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    // Essayer d'abord avec IndexedDB
    if (window.indexedDB) {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
      
      request.onerror = async () => {
        // Fallback à localStorage
        const cars = localStorage.getItem("cars");
        const existingCars = cars ? JSON.parse(cars) : [];
        const filteredCars = existingCars.filter((car: Car) => car.id !== id);
        
        if (filteredCars.length === existingCars.length) {
          toast.error("Véhicule non trouvé");
          resolve(false);
          return;
        }
        
        localStorage.setItem("cars", JSON.stringify(filteredCars));
        toast.success("Véhicule supprimé avec succès");
        resolve(true);
      };
      
      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction(CARS_STORE, "readwrite");
        const store = transaction.objectStore(CARS_STORE);
        
        // Vérifier si la voiture existe
        const getRequest = store.get(id);
        
        getRequest.onsuccess = () => {
          if (!getRequest.result) {
            toast.error("Véhicule non trouvé");
            resolve(false);
            return;
          }
          
          // Supprimer la voiture
          const deleteRequest = store.delete(id);
          
          deleteRequest.onsuccess = () => {
            toast.success("Véhicule supprimé avec succès");
            resolve(true);
          };
          
          deleteRequest.onerror = async () => {
            // Fallback à localStorage
            const cars = localStorage.getItem("cars");
            const existingCars = cars ? JSON.parse(cars) : [];
            const filteredCars = existingCars.filter((car: Car) => car.id !== id);
            
            if (filteredCars.length === existingCars.length) {
              toast.error("Véhicule non trouvé");
              resolve(false);
              return;
            }
            
            localStorage.setItem("cars", JSON.stringify(filteredCars));
            toast.success("Véhicule supprimé avec succès");
            resolve(true);
          };
        };
        
        getRequest.onerror = async () => {
          // Fallback à localStorage
          const cars = localStorage.getItem("cars");
          const existingCars = cars ? JSON.parse(cars) : [];
          const filteredCars = existingCars.filter((car: Car) => car.id !== id);
          
          if (filteredCars.length === existingCars.length) {
            toast.error("Véhicule non trouvé");
            resolve(false);
            return;
          }
          
          localStorage.setItem("cars", JSON.stringify(filteredCars));
          toast.success("Véhicule supprimé avec succès");
          resolve(true);
        };
      };
    } else {
      // Fallback à localStorage
      const cars = localStorage.getItem("cars");
      const existingCars = cars ? JSON.parse(cars) : [];
      const filteredCars = existingCars.filter((car: Car) => car.id !== id);
      
      if (filteredCars.length === existingCars.length) {
        toast.error("Véhicule non trouvé");
        resolve(false);
        return;
      }
      
      localStorage.setItem("cars", JSON.stringify(filteredCars));
      toast.success("Véhicule supprimé avec succès");
      resolve(true);
    }
  });
};

// Utilitaires d'authentification
export const authenticateUser = async (username: string, password: string): Promise<User | null> => {
  await initializeDatabase();
  
  return new Promise((resolve, reject) => {
    // Essayer d'abord avec IndexedDB
    if (window.indexedDB) {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
      
      request.onerror = () => {
        // Fallback à localStorage
        const users = localStorage.getItem("users");
        const parsedUsers: User[] = users ? JSON.parse(users) : [];
        const user = parsedUsers.find(
          (u) => u.username === username && u.password === password
        );
        resolve(user || null);
      };
      
      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction(USERS_STORE, "readonly");
        const store = transaction.objectStore(USERS_STORE);
        
        const getRequest = store.get(username);
        
        getRequest.onsuccess = () => {
          const user = getRequest.result;
          if (user && user.password === password) {
            resolve(user);
          } else {
            resolve(null);
          }
        };
        
        getRequest.onerror = () => {
          // Fallback à localStorage
          const users = localStorage.getItem("users");
          const parsedUsers: User[] = users ? JSON.parse(users) : [];
          const user = parsedUsers.find(
            (u) => u.username === username && u.password === password
          );
          resolve(user || null);
        };
      };
    } else {
      // Fallback à localStorage
      const users = localStorage.getItem("users");
      const parsedUsers: User[] = users ? JSON.parse(users) : [];
      const user = parsedUsers.find(
        (u) => u.username === username && u.password === password
      );
      resolve(user || null);
    }
  });
};
