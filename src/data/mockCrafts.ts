import { CraftItem, FairPriceLedger, ArtisanOrder, GuildMember } from '../types/craft';

export const MOCK_CRAFTS: CraftItem[] = [
  {
    id: 'craft-kasuti-01',
    title: 'Hand-embroidered Kasuti Pallu Saree',
    kannadaTitle: 'ಕೈಕಸೂತಿ ಪಲ್ಲೂರೇಷ್ಮೆ ಸೀರೆ',
    category: 'Kasuti',
    artisanName: 'Rukmini Bai & Guild',
    artisanCluster: 'Dharwad • Hubballi Rural',
    artisanAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
    giTagNumber: 'GI #143 (Govt. of India)',
    price: 3850,
    originalPrice: 4500,
    craftHours: 42,
    materialDetails: 'Handspun organic Kora cotton, natural fermented indigo & turmeric silk threads',
    purityBadge: '100% Direct to Maker • Knotless Reversible',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
    storySnippet: 'Counted-thread needlework featuring sacred Gopura and Ratha motifs. Created without tracing or knots, with mirror finish on both sides.',
    inStock: true,
    motifs: ['Gopura (Temple Tower)', 'Ratha (Sacred Chariot)', 'Mayura (Peacock)', 'Kamala (Lotus)'],
    stitches: ['Gavanti (Double running)', 'Murgi (Zigzag ladder)', 'Negi (Weaving)', 'Menthi (Cross stitch)'],
    blockchainStamp: 'KAS-2024-DHW-089'
  },
  {
    id: 'craft-beedu-02',
    title: 'Traditional Beedu Wild Palm Storage Basket',
    kannadaTitle: 'ಬೀಡು ಕಾಡುತಾಳೆ ಹಸ್ತ ಹೆಣಿಗೆ ಬುಟ್ಟಿ',
    category: 'Beedu',
    artisanName: 'Devamma Poojarthi',
    artisanCluster: 'Kundapura • Coondapur Coast',
    artisanAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80',
    giTagNumber: 'Coastal Craft Registry #KA-KND-08',
    price: 720,
    originalPrice: 850,
    craftHours: 16,
    materialDetails: 'Forest-foraged wild date palm leaves, sun-dried & smoke-cured, zero plastic',
    purityBadge: '100% Biodegradable • Rainforest Wild Foraged',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=900&q=80',
    storySnippet: 'Hand-split palm ribs tightly intertwined to repel moisture. Stays naturally aromatic and insect-resistant for decades.',
    inStock: true,
    motifs: ['Jenu Koodu (Honeycomb)', 'Kere Alé (Lake Ripple)'],
    stitches: ['Tri-rib interlock', 'Reinforced rim loop'],
    blockchainStamp: 'BDU-2024-KND-034'
  },
  {
    id: 'craft-kasuti-03',
    title: 'Kasuti Motif Cushion Covers (Pair)',
    kannadaTitle: 'ಕಸೂತಿ ರಥ ಮೋಟಿಫ್ ದಿಂಬಿನ ಕವರ್ ಜೋಡಿ',
    category: 'Kasuti',
    artisanName: 'Gangamma H.',
    artisanCluster: 'Garag Hamlet • Dharwad',
    artisanAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=160&q=80',
    giTagNumber: 'GI #143 Certified',
    price: 1200,
    originalPrice: 1450,
    craftHours: 19,
    materialDetails: 'Pure unbleached Kora linen cloth with heritage vegetable-dyed floss',
    purityBadge: 'Badami Chariot Geometry • 100% Direct Pay',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80',
    storySnippet: 'Depicts the architectural chariot of the Badami Chalukyas, stitched thread-by-thread without marking tools.',
    inStock: true,
    motifs: ['Chalukya Chariot', 'Tulsi Vrindavan'],
    stitches: ['Gavanti', 'Negi'],
    blockchainStamp: 'KAS-2024-GRG-112'
  },
  {
    id: 'craft-beedu-04',
    title: 'Sun-dried Palm Pouch with Brass Charm',
    kannadaTitle: 'ಹಿತ್ತಾಳೆ ಗಂಟಿನ ತಾಳೆ ಗರಿ ಪರ್ಸ್',
    category: 'Beedu',
    artisanName: 'Saraswati Shetty',
    artisanCluster: 'Padubidri • Udupi Coast',
    artisanAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    giTagNumber: 'Coastal Craft Reg #KA-UDP-91',
    price: 450,
    originalPrice: 550,
    craftHours: 6,
    materialDetails: 'Tender palmyra fronds, natural wild madder tint, cast temple brass bell charm',
    purityBadge: 'Forest Foraged • Hand Split',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=900&q=80',
    storySnippet: 'Compact travel clutch woven by seaside tribal fisherfolk women during monsoon off-seasons.',
    inStock: true,
    motifs: ['Kadalu Alé (Ocean Wave)'],
    stitches: ['Diagonal herringbone'],
    blockchainStamp: 'BDU-2024-UDP-045'
  },
  {
    id: 'craft-bidri-05',
    title: 'Bidriware Floral Silver Inlay Trinket Box',
    kannadaTitle: 'ಬಿದ್ರಿ ಕಲೆ ಬೆಳ್ಳಿಯ ಕೆತ್ತನೆ ಪೆಟ್ಟಿಗೆ',
    category: 'Bidri',
    artisanName: 'Mohammed Rauf (Master Ustad)',
    artisanCluster: 'Old Fort • Bidar Deccan',
    artisanAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    giTagNumber: 'GI #21 Certified (Bidriware)',
    price: 2100,
    originalPrice: 2600,
    craftHours: 28,
    materialDetails: 'Zinc-copper alloy blackened with Bidar fort clay, 99.9% fine silver wire inlay',
    purityBadge: 'Pure Silver Wire • 4-Step Kiln Oxidation',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=900&q=80',
    storySnippet: 'Charcoal blackened alloy hand-carved with chisel and hammered with pure silver wire in Persian floral Arabesque motifs.',
    inStock: true,
    motifs: ['Phul-jhadi (Floral spray)', 'Mehraab (Deccan Arch)'],
    stitches: ['Tarkashi (Wire inlay)', 'Meenakari burnishing'],
    blockchainStamp: 'BDR-2024-DEC-067'
  },
  {
    id: 'craft-udupi-06',
    title: 'Udupi Pure Malnad Kora Handloom Saree',
    kannadaTitle: 'ಉಡುಪಿ ಶುದ್ಧ ಮಲ್ನಾಡ್ ಕೋರಾ ಕೈಮಗ್ಗ ಸೀರೆ',
    category: 'Udupi',
    artisanName: 'Sanjeeva Shettigar & Guild',
    artisanCluster: 'Talipady Weavers Society • Udupi',
    artisanAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    giTagNumber: 'GI #31 (Udupi Sarees)',
    price: 2800,
    originalPrice: 3200,
    craftHours: 32,
    materialDetails: '80s combed unbleached cotton yarn, natural arecanut & wild indigo dye borders',
    purityBadge: 'Fly-Shuttle Pit Loom • Malnad Weavers Society',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80',
    storySnippet: 'Hand-sized with wild tapioca paste before weaving on traditional Malnad pit looms for ultra-breathable coastal drape.',
    inStock: true,
    motifs: ['Temple Buttalu (Borders)', 'Malnad Bamboo Stripe'],
    stitches: ['Dobby dobby weave', 'Two-pedal tie-up'],
    blockchainStamp: 'UDP-2024-WVR-201'
  }
];

export const MOCK_LEDGERS: Record<string, FairPriceLedger> = {
  'craft-kasuti-01': {
    craftId: 'craft-kasuti-01',
    totalCertifiedPrice: 3850,
    artisanWage: {
      amount: 2400,
      percentage: 62,
      hours: 38,
      hourlyRate: 63
    },
    materials: {
      amount: 950,
      percentage: 25,
      description: 'Azo-free plant dyed floss, handspun Kora silk-cotton'
    },
    packagingCourier: {
      amount: 300,
      percentage: 8,
      description: 'Handmade banana-stem fiber box & insured Speed Post'
    },
    cooperativeFund: {
      amount: 200,
      percentage: 5,
      description: 'Hamlets child health & younger needlewomen apprenticeship'
    }
  },
  'craft-beedu-02': {
    craftId: 'craft-beedu-02',
    totalCertifiedPrice: 720,
    artisanWage: {
      amount: 490,
      percentage: 68,
      hours: 14,
      hourlyRate: 35
    },
    materials: {
      amount: 110,
      percentage: 15,
      description: 'Forest-foraged date palm fronds & curing smoke'
    },
    packagingCourier: {
      amount: 70,
      percentage: 10,
      description: 'Recycled corrugated wrapping'
    },
    cooperativeFund: {
      amount: 50,
      percentage: 7,
      description: 'Coastal coastal wetland conservation fund'
    }
  }
};

export const MOCK_GUILD_MEMBERS: GuildMember[] = [
  {
    id: 'artisan-savitri',
    name: 'Savitri Akka',
    kannadaName: 'ಸಾವಿತ್ರಿ ಅಕ್ಕ',
    role: 'Master Kasuti Custodian',
    experienceYears: 28,
    specialty: 'Sacred Gopura & 5-tier Ratha Motifs',
    hamlet: 'Narendra Village, Dharwad',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    activeLoomCount: 3
  },
  {
    id: 'artisan-gangamma',
    name: 'Gangamma H.',
    kannadaName: 'ಗಂಗಮ್ಮ ಎಚ್.',
    role: 'Mayura Specialist',
    experienceYears: 19,
    specialty: 'Fine Peacock Feather Geometry',
    hamlet: 'Garag Hamlet, Dharwad',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80',
    activeLoomCount: 2
  },
  {
    id: 'artisan-devamma',
    name: 'Devamma H.',
    kannadaName: 'ದೇವಮ್ಮ ಹೆಚ್.',
    role: 'Guild Elder & Natural Dye Guardian',
    experienceYears: 36,
    specialty: 'Knotless Reverse Inspection',
    hamlet: 'Navalur Cluster, Dharwad',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    activeLoomCount: 4
  },
  {
    id: 'artisan-rukmini',
    name: 'Rukmini Bai',
    kannadaName: 'ರುಕ್ಮಿಣಿ ಬಾಯಿ',
    role: 'Folk Balladeer & Master Mentor',
    experienceYears: 22,
    specialty: 'Loom Chants & Menthi Needlework',
    hamlet: 'Kelageri Guild, Dharwad',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    activeLoomCount: 5
  }
];

export const MOCK_ORDERS: ArtisanOrder[] = [
  {
    orderId: 'HK-4821',
    craftTitle: 'Kasuti Chariot Motif Dupatta',
    kannadaCraftTitle: 'ಕಸೂತಿ ರಥ ದುಪಟ್ಟಾ (ಬೆಂಗಳೂರು)',
    buyerName: 'Ananya S.',
    buyerCity: 'Bengaluru, Karnataka',
    netPayout: 2400,
    status: 'Pack Today',
    specText: 'Pure Kora Silk Cotton 2.5m • Speed Post pickup at 4:00 PM today',
    pickupTime: 'Today at 4:00 PM',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
    trackingId: 'IP-SPEED-KA-883921',
    courierPartner: 'India Post Speed Post Hub',
    audioGuideTitle: 'ಆಡಿಯೋ ಪ್ಯಾಕಿಂಗ್ ವಿವರಣೆ (42s Guide)',
    audioGuideDuration: '0:42',
    qrPayload: 'HASTAKAR-WAYBILL-HK4821-INDIAPOST-SPEEDPOST-PAYOUT-2400'
  },
  {
    orderId: 'HK-4809',
    craftTitle: 'Beedu Woven Palm Bread Basket',
    kannadaCraftTitle: 'ಬೀಡು ತಾಳೆ ಬ್ರೆಡ್ ಬುಟ್ಟಿ (ಮುಂಬೈ)',
    buyerName: 'Vikram R.',
    buyerCity: 'Mumbai, Maharashtra',
    netPayout: 850,
    status: 'In Transit',
    specText: 'Natural wild palm with neem bark curing • Hubballi Sort Centre hub',
    pickupTime: 'Dispatched Yesterday',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=400&q=80',
    trackingId: 'IP-SPEED-KA-883719',
    courierPartner: 'India Post Speed Post',
    audioGuideTitle: 'ರವಾನೆ ಸ್ಥಿತಿ ಪರಿಶೀಲನೆ (25s Guide)',
    audioGuideDuration: '0:25',
    qrPayload: 'HASTAKAR-WAYBILL-HK4809-TRANSIT-HUBBALLI'
  },
  {
    orderId: 'HK-4795',
    craftTitle: 'Bidri Silver Inlay Coaster Set',
    kannadaCraftTitle: 'ಬಿದ್ರಿ ಬೆಳ್ಳಿ ಕೆತ್ತನೆ ಕೋಸ್ಟರ್ ಸೆಟ್ (ಮೈಸೂರು)',
    buyerName: 'Karthik M.',
    buyerCity: 'Mysuru, Karnataka',
    netPayout: 1650,
    status: 'Delivered',
    specText: 'Delivered successfully • Funds 100% credited to Canara Bank UPI',
    pickupTime: 'Delivered on Oct 21',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80',
    trackingId: 'IP-DELIV-KA-883100',
    courierPartner: 'India Post Speed Post',
    audioGuideTitle: 'ಹಣ ಜಮಾ ವಿವರಣೆ (18s Guide)',
    audioGuideDuration: '0:18',
    qrPayload: 'HASTAKAR-WAYBILL-HK4795-DELIVERED-CREDITED'
  }
];

export const VERNACULAR_TRANSLATIONS = {
  kn: {
    appName: 'ಹಸ್ತಕಾರ',
    appTagline: 'ಕ್ರಾಫ್ಟ್ ಸ್ಯಾಂಕ್ಚುರಿ • ಪ್ರಾಮಾಣಿಕ ನೇರ ವ್ಯಾಪಾರ',
    bazaar: 'ಬಜಾರ್',
    heritage: 'ಪರಂಪರೆ',
    addCraft: 'ಕ್ರಾಫ್ಟ್ ಸೇರಿಸಿ',
    orders: 'ಆದೇಶ & ಗಳಿಕೆ',
    buyerMode: 'ಖರೀದಿದಾರ',
    artisanMode: 'ಕುಶಲಕರ್ಮಿ (ವಿಕ್ರೇತ)',
    giCertified: 'ಜಿ.ಐ ಮಾನ್ಯತೆ ಪ್ರಮಾಣಿತ',
    directWageNotice: 'ಶೇ. 100 ನೇರ ಬ್ಯಾಂಕ್ ಜಮೆ • ಶೂನ್ಯ ಕಮಿಷನ್',
    listenAudio: 'ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ',
    filterAll: 'ಎಲ್ಲಾ ಕರಕುಶಲ',
    hoursLabor: 'ಗಂಟೆಗಳ ಕೈಕೆಲಸ',
    viewLineage: 'ಪರಂಪರೆ ವೀಕ್ಷಿಸಿ',
    fairPriceBreakdown: 'ಪ್ರಾಮಾಣಿಕ ಬೆಲೆ ವಿವರಣೆ (ಲೆಡ್ಜರ್)',
    commissionNow: 'ನೇರವಾಗಿ ಕಮಿಷನ್ ಮಾಡಿ',
    packToday: 'ಇಂದು ಪ್ಯಾಕ್ ಮಾಡಿ',
    inTransit: 'ದಾರಿಯಲ್ಲಿದೆ',
    delivered: 'ತಲುಪಿದೆ'
  },
  en: {
    appName: 'Hastakar',
    appTagline: 'Tactile Provenance & Craft Sanctuary',
    bazaar: 'Bazaar',
    heritage: 'Heritage',
    addCraft: 'Add Craft',
    orders: 'Orders & Ledger',
    buyerMode: 'Buyer Mode',
    artisanMode: 'Master Artisan Mode',
    giCertified: 'GI Authenticity Certified',
    directWageNotice: '100% Direct Payout to Artisan • 0% Middleman Cut',
    listenAudio: 'Listen Voice Guide',
    filterAll: 'All Traditions',
    hoursLabor: 'hours needlework',
    viewLineage: 'Explore Lineage',
    fairPriceBreakdown: 'Transparent Fair-Price Ledger',
    commissionNow: 'Support & Commission',
    packToday: 'To Pack Today',
    inTransit: 'In Transit',
    delivered: 'Delivered & Credited'
  },
  hi: {
    appName: 'हस्तकार',
    appTagline: 'हस्तशिल्प प्रमाणिकता एवं सीधा व्यापार',
    bazaar: 'बाज़ार',
    heritage: 'विरासत',
    addCraft: 'शिल्प जोड़ें',
    orders: 'ऑर्डर और आय',
    buyerMode: 'ग्राहक',
    artisanMode: 'कारीगर',
    giCertified: 'जीआई प्रमाणित',
    directWageNotice: '100% कारीगर के खाते में • शून्य कमीशन',
    listenAudio: 'ऑडियो सुनें',
    filterAll: 'सभी शिल्प',
    hoursLabor: 'घंटे का हस्तकार्य',
    viewLineage: 'इतिहास जानें',
    fairPriceBreakdown: 'पारदर्शी मूल्य बहीखाता',
    commissionNow: 'ऑर्डर करें',
    packToday: 'आज पैक करें',
    inTransit: 'पारगमन में',
    delivered: 'पहुंचा दिया'
  },
  mr: {
    appName: 'हस्तकार',
    appTagline: 'पारंपरिक हस्तकला आणि थेट व्यापार',
    bazaar: 'बाजार',
    heritage: 'वारसा',
    addCraft: 'हस्तकला जोडा',
    orders: 'ऑर्डर्स आणि कमाई',
    buyerMode: 'ग्राहक',
    artisanMode: 'कारागीर',
    giCertified: 'जीआय प्रमाणित',
    directWageNotice: '100% थेट रक्कम • मध्यस्थ मुक्त',
    listenAudio: 'ध्वनी ऐका',
    filterAll: 'सर्व हस्तकला',
    hoursLabor: 'तासांचे काम',
    viewLineage: 'इतिहास पाहा',
    fairPriceBreakdown: 'पारदर्शक दर तपशील',
    commissionNow: 'ऑर्डर करा',
    packToday: 'आज पॅक करा',
    inTransit: 'मार्गावर',
    delivered: 'वितरित'
  }
};
