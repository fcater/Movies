import React from "react";

function BigScreen({ post }) {
  return (
    <div
      className="w-100"
      style={{
        marginTop: "5em",
        height: "29em",

        overflow: "hidden",
      }}
    >
      <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="5000">
            <img src={post[0]} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item" data-bs-interval="5000">
            <img src={post[1]} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item" data-bs-interval="5000">
            <img src={post[2]} className="d-block w-100" alt="..." />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BigScreen;
