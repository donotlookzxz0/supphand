import { useState, useEffect } from "react";
import { useOutletContext, useSearchParams } from "react-router";
import { getAllTickets } from "../services/ticket";
import { getAllUserTickets } from "../services/staff";
import TicketList from "../components/TicketList";
import StaffTicketList from "../components/StaffTicketList";
import CreateTicket from "../components/CreateTicket";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import StatusTabs from "../components/StatusTabs";

const Home = () => {
  const { user } = useOutletContext();
  const [tickets, setTickets] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams();
  
  const page = Math.max(parseInt(searchParams.get("page")) || 1, 1);
  const roleCheck = user.role === "staff" || user.role === "admin";

  useEffect(() => {
    const fetchTickets = roleCheck ? getAllUserTickets : getAllTickets;

    fetchTickets(page, search, status)
      .then((data) => {
        setTickets(data.tickets);
        setHasNext(data.hasNext);
      })
      .catch((err) => console.error(err));
  }, [page, roleCheck, search, status]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || (newPage > page && !hasNext)) return;
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", newPage);
      return next;
    });
  };

  const handleSearch = (value) => {
    if (value === search) return;
    setSearch(value);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", 1);
      return next;
    });
  };

  const handleStatusChange = (value) => {
    if (value === status) return;
    setStatus(value);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", 1);
      return next;
    });
  };

  const createTicket = (newTicket) => {
    if (page !== 1) {
      setSearchParams({ page: 1 });
      return;
    }
    setTickets((prev) => {
      const next = [newTicket, ...prev];
      if (next.length > 10) setHasNext(true);
      return next.slice(0, 10);
    });
  };

  const updateTicket = (updated) => {
    setTickets((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  return (
      <div className="flex">
        
        <div className="flex justify-center items-center p-5">
          {roleCheck ? (
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col items-start md:flex-row md:items-center gap-3">
                <SearchBar onSearch={handleSearch} />
                <StatusTabs status={status} onStatusChange={handleStatusChange} />
              </div>
              <Pagination page={page} hasNext={hasNext} onPageChange={handlePageChange} />
              <StaffTicketList tickets={tickets} onUpdate={updateTicket} />
              <Pagination page={page} hasNext={hasNext} onPageChange={handlePageChange} />
            </div>
          ) : (
            <div className="flex flex-col gap-3 w-full">
              <CreateTicket onCreateTicket={createTicket} />
              <div className="flex flex-col items-start md:flex-row md:items-center gap-3">
                <SearchBar onSearch={handleSearch} />
                <StatusTabs status={status} onStatusChange={handleStatusChange} />
              </div>
              <Pagination page={page} hasNext={hasNext} onPageChange={handlePageChange} />
              <TicketList tickets={tickets} />
              <Pagination page={page} hasNext={hasNext} onPageChange={handlePageChange} />
            </div>
          )}
        </div>

      </div>
  );
};

export default Home;