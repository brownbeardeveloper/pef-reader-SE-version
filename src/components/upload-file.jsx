import { useState } from "react"
import { Bars } from 'react-loader-spinner'
import { fileReader, checkIfPefFileType } from "../functions/fileReader"
import { getSessionStorageDataByFileIdAsOneFlow } from "../functions/sessionHandler";
import { ViewModeEnum } from "../data/enums.js"

export default function UploadFile({ setReadmode, pefObject, setPefObject, fileName, setFileName, howToRead, setHowToRead }) {

    const [isLoadingFile, setIsLoadingFile] = useState(false);
    const iconColor = "#d8bfd8";

    function handleAddFile(event) {
        if (event.target.files[0]) {
            if (checkIfPefFileType(event.target.files[0].type)) {
                setFileName(event.target.files[0].name);
                const reader = new FileReader() // Launches a new thread in the client's web browser background

                reader.addEventListener("load", () => { // Actions to perform when the input is successfully loaded

                    const fileObject = fileReader(reader.result) // this obj contains both meta and body data

                    fileObject.then(resolvedObject => {
        
                        if (resolvedObject.metaData.språk === 'sv') {
                            setPefObject(resolvedObject);
                            setIsLoadingFile(false)

                        } else {
                            alert('Tyvärr, den valda boken är inte på svenska. Just nu kan vi endast hantera svenska böcker. Meddela oss om du önskar en annan språkversion.');
                        }
                    }).catch(error => {
                        console.error("Error occurred while resolving the promise:", error);
                    });
                });

                setIsLoadingFile(true)
                reader.readAsText(event.target.files[0]) // Start the reader

            } else {
                alert(`Fel: Filtypen ${event.target.files[0].type} som du försöker ladda är inte en PEF-fil.`);
            }

        } else {
            setFileName('ingen fil vald');
        }
    }

    function HandleSwapToReadMode() {
        if (pefObject) {
            setReadmode(true); // IMPORTANT: Swapping this component to read mode    
        } else {
            alert('Fel: Lägg först till en PEF-fil innan du försöker läsa boken.');
        }
    }

    function getSessionStorage() {
        if (pefObject && pefObject.metaData && pefObject.metaData.identifier) {
            return getSessionStorageDataByFileIdAsOneFlow(pefObject.metaData.identifier)
        } else {
            console.error('pefObject.metaData.identifier is undefined.');
        }
    }

    function handleGetSessionStorage() {
        const data = getSessionStorage()

        if (data) {

        }

    }

    return (
        <div>
            <p className="text-xl">När du har laddat ner en punktskriftsbok från Legimus kan du läsa den här med din punktdisplay.</p>

            <div className="mt-10 mb-10 flex flex-col items-start">
                <p className="text-4xl font-bold mb-10">Ladda upp filen</p>

                {/* Disable the file-selector button while the file is being converted */}
                <input id="file-selector" type="file" accept=".pef" className="hidden" onChange={handleAddFile} disabled={isLoadingFile} />
                <label htmlFor="file-selector" className={(isLoadingFile ? "bg-purple-50 border-purple-100 cursor-not-allowed"
                    : "bg-purple-300 border-purple-600 hover:bg-white hover:shadow-2xl cursor-pointer") +
                    " border px-8 py-3 rounded-full uppercase font-bold shadow-xl transition duration-200 w-max"}>
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
                        id="oneFlow"
                        name="howToRead"
                        value="ONEFLOW"
                        className="m-1"
                        checked={howToRead === ViewModeEnum.ONE_FLOW}
                        onChange={() => setHowToRead(ViewModeEnum.ONE_FLOW)}
                    />
                    <label htmlFor="oneFlow" className="ml-1 mr-10">
                        Löpande text
                    </label>

                    <input
                        type="radio"
                        id="byPage"
                        name="howToRead"
                        value="BYPAGE"
                        className="m-1"
                        checked={howToRead === ViewModeEnum.PAGE_BY_PAGE}
                        onChange={() => setHowToRead(ViewModeEnum.PAGE_BY_PAGE)}
                    />
                    <label htmlFor="byPage" className="ml-1">
                        Sida för sida
                    </label>
                </div>

                {howToRead === ViewModeEnum.PAGE_BY_PAGE && (
                    <form>
                        <label htmlFor="page">Hoppa till sida: </label>
                        <input type="number" id="page" name="sida" min="0" max="100000" className="border" placeholder={0} />
                    </form>
                )}


            </div>

            <div className="inline-block">

                {!isLoadingFile ?
                    <button onClick={HandleSwapToReadMode} className="bg-purple-300 border border-purple-600 px-8 py-3 rounded-full uppercase font-bold shadow-xl 
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
                        <p className="ml-4 text-xl font-semibold text-gray-600">Laddar filen...</p>
                    </div>
                }
            </div>

            <button onClick={handleGetSessionStorage} className="bg-green-500 border p-2 border-black">get session</button>
        </div>
    )
}