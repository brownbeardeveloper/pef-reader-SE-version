export default function CookieBanner({ handleAllowCookies, handleDenyCookies, setOpenCookiePolicy }) {
    return (
        <div className="flex flex-wrap items-center justify-between bg-yellow-200 p-4">
            <div className="w-full md:w-3/4">
                <p className="text-lg text-gray-800">
                    Denna webbplats använder cookies för att förbättra din användarupplevelse och spara din läsposition i boken.
                    <button onClick={() => setOpenCookiePolicy(true)} className="text-blue-600 hover:underline ml-2">
                        Läs mer om hur vi använder cookies här.
                    </button>
                </p>
            </div>
            <div className="w-full md:w-1/4 mt-4 md:mt-0">
                <button onClick={handleAllowCookies()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out mr-2">
                    Godkänn alla cookies
                </button>
                <button onClick={handleDenyCookies} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out">
                    Nej tack
                </button>
            </div>
        </div>
    )
}
