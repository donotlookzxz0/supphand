import { useNavigate } from "react-router-dom"
import { logout } from "../services/auth"

const Home = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  }

  return (
    <>
      <div>Home</div>
      <button onClick={handleLogout} className="bg-yellow-500 text-white font-semibold">Logout</button>
    </>
  )
}

export default Home