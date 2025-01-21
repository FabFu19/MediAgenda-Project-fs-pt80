import React from "react";
import logo from "../../img/logo-medi-2.png";
// import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light pt-0 pb-0 navbar-principal-classes h-auto">
				<div className="d-flex w-100">
					<div className="d-flex w-100 align-items-center">
						<img src={logo} alt="logo" className="nav-logo img-fluid" />
						<ul className="navbar-nav ms-auto nav_links">
							<li className="nav-item">
								<a className="nav-link nav-text " aria-current="page" href="#">About us</a>
							</li>
							<li className="nav-item">
								<a className="nav-link nav-text" href="#">Support</a>
							</li>
						</ul>
					</div>
					<div className="nav-btn-container">
						<div className="btn custom-btn special_margin" type="submit">
							<p>Login</p>
						</div>
						<div className="btn custom-btn special_margin" type="submit">
							<p>Register</p>
						</div>
					</div>
				</div>
			</nav>
			
			
		</>
	);
};