import { useState } from "react"
import { fileReader, checkIfPefFileType } from "../functions/fileReader"
import { ViewModeEnum } from "../data/enums.js"
import { getLatestRowPositionFromCookieJson } from "../functions/cookieManager.js"
import brailleIcon from '../media/braille-icon.png';

export default function UploadFile({ setSavedRowIndex, setReadmode, pefObject, setPefObject, fileName, setFileName, howToRead, setHowToRead, jumpToPage, setJumpToPage }) {
    const [isLoadingFile, setIsLoadingFile] = useState(false);

    function handleAddFile(event) {
        if (event.target.files[0]) {
            if (checkIfPefFileType(event.target.files[0].type)) {
                setFileName(event.target.files[0].name);
                const reader = new FileReader() // Launches a new thread in the client's web browser background

                reader.addEventListener("load", () => { // Actions to perform when the input is successfully loaded
                    const fileObject = fileReader(reader.result) // This obj contains both meta and body data
                    fileObject.then(resolvedObject => {
                        if (resolvedObject.metaData.språk === 'sv') { // Move this function to "braille translator"-button later!
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

            if (pefObject && pefObject.metaData && pefObject.metaData.identifier && pefObject.metaData.titel) {

                const data = getLatestRowPositionFromCookieJson(pefObject.metaData.identifier);

                if (data) {
                    setSavedRowIndex(data);
                } else {
                    console.error('There is no cookie.');
                }
            } else {
                console.error('pefObject.metaData.identifier is undefined.');
            }
        } else {
            alert('Fel: Lägg först till en PEF-fil innan du försöker läsa boken.');
        }
    }

    return (
        <div className="flex flex-col p-20 w-full">
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-row justify-center items-center">
                    <div className='h-20 w-20'>
                        <img src={brailleIcon} className="w-full h-full" alt="Punktskriftsikon" />
                    </div>
                    <div>
                        <h2 id="MainContentArea" className="ml-8 text-2xl font-bold">Från punktskrift till svartskrift på några sekunder</h2>
                    </div>
                </div>
                <div className="m-5">
                    <p className="text-xl">När du har laddat ner en punktskriftsbok från Legimus kan du läsa den här med din punktdisplay.</p>
                </div>
            </div>

            <div className="flex flex-col items-start my-10">
                <h3 className="text-4xl font-bold my-5">Ladda upp filen</h3>

                {/* Disable the file-selector button while the file is being converted */}
                <input
                    id="file-selector"
                    type="file"
                    accept=".pef"
                    className="hidden"
                    onChange={handleAddFile}
                    disabled={isLoadingFile}
                />
                <label
                    htmlFor="file-selector"
                    className={(isLoadingFile ?
                        "cursor-not-allowed button"
                        : "button")}>
                    Välj fil (.pef)
                </label>
            </div>

            <div className="flex flex-row items-center">
                <label className="mr-2 text-xl font-bold">Vald fil: </label>
                <span>{fileName}</span>
            </div>

            <fieldset className="my-10">
                <legend className="text-2xl font-bold" >Hur vill du läsa boken?</legend>
                <div className="flex flex-row my-6">
                    <input
                        type="radio"
                        id="oneFlow"
                        name="howToRead"
                        value="ONE_FLOW"
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
                        value="PAGE_BY_PAGE"
                        className="m-1"
                        checked={howToRead === ViewModeEnum.PAGE_BY_PAGE}
                        onChange={() => setHowToRead(ViewModeEnum.PAGE_BY_PAGE)}
                    />
                    <label htmlFor="byPage" className="ml-1">
                        Sida för sida
                    </label>
                </div>

                {/* remove this below later...
                {howToRead === ViewModeEnum.PAGE_BY_PAGE && (
                    <div className="">
                        <label htmlFor="pageNumber">Hoppa till sida: </label>
                        <input
                            type="number"
                            id="pageNumber"
                            name="pageNumber"
                            min="1"
                            max="100000"
                            pattern="[0-9]*"
                            className="border rounded"
                            placeholder={jumpToPage + 1}
                            onChange={(e) => {
                                setJumpToPage(parseInt(e.target.value, 10) - 1);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    const pageIndex = parseInt(e.target.value, 10);
                                    if (!isNaN(pageIndex)) {
                                        setJumpToPage(pageIndex - 1);
                                        HandleSwapToReadMode();
                                    }
                                }
                            }}
                        />
                    </div>
                )} */}

            </fieldset>

            <div className="inline-block">
                {!isLoadingFile ?
                    <button onClick={HandleSwapToReadMode} className="button" >Läs boken</button>
                    :
                    <div className="flex flex-row items-center">
                        <span className="ml-2 text-xl font-semibold text-gray-600">Laddar filen...</span>
                    </div>
                }
            </div>
        </div>
    )
}