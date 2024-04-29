import React, { useEffect, useState } from "react";
import useDocumentTitle from "../functions/useDocumentTile.js";
import { setLatestRowPositionToCookie } from "../functions/cookieManager.js";
import brailleTranslator from "../functions/translator/brailleTranslator.js";
import { filterUnnecessarySentence } from "../functions/filterSetences.js"
import { manipulatePageIndexToRemoveUnnecessaryPages } from "../functions/filterPages.js";

export default function ReadMode({ savedRowIndex, setSavedRowIndex, cookiePermission, setReadmode, pefObject, jumpToPage, setJumpToPage }) {

  const [pages, setPages] = useState([]);
  const [maxPageIndex, setMaxPageIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [translateText, setTranslateText] = useState(false)
  const [showOnlyNecessaryRows, setShowOnlyNecessaryRows] = useState(false)

  useDocumentTitle(pefObject.metaData.titel);

  useEffect(() => {
    const calculatedPages = renderPages();
    setPages(calculatedPages);
    setMaxPageIndex(calculatedPages.length - 1);
  }, [pefObject, savedRowIndex, translateText, showOnlyNecessaryRows]);

  function showBookPage(index) {
    return pages[index];
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

  const renderPages = () => {
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
            const pagesInSection = section.pages;
            for (let k = 0; k < pagesInSection.length; k++) {

              let nextPage = (k+1 < pagesInSection.length) ? pagesInSection[k+1] : null
              const newIndex = manipulatePageIndexToRemoveUnnecessaryPages(pagesInSection[k], k, nextPage); // remove k params later
              k += newIndex

              const page = pagesInSection[k]
              const thisPageIndex = pageIndex;
              pageIndex++;

              const pageElement = page && (
                <div key={`page-${thisPageIndex}`} onClick={() => null}>
                  <h3 id={`page-${thisPageIndex}`} className="font-black">
                    Sida {thisPageIndex}
                  </h3>

                  {page && page.rows &&
                    page.rows.map((row, l) => (
                      <div key={`row-${i}-${j}-${k}-${l}`} onClick={() => handleClickRow(i, j, k, l)}>
                        <p id={`row-${i}-${j}-${k}-${l}`}
                          className={(`row-${i}-${j}-${k}-${l}` === savedRowIndex) && "bg-yellow-300"}>

                          {showOnlyNecessaryRows ? (
                              translateText ?
                                brailleTranslator(filterUnnecessarySentence(row))
                                :
                                filterUnnecessarySentence(row)
                            ) : (
                              translateText ?
                                brailleTranslator(row)
                                :
                                row
                            )
                          }
                        </p>
                      </div>
                    ))}
                </div>
              );
              if (pageElement )pages.push(pageElement);
            }
          }
        }
      }
    }

    return pages;
  };

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


  function findPageByRowId(rowId) {
    const volumes = pefObject.bodyData.volumes;
    let pageIndex = 0

    for (let i = 0; i < volumes.length; i++) {
      const volume = volumes[i];

      if (volume.sections) {
        const sections = volume.sections;
        for (let j = 0; j < sections.length; j++) {
          const section = sections[j];

          if (section.pages) {
            const pagesInSection = section.pages;
            for (let k = 0; k < pagesInSection.length; k++) {
              const page = pagesInSection[k];

              if (page.rows) {
                const rows = page.rows;
                for (let l = 0; l < rows.length; l++) {
                  const elementKey = `row-${i}-${j}-${k}-${l}`;

                  if (elementKey === rowId) {
                    return pageIndex
                  }
                }
              }
              pageIndex++
            }
          }
        }
      }
    }
  }

  return (
    <main className="flex flex-col justify-start items-center h-screen">

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


        <button onClick={handleShowBookDetailsBtn} className="button">
          Bokdetaljer
        </button>

        <button onClick={() => setJumpToPage(findPageByRowId(savedRowIndex))}
          className="button">
          Visa den senast sparade positionen
        </button>

        <button onClick={() => handleSetCurrentPage(0)} className="button">
          Återvänd till bokens första sidan
        </button>

        <button onClick={() => setTranslateText(!translateText)} className="button">
          Växla vy
        </button>

        <button onClick={() => setReadmode(false)} className="button">
          Till startsidan
        </button>

        <button onClick={() => setShowOnlyNecessaryRows(!showOnlyNecessaryRows)} className="button">
          Hoppa över onödiga rader
        </button>
      </div>

      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          const pageIndex = parseInt(e.target.elements.goToPage.value, 10);
          setJumpToPage(pageIndex - 1);
        }}>
          <label htmlFor="goToPage">Hoppa till sida: </label>
          <input id="goToPage" type="number" min="1" max={maxPageIndex + 1} required className="border rounded" />
          <button type="submit" className="button">ENTER</button>
        </form>

      </div>
    </main>
  );
}
