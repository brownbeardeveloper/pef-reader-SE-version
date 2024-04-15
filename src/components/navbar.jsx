export default function Navbar() {

  return (
    <head className="flex justify-between px-4 py-1 mx-auto bg-gray-200">

      <div>
        <span className="text-lg font-bold">Digital punktläsare</span>
      </div>

      <div class="hidden space-x-8 lg:flex">
        <a href="">English</a>
      </div>

      <div className="flex lg:hidden">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />

        </svg>
      </div>
    </head>


  )
}
