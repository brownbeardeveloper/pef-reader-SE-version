export default function Footer() {
  return (
    <footer className="bg-slate-50 text-center lg:text-left py-10 border-t-4 border-fuchsia-700">
      <div className="container mx-auto px-10 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between">
        <div className="text-neutral-700 flex flex-col items-center lg:items-start">
          <span className="text-2xl m-3">&copy; 2024 MYNDIGHETEN FÖR TILLGÄNGLIGA MEDIER</span>
          <nav className="mt-2">
            <a
              className="text-xl text-blue-600 underline hover:text-blue-800 mr-4"
              href="https://www.mtm.se/"
            >
              Myndigheten för Tillgängliga Medier
            </a>
            <a
              className="text-xl text-blue-600 underline hover:text-blue-800 mr-4"
              href="https://www.legimus.se/"
            >
              Legimus
            </a>
            <a
              className="text-xl text-blue-600 underline hover:text-blue-800 mr-4"
              href="/instruktion"
            >
              Användarinstruktioner
            </a>
            <a
              className="text-xl text-blue-600 underline hover:text-blue-800"
              href="/om-kakor-och-tillganglighet"
            >
              Kakor och tillgänglighet
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
