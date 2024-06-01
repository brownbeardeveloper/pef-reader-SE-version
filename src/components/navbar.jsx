import CookieBanner from "./cookie-banner";

export default function Navbar({ showCookieBanner, setCookiePermission }) {
  return (
    <header>
      <div>
        <button
          onClick={() => document.getElementById('MainContentArea').focus()}
          className="sr-only focus:not-sr-only focus:bg-black focus:text-white"
          tabIndex={0}
        >
          Till huvudinnehåll
        </button>
        <button
          onClick={() => window.location.href = '/instruktion'}
          className="sr-only focus:not-sr-only focus:bg-black focus:text-white"
          tabIndex={0}
        >
          Till instruktion för använding av webbapplikationen
        </button>
      </div>

      {showCookieBanner && <CookieBanner setCookiePermission={setCookiePermission} />}

      <div className="flex justify-between items-center px-4 py-1 mx-auto border-y border-neutral-400 bg-gradient-to-b from-neutral-300 via-neutral-200 to-neutral-300">
        <h1 className="text-lg font-bold" tabIndex={0}>Digital punktläsare</h1>
      </div>
    </header>
  );
}
