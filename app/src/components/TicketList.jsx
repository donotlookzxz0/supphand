import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getAllTickets } from "../services/ticket";

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllTickets()
      .then((ticketData) => setTickets(ticketData))
      .catch((err) => console.error(err));
  }, []);

  const statusColors = {
    OPEN: "text-sky-500",
    PENDING: "text-amber-700",
    RESOLVED: "text-green-400",
    CLOSED: "text-red-500",
  };

  return (
    <div>
      <table className="bg-white">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr
              className="cursor-pointer"
              key={ticket.id}
              onClick={() => navigate(`tickets/${ticket.id}`)}
            >
              <td>{ticket.id}</td>
              <td>{ticket.title}</td>
              <td>{ticket.description}</td>
              <td className={statusColors[ticket.status]}>{ticket.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketList;