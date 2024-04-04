import { useState } from "react"

export default function Welcome() {

    const [fileName, setFileName] = useState("ingen fil vald")

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFileName(selectedFile.name);
    }

    return (
        <div>
            <p className="text-xl">När du har laddat ner en punktskriftsbok från Legimus kan du läsa den här med din punktdisplay.</p>

            <div className="mt-6 mb-6"> {/* set as false when the file is converted */}
                <p className="text-4xl font-bold mb-6">Ladda upp filen</p>

                <input id="file-selector" type="file" accept=".pef" className="hidden" onChange={handleFileChange} />
                <label htmlFor="file-selector" className="bg-purple-300 border border-purple-600 px-8 py-3 rounded-full uppercase font-bold shadow-xl 
                    transition duration-200 hover:bg-white hover:shadow-2xl cursor-pointer">Välj fil (.pef)</label>
            </div>

            <div className="flex flex-row items-center mt-6 mb-6">
                <label className="mr-2 text-2xl font-bold">Vald fil: </label>
                <p>{fileName}</p>
            </div>




            { /*      
            
            
            Hur vill du läsa boken?

            * Sida för sida 
            * Löpande text
            
            
            */}


            <h2>Hur vill du läsa boken?</h2>
            <div className="flex flex-row mb-2 mt-2 mr-2">
                <input type="radio" id="byPage" name="howToRead" value="BYPAGE" />
                <label for="byPage">Sida för sida</label>
                <input type="radio" id="oneFlow" name="howToRead" value="ONEFLOW" />
                <label for="oneFlow">Löpande text</label>
            </div>
            <iframe id="download_frame"></iframe>

            <button id="convert-btn">Läs boken</button>

            <h3 id="convertingText">Konverterar ...</h3>








        </div>
    )
}