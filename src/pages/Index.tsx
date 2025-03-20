
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { getCars } from "@/utils/database";
import { ChevronRight, Car, Shield, Phone } from "lucide-react";

const Index = () => {
  // Get featured cars (latest 3)
  const featuredCars = getCars().slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Featured Vehicles Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <span className="text-sm font-medium text-primary">Our Collection</span>
              <h2 className="text-4xl font-bold mt-2 mb-4">Featured Vehicles</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our handpicked selection of premium vehicles, each offering exceptional
                performance, comfort, and style.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredCars.map((car, index) => (
                <div 
                  key={car.id} 
                  className="animate-scale-in" 
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CarCard car={car} />
                </div>
              ))}
            </div>

            <div className="text-center animate-fade-in">
              <Button asChild size="lg" className="group">
                <Link to="/cars" className="flex items-center">
                  View All Vehicles
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <span className="text-sm font-medium text-primary">Why AutoElite</span>
              <h2 className="text-4xl font-bold mt-2 mb-4">The AutoElite Advantage</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're committed to providing you with the finest vehicles and exceptional service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Premium Selection */}
              <div className="bg-card p-8 rounded-xl border border-border shadow-sm animate-slide-in-bottom" style={{ animationDelay: "150ms" }}>
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Car className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Premium Selection</h3>
                <p className="text-muted-foreground">
                  Our collection features only the highest quality vehicles, carefully selected to ensure excellence in performance and luxury.
                </p>
              </div>

              {/* Quality Guarantee */}
              <div className="bg-card p-8 rounded-xl border border-border shadow-sm animate-slide-in-bottom" style={{ animationDelay: "300ms" }}>
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quality Guarantee</h3>
                <p className="text-muted-foreground">
                  Every vehicle in our inventory undergoes rigorous inspection and preparation to ensure it meets our exacting standards.
                </p>
              </div>

              {/* Expert Consultation */}
              <div className="bg-card p-8 rounded-xl border border-border shadow-sm animate-slide-in-bottom" style={{ animationDelay: "450ms" }}>
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Phone className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Expert Consultation</h3>
                <p className="text-muted-foreground">
                  Our team of automotive experts is ready to provide personalized guidance to help you find the perfect vehicle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 animate-fade-in">Ready to Find Your Dream Car?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "150ms" }}>
              Browse our collection today or contact us for a personalized consultation.
              Our automotive experts are ready to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Button asChild size="lg" className="group">
                <Link to="/cars" className="flex items-center">
                  Explore Vehicles
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
