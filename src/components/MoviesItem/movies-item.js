import React from "react";
import { parseISO, format } from "date-fns";
import { enUS } from "date-fns/locale";

import "./movies-item.css";

import truncate from "../../utils/truncate";

function MoviesItem({ imageUrl, title, releaseDate, overview }) {
  const formattedReleaseDate = format(parseISO(releaseDate), "LLLL d, yyyy", {
    locale: enUS,
  });

  const baseImageUrl = "https://image.tmdb.org/t/p/original";

  return (
    <li className="movies-card">
      <div className="movies-img">
        <img src={`${baseImageUrl}${imageUrl}`} alt={title} />
      </div>
      <div className="movies-info">
        <div>{title}</div>
        <div>{formattedReleaseDate}</div>
        <p>{truncate(overview)}</p>
      </div>
    </li>
  );
}
export default MoviesItem;
