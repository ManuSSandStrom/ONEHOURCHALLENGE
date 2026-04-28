export const PLAN_FEATURES = {
  PRO: {
    name: 'PRO',
    days: '3 Days/Week',
    maxBookings: 4,
    features: [
      '3 live sessions per week',
      'Max 4 bookings per week',
      'Access to all programs',
      'Progress tracking',
      'Community access',
    ],
  },
  ADVANCE: {
    name: 'ADVANCE',
    days: '5 Days/Week',
    maxBookings: 6,
    features: [
      '5 live sessions per week',
      'Max 6 bookings per week',
      'Access to all programs',
      'Progress tracking',
      'Priority support',
      'Community access',
      'Personalized guidance',
    ],
  },
};

export const WHATSAPP_NUMBER = '919515022680';
export const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;
export const CONTACT_EMAIL = 'manoharbasappagari18@gmail.com';
export const CONTACT_PHONE = '+91 95150 22680';
export const API_BASE = import.meta.env.VITE_API_URL || 'https://onehourchallenge.onrender.com/api';

export const PROGRAMS = [
  {
    id: 'hiit',
    name: 'Fitness & HIIT',
    title: 'Fitness & HIIT',
    label: 'Build stamina, strength, and fat-loss momentum with coach-led full-body sessions.',
    features: ['Build stamina', 'Fat-loss momentum', 'Full-body sessions'],
    image: 'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512241/Strength_part2_tzrm1t.png',
  },
  {
    id: 'yoga',
    name: 'Yoga & Mobility',
    title: 'Yoga & Mobility',
    label: 'Improve flexibility, posture, breathing, and recovery with calm guided practice.',
    features: ['Flexibility work', 'Posture improvement', 'Mind-body balance'],
    image: 'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512244/yoga_part4_mnslxd.png',
  },
  {
    id: 'zumba',
    name: 'Zumba Cardio',
    title: 'Zumba Cardio',
    label: 'Stay consistent with high-energy dance cardio that feels fun and approachable.',
    features: ['High-energy cardio', 'Fun guided sessions', 'Group motivation'],
    image: 'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512247/Zomba_Training_kws7pi.png',
  },
  {
    id: 'one-on-one',
    name: '1-on-1 Coaching',
    title: '1-on-1 Coaching',
    label: 'Get a focused path with closer support, accountability, and personal guidance.',
    features: ['Dedicated coach support', 'Clear progression', 'Focused accountability'],
    image: 'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771782797/Gemini_Generated_Image_s8xw7ls8xw7ls8xw_1_z96yp5.png',
  },
  {
    id: 'functional',
    name: 'Functional Training',
    title: 'Functional Training',
    label: 'Train for real-life strength with joint-friendly, progressive programming.',
    features: ['Strength for daily life', 'Better movement', 'Joint-friendly'],
    image: 'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512241/ST_2_xhbjg9.png',
  },
];

export const PLANS = {
  PRO: {
    name: 'PRO',
    subtitle: 'Balanced Coaching',
    frequency: '3 Days/Week',
    maxBookings: 4,
    features: PLAN_FEATURES.PRO.features,
  },
  ADVANCE: {
    name: 'ADVANCE',
    subtitle: 'Intensive Coaching',
    frequency: '5 Days/Week',
    maxBookings: 6,
    features: PLAN_FEATURES.ADVANCE.features,
  },
};

export const DURATIONS = [
  { key: 'Starter', label: 'Starter', note: 'Best for first-time members', summary: 'A simple way to begin, understand the coaching style, and build your first routine.', recommended: false },
  { key: '3 Months', label: '3 Months', note: 'Most chosen', summary: 'A focused phase for building momentum, visible discipline, and measurable progress.', recommended: true },
  { key: '6 Months', label: '6 Months', note: 'Best for stronger transformation', summary: 'Ideal for members who want enough time to improve stamina, strength, and overall fitness.', recommended: false },
  { key: 'Long Term', label: 'Long Term', note: 'Best for lifestyle change', summary: 'Built for long-term consistency when fitness becomes part of your everyday routine.', recommended: false },
];

export const FREE_SESSION_OPTIONS = [
  {
    type: 'Yoga',
    label: 'Wellness and Flow',
    desc: 'Gentle strength, flexibility work, and a calmer reset for busy schedules.',
    day: 'Tuesday and Saturday',
    time: '7:00 PM',
    seats: 6,
    featured: false,
    isNew: true,
  },
  {
    type: 'Fitness',
    label: 'Power Hour',
    desc: 'High-energy coaching focused on fat loss, stamina, and full-body momentum.',
    day: 'Monday and Thursday',
    time: '6:30 AM',
    seats: 4,
    featured: true,
    isNew: true,
  },
  {
    type: 'Zumba',
    label: 'Rhythm and Sweat',
    desc: 'Cardio dance sessions that keep motivation high and movement fun.',
    day: 'Wednesday and Friday',
    time: '7:30 PM',
    seats: 5,
    featured: false,
    isNew: true,
  },
];

export const PLACEHOLDERS = {
  heroVideo: '[HERO VIDEO CLOUDINARY URL]',
  aboutImage: '[ABOUT IMAGE PLACEHOLDER]',
  strengthImage: '[STRENGTH IMAGE CLOUDINARY URL]',
  zumbaImage: '[ZUMBA IMAGE CLOUDINARY URL]',
  yogaImage: '[YOGA IMAGE CLOUDINARY URL]',
  dashboardVideo: '[DASHBOARD VIDEO PLACEHOLDER]',
  trainerImages: [
    '[TRAINER IMAGE CLOUDINARY URL]',
    '[TRAINER IMAGE CLOUDINARY URL]',
    '[TRAINER IMAGE CLOUDINARY URL]',
  ],
  transformationImages: [
    'https://res.cloudinary.com/dt37ji5yp/image/upload/v1772080466/img1_mmu5bz.png',
    'https://res.cloudinary.com/dt37ji5yp/image/upload/v1772080466/img2_rwnkp6.png',
    'https://res.cloudinary.com/dt37ji5yp/image/upload/v1772080466/img3_q6dg33.png',
    'https://res.cloudinary.com/dt37ji5yp/image/upload/v1772080465/img4_ksgdcq.png',
    'https://res.cloudinary.com/dt37ji5yp/image/upload/v1772080466/img5_qv8cnc.png',
    'https://res.cloudinary.com/dt37ji5yp/image/upload/v1772080466/img6_g82dnf.png',
  ],
  reviewImages: [
    '[REVIEW IMAGE URL]',
    '[REVIEW IMAGE URL]',
    '[REVIEW IMAGE URL]',
    '[REVIEW IMAGE URL]',
  ],
};

export const WHATSAPP_MESSAGE = 'I would like to book a free session for OneHour Challenge.';

export const getWhatsAppUrl = (customMessage) => {
  const msg = customMessage || WHATSAPP_MESSAGE;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};

export const getWhatsAppFreeSessionUrl = (sessionType, userName, userEmail) => {
  const message = [
    `Hi, I am interested in a free ${sessionType} session at OneHour Challenge.`,
    '',
    `Name: ${userName || 'N/A'}`,
    `Email: ${userEmail || 'N/A'}`,
    '',
    'Please confirm my free session. Thank you.',
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const ADMIN_EMAIL = CONTACT_EMAIL;
export const ADMIN_PHONE = '9515022680';

export const REVIEWS = [
  {
    name: 'Rahul Sharma',
    initial: 'R',
    rating: 5,
    text: 'OneHour Challenge transformed my routine. The sessions are structured and the trainers make every minute count.',
    date: '2 weeks ago',
  },
  {
    name: 'Priya Reddy',
    initial: 'P',
    rating: 5,
    text: 'The one-hour live sessions fit perfectly into my schedule. The coaching feels focused and practical.',
    date: '1 month ago',
  },
  {
    name: 'Anil Kumar',
    initial: 'A',
    rating: 5,
    text: 'The Zumba sessions are energizing and consistent. The structure is what sets the platform apart.',
    date: '3 weeks ago',
  },
  {
    name: 'Sneha Verma',
    initial: 'S',
    rating: 4,
    text: 'Yoga sessions improved my flexibility and mental clarity. The coaching feels professional and supportive.',
    date: '1 month ago',
  },
];

export const TRAINERS = [
  {
    name: 'Coach Vikram',
    certification: 'ACE Certified Personal Trainer',
    experience: '8+ Years',
    specialization: 'Strength and Conditioning',
    image: null,
  },
  {
    name: 'Coach Ananya',
    certification: 'Zumba Licensed Instructor',
    experience: '6+ Years',
    specialization: 'Zumba and Dance Fitness',
    image: null,
  },
  {
    name: 'Coach Deepak',
    certification: 'Yoga Alliance RYT-500',
    experience: '10+ Years',
    specialization: 'Yoga and Mindfulness',
    image: null,
  },
];
