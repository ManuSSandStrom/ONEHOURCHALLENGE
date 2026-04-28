# OneHour Challenge

OneHour Challenge is a full-stack online fitness coaching website built with a React + Vite frontend and a Node.js + Express backend. The current product is an enquiry-first coaching platform for live 1-hour fitness, yoga, zumba, HIIT, functional training, and 1-on-1 coaching sessions.

The website does not currently sell plans through an online checkout. Visitors explore programs and plans, submit their details through lead forms, contact the team, or reserve free trial seats through WhatsApp. The backend stores leads and contacts in MongoDB and exposes a hidden admin workspace for follow-up.

## Table of Contents

1. Product Summary
2. Current Website Content
3. Routes and Navigation
4. Hero Background Media
5. Image and Media URLs
6. Current Colors and Theme
7. Pricing and Plans
8. Free Trial Sessions
9. Contact Details
10. Lead Capture Content
11. Admin Portal
12. Tech Stack
13. Project Structure
14. Backend API
15. Environment Variables
16. Local Setup
17. Run Commands
18. Deployment Notes
19. Known Notes

## 1. Product Summary

OneHour Challenge presents a simple coaching promise:

> One focused hour to build a stronger, healthier routine.

The current site focuses on:

- Live online fitness coaching across India
- 60-minute guided sessions
- Fitness, yoga, zumba, HIIT, functional training, and 1-on-1 coaching
- Free trial session booking through WhatsApp
- Plan enquiry and registration lead capture
- Trainer credibility and transformation proof
- Hidden admin workflow for managing registrations, plan enquiries, and contact requests

The primary audience is busy people who want structured online coaching without a complicated booking or payment flow.

## 2. Current Website Content

### Homepage

Route: `/`

Hero badge:

- `Live Online Fitness Coaching`

Hero title:

- `One focused hour to build a stronger, healthier routine.`

Hero summary:

- `Join live coach-led sessions for fitness, yoga, zumba, HIIT, and personal training. Start with a free trial, choose a plan, and train from anywhere with clear guidance.`

Primary CTAs:

- `Book Free Trial`
- `Explore Programs`

Trust row:

- Certified trainers
- Beginner friendly
- Online across India

Homepage stats:

- `500+` members coached
- `60 min` live guided sessions
- `4.8/5` member rating
- `5+` training formats

Hero side panel:

- Today's Focus: `Simple, guided, consistent.`
- Morning and evening live batches
- Small-group energy with trainer attention
- Safe progressions for every fitness level
- WhatsApp CTA: `Talk on WhatsApp`

Homepage program cards:

- `Fitness and HIIT`: Build stamina, strength, and fat-loss momentum with coach-led full-body sessions.
- `Yoga and Mobility`: Improve flexibility, posture, breathing, and recovery with calm guided practice.
- `Zumba Cardio`: Stay consistent with high-energy dance cardio that feels fun and approachable.
- `1-on-1 Coaching`: Get a focused path with closer support, accountability, and personal guidance.

Homepage process section:

- Choose a direction: Pick fitness, yoga, zumba, functional training, or personal coaching.
- Try a free session: Experience the trainer, pace, and format before selecting a plan.
- Follow a weekly rhythm: Train 3 to 5 days a week with structured one-hour sessions.

Homepage closing CTA:

- `Ready to choose your first session?`
- `Send your details and the team will help you choose a program, batch timing, and plan that fits your week.`

### About Page

Route: `/about`

Hero badge:

- `About Us`

Hero eyebrow:

- `OneHour Challenge Method`

Hero title:

- `Built for Discipline`

Hero description:

- `OneHour Challenge helps busy people train with structure, accountability, and a coaching rhythm that fits real life.`

Hero metrics:

- `500+` Active Members
- `15+` Certified Trainers
- `5` Core Disciplines

About content:

- The brand is designed for results, but built around real schedules.
- The method is simple: one focused hour, a coach who leads with clarity, and a training system that helps members stay consistent instead of restarting every month.
- The goal is to help members feel stronger, healthier, and more confident with every week of training.

Why people choose OneHour Challenge:

- Focused delivery: Sessions are paced so members can follow without confusion.
- Better accountability: Members stay on track with guided coaching, clear plans, and regular support.
- Supportive community: Every member gets a welcoming fitness space with energy, structure, and encouragement.

Operating principles:

- Structured Programming: Every session fits into a clear training system with a purpose.
- Personal Attention: Supportive coaching without making members feel lost in a crowd.
- Certified Team: Experienced coaches with a professional, safety-first mindset.

About stats:

- `500+` Active Members
- `15+` Certified Trainers
- `4.8+` Member Rating
- `5+` Programs

### Programs Page

Route: `/programs`

Hero badge:

- `Programs`

Hero eyebrow:

- `Distinct training pathways`

Hero title:

- `Professional coaching for every goal`

Hero description:

- `Choose from guided formats built for fat loss, strength, mobility, stamina, and long-term consistency.`

Hero metrics:

- `5` Program Paths
- `1:1` Coaching Option
- `60 min` Session Length

Program cards:

- `1-on-1 Training`
  - Dedicated coach support
  - Clear progression
  - Focused accountability

- `Zumba`
  - High-energy cardio
  - Fun guided sessions
  - Group motivation

- `Yoga`
  - Flexibility work
  - Mobility support
  - Mind-body balance

- `HIIT`
  - Efficient fat burn
  - Conditioning focus
  - Fast-paced coaching

- `Functional Training`
  - Strength for daily life
  - Better movement
  - Joint-friendly programming

Program fit messaging:

- Best for structure: 1-on-1 Training and Functional Training
- Best for energy: Zumba and HIIT
- Best for balance: Yoga

### Plans / Pricing Page

Routes:

- `/plans`
- `/pricing`

Both routes render the same `Pricing` page.

Hero badge:

- `Plans`

Hero title:

- `Choose the right fit`

Hero description:

- `Compare coaching rhythms, start with a free session if you want, and let the team guide you toward the plan that fits your goals.`

Main section badge:

- `Coaching Plans`

Main section title:

- `Choose how often you want to train`

Important pricing note:

- The current website shows plan names and coaching frequency, not rupee pricing.
- No actual money amount is currently hardcoded in the pricing page.
- Each pricing card displays the active plan name, such as `PRO` or `ADVANCE`, instead of a rupee price.
- Plan enquiries are submitted through the lead modal using `Send Enquiry`.

### How It Works Page

Route: `/how-it-works`

Hero badge:

- `How It Works`

Hero eyebrow:

- `From first click to steady training`

Hero title:

- `A simple system with real structure`

Hero description:

- `Each session follows a clear format so members can train confidently, safely, and consistently.`

Hero metrics:

- `3` Core Session Phases
- `60 min` Guided Format
- `5+` Training Specializations

Process steps:

- `01` Choose your training direction
- `02` Send your registration
- `03` Start with guided consistency

60-minute session structure:

- `10 Minutes - Mobility and Warm-Up`
- `40 Minutes - Main Workout`
- `10 Minutes - Cool Down and Recovery`

Why members stay consistent:

- Certified Trainers
- Structured Programming
- Safe and Progressive
- Community Sessions

Core specializations:

- Fitness Program
- Muscle Building
- Posture and Mobility
- Yoga and Flexibility
- Zumba and Cardio Dance

### Trainers Page

Route: `/trainers`

Hero badge:

- `Coaching Team`

Hero eyebrow:

- `Professional support`

Hero title:

- `Train with coaches who keep progress simple`

Hero description:

- `OneHour Challenge combines certified fitness, yoga, zumba, and conditioning support into a clear online coaching experience.`

Hero metrics:

- `15+` Coach network
- `5+` Specializations
- `1 hour` Session structure

Current trainer cards:

- Coach Vikram
  - Experience: `8+ Years`
  - Specialization: Strength and Conditioning
  - Certification: ACE Certified Personal Trainer

- Coach Ananya
  - Experience: `6+ Years`
  - Specialization: Zumba and Dance Fitness
  - Certification: Zumba Licensed Instructor

- Coach Deepak
  - Experience: `10+ Years`
  - Specialization: Yoga and Mindfulness
  - Certification: Yoga Alliance RYT-500

Trainer page pillars:

- Certified guidance
- Structured programming
- Supportive accountability

Hidden admin access:

- The trainers page includes a lock button.
- Clicking the lock opens a restricted sign-in modal.
- Successful login navigates to `/admin`.

### Transformations Page

Route: `/transformations`

Hero badge:

- `Real Results`

Hero eyebrow:

- `Proof through consistency`

Hero title:

- `Transformation stories that feel credible`

Hero description:

- `Real member wins built on routine, guidance, and training that fits everyday life.`

Hero metrics:

- `6` Featured Stories
- `4.8+` Community Rating
- `1 hour` Repeatable Routine

Transformation stories:

- Navami P: Lost 12 kgs in 4 months. The structure and consistency made the difference.
- Meera Iyer: From barely running 1 km to completing a 10K. The progression was easy to trust.
- Karthik Nair: Lean muscle gain felt realistic because the coaching stayed clear and practical.
- Deepa Sharma: Yoga improved my flexibility and energy more than I expected.
- Ravi Kumar: The zumba sessions kept me consistent because they were genuinely enjoyable.
- Anjali Reddy: The online format fit my schedule perfectly and still delivered results.

Transformation overview points:

- Weight-loss journeys with realistic timelines
- Cardio and stamina gains built through regular sessions
- Strength and mobility improvements without extreme routines

### Contact Page

Route: `/contact`

Hero badge:

- `Contact`

Hero eyebrow:

- `Direct communication page`

Hero title:

- `Let's plan your next step`

Hero description:

- `Share your details and goals. The OneHour Challenge team will contact you and help you choose the right next step.`

Hero metrics:

- `1 form` Direct Lead Flow
- `Mon-Sat` Support Window
- `Online` Across India

Contact service cards:

- Program guidance
- Fast response
- Direct contact options

Contact form fields:

- Name
- Email
- Mobile Number
- Gender
- Age
- What are you looking for?

Working hours shown on page:

- Live sessions: 6 AM to 9 AM and 5 PM to 9 PM
- Support: Monday to Saturday, 9 AM to 6 PM
- Sunday: Closed

### Footer Content

Footer CTA:

- `Online coaching for gym-style fitness, yoga, zumba, and a stronger daily routine.`
- `Explore guided one-hour sessions, choose a plan that fits your week, and start with a professional fitness experience that feels easy to follow from any device.`

Footer program links:

- Fitness
- Yoga
- Zumba

Footer company links:

- About Us
- Transformations
- Plans
- Contact

Footer contact:

- Email: `manoharbasappagari18@gmail.com`
- Phone: `+91 95150 22680`
- Note: `Open for online coaching enquiries across India.`

## 3. Routes and Navigation

### Public Routes

- `/` - Home
- `/about` - About page
- `/programs` - Program overview
- `/plans` - Plan selection page
- `/pricing` - Alias of plans page
- `/how-it-works` - Process and session structure
- `/transformations` - Result stories and transformation gallery
- `/trainers` - Coaching team and hidden secure entry
- `/contact` - Contact form and direct contact details

### Admin Route

- `/admin` - Private admin workspace

### Desktop Navbar Links

- Home
- Programs
- Plans
- Process
- Results
- Contact
- Join Now

### Mobile Navbar Links

- Home
- About
- Programs
- Plans
- Process
- Results
- Trainers
- Contact
- Join Now

## 4. Hero Background Media

The site now uses a video-led hero on the homepage and a clean editorial hero treatment on inner pages.

### Home Hero Background Video

Used by `.home-hero-video` on the homepage only.

```text
https://res.cloudinary.com/dt37ji5yp/video/upload/v1771512442/Yoga_Instructor_Video_Generation_Request_qmgjsy.mp4
```

Markup usage:

```jsx
<video
  className="home-hero-video"
  src="https://res.cloudinary.com/dt37ji5yp/video/upload/v1771512442/Yoga_Instructor_Video_Generation_Request_qmgjsy.mp4"
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  aria-hidden="true"
/>
```

The video is covered by a dark green gradient overlay so white hero text remains readable.

### Inner Page Hero Treatment

Inner pages no longer use the same repeated background image. The shared `.page-hero` now uses a light professional showcase style with:

- a soft off-white and pale green gradient
- centered badge, eyebrow, heading, description, and metrics
- no large repeated photo background
- no right-side white content cards in the hero

## 5. Image and Media URLs

### Logo / Open Graph Image

Used in navbar, mobile nav, footer, and SEO default Open Graph image.

```text
https://res.cloudinary.com/dt37ji5yp/image/upload/v1771514832/Onehour_2__page-0001_zy1elu.jpg
```

### About Page Image

Used in the about story section.

```text
https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512247/Zomba_part3_v3i9y0.png
```

### Program Images

1-on-1 Training:

```text
https://res.cloudinary.com/dt37ji5yp/image/upload/v1771782797/Gemini_Generated_Image_s8xw7ls8xw7ls8xw_1_z96yp5.png
```

Zumba:

```text
https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512247/Zomba_Training_kws7pi.png
```

Yoga:

```text
https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512244/yoga_part4_mnslxd.png
```

HIIT:

```text
https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512241/Strength_part2_tzrm1t.png
```

Functional Training:

```text
https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512241/ST_2_xhbjg9.png
```

### Transformation Images

Transformation 1:

```text
https://res.cloudinary.com/dt37ji5yp/image/upload/v1772080466/img1_mmu5bz.png
```

Transformation 2:

```text
https://res.cloudinary.com/dt37ji5yp/image/upload/v1772080466/img2_rwnkp6.png
```

Transformation 3:

```text
https://res.cloudinary.com/dt37ji5yp/image/upload/v1772080466/img3_q6dg33.png
```

Transformation 4:

```text
https://res.cloudinary.com/dt37ji5yp/image/upload/v1772080465/img4_ksgdcq.png
```

Transformation 5:

```text
https://res.cloudinary.com/dt37ji5yp/image/upload/v1772080466/img5_qv8cnc.png
```

Transformation 6:

```text
https://res.cloudinary.com/dt37ji5yp/image/upload/v1772080466/img6_g82dnf.png
```

### Fonts URL

Loaded in `client/src/index.css`.

```text
https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap
```

### Website and API URLs

SEO site URL:

```text
https://onehourchallenge.com
```

Production API fallback:

```text
https://onehourchallenge.onrender.com/api
```

Sitemap:

```text
https://onehourchallenge.com/sitemap.xml
```

### WhatsApp URLs

The app dynamically generates WhatsApp links with encoded messages.

Base number:

```text
919515022680
```

Generated URL format:

```text
https://wa.me/919515022680?text=<encoded-message>
```

Default WhatsApp message:

```text
I would like to book a free session for OneHour Challenge.
```

## 6. Current Colors and Theme

The current UI uses a light fitness/wellness palette with green as the primary brand color, dark green ink, soft off-white backgrounds, and a warm gold accent.

### CSS Theme Tokens

Defined in `client/src/index.css`.

| Token | Value | Current Usage |
| --- | --- | --- |
| `--color-bg` | `#f6f7f4` | Main page background |
| `--color-surface` | `#ffffff` | Cards, buttons, panels |
| `--color-surface-soft` | `#eef3ed` | Muted sections and soft surfaces |
| `--color-ink` | `#14201b` | Main text and dark footer/admin background |
| `--color-muted` | `#62706a` | Paragraphs and secondary text |
| `--color-soft` | `#8b9892` | Softer text |
| `--color-line` | `#dfe7e1` | Borders |
| `--color-primary` | `#0c7a43` | Main green CTA and highlights |
| `--color-primary-dark` | `#075e33` | Dark green hover and strong accents |
| `--color-primary-soft` | `#e2f3ea` | Green-tinted badges and icon backgrounds |
| `--color-accent` | `#d8942c` | Review star/accent color |

### Hardcoded Colors Also Used

| Value | Usage |
| --- | --- |
| `#ffffff` | White text, surfaces, CTA text |
| `#14201b` | Footer background and admin sidebar background |
| `#128c4a` | Floating WhatsApp button |
| `#bdf0cf` | Highlight text inside page hero titles |
| `rgba(20, 32, 27, 0.5)` | Home hero overlay |
| `rgba(20, 32, 27, 0.56)` | Home hero overlay |
| `rgba(20, 32, 27, 0.52)` | Inner page hero overlay |
| `rgba(20, 32, 27, 0.62)` | Inner page hero overlay |
| `rgba(246, 247, 244, 0.92)` | Scrolled navbar background |
| `rgba(12, 122, 67, 0.08)` | Active nav/link green tint |
| `rgba(12, 122, 67, 0.18)` | Badge border |
| `rgba(12, 122, 67, 0.2)` | Primary button shadow |
| `rgba(12, 122, 67, 0.34)` | Secondary button hover border |
| `rgba(12, 122, 67, 0.42)` | Active/popular card border |
| `rgba(12, 122, 67, 0.12)` | Form focus ring |
| `rgba(255, 255, 255, 0.06)` | Footer CTA band background |
| `rgba(255, 255, 255, 0.08)` | Footer/admin subtle surfaces |
| `rgba(255, 255, 255, 0.1)` | Hero metric/nav active surfaces |
| `rgba(255, 255, 255, 0.12)` | Footer borders |
| `rgba(255, 255, 255, 0.16)` | Page hero badge background |
| `rgba(255, 255, 255, 0.22)` | Hero trust and badge borders |
| `rgba(255, 255, 255, 0.66)` | Footer secondary text |
| `rgba(255, 255, 255, 0.72)` | Footer links and admin nav |
| `rgba(255, 255, 255, 0.74)` | Hero metric text |
| `rgba(255, 255, 255, 0.76)` | Hero eyebrow |
| `rgba(255, 255, 255, 0.84)` | Hero description text |
| `rgba(255, 255, 255, 0.9)` | Hero trust text |
| `rgba(20, 32, 27, 0.38)` | Mobile nav backdrop |
| `rgba(20, 32, 27, 0.48)` | Modal/panel overlay |
| `rgba(20, 32, 27, 0.06)` | Soft shadow |
| `rgba(20, 32, 27, 0.08)` | Card/navbar shadow |
| `rgba(20, 32, 27, 0.18)` | Mobile nav and AI panel shadow |
| `rgba(20, 32, 27, 0.24)` | Modal shadow |

### Typography

Font import:

- Heading font: `Sora`
- Body font: `Inter`

CSS tokens:

```css
--font-heading: "Sora", "Inter", sans-serif;
--font-body: "Inter", system-ui, sans-serif;
```

### Layout Tokens

```css
--container-width: 1180px;
--container-padding: 0 24px;
--section-padding: 88px 0;
--radius-sm: 8px;
--radius-md: 10px;
--radius-lg: 14px;
--shadow-card: 0 18px 50px rgba(20, 32, 27, 0.08);
--shadow-soft: 0 8px 24px rgba(20, 32, 27, 0.06);
--transition-fast: 0.18s ease;
--transition-smooth: 0.28s ease;
```

### Color Note

The contact page currently references these CSS variables inline:

- `--color-white`
- `--color-gray-900`
- `--color-gray-600`

Those variables are not defined in the current `:root` theme. Browsers will ignore those specific inline color/background values unless fallback values are added.

## 7. Pricing and Plans

The current pricing page is a plan-selection and enquiry page. It does not show fixed rupee amounts.

### Current Plan Types

#### PRO Plan

Positioning:

- Balanced Coaching
- A steady weekly routine for most working professionals.
- A balanced weekly plan for members who want consistency without overload.

Frequency:

- `3 Days/Week`
- 3 days each week

Configured max bookings:

- `4`

Features:

- 3 live sessions per week
- Max 4 bookings per week
- Access to all programs
- Progress tracking
- Community access

#### ADVANCE Plan

Positioning:

- Intensive Coaching
- A higher-frequency routine for faster momentum and support.
- A more intensive weekly plan for members aiming for faster rhythm and closer support.

Frequency:

- `5 Days/Week`
- 5 days each week

Configured max bookings:

- `6`

Features:

- 5 live sessions per week
- Max 6 bookings per week
- Access to all programs
- Progress tracking
- Priority support
- Community access
- Personalized guidance

### Current Duration Cards

These duration cards are shown for whichever plan tab is active.

#### Starter

Note:

- Best for first-time members

Summary:

- `A simple way to begin, understand the coaching style, and build your first routine.`

#### 3 Months

Note:

- Most chosen

Summary:

- `A focused phase for building momentum, visible discipline, and measurable progress.`

Badge:

- `Recommended`

#### 6 Months

Note:

- Best for stronger transformation

Summary:

- `Ideal for members who want enough time to improve stamina, strength, and overall fitness.`

#### Long Term

Note:

- Best for lifestyle change

Summary:

- `Built for long-term consistency when fitness becomes part of your everyday routine.`

### Plan Enquiry Behavior

Each pricing card opens the lead capture modal with:

- `sourcePage: Plans`
- `interestType: plan`
- `interestLabel: <active plan> <duration>`
- `planType: PRO` or `ADVANCE`
- `duration: Starter`, `3 Months`, `6 Months`, or `Long Term`

CTA label:

- `Send Enquiry`

General plan CTA:

- `Talk to the Team`

## 8. Free Trial Sessions

Free trial sessions are used on the homepage and plans page through `FreeSessionShowcase`.

### Free Trial Messaging

Default badge:

- `Free Trial Sessions`

Default title:

- `Reserve a free seat`

Default subtitle:

- `Limited seats are released each week for first-time members who want to experience the coaching style before joining.`

Urgency card:

- `Limited seats available for free`
- `Reserve through WhatsApp before this week's live slots are filled.`

### Free Session Options

#### Yoga

Label:

- `Wellness and Flow`

Description:

- `Gentle strength, flexibility work, and a calmer reset for busy schedules.`

Schedule:

- Tuesday and Saturday
- 7:00 PM

Seats:

- 6 seats left

#### Fitness

Label:

- `Power Hour`

Description:

- `High-energy coaching focused on fat loss, stamina, and full-body momentum.`

Schedule:

- Monday and Thursday
- 6:30 AM

Seats:

- 4 seats left

Status:

- Featured/highlighted

#### Zumba

Label:

- `Rhythm and Sweat`

Description:

- `Cardio dance sessions that keep motivation high and movement fun.`

Schedule:

- Wednesday and Friday
- 7:30 PM

Seats:

- 5 seats left

### Free Session WhatsApp Message Format

```text
Hi, I am interested in a free <sessionType> session at OneHour Challenge.

Name: <name or N/A>
Email: <email or N/A>

Please confirm my free session. Thank you.
```

Generated URL:

```text
https://wa.me/919515022680?text=<encoded-message>
```

## 9. Contact Details

Current constants:

```text
Email: manoharbasappagari18@gmail.com
Phone: 9515022680
Display Phone: +91 95150 22680
WhatsApp Number: 919515022680
```

Contact channels shown on the homepage:

- WhatsApp: `+91 95150 22680`
- Call: `+91 9515022680`
- Email: `manoharbasappagari18@gmail.com`

Contact page availability:

- Online coaching across India

## 10. Lead Capture Content

The reusable registration modal is opened from CTA buttons across the site.

### Required Fields

- Full name
- Phone number
- Age

### Optional Fields

- Location
- Email address
- Message

### Modal Kicker Logic

- `program` interest type: `Program Enquiry`
- `plan` interest type: `Plan Enquiry`
- `team` interest type: `Trainer Enquiry`
- Home source page: `Free Session Enquiry`
- Default: `Register Interest`

### Modal Subtitle

```text
Share your details and we will contact you directly on call or WhatsApp.
```

### Success Message

```text
We received your details
Our team will contact you soon regarding <interest label>.
```

### Stored Lead Metadata

Lead submissions include:

- name
- email
- mobile
- age
- location
- message
- source
- sourcePage
- sourcePath
- interestType
- interestLabel
- planType
- duration
- gender

## 11. Admin Portal

Admin route:

```text
/admin
```

Hidden secure entry:

- Trainers page lock button

Admin capabilities:

- Login gate
- Overview dashboard
- Registration lead list
- Plan enquiry list
- Contact request list
- Booking-related admin routes still exist in backend
- Status updates
- Delete actions
- Lead summaries by page and interest

Current status values:

- `new`
- `contacted`
- `closed`
- `not-interested`

Current auth model:

- Username and password come from environment variables.
- Login returns a lightweight token.
- Frontend stores the token in local storage.
- Admin API requests send `Authorization: Bearer <token>`.

Environment variables:

```env
ADMIN_PORTAL_USERNAME=admin
ADMIN_PORTAL_PASSWORD=change_this_password
```

## 12. Tech Stack

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

### Media

- Cloudinary-hosted URLs are used directly in frontend code and CSS.
- Cloudinary SDK is present in backend dependencies, but a complete upload/media-management workflow is not currently productized.

## 13. Project Structure

```text
ONEHOURCHALLENGE-main/
|-- client/
|   |-- public/
|   |   |-- _headers
|   |   |-- _redirects
|   |   |-- favicon.svg
|   |   |-- robots.txt
|   |   |-- sitemap.xml
|   |   `-- vite.svg
|   |-- src/
|   |   |-- app/
|   |   |   |-- App.jsx
|   |   |   `-- AppRoutes.jsx
|   |   |-- assets/
|   |   |-- components/
|   |   |   |-- AIAssistant.jsx
|   |   |   |-- CalorieCalculator.jsx
|   |   |   |-- Footer.jsx
|   |   |   |-- FreeSessionShowcase.jsx
|   |   |   |-- LeadCaptureButton.jsx
|   |   |   |-- Navbar.jsx
|   |   |   |-- PageHero.jsx
|   |   |   |-- PageProgressBar.jsx
|   |   |   |-- RegistrationModal.jsx
|   |   |   |-- ScrollReveal.jsx
|   |   |   |-- SEO.jsx
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
|   |-- index.html
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
|   |-- index.js
|   `-- package.json
|-- .gitignore
`-- README.md
```

## 14. Backend API

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

### Bookings

- `POST /api/bookings`
- `GET /api/bookings/user/:userId`
- `GET /api/bookings/all`

## 15. Environment Variables

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

Notes:

- Do not commit real secrets.
- Keep local `.env` files untracked.
- The frontend falls back to `https://onehourchallenge.onrender.com/api` if `VITE_API_URL` is not set.

## 16. Local Setup

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd server
npm install
```

Create local environment files:

- `client/.env`
- `server/.env`

## 17. Run Commands

Start backend:

```bash
cd server
npm run dev
```

Start frontend:

```bash
cd client
npm run dev
```

Build frontend:

```bash
cd client
npm run build
```

Windows PowerShell build fallback:

```bash
npm.cmd run build
```

## 18. Deployment Notes

### Frontend

- Build from `client`.
- Deploy the generated Vite output to Netlify, Vercel, or another static host.
- Keep SPA rewrites enabled. The repo includes `client/public/_redirects`.

### Backend

- Deploy the Express server to a Node host such as Render, Railway, or AWS.
- Set all required environment variables.
- Make sure MongoDB network access allows the deployed backend.
- Confirm email provider credentials before enabling contact notifications.

### SEO Files

Public SEO files:

- `client/public/robots.txt`
- `client/public/sitemap.xml`

Canonical site URL:

```text
https://onehourchallenge.com
```

## 19. Known Notes

- The current site is enquiry-first and does not show actual rupee pricing.
- `/pricing` and `/plans` point to the same page.
- Trainer images are currently not used; trainer cards use icons and text.
- Some placeholder constants still exist for future media, including hero video, dashboard video, trainer images, and review images.
- Booking routes still exist in the backend, but the public website currently focuses on lead/contact enquiries rather than a visible booking checkout flow.
- Admin authentication is lightweight and environment-driven, not a full JWT/password-hash system yet.
- Contact page inline styles reference a few undefined color variables: `--color-white`, `--color-gray-900`, and `--color-gray-600`.
- Cloudinary URLs are hardcoded in frontend/CSS rather than managed through a media admin workflow.
