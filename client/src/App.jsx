import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminPortal from './pages/AdminPortal';
import API from './utils/api';
import AIAssistant from './components/AIAssistant';
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Programs = lazy(() => import('./pages/Programs'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Trainers = lazy(() => import('./pages/Trainers'));
const Transformations = lazy(() => import('./pages/Transformations'));
const Contact = lazy(() => import('./pages/Contact'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
import WhatsAppButton from './components/WhatsAppButton';
import ScrollReveal from './components/ScrollReveal';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  useEffect(() => {
    API.get('/health').catch(() => {});
  }, []);

  return (
    <>
      <ScrollReveal />
      {!isAdminRoute ? <Navbar /> : null}
      <main className="app-shell">
        <Suspense fallback={<div className="page-loading">Loading page...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/plans" element={<Pricing />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/transformations" element={<Transformations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/admin" element={<AdminPortal />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdminRoute ? <Footer /> : null}
      {!isAdminRoute ? <AIAssistant /> : null}
      {!isAdminRoute ? <WhatsAppButton /> : null}
      <Toaster position="bottom-center" />
    </>
  );
}

export default App;
