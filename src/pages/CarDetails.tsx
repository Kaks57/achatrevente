
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCarById } from "@/utils/database";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Car } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Fuel, 
  Gauge, 
  Calendar, 
  ArrowLeft, 
  Check, 
  Phone,
  Mail 
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "contact">("details");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      const fetchCar = async () => {
        try {
          const fetchedCar = await getCarById(id);
          if (fetchedCar) {
            setCar(fetchedCar);
          }
          setLoading(false);
        } catch (error) {
          console.error("Erreur lors du chargement du véhicule:", error);
          setLoading(false);
        }
      };
      
      fetchCar();
    }
  }, [id]);

  // Format price with Euro symbol
  const formattedPrice = car
    ? new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(car.price)
    : "";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Vehicle Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The vehicle you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/cars">Back to Vehicles</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8 animate-fade-in">
          {/* Back button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Vehicles
          </Button>

          {/* Vehicle info section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left column - Images and info */}
            <div className="lg:col-span-3 space-y-8">
              {/* Image carousel */}
              <div className="rounded-xl overflow-hidden border border-border shadow-sm bg-card">
                <Carousel className="w-full">
                  <CarouselContent>
                    {car.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <div className="aspect-[16/9] bg-muted relative overflow-hidden rounded-lg">
                            <img
                              src={image}
                              alt={`${car.make} ${car.model} - Image ${index + 1}`}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </Carousel>
              </div>

              {/* Tabs */}
              <div className="border-b border-border">
                <div className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab("details")}
                    className={`pb-3 font-medium border-b-2 transition-colors ${
                      activeTab === "details"
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Vehicle Details
                  </button>
                  <button
                    onClick={() => setActiveTab("contact")}
                    className={`pb-3 font-medium border-b-2 transition-colors ${
                      activeTab === "contact"
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Contact Us
                  </button>
                </div>
              </div>

              {/* Tab content */}
              <div className="animate-fade-in">
                {activeTab === "details" ? (
                  <div className="space-y-8">
                    {/* Description */}
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Description</h3>
                      <p className="text-muted-foreground">{car.description}</p>
                    </div>

                    {/* Features list */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Features & Equipment</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                        {car.features.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="bg-secondary/50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Interested in this {car.make} {car.model}?</h3>
                      <p className="text-muted-foreground mb-6">
                        Fill out the form below and our team will get back to you shortly regarding this vehicle.
                      </p>
                      <ContactForm carId={car.id} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right column - Summary and contact */}
            <div className="lg:col-span-2 space-y-6">
              {/* Vehicle summary card */}
              <div className="rounded-xl overflow-hidden border border-border shadow-sm bg-card p-6 sticky top-20">
                <div className="space-y-4">
                  <div>
                    <Badge 
                      variant={car.inStock ? "default" : "secondary"}
                      className={`mb-2 ${
                        car.inStock 
                          ? "bg-green-500/90 hover:bg-green-500/80" 
                          : "bg-red-500/90 hover:bg-red-500/80"
                      }`}
                    >
                      {car.inStock ? "In Stock" : "Sold Out"}
                    </Badge>
                    <h1 className="text-2xl font-bold">
                      {car.make} {car.model}
                    </h1>
                    <div className="mt-2 text-3xl font-bold text-primary">
                      {formattedPrice}
                    </div>
                  </div>

                  <Separator />

                  {/* Vehicle specs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-muted-foreground text-sm">Year</span>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{car.year}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm">Mileage</span>
                      <div className="flex items-center mt-1">
                        <Gauge className="h-4 w-4 mr-2" />
                        <span>{car.mileage.toLocaleString()} km</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm">Fuel</span>
                      <div className="flex items-center mt-1">
                        <Fuel className="h-4 w-4 mr-2" />
                        <span className="capitalize">{car.fuelType}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm">Transmission</span>
                      <div className="flex items-center mt-1">
                        <span className="capitalize">{car.transmission}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm">Color</span>
                      <div className="flex items-center mt-1">
                        <span>{car.color}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Contact options */}
                  <div className="space-y-4">
                    <Button
                      className="w-full flex items-center justify-center"
                      onClick={() => setActiveTab("contact")}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Inquire Now
                    </Button>
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      <Phone className="h-4 w-4 mr-2" />
                      +33 1 23 45 67 89
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CarDetails;
