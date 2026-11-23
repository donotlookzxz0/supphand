function StatusTabs({ status, onStatusChange }) {
  const tabs = ["All", "Open", "Pending/Active", "Resolved"];

  const statusColor = {
    All: "text-black border-black focus:bg-gray-200 hover:bg-gray-100",
    Open: "text-sky-500 border-sky-500 focus:bg-sky-100 hover:bg-sky-100 ",
    "Pending/Active": "text-amber-700 border-amber-700 focus:bg-amber-100 hover:bg-amber-100",
    Resolved: "text-green-400 border-green-400 focus:bg-green-100 hover:bg-green-100",
  };
  
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onStatusChange(tab)}
          className={`px-3 py-1 rounded-full border font-semibold cursor-pointer ${statusColor[tab]} ${
            status === tab ? "underline" : ""
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default StatusTabs;