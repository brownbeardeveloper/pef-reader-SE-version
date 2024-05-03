import { useState } from "react";
import useDocumentTitle from "../functions/useDocumentTile.js";
import { setLatestRowPositionToCookie } from "../functions/cookieManager.js";
import brailleTranslator from "../functions/translator/brailleTranslator.js";
import { filterUnnecessarySentence } from "../functions/filterSetences.js"
import { manipulatePageIndexToRemoveUnnecessaryPages } from "../functions/filterPages.js";
import { ViewModeEnum } from "../data/enums.js";

export default function ReadMode({ cookiePermission, savedRowIndex, setSavedRowIndex, setReadmode, pefObject }) {

  const [bookView, setBookView] = useState(ViewModeEnum.BRAILLE_VIEW)
  const [showDetails, setShowDetails] = useState(false);
  let maxPageIndex

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
              const thisPageIndex = pageIndex + 1;
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
                          className={(`row-${i}-${j}-${k}-${l}` === savedRowIndex) && "bg-yellow-300"}>
                          {(bookView === ViewModeEnum.NORMAL_VIEW) ?
                            brailleTranslator(filterUnnecessarySentence(row))
                            :
                            filterUnnecessarySentence(row)
                          }
                          {<span>&nbsp;</span>}
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
    maxPageIndex = pageIndex
    return pages;
  };

  return (
    <div className="">

      <button onClick={() => setReadmode(false)} className="button">
        Tillbaka till startsida
      </button>

      <div className="flex flex-col justify-start items-center h-screen">

        <h2 className="ml-8 text-2xl font-bold">Bokens titel: example</h2>

        {savedRowIndex ?
          <button onClick={handleShowLatestSavedPositionBtn}
            className="button">
            Fortsätt läsa
          </button>
          :
          <p class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 mb-1 rounded relative" role="alert">
            <span class="block sm:inline">Man kan spara läspositionen genom att klicka på textraden, vilken sedan sparas i cookies.</span>
          </p>
        }

        <div className="p-4 flex justify-center align-center sm:p-8 border border-gray-500 rounded-md w-full">
          <div className="w-full overflow-y-auto h-96">
            {renderPages()}
          </div>
        </div>

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


        <div className="flex flex-row m-2">
          <button onClick={() => handleScrollToPageIndex(1)} className="button">
            Förstasidan
          </button>
        </div>

        <div>
          <form onSubmit={(e) => {
            e.preventDefault();
            const pageNumber = parseInt(e.target.elements.goToPage.value, 10);
            handleScrollToPageIndex(pageNumber);
          }}>
            <label htmlFor="goToPage">Ange ett sidnummer: </label>
            <input className="border rounded" id="goToPage" type="number" min="1" max={maxPageIndex - 1} required />
            <button type="submit" className="button">Gå till</button>
          </form>
        </div>
      </div>

    </div>
  )
}