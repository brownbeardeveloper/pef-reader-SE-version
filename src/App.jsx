import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx'
import Main from './components/main.jsx'
import CookieBanner from './components/cookie-banner.jsx';
import CookiePolicy from './pages/cookie-policy.jsx';
import Cookies from 'js-cookie';
import { setAllowCookie, getAllowCookie } from './functions/cookieManager.js';
import { useState, useEffect } from 'react';


export default function App() {

    const [showCookieBanner, setShowCookieBanner] = useState(false)
    const [cookiePermission, setCookiePermission] = useState(null)
    const [openCookiePolicy, setOpenCookiePolicy] = useState(false)

    const handleAllowCookies = () => {
      // Set cookie permission to true
      Cookies.set('allowCookie', true);
      // Update state to hide the cookie banner
      setShowCookieBanner(false);
      // Update state to reflect cookie permission
      setCookiePermission(true);
  };

  const handleDenyCookies = () => {
      // Set cookie permission to false
      Cookies.set('allowCookie', false);
      // Update state to hide the cookie banner
      setShowCookieBanner(false);
      // Update state to reflect cookie permission
      setCookiePermission(false);
  };

  return (
    <>
      {showCookieBanner && <CookieBanner handleDenyCookies ={handleDenyCookies } handleAllowCookies ={handleAllowCookies } setOpenCookiePolicy={setOpenCookiePolicy} />}
      <Navbar />
      <Main />
      <Footer setOpenCookiePolicy={setOpenCookiePolicy} />
      {openCookiePolicy && <CookiePolicy setOpenCookiePolicy={setOpenCookiePolicy} />}
    </>
  );
}