import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx'
import MainPage from './pages/main.jsx'
import InstructionPage from './pages/instruction.jsx';
import CookieAndAccessibilityPage from './pages/cookie-and-accessibility.jsx';
import NotFoundPage from './pages/not-found.jsx';
import ContactUsPage from './pages/contact-us.jsx';
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import { getAllowCookie, setAllowCookie } from './services/cookieManager.js';
import { useState, useEffect } from 'react';
import { CookieEnum } from './data/enums.js';

export default function App() {
  const [cookiePermission, setCookiePermission] = useState(getAllowCookie());
  const [showCookieBanner, setShowCookieBanner] = useState()

  useEffect(() => {
    if (cookiePermission === CookieEnum.ALLOWED) {
      setAllowCookie(true)
      setShowCookieBanner(false);
    } else if (cookiePermission === CookieEnum.DENIED) {
      setAllowCookie(false)
      setShowCookieBanner(false);
    } else {
      setShowCookieBanner(true); // if there's no cookies
    }
  }, [cookiePermission]);

  return (
    <Router>
      <Navbar showCookieBanner={showCookieBanner} setCookiePermission={setCookiePermission} />
      <Routes>
        <Route path="/instruktion" element={<InstructionPage cookiePermission={cookiePermission} setCookiePermission={setCookiePermission} />} />
        <Route path='/om-kakor-och-tillganglighet' element={<CookieAndAccessibilityPage cookiePermission={cookiePermission} setCookiePermission={setCookiePermission} />} />
        <Route path="/kontakt" element={<ContactUsPage />} />
        <Route path="/" element={<MainPage cookiePermission={cookiePermission} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}