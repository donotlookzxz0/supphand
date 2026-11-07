import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { fetchUser, logout } from "../services/auth";
import { getAllTickets } from "../services/ticket";
import TicketList from "../components/TicketList";
import StaffTicketList from "../components/StaffTicketList";
import CreateTicket from "../components/CreateTicket";

const Home = () => {
  const [role, setRole] = useState(null);
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  const roleCheck = role === "staff" || role === "admin"

  useEffect (() => {
    fetchUser()
    .then((data) => setRole(data.role))
    .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
     if (!role || roleCheck) return;

    getAllTickets()
      .then((ticketData) => setTickets(ticketData))
      .catch((err) => console.error(err));
  }, [role]);

  const createTicket = (newTicket) => {
    setTickets((prev) => [newTicket, ...prev])
  }

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!role) {
    return <p>...</p>
  }

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
            <CreateTicket onCreateTicket={createTicket} />
            <TicketList tickets={tickets} />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
