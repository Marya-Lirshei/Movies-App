import React from "react";

import "./movies-list.css";
import MoviesItem from "../MoviesItem/movies-item";

function MoviesList({ movies }) {
  const elem = movies.map((item) => (
    <MoviesItem
      key={item.id}
      imageUrl={item.imageUrl}
      title={item.title}
      releaseDate={item.releaseDate}
      summary={item.summary}
    />
  ));
  return (
    <ul className="movies-list">{elem}</ul>
    // <MoviesItem />
  );
}
export default MoviesList;
