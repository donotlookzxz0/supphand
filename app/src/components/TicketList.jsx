import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getAllTickets } from "../services/ticket";

function TicketList() {
  const [ticket, setTicket] = useState([]);

  useEffect(() => {
    getAllTickets()
      .then((ticketData) => setTicket(ticketData))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <ul>
        {ticket.map((ticket) => (
          <Link to={`/tickets/${ticket.id}`}>
            <li key={ticket.id} className="text-white">
              title: {ticket.title} | status: {ticket.status}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default TicketList;