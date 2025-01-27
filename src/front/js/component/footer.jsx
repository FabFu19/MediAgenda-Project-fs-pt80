import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="footer">
    <div className="footer-body">
      <div className="container d-flex">
        <img
          className="footer-logo"
          src="https://github.com/FabFu19/MediAgenda-Project-fs-pt80/raw/799116be9c56823c46f063306d29671d34a2fd5b/src/front/img/image%205.png"
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