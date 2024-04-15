import React, { useState } from "react";
import useDocumentTitle from "../functions/useDocumentTile.js";
import { setRowValueCookieByBookId } from "../functions/cookieManager.js";
import { ViewModeEnum } from "../data/enums.js"
import { getRowValueCookieByBookIdAsJson } from "../functions/cookieManager.js";

export default function ReadMode({ cookie, setCookie, setReadmode, pefObject, howToRead }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [readMetaData, setReadMetaData] = useState(false);
  const [alertShown, setAlertShown] = useState(false); // Track if the alert message has been shown
  const lastpage = 100;

  useDocumentTitle(pefObject.metaData.titel);

  if (!alertShown) {
    handleGetCookie()
    setAlertShown(true)
  }

  function handleMetaData() {
    setReadMetaData(!readMetaData);
    alert(
      Object.entries(pefObject.metaData)
        .map(([key, value]) => value && `${key}: ${value}`)
        .filter(Boolean)
        .join('\n')
    )
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

  function handleReset() {
    setCurrentPage(0);
  }

  function handleSetCurrentPage(index) {
    setCurrentPage(index);
  }

  function handleReadCookie() {
    if (cookie) {
      const element = document.getElementById(cookie);
      if (element) {
        element.classList.toggle("bg-yellow-300")
        element.scrollIntoView({ behavior: "smooth" })
      } else {
        console.error('Error: Unable to find the specified element.')
      }

    } else {
      console.error('There is no cookie.')
    }
  }

  function handleClickRow(i, j, k, l) {
    const rowId = `row-${i}-${j}-${k}-${l}`;
    setCookie(rowId)
    setRowValueCookieByBookId(pefObject.metaData.identifier, rowId)
    const element = document.getElementById(rowId);
    if (element) {
      element.classList.toggle("bg-yellow-300")
      element.scrollIntoView({ behavior: "smooth" })
    } else {
      console.error('Error: Unable to find the specified element.')
    }
  }

  function handleClickPage(pageIndex) {
    console.log("Clicked page:", pageIndex);
  }

  function handleGetCookie() {
    if (pefObject && pefObject.metaData && pefObject.metaData.identifier && pefObject.metaData.titel) {

      const data = getRowValueCookieByBookIdAsJson(pefObject.metaData.identifier);

      if (data) {
        setCookie(data);
        alert(`Din senaste sparade position i boken '${pefObject.metaData.titel}' har hittats!`);
      } else {
        console.error('There is no cookie.');
      }
    } else {
      console.error('pefObject.metaData.identifier is undefined.');
    }
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
              const thisPageIndex = pageIndex

              rows.push(
                <div key={`${i}-${j}-${k}`} onClick={() => handleClickPage(thisPageIndex)}>
                  Sida {pageIndex++}
                </div>
              )

              // Check if page has rows
              if (page.rows) {
                // Iterate over rows in the page
                for (let l = 0; l < page.rows.length; l++) {
                  const row = page.rows[l];

                  // Push each row to the rows array
                  rows.push(
                    <div key={`${i}-${j}-${k}-${l}`} onClick={() => handleClickRow(i, j, k, l)}>
                      <p id={`row-${i}-${j}-${k}-${l}`}>{row}</p>
                    </div>
                  );
                }
              }
            }
          }
        }
      }
    }
    return rows
  }

  return (
    <main className="flex flex-col justify-start items-center h-screen">

      {cookie &&
        <button onClick={handleReadCookie}
          className="bg-purple-200 border border-purple-600 m-2 px-6 py-2 rounded-full uppercase font-bold shadow-xl 
              transition duration-200 hover:bg-white hover:shadow-2xl">
          Återskapa den senast sparade positionen
        </button>
      }

      {howToRead === ViewModeEnum.ONE_FLOW ? (

        <div className="p-4 sm:p-8 border border-gray-500 rounded-md w-full">
          <div className="w-96 overflow-y-auto h-96">
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
        <button onClick={() => setReadmode(false)} className="bg-purple-200 border border-purple-600 m-2 px-6 py-2 rounded-full uppercase font-bold shadow-xl transition duration-200 hover:bg-white hover:shadow-2xl">
          Till startsidan
        </button>
        <button onClick={handleMetaData} className="bg-purple-200 border border-purple-600 m-2 px-6 py-2 rounded-full uppercase font-bold shadow-xl transition duration-200 hover:bg-white hover:shadow-2xl">
          Bokdetaljer
        </button>
      </div>
    </main>
  )
}
