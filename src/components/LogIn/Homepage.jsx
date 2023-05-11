import React from "react";
import { Link } from "react-router-dom";

{
  /* ----------------------------- Homepage  ----------------------------- */
}
export const ButtonLogIn = () => {
  return (
    <div className="div-homepage">
      <h1>Welcome to BookChat App!</h1>
      <h2>Join one of the rooms and chat away.</h2>
      {/* ----------------------------- login button that leads to the login page  ----------------------------- */}
      <Link to="/login">
        <button className="button btn-homepage">
          <span>LogIn</span>
        </button>
      </Link>
      {/* ----------------------------- link to source code  ----------------------------- */}
      <Link to="https://github.com/editCrizmanic/zavrsni">
        <button className="button btn-secondary btn-homepage">
          <span>Check out the source code</span>
        </button>
      </Link>
    </div>
  );
};
