
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCars, addCar, updateCar, deleteCar } from "@/utils/database";
import { requireAdmin, logoutUser } from "@/utils/auth";
import { Car } from "@/utils/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminCarForm from "@/components/AdminCarForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Edit, Trash2, LogOut } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if user is admin
    const isAdmin = requireAdmin();
    setIsAuthorized(isAdmin);

    if (isAdmin) {
      // Fetch all cars
      fetchCars();
    } else {
      // Redirect to login if not admin
      navigate("/login");
    }
  }, [navigate]);

  const fetchCars = () => {
    const fetchedCars = getCars();
    setCars(fetchedCars);
    setFilteredCars(fetchedCars);
  };

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCars(cars);
    } else {
      const searchValue = searchTerm.toLowerCase();
      const results = cars.filter((car) => {
        return (
          car.make.toLowerCase().includes(searchValue) ||
          car.model.toLowerCase().includes(searchValue) ||
          `${car.make} ${car.model}`.toLowerCase().includes(searchValue)
        );
      });
      setFilteredCars(results);
    }
  }, [searchTerm, cars]);

  const handleAddCar = (carData: any) => {
    setIsSubmitting(true);
    try {
      addCar(carData);
      fetchCars();
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Error adding car:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCar = (carData: any) => {
    if (!selectedCar) return;
    
    setIsSubmitting(true);
    try {
      updateCar(selectedCar.id, carData);
      fetchCars();
      setIsEditDialogOpen(false);
      setSelectedCar(null);
    } catch (error) {
      console.error("Error updating car:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCar = (id: string) => {
    try {
      deleteCar(id);
      fetchCars();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  // Format price with Euro symbol
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8 animate-fade-in">
          {/* Admin header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your vehicle inventory
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout} 
              className="mt-4 md:mt-0"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          <Tabs defaultValue="vehicles" className="mb-8">
            <TabsList>
              <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
              <TabsTrigger value="add">Add New Vehicle</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vehicles" className="space-y-6">
              {/* Search and filters */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search vehicles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Vehicle
                </Button>
              </div>

              {/* Vehicles table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCars.length > 0 ? (
                      filteredCars.map((car) => (
                        <TableRow key={car.id}>
                          <TableCell className="font-medium">
                            {car.make} {car.model}
                          </TableCell>
                          <TableCell>{formatPrice(car.price)}</TableCell>
                          <TableCell>{car.year}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={car.inStock ? "default" : "secondary"}
                              className={
                                car.inStock 
                                  ? "bg-green-500/90 hover:bg-green-500/80" 
                                  : "bg-red-500/90 hover:bg-red-500/80"
                              }
                            >
                              {car.inStock ? "In Stock" : "Sold Out"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedCar(car);
                                  setIsEditDialogOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Vehicle</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this vehicle? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteCar(car.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          No vehicles found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="add">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">Add New Vehicle</h2>
                <AdminCarForm onSubmit={handleAddCar} isSubmitting={isSubmitting} />
              </div>
            </TabsContent>
          </Tabs>

          {/* Add Vehicle Dialog */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Vehicle</DialogTitle>
                <DialogDescription>
                  Enter the details of the vehicle you want to add.
                </DialogDescription>
              </DialogHeader>
              <AdminCarForm onSubmit={handleAddCar} isSubmitting={isSubmitting} />
            </DialogContent>
          </Dialog>

          {/* Edit Vehicle Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Vehicle</DialogTitle>
                <DialogDescription>
                  Update the details of this vehicle.
                </DialogDescription>
              </DialogHeader>
              {selectedCar && (
                <AdminCarForm
                  car={selectedCar}
                  onSubmit={handleEditCar}
                  isSubmitting={isSubmitting}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
