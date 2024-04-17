export default function CookieBanner({ setAllowCookie, setShowCookieBanner, setOpenCookiePolicy }) {

    return (
        <div className="flex flex-wrap items-center justify-between bg-yellow-200 p-4">
            <div className="w-full md:w-3/4">
                <p className="text-lg text-gray-800">
                    Denna webbplats använder cookies för att förbättra din användarupplevelse och spara din läsposition i boken.
                    <button onClick={() => setOpenCookiePolicy(true)} 
                    className="text-blue-600 hover:underline ml-2">
                        Läs mer om hur vi använder cookies här.
                        </button>
                </p>
            </div>
            <div className="w-full md:w-1/4 mt-4 md:mt-0">
                <button onClick={() => { setAllowCookie(true); setShowCookieBanner(false);}}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded 
                 transition duration-200 ease-in-out">
                    Godkänn alla cookies
                </button>
            </div>
        </div>
    )
}

