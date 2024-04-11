import React, { useState } from "react";
import useDocumentTitle from "../functions/useDocumentTile.js";

export default function ReadMode({ setReadmode, pefObject }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [readMetaData, setReadMetaData] = useState(true);
  const lastpage = 100;

  useDocumentTitle(`Sida: ${currentPage} | ${pefObject.metaData.titel}`);

  console.log(pefObject.bodyData.volumes);

  function handleMetaData() {
    setReadMetaData(!readMetaData);
  }

  function handleNextPage() {
    if (currentPage < lastpage) {
      setCurrentPage(currentPage + 1);
    } else {
      alert("Fel: Det finns inga fler sidor i boken.");
    }
  }

  function handlePreviousPage() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      alert("Fel: Du kan inte gå längre bakåt i den här boken.");
    }
  }

  function handleBackToStartPage() {
    setReadmode(false);
  }

  function handleReset() {
    setCurrentPage(0);
  }

  function handleSetCurrentPage(index) {
    setCurrentPage(index);
  }

  const renderRows = () => {
    const rows = [];

    // Iterate over volumes
    for (let i = 0; i < pefObject.bodyData.volumes.length; i++) {
      const volume = pefObject.bodyData.volumes[i];

      // Check if volume has sections
      if (volume.sections) {
        // Iterate over sections in the volume
        for (let j = 0; j < volume.sections.length; j++) {
          const section = volume.sections[j];

          // Check if section has pages
          if (section.pages) {
            // Iterate over pages in the section
            for (let k = 0; k < section.pages.length; k++) {
              const page = section.pages[k];

              // Check if page has rows
              if (page.rows) {
                // Iterate over rows in the page
                for (let l = 0; l < page.rows.length; l++) {
                  const row = page.rows[l];
                  // Push each row to the rows array
                  rows.push(
                    <div key={`${i}-${j}-${k}-${l}`}>
                      {/* Render your row content here */}
                      <p>{row}</p>
                    </div>
                  );
                }
              }
            }
          }
        }
      }
    }
    return rows;
  };

  return (
    <main className="flex flex-col justify-start items-center h-screen pt-10 pl-20 pr-20 max-w-screen-lg mx-auto">
      <div className="p-6 m-10 border border-gray-500 w-90">
        {readMetaData ? (

          <div>
            {Object.entries(pefObject.metaData).map(([key, value]) => (
              value && <p key={key}><strong>{key}: </strong>{value}</p>
            ))}
          </div>

        ) : (

          <div className="mr-10 w-auto h-full max-h-80 overflow-y-auto overflow-x-hidden">
  {renderRows()}
</div>





        )}
      </div>

      <button onClick={handleNextPage} className="bg-purple-300 border border-purple-600 m-2 px-6 py-2 rounded-full uppercase font-bold shadow-xl 
        transition duration-200 hover:bg-white hover:shadow-2xl">
        Nästa sida
      </button>

      <button onClick={handlePreviousPage} className="bg-purple-300 border border-purple-600 px-6 m-2 py-2 rounded-full uppercase font-bold shadow-xl 
        transition duration-200 hover:bg-white hover:shadow-2xl">
        Föregående sida
      </button>

      <button onClick={handleBackToStartPage} className="bg-purple-300 border border-purple-600 m-2 px-6 py-2 rounded-full uppercase font-bold shadow-xl 
        transition duration-200 hover:bg-white hover:shadow-2xl">
        Till startsida
      </button>

      <button onClick={handleMetaData} className="bg-purple-300 border border-purple-600 m-2 px-6 py-2 rounded-full uppercase font-bold shadow-xl 
        transition duration-200 hover:bg-white hover:shadow-2xl">
        Information
      </button>
    </main>
  );
}
