import React, { useEffect, useState, useCallback } from "react";
import brailleTranslator from "../utils/translator/brailleTranslator.js";
import { filterUnnecessarySentence } from "../utils/filterSetences.js"
import { manipulatePageIndexToRemoveUnnecessaryPages } from "../utils/filterPages.js";
import { FormatModeEnum, CookieEnum } from '../data/enums.js'
import { metadataVariableTranslation } from '../data/metadataTranslator.js'
import updateBrowserTabText from "../utils/updateBrowserTabText.js";

export default function ReadModePageByPage({ savedPageIndex, setSavedPageIndex, cookiePermission, setReadmode, pefObject }) {
  const [pages, setPages] = useState([]);
  const [maxPageIndex, setMaxPageIndex] = useState(0);
  const [firstPageIndex, setFirstPageIndex] = useState(0)
  const [currentPageIndex, setCurrentPageIndex] = useState(null)
  const [bookView, setBookView] = useState(FormatModeEnum.BRAILLE_VIEW)
  const [autoSave, setAutoSave] = useState(true)

  updateBrowserTabText(pefObject.metaData.title);

  const renderPagesFromPefObject = useCallback(() => {
    const pagesFromPefObject = [];
    let firstPageIndex;
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
              k = manipulatePageIndexToRemoveUnnecessaryPages(sectionPages, k);
              const page = sectionPages[k];
              const thisPageIndex = pageIndex;
              pageIndex++;

              const pageElement = page && page.rows && (
                <div key={`${i}-${j}-${k}`}>
                  <h3 id={`page-${thisPageIndex}`} className="font-black" tabIndex={0}>
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

              if (!firstPageIndex && pageElement) {
                firstPageIndex = thisPageIndex;
                pagesFromPefObject[thisPageIndex] = pageElement;
              } else if (pageElement) {
                pagesFromPefObject[thisPageIndex] = pageElement;
              } else {
                pageIndex--;
              }
            }
          }
        }
      }
    }

    setPages(pagesFromPefObject);
    setFirstPageIndex(firstPageIndex);
    setMaxPageIndex(pageIndex - 1);
    if (savedPageIndex == null) setCurrentPageIndex(firstPageIndex);
  }, [pefObject, bookView, savedPageIndex]);

  useEffect(() => {
    renderPagesFromPefObject();
  }, [renderPagesFromPefObject]);

  useEffect(() => {
    if (currentPageIndex === null && savedPageIndex !== null) {
      setCurrentPageIndex(savedPageIndex);
    } else if (autoSave && currentPageIndex !== null) {
      setSavedPageIndex(currentPageIndex);
    }
  }, [autoSave, currentPageIndex, savedPageIndex, setSavedPageIndex]);



  function handleNextPageBtn() {
    if (currentPageIndex < maxPageIndex) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else {
      alert("Fel: Det finns inga fler sidor i boken.");
    }
  }

  function handlePreviousPageBtn() {
    if (currentPageIndex > firstPageIndex) {
      setCurrentPageIndex(currentPageIndex - 1);
    } else {
      alert("Fel: Du kan inte gå längre bakåt i den här boken.");
    }
  }

  function handleSetCurrentPage(index) {
    if (currentPageIndex === index) {
      if (index === firstPageIndex) {
        alert('Du är redan på den första sidan.')
      } else {
        alert(`Du är redan på sidan ${index}.`)
      }
    } else {
      setCurrentPageIndex(index)
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



  return (
    <div className="flex flex-col pt-5 px-10 w-full">
      <button onClick={() => setReadmode(false)} className="button mb-5">
        Tillbaka till startsida
      </button>

      {cookiePermission === CookieEnum.ALLOWED && (
        <div className={`mt-3 px-5 py-3 border w-64 rounded shadow text-white border	
        ${autoSave ? "bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-500 border-emerald-600"
            : "bg-gradient-to-br from-red-500 via-red-600 to-red-500 border-red-600"}`}>

          <fieldset>
            <legend className="font-bold mb-1">Automatisk sparning</legend>
            <div className="flex justify-start items-center">
              <input type="radio"
                id="autosave-radio-on"
                name="autosave"
                className="m-1"
                checked={autoSave === true}
                onChange={() => setAutoSave(true)}
              />
              <label htmlFor="autosave-radio-on">Aktivera sparning</label>
            </div>

            <div className="flex justify-start items-center">
              <input type="radio"
                id="autosave-radio-off"
                name="autosave"
                className="m-1"
                checked={autoSave === false}
                onChange={() => setAutoSave(false)}
              />
              <label htmlFor="autosave-radio-off">Inaktivera sparning</label>
            </div>
          </fieldset>
        </div>
      )}

      <div className="flex flex-col justify-start items-center mt-20">
        {pefObject.metaData.title && <h2 className="ml-8 text-2xl font-bold" tabIndex={0}>Titel: {pefObject.metaData.title}</h2>}
        {pefObject.metaData.author && <p className="mb-5">Författare: {pefObject.metaData.author}</p>}

        {!autoSave && cookiePermission === CookieEnum.ALLOWED &&
          <div className="bg-blue-200 border border-blue-300 text-blue-700 px-4 py-2 mt-5 mb-1 rounded relative w-full text-center" role="alert">
            <span className="block sm:inline" tabIndex={0}>Om du aktiverar automatisk sparning, kommer din position att sparas varje gång du byter sida.
            </span>
          </div>
        }

        {cookiePermission === CookieEnum.DENIED &&
          <div className="bg-yellow-200 border border-yellow-300 px-4 py-2 mt-5 mb-1 rounded relative w-full text-center" role="alert">
            <span className="block sm:inline" tabIndex={0}>Automatisk sparning är inte tillgänglig eftersom kakor är inaktiverade.
            </span>
          </div>
        }

        <div className="flex flex-col flex-nowrap justify-center align-center border border-gray-500 rounded w-full">
          <div className="w-full pt-5 pb-10 px-10">
            {showCurrentPage(currentPageIndex)}
          </div>

          { /* navigator buttons */}
          <div className="h-auto bg-red-500 rounded-b border-t-2 border-slate-400 text-md">

            <div className="flex flex-row flex-nowrap items-center h-20 overflow-hidden border-b border-slate-400">
              <button onClick={() => handleNextPageBtn()} className="h-full w-full px-2
              bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 
              hover:from-emerald-400 hover:to-emerald-700 hover:text-white
              focus:from-emerald-400 focus:to-emerald-700 focus:text-white">
                Nästa sida
              </button>
              <button onClick={() => handlePreviousPageBtn()} className="h-full w-full px-2
              bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 border-x-2  
              hover:from-emerald-400 hover:to-emerald-700 hover:text-white
              focus:from-emerald-400 focus:to-emerald-700 focus:text-white">
                Föregående sida
              </button>
              <button onClick={() => handleSetCurrentPage(firstPageIndex)} className="h-full w-full px-2
              bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200  
              hover:from-emerald-400 hover:to-emerald-700 hover:text-white
              focus:from-emerald-400 focus:to-emerald-700 focus:text-white">
                Förstasidan
              </button>

            </div>

            <div className="flex flex-row flex-nowrap items-center w-full h-32 overflow-hidden rounded-b">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const pageNumber = parseInt(e.target.elements.goToPage.value, 10);
                  handleSetCurrentPage(pageNumber);
                }}
                className="flex flex-row h-full w-full items-center justify-center flex-grow 
                bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 border-r-2 border-slate-200"
              >
                <div className="flex flex-col items-center justify-center h-full w-full mx-4">
                  <label htmlFor="goToPage" className="w-full font-medium mb-1">Ange ett sidnummer:</label>
                  <div className="flex flex-row w-full">
                    <input className="border-y border-l border-slate-400 w-full max-w-56" id="goToPage" type="number" min={firstPageIndex} max={maxPageIndex} required />
                    <button
                      type="submit"
                      className="px-2 h-full w-1/3 min-w-16 max-w-32 border border-slate-400 
                      bg-gradient-to-b from-slate-300 via-slate-200 to-slate-300 
                      hover:from-emerald-400 hover:to-emerald-700 hover:text-white 
                      focus:from-emerald-400 focus:to-emerald-700 focus:text-white"
                    >
                      Gå till
                    </button>
                  </div>
                </div>
              </form>

              <div className="p-1 flex flex-col justify-center items-center h-full w-60 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200">
                <fieldset>
                  <legend className="font-medium mb-px">Växla vy:</legend>
                  <div className="flex flex-row justify-center items-center">
                    <input
                      type="radio"
                      id="braille-view"
                      name="view"
                      className="m-1"
                      value="BRAILLE"
                      checked={bookView === FormatModeEnum.BRAILLE_VIEW}
                      onChange={() => setBookView(FormatModeEnum.BRAILLE_VIEW)}
                    />
                    <label htmlFor="braille-view">Punktskrift</label>
                  </div>
                  <div className="flex flex-row justify-center items-center">
                    <input
                      type="radio"
                      id="normal-view"
                      name="view"
                      className="m-1"
                      value="BRAILLE"
                      checked={bookView === FormatModeEnum.NORMAL_VIEW}
                      onChange={() => setBookView(FormatModeEnum.NORMAL_VIEW)}
                    />
                    <label htmlFor="normal-view">Svartskrift</label>
                  </div>
                </fieldset>
              </div>
            </div>

          </div>

        </div>

        <div className="flex flex-col bg-slate-50 rounded my-20 pt-5 pb-20 px-10 w-full border shadow">
          <h3 className="font-bold text-lg mb-3" tabIndex={0}>Grundläggande bibliografisk information</h3>

          {/* Render metadata labels */}
          {pefObject.metaData && pefObject.metaData.language &&
            Object.entries(pefObject.metaData)
              .map(([key, value]) => {
                return value && metadataVariableTranslation(key, pefObject.metaData.language) && (
                  <label key={key}>
                    <strong>{metadataVariableTranslation(key, pefObject.metaData.language)}:</strong> {value}
                  </label>
                );
              })
          }

          {/* Render number of pages in the application */}
          {maxPageIndex &&
            <label>
              <strong>Antal sidor i applikationen:</strong> {maxPageIndex}
            </label>
          }
        </div>
      </div>

    </div >
  );
}