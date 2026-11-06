import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getAllUserTickets } from "../services/staff";
import AcceptBtn from "./status/AcceptBtn";
import ResolveBtn from "./status/ResolveBtn";

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUserTickets()
      .then((ticketData) => setTickets(ticketData))
      .catch((err) => console.error(err));
  }, []);

  const updateTicket = (updated) => {
    setTickets((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

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
              <td><AcceptBtn ticketId={ticket.id} onUpdate={updateTicket} /></td>
              <td><ResolveBtn ticketId={ticket.id} onUpdate={updateTicket} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketList;