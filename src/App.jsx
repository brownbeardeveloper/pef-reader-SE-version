import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx'
import Main from './components/main.jsx'
import CookieBanner from './components/cookie-banner.jsx';
import CookiePolicy from './pages/cookie-policy.jsx';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

export default function App() {
    const [cookiePermission, setCookiePermission] = useState(Cookies.get("allowCookie"));
    const [showCookieBanner, setShowCookieBanner] = useState()
    const [openCookiePolicy, setOpenCookiePolicy] = useState()

    useEffect(() => {
      if (cookiePermission === "allowed") {
        Cookies.set('allowCookie', "allowed");
        setShowCookieBanner(false);
      } else if (cookiePermission === "denied") {
        Cookies.set('allowCookie', "denied");
        setShowCookieBanner(false);
      } else {
        setShowCookieBanner(true); // if there's no cookies
      }
    }, [cookiePermission]);

  return (
    <>
      {showCookieBanner && <CookieBanner setCookiePermission={setCookiePermission} setOpenCookiePolicy={setOpenCookiePolicy} />}
      <Navbar />
      <Main cookiePermission={cookiePermission} />
      <Footer setOpenCookiePolicy={setOpenCookiePolicy} />
      {openCookiePolicy && <CookiePolicy setOpenCookiePolicy={setOpenCookiePolicy} />}
    </>
  );
}