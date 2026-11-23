import { useState } from "react";
import { Link } from "react-router";

function Navbar({ userLogout, showUsername }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between bg-white md:p-2 md:border md:border-none md:rounded-md w-full md:w-1/2 lg:w-1/2">
        <div className="text-lg text-orange-500 font-semibold italic hidden md:flex">
          Supphand
        </div>

        <div className="hidden md:flex">
          <Link to="/" className="font-semibold hover:underline">
            Home
          </Link>
        </div>

        <div className="hidden md:flex md:gap-3">
            <p className="font-semibold text-md text-center truncate hidden md:inline">
              {showUsername}
            </p>
            <button
              onClick={userLogout}
              className="bg-orange-400 text-white rounded-md w-20 px-2 py-1 hover:bg-orange-500 cursor-pointer"
            >
              Logout
            </button>
        </div>

        <div className="px-3 py-2 md:px-0 md:py-0 md:hidden lg:hidden">
            <button
            className="border rounded-md px-2 py-1 text-xl cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            >
            ☰
            </button>
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col items-center gap-5 bg-white p-3 w-full">  
          <Link to="/" onClick={() => setIsOpen(false)} className="font-semibold hover:underline">
            Home
          </Link>
          <button
            onClick={userLogout}
            className="bg-orange-400 text-white rounded-md w-20 px-2 py-1 hover:bg-orange-500 cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}

export default Navbar;