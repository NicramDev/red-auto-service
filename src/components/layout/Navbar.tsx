
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Truck, Settings, Tag, Clock, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useMobile from '@/hooks/use-mobile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();
  const isMobile = useMobile();
  
  // Close the mobile menu when the location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  // Determine if the current path is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-brand-600 tracking-tight">FleetManager</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'nav-link-active' : ''}`}>
              <Home className="h-4 w-4 mr-1.5" />
              <span>Dashboard</span>
            </Link>
            
            <Link to="/vehicles" className={`nav-link ${isActive('/vehicles') ? 'nav-link-active' : ''}`}>
              <Truck className="h-4 w-4 mr-1.5" />
              <span>Pojazdy</span>
            </Link>
            
            <div className="relative group">
              <button 
                className={`nav-link flex items-center ${isActive('/services') ? 'nav-link-active' : ''}`}
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                <Clock className="h-4 w-4 mr-1.5" />
                <span>Serwisy</span>
                <ChevronDown className={`ml-1 h-3 w-3 transform transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className="absolute left-0 mt-1 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <Link to="/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Lista serwisów
                  </Link>
                  <Link to="/services/new" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Dodaj serwis
                  </Link>
                </div>
              </div>
            </div>
            
            <Link to="/tags" className={`nav-link ${isActive('/tags') ? 'nav-link-active' : ''}`}>
              <Tag className="h-4 w-4 mr-1.5" />
              <span>Tagi</span>
            </Link>
            
            <Link to="/settings" className={`nav-link ${isActive('/settings') ? 'nav-link-active' : ''}`}>
              <Settings className="h-4 w-4 mr-1.5" />
              <span>Ustawienia</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-2 bg-white border-t">
            <Link to="/dashboard" className="mobile-nav-link">
              <Home className="h-5 w-5 mr-2" />
              <span>Dashboard</span>
            </Link>
            
            <Link to="/vehicles" className="mobile-nav-link">
              <Truck className="h-5 w-5 mr-2" />
              <span>Pojazdy</span>
            </Link>
            
            <button 
              className="mobile-nav-link text-left w-full flex items-center justify-between"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
            >
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>Serwisy</span>
              </div>
              <ChevronDown className={`h-4 w-4 transform transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isServicesOpen && (
              <div className="pl-8 bg-gray-50">
                <Link to="/services" className="mobile-nav-link">
                  Lista serwisów
                </Link>
                <Link to="/services/new" className="mobile-nav-link">
                  Dodaj serwis
                </Link>
              </div>
            )}
            
            <Link to="/tags" className="mobile-nav-link">
              <Tag className="h-5 w-5 mr-2" />
              <span>Tagi</span>
            </Link>
            
            <Link to="/settings" className="mobile-nav-link">
              <Settings className="h-5 w-5 mr-2" />
              <span>Ustawienia</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
