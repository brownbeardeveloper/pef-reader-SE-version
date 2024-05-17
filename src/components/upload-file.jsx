import { useState, useEffect } from "react"
import { fileReader, checkIfPefFileType } from "../functions/fileReader"
import { UnitModeEnum, FileLoadStatusEnum } from "../data/enums.js"
import { TabIndex } from "../data/tab-index.js"
import brailleIcon from '../media/braille-icon.png';

export default function UploadFile({ setSavedPageIndex, setReadmode, pefObject, setPefObject, fileName, setFileName, howToRead, setHowToRead }) {
    const [fileLoadStatus, setFileLoadStatus] = useState(FileLoadStatusEnum.INITIAL);
    const [showDots, setShowDots] = useState(true);

    useEffect(() => {
        // Shows the third dot every second during the loading state
        const interval = setInterval(() => {
            setShowDots((state) => !state);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    function handleAddFile(event) {
        if (event.target.files[0]) {
            if (checkIfPefFileType(event.target.files[0].type)) {
                setFileName(event.target.files[0].name);
                const reader = new FileReader() // Initializes a new FileReader object

                reader.addEventListener("load", () => { // Executes when the file is successfully loaded
                    const fileObject = fileReader(reader.result) // This object contains both metadata and body data
                    fileObject.then(resolvedObject => {
                        if (resolvedObject.metaData.språk === 'sv') { // Move this function to the "Braille Translator" button later!
                            setSavedPageIndex(null) // Resets the saved page index
                            setPefObject(resolvedObject); // Saves the file's contents as pefObject
                            setFileLoadStatus(FileLoadStatusEnum.SUCCESSFUL)
                        } else {
                            alert('Tyvärr, den valda boken är inte på svenska. Just nu kan vi endast hantera svenska böcker. Meddela oss om du önskar en annan språkversion.');
                            setFileLoadStatus(FileLoadStatusEnum.FAILED)
                        }
                    }).catch(error => {
                        console.error("Error occurred while resolving the promise:", error);
                        setFileLoadStatus(FileLoadStatusEnum.FAILED)
                    });
                });

                setFileLoadStatus(FileLoadStatusEnum.LOADING)
                reader.readAsText(event.target.files[0]) // Starts reading the file
            } else {
                alert(`Fel: Filtypen ${event.target.files[0].type} som du försöker ladda är inte en PEF-fil.`);
                setFileLoadStatus(FileLoadStatusEnum.FAILED)
            }
        } else {
            setFileName('ingen fil vald');
            setFileLoadStatus(FileLoadStatusEnum.INITIAL)
        }
    }

    function HandleSwapToReadMode() {
        if (pefObject) {
            setReadmode(true); // IMPORTANT: Switching this component to read mode
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
                {fileLoadStatus !== FileLoadStatusEnum.LOADING && (
                    <>
                        <input
                            id="file-selector"
                            type="file"
                            accept=".pef"
                            className="hidden"
                            onChange={handleAddFile}
                            tabIndex={TabIndex.UPLOAD_FILE}
                        />
                        <label
                            htmlFor="file-selector"
                            tabIndex={TabIndex.UPLOAD_FILE}
                            className={
                                fileLoadStatus === FileLoadStatusEnum.LOADING
                                    ? "cursor-not-allowed button"
                                    : "button"
                            }
                        >
                            Välj fil (.pef)
                        </label>
                    </>
                )}

                {fileLoadStatus === FileLoadStatusEnum.LOADING && (
                    <div className="flex flex-row items-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mr-3"></div>
                        <span className="text-lg font-semibold">
                            Pågående filöverföring{showDots ? '...' : '..'}
                        </span>
                    </div>

                )}
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
                        tabIndex={TabIndex.RADIO_FLOW_TEXT}
                        checked={howToRead === UnitModeEnum.ONE_FLOW}
                        onChange={() => setHowToRead(UnitModeEnum.ONE_FLOW)}
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
                        tabIndex={TabIndex.RADIO_BY_PAGE_TEXT}
                        checked={howToRead === UnitModeEnum.PAGE_BY_PAGE}
                        onChange={() => setHowToRead(UnitModeEnum.PAGE_BY_PAGE)}
                    />
                    <label htmlFor="byPage" className="ml-1">
                        Sida för sida
                    </label>
                </div>
            </fieldset>

            <div className="inline-block">
                {fileLoadStatus === FileLoadStatusEnum.SUCCESSFUL && (
                    <button onClick={HandleSwapToReadMode} className="button" >Läs boken</button>
                )}

                {fileLoadStatus === FileLoadStatusEnum.FAILED && (
                    <div className="flex flex-row items-center bg-red-100 text-red-700 rounded-lg pl-5 p-3 shadow-md max-w-md">
                        <span className="font-semibold text-sm">
                            Uppladdningen misslyckades. Försök igen eller kontakta kundtjänst.
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}