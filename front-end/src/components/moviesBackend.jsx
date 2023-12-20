import React from "react";
import MoviesModify from "./moviesModify";

function MoviesBackend({ user }) {
  return (
    <div style={{ marginTop: "10em" }}>
      <MoviesModify user={user} />
    </div>
  );
}

export default MoviesBackend;
