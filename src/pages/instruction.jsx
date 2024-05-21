import { useNavigate } from "react-router-dom";
import { CookieEnum } from "../data/enums";

export default function InstructionPage({ cookiePermission, setCookiePermission }) {
  const navigate = useNavigate();

  return (
    <main className="max-w-2xl mx-auto px-10 pt-10 pb-20">
      <h2 className="text-2xl font-bold mb-4">Välkommen till Digital punktläsare!</h2>
      <p className="mb-6">Denna applikation är utformad för att göra det enklare för användare utan eller med synnedsättning att få tillgång till punktskriftsböcker digitalt och läsa dem direkt i webbläsaren.</p>

      <div className="mb-8">
        <h3 className="text-md font-bold mb-2">Följ dessa enkla steg för att använda applikationen effektivt:</h3>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-bold mb-2">1. Ladda upp filen:</h4>
        <p>Klicka på knappen "Ladda upp fil" för att välja en punktskriftsfil (.pef) från din enhet.</p>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-bold mb-2">2. Välj läsläge:</h4>
        <p>Du kan välja mellan två läslägen:</p>
        <ul className="list-disc pl-6">
          <li className="m-2"><strong>"Löpande text":</strong> Texten visas löpande på webbsidan med längre rader för en kontinuerlig läsupplevelse.</li>
          <li className="m-2"><strong>"Sida för sida":</strong> Varje sida från boken visas som en separat sida på webbsidan med samma radlängd som i den ursprungliga boken.</li>
        </ul>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-bold mb-2">3. Byt visningsläge:</h4>
        <p>Du kan också välja mellan två visningslägen:</p>
        <ul className="list-disc pl-6">
          <li className="m-2"><strong>"Punktskriftvy":</strong> Visar texten i punktskrift för användare utan syn eller med synnedsättning.</li>
          <li className="m-2"><strong>"Svartskriftvy":</strong> Visar texten i vanlig svart text på vit bakgrund för användare som föredrar det konventionella visningsläget.</li>
        </ul>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-bold mb-2">4. Spara senaste läspositionen:</h4>
        <p>För att spara den senaste läspositionen behöver du tillåta kakor och sedan ha autosave-knappen påslagen. Den senaste läspositionen sparas automatiskt i kakor så fort sidan scrollas och visas automatiskt när du laddar upp samma bok igen.</p>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-bold mb-2">5. Navigera i boken:</h4>
        <p>Det finns knappar nedanför bokens sidor för att navigera runt i boken. Beroende på vilket läge du använder kan du använda dem för att hoppa mellan sidor. Observera att om autosave är aktiverat och du navigerar till första sidan eller till en annan sida, sparas den nya sidan som senaste läsposition.</p>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-bold mb-2">6. Bokens grundläggande bibliografiska information:</h4>
        <p>
          Nedanför navigationsknapparna finns en ruta som visar bokens grundläggande bibliografiska information som standard. När du laddar upp en bok, uppdateras informationen automatiskt och inkluderar bland annat beskrivning, utgivare, och datum.
        </p>
      </div>

      <div className="mb-8">
        <p>Vid anmärkningar om sidans tillgänglighet, gå till sidfoten och klicka på "Kakor och Tillgänglighet" för att komma till en sida där du kan lämna feedback och få kontaktuppgifter.</p>
      </div>

      <div className="w-full flex justify-center">
        {cookiePermission ?
          <button className="button" onClick={() => { navigate('/') }}>
            Ta mig till applikationen
          </button>
          :
          <button className="button" onClick={() => {
            setCookiePermission(CookieEnum.ALLOWED);
            navigate('/');
          }}>
            Godkänn kakor och ta mig till applikationen
          </button>
        }
      </div>
    </main>
  );
}
