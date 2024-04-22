import React, { useEffect, useState } from "react";
import useDocumentTitle from "../functions/useDocumentTile.js";
import { setLatestRowPositionToCookie } from "../functions/cookieManager.js";

export default function ReadMode({ savedRowIndex, setSavedRowIndex, cookiePermission, setReadmode, pefObject }) {

  const [pages, setPages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [maxPageIndex, setMaxPageIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useDocumentTitle(pefObject.metaData.titel);

  useEffect(() => {
    const calculatedPages = renderPages();
    setPages(calculatedPages);
    setMaxPageIndex(calculatedPages.length - 1);
  }, [pefObject, savedRowIndex]);

  function showBookPage(index) {
    return pages[index];
  }

  function handleNextPage() {
    if (currentPageIndex < maxPageIndex) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else {
      alert("Fel: Det finns inga fler sidor i boken.");
    }
  }

  function handlePreviousPage() {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    } else {
      alert("Fel: Du kan inte gå längre bakåt i den här boken.");
    }
  }

  function handleSetCurrentPage(index) {
    if (currentPageIndex === index) {
      if (index === 0) {
        alert('Du är redan på den första sidan.')
      } else {
        alert(`Du är redan på sidan nummer ${index}.`)
        }
    } else {
      setCurrentPageIndex(index)
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
              const page = pagesInSection[k];
              const thisPageIndex = pageIndex;
              pageIndex++;

              const pageElement = (
                <div key={`page-${thisPageIndex}`} onClick={() => null}>
                  <h3 id={`page-${thisPageIndex}`} className="font-black">
                    Sida {thisPageIndex}
                  </h3>
                  {page.rows &&
                    page.rows.map((row, l) => (
                      <div key={`row-${i}-${j}-${k}-${l}`} onClick={() => handleClickRow(i, j, k, l)}>
                        <p id={`row-${i}-${j}-${k}-${l}`}
                        className={(`row-${i}-${j}-${k}-${l}` === savedRowIndex) ? "bg-yellow-300" : ""}>{row}</p>
                      </div>
                    ))}
                </div>
              );
              pages.push(pageElement);
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
          {showBookPage(currentPageIndex)}
        </div>

        <div className="flex flex-row m-2">
          <button onClick={handleNextPage} className="bg-purple-300 border border-purple-600 m-2 px-6 py-2 rounded-md uppercase font-bold shadow-xl transition duration-200 hover:bg-white hover:shadow-2xl">
            Nästa sida
          </button>
          <button onClick={handlePreviousPage} className="bg-purple-300 border border-purple-600 m-2 px-6 py-2 rounded-md uppercase font-bold shadow-xl transition duration-200 hover:bg-white hover:shadow-2xl">
            Föregående sida
          </button>
        </div>
      </div>

      <div className="flex flex-row m-2">
        <button onClick={handleShowBookDetailsBtn} className="bg-purple-400 border border-purple-600 m-2 px-6 py-2 rounded-md uppercase font-bold shadow-xl transition duration-200 hover:bg-white hover:shadow-2xl">
          Bokdetaljer
        </button>

        <button onClick={() => setCurrentPageIndex(findPageByRowId(savedRowIndex))}
          className="w-full bg-purple-400 border border-purple-600 m-2 px-6 py-2 rounded-md uppercase font-bold shadow-xl 
              transition duration-200 hover:bg-white hover:shadow-2xl">
          Visa den senast sparade positionen
        </button>

        <button onClick={() => handleSetCurrentPage(0)} className="bg-purple-400 border border-purple-600 m-2 px-6 py-2 rounded-md uppercase font-bold shadow-xl transition duration-200 hover:bg-white hover:shadow-2xl">
          Återvänd till bokens första sidan
        </button>
        <button onClick={() => setReadmode(false)} className="bg-purple-400 border border-purple-600 m-2 px-6 py-2 rounded-md uppercase font-bold shadow-xl transition duration-200 hover:bg-white hover:shadow-2xl">
          Till startsidan
        </button>
      </div>

      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          const pageIndex = parseInt(e.target.elements.goToPage.value, 10);
          setCurrentPageIndex(pageIndex - 1);
        }}>
          <label htmlFor="goToPage">Hoppa till sida: </label>
          <input id="goToPage" type="number" min="1" max={maxPageIndex + 1} required />
          <button type="submit" className="bg-yellow-400 border border-yellow-600 m-1 px-2 py-1 rounded-md uppercase font-bold shadow-xl transition duration-200 hover:bg-yellow-500 hover:shadow-2xl">ENTER</button>
        </form>

      </div>
    </main>
  );
}
