import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import { getAllTickets } from "../services/ticket";
import TicketList from "../components/TicketList";
import StaffTicketList from "../components/StaffTicketList";
import CreateTicket from "../components/CreateTicket";

const Home = () => {
  const { user } = useOutletContext();
  const [tickets, setTickets] = useState([]);
  
   const roleCheck = user.role === "staff" || user.role === "admin";

  useEffect(() => {
     if (roleCheck) return;

    getAllTickets()
      .then((ticketData) => setTickets(ticketData))
      .catch((err) => console.error(err));
  }, []);

  const createTicket = (newTicket) => {
    setTickets((prev) => [newTicket, ...prev])
  }

  return (
      <div className="flex">
        
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
  );
};

export default Home;