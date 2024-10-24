import React, { useState, useEffect } from "react";
import { Tabs, Input } from "antd";

// import SearchPanel from "../SearchPanel/search-panel";
import MoviesList from "../MoviesList/movies-list";
import debounce from "../../utils/debounce";

import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [genres, setGenres] = useState("");
  // console.log("🐯 ~ App ~ genres:", genres);
  // const [errorState, seterrorState] = useState(false);
  const apiKey = "8a5ec3319366a9a581bce32a752fa3b4";
  const apiUrl = "https://api.themoviedb.org";
  const buildUrl = (endpoint, query) => {
    const url = new URL(`${apiUrl}/3/${endpoint}`);
    url.searchParams.append("api_key", apiKey);
    if (query) {
      url.searchParams.append("query", query);
    }
    return url.toString();
  };

  const getMoviesData = async (query) => {
    try {
      const endpoint = query ? "search/movie" : "discover/movie";
      const url = buildUrl(endpoint, query);

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
      // console.log("🐯 ~ getMoviesGenre ~ json.genres:", json.genres);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const debouncedGetMoviesData = debounce((query) => getMoviesData(query), 400);

  const onSearchMovies = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedGetMoviesData(query);
  };

  useEffect(() => {
    getMoviesData(searchQuery);
    console.log("searchQuery: ", searchQuery);
    getMoviesGenre();
  }, [searchQuery]);

  const items = [
    {
      key: "1",
      label: "Search",
      children: (
        <Input
          className="search-movies"
          placeholder="Type to search..."
          value={searchQuery}
          onChange={onSearchMovies}
        />
      ),
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
