import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./landing_page/navbar/Navbar";
import KindredFooter from "./landing_page/footer/Footer";
import Index from "./landing_page/home/Index";
import FeaturesPage from "./landing_page/features/FeaturesPage";
import FAQPage from "./landing_page/FAQS/FAQSPage";
import AboutPage from "./landing_page/about/About";
import TermsPage from "./landing_page/policy/Terms";
import PrivacyPage from "./landing_page/policy/Privacy";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/faqs" element={<FAQPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </main>
      <KindredFooter />
    </Router>
  );
}

export default App;
