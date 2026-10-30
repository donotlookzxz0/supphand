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
          <li key={ticket.id} className="text-white">
            <Link to={`/tickets/${ticket.id}`}>
              title: {ticket.title} | status: {ticket.status}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketList;