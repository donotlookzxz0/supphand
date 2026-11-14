import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getAllUserTickets } from "../services/staff";
import AcceptBtn from "./status/AcceptBtn";
import ResolveBtn from "./status/ResolveBtn";

function StaffTicketList() {
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
      {tickets.length > 0 ? (
        <table className="bg-white rounded-md table-fixed w-full text-left">
          <thead className="border-b border-gray-200 rounded-base border-default">
            <tr>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Status</th>
              <th className="py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr
                className="border-b border-gray-100 hover:outline-1 hover:rounded hover:outline-gray-300 cursor-pointer"
                key={ticket.id}
                onClick={() => navigate(`tickets/${ticket.id}`)}
              >
                <td className="px-6 py-3 rounded-lg">{ticket.username}</td>
                <td className="px-6 py-3 max-w-2xs truncate">{ticket.title}</td>
                <td className="px-6 py-3 max-w-2xs truncate">{ticket.description}</td>
                <td className={`${statusColors[ticket.status]} font-semibold px-6 py-3`}>{ticket.status}</td>
                <td className="py-3 flex gap-2 rounded-lg"> 
                  <AcceptBtn ticketId={ticket.id} onUpdate={updateTicket} />
                  <ResolveBtn ticketId={ticket.id} onUpdate={updateTicket} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-black font-semibold text-xs md:text-xl lg:text-3xl">
          No tickets yet
        </p>
      )}
    </div>
  );
}

export default StaffTicketList;