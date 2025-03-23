
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // For demo purposes, we'll assume the user is not logged in initially
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle auth state (just for demo)
  const toggleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav 
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        {
          'bg-transparent': !isScrolled && location.pathname === '/',
          'bg-white shadow-md': isScrolled || location.pathname !== '/'
        }
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className={cn(
                'text-2xl font-bold transition-colors duration-300',
                {
                  'text-white': !isScrolled && location.pathname === '/',
                  'text-travely-blue': isScrolled || location.pathname !== '/'
                }
              )}
            >
              Travely
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={cn(
                "transition-colors duration-300",
                (!isScrolled && location.pathname === '/') ? 'nav-link' : 'text-gray-700 hover:text-travely-blue'
              )}
            >
              Home
            </Link>
            <Link 
              to="/reservations" 
              className={cn(
                "transition-colors duration-300",
                (!isScrolled && location.pathname === '/') ? 'nav-link' : 'text-gray-700 hover:text-travely-blue'
              )}
            >
              Reservations
            </Link>
            <Link 
              to="/contact" 
              className={cn(
                "transition-colors duration-300",
                (!isScrolled && location.pathname === '/') ? 'nav-link' : 'text-gray-700 hover:text-travely-blue'
              )}
            >
              Contact Us
            </Link>
            
            {isLoggedIn ? (
              <div className="relative group">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 focus:outline-none" 
                  aria-label="User profile"
                >
                  <div className="h-8 w-8 rounded-full bg-travely-blue text-white flex items-center justify-center">
                    <User size={18} />
                  </div>
                </Link>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                  <Link 
                    to="/reservations" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Reservations
                  </Link>
                  <button 
                    onClick={toggleAuth}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link 
                  to="/login" 
                  className={cn(
                    "py-2 px-4 rounded-md transition-all duration-300",
                    (!isScrolled && location.pathname === '/') 
                      ? 'text-white border border-white hover:bg-white hover:text-travely-blue' 
                      : 'text-travely-blue border border-travely-blue hover:bg-travely-blue hover:text-white'
                  )}
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className={cn(
                    "py-2 px-4 rounded-md transition-all duration-300",
                    (!isScrolled && location.pathname === '/') 
                      ? 'bg-white text-travely-blue hover:bg-opacity-90' 
                      : 'bg-travely-blue text-white hover:bg-travely-dark-blue'
                  )}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-2 rounded-md focus:outline-none",
                (!isScrolled && location.pathname === '/') ? 'text-white' : 'text-gray-700'
              )}
            >
              {mobileMenuOpen ? 
                <X className="h-6 w-6" /> : 
                <Menu className="h-6 w-6" />
              }
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          mobileMenuOpen ? "max-h-64" : "max-h-0"
        )}
      >
        <div className="bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            to="/" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/reservations" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Reservations
          </Link>
          <Link 
            to="/contact" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact Us
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link 
                to="/profile" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Profile
              </Link>
              <button 
                onClick={() => {
                  toggleAuth();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex space-x-2 px-3 pt-2">
              <Link 
                to="/login" 
                className="flex-1 py-2 text-center rounded-md border border-travely-blue text-travely-blue"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="flex-1 py-2 text-center rounded-md bg-travely-blue text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
