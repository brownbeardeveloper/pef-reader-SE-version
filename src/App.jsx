import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx'
import Main from './pages/main.jsx'
import CookieBanner from './components/cookie-banner.jsx';
import InstructionPage from './pages/instruction.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAllowCookie, setAllowCookie } from './functions/cookieManager.js';
import { useState, useEffect } from 'react';

export default function App() {
  const [cookiePermission, setCookiePermission] = useState(getAllowCookie());
  const [showCookieBanner, setShowCookieBanner] = useState()

  useEffect(() => {
    if (cookiePermission === "allowed") {
      setAllowCookie(true)
      setShowCookieBanner(false);
    } else if (cookiePermission === "denied") {
      setAllowCookie(false)
      setShowCookieBanner(false);
    } else {
      setShowCookieBanner(true); // if there's no cookies
    }
  }, [cookiePermission]);

  return (
    <Router>
      {showCookieBanner && <CookieBanner setCookiePermission={setCookiePermission} />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Main cookiePermission={cookiePermission} />} />
        <Route path="/instruktion" element={<InstructionPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}