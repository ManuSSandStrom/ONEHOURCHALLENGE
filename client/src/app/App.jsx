import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import SEO from '../components/SEO';
import API from '../utils/api';
import AppRoutes from './AppRoutes';

function App() {
  useEffect(() => {
    API.get('/health').catch(() => {});
  }, []);

  return (
    <>
      <SEO />
      <AppRoutes />
      <Toaster position="bottom-center" />
    </>
  );
}

export default App;
