import { useState } from "react"
import UploadFile from "./upload-file.jsx"
import ReadMode from "./read-mode.jsx"

export default function Main() {

  const [pefObject, setPefObject] = useState(null)
  const [fileName, setFileName] = useState('ingen fil vald')
  const [readmode, setReadmode] = useState(false)
  
  return (
    <main className="flex flex-col justify-start items-center h-screen pt-10 pl-20 pr-20 max-w-screen-lg mx-auto">

      {!readmode ?
        <UploadFile setReadmode={setReadmode} pefObject={pefObject} setPefObject={setPefObject} fileName={fileName} setFileName={setFileName} />
        :
        <ReadMode setReadmode={setReadmode} pefObject={pefObject} />
      }
      
    </main>
  )
}