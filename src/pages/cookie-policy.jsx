export default function CookiePolicy({setOpenCookiePolicy}) {

  return (
    <main className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 max-w-2xl h-4/5 mx-auto rounded-lg shadow-lg relative overflow-y-auto">
        <button onClick={() => setOpenCookiePolicy(false)} className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 focus:outline-none">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Kakor och integritetspolicy</h2>
          <p className="mb-4">Syftet med denna policy är att ge dig som användare av MTM:s webbplats information om hur vi använder kakor (cookies) på vår webbplats och vilka inställningar du kan göra när det gäller kakor.</p>
          <h3 className="text-lg font-semibold mb-2">Vad är kakor?</h3>
          <p className="mb-4">En kaka är en liten textfil som webbplatsen du besöker begär att få spara på din dator, mobiltelefon eller surfplatta. Kakor kan användas till olika saker, till exempel för att komma ihåg dina inställningar, hjälpa dig navigera mellan olika sidor och förbättra din användarupplevelse.</p>
          <h4 className="text-lg font-semibold mb-2">Typer av kakor:</h4>
          <p className="mb-4"><strong>Sessionskakor:</strong> Dessa kakor lagras tillfälligt i din enhets minne under tiden du är inne på en webbsida för att denna ska fungera korrekt under din användning. Dessa kakor försvinner när du stänger din webbläsare.</p>
          <p className="mb-4"><strong>Varaktiga kakor:</strong> Dessa kakor lagras i din webbläsare under en bestämd tid innan de raderas. De kan till exempel göra att en webbsida kan komma ihåg din webbläsare och dina personliga inställningar till nästa gång du loggar in.</p>
          <h4 className="text-lg font-semibold mb-2">Nödvändiga kakor</h4>
          <p className="mb-4">Följande kakor är nödvändiga för att möjliggöra din användning av webbplatsen. Utan dessa kakor finns en stor risk att webbplatsen inte fungerar korrekt:</p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>"ID"_latest_position</strong> - Denna kaka används för att spara den senaste lästa positionen i en specifik bok på webbplatsen. Om en sådan kaka finns, kan användare enkelt återgå till den plats där de senast läste boken, även efter att de har stängt webbläsaren eller enheten. Kakan raderas efter ett år för att försäkra att användare hinner läsa klart boken.</li>
          </ul>
          <h3 className="text-lg font-semibold mb-2">Vilka val har du?</h3>
          <p className="mb-4">Om du inte vill att kakor lagras på din dator kan du stänga av funktionen i din webbläsares inställningar. Då lagras inga kakor men du kommer inte kunna använda vissa funktioner på webbplatsen.</p>
      </div>
    </main>
  )
}