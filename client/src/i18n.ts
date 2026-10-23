import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const enTranslations = {
  "appName": "KalaConnect",
  "appTagline": "Coastal Artisan Marketplace",
  "home": "Home",
  "cart": "Cart",
  "artisanPortal": "Artisan Login",
  "artisanDashboard": "Artisan Dashboard",
  "logout": "Logout",
  "allCrafts": "All Crafts",
  "filterByCraft": "Filter by Craft",
  "hoursSpent": "hours spent",
  "handcraftedBy": "Handcrafted by",
  "village": "Village",
  "fairPrice": "Fair Price",
  "provenance": "Craft Provenance & Heritage",
  "technique": "Technique",
  "materials": "Materials",
  "story": "Craft Story",
  "priceBreakdown": "Fair Price Breakdown",
  "materialsCost": "Materials Cost",
  "laborEarnings": "Artisan Labor",
  "platformFee": "Co-op Fund (5%)",
  "finalPrice": "Total Fair Price",
  "addToCart": "Add to Cart",
  "buyNow": "Buy Now",
  "inStock": "in stock",
  "outOfStock": "Sold out",
  "scanProvenance": "Scan to view public craft story",
  "checkoutTitle": "Checkout & Delivery",
  "buyerName": "Full Name",
  "buyerPhone": "Phone Number",
  "deliveryAddress": "Complete Delivery Address",
  "paymentMethod": "UPI Payment",
  "payNow": "Pay via UPI",
  "mockPaymentNotice": "Demo Mode: Fake UPI transaction simulates 100% direct artisan escrow.",
  "orderSuccessTitle": "Order Placed Successfully!",
  "orderId": "Order ID",
  "orderStatus": "Status",
  "statusPlaced": "Placed",
  "statusConfirmed": "Confirmed",
  "statusShipped": "Shipped",
  "artisanLoginTitle": "Artisan Login",
  "artisanLoginSubtitle": "Enter your registered phone number & 4-digit PIN",
  "phonePlaceholder": "10-digit Phone",
  "pinPlaceholder": "4-digit PIN",
  "loginButton": "Login to My Workshop",
  "demoLogin": "Quick Demo Login",
  "addProduct": "+ Add New Craft",
  "myProducts": "My Crafts",
  "incomingOrders": "Incoming Orders",
  "totalEarned": "Total Earnings",
  "markConfirmed": "Confirm Order",
  "markShipped": "Mark as Shipped",
  "craftTitle": "Craft Title",
  "selectCraftType": "Craft Category",
  "hoursInvested": "Hours Invested",
  "materialsCostInput": "Raw Materials Cost (₹)",
  "suggestPriceBtn": "Auto-Calculate Fair Price",
  "suggestedPriceNote": "Calculates fair hourly artisan wage (₹80/hr) + materials + fund",
  "uploadPhoto": "Upload Craft Photo / Camera",
  "submitProduct": "Publish Craft to Marketplace"
};

const resources = {
  en: {
    translation: enTranslations
  },
  kn: {
    translation: enTranslations
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
