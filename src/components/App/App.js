import React from "react";
import SearchPanel from "../SearchPanel/search-panel";
import AddMovies from "./Add-Movies/add-movies";

import "./App.css"

function App() {
  return (
  <div className="wrapper">
  <SearchPanel />
  <AddMovies />
  
  </div>
  )
}
export default App;
