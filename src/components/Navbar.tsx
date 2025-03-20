
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Car, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isAuthenticated, isAdmin, logoutUser } from "@/utils/auth";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const admin = isAdmin();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
    closeMenu();
  };

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({ to, label }: { to: string; label: string }) => (
    <Link
      to={to}
      onClick={closeMenu}
      className={cn(
        "text-foreground/90 hover:text-foreground transition-colors relative px-3 py-2 rounded-md",
        location.pathname === to ? "font-medium" : "font-normal",
        location.pathname === to
          ? "bg-secondary"
          : "hover:bg-secondary/50"
      )}
    >
      {label}
      {location.pathname === to && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/10 rounded-full"></span>
      )}
    </Link>
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md",
        scrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold text-foreground"
          >
            <Car className="h-6 w-6" />
            <span>AutoElite</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            <NavLink to="/" label="Home" />
            <NavLink to="/cars" label="Vehicles" />
            <NavLink to="/contact" label="Contact" />
            {admin && <NavLink to="/admin" label="Admin Dashboard" />}
          </nav>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {authenticated ? (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout} 
                className="flex items-center space-x-1"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            ) : (
              <Button asChild variant="default" size="sm">
                <Link to="/login" className="flex items-center space-x-1">
                  <User className="h-4 w-4 mr-1" />
                  Admin Login
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-secondary/80 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-sm z-40 md:hidden transform transition-transform duration-300 ease-in-out pt-16",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-4 p-4">
          <Link
            to="/"
            onClick={closeMenu}
            className="p-2 hover:bg-secondary rounded-md transition-colors"
          >
            Home
          </Link>
          <Link
            to="/cars"
            onClick={closeMenu}
            className="p-2 hover:bg-secondary rounded-md transition-colors"
          >
            Vehicles
          </Link>
          <Link
            to="/contact"
            onClick={closeMenu}
            className="p-2 hover:bg-secondary rounded-md transition-colors"
          >
            Contact
          </Link>
          {admin && (
            <Link
              to="/admin"
              onClick={closeMenu}
              className="p-2 hover:bg-secondary rounded-md transition-colors"
            >
              Admin Dashboard
            </Link>
          )}
          {authenticated ? (
            <Button 
              variant="outline" 
              onClick={handleLogout} 
              className="w-full mt-4 justify-start"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          ) : (
            <Button 
              asChild 
              variant="default" 
              className="w-full mt-4 justify-start"
            >
              <Link to="/login" onClick={closeMenu}>
                <User className="h-4 w-4 mr-2" />
                Admin Login
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
