/* eslint camelcase: "off" */

import React from "react";

import "./movies-list.css";
import MoviesItem from "../MoviesItem/movies-item";

function MoviesList({ movies, genresData }) {
  const elem = movies.map((item) => {
    const {
      id,
      poster_path,
      title,
      release_date,
      overview,
      vote_average,
      genre_ids,
    } = item;
    return (
      <MoviesItem
        key={id}
        imageUrl={poster_path}
        title={title}
        releaseDate={release_date}
        overview={overview}
        rating={vote_average}
        genre={genre_ids}
        genresData={genresData}
      />
      //   <MoviesItem  {...movies}
      // />
    );
  });
  return (
    <ul className="movies-list">{elem}</ul>
    // <MoviesItem />
  );
}
export default MoviesList;
