/* eslint-disable import/order */
import React, { useState, useEffect } from "react";
import { parseISO, format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Rate, Progress } from "antd";

import { getLocalRating } from "../../Api/api";
import "./movies-item.css";

import truncate from "../../utils/truncate";
import truncateTitle from "../../utils/truncateTitle";
import voteColor from "../../utils/voteColor";

function MoviesItem({
  // id,
  imageUrl,
  title,
  releaseDate,
  overview,
  vote,
  genre: genreNums,
  genresData,
  idForRate,
  onRateChange,
}) {
  const [rating, setRating] = useState(getLocalRating(idForRate));

  useEffect(() => {
    const initialRating = getLocalRating(idForRate);
    setRating(initialRating);
    console.log("idForRate: ", idForRate);
    console.log("🐯 ~ rating:", initialRating);
    // setRating(getLocalRating(idForRate));
    // console.log("idForRate: ", idForRate);
    // console.log("🐯 ~ rating:", rating);
  }, [idForRate]);

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

  const baseImageUrl = "https://image.tmdb.org/t/p/original";

  return (
    <li className="movies-card">
      <div className="movies-img">
        <img src={`${baseImageUrl}${imageUrl}`} alt={title} />
      </div>
      <div className="movies-info">
        <div className="title-rating">
          <div className="info-title">{truncateTitle(title)} </div>
          <Progress
            type="circle"
            className="info-rating"
            percent={vote * 10}
            format={(percent) => (percent / 10).toFixed(1)}
            strokeColor={voteColor(vote)}
          />
        </div>
        <div className="info-date">{formattedReleaseDate}</div>
        <div className="info-genre">{names.join(" ")}</div>
        <p className="info-text">{truncate(overview)}</p>
        <Rate
          allowHalf
          count="10"
          // defaultValue={ratingStars}
          value={rating}
          onChange={(star) => {
            onRateChange(idForRate, star);
            setRating(star);
          }}
        />
      </div>
    </li>
  );
}
export default MoviesItem;
