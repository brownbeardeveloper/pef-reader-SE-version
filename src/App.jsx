import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx'
import Main from './components/main.jsx'
import CookieBanner from './components/cookie-banner.jsx';
import CookiePolicy from './pages/cookie-policy.jsx';
import { useState } from 'react';

export default function App() {

    const [showCookieBanner, setShowCookieBanner] = useState(true)
    const [allowCookie, setAllowCookie] = useState(false)
    const [openCookiePolicy, setOpenCookiePolicy] = useState(false)

  return (
    <>
      {showCookieBanner && <CookieBanner setAllowCookie={setAllowCookie} setShowCookieBanner={setShowCookieBanner} setOpenCookiePolicy={setOpenCookiePolicy} />}
      <Navbar />
      <Main />
      <Footer setOpenCookiePolicy={setOpenCookiePolicy} />
      {openCookiePolicy && <CookiePolicy setOpenCookiePolicy={setOpenCookiePolicy} />}
    </>
  );
}