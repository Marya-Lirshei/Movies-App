import React, { useState, useEffect } from "react";

import SearchPanel from "../SearchPanel/search-panel";
import MoviesList from "../MoviesList/movies-list";

import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const [errorState, seterrorState] = useState(false);c

  const getMoviesData = async (query) => {
    const apiKey = "8a5ec3319366a9a581bce32a752fa3b4";
    const apiUrl = "https://api.themoviedb.org";

    const buildUrl = (endpoint) => `${apiUrl}/3/${endpoint}?api_key=${apiKey}`;

    try {
      const endpoint = query
        ? `search/movie&query=${encodeURIComponent(query)}`
        : "discover/movie";
      const url = buildUrl(endpoint);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      setMovies(json.results);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getMoviesData(searchQuery);
  }, [searchQuery]);

  return (
    <div className="wrapper">
      <SearchPanel onSearch={(query) => setSearchQuery(query)} />
      <MoviesList movies={movies} />
      {/* {errorState? "alsdkajslkdj" : "<MoviesList movies={mockData} />"} */}
    </div>
  );
}
export default App;
