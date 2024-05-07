import { TabIndex } from "../data/tab-index"
import CookieBanner from "./cookie-banner"

export default function Navbar({ showCookieBanner, setCookiePermission }) {

  return (
    <header>
      <div>
        <a tabIndex={TabIndex.HIDDEN_LINK_MAIN} href="#MainContentArea"
          className="sr-only focus:not-sr-only bg-black text-white">
            Till innehåll på sidan
        </a>
        <a tabIndex={TabIndex.HIDDEN_LINK_MAIN} href="#MainContentArea"
          className="sr-only focus:not-sr-only bg-black text-white">
            Till uppladdning av filen
        </a>
        <a tabIndex={TabIndex.HIDDEN_LINK_MAIN} href="/instruktion"
          className="sr-only focus:not-sr-only bg-black text-white">
            Till instruktion av hur webbapplikationen fungerar
        </a>
        <a tabIndex={TabIndex.HIDDEN_LINK_MAIN} href="https://www.legimus.se/"
          className="sr-only focus:not-sr-only bg-black text-white">
            Till Legimus
        </a>
        <a tabIndex={TabIndex.HIDDEN_LINK_MAIN} href="https://mtm.se/"
          className="sr-only focus:not-sr-only bg-black text-white">
            Till Myndigheten för tillgänliga medier
        </a>
      </div>

      {showCookieBanner && <CookieBanner setCookiePermission={setCookiePermission} />}

      <div className="flex justify-between items-center px-4 py-1 mx-auto bg-gray-200">
        <h1 className="text-lg font-bold">Digital punktläsare</h1>
      </div>
    </header>
  )
}
