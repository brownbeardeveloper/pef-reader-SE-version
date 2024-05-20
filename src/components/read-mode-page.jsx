import React, { useEffect, useState } from "react";
import useDocumentTitle from "../functions/useDocumentTile.js";
import brailleTranslator from "../functions/translator/brailleTranslator.js";
import { filterUnnecessarySentence } from "../functions/filterSetences.js"
import { manipulatePageIndexToRemoveUnnecessaryPages } from "../functions/filterPages.js";
import { FormatModeEnum, CookieEnum } from '../data/enums.js'
// import { PositionSavedVoice, CountineReadingVoice } from "../functions/play-voice.js";

export default function ReadModePageByPage({ savedPageIndex, setSavedPageIndex, cookiePermission, setReadmode, pefObject }) {
  const [pages, setPages] = useState([]);
  const [maxPageIndex, setMaxPageIndex] = useState(0);
  const [bookView, setBookView] = useState(FormatModeEnum.BRAILLE_VIEW)
  const [firstPageIndex, setFirstPageIndex] = useState(0)
  const [autoSave, setAutoSave] = useState(true)

  useDocumentTitle(pefObject.metaData.titel);

  useEffect(() => {
    // Resave the pages array when it changes
    savePagesFromPefObject();
  }, [pefObject, bookView]);

  function handleNextPageBtn() {
    if (savedPageIndex < maxPageIndex) {
      setSavedPageIndex(savedPageIndex +1);
    } else {
      alert("Fel: Det finns inga fler sidor i boken.");
    }
  }

  function handlePreviousPageBtn() {
    if (savedPageIndex > firstPageIndex) {
      setSavedPageIndex(savedPageIndex -1);
    } else {
      alert("Fel: Du kan inte gå längre bakåt i den här boken.");
    }
  }

  function handleSetCurrentPage(index) {
    if (savedPageIndex === index) {
      if (index === firstPageIndex) {
        alert('Du är redan på den första sidan.')
      } else {
        alert(`Du är redan på sidan ${index}.`)
      }
    } else {
      setSavedPageIndex(index)
      return true
    }
  }

  // Render the current page in html 
  function showCurrentPage(pageIndex) {
    if (pageIndex < firstPageIndex) {
      return pages[firstPageIndex]
    } else {
      return pages[pageIndex]
    }
  }

  function savePagesFromPefObject() {
    // Array to store pages
    const pagesFromPefObject = [];
    // Variable to store index of the first page
    let firstPageIndex;
    // Variable to track current page index
    let pageIndex = 1;

    const volumes = pefObject.bodyData.volumes;
    for (let i = 0; i < volumes.length; i++) {
      const volume = volumes[i];
      if (volume.sections) {
        const sections = volume.sections;
        for (let j = 0; j < sections.length; j++) {
          const section = sections[j];
          if (section.pages) {
            const sectionPages = section.pages;
            for (let k = 0; k < sectionPages.length; k++) {

              // Apply manipulation to page index if necessary
              k = manipulatePageIndexToRemoveUnnecessaryPages(sectionPages, k);
              const page = sectionPages[k]
              const thisPageIndex = pageIndex
              pageIndex++;

              // Generate JSX element for page content
              const pageElement = page && page.rows && (
                <div key={`${i}-${j}-${k}`} onClick={() => null}>
                  <h3 id={`page-${thisPageIndex}`} className="font-black">
                    Sida {thisPageIndex}
                  </h3>

                  {page.rows.map((row, l) => (
                    <div key={`${i}-${j}-${k}-${l}`}>
                      <span>
                        {bookView === FormatModeEnum.NORMAL_VIEW
                          ? brailleTranslator(filterUnnecessarySentence(row))
                          : filterUnnecessarySentence(row)}
                      </span>
                    </div>
                  ))}
                </div>
              );

              // Save the page element if it's the first page index and there's a page element
              if (!firstPageIndex && pageElement) {
                firstPageIndex = thisPageIndex;
                pagesFromPefObject[thisPageIndex] = pageElement;
              }
              // Save the page element if there's a page element
              else if (pageElement) {
                pagesFromPefObject[thisPageIndex] = pageElement;
              }
              // Move the page index back one page if the page element is empty
              else {
                // Use the following line for debugging to log which page index is missing
                // console.error("Page index undefined:", thisPageIndex, "Page element:", pageElement);
                pageIndex--;
              }
            }
          }
        }
      }
    }

    // Save the pages object into the pages array
    setPages(pagesFromPefObject);
    // Set the start page index
    setFirstPageIndex(firstPageIndex);
    // Set the maximum page index
    setMaxPageIndex(pageIndex - 1);
    // Set the first page as the current page if there's no saved page index    
    if (savedPageIndex == null) setSavedPageIndex(firstPageIndex);
  };


  return (
    <div className="flex flex-col pt-5 px-10 w-full">
      <button onClick={() => setReadmode(false)} className="button">
        Tillbaka till startsida
      </button>

      {cookiePermission === CookieEnum.ALLOWED && (
        <div className="mt-2 p-8 bg-slate-200 w-64 rounded-lg drop-shadow-md">
        <fieldset>
          <legend className="font-bold mb-2">Autosave</legend>
          <input type="radio"
            id="autosave-radio-on"
            name="autosave"
            className="m-1"
            value="ON"
            checked={autoSave === true}
            onChange={() => setAutoSave(true)}
          />
          <label htmlFor="autosave-radio-on">Påslagen</label>
          <input type="radio"
            id="autosave-radio-off"
            name="autosave"
            className="m-1"
            value="BRAILLE"
            checked={autoSave === false}
            onChange={() => setAutoSave(false)}
          />
          <label htmlFor="autosave-radio-off">Avslagen</label>
        </fieldset>
        </div>
      )}

      <div className="flex flex-col justify-start items-center h-screen mt-20">
        <h2 className="ml-8 text-2xl font-bold">Titel: {pefObject.metaData.titel}</h2>
        <p className="mb-5">Författare: {pefObject.metaData.skapare}</p>

        {!autoSave && cookiePermission === CookieEnum.ALLOWED &&
          <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 mt-5 mb-1 rounded relative w-full text-center" role="alert">
            <span class="block sm:inline">Om du aktiverar radioknappen för autosave, kommer din position att sparas varje gång du byter sida.
            </span>
          </div>
        }

        {cookiePermission === CookieEnum.DENIED &&
          <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 mt-5 mb-1 rounded relative w-full text-center" role="alert">
            <span class="block sm:inline">Autosave funktionen är inte tillgänglig eftersom cookies är inaktiverade.
            </span>
          </div>
        }

        <div className="p-4 flex justify-center align-center sm:p-8 border border-gray-500 rounded-md w-full">
          <div className="w-96">
            {showCurrentPage(savedPageIndex)}
          </div>
        </div>

        { /* navigator buttons */}
        <div className="flex flex-row align-center justify-around border mt-1 py-5 px-20 rounded-lg bg-slate-100 w-full">
          <button onClick={() => handleNextPageBtn()} className="button">
            Nästa sida
          </button>
          <button onClick={() => handlePreviousPageBtn()} className="button">
            Föregående sida
          </button>

          <button onClick={() => {
            handleSetCurrentPage(firstPageIndex)
          }} className="button">
            Förstasidan
          </button>

          <form onSubmit={(e) => {
            e.preventDefault();
            const pageNumber = parseInt(e.target.elements.goToPage.value, 10);
            handleSetCurrentPage(pageNumber);
          }}>
            <label htmlFor="goToPage">Ange ett sidnummer: </label>
            <input className="border rounded" id="goToPage" type="number" min={firstPageIndex} max={maxPageIndex} required />
            <button type="submit" className="button">Gå till</button>
          </form>

          <fieldset>
            <legend>Växla vy</legend>
            <div className="flex flex-row justify-center align-center">
              <input type="radio"
                id="braille-view"
                name="view"
                className="m-1"
                value="BRAILLE"
                checked={bookView === FormatModeEnum.BRAILLE_VIEW}
                onChange={() => setBookView(FormatModeEnum.BRAILLE_VIEW)}
              />
              <label htmlFor="braille-vy">Punktskrift</label>
            </div>
            <div className="flex flex-row justify-center align-center">
              <input type="radio"
                id="braille-view"
                name="view"
                className="m-1"
                value="BRAILLE"
                checked={bookView === FormatModeEnum.NORMAL_VIEW}
                onChange={() => setBookView(FormatModeEnum.NORMAL_VIEW)}
              />
              <label htmlFor="braille-vy">Svartskrift</label>
            </div>
          </fieldset>

        </div>
      </div>
    </div>
  );
}

/*
  const element = document.getElementById(pageId);

  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
    if (document.activeElement !== element) {
      element.focus();
      PositionSavedVoice()
    }
  } else {
    console.error('Error: Unable to find the specified element.')
  }
*/
