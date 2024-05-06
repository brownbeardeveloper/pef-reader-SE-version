import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left py-10">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
        <div className="text-neutral-700 dark:text-neutral-200">
          <span className="block">&copy; 2022 MYNDIGHETEN FÖR TILLGÄNGLIGA MEDIER</span>
          <span className="block mt-2">
            <a
              className="text-neutral-800 dark:text-neutral-400 hover:underline mr-4"
              href="https://www.mtm.se/"
            >
              Myndigheten för Tillgängliga Medier
            </a>
            <a
              className="text-neutral-800 dark:text-neutral-400 hover:underline mr-4"
              href="https://www.legimus.se/"
            >
              Legimus
            </a>
            <a
              className="text-neutral-800 dark:text-neutral-400 hover:underline mr-4"
              href="/instruktion"
            >
              Användarinstruktioner
            </a>
            <a
              className="text-neutral-800 dark:text-neutral-400 hover:underline"
              href="/kakor"
            >
              Kakor och Tillgänglighet
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
