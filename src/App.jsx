import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import AIAnalyzer from './pages/AIAnalyzer';
import Marketplace from './pages/Marketplace';
import ProductDetails from './pages/ProductDetails';
import Doctors from './pages/Doctors';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
              <Navbar />
              <CartDrawer />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/analyze" element={<AIAnalyzer />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                  <Route path="/doctors" element={<Doctors />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/checkout" element={<Checkout />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
