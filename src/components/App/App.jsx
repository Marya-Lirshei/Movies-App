import React, { useState, useEffect } from "react";
import { Tabs, Input, Pagination } from "antd";

// import SearchPanel from "../SearchPanel/search-panel";
import MoviesList from "../MoviesList/movies-list";
import debounce from "../../utils/debounce";

import "./App.css";
// import "./index.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [genres, setGenres] = useState("");
  const [ratedMovies, setRatedMovies] = useState([]);
  const [page, setPage] = useState(1);
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
    url.searchParams.append("page", page);
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
      // setMovies((prevMovies) => [...prevMovies, ...json.results]);
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
    // debouncedGetMoviesData(query);
  };

  useEffect(() => {
    debouncedGetMoviesData(searchQuery);
    // getMoviesData(searchQuery, page);
    // console.log("page: ", page);
    // console.log("searchQuery: ", searchQuery);
    getMoviesGenre();
  }, [searchQuery, page]);

  // const handleRateChange = (id, newRating) => {
  //   // Обновляем ratedMovies
  //   const updatedRatedMovies = movies.map((movie) => {
  //     if (movie.id === id) {
  //       return { ...movie, rating: newRating };
  //     }
  //     return movie;
  //   });
  //   // Фильтруем фильмы с установленным рейтингом
  //   const filteredRatedMovies = updatedRatedMovies.filter(
  //     (movie) => movie.rating !== undefined && movie.rating !== 0
  //   );

  //   console.log("updatedRatedMovies: ", filteredRatedMovies);
  //   setRatedMovies(filteredRatedMovies);
  // };

  const handleRateChange = (id, newRating) => {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === id) {
        return { ...movie, vote_average: newRating, userRated: true };
      }
      return movie;
    });

    const updatedRatedMovies = updatedMovies.filter((movie) => movie.userRated);

    setMovies(updatedMovies);
    setRatedMovies(updatedRatedMovies);
    console.log("Updated Movies:", updatedMovies);
    console.log("Updated Rated Movies:", updatedRatedMovies);
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
          <MoviesList
            movies={movies}
            genresData={genres}
            onRateChange={handleRateChange}
          />
          <Pagination
            className="pagination"
            align="center"
            defaultCurrent={page}
            total={200}
            pageSize={10}
            onChange={(newPage) => setPage(newPage)}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: "Rated",
      children: (
        <div>
          <MoviesList movies={ratedMovies} genresData={genres} />
          <Pagination
            align="center"
            defaultCurrent={page}
            total={movies.length}
            onChange={(newPage) => setPage(newPage)}
          />
        </div>
      ),
    },
  ];

  console.log("ratedMovies: ", ratedMovies);
  return (
    <div className="wrapper">
      <Tabs
        defaultActiveKey="1"
        centered
        items={items}
        // onSearch={(query) => setSearchQuery(query)}
      />
      {/* <MoviesList
        movies={movies}
        genresData={genres}
        // переименовать как действие
        // genres={() => getGenresName}
        // genre_names={movies.genre_ids.map((id) => getGenresName(id))}
      /> */}
      {/* {errorState? "alsdkajslkdj" : "<MoviesList movies={mockData} />"} */}
    </div>
  );
}
export default App;
