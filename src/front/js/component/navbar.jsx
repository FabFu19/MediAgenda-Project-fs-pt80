import React from "react";
import logo from "../../img/logo-medi-2.png";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light pt-0 pb-0 navbar-principal-classes h-auto">
				<div className="d-flex w-100">
					<div className="d-flex w-100 align-items-center">
						<Link to="/">
							<img src={logo} alt="logo" className="nav-logo img-fluid" />
						</Link>
						
						<ul className="navbar-nav ms-auto nav_links">
							<li className="nav-item me-3">
								<Link to="/" className="nav-link nav-text " aria-current="page">About us</Link>
							</li>
							<li className="nav-item">
								<Link to="/" className="nav-link nav-text">Support</Link>
							</li>
						</ul>
					</div>
					<div className="nav-btn-container">
						<Link to="/" className="btn custom-btn special_margin" type="submit">
							<p>Login</p>
						</Link>
						<Link to="/" className="btn custom-btn special_margin" type="submit">
							<p>Register</p>
						</Link>
					</div>
				</div>
			</nav>
			
			
		</>
	);
};