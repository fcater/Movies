import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ movies }) {
  return (
    <div className="w-100">
      {movies.map((m) => (
        <div key={m._id} className="card mb-3 clickable">
          <div className="d-flex">
            <div>
              <img
                src={m.img}
                alt="..."
                style={{
                  width: "10em",
                  height: "15em",
                }}
              />
            </div>
            <Link className="w-75 text-dark" to={`/movies/details/${m._id}`}>
              <div className="card-body">
                <h5 className="card-title fw-bolder">
                  {m.title}
                  {`(${m.genre.name})`}
                  <small className="text-secondary"> {m.otherTitle} </small>
                </h5>
                <p
                  className="card-text"
                  style={{ maxHeight: "3em", overflow: "hidden" }}
                >
                  {m.plotSummary}
                </p>
                <p className="fw-bolder">导演：{m.director}</p>
                <p>主演：{m.starring}</p>
                <p
                  className="card-text"
                  style={{
                    width: "4.8em",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  <small className="text-muted">{m.releaseDate}</small>
                </p>
              </div>
            </Link>
            <div className="d-flex flex-column justify-content-center">
              <a
                className="m-3 p-1 text-center text-light rounded bg-success"
                href={m.doubanLink}
                target="_blank"
              >
                豆瓣
              </a>
              <p className="m-0 p-0">评分 : {m.rate}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieCard;
