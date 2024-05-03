import React, { useEffect, useState } from "react";
import useDocumentTitle from "../functions/useDocumentTile.js";
import { setLatestRowPositionToCookie } from "../functions/cookieManager.js";
import brailleTranslator from "../functions/translator/brailleTranslator.js";
import { filterUnnecessarySentence } from "../functions/filterSetences.js"
import { manipulatePageIndexToRemoveUnnecessaryPages } from "../functions/filterPages.js";
import { ViewModeEnum } from '../data/enums.js'

export default function ReadMode({ savedRowIndex, setSavedRowIndex, cookiePermission, setReadmode, pefObject, jumpToPage, setJumpToPage }) {

  const [pages, setPages] = useState([]);
  const [maxPageIndex, setMaxPageIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [bookView, setBookView] = useState(ViewModeEnum.BRAILLE_VIEW)
  const [showOnlyNecessaryRows, setShowOnlyNecessaryRows] = useState(false)

  useDocumentTitle(pefObject.metaData.titel);

  useEffect(() => {
    const calculatedPages = renderPages();
    setPages(calculatedPages);
    setMaxPageIndex(calculatedPages.length - 1);
  }, [pefObject, savedRowIndex, bookView, showOnlyNecessaryRows]);

  function showBookPage(index) {
    return pages[index];
  }

  function handleShowBookDetailsBtn() {
    setShowDetails(!showDetails);
    if (pefObject.metaData) {
      alert(
        Object.entries(pefObject.metaData)
          .map(([key, value]) => value && `${key}: ${value}`)
          .filter(Boolean)
          .join('\n')
      );
    } else {
      alert("Bokens detaljer kunde inte hittas");
    }
  }

  function handleNextPage() {
    if (jumpToPage < maxPageIndex) {
      setJumpToPage(jumpToPage + 1);
    } else {
      alert("Fel: Det finns inga fler sidor i boken.");
    }
  }

  function handlePreviousPage() {
    if (jumpToPage > 0) {
      setJumpToPage(jumpToPage - 1);
    } else {
      alert("Fel: Du kan inte gå längre bakåt i den här boken.");
    }
  }

  function handleSetCurrentPage(index) {
    if (jumpToPage === index) {
      if (index === 0) {
        alert('Du är redan på den första sidan.')
      } else {
        alert(`Du är redan på sidan nummer ${index}.`)
      }
    } else {
      setJumpToPage(index)
    }
  }

  function handleClickRow(i, j, k, l) {

    const rowId = `row-${i}-${j}-${k}-${l}`;
    setSavedRowIndex(rowId)

    if (cookiePermission === "allowed") {
      setLatestRowPositionToCookie(pefObject.metaData.identifier, rowId)
    } else {
      alert("Din position har sparats, men eftersom cookies inte är tillåtna, kommer positionen inte att sparas när du lämnar sidan.")
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
              const thisPageIndex = pageIndex + 1;
              pageIndex++;

              const pageElement = page && (
                <div key={`page-${thisPageIndex}`} onClick={() => null}>
                  <h3 id={`page-${thisPageIndex}`} className="font-black">
                    Sida {thisPageIndex}
                  </h3>

                  {page && page.rows &&
                    page.rows.map((row, l) => (
                      <div>
                        <span
                          id={`row-${i}-${j}-${k}-${l}`}
                          // key={`row-${i}-${j}-${k}-${l}`} 
                          onClick={() => handleClickRow(i, j, k, l)}
                          className={(`row-${i}-${j}-${k}-${l}` === savedRowIndex) && "bg-yellow-300"}>

                          {showOnlyNecessaryRows ? (
                            (bookView === ViewModeEnum.NORMAL_VIEW) ?
                              brailleTranslator(filterUnnecessarySentence(row))
                              :
                              filterUnnecessarySentence(row)
                          ) : (
                            (bookView === ViewModeEnum.NORMAL_VIEW) ?
                              brailleTranslator(row)
                              :
                              row
                          )
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
    setMaxPageIndex(pageIndex)
    return pages;
  };

  function findPageByRowId(rowId) {

    let pageIndex
    let rowFound = false;

    /* pages[] contain both page and rows data */
    for (let [value, key] of pages.entries()) {
      key.props.children.forEach(element => {

        if (!rowFound && Array.isArray(element)) { // Retrieve only the rows
          element.forEach(row => {
            if (!rowFound && String(row.key) === rowId) {
              pageIndex = value;
              rowFound = true;
            }
          });
        }
      });

      if (rowFound) { // break 
        break;
      }
    }
    return pageIndex
  }

  return (
    <div className="">
      <button onClick={() => setReadmode(false)} className="button">
        Tillbaka till startsida
      </button>

      <div className="flex flex-col justify-start items-center h-screen">
        <h2 className="ml-8 text-2xl font-bold">Bokens titel: example</h2>

        <button onClick={() => {
          setJumpToPage(findPageByRowId(savedRowIndex))
        }}
          className="button">
          Fortsätt läsa
        </button>

        <div className="p-4 flex justify-center align-center sm:p-8 border border-gray-500 rounded-md w-full">
          <div className="w-96 h-full">
            {showBookPage(jumpToPage)}
          </div>
        </div>

        <div className="flex flex-row m-2">
          <div className="flex flex-col">
            <button onClick={handleNextPage} className="button">
              Nästa sida
            </button>
            <button onClick={handlePreviousPage} className="button">
              Föregående sida
            </button>
          </div>

          <button onClick={() => handleSetCurrentPage(0)} className="button">
            Förstasidan
          </button>

          <div className="flex flex-col align-center justify-center">
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

        <div>
          <form onSubmit={(e) => {
            e.preventDefault();
            const pageIndex = parseInt(e.target.elements.goToPage.value, 10);
            setJumpToPage(pageIndex - 1);
          }}>
            {/* # add <p>the current page number: {currentPageNumber}</p> */}
            <label htmlFor="goToPage">Ange ett sidnummer: </label>
            <input id="goToPage" type="number" min="1" max={maxPageIndex + 1} required className="border rounded" />
            <button type="submit" className="button">Gå till</button>
          </form>

        </div>
      </div>

      { /* remove this later  */}
      <button onClick={() => setShowOnlyNecessaryRows(!showOnlyNecessaryRows)} className="button">
        Hoppa över tomma rader
      </button>

    </div>
  );
}
