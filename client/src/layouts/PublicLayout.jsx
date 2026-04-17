import { Outlet } from 'react-router-dom';
import AIAssistant from '../components/AIAssistant';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PageProgressBar from '../components/PageProgressBar';
import ScrollReveal from '../components/ScrollReveal';
import WhatsAppButton from '../components/WhatsAppButton';

function PublicLayout() {
  return (
    <>
      <ScrollReveal />
      <PageProgressBar />
      <Navbar />
      <main className="app-shell">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <AIAssistant />
    </>
  );
}

export default PublicLayout;
