export const PRICING = {
  PRO: {
    '1-Month': 1499,
    '3-Month': 2999,
    '6-Month': 5999,
    Yearly: 7999,
  },
  ADVANCE: {
    '1-Month': 2999,
    '3-Month': 5999,
    '6-Month': 7999,
    Yearly: 9999,
  },
};

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

export const DURATIONS = ['1-Month', '3-Month', '6-Month', 'Yearly'];

export const TIME_SLOTS = [
  '6:00 AM - 7:00 AM',
  '7:00 AM - 8:00 AM',
  '8:00 AM - 9:00 AM',
  '5:00 PM - 6:00 PM',
  '6:00 PM - 7:00 PM',
  '7:00 PM - 8:00 PM',
  '8:00 PM - 9:00 PM',
];

export const DAYS_OPTIONS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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

export const WHATSAPP_NUMBER = '919515022680';
export const WHATSAPP_MESSAGE = 'I would like to book a free session for OneHour Challenge.';

export const getWhatsAppUrl = (customMessage) => {
  const msg = customMessage || WHATSAPP_MESSAGE;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};

export const getWhatsAppPaymentUrl = (planType, duration, price, userName, userEmail) => {
  const message = [
    'Hi OneHour Challenge Team,',
    '',
    `I am interested in the ${planType} Plan for ${duration}.`,
    '',
    `Amount: Rs. ${price.toLocaleString('en-IN')}`,
    `Email: ${userEmail || 'N/A'}`,
    `Name: ${userName || 'N/A'}`,
    '',
    `Please share the payment details for the ${planType} Plan (${duration}).`,
    '',
    'Thank you.',
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
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

export const ADMIN_EMAIL = 'manoharbasappagari18@gmail.com';
export const ADMIN_PHONE = '9515022680';

export const UPI_ID = '9515022680@ibl';
export const UPI_PAYEE_NAME = 'OneHour Challenge';

export const getUPIPaymentUrl = (amount, transactionNote) => {
  return `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote || 'OneHour Challenge Payment')}`;
};

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
