import { Link } from "react-router";

function NotFound() {
    
  return (
    <div className="flex justify-center items-center min-h-screen text wrap text-4xl md:text-6xl lg:text-7xl">
      <div className="flex flex-col gap-5">
        <h1 className="text-black text-center font-semibold ">Not Found</h1>
        <p className="text-center text-wrap text-4xl md:text-4xl lg:text-5xl">Page doesn't exist or has been removed</p>
        <Link to="/" className="underline text-center text-orange-500 hover:text-orange-600">Return to Home</Link>
      </div>
    </div>
  )
};

export default NotFound;