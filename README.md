# OneHour Challenge - Premium Online Fitness Platform

![OneHour Challenge Logo](https://res.cloudinary.com/dt37ji5yp/image/upload/v1771514832/Onehour_2__page-0001_zy1elu.jpg)

**OneHour Challenge** is a sophisticated, full-stack fitness platform designed for modern professionals. It offers 1-hour live online sessions including **Fitness**, **Zumba**, and **Yoga**. The platform features an integrated AI Fitness Assistant, a precise Calorie Calculator, and a direct-to-WhatsApp communication bridge for seamless client conversions.

---

## ✨ Key Features

### 🏋️ Specialized Fitness Programs

- **Fitness:** Expert-led sessions focused on muscle building and metabolism.
- **Zumba:** High-energy cardio dance sessions for calorie burning and stress relief.
- **Yoga:** Specialized flow sessions for flexibility, mobility, and mental clarity.

### 🤖 AI Fitness Assistant

- Real-time fitness guidance powered by GPT architectures (OpenRouter/OpenAI integration).
- Professional support for program details, pricing, and workout advice.
- Intelligent fallback system for constant availability.

### ⚖️ Calorie Calculator

- High-precision BMR and Maintenance calorie calculator.
- Professional "Activity Level" selection tailored for different lifestyles.
- Premium glassmorphism design optimized for mobile and desktop.

### 📱 Seamless WhatsApp Connectivity

- Dual-channel communication: Contact forms and booking CTAs lead directly to a WhatsApp business bridge.
- Pre-filled professional message formatting for higher conversion rates.
- Instant admin notification via WhatsApp Business.

### 🍱 Premium UI/UX

- **Modern Aesthetic:** A sleek "Premium Dark Theme" with deep charcoal tones and vibrant green accents.
- **Responsive Navigation:** Optimized mobile header that declutters on small screens.
- **Interactive Animations:** Smooth scroll reveals and dynamic hover states for a high-end feel.

---

## 🛠️ Tech Stack

### Frontend

- **React 19** with **Vite** for lightning-fast delivery.
- **Clerk** for secure, enterprise-grade authentication.
- **React Router Dom** for seamless SPA navigation.
- **React Icons** for consistent, professional iconography.
- **Vanilla CSS** with CSS Variables (Total control over the design system).

### Backend

- **Node.js** & **Express** server architecture.
- **MongoDB Atlas** for scalable data management.
- **OpenAI / OpenRouter API** for the intelligent assistant.
- **Nodemailer** for automated professional email notifications.
- **CORS** configured for multi-origin development and production security.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas Account
- Clerk Account
- OpenAI / OpenRouter API Key

### Installation

1. **Clone the repository:**

   ```bash
   git clone [repository-url]
   cd ONEHOURCHALLENGE
   ```

2. **Server Setup:**

   ```bash
   cd server
   npm install
   # Create a .env file based on .env.example
   npm run dev
   ```

3. **Client Setup:**
   ```bash
   cd ../client
   npm install
   # Configure VITE_API_URL in .env
   npm run dev
   ```

---

## 📁 Project Structure

```text
ONEHOURCHALLENGE/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, Calculator, AI)
│   │   ├── pages/          # Full page views (Home, Contact, Dashboard)
│   │   ├── utils/          # Constants, API configurations
│   │   └── App.jsx         # Main application routing
│   └── index.css           # Global premium design system
└── server/                 # Node.js backend application
    ├── controllers/        # Business logic for AI, Contact, and Lead management
    ├── models/             # Mongoose schemas (Leads, Contacts, Sessions)
    ├── routes/             # Express API endpoints
    └── index.js            # Main server entry point
```

## 🚀 Deployment Guide

### Backend (Render)

1. **New Web Service**: Connect your GitHub repository.
2. **Build Command**: `cd server && npm install`
3. **Start Command**: `node server/index.js` (or set `Root Directory` to `server` and use `node index.js`)
4. **Environment Variables**:
   - `MONGODB_URI`
   - `OPENAI_API_KEY`
   - `CLERK_SECRET_KEY`
   - `CLIENT_URL`: Your Netlify URL (e.g., `https://your-app.netlify.app`)
   - `NODE_ENV`: `production`

### Frontend (Netlify)

1. **New Site**: Import from GitHub.
2. **Base Directory**: `client`
3. **Build Command**: `npm run build`
4. **Publish Directory**: `client/dist`
5. **Environment Variables**:
   - `VITE_API_URL`: Your Render URL (e.g., `https://your-api.onrender.com/api`)
   - `VITE_CLERK_PUBLISHABLE_KEY`: Your Clerk Public Key

---

## 🔑 Environment Variables

### Server (`/server/.env`)

- `MONGODB_URI`: Your MongoDB connection string.
- `OPENAI_API_KEY`: API Key for the AI assistant.
- `CLIENT_URL`: URL of your frontend (e.g., `https://your-app.netlify.app`).
- `CLERK_SECRET_KEY`: Private key from Clerk dashboard.

### Client (`/client/.env`)

- `VITE_CLERK_PUBLISHABLE_KEY`: Public key from Clerk.
- `VITE_API_URL`: Backend API URL (e.g., `https://onehourchallenge.onrender.com/api`).

---

## 📞 Support & Contact

- **Admin Email:** manoharbasappagari18@gmail.com
- **Business WhatsApp:** +91 95150 22680
- **Website:** [https://onehourchallenge.onrender.com](https://onehourchallenge.onrender.com) (or your Netlify URL)

---

© 2026 OneHour Challenge. Built for Discipline. Designed for Results.
