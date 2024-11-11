import React, { useState, useEffect } from "react";
import { Tabs, Input, Pagination, Alert, Spin } from "antd";

import MoviesList from "../MoviesList/movies-list";
import debounce from "../../utils/debounce";
import {
  getGuestSession,
  postMovieRating,
  getLocalGuestSessionToken,
  setLocalGuestSessionToken,
  getRatedMovies,
  deleteRating,
  setLocalRating,
} from "../../Api/api";

import "./App.css";

// const SESSION_KEY = "tmdb_session_key";
// const SESSION_EXPIRATION_KEY = "tmdb_session_expiration";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [genres, setGenres] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const [ratedMovies, setRatedMovies] = useState([]);

  // console.log("🐯 ~ App ~ genres:", genres);
  const apiKey = "8a5ec3319366a9a581bce32a752fa3b4";
  const apiUrl = "https://api.themoviedb.org";

  const buildUrl = (endpoint, query) => {
    const url = new URL(`${apiUrl}/3/${endpoint}`);
    url.searchParams.append("api_key", apiKey);
    console.log("🐯 ~ buildUrl ~ endpoint:", endpoint);
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
    setLoading(true);
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

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const loadRatedMovies = async (pageNumber /*  = 1 */) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRatedMovies(pageNumber);
      setRatedMovies(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const rateMovie = async (id, value) => {
    try {
      if (value > 0) {
        await postMovieRating(id, value);
        setLocalRating(id, value);
      } else {
        await deleteRating(id);
        localStorage.removeItem(id);
      }
      loadRatedMovies();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const load = async () => {
      if (!getLocalGuestSessionToken()) {
        const session = await getGuestSession();
        setLocalGuestSessionToken(session.guest_session_id);
      }
      getMoviesGenre();
      loadRatedMovies();
    };

    load();
  }, []);

  useEffect(() => {
    debouncedGetMoviesData(searchQuery);
    getMoviesGenre();
  }, [searchQuery, page]);

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
              <MoviesList
                movies={movies}
                genresData={genres}
                onRateChange={rateMovie}
              />
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
          <MoviesList movies={ratedMovies || []} genresData={genres} />
          <Pagination
            align="center"
            defaultCurrent={page}
            total={ratedMovies ? ratedMovies.length : 0}
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
      <Tabs defaultActiveKey="1" centered items={items} />
    </div>
  );
}
export default App;
