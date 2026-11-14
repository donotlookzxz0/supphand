import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { fetchUser, logout } from "../services/auth";
import { getAllTickets } from "../services/ticket";
import TicketList from "../components/TicketList";
import StaffTicketList from "../components/StaffTicketList";
import CreateTicket from "../components/CreateTicket";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  const roleCheck = role === "staff" || role === "admin"

  useEffect (() => {
    fetchUser()
    .then((data) => {
      setRole(data.role);
      setUsername(data.username);
    })
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
      <div className="flex">
        
        <Sidebar 
          userLogout={handleLogout} 
          showUsername={username}
         />

        <div className="flex flex-1 justify-center items-center p-5">
          {roleCheck ? (
            <StaffTicketList />
          ) : (
            <div className="flex flex-col gap-3">
              <CreateTicket onCreateTicket={createTicket} />
              <TicketList tickets={tickets} />
            </div>
          )}
       
        </div>

      </div>
  </>
  );
};

export default Home;
