import { Link } from "react-router-dom";

function NotFound() {
    
  return (
   <div className='text-white text-center font-semibold'>
    <h1>Not Found</h1>
    <Link to='/' className="underline text-green">Return to Home</Link>
   </div>
  )
};

export default NotFound;