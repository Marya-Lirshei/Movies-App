import React from "react";
import SearchPanel from "../SearchPanel/search-panel";
import MoviesList from "../MoviesList/movies-list";

import "./App.css"

function App() {
  return (
  <div className="wrapper">
  <SearchPanel />
  <MoviesList />
  
  </div>
  )
}
export default App;
