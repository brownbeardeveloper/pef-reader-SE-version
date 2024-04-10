import React, { useState } from "react";
import useDocumentTitle from "../functions/useDocumentTile";

export default function ReadMode({ setReadmode, pefObject }) {

  const [currentPage, setCurrentPage] = useState(0)
  const lastpage = 5

  useDocumentTitle('👾 we aliens are taking over the planet')

  function handleNextPage() {
    if(currentPage < lastpage) {
      setCurrentPage(currentPage + 1)
    } else {
      alert('Fel: Det finns inga fler sidor i boken.')
    }
  }

  function handlePreviousPage() {
    if(currentPage > 0) {
      setCurrentPage(currentPage - 1)
    } else {
      alert('Fel: Du kan inte gå längre bakåt i den här boken.')
    }
  }

  function handleBackToStartPage() {
    setReadmode(false);
  }

  function handleReset() { /* If needed */
    setCurrentPage(0)
  }

  function handleSetCurrentPage(index) {
    setCurrentPage(index)
  }

  return (
    <main className="flex flex-col justify-start items-center h-screen pt-10 pl-20 pr-20 max-w-screen-lg mx-auto">

      <div className="p-6 m-10 border border-gray-500 w-4/5">
        {/* Print out all metadata properties */}
        <div>
          {Object.entries(pefObject.metaData).map(([key, value]) => (
            value && (
              <p key={key}><strong>{key}: </strong>{value}</p>
            )
          ))}
        </div>
      </div>

      <button onClick={handleNextPage} className="bg-purple-300 border border-purple-600 m-2 px-6 py-2 rounded-full uppercase font-bold shadow-xl 
        transition duration-200 hover:bg-white hover:shadow-2xl" >Nästa sida</button>

      <button onClick={handlePreviousPage} className="bg-purple-300 border border-purple-600 px-6 m-2 py-2 rounded-full uppercase font-bold shadow-xl 
        transition duration-200 hover:bg-white hover:shadow-2xl" >Föregående sida</button>

      <button onClick={handleBackToStartPage} className="bg-purple-300 border border-purple-600 m-2 px-6 py-2 rounded-full uppercase font-bold shadow-xl 
        transition duration-200 hover:bg-white hover:shadow-2xl" >Till startsida</button>
    </main>
  );
}
