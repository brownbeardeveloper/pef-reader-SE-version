import { TabIndex } from "../data/tab-index"
import CookieBanner from "./cookie-banner"

export default function Navbar({ showCookieBanner, setCookiePermission }) {

  return (
    <header>
      <nav>
        <a tabIndex={TabIndex.HIDDEN_LINK_MAIN} href="#MainContentArea"
          className="sr-only focus:not-sr-only bg-black text-white">
            Till huvudinnehåll
        </a>
        <a tabIndex={TabIndex.HIDDEN_LINK_MAIN} href="/instruktion"
          className="sr-only focus:not-sr-only bg-black text-white">
            Till instruktion för använding av webbapplikationen
        </a>
      </nav>

      {showCookieBanner && <CookieBanner setCookiePermission={setCookiePermission} />}

      <div className="flex justify-between items-center px-4 py-1 mx-auto bg-gray-200">
        <h1 className="text-lg font-bold">Digital punktläsare</h1>
      </div>
    </header>
  )
}
