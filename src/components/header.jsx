import brailleIcon from '../media/braille-icon.png'

export default function Header() {

  return (
    <head className="flex justify-center align-center">

      <div className='h-20 w-20'>
        <img src={brailleIcon} className="w-full h-full" />
      </div>

      <div>
        <span className="text-2xl font-bold text-purple-700"></span>
      </div>

      <div>

      </div>
    </head>
  )
}
