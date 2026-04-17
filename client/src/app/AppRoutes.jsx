import { useEffect } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import AdminWorkspaceLayout from '../layouts/AdminWorkspaceLayout';
import About from '../pages/About';
import AdminPortal from '../pages/AdminPortal';
import Contact from '../pages/Contact';
import Home from '../pages/Home';
import HowItWorks from '../pages/HowItWorks';
import Pricing from '../pages/Pricing';
import Programs from '../pages/Programs';
import Trainers from '../pages/Trainers';
import Transformations from '../pages/Transformations';

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/plans" element={<Pricing />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/transformations" element={<Transformations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
          </Route>

          <Route element={<AdminWorkspaceLayout />}>
            <Route path="/admin" element={<AdminPortal />} />
          </Route>
        </Routes>
      </Motion.div>
    </AnimatePresence>
  );
}

export default AppRoutes;
