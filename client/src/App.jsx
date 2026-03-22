import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminPortal from './pages/AdminPortal';
import API from './utils/api';
import AIAssistant from './components/AIAssistant';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Pricing from './pages/Pricing';
import Trainers from './pages/Trainers';
import Transformations from './pages/Transformations';
import Contact from './pages/Contact';
import HowItWorks from './pages/HowItWorks';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollReveal from './components/ScrollReveal';
import PageProgressBar from './components/PageProgressBar';

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
      {!isAdminRoute ? <PageProgressBar /> : null}
      {!isAdminRoute ? <Navbar /> : null}
      <main className="app-shell">
        <AnimatePresence mode="wait">
          <Motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Routes location={location}>
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
          </Motion.div>
        </AnimatePresence>
      </main>
      {!isAdminRoute ? <Footer /> : null}
      {!isAdminRoute ? <WhatsAppButton /> : null}
      {!isAdminRoute ? <AIAssistant /> : null}
      <Toaster position="bottom-center" />
    </>
  );
}

export default App;
