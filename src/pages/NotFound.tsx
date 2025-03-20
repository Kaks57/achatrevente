
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary/30 p-6 animate-fade-in">
      <div className="text-center max-w-md">
        <div className="bg-primary/10 p-4 rounded-full inline-flex mb-6">
          <Car className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Oops! We couldn't find the page you're looking for.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/">Return Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/cars">Browse Vehicles</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
