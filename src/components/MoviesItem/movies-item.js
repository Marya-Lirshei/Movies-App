import React from "react";
import "./movies-item.css";

import truncate from "../../utils/truncate";

function MoviesItem({ imageUrl, title, releaseDate, summary }) {
  return (
    <li className="movies-card">
      <div className="movies-img">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="movies-info">
        <h4>{title}</h4>
        <h5>{releaseDate}</h5>
        <p>{truncate(summary)}</p>
      </div>
    </li>
  );
}
export default MoviesItem;
