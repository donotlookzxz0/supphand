import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { fetchUser, logout } from "../services/auth";
import TicketList from "../components/TicketList";
import StaffTicketList from "../components/StaffTicketList";
import CreateTicket from "../components/CreateTicket";

const Home = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect (() => {
    fetchUser()
    .then((data) => setRole(data.role))
    .catch(() => console.error(err))
  }, [])

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!role) {
    return <p>...</p>
  }

  const roleCheck = role === "staff" || role === "admin"

  return (
    <>
      <div>
        Home
        <button
          onClick={handleLogout}
          className="bg-yellow-500 text-white font-semibol cursor-pointer"
        >
          Logout
        </button>
      </div>

      <div>
        {roleCheck ? (
          <StaffTicketList />
        ) : (
          <>
            <CreateTicket />
            <TicketList />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
