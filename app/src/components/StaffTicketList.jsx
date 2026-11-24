import { useNavigate } from "react-router";
import AcceptBtn from "./status/AcceptBtn";
import ResolveBtn from "./status/ResolveBtn";

function StaffTicketList({ tickets, onUpdate }) {
  const navigate = useNavigate();

  const statusColors = {
    OPEN: "text-sky-500",
    PENDING: "text-amber-700",
    RESOLVED: "text-green-400",
    CLOSED: "text-red-500",
  };

  return (
    <div>
      <div className="overflow-auto hidden md:block">
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
                <td className="md:flex-col md:py-3 md:space-y-2 lg:py-3 lg:flex lg:flex-row gap-2 rounded-lg "> 
                  <AcceptBtn ticketId={ticket.id} onUpdate={onUpdate} />
                  <ResolveBtn ticketId={ticket.id} onUpdate={onUpdate} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex justify-center items-center">
          <p className="text-black font-semibold text-xs md:text-xl lg:text-3xl">
            No tickets yet
          </p>
        </div>
      )}
      </div>
      
      <div className="grid grid-cols-1 md:hidden">
        {tickets.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {tickets.map((ticket) => (
              <li 
              className="bg-white p-3 rounded-md space-y-3"
              key={ticket.id}
              onClick={() => navigate(`tickets/${ticket.id}`)}
              >
                <div className="flex items-center space-x-2 font-semibold">
                  <div className="text-xl max-w-3xs truncate">{ticket.title}</div>
                  <div className={`${statusColors[ticket.status]}  `}>{ticket.status}</div>
                </div>
                <div className="text-gray-400">{ticket.username}</div>
                <div className="max-w-3xs truncate">{ticket.description}</div>
                
                <div className="flex flex-row space-x-3">
                  <AcceptBtn ticketId={ticket.id} onUpdate={onUpdate} />
                  <ResolveBtn ticketId={ticket.id} onUpdate={onUpdate} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
           <div className="flex justify-center items-center">
          <p className="text-black font-semibold text-xs md:text-xl lg:text-3xl">
            No tickets yet
          </p>
        </div>
        )}
      </div>

    </div>
  );
}

export default StaffTicketList;