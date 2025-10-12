import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tenants from './pages/Tenants';
import Landlord from './pages/Landlord';
import About from './pages/About';
import Login from './pages/Login';
import LandlordAdmin from './pages/LandlordAdmin';
import TenantPanel from './pages/TenantPanel';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  const handleNavigate = (path) => {
    window.location.href = `/${path}`;
  };

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/landlord" element={<Landlord />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/landlordadmin" element={<LandlordAdmin />} />
          <Route path="/tenantpanel" element={<TenantPanel />} />
          <Route path="/adminpanel" element={<AdminPanel />} />

        </Routes>

        <footer className="bg-brown text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className='font-italiana text-4xl'>ShuqStay</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Your trusted partner in finding the perfect rental property.
                </p>
              </div>
              <div>
                <h4 className='font-bold text-[1.2rem] mb-2'>For Renters</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <button onClick={() => handleNavigate('tenants')} className="hover:text-foreground">
                      Tenant Resources
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavigate('')} className="hover:text-foreground">
                      Browse Properties
                    </button>
                  </li>
                  <li>Rental Calculator</li>
                </ul>
              </div>
              <div>
                <h4 className='font-bold text-[1.2rem] mb-2'>For Landlords</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <button onClick={() => handleNavigate('landlord')} className="hover:text-foreground">
                      List Property
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavigate('landlord')} className="hover:text-foreground">
                      Landlord Tools
                    </button>
                  </li>
                  <li>Property Management</li>
                </ul>
              </div>
              <div>
                <h4 className='font-bold text-[1.2rem] mb-2'>Support</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <button onClick={() => handleNavigate('about')} className="hover:text-foreground">
                      About Us
                    </button>
                  </li>
                  <li>Help Center</li>
                  <li>Contact Us</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full bg-brown_200 text-center text-black font-bold py-4 text-sm text-muted-foreground">
            Designed By Muskan Nisar Ahmed Shaikh © 2025 ShuqStay | All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}
