import React, { useState, useEffect } from "react";
import { /* Input, Spin, Alert, Pagination, */ Tabs } from "antd";

import SearchPanel from "../SearchPanel/search-panel";
import MoviesList from "../MoviesList/movies-list";

import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [genres, setGenres] = useState("");
  console.log("🐯 ~ App ~ genres:", genres);
  // const [errorState, seterrorState] = useState(false);
  const apiKey = "8a5ec3319366a9a581bce32a752fa3b4";
  const apiUrl = "https://api.themoviedb.org";
  const buildUrl = (endpoint) => `${apiUrl}/3/${endpoint}?api_key=${apiKey}`;

  const getMoviesData = async (query) => {
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
      console.log("🐯 ~ getMoviesData ~ json.results:", json.results);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const getMoviesGenre = async () => {
    try {
      const url = buildUrl("genre/movie/list");
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      setGenres(json.genres);
      console.log("🐯 ~ getMoviesGenre ~ json.genres:", json.genres);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getMoviesData(searchQuery);
    getMoviesGenre();
  }, [searchQuery]);

  const items = [
    {
      key: "1",
      label: "Search",
      children: <SearchPanel onSearch={(query) => setSearchQuery(query)} />,
    },
    {
      key: "2",
      label: "Rated",
      children: "Content of Tab Pane 2",
    },
  ];

  return (
    <div className="wrapper">
      <Tabs
        defaultActiveKey="1"
        centered
        items={items}
        // onSearch={(query) => setSearchQuery(query)}
      />
      <MoviesList
        movies={movies}
        genresData={genres}
        // переименовать как действие
        // genres={() => getGenresName}
        // genre_names={movies.genre_ids.map((id) => getGenresName(id))}
      />
      {/* {errorState? "alsdkajslkdj" : "<MoviesList movies={mockData} />"} */}
    </div>
  );
}
export default App;
