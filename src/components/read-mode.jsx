import React, { useState } from "react";
import useDocumentTitle from "../functions/useDocumentTile.js";
import { setSessionStorageDataByFileId } from "../functions/sessionHandler.js";

export default function ReadMode({ setReadmode, pefObject, howToRead }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [readMetaData, setReadMetaData] = useState(true);
  const lastpage = 100;

  useDocumentTitle(`Sida: ${currentPage} | ${pefObject.metaData.titel}`);

  function handleMetaData() {
    setReadMetaData(!readMetaData);
    alert(
      Object.entries(pefObject.metaData)
        .map(([key, value]) => value && `${key}: ${value}`)
        .filter(Boolean)
        .join('\n')
    );

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

  function handleClick(i, j, k, l) {
    setSessionStorageDataByFileId(pefObject.metaData.identifier, i, j, k, l)
    const rowValue = pefObject.bodyData.volumes[i].sections[j].pages[k].rows[l];
    console.log("Clicked row value:", rowValue);
  }


  const renderRows = () => {
    const rows = [];
    let pageIndex = 1

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

              rows.push(<div>Sida {pageIndex++}</div>)

              // Check if page has rows
              if (page.rows) {
                // Iterate over rows in the page
                for (let l = 0; l < page.rows.length; l++) {
                  const row = page.rows[l];

                  // Push each row to the rows array
                  rows.push(
                    <div key={`${i}-${j}-${k}-${l}`} onClick={() => handleClick(i, j, k, l)}>
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
    <main className="flex flex-col justify-start items-center h-screen">

      {howToRead === 'ONEFLOW' ? (
        <div className="p-4 sm:p-8 border border-gray-500 rounded-md w-full max-w-lg">
          <div className="w-full max-h-80 overflow-y-auto">
            {renderRows()}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="p-4 sm:p-8 border border-gray-500 rounded-md w-full max-w-lg">
            <div className="w-full">
              <p>page by page</p>
            </div>
          </div>
          <div className="flex flex-row m-2">
            <button onClick={handleNextPage} className="bg-purple-300 border border-purple-600 m-2 px-6 py-2 rounded-full uppercase font-bold shadow-xl transition duration-200 hover:bg-white hover:shadow-2xl">
              Nästa sida
            </button>
            <button onClick={handlePreviousPage} className="bg-purple-300 border border-purple-600 m-2 px-6 py-2 rounded-full uppercase font-bold shadow-xl transition duration-200 hover:bg-white hover:shadow-2xl">
              Föregående sida
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-row m-2">
        <button onClick={handleBackToStartPage} className="bg-purple-300 border border-purple-600 m-2 px-6 py-2 rounded-full uppercase font-bold shadow-xl transition duration-200 hover:bg-white hover:shadow-2xl">
          Till startsida
        </button>
        <button onClick={handleMetaData} className="bg-purple-300 border border-purple-600 m-2 px-6 py-2 rounded-full uppercase font-bold shadow-xl transition duration-200 hover:bg-white hover:shadow-2xl">
          Bokdetaljer
        </button>
      </div>
    </main>
  );
}
