import { useState } from "react"
import { TabIndex } from "../data/tab-index"
import CookieBanner from "./cookie-banner"

export default function Navbar({ showCookieBanner, setCookiePermission }) {
  const [showShortcutLinks, setShowShortcutLinks] = useState(false)

  return (
    <header>
      <div
        className={`absolute top-0 left-0 m-10 px-10 py-2 bg-black text-white text-2xl border border-purple-500 ${showShortcutLinks ? 'block' : 'hidden'}`}
        onFocus={() => setShowShortcutLinks(true)}>
        <a tabIndex={TabIndex.HIDDEN_LINK_MAIN} href="#MainContentArea">test</a>
      </div>

      {showCookieBanner && <CookieBanner setCookiePermission={setCookiePermission} />}

      <div className="flex justify-between items-center px-4 py-1 mx-auto bg-gray-200">
        <h1 className="text-lg font-bold">Digital punktläsare</h1>
      </div>
    </header>
  )
}
