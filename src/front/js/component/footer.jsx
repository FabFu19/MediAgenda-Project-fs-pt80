import React from "react";
import { Link } from "react-router-dom";
import logo_footer from "../../img/logo_footer.png";

export const Footer = () => (
  <footer className="footer">
    <div className="footer-body">
      <div className="container"> 
        <div className="row justify-content-between align-items-center text-center row-footer"> 
          <div className="col-lg-3 col-md-6 col-sm-12">
            <img className="footer-logo" src={logo_footer} alt="Logo" />
          </div>
          <div className="col-lg-2 col-md-6 col-sm-12  mb-3 mb-lg-0">
            <Link to="/about" className="footer-link">
              About us
            </Link>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-12  mb-3 mb-lg-0">
            <Link to="/support" className="footer-link">
              Support
            </Link>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            © 2025 MediAgenda. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  </footer>
);