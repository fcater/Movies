import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getRandomMovies from "../utils/getRandomMovies";

function MostPopular({ movies }) {
  const [mouseOver, setMouseOver] = useState("");
  const [moviesMax, setMoviesMax] = useState([]);

  const handleMouseOver = (id) => {
    setMouseOver(id);
  };
  const handleMouseLeave = (id) => {
    setMouseOver("");
  };

  useEffect(() => {
    const moviesMax = getRandomMovies(movies);
    setMoviesMax(moviesMax);
  }, []);

  return (
    <ul
      id="mostPopular"
      className="d-flex rounded"
      style={{
        margin: "3em",
        marginLeft: "-4em",
        height: "9rem",
        width: "90vw",
      }}
    >
      {moviesMax.map((m) => (
        <Link
          to={`/movies/details/${m._id}`}
          onMouseOver={() => handleMouseOver(m._id)}
          onMouseLeave={() => handleMouseLeave(m._id)}
          key={m._id}
          style={
            mouseOver === m._id
              ? {
                  width: "6em",
                  height: "100%",
                  listStyle: "none",
                  transition: "all 0.5s",
                  position: "relative",
                  marginRight: "0",
                }
              : {
                  width: "6em",
                  height: "100%",
                  listStyle: "none",
                  transition: "all 0.5s",
                  position: "relative",
                  marginRight: "-2rem",
                }
          }
        >
          {mouseOver === m._id && (
            <div
              className="w-100 text-center"
              style={{
                fontSize: "0.5em",
                position: "absolute",
                top: "30%",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {m.title && (
                <small className="bg-dark text-light p-1 rounded">
                  {m.title}
                </small>
              )}
            </div>
          )}
          <img
            className="rounded clickable"
            style={{
              width: "100%",
              height: "100%",
              boxShadow: "1px 0 4px 1px #000",
            }}
            src={m.img}
            alt="盗梦空间"
          />
        </Link>
      ))}
    </ul>
  );
}

export default MostPopular;
