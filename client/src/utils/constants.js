// Pricing configuration (in INR)
export const PRICING = {
  PRO: {
    '1-Month': 1499,
    '3-Month': 2999,
    '6-Month': 5999,
    'Yearly': 7999,
  },
  ADVANCE: {
    '1-Month': 2999,
    '3-Month': 5999,
    '6-Month': 7999,
    'Yearly': 9999,
  }
};

// Plan features
export const PLAN_FEATURES = {
  PRO: {
    name: 'PRO',
    days: '3 Days/Week',
    maxBookings: 4,
    features: [
      '3 Live sessions per week',
      'Max 4 bookings/week',
      'Access to all programs',
      'Progress tracking',
      'Community access',
    ]
  },
  ADVANCE: {
    name: 'ADVANCE',
    days: '5 Days/Week',
    maxBookings: 6,
    features: [
      '5 Live sessions per week',
      'Max 6 bookings/week',
      'Access to all programs',
      'Progress tracking',
      'Priority support',
      'Community access',
      'Personalized guidance',
    ]
  }
};

// Duration options
export const DURATIONS = ['1-Month', '3-Month', '6-Month', 'Yearly'];

// Time slots
export const TIME_SLOTS = [
  '6:00 AM - 7:00 AM',
  '7:00 AM - 8:00 AM',
  '8:00 AM - 9:00 AM',
  '5:00 PM - 6:00 PM',
  '6:00 PM - 7:00 PM',
  '7:00 PM - 8:00 PM',
  '8:00 PM - 9:00 PM',
];

// Days options
export const DAYS_OPTIONS = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

// Cloudinary placeholders
export const PLACEHOLDERS = {
  heroVideo: '[HERO VIDEO CLOUDINARY URL]',
  aboutImage: '[ABOUT IMAGE – I WILL ADD FROM CLOUDINARY]',
  strengthImage: '[STRENGTH IMAGE CLOUDINARY URL]',
  zumbaImage: '[ZUMBA IMAGE CLOUDINARY URL]',
  yogaImage: '[YOGA IMAGE CLOUDINARY URL]',
  dashboardVideo: '[Dashboard Video Placeholder]',
  trainerImages: [
    '[TRAINER IMAGE CLOUDINARY URL]',
    '[TRAINER IMAGE CLOUDINARY URL]',
    '[TRAINER IMAGE CLOUDINARY URL]',
  ],
  transformationImages: [
    '[TRANSFORMATION IMAGE 1]',
    '[TRANSFORMATION IMAGE 2]',
    '[TRANSFORMATION IMAGE 3]',
    '[TRANSFORMATION IMAGE 4]',
    '[TRANSFORMATION IMAGE 5]',
    '[TRANSFORMATION IMAGE 6]',
  ],
  reviewImages: [
    '[REVIEW IMAGE URL]',
    '[REVIEW IMAGE URL]',
    '[REVIEW IMAGE URL]',
    '[REVIEW IMAGE URL]',
  ]
};

// WhatsApp config
export const WHATSAPP_NUMBER = '919515022680';
export const WHATSAPP_MESSAGE = 'I would like to book a free session for OneHour Challenge.';

export const getWhatsAppUrl = (customMessage) => {
  const msg = customMessage || WHATSAPP_MESSAGE;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};

// Generate a professional WhatsApp payment message for a specific plan
export const getWhatsAppPaymentUrl = (planType, duration, price, userName, userEmail) => {
  const message = `Hi OneHour Challenge Team! 👋

I am interested in the *${planType} Plan* for *${duration}*.

💰 *Amount:* ₹${price.toLocaleString()}
📧 *Email:* ${userEmail || 'N/A'}
👤 *Name:* ${userName || 'N/A'}

I am ready to pay ₹${price.toLocaleString()} for the ${planType} Plan (${duration}). Please share the payment details.

Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

// Generate a WhatsApp message for free session registration
export const getWhatsAppFreeSessionUrl = (sessionType, userName, userEmail) => {
  const message = `Hi! I am interested in a *FREE ${sessionType} Session* at OneHour Challenge. 🏋️

👤 *Name:* ${userName || 'N/A'}
📧 *Email:* ${userEmail || 'N/A'}

Please confirm my free session. Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

// Admin email
export const ADMIN_EMAIL = 'manoharbasappagari18@gmail.com';
export const ADMIN_PHONE = '9515022680';

// UPI Payment config (kept for reference, not used in WhatsApp flow)
export const UPI_ID = '9515022680@ibl';
export const UPI_PAYEE_NAME = 'OneHour Challenge';

export const getUPIPaymentUrl = (amount, transactionNote) => {
  return `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote || 'OneHour Challenge Payment')}`;
};

// Reviews data
export const REVIEWS = [
  {
    name: 'Rahul Sharma',
    initial: 'R',
    rating: 5,
    text: 'OneHour Challenge has completely transformed my fitness journey. The structured sessions and expert trainers make every minute count. Lost 8 kgs in 3 months!',
    date: '2 weeks ago',
  },
  {
    name: 'Priya Reddy',
    initial: 'P',
    rating: 5,
    text: 'As a working professional, I needed something efficient. The 1-hour live sessions fit perfectly into my schedule. The trainers are incredible and the community is supportive.',
    date: '1 month ago',
  },
  {
    name: 'Anil Kumar',
    initial: 'A',
    rating: 5,
    text: 'The Zumba sessions are absolutely energizing! I look forward to every class. The structure and discipline of the program is what sets it apart from others.',
    date: '3 weeks ago',
  },
  {
    name: 'Sneha Verma',
    initial: 'S',
    rating: 4,
    text: 'Yoga sessions have improved my flexibility and mental clarity significantly. The trainers are certified and very professional. Highly recommend for anyone looking for a disciplined fitness routine.',
    date: '1 month ago',
  },
];

// Trainers data
export const TRAINERS = [
  {
    name: 'Coach Vikram',
    certification: 'ACE Certified Personal Trainer',
    experience: '8+ Years',
    specialization: 'Strength & Conditioning',
    image: null,
  },
  {
    name: 'Coach Ananya',
    certification: 'Zumba Licensed Instructor',
    experience: '6+ Years',
    specialization: 'Zumba & Dance Fitness',
    image: null,
  },
  {
    name: 'Coach Deepak',
    certification: 'Yoga Alliance RYT-500',
    experience: '10+ Years',
    specialization: 'Yoga & Mindfulness',
    image: null,
  },
];
