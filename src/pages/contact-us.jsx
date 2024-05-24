import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

export default function ContactUsPage() {
    const [isCopied, setIsCopied] = useState(false);

    const copyPhoneNumber = () => {
        const phoneNumber = '0406532700';
        navigator.clipboard.writeText(phoneNumber)
            .then(() => {
                setIsCopied(true); // Set state to true to show feedback
                setTimeout(() => setIsCopied(false), 3000); // Reset state after 3 seconds
            })
            .catch((error) => {
                console.error('Failed to copy phone number: ', error);
            });
    };


    return (
        <main className="mx-auto px-20 pt-10 pb-20">
            <h2 className="text-2xl font-semibold mb-5" tabIndex={0}>Kontakta MTM</h2>

            <p className="mb-5 text-lg">
                Du kan kontakta oss på MTM <em>(Myndigheten för tillgängliga medier)</em> på olika sätt. Den här informationen är till för att hjälpa dig att hitta det kontaktsätt som passar dig bäst. Du kan kontakta oss via brev eller annan post. Du kan ringa, skicka e-post eller hitta vår besöksadress.
            </p>

            <div className="mb-4">
                <h3 className="font-semibold">Postadress</h3>
                <p>MTM</p>
                <p>Box 51</p>
                <p>201 20 Malmö</p>
            </div>

            <div className="mb-4">
                <h3 className="font-semibold">Besöksadress</h3>
                <p>Hans Michelsensgatan 2</p>
                <p>211 20 Malmö</p>
            </div>

            <div className="mb-4">
                <h3 className="font-semibold">Leveransadress</h3>
                <p>MTM</p>
                <p>Hans Michelsensgatan 2</p>
                <p>211 20 Malmö</p>
            </div>

            <div className="mb-4">
                <h3 className="font-semibold">Telefon</h3>
                <p className="flex items-center">
                    <span>040-653 27 00 <em>(växel)</em></span>
                    <button onClick={copyPhoneNumber} aria-label="Klicka för att kopiera telefonnumret" className="mx-2 px-1 border rounded-lg bg-slate-100 hover:bg-slate-300">
                        <FontAwesomeIcon icon={faCopy} className="mx-1" />
                    </button>
                </p>
                {/* Feedback message */}
                {isCopied && (
                    <div className="bg-green-200 text-green-700 border border-green-700 my-2 px-4 py-2 rounded-md mb-5">
                        Telefonnumret har kopierats!
                    </div>
                )}

            </div>

            <div className="mb-4">
                <h3 className="font-semibold">E-post</h3>
                <p><a href="mailto:info@mtm.se" className='font-semibold text-sky-600 underline hover:text-blue-900'>info@mtm.se</a></p>
            </div>

            <div className="mb-20">
                <h3 className="font-semibold">Mer information</h3>
                <p>Hittar du på <a href="https://www.mtm.se" className='font-semibold text-sky-600 underline hover:text-blue-900'>mtm.se</a></p>
            </div>
        </main>
    );
}
