import { Property, Country } from '../types';

export const countries: Country[] = [
  {
    id: 'greece',
    name: 'Greece',
    slug: 'greece',
    description: 'Bespoke luxury villas and exclusive hotel opportunities in the heart of the Mediterranean.',
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1920&auto=format&fit=crop',
    categories: ['Luxury Villas', 'Hotels', 'Apartments']
  },
  {
    id: 'portugal',
    name: 'Portugal',
    slug: 'portugal',
    description: 'Prime urban apartments and high-yield redevelopment projects in Lisbon and Algarve.',
    heroImage: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=1920&auto=format&fit=crop',
    categories: ['Apartments', 'Redevelopment Projects']
  },
  {
    id: 'latvia',
    name: 'Latvia',
    slug: 'latvia',
    description: 'Strategic hotel and apartment investments in the rapidly growing Baltic region.',
    heroImage: 'https://images.unsplash.com/photo-1563290231-15967073297a?q=80&w=1920&auto=format&fit=crop',
    categories: ['Hotel & Apartment Investments']
  },
  {
    id: 'uk',
    name: 'UK',
    slug: 'uk',
    description: 'Selective premium properties in London and key metropolitan hubs.',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1920&auto=format&fit=crop',
    categories: ['Selective Premium Properties']
  }
];

export const properties: Property[] = [
  // GREECE
  {
    id: 'gr-01',
    title: 'Azure Bay Estate',
    location: 'Mykonos, Greece',
    country: 'Greece',
    type: 'Villa',
    price: '€4,500,000',
    highlights: ['Off-Market', 'Infinity Pool', 'Golden Visa Eligible'],
    image: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=1200&auto=format&fit=crop',
    isOffMarket: true,
    residency: true
  },
  {
    id: 'gr-02',
    title: 'Santorini Sunset Retreat',
    location: 'Oia, Greece',
    country: 'Greece',
    type: 'Hotel',
    price: '€6,200,000',
    highlights: ['Off-Market', 'Boutique Hotel', 'Prime Location'],
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop',
    isOffMarket: true
  },
  {
    id: 'gr-03',
    title: 'Athenian Penthouse',
    location: 'Athens, Greece',
    country: 'Greece',
    type: 'Apartment',
    price: '€850,000',
    highlights: ['Acropolis View', 'Luxury Finishes', 'Golden Visa'],
    image: 'https://images.unsplash.com/photo-1512918766671-ad6507962077?q=80&w=1200&auto=format&fit=crop',
    residency: true
  },
  {
    id: 'gr-04',
    title: 'Crete Waterfront Villa',
    location: 'Chania, Greece',
    country: 'Greece',
    type: 'Villa',
    price: '€2,800,000',
    highlights: ['Private Beach', 'Modern Design', 'High ROI'],
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1200&auto=format&fit=crop'
  },

  // PORTUGAL
  {
    id: 'pt-01',
    title: 'Heritage Lisbon Suites',
    location: 'Lisbon, Portugal',
    country: 'Portugal',
    type: 'Redevelopment',
    price: '€1,200,000',
    highlights: ['High Yield', 'City Center', 'Golden Visa Eligible'],
    image: 'https://images.unsplash.com/photo-1585128719715-46776b56a0d1?q=80&w=1200&auto=format&fit=crop',
    roi: '7.5%',
    residency: true
  },
  {
    id: 'pt-02',
    title: 'Algarve Golf Estate',
    location: 'Quinta do Lago, Portugal',
    country: 'Portugal',
    type: 'Villa',
    price: '€3,900,000',
    highlights: ['Golf Front', 'Luxury Amenities', 'Private Pool'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'pt-03',
    title: 'Porto Riverside Lofts',
    location: 'Porto, Portugal',
    country: 'Portugal',
    type: 'Apartment',
    price: '€650,000',
    highlights: ['River View', 'Historic Building', 'Golden Visa'],
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=1200&auto=format&fit=crop',
    residency: true
  },
  {
    id: 'pt-04',
    title: 'Cascais Modern Mansion',
    location: 'Cascais, Portugal',
    country: 'Portugal',
    type: 'Villa',
    price: '€5,500,000',
    highlights: ['Ocean View', 'Smart Home', 'Exclusive Area'],
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop'
  },

  // LATVIA
  {
    id: 'lv-01',
    title: 'Baltic Grand Hotel',
    location: 'Riga, Latvia',
    country: 'Latvia',
    type: 'Hotel',
    price: '€8,000,000',
    highlights: ['Off-Market', 'Operational Asset', 'High ROI'],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop',
    isOffMarket: true,
    roi: '9.2%'
  },
  {
    id: 'lv-02',
    title: 'Old Riga Luxury Apartments',
    location: 'Riga, Latvia',
    country: 'Latvia',
    type: 'Apartment',
    price: '€450,000',
    highlights: ['Historic Center', 'Fully Furnished', 'Rental Ready'],
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop',
    roi: '6.8%'
  },
  {
    id: 'lv-03',
    title: 'Jurmala Beach Residence',
    location: 'Jurmala, Latvia',
    country: 'Latvia',
    type: 'Villa',
    price: '€1,500,000',
    highlights: ['Beachfront', 'Pine Forest', 'Private Spa'],
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dd9b6b9?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'lv-04',
    title: 'Riga Business Center',
    location: 'Riga, Latvia',
    country: 'Latvia',
    type: 'Commercial',
    price: '€12,000,000',
    highlights: ['Prime Location', 'Blue Chip Tenants', 'Stable Yield'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    roi: '8.5%'
  },

  // UK
  {
    id: 'uk-01',
    title: 'Mayfair Penthouse',
    location: 'London, UK',
    country: 'UK',
    type: 'Apartment',
    price: '£12,500,000',
    highlights: ['Ultra-Premium', 'Concierge', 'Skyline Views'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'uk-02',
    title: 'Knightsbridge Townhouse',
    location: 'London, UK',
    country: 'UK',
    type: 'Villa',
    price: '£18,000,000',
    highlights: ['Historic', 'Private Garden', 'Exclusive'],
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'uk-03',
    title: 'Manchester Sky Suites',
    location: 'Manchester, UK',
    country: 'UK',
    type: 'Apartment',
    price: '£850,000',
    highlights: ['City Center', 'High Yield', 'Modern'],
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop',
    roi: '6.5%'
  },
  {
    id: 'uk-04',
    title: 'Surrey Country Estate',
    location: 'Surrey, UK',
    country: 'UK',
    type: 'Villa',
    price: '£7,500,000',
    highlights: ['Acreage', 'Equestrian', 'Private'],
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1200&auto=format&fit=crop'
  }
];
