import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Programs = lazy(() => import('./pages/Programs'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Trainers = lazy(() => import('./pages/Trainers'));
const Transformations = lazy(() => import('./pages/Transformations'));
const Contact = lazy(() => import('./pages/Contact'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const AdminPortal = lazy(() => import('./pages/AdminPortal'));
const AIAssistant = lazy(() => import('./components/AIAssistant'));
import WhatsAppButton from './components/WhatsAppButton';
import MobileCTA from './components/MobileCTA';
import ScrollReveal from './components/ScrollReveal';

function ProtectedRoute({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

function App() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main className="app-shell">
        <Suspense fallback={<div className="page-loading">Loading page...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/transformations" element={<Transformations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/admin" element={<AdminPortal />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <AIAssistant />
      </Suspense>
      <WhatsAppButton />
      <MobileCTA />
      <Toaster position="bottom-center" />
    </>
  );
}

export default App;
