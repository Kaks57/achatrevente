
import { useState } from "react";
import { Link } from "react-router-dom";
import { Car } from "@/utils/types";
import { cn } from "@/lib/utils";
import { Fuel, Gauge, Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CarCardProps {
  car: Car;
  className?: string;
}

const CarCard = ({ car, className }: CarCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(car.price);

  return (
    <div 
      className={cn(
        "overflow-hidden rounded-xl bg-card shadow-sm border border-border transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]",
        className
      )}
    >
      {/* Image container */}
      <div className="aspect-[16/9] overflow-hidden relative">
        {/* Loading placeholder */}
        <div 
          className={cn(
            "absolute inset-0 bg-muted animate-pulse",
            imageLoaded ? "opacity-0" : "opacity-100"
          )}
        />
        
        <img
          src={car.images[0]}
          alt={`${car.make} ${car.model}`}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        <div className="absolute top-3 right-3">
          <Badge 
            variant={car.inStock ? "default" : "secondary"}
            className={cn(
              "font-medium text-xs",
              car.inStock ? "bg-green-500/90 hover:bg-green-500/80" : "bg-red-500/90 hover:bg-red-500/80"
            )}
          >
            {car.inStock ? "In Stock" : "Sold Out"}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-semibold text-xl mb-1">
            {car.make} {car.model}
          </h3>
          <p className="text-2xl font-bold text-primary">{formattedPrice}</p>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge className="h-4 w-4" />
            <span>{car.mileage.toLocaleString()} km</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="h-4 w-4" />
            <span className="capitalize">{car.fuelType}</span>
          </div>
        </div>

        <Button asChild className="w-full mt-2 group">
          <Link to={`/cars/${car.id}`} className="flex items-center justify-center">
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CarCard;
