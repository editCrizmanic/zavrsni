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
      <Link to="/login">
        <button className="button btn-homepage">
          <span>LogIn</span>
        </button>
      </Link>
      <Link to="https://github.com/editCrizmanic/zavrsni">
        <button className="button btn-secondary btn-homepage">
          <span>Check out the source code</span>
        </button>
      </Link>
    </div>
  );
};
