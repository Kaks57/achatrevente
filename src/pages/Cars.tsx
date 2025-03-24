
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { getCars } from "@/utils/database";
import { Car } from "@/utils/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, SlidersHorizontal, X } from "lucide-react";

const Cars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [make, setMake] = useState<string>("all");
  const [fuelType, setFuelType] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [yearRange, setYearRange] = useState<[number, number]>([1990, new Date().getFullYear() + 1]);
  
  // Get unique makes for filter
  const uniqueMakes = [...new Set(cars.map((car) => car.make))].sort();
  
  // Price limits
  const minPrice = 0;
  const maxPrice = 200000;
  
  // Year limits
  const minYear = 1990;
  const maxYear = new Date().getFullYear() + 1;

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Fetch all cars
    const fetchAllCars = async () => {
      try {
        const fetchedCars = await getCars();
        setCars(fetchedCars);
        setFilteredCars(fetchedCars);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des véhicules:", error);
        setLoading(false);
      }
    };
    
    fetchAllCars();
  }, []);

  // Apply filters
  useEffect(() => {
    // First filter by search term
    let results = cars.filter((car) => {
      const searchValue = searchTerm.toLowerCase();
      return (
        car.make.toLowerCase().includes(searchValue) ||
        car.model.toLowerCase().includes(searchValue) ||
        `${car.make} ${car.model}`.toLowerCase().includes(searchValue)
      );
    });

    // Then apply other filters
    if (make !== "all") {
      results = results.filter((car) => car.make === make);
    }

    if (fuelType !== "all") {
      results = results.filter((car) => car.fuelType === fuelType);
    }

    results = results.filter(
      (car) => car.price >= priceRange[0] && car.price <= priceRange[1]
    );

    results = results.filter(
      (car) => car.year >= yearRange[0] && car.year <= yearRange[1]
    );

    // Sort by newest vehicles first
    results.sort((a, b) => b.year - a.year);

    setFilteredCars(results);
  }, [cars, searchTerm, make, fuelType, priceRange, yearRange]);

  const resetFilters = () => {
    setMake("all");
    setFuelType("all");
    setPriceRange([minPrice, maxPrice]);
    setYearRange([minYear, maxYear]);
    setSearchTerm("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Page header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">Our Vehicle Collection</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our diverse range of premium vehicles. Each one has been carefully selected 
              to ensure exceptional quality and performance.
            </p>
          </div>

          {/* Search and filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4 animate-slide-in-bottom">
              {/* Search box */}
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search by make or model..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Filter toggle button */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                {showFilters ? <X className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>

            {/* Filters panel */}
            {showFilters && (
              <div className="bg-card border border-border rounded-lg p-6 mb-6 animate-fade-in">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <h3 className="text-lg font-semibold mb-2 md:mb-0">Filter Vehicles</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-muted-foreground"
                  >
                    Reset All
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Make filter */}
                  <div className="space-y-2">
                    <Label htmlFor="make">Make</Label>
                    <Select value={make} onValueChange={setMake}>
                      <SelectTrigger id="make">
                        <SelectValue placeholder="All Makes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Makes</SelectItem>
                        {uniqueMakes.map((make) => (
                          <SelectItem key={make} value={make}>
                            {make}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Fuel type filter */}
                  <div className="space-y-2">
                    <Label htmlFor="fuelType">Fuel Type</Label>
                    <Select value={fuelType} onValueChange={setFuelType}>
                      <SelectTrigger id="fuelType">
                        <SelectValue placeholder="All Fuel Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Fuel Types</SelectItem>
                        <SelectItem value="petrol">Petrol</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price range filter */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Price Range</Label>
                      <span className="text-sm text-muted-foreground">
                        €{priceRange[0].toLocaleString()} - €{priceRange[1].toLocaleString()}
                      </span>
                    </div>
                    <Slider
                      min={minPrice}
                      max={maxPrice}
                      step={5000}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="py-4"
                    />
                  </div>

                  {/* Year range filter */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Year</Label>
                      <span className="text-sm text-muted-foreground">
                        {yearRange[0]} - {yearRange[1]}
                      </span>
                    </div>
                    <Slider
                      min={minYear}
                      max={maxYear}
                      step={1}
                      value={yearRange}
                      onValueChange={(value) => setYearRange(value as [number, number])}
                      className="py-4"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results count */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center animate-fade-in">
            <p className="text-muted-foreground mb-2 sm:mb-0">
              Showing {filteredCars.length} {filteredCars.length === 1 ? "vehicle" : "vehicles"}
            </p>
          </div>

          {/* Cars grid */}
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredCars.map((car, index) => (
                <div 
                  key={car.id} 
                  className="animate-scale-in" 
                  style={{ animationDelay: `${(index % 6) * 100}ms` }}
                >
                  <CarCard car={car} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <div className="text-3xl font-semibold mb-4">No vehicles found</div>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or filters to find vehicles.
              </p>
              <Button onClick={resetFilters}>Reset All Filters</Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cars;
