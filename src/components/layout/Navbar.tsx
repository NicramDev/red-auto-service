
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Car, Wrench, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all-300',
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-md py-2' 
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-brand-600 text-white">
            <Wrench className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-brand-600">ConsTrack</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" icon={<Home className="h-4 w-4" />} label="Dashboard" />
          <NavLink to="/vehicles" icon={<Car className="h-4 w-4" />} label="Pojazdy" />
          <NavLink to="/services" icon={<Wrench className="h-4 w-4" />} label="Serwisy" />
          
          <Link 
            to="/vehicles/new" 
            className="ml-2 px-4 py-2 rounded-full brand-gradient transition-transform-300 hover:shadow-md hover:scale-105"
          >
            Dodaj Pojazd
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center justify-center h-10 w-10 rounded-full bg-gray-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 text-gray-700" />
          ) : (
            <Menu className="h-5 w-5 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 pt-20 transition-transform-300 md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col p-5 gap-2">
          <MobileNavLink to="/" icon={<Home className="h-5 w-5" />} label="Dashboard" />
          <MobileNavLink to="/vehicles" icon={<Car className="h-5 w-5" />} label="Pojazdy" />
          <MobileNavLink to="/services" icon={<Wrench className="h-5 w-5" />} label="Serwisy" />
          
          <Link 
            to="/vehicles/new" 
            className="mt-4 py-3 rounded-lg brand-gradient text-center"
          >
            Dodaj Pojazd
          </Link>
        </nav>
      </div>
    </header>
  );
};

// Desktop Nav Link
const NavLink = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to !== '/' && location.pathname.startsWith(to));

  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-1.5 py-1 px-3 rounded-full text-sm font-medium transition-all-300",
        isActive 
          ? "bg-brand-50 text-brand-600" 
          : "text-gray-600 hover:text-brand-600 hover:bg-gray-50"
      )}
    >
      {icon}
      {label}
    </Link>
  );
};

// Mobile Nav Link
const MobileNavLink = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to !== '/' && location.pathname.startsWith(to));

  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-3 py-3 px-4 rounded-lg text-base font-medium transition-all-300",
        isActive 
          ? "bg-brand-50 text-brand-600" 
          : "text-gray-600 hover:bg-gray-100"
      )}
    >
      {icon}
      {label}
    </Link>
  );
};

export default Navbar;
