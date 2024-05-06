import CookieBanner from "./cookie-banner"

export default function Navbar({ showCookieBanner, setCookiePermission }) {

  return (
    <header>
      {showCookieBanner && <CookieBanner setCookiePermission={setCookiePermission} />}
    
      <div className="flex justify-between items-center px-4 py-1 mx-auto bg-gray-200">
        <h1 className="text-lg font-bold">Digital punktläsare</h1>
      </div>
    </header>
  )
}
