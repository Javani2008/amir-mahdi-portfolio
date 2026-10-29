import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/" className="logo"><span className="logo-mark">AM</span><span>amirmahdi<span className="logo-muted">.dev</span></span></Link>
      <div className="nav-links">
        <a href="/#about">درباره من</a>
        <a href="/#projects">پروژه‌ها</a>
        <Link to="/admin" className="admin-link">مدیریت</Link>
      </div>
    </div>
  );
}

export default Navbar;
