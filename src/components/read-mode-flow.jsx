import { useEffect, useState } from "react";
import useDocumentTitle from "../functions/useDocumentTile.js";
import { setLatestRowPositionToCookie } from "../functions/cookieManager.js";
import brailleTranslator from "../functions/translator/brailleTranslator.js";
import { filterUnnecessarySentence } from "../functions/filterSetences.js"
import { manipulatePageIndexToRemoveUnnecessaryPages } from "../functions/filterPages.js";
import { ViewModeEnum, CookieEnum } from "../data/enums.js";

export default function ReadMode({ cookiePermission, savedRowIndex, setSavedRowIndex, setReadmode, pefObject }) {

  const [bookView, setBookView] = useState(ViewModeEnum.BRAILLE_VIEW)
  const [startPageIndex, setStartPageIndex] = useState(1)
  let maxPageIndex

  useDocumentTitle(pefObject.metaData.titel)

  useEffect(() => {
    const firstPageIndex = findFirstPage()
    if(firstPageIndex !== undefined) setStartPageIndex(firstPageIndex)
  }, []); 

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

    if (cookiePermission === CookieEnum.ALLOWED) {
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
      alert(`Sidan '${index}' kunde inte hittas.`);
    }
  }

  function findFirstPage() {
    for (let index = 1; index < maxPageIndex; index++) {
      const pageId = `page-${index}`
      const element = document.getElementById(pageId)
      
      if(element) { return index }
    }
    alert('Ingen första sida kunde hittades.')
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
            const sectionPages = section.pages;
            for (let k = 0; k < sectionPages.length; k++) {

              k = manipulatePageIndexToRemoveUnnecessaryPages(sectionPages, k);
              const page = sectionPages[k]
              const thisPageIndex = pageIndex;
              pageIndex++;

              const pageElement = page && (
                <div key={`page-${thisPageIndex}`} onClick={() => null}>
                  <h3 id={`page-${thisPageIndex}`} className="font-black">
                    Sida {thisPageIndex}
                  </h3>

                  {page && page.rows &&
                    <div className="flex flex-wrap">

                      {page.rows.map((row, l) => (
                        <span key={`row-${i}-${j}-${k}-${l}`} id={`row-${i}-${j}-${k}-${l}`} onClick={() => handleClickRow(i, j, k, l)}
                          className={(`row-${i}-${j}-${k}-${l}` === savedRowIndex) ? "bg-yellow-300 rounded-sm" : ""}>
                          {(bookView === ViewModeEnum.NORMAL_VIEW) ?
                            brailleTranslator(filterUnnecessarySentence(row))
                            :
                            filterUnnecessarySentence(row)
                          }
                          {<span>&nbsp;</span> /* fix this issue later */} 
                        </span>
                      ))}
                    </div>
                  }
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
    maxPageIndex = pageIndex -1 // remove the last increase
    return pages;
  };

  return (
    <div className="flex flex-col pt-5 px-10 w-full">
      <button onClick={() => setReadmode(false)} className="button">
        Tillbaka till startsida
      </button>

      <div className="flex flex-col justify-start items-center mt-20">
        <h2 className="ml-8 text-2xl font-bold">Titel: {pefObject.metaData.titel}</h2>
        <p>Författare: {pefObject.metaData.skapare}</p>

        {!savedRowIndex &&
          <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 mt-5 mb-1 rounded relative w-full text-center" role="alert">
            <span class="block sm:inline">Man kan spara läspositionen genom att klicka på textraden, vilken sedan sparas i cookies.</span>
          </div>
        }

        <div className="p-4 flex justify-center align-center sm:p-8 border border-gray-500 rounded-md w-full">
          <div className="w-full overflow-y-auto h-96">
            {renderPages()}
          </div>
        </div>

        { /* nauigator buttons */}
        <div className="flex flex-row align-center justify-around border mt-1 py-5 px-20 rounded-lg bg-slate-100 w-full">
          <button onClick={handleShowLatestSavedPositionBtn}
            className="button">
            Fortsätt läsa
          </button>
          <button onClick={() => {
            handleScrollToPageIndex(findFirstPage())
          }} className="button">
            Förstasidan
          </button>
          <form onSubmit={(e) => {
            e.preventDefault();
            const pageNumber = parseInt(e.target.elements.goToPage.value, 10);
            handleScrollToPageIndex(pageNumber);
          }}>
            <label htmlFor="goToPage">Ange ett sidnummer: </label>
            <input className="border rounded" id="goToPage" type="number" min={startPageIndex} max={maxPageIndex} required />
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

        <div className="flex flex-col bg-slate-200 rounded-lg mt-20 p-10 w-full border">
          <p className="font-bold"><strong>Bokens metadata:</strong></p>
          {pefObject.metaData &&
            Object.entries(pefObject.metaData)
              .map(([key, value]) => value != null && <label key={key}><strong>{key}:</strong> {value}</label>)
          }
        </div>
      </div>
    </div>
  )
}