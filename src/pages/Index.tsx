
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { getCars } from "@/utils/database";
import { ChevronRight, Car, Shield, Phone } from "lucide-react";
import { Car as CarType } from "@/utils/types";

const Index = () => {
  // État pour stocker les voitures à la une
  const [featuredCars, setFeaturedCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);

  // Récupération des voitures à la une (3 dernières)
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const allCars = await getCars();
        setFeaturedCars(allCars.slice(0, 3));
      } catch (error) {
        console.error("Erreur lors de la récupération des voitures:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Section Hero */}
        <Hero />

        {/* Section Véhicules à la Une */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <span className="text-sm font-medium text-primary">Notre Collection</span>
              <h2 className="text-4xl font-bold mt-2 mb-4">Véhicules à la Une</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Découvrez notre sélection de véhicules de prestige, offrant chacun des performances exceptionnelles,
                un confort optimal et un style incomparable.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
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
            )}

            <div className="text-center animate-fade-in">
              <Button asChild size="lg" className="group">
                <Link to="/cars" className="flex items-center">
                  Voir Tous les Véhicules
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Section Pourquoi Nous Choisir */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <span className="text-sm font-medium text-primary">Pourquoi LuxuryRentalWorld</span>
              <h2 className="text-4xl font-bold mt-2 mb-4">L'Avantage LuxuryRentalWorld</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nous nous engageons à vous proposer les meilleurs véhicules et un service d'exception.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Sélection Premium */}
              <div className="bg-card p-8 rounded-xl border border-border shadow-sm animate-slide-in-bottom" style={{ animationDelay: "150ms" }}>
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Car className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sélection Premium</h3>
                <p className="text-muted-foreground">
                  Notre collection ne présente que des véhicules de la plus haute qualité, soigneusement sélectionnés pour garantir l'excellence en matière de performance et de luxe.
                </p>
              </div>

              {/* Garantie Qualité */}
              <div className="bg-card p-8 rounded-xl border border-border shadow-sm animate-slide-in-bottom" style={{ animationDelay: "300ms" }}>
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Garantie Qualité</h3>
                <p className="text-muted-foreground">
                  Chaque véhicule de notre inventaire subit une inspection et une préparation rigoureuses pour s'assurer qu'il répond à nos normes exigeantes.
                </p>
              </div>

              {/* Conseil d'Expert */}
              <div className="bg-card p-8 rounded-xl border border-border shadow-sm animate-slide-in-bottom" style={{ animationDelay: "450ms" }}>
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Phone className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Conseil d'Expert</h3>
                <p className="text-muted-foreground">
                  Notre équipe d'experts automobiles est prête à vous fournir des conseils personnalisés pour vous aider à trouver le véhicule parfait.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Appel à l'Action */}
        <section className="py-24 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 animate-fade-in">Prêt à Trouver Votre Voiture de Rêve?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "150ms" }}>
              Parcourez notre collection dès aujourd'hui ou contactez-nous pour une consultation personnalisée.
              Nos experts automobiles sont prêts à vous aider.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Button asChild size="lg" className="group">
                <Link to="/cars" className="flex items-center">
                  Explorer les Véhicules
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Nous Contacter</Link>
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
