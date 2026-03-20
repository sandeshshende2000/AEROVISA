export interface JetType {
  id: string;
  name: string;
  slug: string;
  passengers: string;
  range: string;
  cabinFeatures: string;
  description: string;
  examples: string[];
  routes: string[];
  image: string;
  luxuryDescription: string;
}

export const jets: JetType[] = [
  {
    id: 'light-jet',
    name: 'Light Jet',
    slug: 'light-jet',
    passengers: '4–6 Passengers',
    range: 'Short to Medium Range (up to 3 hours)',
    cabinFeatures: 'Comfortable leather seating, compact galley, and enclosed lavatory. Ideal for regional travel with high efficiency.',
    description: 'Agile and efficient, light jets are the perfect solution for short-range regional travel, providing access to smaller airports that larger aircraft cannot reach.',
    examples: ['Cessna Citation CJ3', 'Embraer Phenom 300', 'Nextant 400XTi'],
    routes: ['Mumbai → Dubai', 'Dubai → Riyadh', 'London → Paris', 'New York → Miami'],
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=1200',
    luxuryDescription: 'Experience the freedom of regional travel without the constraints of commercial schedules. Light jets offer a private, quiet environment perfect for business discussions or quiet relaxation between cities.'
  },
  {
    id: 'midsize-jet',
    name: 'Midsize Jet',
    slug: 'midsize-jet',
    passengers: '7–9 Passengers',
    range: 'Medium Range (up to 5 hours)',
    cabinFeatures: 'Stand-up cabins, enhanced luggage capacity, and premium entertainment systems. Features a full refreshment center.',
    description: 'Midsize private jets provide a significant upgrade in range, speed, and cabin comfort, making them ideal for medium-distance international flights.',
    examples: ['Cessna Citation XLS', 'Hawker 800XP', 'Learjet 60', 'Embraer Praetor 500'],
    routes: ['Dubai → London', 'Singapore → Dubai', 'New York → Los Angeles', 'Hong Kong → Tokyo'],
    image: 'https://images.unsplash.com/photo-1626244842344-b5042bb2fd97?auto=format&fit=crop&q=80&w=1200',
    luxuryDescription: 'Midsize jets strike the perfect balance between efficiency and luxury. With more room to move and enhanced amenities, your medium-haul journey becomes an extension of your office or home.'
  },
  {
    id: 'heavy-jet',
    name: 'Heavy Jet',
    slug: 'heavy-jet',
    passengers: '10–16 Passengers',
    range: 'Long Range (up to 12 hours)',
    cabinFeatures: 'Full-height walking cabins, full galley for hot meal service, sleeping arrangements, and dedicated flight attendants.',
    description: 'The pinnacle of private aviation, heavy jets offer ultimate luxury for transcontinental travel, featuring spacious multi-zone cabins and exceptional range.',
    examples: ['Gulfstream G650', 'Bombardier Global 6000', 'Dassault Falcon 8X', 'Embraer Lineage 1000'],
    routes: ['Dubai → New York', 'London → Singapore', 'Los Angeles → London', 'Tokyo → San Francisco'],
    image: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&q=80&w=1200',
    luxuryDescription: 'Heavy jets redefine international travel. With multiple cabin zones for dining, working, and resting, these aircraft provide a seamless transition across time zones in an environment of absolute privacy and comfort.'
  }
];
