// import React from "react";
import { parseISO, format } from "date-fns";
import { enUS } from "date-fns/locale";

import "./movies-item.css";

import truncate from "../../utils/truncate";

function MoviesItem({
  imageUrl,
  title,
  releaseDate,
  overview,
  rating,
  genre: genreNums,
  genresData,
}) {
  console.log("🐯 ~ MoviesItem ~ genreNums:", genreNums);
  console.log("🐯 ~ MoviesItem ~ genresData:", genresData);
  const formattedReleaseDate = format(parseISO(releaseDate), "LLLL d, yyyy", {
    locale: enUS,
  });

  const names = genreNums.map(
    (el) => genresData.find((elem) => elem.id === el).name
  );

  console.log(names);

  const ratingColor = () => {
    if (rating >= 7) return "green";
    if (rating >= 5) return "orange";
    return "red";
  };

  const color = ratingColor(rating);

  const baseImageUrl = "https://image.tmdb.org/t/p/original";

  return (
    <li className="movies-card">
      <div className="movies-img">
        <img src={`${baseImageUrl}${imageUrl}`} alt={title} />
      </div>
      <div className="movies-info">
        <div className="title-rating">
          <div className="info-title">{title} </div>
          <div className={`info-rating ${color}`}>{rating.toFixed(1)} </div>
        </div>
        <div className="info-date">{formattedReleaseDate}</div>
        <div className="info-genre">{names.join(" ")}</div>
        <p className="info-text">{truncate(overview)}</p>
      </div>
    </li>
  );
}
export default MoviesItem;
