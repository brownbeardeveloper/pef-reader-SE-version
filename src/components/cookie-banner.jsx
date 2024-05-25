import { CookieEnum } from "../data/enums";

export default function CookieBanner({ setCookiePermission }) {

    return (
        <div className="flex flex-col bg-slate-50 p-10 ">
            <strong className="text-2xl text-bold">
                Kakor på webbplatsen
            </strong>
            <span className="text-lg">
                Denna webbplats använder kakor för att förbättra din användarupplevelse och spara din läsposition i boken.
                <a className="m-1 underline text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out" href="/om-kakor-och-tillganglighet">Läs mer om kakor.</a>
            </span>


            <div className="flex justify-center w-full m-5">
                <button onClick={() => setCookiePermission(CookieEnum.ALLOWED)} 
                className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out mr-2 w-4/5">
                    Godkänna nödvändiga kakor
                </button>
                <button onClick={() => setCookiePermission(CookieEnum.DENIED)} 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out w-1/5">
                    Nej tack
                </button>
            </div>
        </div>
    )
}
