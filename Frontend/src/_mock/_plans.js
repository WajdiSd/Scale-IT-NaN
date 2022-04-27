import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from '../assets';

// ----------------------------------------------------------------------

const LICENSES = ['Standard', 'Standard Plus', 'Extended'];

export const _homePlans = [...Array(3)].map((_, index) => ({
  license: LICENSES[index],
  commons: ['One end products', '12 months updates', '6 months of support'],
  options: ['JavaScript version', 'TypeScript version', 'Design Resources', 'Commercial applications'],
  icons: [
    'https://minimal-assets-api.vercel.app/assets/images/home/ic_sketch.svg',
    'https://minimal-assets-api.vercel.app/assets/images/home/ic_figma.svg',
    'https://minimal-assets-api.vercel.app/assets/images/home/ic_js.svg',
    'https://minimal-assets-api.vercel.app/assets/images/home/ic_ts.svg',
  ],
}));

export const _pricingPlans = [
  {
    subscription: 'basic',
    icon: <PlanFreeIcon />,
    price: 0,
    caption: 'forever',
    lists: [
      { text: 'Dashboard access', isAvailable: true },
      { text: 'Project Management', isAvailable: true },
      { text: 'Project Progress Tracker', isAvailable: false },
      { text: 'Employees Productivity Tracker', isAvailable: false },
      { text: 'Miss Brain AI Assistant', isAvailable: false },
    ],
    labelAction: 'current plan',
  },
  {
    subscription: 'starter',
    icon: <PlanStarterIcon />,
    price: 4.99,
    caption: 'saving $24 a year',
    lists: [
      { text: 'Dashboard access', isAvailable: true },
      { text: 'Project Management', isAvailable: true },
      { text: 'Project Progress Tracker', isAvailable: true },
      { text: 'Employees Productivity Tracker', isAvailable: true },
      { text: 'Miss Brain AI Assistant', isAvailable: false },
    ],
    labelAction: 'choose starter',
  },
  {
    subscription: 'premium',
    icon: <PlanPremiumIcon />,
    price: 9.99,
    caption: 'saving $124 a year',
    lists: [
      { text: 'Dashboard access', isAvailable: true },
      { text: 'Project Management', isAvailable: true },
      { text: 'Project Progress Tracker', isAvailable: true },
      { text: 'Employees Productivity Tracker', isAvailable: true },
      { text: 'Miss Brain AI Assistant', isAvailable: true },
    ],
    labelAction: 'choose premium',
  },
];
