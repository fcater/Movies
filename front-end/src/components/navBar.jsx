import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  const [select, setSelect] = useState("movies");
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light p-0 fixed-top"
      style={{ backgroundColor: "rgb(55,95,186)" }}
    >
      <Link className="navbar-brand text-light ml-3" to="/">
        月月影视
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#mycollapse"
        aria-controls="mycollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse text-light" id="mycollapse">
        <div className="navbar-nav w-100">
          <div className="d-flex justify-content-between align-itmes-end w-100">
            <div className="d-flex">
              <NavLink
                className="nav-item nav-link text-light p-3"
                to="/movies"
                style={
                  select === "movies"
                    ? { backgroundColor: "rgb(50,50,50)" }
                    : null
                }
                onClick={() => setSelect("movies")}
              >
                电影
              </NavLink>
              {user && user.isAdmin && (
                <NavLink
                  className="nav-item nav-link text-light p-3"
                  to="/moviesbackend"
                  style={
                    select === "user"
                      ? { backgroundColor: "rgb(50,50,50)" }
                      : null
                  }
                  onClick={() => setSelect("user")}
                >
                  后台
                </NavLink>
              )}
              <NavLink
                className="nav-item nav-link text-light p-3"
                to="/rentals"
                style={
                  select === "link"
                    ? { backgroundColor: "rgb(50,50,50)" }
                    : null
                }
                onClick={() => setSelect("link")}
              >
                链接
              </NavLink>
            </div>
            <div className="d-flex align-items-center">
              {!user && (
                <React.Fragment>
                  <NavLink
                    className="nav-item nav-link text-light p-3"
                    to="/login"
                  >
                    登陆
                  </NavLink>
                  <NavLink
                    className="nav-item nav-link text-light p-3"
                    to="/register"
                  >
                    注册
                  </NavLink>
                </React.Fragment>
              )}
              {user && (
                <React.Fragment>
                  <NavLink
                    className="nav-item nav-link text-light ml-5 mr-5"
                    to="/profile"
                  >
                    {user.name}
                    {user.isAdmin && (
                      <span className="text-warning">（管理员）</span>
                    )}
                  </NavLink>
                  <NavLink
                    className="nav-item nav-link text-light"
                    to="/logout"
                  >
                    注销
                  </NavLink>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
