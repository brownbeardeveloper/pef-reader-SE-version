import { CookieEnum } from "../data/enums";

export default function CookieBanner({ setCookiePermission }) {

    return (
        <div className="flex flex-col bg-slate-50 p-10 ">
            <strong className="text-2xl text-bold">
                Kakor på webbplatsen
            </strong>
            <span className="text-lg">
                Denna webbplats använder kakor för att förbättra din användarupplevelse och spara din läsposition i boken.
                <a className="m-1 underline hover:text-blue-500 transition duration-200 ease-in-out" href="/om-cookies">Läs mer om kakor.</a>
            </span>


            <div className="flex justify-center w-full m-5">
                <button onClick={() => setCookiePermission(CookieEnum.ALLOWED)} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out mr-2 w-full">
                    Godkänna nödvändiga kakor
                </button>
                <button onClick={() => setCookiePermission(CookieEnum.DENIED)} 
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out w-full">
                    Nej tack
                </button>
            </div>
        </div>
    )
}
