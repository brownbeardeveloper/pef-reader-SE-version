import { useNavigate } from "react-router-dom";
import { CookieEnum } from "../data/enums";

export default function CookieAndAccessibilityPage({ cookiePermission, setCookiePermission }) {
  const navigate = useNavigate();

  return (
    <main className="mx-auto px-20 pt-10 pb-20">
      <h2 className="text-2xl font-bold mb-4" id="MainContentArea">Kakor och Tillgänglighet</h2>
      <p className="mb-6">
        Syftet med denna policy är att ge dig som användare av Digital punktläsare webbplats
        information om hur vi använder kakor (cookies) på vår webbplats och vilka inställningar
        du kan göra när det gäller kakor.
      </p>

      <section>
        <h3 className="text-lg font-semibold mb-2">Vad är kakor?</h3>
        <p className="mb-4">
          En kaka är en liten textfil som webbplatsen du besöker begär att få spara på din dator,
          mobiltelefon eller surfplatta. Kakor kan användas till olika saker, till exempel för
          att komma ihåg dina inställningar, hjälpa dig navigera mellan olika sidor och förbättra
          din användarupplevelse.
        </p>

        <h3 className="text-lg font-semibold mb-2">Typer av kakor:</h3>
        <div className="mb-4">
          <p className="mb-2"><strong>Sessionskakor:</strong> Dessa kakor lagras tillfälligt i din enhets minne
            under tiden du är inne på en webbsida för att denna ska fungera korrekt under din
            användning. Dessa kakor försvinner när du stänger din webbläsare.
          </p>
        </div>
        <div className="mb-4">
          <p className="mb-2"><strong>Varaktiga kakor:</strong> Dessa kakor lagras i din webbläsare under en bestämd tid innan
            de raderas. De kan till exempel göra att en webbsida kan komma ihåg din webbläsare och
            dina personliga inställningar till nästa gång du loggar in.
          </p>
        </div>

        <h3 className="text-lg font-semibold mb-2">Nödvändiga kakor:</h3>
        <p className="mb-4">
          Följande kakor är nödvändiga för att möjliggöra din användning av webbplatsen. Utan
          dessa kakor finns en stor risk att webbplatsen inte fungerar korrekt:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">
            <strong>ID_latest_position</strong> - Denna varaktiga kaka används för att spara den senaste lästa
            positionen i en specifik bok på webbplatsen. Om en sådan kaka finns, kan användare enkelt
            återgå till den plats där de senast läste boken, även efter att de har stängt webbläsaren
            eller enheten. Kakan raderas efter ett år för att försäkra att användare hinner läsa klart
            boken.
          </li>
        </ul>

        <h3 className="text-lg font-semibold mb-2">Vilka val har du?</h3>
        <p className="mb-4">
          Om du inte vill att kakor lagras på din dator kan du stänga av funktionen i din
          webbläsares inställningar. Då lagras inga kakor men du kommer inte kunna använda vissa
          funktioner på webbplatsen.
        </p>
      </section>

      <section className="mt-10">
        <h3 className="text-lg font-semibold mb-2">Vårt åtagande för tillgänglighet</h3>

        <p>
          Vi arbetar kontinuerligt för att förbättra tillgängligheten på vår webbplats.
          Om du stöter på hinder eller upplever att vi inte uppfyller lagens krav,
          vänligen <a
            href="https://www.legimus.se/anvaenda-legimus/tillgaenglighetsredogoerelser/tillgaenglighetsredogoerelse-foer-legimusse/"
            class="text-blue-500 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer">
            besök vår tillgänglighetsredogörelse</a>
          . Din feedback är ovärderlig för oss och hjälper oss att skapa en bättre upplevelse för alla användare.
        </p>

        <p className="mt-4 font-bold">Du kan även nå oss på följande sätt:</p>
        <ul className="list-disc list-inside">
          <li className="m-2">
            Skicka e-post till <a href="mailto:info@mtm.se" className="text-blue-500 hover:text-blue-700">info@mtm.se</a>
          </li>
          <li className="m-2">
            Ring oss på <span className="text-blue-500">040-6532710</span>
          </li>
        </ul>

        <p className="my-10">
          Webbplatsen uppdaterades senast den 25 maj 2024.
        </p>
      </section>


      <div className="w-full flex justify-center">
        {cookiePermission ?
          <button className="button" onClick={() => { navigate('/') }}>
            Ta mig till startsidan
          </button>
          :
          <button className="button" onClick={() => {
            setCookiePermission(CookieEnum.ALLOWED);
            navigate('/');
          }}>
            Godkänn kakor och ta mig till startsidan
          </button>
        }
      </div>
    </main>
  );
}
