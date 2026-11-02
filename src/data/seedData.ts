import { Destination, BlogPost, AgencySettings } from '../types/database';

export const seedDestinations: Destination[] = [
  {
    id: 'dest-lalibela',
    name: 'Lalibela',
    slug: 'lalibela',
    description: 'Explore the miraculous 12th-century rock-hewn monolithic churches, a UNESCO World Heritage site and sacred pilgrimage center.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    price: 'From 5,999 birr',
    duration: '3-5 days',
    category: 'Historical',
    highlights: [
      '11 medieval monolithic rock-hewn churches',
      'Church of Saint George (Bet Giyorgis)',
      'Rich religious history and sacred ceremonies',
      'Panoramic mountain trekking views'
    ],
    isFeatured: true,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'dest-axum',
    name: 'Axum',
    slug: 'axum',
    description: 'Discover the ancient Kingdom of Aksum, home of towering ancient stelae, ancient palaces, and the legendary Ark of the Covenant.',
    imageUrl: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=800&q=80',
    price: 'From 6,750 birr',
    duration: '2-4 days',
    category: 'Historical',
    highlights: [
      'Ancient Kingdom of Aksum obelisks and stelae field',
      'Church of Our Lady Mary of Zion',
      'Ruins of the Queen of Sheba Palace',
      'Ancient archaeological museum and tombs'
    ],
    isFeatured: true,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'dest-dubai',
    name: 'Dubai, UAE',
    slug: 'dubai-uae',
    description: 'Experience futuristic luxury, desert safaris, world-renowned shopping, and spectacular modern architectural marvels.',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    price: 'From 60,000 birr',
    duration: '4-7 days',
    category: 'International',
    highlights: [
      'Burj Khalifa observatory visit',
      'Desert 4x4 safari with traditional dinner',
      'Dubai Marina luxury cruise',
      'Tax-free shopping and entertainment'
    ],
    isFeatured: true,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'dest-thailand',
    name: 'Bangkok & Phuket, Thailand',
    slug: 'thailand',
    description: 'Immerse in turquoise beaches, ornate Buddhist temples, vibrant night markets, and world-class tropical hospitality.',
    imageUrl: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=800&q=80',
    price: 'From 79,999 birr',
    duration: '5-8 days',
    category: 'International',
    highlights: [
      'Phi Phi Islands island-hopping speedboat tour',
      'Grand Palace and Wat Arun temple tour',
      'Authentic Thai street food & night markets',
      'Relaxing traditional spa and wellness retreat'
    ],
    isFeatured: true,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'dest-gondar',
    name: 'Gondar',
    slug: 'gondar',
    description: 'Visit the "Camelot of Africa", celebrated for 17th-century royal castles, medieval fortresses, and stunning painted church ceilings.',
    imageUrl: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=800&q=80',
    price: 'From 5,999 birr',
    duration: '2-4 days',
    category: 'Historical',
    highlights: [
      'Fasil Ghebbi royal castle compound',
      'Fasilides Bath reflection pool',
      'Debre Berhan Selassie painted ceiling angels',
      'Gateway excursions to Simien Mountains'
    ],
    isFeatured: true,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'dest-bale-mountains',
    name: 'Bale Mountains National Park',
    slug: 'bale-mountains',
    description: 'Spot rare and endemic wildlife, afro-alpine plateaus, cloud forests, and the endangered Ethiopian red wolf in pristine wilderness.',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    price: 'From 3,789 birr',
    duration: '4-6 days',
    category: 'Adventure',
    highlights: [
      'Spotting the rare Ethiopian wolf',
      'Sanetti Plateau scenic high-altitude drive',
      'Harenna cloud forest exploration',
      'Over 260 diverse bird species'
    ],
    isFeatured: true,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'dest-lake-tana',
    name: 'Bahir Dar & Lake Tana',
    slug: 'bahir-dar-lake-tana',
    description: 'Explore the source of the Blue Nile, boat rides across ancient island monasteries, and majestic Blue Nile Falls.',
    imageUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
    price: 'From 9,899 birr',
    duration: '2-3 days',
    category: 'Domestic',
    highlights: [
      'Boat cruise to historic 14th-century island monasteries',
      'Tis Abay (Blue Nile Falls) trek',
      'Sunset along the palm-lined shores of Bahir Dar',
      'Local artisan and fish markets'
    ],
    isFeatured: true,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'dest-china',
    name: 'Guangzhou & Beijing, China',
    slug: 'china',
    description: 'A blend of ancient dynasties and cutting-edge commerce. Perfect for both cultural travelers and business trade visitors.',
    imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80',
    price: 'From 85,000 birr',
    duration: '6-10 days',
    category: 'International',
    highlights: [
      'Great Wall of China excursion',
      'Forbidden City historical walking tour',
      'Canton Trade Fair and commercial hub tours',
      'High-speed bullet train experience'
    ],
    isFeatured: true,
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

export const seedBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Hidden Gems in Ethiopia You Need to Visit',
    excerpt: "Discover Ethiopia's best-kept secrets beyond the usual tourist destinations. These lesser-known spots will take your breath away.",
    content: `
      <p>Ethiopia is a land of stunning landscapes, rich history, and vibrant cultures. While attractions like Lalibela and the Danakil Depression are well-known, there are countless hidden treasures waiting to be discovered.</p>
      
      <h2>1. Bale Mountains National Park</h2>
      <p>Home to the Ethiopian wolf, nyala, and over 260 species of birds, the Bale Mountains offer some of the most spectacular scenery in East Africa. The afro-alpine plateau, dramatic peaks, and lush forests create a diverse ecosystem that few travelers get to experience.</p>
      
      <h2>2. Harar's Old Town</h2>
      <p>The ancient walled city of Harar is a UNESCO World Heritage site and one of Islam's holiest cities. Its maze-like streets, colorful markets, and traditional Harari houses provide a glimpse into Ethiopia's complex history. Don't miss the nightly hyena feeding ritual!</p>
      
      <h2>3. Sof Omar Caves</h2>
      <p>This extensive network of limestone caves is one of Ethiopia's natural wonders. The river-carved passages stretch for over 15 kilometers, making it Africa's longest cave system. The play of light on the stalactites and stalagmites creates an otherworldly atmosphere.</p>
      
      <h2>4. Dorze Village</h2>
      <p>Nestled in the hills above Lake Chamo, the Dorze people are known for their unique beehive-shaped homes and exceptional weaving skills. A visit here offers insight into traditional lifestyles that have remained largely unchanged for centuries.</p>
      
      <h2>5. Chebera Churchura National Park</h2>
      <p>This remote park in southwestern Ethiopia is home to elephants, lions, and hippos, yet receives very few visitors. Its pristine forest and savanna landscapes provide an authentic wildlife experience without the crowds.</p>
    `,
    author: 'Eleni Nigussie',
    date: 'June 15, 2024',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=800&q=80',
    slug: 'top-10-hidden-gems-ethiopia',
    status: 'published'
  },
  {
    id: '2',
    title: 'How to Prepare for Your First International Flight',
    excerpt: "First time flying abroad? Here's everything you need to know, from packing tips to navigating airports and dealing with jet lag.",
    content: `
      <p>Taking your first international flight can be both exciting and overwhelming. With proper preparation, you can ensure a smooth journey from takeoff to landing.</p>
      
      <h2>Before Your Trip</h2>
      <p>Start by checking passport requirements for your destination. Many countries require that your passport be valid for at least six months beyond your planned stay. Apply for any necessary visas well in advance, as processing times can vary widely.</p>
      
      <h2>Packing Essentials</h2>
      <p>Pack light but smart. Essential items include:</p>
      <ul>
        <li>Travel documents (passport, visa, flight tickets, insurance)</li>
        <li>Universal power adapter</li>
        <li>Medications with prescriptions in carry-on</li>
        <li>Comfortable clothes layered for varying cabin temperatures</li>
      </ul>
      
      <h2>At the Airport</h2>
      <p>Arrive at least 3 hours before an international flight. This gives you ample time for check-in, security, and unexpected gate changes.</p>
    `,
    author: 'Samuel Getachew',
    date: 'July 22, 2024',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1540339832862-474599807836?auto=format&fit=crop&w=800&q=80',
    slug: 'prepare-first-international-flight',
    status: 'published'
  },
  {
    id: '3',
    title: 'Special Flight Offer: Addis Ababa to Dubai Special Packages',
    excerpt: 'Limited availability special fares with Ethiopian Airlines including 2x 23kg baggage allowance and free date change.',
    content: `
      <p>Take advantage of ELSOL Travel's exclusive partnership fares to Dubai! Whether for vacation, family visits, or business shopping, this all-inclusive package gives you peace of mind.</p>
      <p>Contact our Bole Medhanialem branch directly to reserve your seat before promotional slots fill up.</p>
    `,
    author: 'ELSOL Booking Desk',
    date: 'August 10, 2024',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    slug: 'addis-ababa-to-dubai-special-offer',
    status: 'published',
    travelDetails: {
      title: 'Dubai Getaway Special',
      airline: 'Ethiopian Airlines',
      departureDate: '2026-11-20',
      returnDate: '2026-11-27',
      departureTime: '10:15 AM',
      returnTime: '06:45 PM',
      baggage: '2 x 23kg',
      price: '54,500 ETB',
      phones: ['+251 911 234 567', '+251 911 234 568'],
      emails: ['info@elsol.travel'],
      additionalInfo: 'Complimentary visa guidance and airport transfer assistance included.'
    }
  }
];

export const seedAgencySettings: AgencySettings = {
  agencyName: 'ELSOL Travel Agency',
  tagline: 'Your Gateway to Seamless Journeys',
  accreditation: 'IATA Accredited Travel Partner',
  establishedYear: 2017,
  emails: {
    primary: 'info@elsol.travel',
    bookings: 'bookings@elsol.travel'
  },
  phones: [
    '+251 911 234 567',
    '+251 911 234 568'
  ],
  address: {
    street: 'Bole Medhanialem, Milkomi City Complex, 1st Floor, Office #119',
    city: 'Addis Ababa',
    country: 'Ethiopia'
  },
  businessHours: {
    monFri: '9:00 AM - 6:00 PM',
    saturday: '9:00 AM - 3:00 PM',
    sunday: 'Closed'
  },
  socials: {
    facebook: 'https://facebook.com/elsoltravel',
    instagram: 'https://instagram.com/elsoltravel',
    telegram: 'https://t.me/elsoltravel'
  }
};
