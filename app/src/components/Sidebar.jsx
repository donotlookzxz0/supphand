import { Link } from "react-router"
import HandLogo from "./HandLogo";

function Sidebar({ userLogout, showUsername }) {
  return (
    <div className="sticky top-0 flex flex-col justify-between items-center bg-white h-screen border-r border-gray-200 shadow-md w-30">
      <HandLogo />

      <div>
        <Link to="/" className="hover:underline">Home</Link>
      </div>

      <div className="flex flex-col items-center border-t w-full border-gray-200 shadow-md px-2 py-3 gap-2">
        <p className="text-md text-center truncate">{showUsername}</p>
        <button
          onClick={userLogout}
          className="bg-orange-400 text-white rounded-md w-20 px-2 py-1 hover:bg-orange-500 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
