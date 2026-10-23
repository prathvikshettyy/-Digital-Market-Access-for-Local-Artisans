export interface CraftItem {
  id: string;
  title: string;
  kannadaTitle?: string;
  category: 'Kasuti' | 'Beedu' | 'Bidri' | 'Udupi' | 'Terracotta';
  artisanName: string;
  artisanCluster: string;
  artisanAvatar: string;
  giTagNumber: string;
  price: number;
  originalPrice?: number;
  craftHours: number;
  materialDetails: string;
  purityBadge: string;
  image: string;
  storySnippet: string;
  inStock: boolean;
  motifs?: string[];
  stitches?: string[];
  blockchainStamp?: string;
}

export interface FairPriceLedger {
  craftId: string;
  totalCertifiedPrice: number;
  artisanWage: { amount: number; percentage: number; hours: number; hourlyRate: number };
  materials: { amount: number; percentage: number; description: string };
  packagingCourier: { amount: number; percentage: number; description: string };
  cooperativeFund: { amount: number; percentage: number; description: string };
}

export interface ArtisanOrder {
  orderId: string;
  craftTitle: string;
  kannadaCraftTitle?: string;
  buyerName: string;
  buyerCity: string;
  netPayout: number;
  status: 'Pack Today' | 'In Transit' | 'Delivered';
  specText: string;
  pickupTime: string;
  image: string;
  trackingId?: string;
  courierPartner?: string;
  audioGuideTitle?: string;
  audioGuideDuration?: string;
  qrPayload?: string;
}

export type Language = 'kn' | 'en' | 'hi' | 'mr';
export type AppMode = 'buyer' | 'artisan';
export type NavTab = 'bazaar' | 'story' | 'add' | 'orders';

export interface GuildMember {
  id: string;
  name: string;
  kannadaName: string;
  role: string;
  experienceYears: number;
  specialty: string;
  hamlet: string;
  avatar: string;
  activeLoomCount: number;
}
