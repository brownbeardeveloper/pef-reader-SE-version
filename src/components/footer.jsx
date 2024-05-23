import mtmIcon from '../media/mtm-icon.svg'

export default function Footer() {

  return (
    <footer className="bg-white text-center pt-10 border-t-4 border-fuchsia-700">
      <div className="container mx-auto px-10 flex flex-col items-center justify-center">
        <div className="text-neutral-700 flex flex-col items-center">
          <nav className="mt-2">
            <a
              className="text-md font-semibold text-sky-600 underline hover:text-blue-900 mx-2"
              href="https://www.mtm.se/"
            >
              Myndigheten för Tillgängliga Medier
            </a>
            |
            <a
              className="text-md font-semibold text-sky-600 underline hover:text-blue-900 mx-2"
              href="https://www.legimus.se/"
            >
              Legimus
            </a>
            |
            <a
              className="text-md font-semibold text-sky-600 underline hover:text-blue-900 mx-2"
              href="/instruktion"
            >
              Användarinstruktioner
            </a>
            |
            <a
              className="text-md font-semibold text-sky-600 underline hover:text-blue-900 mx-2"
              href="/om-kakor-och-tillganglighet"
            >
              Kakor och tillgänglighet
            </a>
            |
            <a
              className="text-md font-semibold text-sky-600 underline hover:text-blue-900 mx-2"
              href="/kontakt"
            >
              Kontakta oss
            </a>

          </nav>

          <div className='mt-10 mb-5 w-56'>
            <img src={mtmIcon} alt='mtm ikon' className='h-full w-full'/>
          </div>
        </div>
      </div>
    </footer>
  );
}
