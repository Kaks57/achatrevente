
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=3270&auto=format&fit=crop')",
          backgroundPosition: "center 30%"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/30"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6 animate-fade-in">
            Premium Vehicle Collection
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6 animate-slide-in-bottom" style={{ animationDelay: "200ms" }}>
            Discover Your Perfect Drive
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-slide-in-bottom" style={{ animationDelay: "400ms" }}>
            Explore our curated selection of premium vehicles. 
            Experience unparalleled quality, sophistication, and performance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-bottom" style={{ animationDelay: "600ms" }}>
            <Button asChild size="lg" className="group">
              <Link to="/cars" className="flex items-center">
                Browse Vehicles
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;
