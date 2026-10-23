import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
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
          <div className="min-h-screen bg-amber-50/20 text-stone-900 flex flex-col font-sans">
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
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
