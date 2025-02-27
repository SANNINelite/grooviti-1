import React, { useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [event, setevent] = useState("home");

  return (
    <div className="navbar">
      <img src={assets.logo} alt="logo" className="logo" />
      <ul className="navbar-event">
        <Link
          to="/"
          onClick={() => setevent("home")}
          className={event === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-events"
          onClick={() => setevent("Events")}
          className={event === "Events" ? "active" : ""}
        >
          Events
        </a>
        <a
          href="#"
          onClick={() => setevent("About-us")}
          className={event === "About-us" ? "active" : ""}
        >
          About-us
        </a>
        <a
          href="#footer"
          onClick={() => setevent("Contact-us")}
          className={event === "Contact-us" ? "active" : ""}
        >
          Contact-us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div>
        <button>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
