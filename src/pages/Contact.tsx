
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Page header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Vous avez des questions sur nos véhicules ou services ? Notre équipe est là pour vous aider.
              Contactez-nous par l'un des canaux ci-dessous.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact form */}
            <div className="animate-slide-in-left">
              <div className="bg-card shadow-sm border border-border rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
                <ContactForm />
              </div>
            </div>

            {/* Contact information */}
            <div className="space-y-8 animate-slide-in-right">
              <div className="bg-primary/5 rounded-xl p-8 border border-primary/10">
                <h2 className="text-2xl font-semibold mb-6">Informations de contact</h2>
                
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Téléphone</h3>
                      <p className="text-muted-foreground">+33 1 23 45 67 89</p>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground">contact@luxuryrentalworld.com</p>
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Adresse</h3>
                      <p className="text-muted-foreground">
                        123 Avenue du Luxe<br />
                        Quartier Automobile<br />
                        Paris 75000<br />
                        France
                      </p>
                    </div>
                  </div>
                  
                  {/* Hours */}
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Heures d'ouverture</h3>
                      <p className="text-muted-foreground">
                        Lundi - Vendredi: 9h00 - 19h00<br />
                        Samedi: 10h00 - 18h00<br />
                        Dimanche: Fermé
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mb-16 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6 text-center">Nous trouver</h2>
            <div className="bg-muted rounded-xl overflow-hidden h-[400px] shadow-sm border border-border">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.95410647462!2d2.2646350475979855!3d48.85893676725246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2sus!4v1652956823962!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="LuxuryRentalWorld emplacement"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
