export const SITE_URL = 'https://onehourchallenge.com';
export const SITE_NAME = 'OneHour Challenge';
export const DEFAULT_OG_IMAGE =
  'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771514832/Onehour_2__page-0001_zy1elu.jpg';

const sharedKeywords = [
  'onehour challenge',
  'online fitness classes india',
  'live workout sessions',
  'online yoga classes',
  'online zumba classes',
  'personal training online',
  'fitness coaching india',
];

export const seoPages = {
  '/': {
    title: 'OneHour Challenge | Online Fitness, Yoga, Zumba and Personal Coaching',
    description:
      'Join OneHour Challenge for 1-hour live online fitness classes, yoga, zumba, HIIT and personal coaching across India. Free trial sessions available.',
    keywords: [
      ...sharedKeywords,
      'free online fitness trial',
      'live fitness coaching',
      'online personal trainer',
    ],
    pageName: 'Home',
    schemaType: 'WebPage',
  },
  '/about': {
    title: 'About OneHour Challenge | Online Fitness Coaching for Real-Life Schedules',
    description:
      'Learn how OneHour Challenge helps busy people build strength, fitness, mobility and consistency with guided 1-hour online training sessions.',
    keywords: [...sharedKeywords, 'about onehour challenge', 'fitness coaching philosophy'],
    pageName: 'About',
    schemaType: 'AboutPage',
  },
  '/programs': {
    title: 'Programs | Fitness, Yoga, Zumba, HIIT and Functional Training',
    description:
      'Explore OneHour Challenge programs including fitness, yoga, zumba, HIIT, functional training and 1-on-1 coaching for every goal.',
    keywords: [...sharedKeywords, 'fitness program online', 'online yoga trainer', 'zumba classes online'],
    pageName: 'Programs',
    schemaType: 'CollectionPage',
  },
  '/plans': {
    title: 'Plans | Choose the Right Online Coaching Plan',
    description:
      'Compare OneHour Challenge coaching plans, trial sessions and training frequency to find the right fit for your schedule and goals.',
    keywords: [...sharedKeywords, 'fitness plans india', 'online coaching plans', 'free trial fitness session'],
    pageName: 'Plans',
    schemaType: 'CollectionPage',
    canonicalPath: '/plans',
  },
  '/pricing': {
    title: 'Plans | Choose the Right Online Coaching Plan',
    description:
      'Compare OneHour Challenge coaching plans, trial sessions and training frequency to find the right fit for your schedule and goals.',
    keywords: [...sharedKeywords, 'fitness plans india', 'online coaching plans', 'free trial fitness session'],
    pageName: 'Plans',
    schemaType: 'CollectionPage',
    canonicalPath: '/plans',
  },
  '/how-it-works': {
    title: 'How It Works | 1-Hour Guided Online Fitness Sessions',
    description:
      'See how OneHour Challenge sessions work with warm-up, focused coaching and recovery in a guided 60-minute online training format.',
    keywords: [...sharedKeywords, 'how online fitness classes work', 'guided online workout', '1 hour training session'],
    pageName: 'How It Works',
    schemaType: 'WebPage',
  },
  '/trainers': {
    title: 'Trainers | Certified Coaches and Nutrition Support',
    description:
      'Meet the OneHour Challenge coaching team with certified trainers, guided support and goal-focused online fitness coaching.',
    keywords: [...sharedKeywords, 'certified fitness coach india', 'online trainer team', 'nutrition coach online'],
    pageName: 'Trainers',
    schemaType: 'ProfilePage',
  },
  '/transformations': {
    title: 'Transformations | Real Fitness Results from OneHour Challenge Members',
    description:
      'Explore real member transformation stories from OneHour Challenge, including fat loss, stamina, strength and flexibility progress.',
    keywords: [...sharedKeywords, 'fitness transformation stories', 'weight loss success online training'],
    pageName: 'Transformations',
    schemaType: 'CollectionPage',
  },
  '/contact': {
    title: 'Contact OneHour Challenge | Start Your Fitness Journey',
    description:
      'Contact OneHour Challenge to ask about plans, programs, free sessions and online coaching across India.',
    keywords: [...sharedKeywords, 'contact online fitness coach', 'book free fitness session'],
    pageName: 'Contact',
    schemaType: 'ContactPage',
  },
};

export function getSeoForPath(pathname) {
  return (
    seoPages[pathname] || {
      title: 'OneHour Challenge | Online Fitness Coaching',
      description:
        'OneHour Challenge offers live online fitness coaching, yoga, zumba and guided 1-hour sessions across India.',
      keywords: sharedKeywords,
      pageName: 'OneHour Challenge',
      schemaType: 'WebPage',
    }
  );
}

export function buildCanonicalUrl(pathname) {
  const meta = getSeoForPath(pathname);
  const canonicalPath = meta.canonicalPath || pathname;
  return canonicalPath === '/' ? SITE_URL : `${SITE_URL}${canonicalPath}`;
}

export function buildSeoSchema(pathname) {
  const meta = getSeoForPath(pathname);
  const canonical = buildCanonicalUrl(pathname);
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
  ];

  if (meta.pageName !== 'Home') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: meta.pageName,
      item: canonical,
    });
  }

  const graph = [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: DEFAULT_OG_IMAGE,
      image: DEFAULT_OG_IMAGE,
      telephone: '+91 95150 22680',
      email: 'manoharbasappagari18@gmail.com',
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: {
        '@id': `${SITE_URL}#organization`,
      },
      inLanguage: 'en-IN',
    },
    {
      '@type': meta.schemaType,
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: meta.title,
      description: meta.description,
      isPartOf: {
        '@id': `${SITE_URL}#website`,
      },
      about: {
        '@id': `${SITE_URL}#organization`,
      },
      primaryImageOfPage: DEFAULT_OG_IMAGE,
      inLanguage: 'en-IN',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: breadcrumbItems,
    },
  ];

  if (pathname === '/') {
    graph.push({
      '@type': 'Service',
      serviceType: 'Online Fitness Coaching',
      provider: {
        '@id': `${SITE_URL}#organization`,
      },
      areaServed: 'India',
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: SITE_URL,
      },
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
