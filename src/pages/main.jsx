import { useEffect, useState } from "react";
import UploadFile from "../components/upload-file.jsx";
import ReadModeFlow from "../components/read-mode-flow.jsx";
import ReadModePage from "../components/read-mode-page.jsx";
import { UnitModeEnum, CookieEnum } from "../data/enums.js";
import { useNavigate } from "react-router-dom";
import { setLatestPageIndexToCookie, getLatestPageIndexFromCookieInt } from "../functions/cookieManager.js";

export default function Main({ cookiePermission }) {
  const [pefObject, setPefObject] = useState(null);
  const [fileName, setFileName] = useState('ingen fil vald');
  const [viewMode, setViewMode] = useState(false);
  const [howToRead, setHowToRead] = useState(UnitModeEnum.ONE_FLOW);
  const [savedPageIndex, setSavedPageIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookiePermission) {
      // Navigate to instruction page for first-time users if there's no cookie
      return navigate('/instruktion');
    }
  }, [cookiePermission, navigate]);

  useEffect(() => {
    // If the user has recently uploaded a file and has allowed cookies, retrieve the latest position from the cookie
    if (cookiePermission === CookieEnum.ALLOWED && savedPageIndex === null && pefObject) {
      const latestPageIndex = getLatestPageIndexFromCookieInt(pefObject.metaData.identifier);
      setSavedPageIndex(latestPageIndex);
    }
    // If the user has allowed cookies, savedPageIndex isn't null, and a pef file is uploaded, 
    // save the current position to the cookie when state changes
    else if (cookiePermission === CookieEnum.ALLOWED && savedPageIndex && pefObject) {
      setLatestPageIndexToCookie(pefObject.metaData.identifier, savedPageIndex);
    }
    // IMPORTANT: Otherwise, set the savedPageIndex to the index of the first page in the read-mode components
  }, [cookiePermission, savedPageIndex, pefObject]);

  return (
    <main id="MainContentArea" className="flex flex-col justify-start items-start max-w-screen-xl mx-auto pb-20">
      {!viewMode ? (
        <UploadFile
          cookiePermission={cookiePermission}
          setReadmode={setViewMode}
          pefObject={pefObject}
          setPefObject={setPefObject}
          fileName={fileName}
          setFileName={setFileName}
          howToRead={howToRead}
          setHowToRead={setHowToRead}
          setSavedPageIndex={setSavedPageIndex}
        />
      ) : (
        <>
          {howToRead === UnitModeEnum.ONE_FLOW ? (
            <ReadModeFlow
              cookiePermission={cookiePermission}
              setReadmode={setViewMode}
              pefObject={pefObject}
              setHowToRead={setHowToRead}
              currentPageIndex={savedPageIndex}
              setCurrentPageIndex={setSavedPageIndex}
            />
          ) : (
            <ReadModePage
              cookiePermission={cookiePermission}
              setHowToRead={setHowToRead}
              setReadmode={setViewMode}
              savedPageIndex={savedPageIndex}
              setSavedPageIndex={setSavedPageIndex}
              pefObject={pefObject}
            />
          )}
        </>
      )}
    </main>
  );
}
