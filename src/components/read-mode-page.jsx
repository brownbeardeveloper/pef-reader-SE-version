import React, { useEffect, useState } from "react";
import useDocumentTitle from "../functions/useDocumentTile.js";
import { setLatestPagePositionToCookie } from "../functions/cookieManager.js";
import brailleTranslator from "../functions/translator/brailleTranslator.js";
import { filterUnnecessarySentence } from "../functions/filterSetences.js"
import { manipulatePageIndexToRemoveUnnecessaryPages } from "../functions/filterPages.js";
import { ViewModeEnum, CookieEnum } from '../data/enums.js'
import { PositionSavedVoice, CountineReadingVoice } from "../functions/play-voice.js";

export default function ReadModePageByPage({ savedPageIndex, setSavedPageIndex, cookiePermission, setReadmode, pefObject, jumpToPage, setJumpToPage }) {

  const [pages, setPages] = useState([]);
  const [maxPageIndex, setMaxPageIndex] = useState(0);
  const [bookView, setBookView] = useState(ViewModeEnum.BRAILLE_VIEW)

  useDocumentTitle(pefObject.metaData.titel);

  useEffect(() => {
    const calculatedPages = renderPages();
    setPages(calculatedPages);
    setMaxPageIndex(calculatedPages.length);
  }, [pefObject, savedPageIndex, bookView]);

  function showBookPage(index) {
    return pages[index];
  }

  function handleNextPageBtn() {
    if (jumpToPage < maxPageIndex - 1) {
      setJumpToPage(jumpToPage + 1);
    } else {
      alert("Fel: Det finns inga fler sidor i boken.");
    }
  }

  function handlePreviousPageBtn() {
    if (jumpToPage > 0) {
      setJumpToPage(jumpToPage - 1);
    } else {
      alert("Fel: Du kan inte gå längre bakåt i den här boken.");
    }
  }

  function handleCountineReadingBtn() {
    const pageNumber = getPageIndex(savedPageIndex)
    if (handleSetCurrentPage(pageNumber)) {
      CountineReadingVoice()
    }
  }

  function handleSetCurrentPage(index) {
    if (jumpToPage === index) {
      if (index === 0) {
        alert('Du är redan på den första sidan.')
      } else {
        alert(`Du är redan på sidan nummer ${index + 1}.`)
      }
    } else {
      setJumpToPage(index)
      return true
    }
  }

  function handleClickPage(pageIndex) {
    const pageId = `page-${pageIndex}`;
    setSavedPageIndex(pageId)

    if (cookiePermission === CookieEnum.ALLOWED) {
      setLatestPagePositionToCookie(pefObject.metaData.identifier, pageId)
    } else {
      alert("Din position har sparats, men eftersom cookies inte är tillåtna, kommer positionen inte att sparas när du lämnar sidan.")
    }

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
  }

  function renderPages() {
    const pages = [];
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
              const page = sectionPages[k]
              const thisPageIndex = pageIndex
              pageIndex++;

              const pageElement = page && (
                <div key={`${i}-${j}-${k}`} onClick={() => null}>
                  <h3 id={`page-${thisPageIndex}`}
                    className={"font-black" + ((pageIndex - 1) === savedPageIndex ? " bg-yellow-300 rounded-sm" : "")}
                    onClick={() => handleClickPage(thisPageIndex)}
                  >
                    Sida {thisPageIndex}
                  </h3>

                  {page && page.rows &&
                    page.rows.map((row, l) => (
                      <div key={`${i}-${j}-${k}-${l}`}>
                        <span>
                          {(bookView === ViewModeEnum.NORMAL_VIEW) ?
                            brailleTranslator(filterUnnecessarySentence(row))
                            :
                            filterUnnecessarySentence(row)
                          }
                        </span>
                      </div>
                    ))}
                </div>
              );
              if (pageElement) {
                pages.push(pageElement);
              }
            }
          }
        }
      }
    }
    setMaxPageIndex(pageIndex - 1) // remove the last increase
    return pages;
  };

  function getPageIndex(pageId) {
    return pageId.replace("page-", "") 
  }

  return (
    <div className="flex flex-col pt-5 px-10 w-full">
      <button onClick={() => setReadmode(false)} className="button">
        Tillbaka till startsida
      </button>

      <div className="flex flex-col justify-start items-center h-screen mt-20">
        <h2 className="ml-8 text-2xl font-bold">Titel: {pefObject.metaData.titel}</h2>
        <p className="mb-5">Författare: {pefObject.metaData.skapare}</p>

        {!savedPageIndex &&
          <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 mt-5 mb-1 rounded relative w-full text-center" role="alert">
            <span class="block sm:inline">Man kan spara läspositionen genom att klicka på textraden, vilken sedan sparas i cookies.</span>
          </div>
        }

        <div className="p-4 flex justify-center align-center sm:p-8 border border-gray-500 rounded-md w-full">
          <div className="w-96 h-full">
            {showBookPage(jumpToPage) /* this is an array */}
          </div>
        </div>

        { /* navigator buttons */}
        <div className="flex flex-row align-center justify-around border mt-1 py-5 px-20 rounded-lg bg-slate-100 w-full">
          <button onClick={handleNextPageBtn} className="button">
            Nästa sida
          </button>
          <button onClick={handlePreviousPageBtn} className="button">
            Föregående sida
          </button>

          <button onClick={handleCountineReadingBtn}
            className="button">
            Fortsätt läsa
          </button>

          <button onClick={() => {
            handleSetCurrentPage(0)
          }} className="button">
            Förstasidan
          </button>

          <form onSubmit={(e) => {
            e.preventDefault();
            const pageNumber = parseInt(e.target.elements.goToPage.value, 10);
            handleSetCurrentPage(pageNumber - 1);
          }}>
            <label htmlFor="goToPage">Ange ett sidnummer: </label>
            <input className="border rounded" id="goToPage" type="number" min="1" max={maxPageIndex} required />
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
                checked={bookView === ViewModeEnum.BRAILLE_VIEW}
                onChange={() => setBookView(ViewModeEnum.BRAILLE_VIEW)}
              />
              <label htmlFor="braille-vy">Punktskrift</label>
            </div>
            <div className="flex flex-row justify-center align-center">
              <input type="radio"
                id="braille-view"
                name="view"
                className="m-1"
                value="BRAILLE"
                checked={bookView === ViewModeEnum.NORMAL_VIEW}
                onChange={() => setBookView(ViewModeEnum.NORMAL_VIEW)}
              />
              <label htmlFor="braille-vy">Svartskrift</label>
            </div>
          </fieldset>

        </div>
      </div>
    </div>
  );
}
