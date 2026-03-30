
export interface Program {
  id: string;
  slug: string;
  country: string;
  type: string;
  shortDesc: string;
  overview: string;
  investment: string;
  startingPrice: string;
  benefits: string[];
  eligibility: string[];
  timeline: string;
  image: string;
  tag?: string;
}

export const programs: Program[] = [
  {
    id: 'portugal',
    slug: 'portugal-residency-by-investment',
    country: 'Portugal',
    type: 'Residency by Investment',
    tag: 'Most Popular',
    shortDesc: 'One of the most popular residency-by-investment programs in Europe.',
    overview: 'The Portugal Residency by Investment program is a pathway for non-EU nationals. It offers a pathway to permanent residency and citizenship after five years.',
    investment: 'Investment Fund Units, Business Investment, Donation.',
    startingPrice: 'Starting from €250,000 / €500,000',
    benefits: [
      'Visa-free travel within the Schengen Area',
      'Right to live, work, and study in Portugal',
      'Pathway to EU citizenship after 5 years',
      'Family inclusion (spouse, children, parents)'
    ],
    eligibility: [
      'Non-EU/EEA/Swiss national',
      'Clean criminal record',
      'Proof of funds for investment',
      'Valid health insurance'
    ],
    timeline: '12–18 months',
    image: 'https://images.unsplash.com/photo-1555854816-802f188095e4?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'greece',
    slug: 'greece-residency-by-investment',
    country: 'Greece',
    type: 'Residency by Investment',
    tag: 'Best Value',
    shortDesc: 'Fast-track residency with a relatively low investment threshold.',
    overview: 'The Greece Residency by Investment program offers immediate five-year residency to investors and their families, with no stay requirement to maintain the status.',
    investment: 'Real Estate, Strategic Investment.',
    startingPrice: 'Starting from €250,000 / €800,000',
    benefits: [
      'Immediate 5-year residency permit',
      'Visa-free travel to the Schengen Area',
      'No stay requirement',
      'Includes spouse, children under 21, and parents'
    ],
    eligibility: [
      'Non-EU national',
      'Investment in Greek real estate',
      'Full health insurance coverage',
      'No criminal record'
    ],
    timeline: '4–6 months',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1200'
  }
];
