import React from "react";
import { Link } from "react-router-dom";
import logo_footer from "../../img/logo_footer.png";

export const Footer = () => (
  <footer className="footer">
    <div className="footer-body">
      <div className="container d-flex">
        <img
          className="footer-logo"
          src={logo_footer}
          alt="Logo"
        />
      </div>
      <div className="container">
        <Link to="/about" className="footer-link">
          <span>About us</span>
        </Link>
      </div>
      <div className="container">
        <Link to="/support" className="footer-link">
          <span>Support</span>
        </Link>
      </div>
      <div className="container">© 2025 MediAgenda. All rights reserved.</div>
    </div>
  </footer>
);