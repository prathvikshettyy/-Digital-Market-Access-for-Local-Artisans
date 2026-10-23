export interface Artisan {
  id: number;
  name: string;
  village: string;
  phone: string;
  bio?: string;
  photo?: string;
  products?: Product[];
}

export interface Product {
  id: number;
  artisan_id: number;
  title: string;
  craft: string;
  price: number;
  stock: number;
  story?: string;
  technique?: string;
  materials?: string;
  hours: number;
  image: string;
  created_at?: string;
  artisan_name?: string;
  artisan_village?: string;
  artisan_photo?: string;
  artisan_bio?: string;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface OrderItem {
  id?: number;
  order_id?: number;
  product_id: number;
  product_title?: string;
  product_image?: string;
  product_craft?: string;
  qty: number;
  price: number;
  item_price?: number;
}

export interface Order {
  id: number;
  buyer_name: string;
  buyer_phone: string;
  address: string;
  total: number;
  status: 'placed' | 'confirmed' | 'shipped';
  created_at: string;
  items?: OrderItem[];
}

export interface ArtisanOrderItem {
  order_id: number;
  buyer_name: string;
  buyer_phone: string;
  address: string;
  order_status: 'placed' | 'confirmed' | 'shipped';
  created_at: string;
  item_id: number;
  qty: number;
  item_price: number;
  product_id: number;
  product_title: string;
  product_image: string;
  product_craft: string;
}

export interface PriceSuggestion {
  suggested_price: number;
  breakdown: {
    materials: number;
    labor: number;
    hourly_rate: number;
    hours: number;
    platform_margin: number;
    total: number;
  };
}
