// import React from "react";
import { parseISO, format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Rate } from "antd";

import "./movies-item.css";

import truncate from "../../utils/truncate";
import truncateTitle from "../../utils/truncateTitle";

function MoviesItem({
  // id,
  imageUrl,
  title,
  releaseDate,
  overview,
  rating,
  genre: genreNums,
  genresData,
  // onRateChange,
}) {
  // console.log("🐯 ~ MoviesItem ~ genreNums:", genreNums);
  // console.log("🐯 ~ MoviesItem ~ genresData:", genresData);
  let formattedReleaseDate = "Date: Unknown";
  if (releaseDate) {
    try {
      formattedReleaseDate = format(parseISO(releaseDate), "LLLL d, yyyy", {
        locale: enUS,
      });
    } catch (error) {
      console.error("Invalid date format:", releaseDate);
    }
  }

  const names = genreNums.map(
    (el) => genresData.find((elem) => elem.id === el).name
  );

  // const handleRateChange = (newRating) => {
  //   onRateChange(id, newRating);
  // };
  // console.log(names);

  const ratingColor = () => {
    if (rating >= 7) return "green";
    if (rating >= 5) return "orange";
    return "red";
  };

  const color = ratingColor(rating);
  const baseImageUrl = "https://image.tmdb.org/t/p/original";
  const ratingFixed = rating.toFixed(1);
  const ratingStars = (ratingFixed * 5) / 10;
  // console.log("ratingStars: ", ratingStars);

  return (
    <li className="movies-card">
      <div className="movies-img">
        <img src={`${baseImageUrl}${imageUrl}`} alt={title} />
      </div>
      <div className="movies-info">
        <div className="title-rating">
          <div className="info-title">{truncateTitle(title)} </div>
          <div className={`info-rating ${color}`}>{ratingFixed} </div>
        </div>
        <div className="info-date">{formattedReleaseDate}</div>
        <div className="info-genre">{names.join(" ")}</div>
        <p className="info-text">{truncate(overview)}</p>
        <Rate
          allowHalf
          defaultValue={ratingStars}
          className="custom-rate"
          // onChange={handleRateChange}
        />
      </div>
    </li>
  );
}
export default MoviesItem;
