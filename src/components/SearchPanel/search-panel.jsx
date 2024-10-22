import React, { useState } from "react";
import "./search-panel.css";

function SearchPanel({ onSearch }) {
  const [query, setQuery] = useState("");
  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <header className="header">
      {/* <div className="button-wrapper">
        <button type="button" className="button-search">
          Search
        </button>
        <button type="button" className="button-rated">
          Rated
        </button>
      </div> */}
      <form onSubmit={handleSearch}>
        <input
          className="search-movies"
          placeholder="Type to search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </header>
  );
}
export default SearchPanel;
