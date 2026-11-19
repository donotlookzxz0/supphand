import { useNavigate } from "react-router";

function TicketList({ tickets }) {
  const navigate = useNavigate();

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
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr
                className="border-b border-gray-100 hover:outline-1 hover:rounded hover:outline-gray-300 cursor-pointer"
                key={ticket.id}
                onClick={() => navigate(`tickets/${ticket.id}`)}
              >
                <td className="px-6 py-3">{ticket.id}</td>
                <td className="px-6 py-3 max-w-2xs truncate">{ticket.title}</td>
                <td className="px-6 py-3 max-w-2xs truncate">{ticket.description}</td>
                <td className={`${statusColors[ticket.status]} font-semibold px-6 py-3`}>{ticket.status}</td>
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
  );
}

export default TicketList;