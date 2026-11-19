import { useState, useEffect } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(input.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [input, onSearch]);

  return (
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Search tickets..."
      className="bg-white border border-gray-200 rounded-md px-3 py-2 w-1/10"
    />
  );
}

export default SearchBar;