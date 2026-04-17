# OneHour Challenge

OneHour Challenge is a full-stack fitness platform built with a React + Vite frontend and a Node.js + Express backend. The product is designed around a premium public website, guided lead capture, direct contact intake, an AI-assisted support layer, and a hidden admin workspace for follow-up operations.

This repository currently contains:

- A multi-page public website for fitness, yoga, zumba, HIIT, functional training, and 1-on-1 coaching
- Registration and plan enquiry capture from multiple pages
- A dedicated contact form with backend persistence and email notification
- A floating AI assistant for fitness/program guidance
- A hidden admin portal with login, status updates, and enquiry management
- MongoDB-backed lead and contact storage
- Cloudinary-hosted media used across the public website

## Table of Contents

1. Product Overview
2. Current Website Experience
3. Current Features
4. Tech Stack
5. Current Architecture
6. Project Structure
7. Frontend Routes
8. Backend API
9. Data Flow
10. Environment Variables
11. Local Setup
12. Run Commands
13. Admin Portal
14. AI Assistant
15. Current Status and Known Notes
16. Roadmap
17. Deployment Notes
18. Troubleshooting

## 1. Product Overview

The platform presents OneHour Challenge as a modern online coaching brand with a cleaner, page-based experience instead of a long single-scroll landing page.

The current product strategy is:

- Use the public website to explain the brand, programs, plans, and coaching structure
- Capture registrations and plan interest through reusable enquiry flows
- Let visitors contact the team directly using the form, email, phone, or WhatsApp
- Give the internal team a private admin workspace to review and manage incoming enquiries

The website is currently enquiry-first, not payment-first. Visitors submit their details, and the team follows up directly.

## 2. Current Website Experience

### Public Pages

The public website currently includes:

- `/` Home
- `/about`
- `/programs`
- `/plans`
- `/pricing` which points to the same plans page
- `/how-it-works`
- `/transformations`
- `/trainers`
- `/contact`

### Public Experience Design

The public-facing site currently provides:

- A dedicated homepage with premium hero, program discovery, free-session messaging, trust sections, reviews, and contact CTAs
- Standalone inner pages instead of mixing all sections into one screen
- Route-based page transitions with Framer Motion
- Scroll-to-top behavior on route changes
- Floating WhatsApp support access
- Floating AI assistant access
- Reusable registration modal from multiple CTA locations

### Hidden Admin Access

The admin portal is intentionally hidden from the public navbar and footer.

Current access model:

- Admin route exists at `/admin`
- Hidden secure-entry UI is surfaced from the trainers page
- Admin login is also available directly on `/admin`

## 3. Current Features

### Public Website

- Premium homepage with structured content blocks
- Separate About, Programs, Plans, Trainers, Transformations, Contact, and How It Works pages
- CTA-driven lead capture across pages
- Free-session and WhatsApp support messaging
- Cloudinary-hosted imagery across major sections

### Lead Capture

- Reusable registration modal launched from CTA buttons
- Captures:
  - name
  - mobile
  - age
  - location
  - optional email
  - optional message
- Stores lead metadata such as:
  - source page
  - source path
  - interest type
  - interest label
  - selected plan
  - selected duration

### Contact Intake

- Dedicated contact page with full form
- Contact form stores a `Contact` record
- Contact form also creates a linked `Lead`-style record for admin visibility
- Sends an admin notification email through Nodemailer

### Admin Workspace

- Login-protected workspace
- Overview dashboard
- Registration leads view
- Plan enquiries view
- Contact requests view
- Status changes:
  - `new`
  - `contacted`
  - `closed`
  - `not-interested`
- Delete actions for leads and contacts
- Page-level and interest-level lead summaries

### AI Assistant

- Floating side panel on the public site
- AI chat tab
- Calorie calculator tab
- Supports OpenAI-compatible usage through `OPENAI_API_KEY`
- Detects OpenRouter-style keys starting with `sk-or-`
- Falls back to rule-based fitness replies if the AI provider is unavailable

### Backend Integrations

- MongoDB for persistence
- Nodemailer for contact and lead emails
- OpenAI/OpenRouter-compatible assistant integration
- Cloudinary assets currently used for delivery of images in the UI

## 4. Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- React Hot Toast
- Framer Motion
- React Icons
- Vanilla CSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Nodemailer
- OpenAI SDK

### Installed but Not Yet Fully Productized

- Cloudinary SDK is present in the backend dependency list
- Multer is installed

These are ready for deeper upload/media workflows in a later phase, but the current public website mainly uses hosted Cloudinary URLs directly in the frontend.

## 5. Current Architecture

### Frontend

The frontend now uses a cleaner structure:

- `src/app` for app-level wiring
- `src/layouts` for route shells
- `src/pages` for page-level screens
- `src/components` for reusable UI blocks
- `src/utils` for API and content helpers

Current frontend layout strategy:

- `PublicLayout` wraps public routes with navbar, footer, page progress, AI assistant, scroll reveal, and WhatsApp button
- `AdminWorkspaceLayout` isolates the admin experience from the public shell

### Backend

The backend now uses a `src`-based structure:

- `src/server.js` starts the app
- `src/app.js` composes middleware and routes
- `src/config` holds env, database, CORS, and logging helpers
- `src/routes` groups route modules
- `src/controllers` contains request handlers
- `src/models` contains Mongoose schemas
- `src/middleware` contains auth and error utilities

## 6. Project Structure

```text
ONEHOURCHALLENGE/
|-- client/
|   |-- public/
|   |-- src/
|   |   |-- app/
|   |   |   |-- App.jsx
|   |   |   `-- AppRoutes.jsx
|   |   |-- assets/
|   |   |-- components/
|   |   |   |-- AIAssistant.jsx
|   |   |   |-- Footer.jsx
|   |   |   |-- LeadCaptureButton.jsx
|   |   |   |-- Navbar.jsx
|   |   |   |-- PageHero.jsx
|   |   |   |-- PageProgressBar.jsx
|   |   |   |-- RegistrationModal.jsx
|   |   |   |-- ScrollReveal.jsx
|   |   |   `-- WhatsAppButton.jsx
|   |   |-- layouts/
|   |   |   |-- AdminWorkspaceLayout.jsx
|   |   |   `-- PublicLayout.jsx
|   |   |-- pages/
|   |   |   |-- About.jsx
|   |   |   |-- AdminPortal.jsx
|   |   |   |-- Contact.jsx
|   |   |   |-- Home.jsx
|   |   |   |-- HowItWorks.jsx
|   |   |   |-- Pricing.jsx
|   |   |   |-- Programs.jsx
|   |   |   |-- Trainers.jsx
|   |   |   `-- Transformations.jsx
|   |   |-- utils/
|   |   |   |-- api.js
|   |   |   |-- constants.js
|   |   |   `-- seo.js
|   |   |-- App.jsx
|   |   |-- index.css
|   |   `-- main.jsx
|   |-- .env.example
|   |-- package.json
|   `-- vite.config.js
|-- server/
|   |-- src/
|   |   |-- config/
|   |   |   |-- cors.js
|   |   |   |-- database.js
|   |   |   |-- env.js
|   |   |   `-- logger.js
|   |   |-- controllers/
|   |   |   |-- adminAuthController.js
|   |   |   |-- adminController.js
|   |   |   |-- aiController.js
|   |   |   |-- bookingController.js
|   |   |   |-- contactController.js
|   |   |   |-- healthController.js
|   |   |   `-- leadController.js
|   |   |-- middleware/
|   |   |   |-- adminAuth.js
|   |   |   |-- errorHandler.js
|   |   |   `-- notFound.js
|   |   |-- models/
|   |   |   |-- Booking.js
|   |   |   |-- Contact.js
|   |   |   `-- Lead.js
|   |   |-- routes/
|   |   |   |-- adminRoutes.js
|   |   |   |-- aiRoutes.js
|   |   |   |-- bookingRoutes.js
|   |   |   |-- contactRoutes.js
|   |   |   |-- index.js
|   |   |   `-- leadRoutes.js
|   |   |-- utils/
|   |   |   `-- mailer.js
|   |   |-- app.js
|   |   `-- server.js
|   |-- .env.example
|   |-- index.js
|   `-- package.json
|-- .gitignore
`-- README.md
```

## 7. Frontend Routes

### Public Routes

- `/` Home page
- `/about` Brand and method page
- `/programs` Program overview page
- `/plans` Plan selection page
- `/pricing` Alias of the plans page
- `/how-it-works` Session structure and process page
- `/transformations` Social proof and result stories
- `/trainers` Coach trust page plus hidden secure access entry
- `/contact` Direct enquiry page

### Admin Route

- `/admin` Private admin workspace

## 8. Backend API

### Health

- `GET /api/health`

### Leads

- `POST /api/leads`
- `GET /api/leads`
- `PATCH /api/leads/:id/status`

### Contact

- `POST /api/contact`

### Admin

- `POST /api/admin/login`
- `GET /api/admin/stats`
- `GET /api/admin/leads`
- `PATCH /api/admin/leads/:id/status`
- `DELETE /api/admin/leads/:id`
- `GET /api/admin/contacts`
- `PATCH /api/admin/contacts/:id/status`
- `DELETE /api/admin/contacts/:id`
- `GET /api/admin/bookings`
- `GET /api/admin/export/bookings`

### AI

- `POST /api/ai/chat`
- `POST /api/ai/lead`

### Booking

- `POST /api/bookings`
- `GET /api/bookings/user/:userId`
- `GET /api/bookings/all`

## 9. Data Flow

### Registration CTA Flow

1. User clicks a CTA that uses `LeadCaptureButton`
2. `RegistrationModal` opens
3. User submits enquiry details
4. Frontend sends `POST /api/leads`
5. Backend stores the lead in MongoDB
6. Admin sees the record under Registrations or Plan Enquiries

### Contact Flow

1. User opens `/contact`
2. User submits the contact form
3. Frontend sends `POST /api/contact`
4. Backend stores:
   - a `Contact` record
   - a `Lead` record with `interestType: contact`
5. Backend triggers contact email notification in the background
6. Admin sees the request in Contact Requests

### Admin Flow

1. Internal user visits `/admin` or enters from the trainers page
2. Admin submits credentials
3. Backend verifies credentials from environment variables
4. Frontend stores the returned admin token in local storage
5. Subsequent admin API requests send `Authorization: Bearer <token>`
6. Admin manages statuses and deletes records as needed

### AI Flow

1. User opens the AI assistant panel
2. User sends a chat message
3. Frontend sends `POST /api/ai/chat`
4. Backend tries OpenAI/OpenRouter
5. If unavailable, backend returns fallback fitness guidance
6. Optional lead conversation history can be appended to a lead record

## 10. Environment Variables

Create local environment files before running the project.

### Server: `server/.env`

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

MONGODB_URI=your_mongodb_connection_string

OPENAI_API_KEY=your_openai_or_openrouter_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password
ADMIN_EMAIL=alerts@example.com

ADMIN_PORTAL_USERNAME=admin
ADMIN_PORTAL_PASSWORD=change_this_password
```

### Client: `client/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

### Important Notes

- Do not commit real secrets
- Keep `server/.env` and `client/.env` local only
- `server/.env.example` and `client/.env.example` are the tracked templates
- For local development, prefer:
  - `NODE_ENV=development`
  - `CLIENT_URL=http://localhost:5173`

## 11. Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/ManuSSandStrom/ONEHOURCHALLENGE.git
cd ONEHOURCHALLENGE
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

### 4. Add environment files

- Create `server/.env`
- Create `client/.env`
- Copy values from the example files and replace placeholders

## 12. Run Commands

### Start the backend

```bash
cd server
npm run dev
```

### Start the frontend

```bash
cd client
npm run dev
```

### Frontend production build

```bash
cd client
npm run build
```

### Windows PowerShell note

If `npm.ps1` execution is blocked, use:

```bash
npm.cmd run build
```

## 13. Admin Portal

### Access

- Primary route: `/admin`
- Hidden secure launcher: trainers page lock icon

### Current Capabilities

- Login gate
- Overview summary cards
- Lead counts by page
- Lead counts by interest
- Registration lead list
- Plan enquiry list
- Contact request list
- Status actions
- Delete actions
- Responsive admin layout

### Current Auth Model

The current implementation uses a lightweight environment-driven token flow:

- credentials are compared against `ADMIN_PORTAL_USERNAME` and `ADMIN_PORTAL_PASSWORD`
- token is a base64 value derived from username and password
- token is stored in browser local storage

This works for the current internal-only workflow, but it is not the final target architecture.

## 14. AI Assistant

The public site includes a floating tools panel with:

- AI assistant chat
- Calorie calculator

The assistant is intended to answer:

- program questions
- plan questions
- session format questions
- trainer questions
- registration flow questions

Behavior notes:

- If `OPENAI_API_KEY` is present, the backend attempts real AI completion
- If the key starts with `sk-or-`, the backend treats it as an OpenRouter-style key
- If AI fails, the system still replies using structured fallback responses
- Off-topic prompts are intentionally redirected back to fitness and brand support

## 15. Current Status and Known Notes

### What Is Already Working

- Multi-page public website
- Lead capture modal
- Plan enquiry flow
- Contact form persistence
- Admin login and admin workspace
- Lead and contact status updates
- Lead and contact deletion
- AI assistant with fallback logic
- MongoDB persistence
- Nodemailer contact notifications

### Current Implementation Notes

- The backend still includes booking routes and booking-related admin stats
- The public website currently centers on enquiries rather than a visible booking checkout flow
- Cloudinary is actively used for hosted media URLs in the frontend, but a dedicated upload workflow is not yet wired into the public/admin product
- Admin auth is currently custom and lightweight, not JWT-based yet
- API responses are not yet fully standardized across every controller
- Validation and security hardening are still lighter than final production target

### Recommended Current Reading for Contributors

Start here if you are modifying the app:

- Frontend shell: [client/src/app/AppRoutes.jsx](/c:/Users/Nandeesh%20kumar/OneDrive/Documents/ONEHOURCHALLENGE-main/client/src/app/AppRoutes.jsx)
- Public layout: [client/src/layouts/PublicLayout.jsx](/c:/Users/Nandeesh%20kumar/OneDrive/Documents/ONEHOURCHALLENGE-main/client/src/layouts/PublicLayout.jsx)
- Admin portal: [client/src/pages/AdminPortal.jsx](/c:/Users/Nandeesh%20kumar/OneDrive/Documents/ONEHOURCHALLENGE-main/client/src/pages/AdminPortal.jsx)
- Lead modal: [client/src/components/RegistrationModal.jsx](/c:/Users/Nandeesh%20kumar/OneDrive/Documents/ONEHOURCHALLENGE-main/client/src/components/RegistrationModal.jsx)
- Backend app: [server/src/app.js](/c:/Users/Nandeesh%20kumar/OneDrive/Documents/ONEHOURCHALLENGE-main/server/src/app.js)
- Route map: [server/src/routes/index.js](/c:/Users/Nandeesh%20kumar/OneDrive/Documents/ONEHOURCHALLENGE-main/server/src/routes/index.js)

## 16. Roadmap

This is the current upgrade direction for the project.

### Phase 1: Backend Hardening

- Move admin auth to JWT
- Hash admin passwords
- Add request validation
- Standardize API response format
- Add rate limiting
- Add Helmet and tighter CORS rules
- Improve logging and central error handling

### Phase 2: SaaS-Level Admin Workspace

- Add search, filters, and pagination
- Add richer dashboard analytics
- Add source-based reporting
- Add notes/history per lead
- Add role-ready auth structure

### Phase 3: Cloudinary Media Workflow

- Add signed uploads for admin-managed images and videos
- Store media metadata in MongoDB
- Replace placeholder/static media handling with managed asset workflows

### Phase 4: Frontend System Upgrade

- Introduce a more scalable design system
- Add loading, empty, and error states across all data views
- Improve accessibility and keyboard behavior
- Add lazy loading and better code splitting

### Phase 5: Quality and Deployment

- Add backend API tests
- Add frontend component and flow tests
- Add deployment docs for Vercel/Render or AWS
- Add CI-friendly verification steps

## 17. Deployment Notes

### Frontend

- Build the client with `npm run build`
- Deploy the generated output to a static host such as Netlify or Vercel
- Keep SPA rewrites enabled

### Backend

- Deploy the Express server to a Node-compatible host such as Render, Railway, or AWS
- Configure all required environment variables
- Ensure MongoDB network access is configured
- Ensure email provider credentials are valid

### Production Checklist

- Use strong admin credentials
- Set `CLIENT_URL` to the real frontend domain
- Restrict CORS to the production frontend domain
- Use HTTPS only
- Rotate exposed or old keys if they were ever shared publicly

## 18. Troubleshooting

### Admin page does not load data

Check:

- backend server is running
- `VITE_API_URL` is correct
- admin credentials are set in `server/.env`
- browser local storage still holds a valid admin token

### Contact submissions are not arriving

Check:

- MongoDB connection
- `EMAIL_USER`, `EMAIL_PASS`, and `ADMIN_EMAIL`
- backend logs for Nodemailer errors

### AI assistant is not responding correctly

Check:

- `OPENAI_API_KEY`
- whether the key is OpenAI or OpenRouter style
- backend console output for AI fallback messages

### Frontend build issues on Windows PowerShell

Use:

```bash
npm.cmd run build
```

instead of:

```bash
npm run build
```
