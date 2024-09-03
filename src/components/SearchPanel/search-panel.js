import React from "react";
import "./search-panel.css";

function SearchPanel() {
  return (
    <header className="header">
      <div className="button-wrapper">
        <button type="button" className="button-search">
          Search
        </button>
        <button type="button" className="button-rated">
          Rated
        </button>
      </div>
      <form /* onSubmit={this.onSubmit} */>
        <input className="search-movies" 
        placeholder="Type to search..." />
      </form>
    </header>
  );
}
export default SearchPanel;
