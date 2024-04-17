import React, { useEffect, useState } from "react";
import useDocumentTitle from "../functions/useDocumentTile.js";
import { setLatestRowPositionToCookie } from "../functions/cookieManager.js";
import { ViewModeEnum } from "../data/enums.js"

export default function ReadMode({ savedRowIndex, setSavedRowIndex, setReadmode, pefObject, howToRead }) {

  const [showDetails, setShowDetails] = useState(false);

  useDocumentTitle(pefObject.metaData.titel)

  function handleShowLatestSavedPositionBtn() {
    if (savedRowIndex) {

      const element = document.getElementById(savedRowIndex);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        element.focus()
      } else {
        console.error('Error: Unable to find the specified element.')
      }

    } else {
      console.error('There is no cookie.')
    }
  }

  function handleClickRow(i, j, k, l) {

    const rowId = `row-${i}-${j}-${k}-${l}`;
    setSavedRowIndex(rowId)
    setLatestRowPositionToCookie(pefObject.metaData.identifier, rowId)
    const element = document.getElementById(rowId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    } else {
      console.error('Error: Unable to find the specified element.')
    }
  }

  function handleScrollToTop() {
    const rowId = `row-0-0-0-0`
    const element = document.getElementById(rowId)
    element.scrollIntoView({ behavior: "smooth" })
    element.focus()
  }

  function handleClickPage(pageIndex) {
    console.log("Clicked page:", pageIndex);
  }

  function handleShowBookDetailsBtn() {
    setShowDetails(!showDetails);
    if (pefObject.metaData) {
      alert(
        Object.entries(pefObject.metaData)
          .map(([key, value]) => value && `${key}: ${value}`)
          .filter(Boolean)
          .join('\n')
      )
    } else {
      alert("Bokens detaljer kunde inte hittas")
    }
  }

  const renderRows = () => {
    const rows = [];
    let pageIndex = 1

    for (let i = 0; i < pefObject.bodyData.volumes.length; i++) {
      const volume = pefObject.bodyData.volumes[i];
      if (volume.sections) {
        for (let j = 0; j < volume.sections.length; j++) {
          const section = volume.sections[j];
          if (section.pages) {
            for (let k = 0; k < section.pages.length; k++) {
              const page = section.pages[k];
              const thisPageIndex = pageIndex

              rows.push( // Push page's index into rows array
                <div key={`${i}-${j}-${k}`} onClick={() => handleClickPage(thisPageIndex)}>
                  Sida {pageIndex++}
                </div>
              )

              if (page.rows) {
                for (let l = 0; l < page.rows.length; l++) {
                  const row = page.rows[l];

                  // Push each row to the rows array
                  rows.push(
                    <div key={`${i}-${j}-${k}-${l}`} onClick={() => handleClickRow(i, j, k, l)}>
                      <p id={`row-${i}-${j}-${k}-${l}`} className={(`row-${i}-${j}-${k}-${l}` === savedRowIndex) ? "bg-yellow-300" : ""}>{row}</p>
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

      {savedRowIndex &&
        <button onClick={handleShowLatestSavedPositionBtn}
          className="bg-purple-200 border border-purple-600 m-2 px-6 py-2 rounded-full uppercase font-bold shadow-xl 
              transition duration-200 hover:bg-white hover:shadow-2xl">
          Visa den senast sparade positionen
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
            <button onClick={null} className="bg-purple-300 border border-purple-600 m-2 px-6 py-2 rounded-full uppercase font-bold shadow-xl transition duration-200 hover:bg-white hover:shadow-2xl">
              Nästa sida
            </button>
            <button onClick={null} className="bg-purple-300 border border-purple-600 m-2 px-6 py-2 rounded-full uppercase font-bold shadow-xl transition duration-200 hover:bg-white hover:shadow-2xl">
              Föregående sida
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-row m-2">
      <button onClick={handleScrollToTop} className="bg-purple-200 border border-purple-600 m-2 px-6 py-2 rounded-full uppercase font-bold shadow-xl transition duration-200 hover:bg-white hover:shadow-2xl">
          Scrolla till toppen
        </button>
        <button onClick={handleShowBookDetailsBtn} className="bg-purple-200 border border-purple-600 m-2 px-6 py-2 rounded-full uppercase font-bold shadow-xl transition duration-200 hover:bg-white hover:shadow-2xl">
          Bokdetaljer
        </button>
        <button onClick={() => setReadmode(false)} className="bg-purple-200 border border-purple-600 m-2 px-6 py-2 rounded-full uppercase font-bold shadow-xl transition duration-200 hover:bg-white hover:shadow-2xl">
          Till startsidan
        </button>
      </div>
    </main>
  )
}



/*
    // not important right now!
    const [currentPage, setCurrentPage] = useState(0);
    const lastpage = 100;

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

  function handleSetCurrentPage(index) {
    setCurrentPage(index);
  } */