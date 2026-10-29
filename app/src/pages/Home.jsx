import { useNavigate } from "react-router"
import { logout } from "../services/auth"
import TicketList from "../components/TicketList";

const Home = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  }

  return (
  
      <div>
        Home
        <button onClick={handleLogout} className="bg-yellow-500 text-white font-semibol cursor-pointer">
          Logout
        </button>
        <TicketList />
      </div>
      
  )
}

export default Home