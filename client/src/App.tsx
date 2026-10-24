import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CataloguePage } from './pages/CataloguePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ArtisanProfilePage } from './pages/ArtisanProfilePage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { ArtisanLoginPage } from './pages/ArtisanLoginPage';
import { ArtisanDashboardPage } from './pages/ArtisanDashboardPage';
import { AddProductPage } from './pages/AddProductPage';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import './i18n';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col font-sans selection:bg-amber-200 selection:text-amber-950">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<CataloguePage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/artisan/:id" element={<ArtisanProfilePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success/:id" element={<OrderSuccessPage />} />
                <Route path="/artisan/login" element={<ArtisanLoginPage />} />
                <Route path="/artisan/dashboard" element={<ArtisanDashboardPage />} />
                <Route path="/artisan/add-product" element={<AddProductPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
