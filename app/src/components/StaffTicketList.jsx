import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getAllUserTickets } from "../services/staff";

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUserTickets()
      .then((ticketData) => setTickets(ticketData))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <table>
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
              <td>{ticket.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketList;