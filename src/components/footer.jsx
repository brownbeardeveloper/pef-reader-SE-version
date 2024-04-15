import React from 'react';

export default function Footer({ setOpenCookiePolicy }) {
  return (
    <footer className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left mt-auto">
      <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row items-center justify-between">
        <div className="text-neutral-700 dark:text-neutral-200">
          <span className="block">&copy; 2022 MYNDIGHETEN FÖR TILLGÄNGLIGA MEDIER</span>
          <span className="block mt-2">
            <a
              className="text-neutral-800 dark:text-neutral-400 hover:underline"
              href="https://www.mtm.se/"
            >
              Besök vår webbplats
            </a>
          </span>
        </div>
        <div>
          <button
            onClick={() => setOpenCookiePolicy(true)}
            className="bg-primary-500 text-neutral-700 dark:text-neutral-200 py-2 px-4 focus:outline-none focus:shadow-outline rounded-full hover:bg-primary-600 transition duration-300 ease-in-out"
          >
            Kakor och integritetspolicy
          </button>
        </div>
      </div>
    </footer>
  );
}
