import React from "react";
import { parseISO, format } from "date-fns";
import { enUS } from "date-fns/locale";

import "./movies-item.css";

import truncate from "../../utils/truncate";

function MoviesItem({ imageUrl, title, releaseDate, summary }) {
  const formattedReleaseDate = format(parseISO(releaseDate), "LLLL d, yyyy", {
    locale: enUS,
  });
  return (
    <li className="movies-card">
      <div className="movies-img">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="movies-info">
        <h4>{title}</h4>
        <h5>{formattedReleaseDate}</h5>
        <p>{truncate(summary)}</p>
      </div>
    </li>
  );
}
export default MoviesItem;
