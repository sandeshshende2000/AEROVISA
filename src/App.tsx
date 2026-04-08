import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BackButton from './components/BackButton';
import HNIListingSection from './components/HNIListingSection';
import Home from './pages/Home';
import Opportunities from './pages/Opportunities';
import CountryDetail from './pages/CountryDetail';
import ListProperty from './pages/ListProperty';
import InvestorAccess from './pages/InvestorAccess';
import RequestDetails from './pages/RequestDetails';
import AdvisorContact from './pages/AdvisorContact';
import CategoryDetail from './pages/CategoryDetail';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import ThankYou from './pages/ThankYou';

const AppContent: React.FC = () => {
  const location = useLocation();
  const hideHNISection = ['/list-property', '/advisor-contact', '/investor-access', '/request-details', '/thank-you', '/blog'].some(path => location.pathname.startsWith(path));

  useEffect(() => {
    document.title = "AeroVisa Global | Global Real Estate Investment Platform";
  }, [location]);

  return (
    <div className="min-h-screen bg-luxury-navy flex flex-col">
      <Navbar />
      <BackButton />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/country/:slug" element={<CountryDetail />} />
          <Route path="/greece-properties" element={<CountryDetail slugOverride="greece" />} />
          <Route path="/portugal-properties" element={<CountryDetail slugOverride="portugal" />} />
          <Route path="/latvia-properties" element={<CountryDetail slugOverride="latvia" />} />
          <Route path="/uk-properties" element={<CountryDetail slugOverride="uk" />} />
          <Route path="/villas" element={<CategoryDetail />} />
          <Route path="/hotels" element={<CategoryDetail />} />
          <Route path="/apartments" element={<CategoryDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostDetail />} />
          <Route path="/list-property" element={<ListProperty />} />
          <Route path="/investor-access" element={<InvestorAccess />} />
          <Route path="/request-details" element={<RequestDetails />} />
          <Route path="/advisor-contact" element={<AdvisorContact />} />
          <Route path="/contact" element={<AdvisorContact />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </main>
      {!hideHNISection && <HNIListingSection />}
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
