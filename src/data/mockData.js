export const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: 'bi-grid-fill' },
  { id: 'cars', name: 'Cars', icon: 'bi-car-front-fill' },
  { id: 'motorcycles', name: 'Motorcycles', icon: 'bi-bicycle' },
  { id: 'mobiles', name: 'Mobile Phones', icon: 'bi-phone-fill' },
  { id: 'properties', name: 'For Sale: Houses & Apartments', icon: 'bi-building' },
  { id: 'electronics', name: 'Electronics & Appliances', icon: 'bi-laptop' },
  { id: 'furniture', name: 'Furniture', icon: 'bi-lamp-fill' },
  { id: 'commercial', name: 'Commercial Vehicles', icon: 'bi-truck' },
  { id: 'bikes', name: 'Bicycles', icon: 'bi-bicycle' },
  { id: 'fashion', name: 'Fashion & Sports', icon: 'bi-bag-fill' }
];

export function findCategory(query) {
  if (!query) return null;
  const q = query.toLowerCase().trim();
  return CATEGORIES.find(
    c => c.id.toLowerCase() === q ||
         c.name.toLowerCase() === q ||
         c.name.toLowerCase().startsWith(q) ||
         c.name.toLowerCase().includes(q) ||
         q.includes(c.id.toLowerCase())
  ) || null;
}

export const LOCATIONS = [
  'All India',
  'Mumbai, Maharashtra',
  'Bengaluru, Karnataka',
  'Delhi, NCR',
  'Hyderabad, Telangana',
  'Chennai, Tamil Nadu',
  'Pune, Maharashtra',
  'Kolkata, West Bengal',
  'Ahmedabad, Gujarat',
  'Jaipur, Rajasthan',
  'Kochi, Kerala'
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Maruti Suzuki Swift VXi - 2021 Petrol Single Owner',
    category: 'cars',
    price: 545000,
    location: 'Bandra West, Mumbai',
    city: 'Mumbai, Maharashtra',
    date: 'Today',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Immaculate condition Swift VXi 2021 model. Driven only 28,500 kms with full authorized service history. Insurance valid till late 2026. Non-accidental, touchscreen infotainment, chilled AC, new tyres.',
    specifications: {
      'Year': '2021',
      'KM driven': '28,500 km',
      'Fuel': 'Petrol',
      'Transmission': 'Manual',
      'Owners': '1st Owner'
    },
    seller: {
      name: 'Rohan Sharma',
      memberSince: 'Mar 2021',
      phone: '+91 98201 44521',
      verified: true,
      rating: 4.8
    }
  },
  {
    id: 'prod-2',
    title: 'Apple iPhone 15 Pro 128GB Natural Titanium (Under AppleCare)',
    category: 'mobiles',
    price: 88999,
    location: 'Koramangala, Bengaluru',
    city: 'Bengaluru, Karnataka',
    date: 'Today',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Mint condition iPhone 15 Pro Natural Titanium. 100% battery health, zero scratches, screen protector applied from day 1. Bill, box, and original braided cable included. AppleCare+ warranty remaining.',
    specifications: {
      'Brand': 'Apple',
      'Model': 'iPhone 15 Pro',
      'Storage': '128 GB',
      'Color': 'Natural Titanium',
      'Battery Health': '100%'
    },
    seller: {
      name: 'Ananya Verma',
      memberSince: 'Jan 2022',
      phone: '+91 97412 88390',
      verified: true,
      rating: 4.9
    }
  },
  {
    id: 'prod-3',
    title: 'Royal Enfield Classic 350 Stealth Black - Dual Channel ABS',
    category: 'motorcycles',
    price: 165000,
    location: 'Connaught Place, Delhi',
    city: 'Delhi, NCR',
    date: 'Yesterday',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Royal Enfield Classic 350 BS6 Stealth Black with alloys. Dual-channel ABS, fitted with touring seats, crash guard, and led headlamp. Single hand driven, serviced exclusively at authorized service center.',
    specifications: {
      'Year': '2022',
      'KM driven': '14,200 km',
      'Color': 'Stealth Black',
      'Fuel': 'Petrol'
    },
    seller: {
      name: 'Vikram Singh',
      memberSince: 'Aug 2020',
      phone: '+91 99110 33492',
      verified: true,
      rating: 4.7
    }
  },
  {
    id: 'prod-4',
    title: 'Luxury 3 BHK Furnished Apartment with Balcony & Covered Parking',
    category: 'properties',
    price: 12500000,
    location: 'Hitec City, Hyderabad',
    city: 'Hyderabad, Telangana',
    date: '2 days ago',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Spacious 1850 sq.ft 3BHK high-rise apartment with premium wooden finishes, modular kitchen, 2 covered car parking slots, clubhouse, swimming pool, and round-the-clock security. Gated society.',
    specifications: {
      'Bedrooms': '3 BHK',
      'Super Builtup Area': '1850 sq.ft',
      'Furnishing': 'Semi-Furnished',
      'Facing': 'East',
      'Floor': '11th of 24'
    },
    seller: {
      name: 'Srinivas Rao',
      memberSince: 'Nov 2019',
      phone: '+91 94401 77312',
      verified: true,
      rating: 5.0
    }
  },
  {
    id: 'prod-5',
    title: 'Sony PlayStation 5 Disc Edition + 2 DualSense Controllers + 3 Games',
    category: 'electronics',
    price: 41999,
    location: 'T Nagar, Chennai',
    city: 'Chennai, Tamil Nadu',
    date: '3 days ago',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'PS5 Disc Edition console in pristine condition. Comes with 2 original DualSense controllers (White & Midnight Black), HDMI 2.1 cable, God of War Ragnarok, and Spider-Man 2 discs. Barely used on weekends.',
    specifications: {
      'Brand': 'Sony',
      'Model': 'PlayStation 5 Disc',
      'Controllers': '2 Included',
      'Condition': 'Like New'
    },
    seller: {
      name: 'Karthik Kumar',
      memberSince: 'Jul 2023',
      phone: '+91 98402 11984',
      verified: false,
      rating: 4.6
    }
  },
  {
    id: 'prod-6',
    title: 'Solid Sheesham Wood 6-Seater Dining Table Set with Cushioned Chairs',
    category: 'furniture',
    price: 24500,
    location: 'Kothrud, Pune',
    city: 'Pune, Maharashtra',
    date: 'Today',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Handcrafted pure Sheesham wood dining table with 6 ergonomic upholstered chairs in honey brown finish. Heavy and durable, scratch-resistant glass top included. Selling due to home renovation.',
    specifications: {
      'Material': 'Solid Sheesham Wood',
      'Seating Capacity': '6 Seater',
      'Color': 'Honey Brown',
      'Age': '1.5 years'
    },
    seller: {
      name: 'Pooja Kulkarni',
      memberSince: 'May 2022',
      phone: '+91 98220 55147',
      verified: true,
      rating: 4.9
    }
  },
  {
    id: 'prod-7',
    title: 'Apple MacBook Air M2 (16GB RAM / 512GB SSD) Midnight Blue',
    category: 'electronics',
    price: 84900,
    location: 'Park Street, Kolkata',
    city: 'Kolkata, West Bengal',
    date: 'Yesterday',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'MacBook Air M2 13.6-inch with upgraded 16GB unified memory and 512GB fast SSD. Battery cycle count only 42 (99% health). Original MagSafe 3 charger, box, invoice included. Flawless body.',
    specifications: {
      'Processor': 'Apple M2 8-core CPU',
      'RAM': '16 GB Unified',
      'Storage': '512 GB SSD',
      'Color': 'Midnight',
      'Screen Size': '13.6 inch Liquid Retina'
    },
    seller: {
      name: 'Debashis Mukherjee',
      memberSince: 'Oct 2021',
      phone: '+91 98310 99401',
      verified: true,
      rating: 4.8
    }
  },
  {
    id: 'prod-8',
    title: 'Samsung Galaxy S23 Ultra 5G (Phantom Black, 256GB / 12GB RAM)',
    category: 'mobiles',
    price: 67000,
    location: 'SG Highway, Ahmedabad',
    city: 'Ahmedabad, Gujarat',
    date: '4 days ago',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Samsung Galaxy S23 Ultra in showroom condition. 200MP camera, built-in S-Pen, flawless dynamic AMOLED 120Hz display. Never dropped or repaired. All original accessories with box.',
    specifications: {
      'Brand': 'Samsung',
      'Model': 'Galaxy S23 Ultra',
      'RAM': '12 GB',
      'Storage': '256 GB',
      'Primary Camera': '200 MP'
    },
    seller: {
      name: 'Hardik Patel',
      memberSince: 'Feb 2023',
      phone: '+91 98980 22340',
      verified: true,
      rating: 4.5
    }
  },
  {
    id: 'prod-9',
    title: 'Trek Marlin 7 Mountain Bike (29 Inch Wheels, RockShox Suspension)',
    category: 'bikes',
    price: 36000,
    location: 'Indiranagar, Bengaluru',
    city: 'Bengaluru, Karnataka',
    date: 'Today',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'High-end Trek Marlin 7 hardtail MTB. Alpha Silver Aluminum frame, 1x10 Shimano Deore drivetrain, hydraulic disc brakes, RockShox Judy front fork with lockout. Serviced last month.',
    specifications: {
      'Brand': 'Trek',
      'Model': 'Marlin 7',
      'Frame': 'Alpha Silver Aluminum (Size L)',
      'Wheel Size': '29 Inch',
      'Brakes': 'Shimano Hydraulic Disc'
    },
    seller: {
      name: 'Aditya Nair',
      memberSince: 'Sep 2022',
      phone: '+91 99800 66201',
      verified: true,
      rating: 4.9
    }
  },
  {
    id: 'prod-10',
    title: 'Tata Ace Gold BS6 Diesel Mini Truck - 2022 Good Runner',
    category: 'commercial',
    price: 385000,
    location: 'Navi Mumbai, Maharashtra',
    city: 'Mumbai, Maharashtra',
    date: '5 days ago',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Tata Ace Gold diesel mini truck in top mechanical condition. Clear documents, fitness certificate valid, comprehensive commercial insurance active. Regularly maintained.',
    specifications: {
      'Year': '2022',
      'Fuel': 'Diesel',
      'KM driven': '44,000 km',
      'Payload': '750 kg'
    },
    seller: {
      name: 'Ganesh Logistics',
      memberSince: 'Apr 2020',
      phone: '+91 98190 77112',
      verified: true,
      rating: 4.7
    }
  },
  {
    id: 'prod-11',
    title: 'Hyundai Creta SX (O) 1.5 Diesel Automatic Panoramic Sunroof 2022',
    category: 'cars',
    price: 1475000,
    location: 'Jubilee Hills, Hyderabad',
    city: 'Hyderabad, Telangana',
    date: 'Yesterday',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Top end Creta SX Optional Automatic Diesel. Voice-enabled panoramic sunroof, ventilated front leather seats, Bose 8-speaker audio, 10.25 inch display. First owner, zero debt, bumper to bumper insurance.',
    specifications: {
      'Year': '2022',
      'KM driven': '32,000 km',
      'Fuel': 'Diesel',
      'Transmission': 'Automatic',
      'Sunroof': 'Panoramic'
    },
    seller: {
      name: 'Rajesh Varma',
      memberSince: 'Feb 2021',
      phone: '+91 98490 88231',
      verified: true,
      rating: 4.9
    }
  },
  {
    id: 'prod-12',
    title: 'Yamaha YZF R15 V4 Racing Blue - Dual Channel ABS Quick Shifter',
    category: 'motorcycles',
    price: 155000,
    location: 'Kakkanad, Kochi',
    city: 'Kochi, Kerala',
    date: 'Today',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'R15 V4 in striking Racing Blue color. Comes factory fitted with Upside Down (USD) forks, Traction Control System, and Quickshifter. Only 9,800 kms run, showroom condition.',
    specifications: {
      'Year': '2023',
      'KM driven': '9,800 km',
      'Color': 'Racing Blue',
      'ABS': 'Dual Channel'
    },
    seller: {
      name: 'Fahad Mohammed',
      memberSince: 'Dec 2023',
      phone: '+91 97450 11290',
      verified: true,
      rating: 4.8
    }
  }
];

export const PRESET_IMAGES = [
  { label: 'Car / Vehicle', url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80' },
  { label: 'Smartphone / Gadget', url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80' },
  { label: 'Laptop / Tech', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80' },
  { label: 'Motorcycle / Bike', url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80' },
  { label: 'House / Property', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' },
  { label: 'Furniture / Interior', url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80' }
];
