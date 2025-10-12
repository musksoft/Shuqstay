import { assets } from "../assets/assets";
import { Button } from "../ui/button.jsx";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const navItems = [
    { id: "/", label: "Home" },
    { id: "/tenants", label: "Tenants" },
    { id: "/landlord", label: "Landlords" },
    { id: "/about", label: "About" },
  ];

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">

          {/* Left - Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-semibold text-primary">
              <img src={assets.logo} alt="Logo" className="h-9 w-auto mt-1" />
            </Link>
          </div>

          {/* Center - Navigation Links */}
          <nav className="hidden md:flex flex-1 justify-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                className={`transition-colors ${
                  location.pathname === item.id
                    ? "text-brown  font-bold"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right - Auth Buttons / Mobile Menu Button */}
          <div className="flex-shrink-0 flex items-center space-x-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="hidden md:block bg-red-600 text-white px-4 py-1 rounded-full"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="hidden md:block">
                <button className="bg-brown text-white px-4 py-1 rounded-full">
                  Login / Sign Up
                </button>
              </Link>
            )}

            {/* Mobile menu toggle button */}
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-white"
          >
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.id}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 ${
                    location.pathname === item.id
                      ? "text-primary font-medium"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 text-red-600 hover:underline"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-left py-2 text-brown font-medium"
                  >
                    Login / Sign Up
                  </button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
