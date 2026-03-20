# OneHour Challenge

OneHour Challenge is a full-stack fitness platform with a React + Vite frontend and a Node.js + Express backend. The project is structured around clear page-based navigation, lead capture, contact handling, admin follow-up, and member account flows.

This version of the project focuses on:

- A more professional page-based website experience
- A refreshed public UI with brighter, cleaner visuals
- A dedicated admin portal with a standalone workspace layout
- Hidden admin access from public navigation
- Registration and enquiry capture from multiple pages
- Better organization for leads, contact requests, and plan enquiries

## Table of Contents

1. Overview
2. Features
3. Tech Stack
4. Project Structure
5. User Flows
6. Environment Variables
7. Local Setup
8. Running the Project
9. Frontend Routes
10. Backend API Overview
11. Admin Portal
12. Deployment Notes
13. Verification
14. Troubleshooting

## 1. Overview

The website is designed as a professional multi-page fitness platform:

- `/` is a dedicated homepage
- `/about`, `/programs`, `/plans`, `/how-it-works`, `/transformations`, `/trainers`, and `/contact` are separate inner pages
- `/dashboard` is for signed-in users
- `/admin` is a standalone admin workspace

Important UI behavior:

- Clicking a menu item opens that page only
- Inner pages do not render the homepage hero/content
- Route changes scroll to the top automatically
- The admin portal does not show the public navbar/footer
- Public admin links are hidden from main navigation and footer
- Admin access is intentionally surfaced only from the trainers page

## 2. Features

### Public Website

- Professional homepage with dedicated sections
- Separate pages for About, Programs, Plans, Trainers, Transformations, Contact, and How It Works
- Registration CTAs across pages
- Lead capture modal for registrations
- WhatsApp trial-session links
- Floating WhatsApp support button
- Clerk-based user login for member dashboard

### Lead and Contact Management

- Page-wise lead capture
- Lead metadata includes source page and enquiry context
- Contact form submissions stored for admin follow-up
- Plan enquiries tracked separately from general registrations

### Admin Portal

- Protected login-based admin workspace
- Overview tab with lead summaries
- Registrations tab
- Plan enquiries tab
- Contact requests tab
- Status update actions
- Delete actions
- Responsive admin UI for desktop, tablet, and mobile

### Member Dashboard

- Clerk-authenticated dashboard access
- Profile creation and editing
- Fitness details and goal tracking
- Booking visibility
- WhatsApp booking actions

## 3. Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Clerk
- Axios
- React Icons
- React Hot Toast
- Vanilla CSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Nodemailer
- OpenAI integration

## 4. Project Structure

```text
ONEHOURCHALLENGE/
|-- client/
|   |-- public/
|   |-- src/
|   |   |-- assets/
|   |   |-- components/
|   |   |   |-- Footer.jsx
|   |   |   |-- LeadCaptureButton.jsx
|   |   |   |-- Navbar.jsx
|   |   |   |-- PageHero.jsx
|   |   |   |-- RegistrationModal.jsx
|   |   |   `-- WhatsAppButton.jsx
|   |   |-- pages/
|   |   |   |-- About.jsx
|   |   |   |-- AdminPortal.jsx
|   |   |   |-- Contact.jsx
|   |   |   |-- Dashboard.jsx
|   |   |   |-- Home.jsx
|   |   |   |-- HowItWorks.jsx
|   |   |   |-- Pricing.jsx
|   |   |   |-- Programs.jsx
|   |   |   |-- Trainers.jsx
|   |   |   `-- Transformations.jsx
|   |   |-- utils/
|   |   |   |-- api.js
|   |   |   `-- constants.js
|   |   |-- App.jsx
|   |   |-- index.css
|   |   `-- main.jsx
|   |-- package.json
|   `-- vite.config.js
|-- server/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- utils/
|   |-- index.js
|   `-- package.json
|-- .gitignore
`-- README.md
```

## 5. User Flows

### A. Public Visitor Flow

1. User lands on the homepage
2. User navigates using the menu
3. Each menu item opens its own full page
4. User can submit:
   - a registration enquiry
   - a plan enquiry
   - a contact enquiry
5. Lead data is sent to the backend
6. Admin reviews it in the admin portal

### B. Contact Flow

1. User opens `/contact`
2. User submits the contact form
3. Backend stores the request
4. Admin sees it in the Contact Requests section

### C. Admin Flow

1. Internal user opens admin portal
2. Admin logs in with configured credentials
3. Admin sees the dashboard overview
4. Admin reviews registrations, plans, and contacts
5. Admin updates status or deletes records as needed

### D. Member Dashboard Flow

1. User signs in with Clerk
2. User opens `/dashboard`
3. User updates profile data
4. User checks bookings and related info

## 6. Environment Variables

Create environment files before running the project.

### Server: `server/.env`

Typical variables used in this project:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
ADMIN_EMAIL=your_admin_email
ADMIN_PHONE=your_admin_phone
ADMIN_PORTAL_USERNAME=admin
ADMIN_PORTAL_PASSWORD=change_this_password
CLIENT_URL=http://localhost:5173
```

### Client: `client/.env`

```env
VITE_API_URL=http://localhost:5000/api
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Notes:

- Use strong admin credentials in production
- Do not commit real secrets to Git
- Keep backend and frontend environment files separate

## 7. Local Setup

### Step 1: Clone the repository

```bash
git clone https://github.com/ManuSSandStrom/ONEHOURCHALLENGE.git
cd ONEHOURCHALLENGE
```

### Step 2: Install frontend dependencies

```bash
cd client
npm install
```

### Step 3: Install backend dependencies

```bash
cd ../server
npm install
```

### Step 4: Add environment variables

- Create `server/.env`
- Create `client/.env`
- Fill them with the correct values

## 8. Running the Project

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

### Production frontend build

```bash
cd client
npm run build
```

## 9. Frontend Routes

### Public Routes

- `/`
- `/about`
- `/programs`
- `/plans`
- `/pricing`
- `/how-it-works`
- `/transformations`
- `/trainers`
- `/contact`

### Protected / Special Routes

- `/dashboard`
- `/admin`

Notes:

- `/plans` and `/pricing` both point to the plans page
- `/admin` uses its own standalone layout
- `/dashboard` is protected through Clerk sign-in state

## 10. Backend API Overview

Below is a high-level overview of the backend route groups used by the project.

### Admin

- `POST /api/admin/login`
- `GET /api/admin/stats`
- `GET /api/admin/leads`
- `GET /api/admin/contacts`
- `PATCH /api/admin/leads/:id/status`
- `PATCH /api/admin/contacts/:id/status`
- `DELETE /api/admin/leads/:id`
- `DELETE /api/admin/contacts/:id`

### Leads / Contact / Registration

- `POST /api/contact`
- `POST /api/leads`

### Profile / Dashboard

- `GET /api/profile/:clerkUserId`
- `POST /api/profile`
- `GET /api/bookings/user/:clerkUserId`

### Other Existing Route Groups

- AI routes
- Booking routes
- Payment routes
- UPI routes

Check the files inside [server/routes](server/routes) and [server/controllers](server/controllers) for exact behavior.

## 11. Admin Portal

### Entry Point

- Route: `/admin`

### Access Model

- Not shown in the public navbar
- Not shown in the footer
- Intended to be accessed internally
- Visible via the trainers page internal-access section

### Admin Login

The admin portal expects credentials configured in `server/.env`:

```env
ADMIN_PORTAL_USERNAME=admin
ADMIN_PORTAL_PASSWORD=change_this_password
```

### Admin Sections

- Overview
- Registrations
- Plan Enquiries
- Contact Requests

### Mobile and Responsive Notes

- Sidebar collapses into a stacked layout on smaller screens
- Cards and lists remain readable on mobile
- Admin actions remain available on tablet and phone widths

## 12. Deployment Notes

### Frontend

- Build with `npm run build`
- Deploy the generated client build output
- For SPA routing, keep redirects configured correctly

### Backend

- Set all required environment variables
- Make sure MongoDB is reachable from the deployment environment
- Ensure Clerk and email credentials are valid

### Important Production Recommendations

- Replace default admin credentials
- Lock down CORS properly
- Use secure HTTPS everywhere
- Consider rate limiting for admin login
- Consider audit logging for admin actions

## 13. Verification

Verified during this update:

- Frontend production build passes

Command used:

```bash
cd client
npm run build
```

## 14. Troubleshooting

### Frontend build fails on Windows PowerShell with `npm.ps1` restriction

Use:

```bash
npm.cmd run build
```

instead of:

```bash
npm run build
```

### Admin page does not open correctly

Check:

- backend is running
- `VITE_API_URL` is correct
- admin credentials are set in `server/.env`

### Leads are not showing in admin

Check:

- MongoDB connection
- backend route registration
- browser network requests
- backend console logs

### Clerk dashboard login does not work

Check:

- `VITE_CLERK_PUBLISHABLE_KEY`
- Clerk app configuration
- allowed redirect URLs

## Git Workflow

To commit and push changes:

```bash
git add .
git commit -m "Refine public UI and redesign admin portal"
git push origin main
```

If your default branch is not `main`, replace it with the correct branch name.
