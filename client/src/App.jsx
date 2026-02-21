import { Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Transformations from './pages/Transformations';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import AIAssistant from './components/AIAssistant';
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transformations" element={<Transformations />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
      <AIAssistant />
      <WhatsAppButton />
      <MobileCTA />
      <Toaster position="bottom-center" />
    </>
  );
}

export default App;
