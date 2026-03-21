# OneHour Challenge

OneHour Challenge is a full-stack fitness platform with a React frontend and Node.js/Express backend. The website now supports:

- Page-wise lead capture with registration forms
- Contact form submissions stored in the admin portal
- Free trial session booking through WhatsApp only
- Floating WhatsApp support button
- Protected admin portal for lead management

## Main Flow

- Most website CTAs now open a registration form.
- Each registration stores:
  - name
  - mobile number
  - gender
  - age
  - email if provided
  - message/notes
  - source page
  - interest type
  - selected plan and duration where applicable
- Contact page submissions go directly to the backend and appear in the admin portal.
- Free trial session buttons still go to WhatsApp.
- The floating WhatsApp button still opens WhatsApp.

## Admin Portal

- Route: `/admin`
- Login is required before viewing leads.
- Default admin credentials:
  - Username: `admin`
  - Password: `OHCAdmin@2026`

These values are currently configured in [server/.env](server/.env) as:

```env
ADMIN_PORTAL_USERNAME=admin
ADMIN_PORTAL_PASSWORD=OHCAdmin@2026
```

You can change them any time in `server/.env`.

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Clerk
- React Icons
- Vanilla CSS

### Backend

- Node.js
- Express
- MongoDB / Mongoose
- Nodemailer
- OpenAI integration

## Project Structure

```text
ONEHOURCHALLENGE/
|-- client/
|   |-- src/
|   |   |-- components/
|   |   |-- pages/
|   |   |-- utils/
|   |   `-- App.jsx
|   `-- index.css
`-- server/
    |-- controllers/
    |-- middleware/
    |-- models/
    |-- routes/
    `-- index.js
```

## Setup

### 1. Install server dependencies

```bash
cd server
npm install
```

### 2. Install client dependencies

```bash
cd ../client
npm install
```

### 3. Configure environment variables

Server environment file: `server/.env`

Important values:

- `MONGODB_URI`
- `OPENAI_API_KEY`
- `EMAIL_USER`
- `EMAIL_PASS`
- `ADMIN_EMAIL`
- `ADMIN_PORTAL_USERNAME`
- `ADMIN_PORTAL_PASSWORD`

Client environment file: `client/.env`

Important values:

- `VITE_API_URL`
- `VITE_CLERK_PUBLISHABLE_KEY`

## Run Locally

### Backend

```bash
cd server
npm run dev
```

### Frontend

```bash
cd client
npm run dev
```

## Admin APIs

Protected admin routes require admin login.

- `POST /api/admin/login`
- `GET /api/admin/stats`
- `GET /api/admin/leads`
- `PATCH /api/admin/leads/:id/status`
- `GET /api/admin/bookings`
- `GET /api/admin/payments`

## Notes

- Contact form submissions are stored in both `contacts` and `leads`.
- Registration leads are grouped in the admin portal by page and interest.
- The admin portal is intended for internal use and should be protected further for production if needed.

## Verification

Verified locally:

- client lint passes
- frontend production build passes
- updated server files pass `node --check`
