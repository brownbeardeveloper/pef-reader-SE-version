export default function CookieBanner({ setCookiePermission }) {
    return (
        <div className="flex flex-wrap items-center justify-between bg-yellow-200 p-4">
            <div className="w-full md:w-3/4">
                <span className="text-lg text-gray-800">
                    Denna webbplats använder cookies för att förbättra din användarupplevelse och spara din läsposition i boken.
                </span>
                {/* add link to cookie page here */}
            </div>
            <div className="w-full md:w-1/4 mt-4 md:mt-0">
                <button onClick={() => setCookiePermission("allowed")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out mr-2">
                    Godkänna nödvändiga cookies
                </button>
                <button onClick={() => setCookiePermission("denied")} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out">
                    Nej tack
                </button>
            </div>
        </div>
    )
}
