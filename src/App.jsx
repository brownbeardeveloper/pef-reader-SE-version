import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx'
import Main from './components/main.jsx'
import CookieBanner from './components/cookie-banner.jsx';
import CookiePolicy from './pages/cookie-policy.jsx';
import { getAllowCookie, setAllowCookie } from './functions/cookieManager.js';
import { useState, useEffect } from 'react';

export default function App() {
    const [cookiePermission, setCookiePermission] = useState(getAllowCookie());
    const [showCookieBanner, setShowCookieBanner] = useState()
    const [openCookiePolicy, setOpenCookiePolicy] = useState()

    useEffect(() => {

      console.log("cookiePermission", cookiePermission)
      console.log("showCookieBanner", showCookieBanner)

      if (cookiePermission === "allowed") {
        setAllowCookie(true)
        setShowCookieBanner(false);
      } else if (cookiePermission == "denied") {
        setAllowCookie(false)
        setShowCookieBanner(false);
        console.log("setShowCookieBanner false")
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