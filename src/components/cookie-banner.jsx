import { useNavigate } from "react-router-dom";
import { CookieEnum } from "../data/enums";

export default function CookieBanner({ setCookiePermission }) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-row items-center justify-center bg-yellow-200 p-4">
            <div className="w-1/2">
                <span className="text-lg text-gray-800">
                    Denna webbplats använder cookies för att förbättra din användarupplevelse och spara din läsposition i boken.
                </span>
                <button className="button" onClick={() => {navigate('/om-cookies')}}>
                    Läs mer om kakor.
                </button>

            </div>
            <div className="">
                <button onClick={() => setCookiePermission(CookieEnum.ALLOWED)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out mr-2">
                    Godkänna nödvändiga cookies
                </button>
                <button onClick={() => setCookiePermission(CookieEnum.DENIED)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out">
                    Nej tack
                </button>
            </div>
        </div>
    )
}
