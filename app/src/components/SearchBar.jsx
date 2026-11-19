import { useState, useEffect, useRef } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");
  const onSearchRef = useRef(onSearch);

  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchRef.current(input.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Search tickets..."
      className="bg-white border border-gray-200 rounded-md px-3 py-2 w-50"
    />
  );
}

export default SearchBar;