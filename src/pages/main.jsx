import { useState } from "react";
import UploadFile from "../components/upload-file.jsx";
import ReadModeFlow from "../components/read-mode-flow.jsx";
import ReadModePage from "../components/read-mode-page.jsx";
// import Instruction from "./instructor.jsx";
import { ViewModeEnum } from "../data/enums.js";

export default function Main({ cookiePermission }) {
  const [pefObject, setPefObject] = useState(null);
  const [fileName, setFileName] = useState('ingen fil vald');
  const [viewMode, setViewMode] = useState(false);
  const [howToRead, setHowToRead] = useState(ViewModeEnum.ONE_FLOW);
  const [savedRowIndex, setSavedRowIndex] = useState(null);
  const [jumpToPage, setJumpToPage] = useState(0)

  return (
    <main className="flex flex-col justify-start items-center h-screen pt-10 pl-20 pr-20 max-w-screen-lg mx-auto">
      {!viewMode ? (
        <>
          <UploadFile
            cookiePermission={cookiePermission}
            setReadmode={setViewMode}
            pefObject={pefObject}
            setPefObject={setPefObject}
            fileName={fileName}
            setFileName={setFileName}
            howToRead={howToRead}
            setHowToRead={setHowToRead}
            setSavedRowIndex={setSavedRowIndex}
            jumpToPage={jumpToPage}
            setJumpToPage={setJumpToPage}
          />
        </>
      ) : (
        <>
          {howToRead === ViewModeEnum.ONE_FLOW ? (
            <ReadModeFlow
              cookiePermission={cookiePermission}
              setReadmode={setViewMode}
              pefObject={pefObject}
              setHowToRead={setHowToRead}
              savedRowIndex={savedRowIndex}
              setSavedRowIndex={setSavedRowIndex}
            />
          ) : (
            <ReadModePage
              cookiePermission={cookiePermission}
              setHowToRead={setHowToRead}
              setReadmode={setViewMode}
              savedRowIndex={savedRowIndex}
              setSavedRowIndex={setSavedRowIndex}
              pefObject={pefObject}
              jumpToPage={jumpToPage}
              setJumpToPage={setJumpToPage}
            />
          )}
        </>
      )}
    </main>
  );
}
