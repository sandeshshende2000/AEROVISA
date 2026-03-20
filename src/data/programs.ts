
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
}

export const programs: Program[] = [
  {
    id: 'portugal',
    slug: 'portugal-golden-visa',
    country: 'Portugal',
    type: 'Golden Visa',
    shortDesc: 'One of the most popular residency-by-investment programs in Europe.',
    overview: 'The Portugal Golden Visa program is a residency-by-investment program for non-EU nationals. It offers a pathway to permanent residency and citizenship after five years.',
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
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'greece',
    slug: 'greece-golden-visa',
    country: 'Greece',
    type: 'Golden Visa',
    shortDesc: 'Fast-track residency with a relatively low investment threshold.',
    overview: 'The Greece Golden Visa offers immediate five-year residency to investors and their families, with no stay requirement to maintain the status.',
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
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'malta',
    slug: 'malta-residency',
    country: 'Malta',
    type: 'MPRP',
    shortDesc: 'A prestigious EU program offering both residency and citizenship paths.',
    overview: 'Malta offers the Permanent Residence Programme (MPRP) and the Exceptional Services by Direct Investment (ESDI) for citizenship.',
    investment: 'Government Contribution, Property Lease/Purchase, Donation.',
    startingPrice: 'Starting from €150,000+',
    benefits: [
      'Right to live and work in Malta',
      'Visa-free travel in Schengen',
      'Stable political and economic environment',
      'High standard of living and healthcare'
    ],
    eligibility: [
      'Strict due diligence process',
      'Proof of significant assets',
      'Contribution to the national development fund',
      'Property lease or purchase'
    ],
    timeline: '6–8 months',
    image: 'https://images.unsplash.com/photo-1527016021513-b09758b777bd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'hungary',
    slug: 'hungary-golden-visa',
    country: 'Hungary',
    type: 'Golden Visa',
    shortDesc: 'New Guest Investor Program offering long-term EU residency.',
    overview: 'Hungary recently relaunched its residency-by-investment program, providing a 10-year residency permit for investors.',
    investment: 'Real Estate Fund, Residential Property.',
    startingPrice: 'Starting from €250,000 / €500,000',
    benefits: [
      '10-year residency permit (renewable)',
      'Visa-free travel in the Schengen Area',
      'Strategic location in Central Europe',
      'Business-friendly environment'
    ],
    eligibility: [
      'Non-EU national',
      'Investment in qualifying funds or property',
      'Clean criminal record',
      'Proof of legal source of funds'
    ],
    timeline: '3–5 months',
    image: 'https://images.unsplash.com/photo-1517713982677-4b66332f98de?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'antigua',
    slug: 'antigua-citizenship',
    country: 'Antigua & Barbuda',
    type: 'Citizenship',
    shortDesc: 'Fast-track citizenship with excellent global mobility.',
    overview: 'The Antigua & Barbuda Citizenship by Investment Program is one of the most cost-effective options for families.',
    investment: 'National Development Fund, Real Estate, Business Investment.',
    startingPrice: 'Starting from $100,000+',
    benefits: [
      'Citizenship for life',
      'Visa-free travel to 150+ countries including UK & Schengen',
      'No global income tax for non-residents',
      'Fast processing time'
    ],
    eligibility: [
      'Main applicant must be 18+',
      'Pass stringent due diligence',
      'Make a qualifying investment',
      '5-day stay requirement over 5 years'
    ],
    timeline: '3–4 months',
    image: 'https://images.unsplash.com/photo-1589519160732-57fc498494f8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'dominica',
    slug: 'dominica-citizenship',
    country: 'Dominica',
    type: 'Citizenship',
    shortDesc: 'Known as the "Nature Isle," offering a robust citizenship program.',
    overview: 'Dominica offers citizenship through a contribution to the government or investment in approved real estate.',
    investment: 'Economic Diversification Fund, Real Estate.',
    startingPrice: 'Starting from $100,000+',
    benefits: [
      'Visa-free travel to 140+ countries',
      'No physical residency requirement',
      'Right to live and work in Dominica',
      'Confidential application process'
    ],
    eligibility: [
      'Outstanding character and health',
      'No criminal record',
      'Qualifying investment',
      'Interview requirement'
    ],
    timeline: '3–6 months',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'grenada',
    slug: 'grenada-citizenship',
    country: 'Grenada',
    type: 'Citizenship',
    shortDesc: 'The only Caribbean program with E-2 Visa treaty with the USA.',
    overview: 'Grenada citizenship offers unique access to the USA through the E-2 Investor Visa treaty.',
    investment: 'National Transformation Fund, Real Estate.',
    startingPrice: 'Starting from $150,000+',
    benefits: [
      'Visa-free travel to 140+ countries including China',
      'Eligibility for USA E-2 Investor Visa',
      'No residency requirement',
      'Includes siblings and grandparents'
    ],
    eligibility: [
      'High net worth individuals',
      'Clean background check',
      'Investment in NTF or Real Estate',
      'Source of funds verification'
    ],
    timeline: '4–6 months',
    image: 'https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'canada',
    slug: 'canada-startup-visa',
    country: 'Canada',
    type: 'Start-Up Visa',
    shortDesc: 'Start-Up Visa program for innovative entrepreneurs.',
    overview: 'The Canada Start-Up Visa Program targets immigrant entrepreneurs with the skills to build businesses in Canada.',
    investment: 'Support from a designated organization (Angel group, VC, or Incubator).',
    startingPrice: 'Investment from Designated Org',
    benefits: [
      'Direct pathway to Permanent Residency',
      'Access to North American markets',
      'Support from top-tier Canadian investors',
      'High quality of life and education'
    ],
    eligibility: [
      'Qualifying business',
      'Letter of Support from designated entity',
      'Language proficiency (English/French)',
      'Sufficient settlement funds'
    ],
    timeline: '12–31 months',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=800'
  }
];
