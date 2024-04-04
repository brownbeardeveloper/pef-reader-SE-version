import { useState } from "react"

export default function Welcome() {

    const emptyFile = 'ingen fil vald'
    const [fileName, setFileName] = useState(emptyFile)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFileName(selectedFile.name);
    }

    function convertPefToBook() {
        if (fileName !== emptyFile) {
            setLoading(!loading)
        } else {
            setErrorMessage('Fel: Lägg först till en PEF-fil innan du försöker konvertera boken.');
            setTimeout(() => {
                setErrorMessage('');
            }, 5000); // Wait for 5 seconds and then clear the error message            
        }
    }

    return (
        <div>
            <p className="text-xl">När du har laddat ner en punktskriftsbok från Legimus kan du läsa den här med din punktdisplay.</p>

            <div className="mt-10 mb-10"> {/* set as false when the file is converted */}
                <p className="text-4xl font-bold mb-10">Ladda upp filen</p>

                <input id="file-selector" type="file" accept=".pef" className="hidden" onChange={handleFileChange} />
                <label htmlFor="file-selector" className="bg-purple-300 border border-purple-600 px-8 py-3 rounded-full uppercase font-bold shadow-xl 
                    transition duration-200 hover:bg-white hover:shadow-2xl cursor-pointer">Välj fil (.pef)</label>
            </div>

            <div className="flex flex-row items-center mt-6 mb-6">
                <label className="mr-2 text-2xl font-bold">Vald fil: </label>
                <p>{fileName}</p>
            </div>


            <div className="mt-10 mb-10">
                <p className="text-2xl font-bold" >Hur vill du läsa boken?</p>

                <div className="flex flex-row mb-2 mt-2">
                    <input type="radio" id="byPage" name="howToRead" value="BYPAGE" className="m-1" />
                    <label for="byPage" className="ml-1 mr-10">Sida för sida</label>
                    <input type="radio" id="oneFlow" name="howToRead" value="ONEFLOW" className="m-1" />
                    <label for="oneFlow" className="ml-1" >Löpande text</label>
                </div>
            </div>

            <div className="inline-block">

            <p className={errorMessage ? 'bg-yellow-200 border border-black text-black max-w-content px-4 py-2 mb-3' : ''}>{errorMessage}</p>

                {!loading ? <button onClick={convertPefToBook} className="bg-purple-300 border border-purple-600 px-8 py-3 rounded-full uppercase font-bold shadow-xl 
                    transition duration-200 hover:bg-white hover:shadow-2xl" >Läs boken</button>
                    :
                    <h1>loading....</h1>
                }

            </div>

        </div>
    )
}