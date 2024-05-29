import { useState, useEffect } from "react"
import { fileReader, checkIfPefFileType } from "../utils/fileReader"
import { UnitModeEnum, FileLoadStatusEnum } from "../data/enums.js"
import { useDropzone } from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import brailleIcon from '../media/braille-icon.png';

export default function UploadFile({ setSavedPageIndex, setReadmode, pefObject, setPefObject, fileName, setFileName, howToRead, setHowToRead }) {
    const [fileLoadStatus, setFileLoadStatus] = useState(FileLoadStatusEnum.INITIAL);
    const [showDots, setShowDots] = useState(true);

    // Setup dropzone
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        multiple: false,
        accept: {
            'image/x-pef': ['.pef'],
            'application/x-pef+xml': ['.pef'],
            'application/x-pentax-pef': ['.pef']
        },
        onDrop: handleAddFile,
    });

    useEffect(() => {
        // Shows the third dot every second during the loading state
        const interval = setInterval(() => {
            setShowDots((state) => !state);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    function handleAddFile(acceptedFiles) {

        if (acceptedFiles) {
            if (checkIfPefFileType(acceptedFiles[0].type)) {
                setFileName(acceptedFiles[0].name);
                const reader = new FileReader() // Initializes a new FileReader object

                reader.addEventListener("load", () => { // Executes when the file is successfully loaded
                    const fileObject = fileReader(reader.result) // This object contains both metadata and body data
                    fileObject.then(resolvedObject => {
                        if (resolvedObject.metaData.language === 'Svenska') { // Move this function to the "Braille Translator" button later!
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
                reader.readAsText(acceptedFiles[0]) // Starts reading the file

            } else {
                alert(`Fel: Filtypen ${acceptedFiles[0].type} som du försöker ladda är inte en PEF-fil.`);
                setFileLoadStatus(FileLoadStatusEnum.FAILED)
                setFileName('filen kunde inte laddas upp.')
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
        <div className="flex flex-col pt-10 px-20 w-full">

            <div className="flex flex-col justify-center items-center p-4 md:p-8 lg:p-12">
                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                    <div className="h-24 w-24 md:h-20 md:w-20 flex-shrink-0">
                        <img src={brailleIcon} className="w-full h-full" alt="Punktskriftsikon" />
                    </div>
                    <div className="text-center md:text-left">
                        <h2 id="MainContentArea" className="text-xl md:text-2xl lg:text-3xl font-bold mt-4 md:mt-0">Från punktskrift till svartskrift på några sekunder</h2>
                    </div>
                </div>
                <div className="mt-4 md:mt-6 lg:mt-8 px-4 md:px-8 lg:px-12 text-center md:text-left">
                    <p className="text-lg md:text-xl lg:text-2xl">När du har laddat ner en punktskriftsbok från Legimus kan du läsa den här med din punktdisplay.</p>
                </div>
            </div>

            <div className="flex flex-col items-start my-10">
                <h3 className="text-4xl font-bold my-5">Ladda upp filen</h3>

                {/* Disable the file-selector button while the file is being converted */}
                {fileLoadStatus !== FileLoadStatusEnum.LOADING &&
                    <div {...getRootProps()}
                        className={`dropzone-container border-2 border-dashed border-purple-400 p-10 my-4 text-center 
                            w-full cursor-pointer hover:bg-purple-50 ${isDragActive && "bg-purple-100"}`}>
                        <input {...getInputProps()} id="file-input" tabIndex={0} />
                        {isDragActive ? (
                            <label htmlFor="file-input">
                                Släpp filen här...
                            </label>
                        ) : (
                            <>
                                {(fileName !== 'ingen fil vald'  && fileName !== 'filen kunde inte laddas upp.') ? (
                                    <label htmlFor="file-input">
                                        Filen {fileName} har laddats upp. Klicka här för att byta fil (.pef)
                                    </label>
                                ) : (
                                    <label htmlFor="file-input">
                                        Klicka här för att välja fil (.pef)
                                    </label>
                                )}
                            </>
                        )}
                    </div>
                }

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
                <span>
                    {fileName !== 'ingen fil vald' && <FontAwesomeIcon icon={faFile} className="mr-1" />}
                    {fileName}</span>
            </div>

            <fieldset className="mt-10">
                <legend className="text-2xl font-bold" >Hur vill du läsa boken?</legend>
                <div className="flex flex-row my-6">
                    <input
                        type="radio"
                        id="oneFlow"
                        name="howToRead"
                        value="ONE_FLOW"
                        className="m-1"
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
                        checked={howToRead === UnitModeEnum.PAGE_BY_PAGE}
                        onChange={() => setHowToRead(UnitModeEnum.PAGE_BY_PAGE)}
                    />
                    <label htmlFor="byPage" className="ml-1">
                        Sida för sida
                    </label>
                </div>
            </fieldset>

            <div className="mt-8 mb-60">
                {(fileLoadStatus === FileLoadStatusEnum.INITIAL || fileLoadStatus === FileLoadStatusEnum.SUCCESSFUL) && (
                    <button onClick={HandleSwapToReadMode} className="button" >Läs boken</button>
                )}

                {fileLoadStatus === FileLoadStatusEnum.FAILED && (
                    <div className="flex flex-row items-center bg-red-100 text-red-700 rounded pl-5 p-3 shadow-md max-w-md">
                        <span className="font-semibold text-sm" tabIndex={0}>
                            Uppladdningen misslyckades. Uppdatera sidan och försök igen innan du kontaktar kundtjänsten <a href="/kontakt" class="underline">här</a>.
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}