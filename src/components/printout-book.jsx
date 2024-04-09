import React from "react"

export default function PrintOutBook({ setReadmode, pefObject }) {

  console.log(pefObject)

  const { metaData } = pefObject
  console.log(metaData)

  function handleNextPage() {

  }

  function handlePreviousPage() {

  }

  function handleBackToStartPage() {
    setReadmode(false)
  }

  return (
    <main className="flex flex-col justify-start items-center h-screen pt-10 pl-20 pr-20 max-w-screen-lg mx-auto">

      <div class="p-6 m-10 border border-gray-500 w-4/5">
        {"test"}
      </div>


      <button onClick={handleNextPage} className="bg-purple-300 border border-purple-600 m-2 px-6 py-2 rounded-full uppercase font-bold shadow-xl 
        transition duration-200 hover:bg-white hover:shadow-2xl" >Nästa sida</button>

      <button onClick={handlePreviousPage} className="bg-purple-300 border border-purple-600 px-6 m-2 py-2 rounded-full uppercase font-bold shadow-xl 
        transition duration-200 hover:bg-white hover:shadow-2xl" >Föregående sida</button>

      <button onClick={handleBackToStartPage} className="bg-purple-300 border border-purple-600 m-2 px-6 py-2 rounded-full uppercase font-bold shadow-xl 
        transition duration-200 hover:bg-white hover:shadow-2xl" >Till startsida</button>
    </main>
  )
}