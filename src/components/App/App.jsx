import React, { useState, useEffect /* useMemo */ } from "react";
import { Tabs, Input, Pagination, Alert, Spin } from "antd";

import MoviesList from "../MoviesList/movies-list";
import debounce from "../../utils/debounce";

import "./App.css";
// import "./index.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [genres, setGenres] = useState("");
  // const [ratedMovies, setRatedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);

  // console.log("🐯 ~ App ~ genres:", genres);
  const apiKey = "8a5ec3319366a9a581bce32a752fa3b4";
  const apiUrl = "https://api.themoviedb.org";

  const buildUrl = (endpoint, query) => {
    const url = new URL(`${apiUrl}/3/${endpoint}`);
    url.searchParams.append("api_key", apiKey);
    if (query) {
      url.searchParams.append("query", query);
    }
    url.searchParams.append("page", page);
    return url.toString();
  };

  const fetchData = async (endpoint, query) => {
    setLoading(true);
    try {
      const url = buildUrl(endpoint, query);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      return json;
    } catch (err) {
      throw new Error(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getMoviesData = async (query) => {
    try {
      const endpoint = query ? "search/movie" : "discover/movie";
      const json = await fetchData(endpoint, query);
      setMovies(json.results);
      console.log("json.results: ", json.results);
      setError(null);
      setNoResults(json.results.length === 0 && query.length > 0);
    } catch (err) {
      setError(err.message);
    }
  };

  const getMoviesGenre = async () => {
    try {
      const json = await fetchData("genre/movie/list");
      setGenres(json.genres);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const debouncedGetMoviesData = debounce((query) => getMoviesData(query), 500);

  const onSearchMovies = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length === 0) {
      setNoResults(false);
    }
    // debouncedGetMoviesData(query);
  };

  useEffect(() => {
    debouncedGetMoviesData(searchQuery);
    // getMoviesData(searchQuery, page);
    // console.log("page: ", page);
    // console.log("searchQuery: ", searchQuery);
    getMoviesGenre();
  }, [searchQuery, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const items = [
    {
      key: "1",
      label: "Search",
      children: (
        <div>
          <Input
            className="search-movies"
            placeholder="Type to search..."
            value={searchQuery}
            onChange={onSearchMovies}
          />
          {loading ? (
            <Spin />
          ) : (
            <>
              {noResults && <div className="noResults">Ничего не найдено</div>}
              <MoviesList movies={movies} genresData={genres} />
            </>
          )}
          <Pagination
            className="pagination"
            align="center"
            defaultCurrent={page}
            total={200}
            pageSize={10}
            onChange={handlePageChange}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: "Rated",
      children: (
        <div>
          <MoviesList /* movies={ratedMovies} */ genresData={genres} />
          <Pagination
            align="center"
            defaultCurrent={page}
            total={movies.length}
            onChange={handlePageChange}
          />
        </div>
      ),
    },
  ];

  // console.log("ratedMovies: ", ratedMovies);
  return (
    <div className="wrapper">
      {error && <Alert message={error} type="error" />}
      <Tabs
        defaultActiveKey="1"
        centered
        items={items}
      />
    </div>
  );
}
export default App;
