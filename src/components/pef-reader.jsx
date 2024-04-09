import { useState } from "react"
import StartPage from "./start-page.jsx"
import PrintOutBook from "./printout-book.jsx"

export default function PefReader() {

  const [pefObject, setPefObject] = useState(null)
  const [readmode, setReadmode] = useState(false)

  return (
    <main className="flex flex-col justify-start items-center h-screen pt-10 pl-20 pr-20 max-w-screen-lg mx-auto">

      {!readmode ?
        <StartPage setReadmode={setReadmode} setPefObject={setPefObject} />
        :
        <PrintOutBook pefObject={pefObject} />
      }
      
    </main>
  )
}