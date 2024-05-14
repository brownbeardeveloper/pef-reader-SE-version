import { useEffect, useState } from "react";
import UploadFile from "../components/upload-file.jsx";
import ReadModeFlow from "../components/read-mode-flow.jsx";
import ReadModePage from "../components/read-mode-page.jsx";
import { ViewModeEnum } from "../data/enums.js";
import { useNavigate } from "react-router-dom";

export default function Main({ cookiePermission }) {
  const [pefObject, setPefObject] = useState(null);
  const [fileName, setFileName] = useState('ingen fil vald');
  const [viewMode, setViewMode] = useState(false);
  const [howToRead, setHowToRead] = useState(ViewModeEnum.ONE_FLOW);
  const [savedPageIndex, setSavedPageIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookiePermission) {
      // Navigate to instruction page for first-time users
      return navigate('/instruktion');
    }
  }, [cookiePermission, navigate]);

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
            setSavedRowIndex={setSavedPageIndex}
          />
      ) : (
        <>
          {howToRead === ViewModeEnum.ONE_FLOW ? (
            <ReadModeFlow
              cookiePermission={cookiePermission}
              setReadmode={setViewMode}
              pefObject={pefObject}
              setHowToRead={setHowToRead}
              savedPageIndex={savedPageIndex}
              setSavedPageIndex={setSavedPageIndex}
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
