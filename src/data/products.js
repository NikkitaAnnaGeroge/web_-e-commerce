export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'tech', name: 'Technology' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'home', name: 'Home & Living' }
];

export const products = [
  {
    id: 'p1',
    name: 'Aura Wireless Headphones',
    category: 'tech',
    price: 19999.00,
    rating: 4.8,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    description: 'Experience pure sound with the Aura Wireless Headphones. Featuring advanced Active Noise Cancellation (ANC), ambient sound mode, and up to 40 hours of battery life, they deliver studio-quality acoustics wherever you go.',
    features: [
      'Hybrid Active Noise Cancellation',
      '40-Hour Battery Life with Fast Charge',
      'High-Resolution Audio Drivers (40mm)',
      'Bluetooth 5.2 with Multi-point Connection',
      'Ultra-soft memory foam earcups'
    ],
    specifications: {
      'Driver Size': '40 mm',
      'Frequency Response': '20Hz - 20kHz',
      'Connectivity': 'Bluetooth 5.2 / 3.5mm Jack',
      'Battery Life': 'Up to 40 Hours (ANC Off)',
      'Weight': '250g'
    },
    reviews: [
      { id: 'r1', user: 'Alex M.', rating: 5, date: '2026-05-12', comment: 'Absolutely incredible sound quality. The noise cancelling blocks out my entire office.' },
      { id: 'r2', user: 'Sarah K.', rating: 4, date: '2026-06-01', comment: 'Very comfortable for long sessions, battery lasts forever. Bass could be slightly punchier.' }
    ]
  },
  {
    id: 'p2',
    name: 'Minimalist Leather Wallet',
    category: 'accessories',
    price: 3999.00,
    rating: 4.6,
    reviewCount: 94,
    image: '/wallet.png',
    description: 'Crafted from premium full-grain Italian leather, this slim wallet combines elegance with security. Features built-in RFID blocking technology and holds up to 10 cards and cash without bulk.',
    features: [
      '100% Full-Grain Italian Leather',
      'RFID Blocking Security Shield',
      'Slim profile (only 0.3 inches thick)',
      'Quick-access card slot on front',
      'Integrated spring cash clip'
    ],
    specifications: {
      'Material': 'Full-grain leather',
      'Dimensions': '4.1" x 2.9" x 0.3"',
      'Card Capacity': 'Up to 10 cards',
      'RFID Protection': '13.56 MHz',
      'Warranty': '2 Years'
    },
    reviews: [
      { id: 'r3', user: 'Marcus T.', rating: 5, date: '2026-04-20', comment: 'Really slimmed down my pocket. The leather feels extremely premium and is aging beautifully.' },
      { id: 'r4', user: 'Elena R.', rating: 4, date: '2026-05-18', comment: 'Great card access, but the cash clip is a bit stiff at first. Overall excellent build.' }
    ]
  },
  {
    id: 'p3',
    name: 'Classic Chronograph Watch',
    category: 'accessories',
    price: 15199.00,
    rating: 4.7,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    description: 'A timeless timepiece designed for the modern individual. Featuring a Japanese quartz movement, stainless steel casing, scratch-resistant sapphire crystal glass, and water resistance up to 50 meters.',
    features: [
      'Japanese Quartz Movement',
      'Scratch-resistant Sapphire Crystal',
      '316L Surgical-grade Stainless Steel Case',
      'Chronograph stopwatch functions',
      'Water resistant up to 5 ATM (50m)'
    ],
    specifications: {
      'Case Diameter': '40 mm',
      'Case Thickness': '11 mm',
      'Band Material': 'Genuine Leather',
      'Movement': 'Miyota Quartz',
      'Water Resistance': '50 Meters'
    },
    reviews: [
      { id: 'r5', user: 'David W.', rating: 5, date: '2026-03-15', comment: 'Beautiful watch. Gets compliments every time I wear it. Perfect size for a 7-inch wrist.' },
      { id: 'r6', user: 'Chloe B.', rating: 4, date: '2026-05-30', comment: 'Strap is a bit stiff initially but breaks in well. Accurate timekeeping.' }
    ]
  },
  {
    id: 'p4',
    name: 'Urban Tech Backpack',
    category: 'fashion',
    price: 7199.00,
    rating: 4.9,
    reviewCount: 215,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    description: 'Designed for commuters and digital nomads, this water-resistant tech backpack offers superior organization. Features a dedicated lay-flat laptop sleeve, hidden anti-theft pockets, and an integrated USB charging pass-through.',
    features: [
      'Waterproof Ballistic Nylon Exterior',
      'TSA-friendly 15.6" Laptop Compartment',
      'External USB Charging Port Integration',
      'Hidden Passport and Wallet RFID Pocket',
      'Ergonomic padded back panel and shoulder straps'
    ],
    specifications: {
      'Capacity': '24 Liters',
      'Dimensions': '18.5" x 12.2" x 6.5"',
      'Material': '1680D Ballistic Nylon',
      'Laptop Slot': 'Fits up to 16" MacBook Pro',
      'Weight': '1.1 kg'
    },
    reviews: [
      { id: 'r7', user: 'Nate H.', rating: 5, date: '2026-06-10', comment: 'Best commuter backpack I have owned. Pockets are perfectly thought out. Rain rolls right off.' },
      { id: 'r8', user: 'Julia F.', rating: 5, date: '2026-06-22', comment: 'Unbelievable durability. Stuffed it to the brim for a weekend trip, zipper held solid. Highly recommend.' }
    ]
  },
  {
    id: 'p5',
    name: 'Organic Cotton Hoodie',
    category: 'fashion',
    price: 5599.00,
    rating: 4.5,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=80',
    description: 'The ultimate luxury hoodie. Made from 100% certified organic cotton fleece, this heavyweight hoodie features a double-lined hood, drop-shoulder seams, and a relaxed, unisex fit designed to last.',
    features: [
      '100% Certified Organic Cotton',
      'Heavyweight 450 GSM French Terry Fleece',
      'Double-lined hood without drawcords for clean look',
      'Ribbed side panels for flexibility',
      'Pre-shrunk to maintain fit'
    ],
    specifications: {
      'Material': '100% Organic Cotton',
      'Fabric Weight': '450 GSM',
      'Origin': 'Made in Portugal',
      'Fit': 'Relaxed / Unisex',
      'Care': 'Machine wash cold, tumble dry low'
    },
    reviews: [
      { id: 'r9', user: 'Jordan S.', rating: 5, date: '2026-04-11', comment: 'Extremely thick and warm. The fit is modern and looks very clean without drawstrings.' },
      { id: 'r10', user: 'Taylor P.', rating: 4, date: '2026-05-02', comment: 'Super comfortable but fits a bit oversized. Size down if you want a regular fit.' }
    ]
  },
  {
    id: 'p6',
    name: 'Smart Fitness Band Pro',
    category: 'tech',
    price: 9599.00,
    rating: 4.4,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&auto=format&fit=crop&q=80',
    description: 'Track your health and maximize your workouts with the Smart Fitness Band Pro. Equipped with a bright 1.62" AMOLED touchscreen, SpO2 blood oxygen tracking, stress monitors, and over 110 sports modes.',
    features: [
      '1.62" AMOLED Always-on Display',
      'Continuous Blood Oxygen (SpO2) & Heart Rate Monitoring',
      'Advanced Sleep Quality Analytics',
      '5 ATM Water Resistance (up to 50m)',
      'Up to 14 Days of Battery Life'
    ],
    specifications: {
      'Display': '1.62" AMOLED Touchscreen',
      'Resolution': '192 x 490 pixels',
      'Sensors': 'PPG Heart Rate, 3-axis Accelerometer, Gyroscope',
      'Battery': '180 mAh (up to 14 days)',
      'OS Compatibility': 'iOS 10.0+ / Android 6.0+'
    },
    reviews: [
      { id: 'r11', user: 'Lisa V.', rating: 4, date: '2026-05-09', comment: 'Battery life is outstanding, easily get 12 days with heavy use. Screen is very bright outdoors.' },
      { id: 'r12', user: 'Kevin O.', rating: 4, date: '2026-05-25', comment: 'App sync could be faster, but the step counting and sleep data is very accurate.' }
    ]
  },
  {
    id: 'p7',
    name: 'Ergonomic Mesh Chair',
    category: 'home',
    price: 26399.00,
    rating: 4.7,
    reviewCount: 160,
    image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800&auto=format&fit=crop&q=80',
    description: 'Invest in your health with this fully adjustable ergonomic office chair. Engineered with premium breathable mesh, adaptive lumbar support, 3D armrests, and a multi-angle tilt mechanism for ultimate comfort.',
    features: [
      'Breathable Elastomeric Mesh Back and Seat',
      'Dynamic Auto-adjusting Lumbar Support',
      '3D Adjustable Armrests (height, depth, angle)',
      'Multi-lock tilt recline mechanism up to 135 degrees',
      'Heavy-duty aluminum wheelbase with silent casters'
    ],
    specifications: {
      'Weight Capacity': 'Up to 300 lbs',
      'Seat Height': '18.5" - 22.5" Adjustable',
      'Recline Angle': '90° - 135°',
      'Frame Material': 'Polished Aluminum / Nylon',
      'Certifications': 'BIFMA / Ergonomics Certified'
    },
    reviews: [
      { id: 'r13', user: 'Sophia G.', rating: 5, date: '2026-02-14', comment: 'Solved my lower back pain in the first week. Very adjustable, mesh keeps me cool.' },
      { id: 'r14', user: 'Ryan D.', rating: 4, date: '2026-04-18', comment: 'Assembly took about 30 minutes, instructions were clear. Sturdy and matches high-end models.' }
    ]
  },
  {
    id: 'p8',
    name: 'Aromatherapy Soy Candle Set',
    category: 'home',
    price: 2799.00,
    rating: 4.8,
    reviewCount: 110,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80',
    description: 'Transform your space into a peaceful sanctuary. This gift set features three premium, hand-poured soy candles infused with pure essential oils: Lavender (Relaxation), Sandalwood (Grounding), and Vanilla Bean (Comfort).',
    features: [
      '100% Natural Soy Wax & Cotton Wicks',
      'Infused with therapeutic-grade essential oils',
      'Up to 45 hours burn time per candle',
      'Eco-friendly recyclable amber glass jars with metal lids',
      'Soot-free and non-toxic burn'
    ],
    specifications: {
      'Wax Type': '100% Soy Wax',
      'Count': '3 Jars (8 oz each)',
      'Burn Time': '135 Hours Total',
      'Scent Profile': 'Lavender, Sandalwood, Vanilla',
      'Dimensions': '3.2" x 2.8" per jar'
    },
    reviews: [
      { id: 'r15', user: 'Emma P.', rating: 5, date: '2026-05-05', comment: 'The scents are subtle and natural, not chemically at all. The amber jars look gorgeous on my shelves.' },
      { id: 'r16', user: 'Justin L.', rating: 4, date: '2026-06-14', comment: 'Burns clean and even. Lavender candle is amazing. Wish they made larger sizes!' }
    ]
  }
];
