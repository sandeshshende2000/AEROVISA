export interface Property {
  id: string;
  title: string;
  location: string;
  country: 'Greece' | 'Portugal' | 'Latvia' | 'UK';
  type: 'Villa' | 'Hotel' | 'Apartment' | 'Redevelopment' | 'Commercial';
  price: string;
  highlights: string[];
  image: string;
  isOffMarket?: boolean;
  roi?: string;
  residency?: boolean;
}

export interface Country {
  id: string;
  name: string;
  slug: string;
  description: string;
  heroImage: string;
  categories: string[];
}
