import brailleIcon from '../media/braille-icon.png';

export default function Header() {
  return (
    <header className="flex items-center justify-center mb-10">

      <div>
        <a href="#MainContentArea" className=''>Till innehåll på sidan</a>
      </div>

      <div className='h-20 w-20'>
        <img src={brailleIcon} className="w-full h-full" alt="Punktskriftsikon" />
      </div>

      <div>
        <span className="ml-8 text-2xl font-bold">Från punktskrift till svartskrift på några sekunder</span>
      </div>
      
    </header>
  );
}
