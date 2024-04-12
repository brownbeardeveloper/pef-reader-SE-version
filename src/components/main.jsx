import { useState } from "react"
import UploadFile from "./upload-file.jsx"
import ReadMode from "./read-mode.jsx"
import { ViewModeEnum } from "../data/enums.js"

export default function Main() {

  const [pefObject, setPefObject] = useState(null)
  const [fileName, setFileName] = useState('ingen fil vald')
  const [viewMode, setViewMode] = useState(false)
  const [howToRead, setHowToRead] = useState(ViewModeEnum.ONE_FLOW)
  const [cookie, setCookie] = useState(null)

  return (
    <main className="flex flex-col justify-start items-center h-screen pt-10 pl-20 pr-20 max-w-screen-lg mx-auto">

      {!viewMode ?
        <UploadFile
          setCookie={setCookie}
          setReadmode={setViewMode}
          pefObject={pefObject}
          setPefObject={setPefObject}
          fileName={fileName}
          setFileName={setFileName}
          howToRead={howToRead}
          setHowToRead={setHowToRead} />
        :
        <ReadMode
          cookie={cookie}
          setCookie={setCookie}
          setReadmode={setViewMode}
          pefObject={pefObject}
          howToRead={howToRead}
          setHowToRead={setHowToRead} />
      }

    </main>
  )
}