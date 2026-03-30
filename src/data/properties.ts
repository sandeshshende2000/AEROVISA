
export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  type: string;
  features: string[];
  label?: string;
}

export const featuredProperties: Property[] = [
  {
    id: 'prop-1',
    title: 'Ultra-Modern Waterfront Villa',
    location: 'Algarve, Portugal',
    price: '€4,500,000',
    type: 'Villa',
    label: 'Exclusive Listing',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
    features: ['Infinity Pool', 'Private Beach Access', 'Smart Home System', '6 Bedrooms']
  },
  {
    id: 'prop-2',
    title: 'Penthouse with Acropolis View',
    location: 'Athens, Greece',
    price: '€1,200,000',
    type: 'Penthouse',
    label: 'Off-Market',
    image: 'https://images.unsplash.com/photo-1603565320527-3b3fd65b73bb?auto=format&fit=crop&q=80&w=1200',
    features: ['Roof Garden', 'Panoramic Views', 'Luxury Finishes', '3 Bedrooms']
  },
  {
    id: 'prop-3',
    title: 'Historic Estate & Vineyard',
    location: 'Tuscany, Italy',
    price: '€8,900,000',
    type: 'Estate',
    label: 'Exclusive Listing',
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=1200',
    features: ['Vineyard', 'Wine Cellar', 'Guest House', 'Helipad Potential']
  }
];
