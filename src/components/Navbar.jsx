import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="simple-navbar">
      {/* Left Logo */}
      <div className="simple-navbar-logo">
        <img src="/img/logo.png" alt="Logo" />
      </div>

      {/* Right Help Button */}
      <button
        className="simple-help-btn"
        onClick={() => alert("Help section coming soon!")}
      >
        Help
      </button>
    </header>
  );
};

export default Navbar;
