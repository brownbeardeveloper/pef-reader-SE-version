import { useState } from "react"
import { Bars } from 'react-loader-spinner'
import checkIfPefFileType from "../functions/fileHandler"
import fileReader from "../functions/fileReader"

export default function Welcome() {

    const noFileSelected = 'ingen fil vald'
    const [fileName, setFileName] = useState(noFileSelected)
    const [readingFile, setReadingFile] = useState(false)
    const [howToRead, setHowToRead] = useState('BYPAGE');
    const iconColor = "#d8bfd8"
    var selectedFile

    const handleFileChange = (event) => {

        selectedFile = event.target.files[0]

        if (selectedFile) {

            if (checkIfPefFileType(selectedFile.type)) {
                setFileName(selectedFile.name);
            } else {
                alert(`Fel: Filtypen ${selectedFile.type} som du försöker ladda är inte en PEF-fil.`);
            }

        } else {
            setFileName(noFileSelected);
        }
    }

    function convertPefToBook() {

        if (checkIfPefFileType(selectedFile.type)) {
            setReadingFile(!readingFile)
            console.log(selectedFile)
        } else {
            alert('Fel: Lägg först till en PEF-fil innan du försöker konvertera boken.')
        }
    }

    return (
        <div>
            <p className="text-xl">När du har laddat ner en punktskriftsbok från Legimus kan du läsa den här med din punktdisplay.</p>

            <div className="mt-10 mb-10">
                <p className="text-4xl font-bold mb-10">Ladda upp filen</p>

                {/* Disable the file-selector button while the file is being converted */}
                <input id="file-selector" type="file" accept=".pef" className="hidden" onChange={handleFileChange} disabled={readingFile} />
                <label htmlFor="file-selector" className={(readingFile ? "bg-purple-50 border-purple-100 cursor-not-allowed" 
                : "bg-purple-300 border-purple-600 hover:bg-white hover:shadow-2xl cursor-pointer") + 
                " border px-8 py-3 rounded-full uppercase font-bold shadow-xl transition duration-200"}>
                    Välj fil (.pef)
                </label>
            </div>

            <div className="flex flex-row items-center mt-6 mb-6">
                <label className="mr-2 text-2xl font-bold">Vald fil: </label>
                <p>{fileName}</p>
            </div>


            <div className="mt-10 mb-10">
                <p className="text-2xl font-bold" >Hur vill du läsa boken?</p>

                <div className="flex flex-row mb-2 mt-2">
                    <input
                        type="radio"
                        id="byPage"
                        name="howToRead"
                        value="BYPAGE"
                        className="m-1"
                        checked={howToRead === 'BYPAGE'}
                        onChange={() => setHowToRead('BYPAGE')}
                    />
                    <label htmlFor="byPage" className="ml-1 mr-10">
                        Sida för sida
                    </label>
                    <input
                        type="radio"
                        id="oneFlow"
                        name="howToRead"
                        value="ONEFLOW"
                        className="m-1"
                        checked={howToRead === 'ONEFLOW'}
                        onChange={() => setHowToRead('ONEFLOW')}
                    />
                    <label htmlFor="oneFlow" className="ml-1">
                        Löpande text
                    </label>
                </div>

                {howToRead === 'BYPAGE' && (
                    <form>
                        <label htmlFor="page">Bokens sida:</label>
                        <input type="number" id="page" name="sida" min="0" max="100000" className="border" />
                    </form>
                )}


            </div>

            <div className="inline-block">

                {!readingFile ?
                    <button onClick={convertPefToBook} className="bg-purple-300 border border-purple-600 px-8 py-3 rounded-full uppercase font-bold shadow-xl 
                    transition duration-200 hover:bg-white hover:shadow-2xl" >Läs boken</button>
                    :
                    <div className="flex flex-row items-center">
                        <Bars
                            height="40"
                            width="40"
                            color={iconColor}
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                        <p className="ml-4 text-xl font-semibold text-gray-600">Förbereder läsning...</p>
                    </div>
                }
            </div>
        </div>
    )
}