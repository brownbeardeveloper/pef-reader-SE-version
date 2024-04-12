import React from 'react';

export default function Navbar() {

  return (
    <nav className="flex justify-between px-4 py-8 mx-auto bg-purple-100">

      <div>
        <span className="text-2xl font-bold text-purple-500">Läs punktskrift direkt</span>
      </div>

      <div className="hidden space-x-8 lg:flex">
        <a href="">Home</a>
        <a href="">About Us</a>
        <a href="">Our Team</a>
        <a href="">Contact Us</a>
      </div>

      <div className="flex lg:hidden">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
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
    </nav>


  )
}
