import React, { useEffect, useState } from "react";
import useDocumentTitle from "../functions/useDocumentTile.js";
import { setLatestRowPositionToCookie } from "../functions/cookieManager.js";
import brailleTranslator from "../functions/translator/brailleTranslator.js";

export default function ReadMode({ cookiePermission, savedRowIndex, setSavedRowIndex, setReadmode, pefObject }) {

  const [showDetails, setShowDetails] = useState(false);
  const [translateText, setTranslateText] = useState(false)
  let maxPageIndex = 0
  let maxVolumeIndex = 0

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

    if (cookiePermission === "allowed") {
      setLatestRowPositionToCookie(pefObject.metaData.identifier, rowId)
    } else {
      alert("Din position har sparats, men eftersom cookies inte är tillåtna, kommer positionen inte att sparas när du återvänder till sidan.")
    }

    const element = document.getElementById(rowId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      if (document.activeElement !== element) {
        element.focus();
      }
    } else {
      console.error('Error: Unable to find the specified element.')
    }
  }

  function handleScrollToPageIndex(index) {
    const pageId = `page-${index}`
    const element = document.getElementById(pageId)

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });

      if (document.activeElement !== element) {
        element.focus();
      }

    } else {
      console.error(`Element with ID '${pageId}' not found.`);
    }
  }

  function handleScrollToVolumeIndex(index) {
    const volumeId = `volume-${index}`
    const element = document.getElementById(volumeId)

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });

      if (document.activeElement !== element) {
        element.focus();
      }

    } else {
      console.error(`Element with ID '${volumeId}' not found.`);
    }
  }

  function handleClickPage(index) {
    console.log("Clicked page:", index);
  }

  function handleClickVolym(index) {
    console.log("Clicked volym:", index);
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
    let volumeIndex = 1
    let pageIndex = 1

    for (let i = 0; i < pefObject.bodyData.volumes.length; i++) {
      const volume = pefObject.bodyData.volumes[i];

      const thisVolumeIndex = volumeIndex

      rows.push(
        <div key={`${i}`} onClick={() => handleClickVolym(thisVolumeIndex)}>
          <h2 id={`volume-${thisVolumeIndex}`} className="font-black">Volym {volumeIndex++}</h2>
        </div>
      )

      if (volume.sections) {
        for (let j = 0; j < volume.sections.length; j++) {
          const section = volume.sections[j];

          if (section.pages) {
            for (let k = 0; k < section.pages.length; k++) {
              const page = section.pages[k];
              const thisPageIndex = pageIndex

              rows.push(
                <div key={`${i}-${j}-${k}`} onClick={() => handleClickPage(thisPageIndex)}>
                  <h3 id={`page-${thisPageIndex}`} className="font-black">Sida {pageIndex++}</h3>
                </div>
              )

              if (page.rows) {
                for (let l = 0; l < page.rows.length; l++) {
                  const row = page.rows[l];

                  // Push each row to the rows array
                  rows.push(
                    <div key={`${i}-${j}-${k}-${l}`} onClick={() => handleClickRow(i, j, k, l)}>
                      <p id={`row-${i}-${j}-${k}-${l}`}
                        className={(`row-${i}-${j}-${k}-${l}` === savedRowIndex) ? "bg-yellow-300" : ""}>

                        {translateText ? brailleTranslator(row) : row}

                      </p>
                    </div>
                  );
                }
              }
            }
          }
        }
      }
    }
    maxVolumeIndex = volumeIndex
    maxPageIndex = pageIndex
    return rows
  }

  return (
    <main className="flex flex-col justify-start items-center h-screen">

      {savedRowIndex ?
        <button onClick={handleShowLatestSavedPositionBtn}
          className="button">
          Visa den senast sparade positionen
        </button>
        :
        <p class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 mb-1 rounded relative" role="alert">
          <span class="block sm:inline">Man kan spara läspositionen genom att klicka på textraden, vilken sedan sparas i cookies.</span>
        </p>
      }

      <div className="p-4 flex justify-center align-center sm:p-8 border border-gray-500 rounded-md w-full">
        <div className="w-96 overflow-y-auto h-96">
          {renderRows()}
        </div>
      </div>

      <div className="flex flex-row m-2">
        <button onClick={handleShowBookDetailsBtn} className="button">
          Bokdetaljer
        </button>
        
        <button onClick={() => handleScrollToPageIndex(1)} className="button">
          Återvänd till bokens första sidan
        </button>

        <button onClick={() => setTranslateText(!translateText)} className="button">
          Översätta
        </button>

        <button onClick={() => setReadmode(false)} className="button">
          Till startsidan
        </button>
      </div>

      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          const pageNumber = parseInt(e.target.elements.goToPage.value, 10); 
          handleScrollToPageIndex(pageNumber);
        }}>
          <label htmlFor="goToPage">Hoppa till sida: </label>
          <input className="border border-black" id="goToPage" type="number" min="1" max={maxPageIndex - 1} required />
          <button type="submit" className="button">ENTER</button>
        </form>


        {/* I think we will delete this below later... */}
        <form onSubmit={(e) => {
          e.preventDefault();
          const volumeNumber = parseInt(e.target.elements.goToVolume.value, 10); 
          handleScrollToVolumeIndex(volumeNumber);
        }}>
          <label htmlFor="goToVolume">Hoppa till volym: </label>
          <input className="border border-black" id="goToVolume" type="number" min="1" max={maxVolumeIndex - 1} required />
          <button type="submit" className="button">ENTER</button>
        </form>
      </div>
    </main>
  )
}