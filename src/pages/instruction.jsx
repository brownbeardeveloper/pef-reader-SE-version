export default function InstructionPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Välkommen till Digital punktläsare!</h2>
      <p className="mb-6">Denna applikation är utformad för att göra det enklare för användare utan eller med synnedsättning att få tillgång till punktskriftsböcker digitalt och läsa dem direkt i webbläsaren. Följ dessa enkla steg för att använda applikationen effektivt:</p>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">1. Ladda upp filen:</h3>
        <p>Klicka på knappen "Ladda upp fil" för att välja en punktskriftsfil (.pef) från din enhet.</p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">2. Välj läsläge:</h3>
        <p>Du kan välja mellan två läslägen:</p>
        <ul className="list-disc pl-6">
          <li><strong>"Löpande text":</strong> Texten visas löpande på webbsidan med längre rader för en kontinuerlig läsupplevelse.</li>
          <li><strong>"Sida för sida":</strong> Varje sida från boken visas som en separat sida på webbsidan med samma radlängd som i den ursprungliga boken.</li>
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">3. Byt visningsläge:</h3>
        <p>Du kan också välja mellan två visningslägen:</p>
        <ul className="list-disc pl-6">
          <li><strong>"Punktskrift vy":</strong> Visar texten i punktskrift för användare utan syn eller med synnedsättning.</li>
          <li><strong>"Svartskrift vy":</strong> Visar texten i vanlig svart text på vit bakgrund för användare som föredrar det konventionella visningsläget.</li>
          {/* tillägga att det går välja i vilken sida man ska hoppa till när man klickar i sida för sida funktion och om det lämnas som default så blir det första sidan */}
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">4. Spara senaste läspositionen:</h3>
        <p>För att spara den senaste läspositionen, klicka på raden där du vill spara positionen. Den senaste läspositionen sparas automatiskt i en cookie och är tillgänglig nästa gång du öppnar samma bok. Sparade rader markeras med en gul bakgrundsfärg för enkel åtkomst.</p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">5. Fortsätt läsa:</h3>
        <p>Om du har sparat en läsposition tidigare finns det en knapp "Fortsätt läsa" som återvänder till den sparade positionen, oavsett om du använder läsläget "Löpande text" eller "Sida för sida".</p>
      </div>
    </main>
  );
}
