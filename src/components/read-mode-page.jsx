import React, { useEffect, useState, useCallback } from "react";
import brailleTranslator from "../functions/translator/brailleTranslator.js";
import { filterUnnecessarySentence } from "../functions/filterSetences.js"
import { manipulatePageIndexToRemoveUnnecessaryPages } from "../functions/filterPages.js";
import { FormatModeEnum, CookieEnum } from '../data/enums.js'
import { metadataVariableTranslation } from '../data/metadata-translator.js'
import updateBrowserTabText from "../functions/updateBrowserTabText.js";

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
      <button onClick={() => setReadmode(false)} className="button">
        Tillbaka till startsida
      </button>

      {cookiePermission === CookieEnum.ALLOWED && (
        <div className="mt-3 p-5 bg-orange-50 border border-yellow-500 w-64 rounded-lg drop-shadow-lg">

          <fieldset>
            <legend className="font-bold my-2">Automatisk sparning</legend>
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
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 mt-5 mb-1 rounded relative w-full text-center" role="alert">
            <span className="block sm:inline" tabIndex={0}>Om du aktiverar radioknappen för autosave, kommer din position att sparas varje gång du byter sida.
            </span>
          </div>
        }

        {cookiePermission === CookieEnum.DENIED &&
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 mt-5 mb-1 rounded relative w-full text-center" role="alert">
            <span className="block sm:inline" tabIndex={0}>Autosave funktionen är inte tillgänglig eftersom cookies är inaktiverade.
            </span>
          </div>
        }

        <div className="p-4 flex justify-center align-center sm:p-8 border border-gray-500 rounded-md w-full">
          <div className="w-96">
            {showCurrentPage(currentPageIndex)}
          </div>
        </div>

        { /* navigator buttons */}
        <div className="flex flex-row flex-wrap justify-center items-center mt-1 w-full">
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
          }}
            className="p-1 border bg-slate-50 shadow-md rounded-lg flex flex-row"
          >
            <div className="flex flex-col">
              <label htmlFor="goToPage" className="">Ange ett sidnummer: </label>
              <input className="border rounded" id="goToPage" type="number" min={firstPageIndex} max={maxPageIndex} required />
            </div>
            <button type="submit" className="button">Gå till</button>
          </form>

          <div className="p-1 px-5 flex flex-col justify-center align-center border bg-slate-50 shadow-md rounded-lg">
            <fieldset className="m-2">
              <legend className="font-semibold">Växla vy</legend>
              <div className="flex flex-row justify-center align-center">
                <input type="radio"
                  id="braille-view"
                  name="view"
                  className="m-1"
                  value="BRAILLE"
                  checked={bookView === FormatModeEnum.BRAILLE_VIEW}
                  onChange={() => setBookView(FormatModeEnum.BRAILLE_VIEW)}
                />
                <label htmlFor="braille-view">Punktskrift</label>
              </div>
              <div className="flex flex-row justify-center align-center">
                <input type="radio"
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

        <div className="flex flex-col bg-slate-200 rounded-lg my-20 p-10 w-full border">
          <h3 className="font-bold text-lg my-2" tabIndex={0}>Grundläggande bibliografisk information</h3>

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

    </div>
  );
}