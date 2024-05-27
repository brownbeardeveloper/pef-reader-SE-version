import CookieBanner from "./cookie-banner"

export default function Navbar({ showCookieBanner, setCookiePermission }) {

  return (
    <header>
      <div>
        <a href="#MainContentArea"
          className="sr-only focus:not-sr-only bg-black text-white">
            Till huvudinnehåll
        </a>
        <a href="/instruktion"
          className="sr-only focus:not-sr-only bg-black text-white">
            Till instruktion för använding av webbapplikationen
        </a>
      </div>

      {showCookieBanner && <CookieBanner setCookiePermission={setCookiePermission} />}

      <div className="flex justify-between items-center px-4 py-1 mx-auto
      border-y border-neutral-400 bg-gradient-to-b from-neutral-300 via-neutral-200 to-neutral-300">
        <h1 className="text-lg font-bold" tabIndex={0}>Digital punktläsare</h1>
      </div>

    </header>
  )
}
